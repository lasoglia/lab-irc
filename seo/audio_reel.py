#!/usr/bin/env python3
"""
seo/audio_reel.py — La colonna sonora dei video a fumetti, generata dal codice.

Niente brani di altri (e quindi niente problemi di diritti): una musichetta allegra e
leggera — accordi morbidi, una marimba che arpeggia, un basso e percussioni leggere —
con la tonalità e il ritmo scelti a partire dal titolo, così ogni video suona un po'
diverso. Sopra, gli effetti a tempo con le scene: un «pop» quando compare un fumetto,
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


def metti(traccia: np.ndarray, suono: np.ndarray, quando: float, volume: float) -> None:
    i = int(quando * SR)
    if i >= len(traccia):
        return
    fine = min(len(traccia), i + len(suono))
    traccia[i:fine] += volume * suono[: fine - i]


def componi(tempi: dict) -> np.ndarray:
    durata = float(tempi["durata"])
    seme = int(hashlib.sha256(str(tempi.get("seme", "")).encode()).hexdigest()[:8], 16)
    rng = np.random.default_rng(seme)
    chiave = list(SCALE.values())[seme % len(SCALE)]
    giro = GIRI[(seme // 7) % len(GIRI)]
    bpm = 92 + (seme // 11) % 16                       # tra 92 e 107
    battito = 60 / bpm
    battuta = 4 * battito
    n = int((durata + 0.5) * SR)
    musica, effetti = np.zeros(n), np.zeros(n)
    radice_do4 = -9 + chiave                            # do4 rispetto al la4, più la tonalità

    b = 0
    t = 0.0
    while t < durata:
        grado = giro[b % len(giro)]
        r = radice_do4 + grado
        minore = grado == 9                             # il vi grado è minore
        accordo = [r, r + (3 if minore else 4), r + 7]
        metti(musica, pad([nota(x - 12) for x in accordo], battuta + 0.3), t, 0.16)
        metti(musica, basso(nota(r - 24), battuta / 2), t, 0.35)
        metti(musica, basso(nota(r - 24), battuta / 2), t + battuta / 2, 0.28)
        arpeggio = [accordo[0], accordo[1], accordo[2], accordo[1] + 12, accordo[2], accordo[1], accordo[0] + 12, accordo[2]]
        for k, x in enumerate(arpeggio):                # crome
            metti(musica, marimba(nota(x), 0.5), t + k * battito / 2, 0.16 if k % 2 == 0 else 0.11)
        for k in range(4):
            if k in (0, 2):
                metti(musica, cassa(), t + k * battito, 0.22)
            metti(musica, charleston(rng), t + k * battito + battito / 2, 0.3)
        t += battuta
        b += 1

    for s in tempi.get("pop", []):
        metti(effetti, pop(rng), s, 0.32)
    for s in tempi.get("whoosh", []):
        metti(effetti, whoosh(rng), s, 0.14)
    for s in tempi.get("campanello", []):
        metti(effetti, campanello(), s, 0.25)

    traccia = (musica + effetti)[: int(durata * SR)]
    # dissolvenze e volume: la musica resta sotto, mai invadente
    k = int(0.4 * SR)
    traccia[:k] *= np.linspace(0, 1, k)
    k = int(1.5 * SR)
    traccia[-k:] *= np.linspace(1, 0, k)
    picco = np.max(np.abs(traccia)) or 1
    return traccia / picco * 0.6


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
