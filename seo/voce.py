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
import re
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
    velocita = float(os.environ.get("VOCE_VELOCITA") or VELOCITA_SCELTA)
    filtro = (f"atempo={velocita}," if abs(velocita - 1) > 0.001 else "") + FILTRO
    # a 44,1 kHz con un buon ricampionamento, la stessa frequenza della colonna sonora (seo/audio_reel.py)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(grezzo), "-af", filtro + ",aresample=44100:filter_size=64",
                    "-ac", "1", "-ar", "44100", str(finale)], check=True)
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


# Scelta del docente (4 novembre 2026): Sadachbia, modello 2.5, stile da narratore appassionato,
# velocità 1.03 (prima: Rasalgethi con lo stile caldo e misurato).
GEMINI_MODELLI = ("gemini-2.5-flash-preview-tts", "gemini-3.1-flash-tts-preview")
VOCE_SCELTA = "gemini-Sadachbia"
VELOCITA_SCELTA = "1.03"
# Stile da narratore appassionato di storia (richiesta del docente: «più entusiasta»): lo stile, non
# l'imitazione di una persona reale.
GEMINI_STILE_NARRATORE = (
    "Read aloud in Italian as a passionate history storyteller who genuinely loves this anecdote and can't "
    "wait to tell it: lively and enthusiastic, expressive intonation with real ups and downs, a smile and a "
    "touch of irony in the voice, emphasis on the key words, short dramatic pauses before the surprising part, "
    "quicker pace on the build-up and slower on the reveal. Warm, adult, conversational, never shouting, never "
    "childish, never like an announcer. Text:")
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


def _errore_gemini(err: urllib.error.HTTPError) -> tuple[str, float]:
    """(quale limite, quanti secondi aspettare) da una risposta di errore di Gemini."""
    try:
        dettagli = json.loads(err.read()).get("error", {}).get("details", [])
    except (ValueError, OSError):
        return "", 0
    limite = " ".join(v.get("quotaId", "") for d in dettagli for v in d.get("violations", []))
    attesa = next((d.get("retryDelay", "") for d in dettagli if d.get("retryDelay")), "")
    return limite, float(attesa.rstrip("s") or 0)


def _gemini_con_riprova(modelli: list, chiave: str, testo: str, voce: str) -> bytes:
    """Chiede l'audio; se il limite al minuto è pieno aspetta, se quello del giorno è finito
    (o il modello non c'è più) passa al modello successivo, che ha un limite suo."""
    tentativi = 0
    while True:
        try:
            return _chiedi_gemini(modelli[0], chiave, testo, voce)
        except urllib.error.HTTPError as err:
            limite, attesa = _errore_gemini(err) if err.code == 429 else ("", 0)
            if (err.code == 404 or "PerDay" in limite) and len(modelli) > 1:
                print(f"  · {modelli[0]}: {'limite del giorno finito' if limite else 'non disponibile'}, provo {modelli[1]}")
                modelli.pop(0)
                continue
            tentativi += 1
            if err.code in (429, 500, 503) and "PerDay" not in limite and tentativi <= 6:
                attesa = max(attesa, 10 * tentativi) + 2
                print(f"  · Gemini occupato ({err.code}), riprovo fra {attesa:.0f} s")
                time.sleep(attesa)
                continue
            raise SystemExit(f"Gemini ha risposto {err.code} {limite}".strip())
        except (urllib.error.URLError, OSError) as err:   # rete interrotta o risposta che non arriva
            tentativi += 1
            if tentativi > 4:
                raise
            print(f"  · rete interrotta ({type(err).__name__}), riprovo fra {10 * tentativi} s")
            time.sleep(10 * tentativi)


def _silenzi(wav: Path) -> list[tuple[float, float]]:
    esito = subprocess.run(["ffmpeg", "-v", "info", "-i", str(wav), "-af", "silencedetect=noise=-38dB:d=0.35",
                            "-f", "null", "-"], capture_output=True, text=True).stderr
    inizi = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", esito)]
    fini = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", esito)]
    return list(zip(inizi, fini))


