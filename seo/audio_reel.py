#!/usr/bin/env python3
"""
seo/audio_reel.py — La colonna sonora dei video a fumetti, generata dal codice.

Niente brani di altri (e quindi niente problemi di diritti): una base ritmata da reel —
una salita iniziale, cassa dritta e battimani, basso pulsante, accordi a scatti e un
piccolo motivo — con tonalità, ritmo e motivo scelti a partire dal titolo, così ogni
video suona diverso. Se c'è la voce che legge i fumetti, la musica scende sotto le parole. Sopra, gli effetti a tempo con le scene: un «pop» quando compare un fumetto,
un «whoosh» quando cambia scena, un campanello sull'invito finale.

Uso (lo chiama seo/reel.mjs):
  python seo/audio_reel.py tempi.json uscita.wav
dove tempi.json è {"durata": s, "pop": [s, ...], "whoosh": [s, ...], "campanello": [s], "seme": "testo"}
"""

from __future__ import annotations

import hashlib
import json
import sys
import wave

import numpy as np

SR = 44100
SCALE = {"C": 0, "D": 2, "E": 4, "F": 5, "G": 7, "A": 9}
GIRI = [[0, 7, 9, 5], [0, 5, 7, 0], [9, 5, 0, 7], [0, 9, 5, 7]]   # I-V-vi-IV e simili (gradi in semitoni)


def nota(semitoni_da_la4: float) -> float:
    return 440.0 * 2 ** (semitoni_da_la4 / 12)


def inviluppo(n: int, attacco: float, decadimento: float) -> np.ndarray:
    t = np.arange(n) / SR
    env = np.exp(-t / max(decadimento, 1e-3))
    a = int(attacco * SR)
    if a > 0:
        env[:a] *= np.linspace(0, 1, a)
    return env


def marimba(freq: float, durata: float) -> np.ndarray:
    n = int(durata * SR)
    t = np.arange(n) / SR
    suono = (np.sin(2 * np.pi * freq * t) * inviluppo(n, 0.003, 0.35)
             + 0.35 * np.sin(2 * np.pi * freq * 4 * t) * inviluppo(n, 0.002, 0.08)
             + 0.15 * np.sin(2 * np.pi * freq * 10 * t) * inviluppo(n, 0.001, 0.02))
    return suono


def pad(freqs: list[float], durata: float) -> np.ndarray:
    n = int(durata * SR)
    t = np.arange(n) / SR
    s = sum(np.sin(2 * np.pi * f * t) + 0.25 * np.sin(2 * np.pi * 2 * f * t + 0.3) for f in freqs)
    env = np.minimum(1, t / 0.6) * np.minimum(1, (durata - t) / 0.5).clip(0, 1)
    return s * env / len(freqs)


def basso(freq: float, durata: float) -> np.ndarray:
    n = int(durata * SR)
    t = np.arange(n) / SR
    return np.sin(2 * np.pi * freq * t) * inviluppo(n, 0.01, 0.45)


def cassa(durata: float = 0.3) -> np.ndarray:
    n = int(durata * SR)
    t = np.arange(n) / SR
    freq = 120 * np.exp(-t / 0.05) + 45
    return np.sin(2 * np.pi * np.cumsum(freq) / SR) * inviluppo(n, 0.001, 0.12)


def charleston(rng, durata: float = 0.08) -> np.ndarray:
    n = int(durata * SR)
    rumore = rng.standard_normal(n)
    rumore = np.diff(rumore, prepend=0)          # più acuto
    return rumore * inviluppo(n, 0.0005, 0.02) * 0.25


def pop(rng) -> np.ndarray:
    n = int(0.12 * SR)
    t = np.arange(n) / SR
    freq = 500 + 900 * (t / t[-1])
    s = np.sin(2 * np.pi * np.cumsum(freq) / SR) * inviluppo(n, 0.001, 0.035)
    return s + 0.15 * rng.standard_normal(n) * inviluppo(n, 0.0005, 0.008)


def whoosh(rng) -> np.ndarray:
    n = int(0.45 * SR)
    rumore = rng.standard_normal(n)
    # passa-basso che si apre e si chiude: un soffio
    taglio = np.sin(np.linspace(0, np.pi, n)) ** 2 * 0.1 + 0.01
    uscita, y = np.zeros(n), 0.0
    for i in range(n):
        y += taglio[i] * (rumore[i] - y)
        uscita[i] = y
    return uscita * np.sin(np.linspace(0, np.pi, n)) * 1.6


