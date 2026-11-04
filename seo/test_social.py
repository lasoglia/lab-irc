#!/usr/bin/env python3
"""seo/test_social.py — Prove degli script social, senza rete e senza chiavi. Uso: python seo/test_social.py"""

from __future__ import annotations

import datetime as dt
import json
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import coda  # noqa: E402
import social_calendario as cal  # noqa: E402
import social_controllo as ctrl  # noqa: E402
import social_stato as stato  # noqa: E402
import social_quaderno as quaderno  # noqa: E402
import gioco_reel  # noqa: E402

# i giochi veri del sito non devono cambiare il calendario dei test (c'è un test apposta)
cal.FILE_GIOCHI = Path("/non/esiste/social-giochi.json")

ELENCO = [{"chiave": "a"}, {"chiave": "b"}, {"chiave": "c"}]


def con_coda(dati) -> Path:
    file = Path(tempfile.mkdtemp()) / "coda.json"
    file.write_text(dati if isinstance(dati, str) else json.dumps(dati), encoding="utf-8")
    return file


class Coda(unittest.TestCase):
    def test_senza_file_resta_ordine_del_kit(self):
        self.assertEqual(coda.applica(ELENCO, "2026-11-09", Path("/non/esiste")), ELENCO)

    def test_file_guasto_ferma_tutto(self):
        self.assertEqual(coda.applica(ELENCO, "2026-11-09", con_coda("{rotto")), [])

    def test_pausa_ferma_tutto(self):
        self.assertEqual(coda.applica(ELENCO, "2026-11-09", con_coda({"pausa": True, "coda": []})), [])

    def test_solo_post_approvati_con_data_arrivata(self):
        f = con_coda({"coda": [
            {"chiave": "c", "quando": "2026-11-09", "esito": "approvato"},
            {"chiave": "a", "quando": "2026-11-12", "esito": "approvato"},
            {"chiave": "b", "quando": "2026-11-09", "esito": "bozza"},
        ]})
        self.assertEqual([x["chiave"] for x in coda.applica(ELENCO, "2026-11-09", f)], ["c"])

    def test_escluse(self):
        f = con_coda({"coda": [{"chiave": "a", "quando": "2026-11-09", "esito": "approvato"}],
                      "escluse": [{"chiave": "a", "motivo": "x"}]})
        self.assertEqual(coda.applica(ELENCO, "2026-11-09", f), [])

    def test_solo_coda_falso_aggiunge_il_resto(self):
        f = con_coda({"solo_coda": False, "escluse": [{"chiave": "b", "motivo": "x"}],
                      "coda": [{"chiave": "c", "quando": "2026-11-09", "esito": "approvato"}]})
        self.assertEqual([x["chiave"] for x in coda.applica(ELENCO, "2026-11-09", f)], ["c", "a"])


class Calendario(unittest.TestCase):
    def test_pasqua_date_note(self):
        attese = {2024: (3, 31), 2025: (4, 20), 2026: (4, 5), 2027: (3, 28), 2038: (4, 25)}
        for anno, (mese, giorno) in attese.items():
            self.assertEqual(cal.pasqua(anno), dt.date(anno, mese, giorno))

    def test_ceneri_e_pentecoste_2027(self):
        date = {v: k for k, v in cal.mobili(2027).items()}
        self.assertEqual(date["Mercoledì delle Ceneri, inizio della Quaresima"], dt.date(2027, 2, 10))
        self.assertEqual(date["Pentecoste"], dt.date(2027, 5, 16))

    def test_avvento(self):
        self.assertEqual(cal.prima_domenica_avvento(2026), dt.date(2026, 11, 29))
        self.assertEqual(cal.prima_domenica_avvento(2027), dt.date(2027, 11, 28))

    def test_tempi(self):
        self.assertEqual(cal.tempo_liturgico(dt.date(2026, 12, 1)), "Avvento")
        self.assertEqual(cal.tempo_liturgico(dt.date(2027, 3, 1)), "Quaresima")
        self.assertEqual(cal.tempo_liturgico(dt.date(2027, 4, 10)), "Tempo di Pasqua")
        self.assertEqual(cal.tempo_liturgico(dt.date(2026, 11, 3)), "Tempo ordinario")


