#!/usr/bin/env python3
"""
seo/voce.py — La voce del prof nei reel, clonata gratis con un modello libero (XTTS-v2).

Gira dentro le Action di GitHub (il modello si scarica da Hugging Face e resta in cache).
Il campione della voce del prof NON sta nel repo, che è pubblico: arriva dal segreto
VOCE_CAMPIONE (un breve audio Ogg/Opus in base64). Senza il segreto non fa nulla.

Per ogni frase scrive un WAV (24 kHz, mono) pulito e a volume giusto, con un tocco di
calore; poi seo/reel2.mjs le mette nel video sotto i sottotitoli.

Licenza del modello: Coqui Public Model License (uso non commerciale): va bene per il Lab,
che è gratuito. Nei video con questa voce si scrive «voce generata con IA».

Motori (VOCE_MOTORE): xtts e chatterbox clonano la voce del prof dal campione; edge, kokoro e
gemini-<Voce> sono voci italiane già pronte. Gemini (Google, piano gratuito, segreto
GEMINI_API_KEY) è la più naturale e accetta un'indicazione di tono (VOCE_GEMINI_STILE).

USO
---
  python seo/voce.py frasi.json cartella/     frasi.json = ["prima frase", "seconda", ...]
"""

from __future__ import annotations

import base64
import json
import os
import subprocess
import sys
import tempfile
import time
import urllib.error
import urllib.request
from pathlib import Path

MODELLO = "tts_models/multilingual/multi-dataset/xtts_v2"
# come si dicono sigle e indirizzi (i sottotitoli restano scritti normali)
SIGLE = [
    (r"\blabirc\.it\b", "lab i erre ci"),          # il sito si dice senza «punto it»
    (r"\bLab IRC\b", "Lab i erre ci"),
    (r"\ba\.\s?C\.", "avanti Cristo"),
    (r"\bd\.\s?C\.", "dopo Cristo"),
]
PRONUNCIA = SIGLE + [
    (r"…", ", "),
    (r"[:;]", ","),                                  # il modello a volte «legge» i segni: meglio virgole
    (r"\s*\.\s+", ", "),                            # punti dentro la frase: pause, non parole
    (r"[.!]+\s*$", ""),                             # niente punto finale (a volte lo pronuncia)
    (r"\s{2,}", " "),
]
# un po' di calore e volume costante, come il campione pulito
FILTRO = ("highpass=f=70,equalizer=f=180:t=q:w=1.0:g=2,highshelf=f=9000:g=-1.5,"
          "acompressor=threshold=-22dB:ratio=2.5:attack=10:release=160:makeup=3,loudnorm=I=-17:TP=-1.5")


def pronuncia(frase: str, regole: list | None = None) -> str:
    import re
    for schema, detto in (PRONUNCIA if regole is None else regole):
        frase = re.sub(schema, detto, frase)
    return frase


def campioni(cartella: Path) -> list[str]:
    """I campioni della voce (VOCE_CAMPIONE, VOCE_CAMPIONE_2, _3): più sono, più la voce somiglia."""
    file = []
    for n, nome in enumerate(("VOCE_CAMPIONE", "VOCE_CAMPIONE_2", "VOCE_CAMPIONE_3")):
        dati = os.environ.get(nome, "").strip()
        if not dati:
            continue
        ogg = cartella / f"campione{n}.ogg"
        ogg.write_bytes(base64.b64decode(dati))
        wav = cartella / f"campione{n}.wav"
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(ogg), "-ac", "1", "-ar", "24000", str(wav)], check=True)
        file.append(str(wav))
    return file


def rifinisci(grezzo: Path, finale: Path, frase: str) -> None:
    # VOCE_VELOCITA (per esempio 1.06) accelera senza cambiare il tono della voce
    velocita = float(os.environ.get("VOCE_VELOCITA") or 1)
    filtro = (f"atempo={velocita}," if abs(velocita - 1) > 0.001 else "") + FILTRO
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(grezzo), "-af", filtro, "-ac", "1", "-ar", "24000",
                    str(finale)], check=True)
    print(f"  ✓ {finale.name}: {frase[:60]}")