def _in_wav(pcm: bytes, wav: Path) -> None:
    grezzo = wav.with_suffix(".pcm")
    grezzo.write_bytes(pcm)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "s16le", "-ar", "24000", "-ac", "1", "-i", str(grezzo),
                    str(wav)], check=True)


def genera_gemini(frasi: list, voce: str, tmp: Path, uscita: Path) -> None:
    """Voce di Google Gemini (piano gratuito, PCM 16 bit, 24 kHz, mono). Il piano gratuito ha
    poche richieste al giorno: tutto il reel si chiede in UNA richiesta, una frase per riga con
    una pausa fra l'una e l'altra, poi si taglia nelle pause più lunghe. Se il taglio non torna,
    si ripiega su una richiesta per frase."""
    chiave = os.environ.get("GEMINI_API_KEY", "").strip()
    if not chiave:
        print("Voce: segreto GEMINI_API_KEY non impostato, i video restano senza voce.")
        return
    stile = os.environ.get("VOCE_GEMINI_STILE") or GEMINI_STILE_NARRATORE
    modelli = [os.environ["VOCE_GEMINI_MODELLO"]] if os.environ.get("VOCE_GEMINI_MODELLO") else list(GEMINI_MODELLI)
    righe = [(i, pronuncia(f, SIGLE)) for i, f in enumerate(frasi) if str(f).strip()]
    tutto = tmp / "gemini-tutto.wav"
    istruzione = stile.replace(" Text:", " Each line is a separate sentence: leave a clear pause of about one "
                               "second between lines. Text:")
    _in_wav(_gemini_con_riprova(modelli, chiave, istruzione + "\n" + "\n".join(t for _, t in righe), voce), tutto)
    pause = sorted(_silenzi(tutto), key=lambda x: x[1] - x[0], reverse=True)[:len(righe) - 1]
    if len(pause) == len(righe) - 1:
        tagli = [0.0] + [(a + b) / 2 for a, b in sorted(pause)] + [None]
        for (i, _), da, a in zip(righe, tagli, tagli[1:]):
            pezzo = tmp / f"m{i}.wav"
            taglio = f"atrim={da:.3f}" + (f":{a:.3f}" if a else "")   # atrim: -ss/-to qui non accorcerebbero
            subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(tutto), "-af", f"{taglio},asetpts=N/SR/TB,"
                            "silenceremove=start_periods=1:start_threshold=-45dB,areverse,"
                            "silenceremove=start_periods=1:start_threshold=-45dB,afade=t=in:d=0.012,areverse,"
                            "afade=t=in:d=0.012", str(pezzo)], check=True)
            rifinisci(pezzo, uscita / f"voce-{i:02d}.wav", frasi[i])
    else:
        print(f"  · pause trovate {len(pause)} su {len(righe) - 1}: chiedo una frase per volta")
        for i, testo in righe:
            pezzo = tmp / f"m{i}.wav"
            _in_wav(_gemini_con_riprova(modelli, chiave, f"{stile}\n{testo}", voce), pezzo)
            rifinisci(pezzo, uscita / f"voce-{i:02d}.wav", frasi[i])
    print(f"Voce Gemini «{voce}» con il modello {modelli[0]}")


def main() -> int:
    if len(sys.argv) != 3:
        print(__doc__)
        return 2
    frasi = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    uscita = Path(sys.argv[2])
    uscita.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        motore = os.environ.get("VOCE_MOTORE") or VOCE_SCELTA
        if motore.startswith("gemini"):    # «gemini» o «gemini-<Voce>», per esempio gemini-Achird
            nome, _, versione = motore.partition("-")[2].partition("@")   # gemini-<Voce>[@2.5|@3.1]
            if versione:
                os.environ["VOCE_GEMINI_MODELLO"] = {"2.5": GEMINI_MODELLI[0], "3.1": GEMINI_MODELLI[1]}.get(versione, versione)
            genera_gemini(frasi, nome or os.environ.get("VOCE_GEMINI", "Sadachbia"), Path(tmp), uscita)
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