class CalendarioSocial(unittest.TestCase):
    """Scuola: lezioni lun-ven, sabato lo Shabbat, domenica la grande domanda. Vacanze: strisce lun-mer-ven."""

    def setUp(self):
        self._file, cal.FILE_VACANZE = cal.FILE_VACANZE, Path("/non/esiste/vacanze.json")

    def tearDown(self):
        cal.FILE_VACANZE = self._file

    def test_settimana_di_scuola(self):
        attesi = ["reel", "lezione", "reel", None, "reel", "shabbat", "domenica"]
        self.assertEqual([cal.tipo_del_giorno(dt.date(2026, 11, 9) + dt.timedelta(days=i)) for i in range(7)], attesi)

    def test_vacanze_di_natale(self):
        self.assertEqual(cal.in_vacanza(dt.date(2026, 12, 28)), "vacanze di Natale")
        attesi = ["prof", None, None, "prof", None, None, None]   # dal lunedì 28 dicembre
        self.assertEqual([cal.tipo_del_giorno(dt.date(2026, 12, 28) + dt.timedelta(days=i)) for i in range(7)], attesi)
        self.assertEqual(cal.tipo_del_giorno(dt.date(2027, 1, 8)), "reel")   # venerdì, di nuovo a scuola

    def test_settimana_di_prima(self):   # fino all'8 novembre 2026 lezioni dal lunedì al venerdì
        self.assertEqual(cal.tipo_del_giorno(dt.date(2026, 11, 5)), "lezione")

    def test_vacanze_di_pasqua(self):   # Pasqua 2027: 28 marzo
        self.assertTrue(cal.in_vacanza(dt.date(2027, 3, 25)))
        self.assertTrue(cal.in_vacanza(dt.date(2027, 3, 30)))
        self.assertFalse(cal.in_vacanza(dt.date(2027, 3, 31)))

    def test_file_delle_vacanze(self):
        with tempfile.TemporaryDirectory() as d:
            cal.FILE_VACANZE = Path(d) / "vacanze.json"
            cal.FILE_VACANZE.write_text(json.dumps({"vacanze": [{"dal": "2026-11-09", "al": "2026-11-10", "nome": "ponte"}]}))
            self.assertEqual(cal.tipo_del_giorno(dt.date(2026, 11, 9)), "prof")
            self.assertEqual(cal.tipo_del_giorno(dt.date(2026, 12, 28)), "reel")   # lunedì: il reel di una lezione


class Giochi(unittest.TestCase):
    """Nei 14 giorni dopo l'uscita di un gioco di verifica, il giovedì di scuola esce il suo reel."""

    def setUp(self):
        self._dir = tempfile.TemporaryDirectory()
        self._file, self._ver, self._vac = cal.FILE_GIOCHI, cal.FILE_VERIFICHE, cal.FILE_VACANZE
        cal.FILE_GIOCHI = Path(self._dir.name) / "social-giochi.json"
        cal.FILE_VERIFICHE = Path(self._dir.name) / "verifiche.json"
        cal.FILE_VACANZE = Path("/non/esiste/vacanze.json")
        cal.FILE_VERIFICHE.write_text(json.dumps({"verifiche": [
            {"titolo": "Gioco A", "anno": "2", "file": "/uploads/ii-1-g-a-gioco.html"},
            {"titolo": "Altro", "anno": "1", "file": "/uploads/altro.pdf"}]}))

    def tearDown(self):
        cal.FILE_GIOCHI, cal.FILE_VERIFICHE, cal.FILE_VACANZE = self._file, self._ver, self._vac
        self._dir.cleanup()

    def test_periodo_del_gioco(self):
        nuovi = cal.registra_giochi_nuovi(dt.date(2026, 11, 10))
        self.assertEqual([v["file"] for v in nuovi], ["uploads/ii-1-g-a-gioco.html"])
        self.assertEqual(cal.registra_giochi_nuovi(dt.date(2026, 11, 11)), [])        # già visto: non riparte
        self.assertEqual(cal.tipo_del_giorno(dt.date(2026, 11, 12)), "gioco")          # giovedì nel periodo
        self.assertEqual(cal.tipo_del_giorno(dt.date(2026, 11, 19)), "gioco")
        self.assertIsNone(cal.tipo_del_giorno(dt.date(2026, 11, 26)))                 # periodo finito
        self.assertEqual(cal.tipo_del_giorno(dt.date(2026, 11, 13)), "reel")           # gli altri giorni non cambiano

    def test_periodo_a_mano(self):
        cal.FILE_GIOCHI.write_text(json.dumps({"giochi": [{"file": "uploads/x-gioco.html", "titolo": "X",
                                                           "uscito": "2026-10-01", "dal": "2026-12-01", "al": "2026-12-04"}]}))
        self.assertEqual(cal.tipo_del_giorno(dt.date(2026, 12, 3)), "gioco")
        self.assertIsNone(cal.tipo_del_giorno(dt.date(2026, 11, 26)))   # «uscito» non conta se c'è «dal»

    def test_reel_del_gioco(self):
        m = {"presentazione": "Quattro luoghi.", "momenti": [{"cosa": c, "s": s} for c, s in
             [("parla", 7.5), ("domanda", 10.1), ("sbagliata", 14.2), ("ombra", 17.8), ("giusta", 32.6)]]}
        c = gioco_reel.copione("uploads/ii-1-g-a-gioco.html", m, "v.mp4")
        self.assertEqual([q["tipo"] for q in c["inquadrature"]], ["clip"] * 5 + ["chiusa"])
        self.assertEqual(c["inquadrature"][2]["da"], 13.6)
        p = gioco_reel.post("uploads/ii-1-g-a-gioco.html", m, 1)
        for canale in ("facebook", "instagram", "telegram"):
            self.assertIn("password", p[canale])                                       # mai l'accesso libero
        self.assertIn("#religionecattolica", p["instagram"])