def genera_xtts(frasi: list, riferimento: list[str], tmp: Path, uscita: Path) -> None:
    os.environ.setdefault("COQUI_TOS_AGREED", "1")
    from TTS.api import TTS   # import qui: è pesante e serve solo con il campione
    tts = TTS(MODELLO)
    for i, frase in enumerate(frasi):
        if not str(frase).strip():
            continue
        grezzo = tmp / f"g{i}.wav"
        # più libertà all'intonazione (meno piatta) e un ritmo un po' più vivo
        tts.tts_to_file(text=pronuncia(frase), speaker_wav=riferimento, language="it", file_path=str(grezzo),
                        temperature=0.85, top_p=0.9, top_k=60, repetition_penalty=5.0, speed=1.08,
                        split_sentences=False)
        rifinisci(grezzo, uscita / f"voce-{i:02d}.wav", frase)


def genera_chatterbox(frasi: list, riferimento: list[str], tmp: Path, uscita: Path) -> None:
    """Chatterbox Multilingual (Resemble AI, licenza MIT): più espressivo, con la manopola
    «exaggeration» (VOCE_ESPRESSIVITA, 0.5 naturale, 0.7-0.8 più teatrale)."""
    unico = tmp / "riferimento.wav"   # i campioni uno dopo l'altro: un solo riferimento più lungo
    elenco = tmp / "rif.txt"
    elenco.write_text("".join(f"file '{f}'\n" for f in riferimento), encoding="utf-8")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", str(elenco), "-ac", "1",
                    "-ar", "24000", str(unico)], check=True)
    import torchaudio as ta
    from chatterbox.mtl_tts import ChatterboxMultilingualTTS
    modello = ChatterboxMultilingualTTS.from_pretrained(device="cpu")
    espressivita = float(os.environ.get("VOCE_ESPRESSIVITA", "0.65"))
    for i, frase in enumerate(frasi):
        if not str(frase).strip():
            continue
        grezzo = tmp / f"c{i}.wav"
        wav = modello.generate(pronuncia(frase), language_id="it", audio_prompt_path=str(unico),
                               exaggeration=espressivita, cfg_weight=0.4, temperature=0.8)
        ta.save(str(grezzo), wav, modello.sr)
        rifinisci(grezzo, uscita / f"voce-{i:02d}.wav", frase)


def genera_edge(frasi: list, tmp: Path, uscita: Path) -> None:
    """Voce neurale italiana di Microsoft (non clonata), tramite edge-tts: molto pulita."""
    voce = os.environ.get("VOCE_EDGE", "it-IT-DiegoNeural")
    for i, frase in enumerate(frasi):
        if not str(frase).strip():
            continue
        grezzo = tmp / f"e{i}.mp3"
        subprocess.run(["edge-tts", "--voice", voce, "--rate", "+4%", "--text", pronuncia(frase),
                        "--write-media", str(grezzo)], check=True)
        rifinisci(grezzo, uscita / f"voce-{i:02d}.wav", frase)


def genera_kokoro(frasi: list, tmp: Path, uscita: Path) -> None:
    """Kokoro (licenza Apache), voce italiana maschile «im_nicola», non clonata."""
    import numpy as np
    import soundfile as sf
    from kokoro import KPipeline
    pipeline = KPipeline(lang_code="i")
    for i, frase in enumerate(frasi):
        if not str(frase).strip():
            continue
        pezzi = [audio for _, _, audio in pipeline(pronuncia(frase), voice=os.environ.get("VOCE_KOKORO", "im_nicola"))]
        grezzo = tmp / f"k{i}.wav"
        sf.write(str(grezzo), np.concatenate(pezzi), 24000)
        rifinisci(grezzo, uscita / f"voce-{i:02d}.wav", frase)


GEMINI_MODELLI = ("gemini-3.1-flash-tts-preview", "gemini-2.5-flash-preview-tts")
# Dopo il primo ascolto: «più veloce, più calda e narrativa, a tratti troppo infantile».
GEMINI_STILE = ("Read aloud in Italian as a mature, warm storyteller: a teacher in his forties telling a "
                "fascinating story to adults. Deep, warm and calm voice, quietly confident, engaging "
                "narrative tone that makes you want to hear the rest. No exaggerated enthusiasm, nothing "
                "childish or cartoonish. Brisk, flowing pace with short natural pauses at commas. Text:")


