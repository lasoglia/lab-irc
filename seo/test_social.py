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
    """Scuola: lezioni lun-ven, sabato niente, domenica la grande domanda. Vacanze: strisce lun-mer-ven."""

    def setUp(self):
        self._file, cal.FILE_VACANZE = cal.FILE_VACANZE, Path("/non/esiste/vacanze.json")

    def tearDown(self):
        cal.FILE_VACANZE = self._file

    def test_settimana_di_scuola(self):
        attesi = ["lezione"] * 5 + [None, "domenica"]
        self.assertEqual([cal.tipo_del_giorno(dt.date(2026, 11, 9) + dt.timedelta(days=i)) for i in range(7)], attesi)

    def test_vacanze_di_natale(self):
        self.assertEqual(cal.in_vacanza(dt.date(2026, 12, 28)), "vacanze di Natale")
        attesi = ["prof", None, "prof", None, "prof", None, None]   # dal lunedì 28 dicembre
        self.assertEqual([cal.tipo_del_giorno(dt.date(2026, 12, 28) + dt.timedelta(days=i)) for i in range(7)], attesi)
        self.assertEqual(cal.tipo_del_giorno(dt.date(2027, 1, 7)), "lezione")

    def test_vacanze_di_pasqua(self):   # Pasqua 2027: 28 marzo
        self.assertTrue(cal.in_vacanza(dt.date(2027, 3, 25)))
        self.assertTrue(cal.in_vacanza(dt.date(2027, 3, 30)))
        self.assertFalse(cal.in_vacanza(dt.date(2027, 3, 31)))

    def test_file_delle_vacanze(self):
        with tempfile.TemporaryDirectory() as d:
            cal.FILE_VACANZE = Path(d) / "vacanze.json"
            cal.FILE_VACANZE.write_text(json.dumps({"vacanze": [{"dal": "2026-11-09", "al": "2026-11-10", "nome": "ponte"}]}))
            self.assertEqual(cal.tipo_del_giorno(dt.date(2026, 11, 9)), "prof")
            self.assertEqual(cal.tipo_del_giorno(dt.date(2026, 12, 28)), "lezione")


class Controllo(unittest.TestCase):
    TG = {"a": "2026-11-09"}
    META = {"a": {"facebook": "2026-11-09", "instagram": "2026-11-09"}}

    def test_tutto_uscito(self):
        self.assertEqual(ctrl.valuta("2026-11-09", self.TG, self.META, None), ("ok", []))

    def test_canale_mancante(self):
        meta = {"a": {"facebook": "2026-11-09", "instagram": "2026-11-05"}}
        self.assertEqual(ctrl.valuta("2026-11-09", self.TG, meta, None), ("mancante", ["instagram"]))

    def test_giorno_senza_uscita(self):
        self.assertEqual(ctrl.valuta("2026-11-14", {}, {}, None)[0], "non-previsto")   # sabato

    def test_pausa(self):
        self.assertEqual(ctrl.valuta("2026-11-09", {}, {}, {"pausa": True})[0], "in-pausa")

    def test_coda_vuota_ma_post_usciti(self):
        self.assertEqual(ctrl.valuta("2026-11-09", self.TG, self.META, {"coda": []})[0], "ok")

    def test_coda_vuota_e_nessun_post(self):
        esito, mancanti = ctrl.valuta("2026-11-11", self.TG, self.META, {"coda": []})   # mercoledì
        self.assertEqual(esito, "mancante")
        self.assertIn("nessun post in coda", mancanti[0])


if __name__ == "__main__":
    unittest.main(verbosity=1)