class Storie(unittest.TestCase):
    """Le storie del giorno: ricorrenza al mattino, «stasera alle 19» a pranzo solo nei giorni di reel."""

    def setUp(self):
        import storie
        self.storie = storie
        self._post = storie.post_di_oggi

    def tearDown(self):
        self.storie.post_di_oggi = self._post

    def test_mattina_con_ricorrenza(self):
        s = self.storie.scheda("mattina", dt.date(2026, 12, 8))
        self.assertIn("Immacolata", s["titolo"])

    def test_pranzo(self):
        self.storie.post_di_oggi = lambda d: {"titolo": "Lezione", "gancio": "Un gancio", "anno": "2", "origine": "x"}
        self.assertEqual(self.storie.scheda("pranzo", dt.date(2026, 11, 9))["titolo"], "Un gancio")   # lunedì, reel
        self.assertIsNone(self.storie.scheda("pranzo", dt.date(2026, 11, 10)))                         # martedì, carosello
        self.storie.post_di_oggi = lambda d: None
        self.assertIsNone(self.storie.scheda("pranzo", dt.date(2026, 11, 9)))                          # niente post, niente storia


class LezioneNelReel(unittest.TestCase):
    """La lezione interattiva non si presenta: le sue scene illustrano le frasi del racconto."""
    SCENE = [{"n": 1, "fase": "Aggancio", "titolo": "Una frase famosa", "contenuto": "Cesare"},
             {"n": 3, "fase": "Scoperta", "titolo": "Un regno spezzato", "contenuto": "tetrarca Erode quattro parti"},
             {"n": 4, "fase": "Scoperta", "titolo": "Una frase che è una mappa", "contenuto": "Luca governanti Pilato Tiberio"}]

    def test_scena_per_la_frase(self):
        import regista
        inq = [{"tipo": "gancio"}, {"tipo": "pagina"}, {"tipo": "prof", "voce": "Luca elenca i governanti: Tiberio e Pilato."},
               {"tipo": "chiusa"}]
        c = regista.garantisci_lezione({"artefatto": "a.html", "scene_lezione": self.SCENE, "inquadrature": inq})
        self.assertEqual([q["tipo"] for q in c["inquadrature"]], ["gancio", "pagina", "lezione", "chiusa"])
        self.assertEqual(c["inquadrature"][2]["scena"], 4)
        self.assertIn("Pilato", c["inquadrature"][2]["voce"])                     # la voce resta quella del racconto

    def test_scena_sbagliata_o_doppia(self):
        import regista
        inq = [{"tipo": "lezione", "scena": 99, "voce": "il regno di Erode diviso in quattro"},
               {"tipo": "lezione", "scena": 3, "voce": "x"}, {"tipo": "lezione", "scena": 4, "voce": "y"}]
        c = regista.garantisci_lezione({"artefatto": "a.html", "scene_lezione": self.SCENE, "inquadrature": inq})
        self.assertEqual([q["tipo"] for q in c["inquadrature"]], ["lezione", "lezione", "prof"])
        self.assertEqual(c["inquadrature"][0]["scena"], 3)
        self.assertNotEqual(c["inquadrature"][1]["scena"], 3)

    def test_senza_lezione(self):
        import regista
        c = regista.garantisci_lezione({"artefatto": "", "inquadrature": [{"tipo": "lezione", "voce": "y"}]})
        self.assertEqual(c["inquadrature"][0]["tipo"], "prof")