def campanello() -> np.ndarray:
    n = int(1.6 * SR)
    t = np.arange(n) / SR
    s = np.zeros(n)
    for f, a, d in ((1318.5, 1, 0.9), (1318.5 * 2.76, 0.4, 0.4), (1318.5 * 5.4, 0.2, 0.2), (1975.5, 0.6, 0.7)):
        s += a * np.sin(2 * np.pi * f * t) * inviluppo(n, 0.002, d)
    return s / 2


def sega(freq: float, durata: float, armoniche: int = 10, brillantezza: float = 1.0) -> np.ndarray:
    """Onda a dente di sega costruita con le armoniche (niente fruscii digitali)."""
    n = int(durata * SR)
    t = np.arange(n) / SR
    onda = np.zeros(n)
    for k in range(1, armoniche + 1):
        if freq * k > 12000:
            break
        onda += np.sin(2 * np.pi * freq * k * t) / k * (brillantezza ** (k - 1))
    return onda


def cassa_forte() -> np.ndarray:
    n = int(0.35 * SR)
    t = np.arange(n) / SR
    freq = 160 * np.exp(-t / 0.035) + 48
    corpo = np.sin(2 * np.pi * np.cumsum(freq) / SR) * inviluppo(n, 0.0005, 0.16)
    clic = np.exp(-t / 0.002) * 0.5
    return np.tanh(1.8 * (corpo + clic))


def battimani(rng) -> np.ndarray:
    n = int(0.25 * SR)
    rumore = np.diff(rng.standard_normal(n), prepend=0)
    env = np.zeros(n)
    for ritardo in (0, 0.008, 0.017):                 # tre mani quasi insieme
        i = int(ritardo * SR)
        env[i:] += inviluppo(n - i, 0.0005, 0.03)
    env += 0.4 * inviluppo(n, 0.001, 0.09)
    return rumore * env * 0.5


def piatto(rng, durata: float) -> np.ndarray:
    n = int(durata * SR)
    rumore = np.diff(np.diff(rng.standard_normal(n), prepend=0), prepend=0)
    return rumore * inviluppo(n, 0.001, durata / 3) * 0.12


def salita(rng, durata: float) -> np.ndarray:
    """Il «riser» dell'inizio: rumore e tono che salgono fino alla prima scena."""
    n = int(durata * SR)
    t = np.arange(n) / SR
    crescita = (t / durata) ** 2
    freq = 200 + 1800 * crescita
    tono = np.sin(2 * np.pi * np.cumsum(freq) / SR) * 0.3
    rumore = np.diff(rng.standard_normal(n), prepend=0) * 0.25
    return (tono + rumore) * crescita


def metti(traccia: np.ndarray, suono: np.ndarray, quando: float, volume: float) -> None:
    i = int(quando * SR)
    if i < 0:
        suono, i = suono[-i:], 0
    if i >= len(traccia):
        return
    fine = min(len(traccia), i + len(suono))
    traccia[i:fine] += volume * suono[: fine - i]


def leggi_wav(percorso: str) -> np.ndarray:
    with wave.open(percorso, "rb") as w:
        sr = w.getframerate()
    if sr != SR:
        # ricampionamento di qualità con ffmpeg: quello lineare rendeva la voce metallica, «robotica»
        import subprocess
        import tempfile
        with tempfile.TemporaryDirectory() as tmp:
            nuovo = f"{tmp}/r.wav"
            esito = subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", percorso, "-af",
                                    f"aresample={SR}:filter_size=64:cutoff=0.97", "-ac", "1", nuovo])
            if esito.returncode == 0:
                return leggi_wav(nuovo)
    with wave.open(percorso, "rb") as w:
        dati = np.frombuffer(w.readframes(w.getnframes()), dtype="<i2").astype(float) / 32768
        canali, sr = w.getnchannels(), w.getframerate()
    if canali == 2:
        dati = dati.reshape(-1, 2).mean(axis=1)
    if sr != SR:                                       # di riserva, se ffmpeg non c'è
        dati = np.interp(np.arange(0, len(dati), sr / SR), np.arange(len(dati)), dati)
    return dati