def _chiedi_gemini(modello: str, chiave: str, testo: str, voce: str) -> bytes:
    corpo = {"contents": [{"parts": [{"text": testo}]}],
             "generationConfig": {"responseModalities": ["AUDIO"], "speechConfig": {
                 "voiceConfig": {"prebuiltVoiceConfig": {"voiceName": voce}}}}}
    richiesta = urllib.request.Request(
        f"https://generativelanguage.googleapis.com/v1beta/models/{modello}:generateContent",
        data=json.dumps(corpo).encode(), method="POST",
        headers={"Content-Type": "application/json", "x-goog-api-key": chiave})   # la chiave mai nell'indirizzo
    with urllib.request.urlopen(richiesta, timeout=120) as r:
        dati = json.loads(r.read())
    return base64.b64decode(dati["candidates"][0]["content"]["parts"][0]["inlineData"]["data"])


def genera_gemini(frasi: list, voce: str, tmp: Path, uscita: Path) -> None:
    """Voce di Google Gemini (piano gratuito): PCM 16 bit, 24 kHz, mono. Riprova se il limite
    al minuto è pieno; se un modello non esiste più passa al successivo."""
    chiave = os.environ.get("GEMINI_API_KEY", "").strip()
    if not chiave:
        print("Voce: segreto GEMINI_API_KEY non impostato, i video restano senza voce.")
        return
    stile = os.environ.get("VOCE_GEMINI_STILE") or GEMINI_STILE
    modelli = [os.environ["VOCE_GEMINI_MODELLO"]] if os.environ.get("VOCE_GEMINI_MODELLO") else list(GEMINI_MODELLI)
    for i, frase in enumerate(frasi):
        if not str(frase).strip():
            continue
        testo = f"{stile}\n{pronuncia(frase, SIGLE)}"   # la punteggiatura resta: Gemini la usa per l'intonazione
        pcm, tentativi = None, 0
        while pcm is None:
            try:
                pcm = _chiedi_gemini(modelli[0], chiave, testo, voce)
            except urllib.error.HTTPError as err:
                if err.code == 404 and len(modelli) > 1:
                    print(f"  · modello {modelli[0]} non disponibile, provo {modelli[1]}")
                    modelli.pop(0)
                    continue
                tentativi += 1
                if err.code in (429, 500, 503) and tentativi <= 8:
                    attesa = 15 * tentativi
                    print(f"  · Gemini occupato ({err.code}), riprovo fra {attesa} s")
                    time.sleep(attesa)
                    continue
                raise SystemExit(f"Gemini ha risposto {err.code}: {err.read()[:300]!r}")
        grezzo = tmp / f"m{i}.pcm"
        grezzo.write_bytes(pcm)
        wav = tmp / f"m{i}.wav"
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "s16le", "-ar", "24000", "-ac", "1", "-i", str(grezzo),
                        str(wav)], check=True)
        rifinisci(wav, uscita / f"voce-{i:02d}.wav", frase)
    print(f"Voce Gemini «{voce}» con il modello {modelli[0]}")


def main() -> int:
    if len(sys.argv) != 3:
        print(__doc__)
        return 2
    frasi = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    uscita = Path(sys.argv[2])
    uscita.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        motore = os.environ.get("VOCE_MOTORE", "xtts")
        if motore.startswith("gemini"):    # «gemini» o «gemini-<Voce>», per esempio gemini-Achird
            genera_gemini(frasi, motore.partition("-")[2] or os.environ.get("VOCE_GEMINI", "Achird"), Path(tmp), uscita)
            return 0
        if motore in ("edge", "kokoro"):   # voci pronte: non serve il campione
            (genera_edge if motore == "edge" else genera_kokoro)(frasi, Path(tmp), uscita)
            return 0
        riferimento = campioni(Path(tmp))
        if not riferimento:
            print("Voce: segreto VOCE_CAMPIONE non impostato, i video restano senza voce.")
            return 0
        if motore == "chatterbox":
            genera_chatterbox(frasi, riferimento, Path(tmp), uscita)
        else:
            genera_xtts(frasi, riferimento, Path(tmp), uscita)
    return 0


if __name__ == "__main__":
    sys.exit(main())