class Controllo(unittest.TestCase):
    TG = {"a": "2026-11-09"}
    META = {"a": {"facebook": "2026-11-09", "instagram": "2026-11-09"}}

    def test_tutto_uscito(self):
        self.assertEqual(ctrl.valuta("2026-11-09", self.TG, self.META, None), ("ok", []))

    def test_canale_mancante(self):
        meta = {"a": {"facebook": "2026-11-09", "instagram": "2026-11-05"}}
        self.assertEqual(ctrl.valuta("2026-11-09", self.TG, meta, None), ("mancante", ["instagram"]))

    def test_giorno_senza_uscita(self):
        self.assertEqual(ctrl.valuta("2026-12-29", {}, {}, None)[0], "non-previsto")   # martedì di vacanza

    def test_pausa(self):
        self.assertEqual(ctrl.valuta("2026-11-09", {}, {}, {"pausa": True})[0], "in-pausa")

    def test_coda_vuota_ma_post_usciti(self):
        self.assertEqual(ctrl.valuta("2026-11-09", self.TG, self.META, {"coda": []})[0], "ok")

    def test_coda_vuota_e_nessun_post(self):
        esito, mancanti = ctrl.valuta("2026-11-13", self.TG, self.META, {"coda": []})   # venerdì
        self.assertEqual(esito, "mancante")
        self.assertIn("nessun post in coda", mancanti[0])

    def test_martedi_carosello(self):
        self.assertEqual(cal.tipo_del_giorno(dt.date(2026, 11, 10)), "lezione")

    def test_giovedi_solo_storie(self):
        self.assertEqual(ctrl.valuta("2026-11-12", self.TG, self.META, {"coda": []})[0], "non-previsto")


class Schede(unittest.TestCase):
    """Le schede che leggono gli agenti si scrivono senza errori, per ogni tipo di post."""

    def test_scheda_lezione(self):
        testo = stato.scheda({"chiave": "k", "titolo": "T", "file": "a.png", "url": "u"}, {}, None)
        self.assertIn("Testo della lezione", testo)

    def test_schede_rubriche(self):
        quando = dt.date(2026, 11, 7)
        for r in ({"chiave": "p", "titolo": "P", "file": "p.png", "tipo": "prof", "vignette": [{"parla": "prof"}]},
                  {"chiave": "s", "titolo": "S", "file": "s.png", "formato": "shabbat", "fonti": [{"titolo": "x", "url": "y"}]},
                  {"chiave": "d", "titolo": "D", "file": "d.png", "formato": "grande-domanda", "carosello": [{"titolo": "a", "testo": "b"}]}):
            self.assertIn(r["titolo"], stato.scheda_rubrica(r, quando, None))
        # la grande domanda passa un elenco di lezioni
        d = {"chiave": "d", "titolo": "D", "file": "d.png", "formato": "grande-domanda"}
        testo = stato.scheda_rubrica(d, quando, [{"titolo": "L1"}, {"titolo": "L2"}])
        self.assertIn("«L1»", testo)
        self.assertIn("«L2»", testo)


class Quaderno(unittest.TestCase):
    """Il quaderno del Lab accetta solo proposte ben fatte."""

    BUONO = {"regole_apprese": [{"regola": "Gancio con un numero", "prova": "8 reel, 9 s contro 6 s", "dal": "2026-11-09", "forza": "confermata"}],
             "esperimento": {"ipotesi": "Il gancio con un numero tiene di più", "istruzione": "Inizia il gancio con un numero vero.",
                             "misura": "tempo medio di visione", "dal": "2026-11-09", "al": "2026-11-15"},
             "esperimenti": [], "idee": [{"idea": "Serie in tre puntate", "fonte": "esploratore", "stato": "nuova", "perché": "continuità"}]}

    def test_proposta_buona(self):
        self.assertEqual(quaderno.controlla(self.BUONO), [])

    def test_proposta_sbagliata(self):
        cattivo = {**self.BUONO, "idee": [{"idea": "x", "stato": "boh"}], "regole_apprese": [{"regola": "y"}]}
        self.assertTrue(len(quaderno.controlla(cattivo)) >= 2)

    def test_niente_email(self):
        con_email = {**self.BUONO, "idee": [{"idea": "scrivere a prova@esempio.it", "stato": "nuova"}]}
        self.assertTrue(any("email" in e for e in quaderno.controlla(con_email)))


if __name__ == "__main__":
    unittest.main(verbosity=1)