def componi(tempi: dict) -> np.ndarray:
    durata = float(tempi["durata"])
    seme = int(hashlib.sha256(str(tempi.get("seme", "")).encode()).hexdigest()[:8], 16)
    rng = np.random.default_rng(seme)
    chiave = list(SCALE.values())[seme % len(SCALE)]
    giro = GIRI[(seme // 7) % len(GIRI)]
    bpm = 118 + (seme // 11) % 9                        # tra 118 e 126: ritmo da reel
    battito = 60 / bpm
    battuta = 4 * battito
    n = int((durata + 0.5) * SR)
    musica, ritmo, effetti = np.zeros(n), np.zeros(n), np.zeros(n)
    radice = -9 + chiave                                # do4 rispetto al la4, più la tonalità
    pentatonica = [0, 2, 4, 7, 9, 12, 14]
    motivo = [pentatonica[(seme >> (3 * i)) % len(pentatonica)] for i in range(6)]   # il ritornello del video

    attacco = min(1.4, durata / 4)                       # la salita, poi tutto parte insieme
    metti(effetti, salita(rng, attacco), 0, 0.35)
    t, b = attacco, 0
    metti(ritmo, piatto(rng, 1.8), t, 1.0)
    while t < durata:
        grado = giro[b % len(giro)]
        r = radice + grado
        minore = grado == 9
        accordo = [r, r + (3 if minore else 4), r + 7]
        for k in range(8):                              # basso pulsante in crome
            metti(musica, sega(nota(r - 24), battito / 2 * 0.9, 6, 0.8) * inviluppo(int(battito / 2 * 0.9 * SR), 0.003, 0.12), t + k * battito / 2, 0.28)
        for k in (0.5, 1.5, 2.5, 3.5):                  # accordi a scatti in levare
            stab = sum(sega(nota(x), 0.18, 9, 0.85) for x in accordo) / 3
            metti(musica, stab * inviluppo(len(stab), 0.002, 0.07), t + k * battito, 0.32)
        if b % 2 == 1:                                  # il motivo, una battuta sì e una no
            for i, intervallo in enumerate(motivo):
                nt = sega(nota(radice + 12 + intervallo), battito / 2 * 0.95, 5, 0.6)
                metti(musica, nt * inviluppo(len(nt), 0.005, 0.18), t + i * battito / 2 + battito, 0.18)
        for k in range(4):
            metti(ritmo, cassa_forte(), t + k * battito, 0.55)
            if k in (1, 3):
                metti(ritmo, battimani(rng), t + k * battito, 0.45)
            for s in range(4):                          # charleston in semicrome, accentato in levare
                metti(ritmo, charleston(rng), t + k * battito + s * battito / 4, 0.28 if s == 2 else 0.12)
        if b % 4 == 3:
            metti(ritmo, piatto(rng, 1.4), t + battuta, 0.8)
        t += battuta
        b += 1

    # «pompa»: la musica si abbassa un attimo a ogni colpo di cassa, come nei pezzi da ballare
    pompa = np.ones(n)
    passo = int(battito * SR)
    curva = 1 - 0.45 * np.exp(-np.arange(passo) / (0.09 * SR))
    for i in range(int(attacco * SR), n, passo):
        pompa[i:i + passo] = curva[: len(pompa[i:i + passo])]
    musica *= pompa

    for s in tempi.get("pop", []):
        metti(effetti, pop(rng), s, 0.4)
    for s in tempi.get("whoosh", []):
        metti(effetti, whoosh(rng), s, 0.16)
    for s in tempi.get("campanello", []):
        metti(effetti, campanello(), s, 0.3)

    base = musica + ritmo
    # la voce, se c'è: la musica scende sotto le parole
    voce = np.zeros(n)
    for v in tempi.get("voce", []):
        try:
            metti(voce, leggi_wav(v["file"]), float(v["inizio"]), 1.0)
        except Exception:
            pass
    if np.any(voce):
        # con la voce la musica resta a metà: un po' più bassa sempre, e scende mentre il prof parla
        presenza = np.convolve(np.abs(voce) > 0.01, np.ones(int(0.3 * SR)) / (0.3 * SR), mode="same")
        base *= 0.65 * (1 - 0.6 * np.clip(presenza * 3, 0, 1))
        effetti *= 0.6
        voce *= 0.95 / (np.max(np.abs(voce)) or 1)

    traccia = (base + effetti + voce)[: int(durata * SR)]
    k = int(1.2 * SR)
    traccia[-k:] *= np.linspace(1, 0, k)
    if np.any(voce):
        # con la voce niente saturazione (sporcava la voce): solo un volume pulito, lineare
        traccia = 0.89 * traccia / (np.max(np.abs(traccia)) or 1)
    else:
        traccia = np.tanh(1.4 * traccia / (np.max(np.abs(traccia)) or 1))   # solo musica: più «pieno»
    return traccia / (np.max(np.abs(traccia)) or 1) * 0.89


def scrivi_wav(percorso: str, dati: np.ndarray) -> None:
    stereo = np.repeat((dati * 32767).astype("<i2")[:, None], 2, axis=1)
    with wave.open(percorso, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(stereo.tobytes())


if __name__ == "__main__":
    tempi = json.loads(open(sys.argv[1], encoding="utf-8").read())
    scrivi_wav(sys.argv[2], componi(tempi))
