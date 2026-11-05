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


class CaroselliSenzaReel(unittest.TestCase):
    """Il martedì non escono come carosello le lezioni in coda per un giorno di reel."""

    def test_solo_le_lezioni_del_carosello(self):
        import pubblica
        vecchio = coda.FILE_CODA
        coda.FILE_CODA = con_coda({"coda": [
            {"chiave": "a", "quando": "2026-11-09", "esito": "approvato"},   # lunedì: reel
            {"chiave": "b", "quando": "2026-11-10", "esito": "approvato"},   # martedì: carosello
            {"chiave": "c", "quando": "2026-11-05", "esito": "approvato"},   # calendario di prima: carosello
        ]})
        try:
            scelti = pubblica.senza_reel(coda.applica(ELENCO, "2026-11-10", coda.FILE_CODA))
        finally:
            coda.FILE_CODA = vecchio
        self.assertEqual([x["chiave"] for x in scelti], ["b", "c"])


class FormatiDeiTesti(unittest.TestCase):
    """Le regole dei formati che il guardiano controlla e che si possono garantire senza IA."""

    def test_instagram_hashtag_telegram(self):
        import promozione as pr
        t = pr.rifinisci_canali({"titolo": "Come può un'ampolla durare otto giorni?",
                                 "instagram": "Primo.\n\nSecondo.\n\n#irc #culturaebraica",
                                 "hashtag": ["irc", "culturaebraica", "luce", "festa", "olio"],
                                 "telegram": "Una frase lunga che non fa da titolo e continua per molte parole fino a superare novanta caratteri."})
        self.assertNotIn("#", t["instagram"])
        self.assertIn("bio", t["instagram"].split("\n\n")[-1])
        self.assertEqual(t["hashtag"][:2], ["religionecattolica", "irc"])
        self.assertLessEqual(len(t["hashtag"]), 5)
        self.assertTrue(t["telegram"].startswith("Come può"))

    def test_testi_gia_in_regola_restano_uguali(self):
        import promozione as pr
        t = {"instagram": "Testo.\n\nLa lezione completa è nel link in bio.", "telegram": "Titolo\n\nTesto.",
             "hashtag": ["religionecattolica", "irc", "medioevo"], "titolo": "Titolo"}
        self.assertEqual(pr.rifinisci_canali(dict(t)), t)
        self.assertEqual(pr.accorcia_schede(None, {"carosello": [{"titolo": "a", "testo": "breve"}]}),
                         {"carosello": [{"titolo": "a", "testo": "breve"}]})

    def test_fatti_dubbi(self):
        import promozione as pr
        vecchio = pr.FILE_DUBBI
        pr.FILE_DUBBI = Path(tempfile.mkdtemp()) / "dubbi.json"
        try:
            self.assertEqual(pr.fatti_dubbi(), "")
            pr.FILE_DUBBI.write_text(json.dumps({"dubbi": [
                {"lezione": "Una lezione", "dettaglio": "il giorno della bolla", "come": "scrivi solo l'anno"},
                {"lezione": "Senza come", "dettaglio": "x"}]}), encoding="utf-8")
            testo = pr.fatti_dubbi()
            self.assertIn("«Una lezione»: il giorno della bolla → scrivi solo l'anno", testo)
            self.assertNotIn("Senza come", testo)
        finally:
            pr.FILE_DUBBI = vecchio

    def test_obiezioni_delle_rubriche(self):
        import rubriche
        vecchio = rubriche.FILE_DA_RIFARE
        rubriche.FILE_DA_RIFARE = Path(tempfile.mkdtemp()) / "da-rifare.md"
        rubriche.FILE_DA_RIFARE.write_text("## sab-2026-11-07 (Shabbat)\n- Telegram senza titolo.\n\n"
                                           "## `dom-2026-11-08`\n- La frase è del 1615.\n", encoding="utf-8")
        try:
            self.assertEqual(rubriche.obiezioni("sab-2026-11-07"), "- Telegram senza titolo.")
            self.assertIn("1615", rubriche.con_obiezioni("domanda", "dom-2026-11-08"))
            self.assertEqual(rubriche.con_obiezioni("domanda", "dom-2026-11-15"), "domanda")
            self.assertEqual(rubriche.firma_obiezioni("dom-2026-11-15"), "")
        finally:
            rubriche.FILE_DA_RIFARE = vecchio


class AnticipiMancanti(unittest.TestCase):
    """Un reel già montato e non ancora uscito, senza il video di anticipo: si monta solo quello."""

    def test_scelta(self):
        import reel_lezioni as rl
        vecchi = rl.CARTELLA, rl.su_r2
        rl.CARTELLA = Path(tempfile.mkdtemp())
        rl.su_r2 = lambda nome: nome == "pronto.mp4"
        try:
            base = {"motore": "reel2", "regia": {"inquadrature": []}}
            elenco = [{**base, "chiave": "reel|a", "video": "a.mp4", "anticipo_video": "anticipo-a.mp4"},
                      {**base, "chiave": "reel|b", "video": "b.mp4", "anticipo_video": "pronto.mp4"},
                      {**base, "chiave": "reel|c", "video": "c.mp4", "anticipo_video": "anticipo-c.mp4"},
                      {**base, "chiave": "reel|d", "video": "d.mp4", "anticipo_video": "anticipo-d.mp4"}]
            da_fare = [elenco[3]]                              # d si monta tutto, anticipo compreso
            usciti = {"reel|c": {"instagram": "2026-11-02"}}   # c è già uscito
            self.assertEqual([r["chiave"] for r in rl.anticipi_mancanti(elenco, da_fare, usciti)], ["reel|a"])
        finally:
            rl.CARTELLA, rl.su_r2 = vecchi


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
    """Scuola: reel lun-mer-ven, carosello il martedì, sabato lo Shabbat, domenica la grande domanda.
    Vacanze: le strisce del prof lunedì e giovedì."""

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


class Rubriche(unittest.TestCase):
    """Ogni uscita ha il nome della sua rubrica; il martedì a rotazione (docs/progetto-rubriche.md)."""

    def setUp(self):
        self._file, cal.FILE_VACANZE = cal.FILE_VACANZE, Path("/non/esiste/vacanze.json")

    def tearDown(self):
        cal.FILE_VACANZE = self._file

    def test_rotazione_del_martedi(self):
        martedi = [dt.date(2026, 11, 10) + dt.timedelta(days=7 * i) for i in range(4)]
        self.assertEqual([cal.rubrica_del_giorno(d) for d in martedi],
                         ["Parole con una storia", "In classe domani", "In numeri", "Parole con una storia"])

    def test_rubriche_della_settimana(self):
        giorni = [dt.date(2026, 11, 9) + dt.timedelta(days=i) for i in range(7)]
        nomi = [cal.rubrica_del_giorno(d) for d in giorni]
        self.assertEqual(nomi[0], "Lo sapevi?")
        self.assertIn("Prova alla mano", nomi[2])
        self.assertIsNone(nomi[3])
        self.assertIn("Falso mito", nomi[4])
        self.assertEqual(nomi[5:], ["Lo Shabbat del Lab", "La grande domanda"])
        self.assertEqual(cal.rubrica_del_giorno(dt.date(2026, 12, 28)), "Il prof del Lab")   # lunedì di vacanza
        self.assertEqual(cal.rubrica_del_giorno(dt.date(2026, 11, 5)), "La lezione in un carosello")   # prima del 9/11


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

    def test_variante_che_rende_di_piu(self):
        riga = lambda v, t: {"motore": "gioco", "variante": v, "ig_reels_avg_watch_time": t}
        self.assertEqual(gioco_reel.scegli_variante(45, {}), 1)                          # senza numeri: si alterna
        m = {"instagram": [riga(0, 9000), riga(0, 8000), riga(1, 5000), riga(1, 6000)]}
        self.assertEqual(gioco_reel.scegli_variante(46, m), 0)                           # vince la 0
        self.assertEqual(gioco_reel.scegli_variante(47, m), 0)
        self.assertEqual(gioco_reel.scegli_variante(48, m), 0)                           # 48 % 3 == 0: si prova la 0 (48 % 2)
        self.assertEqual(gioco_reel.scegli_variante(51, m), 1)                           # 51 % 3 == 0: si riprova l'altra


class Storie(unittest.TestCase):
    """Le storie del giorno: ricorrenza al mattino, «stasera alle 19» a pranzo solo nei giorni di reel."""

    def setUp(self):
        import storie
        self.storie = storie
        self._post = storie.post_di_oggi

    def tearDown(self):
        self.storie.post_di_oggi = self._post

    def test_ora_del_giorno(self):
        self.assertEqual(self.storie.ora_di("lezione", dt.date(2026, 11, 6)), "19")      # venerdì, calendario di prima
        self.assertEqual(self.storie.ora_di("lezione", dt.date(2026, 11, 10)), "13:30")  # martedì, carosello
        self.assertEqual(self.storie.ora_di("shabbat", dt.date(2026, 11, 14)), "11")

    def test_mattina_con_ricorrenza(self):
        s = self.storie.scheda("mattina", dt.date(2026, 12, 8))
        self.assertIn("Immacolata", s["titolo"])

    def test_mattina_annuncia_il_post_di_oggi(self):
        self.storie.post_di_oggi = lambda d: {"titolo": "Lezione", "anno": "2", "origine": "x"}
        self.assertEqual(self.storie.scheda("mattina", dt.date(2026, 11, 9))["piede"], "Stasera alle 19")     # lunedì, reel
        self.assertEqual(self.storie.scheda("mattina", dt.date(2026, 11, 10))["piede"], "Oggi alle 13:30")   # martedì, carosello
        self.assertEqual(self.storie.scheda("mattina", dt.date(2026, 11, 14))["piede"], "Oggi alle 11")      # sabato, Shabbat

    def test_post_di_oggi_per_tipo(self):
        with tempfile.TemporaryDirectory() as d:
            radice = Path(d)
            (radice / "data").mkdir(); (radice / "promozione").mkdir()
            (radice / "data" / "social-coda.json").write_text(json.dumps({"coda": [
                {"chiave": "lez", "quando": "2026-11-10", "esito": "approvato"},
                {"chiave": "sab-2026-11-14", "quando": "2026-11-14", "esito": "approvato"}]}))
            (radice / "promozione" / "cartoline.json").write_text(json.dumps([{"chiave": "lez", "titolo": "L"}]))
            (radice / "promozione" / "sabato.json").write_text(json.dumps([{"chiave": "sab-2026-11-14", "titolo": "S"}]))
            vera, self.storie.RADICE = self.storie.RADICE, radice
            try:
                self.assertEqual(self.storie.post_di_oggi(dt.date(2026, 11, 10))["titolo"], "L")   # martedì: il carosello
                self.assertEqual(self.storie.post_di_oggi(dt.date(2026, 11, 14))["titolo"], "S")   # sabato: lo Shabbat
                self.assertIsNone(self.storie.post_di_oggi(dt.date(2026, 11, 9)))                  # lunedì: nessun reel pronto
            finally:
                self.storie.RADICE = vera

    def test_pranzo_del_gioco_con_la_sua_variante(self):
        import gioco_reel
        with tempfile.TemporaryDirectory() as d:
            vero, cal.FILE_GIOCHI = cal.FILE_GIOCHI, Path(d) / "social-giochi.json"
            cal.FILE_GIOCHI.write_text(json.dumps({"giochi": [{"file": "uploads/x-gioco.html", "titolo": "X",
                                                               "uscito": "2026-12-01"}]}))
            try:
                self.assertEqual(cal.tipo_del_giorno(dt.date(2026, 12, 3)), "gioco")   # giovedì nel periodo del gioco
                for variante in (0, 1):
                    self.storie.post_di_oggi = lambda d, v=variante: {"titolo": "Gioco", "anno": "5", "variante": v}
                    s = self.storie.scheda("pranzo", dt.date(2026, 12, 3))
                    self.assertEqual(s["titolo"], gioco_reel.VARIANTI[variante]["gancio"][0])
            finally:
                cal.FILE_GIOCHI = vero

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


class Personaggi(unittest.TestCase):
    """Personaggi inventati sì; figure sacre, persone reali e minori no (controllo prima di dipingere)."""

    def test_parole_vietate(self):
        import personaggi
        self.assertIsNone(personaggi.vietata("un pescatore di Cafarnao che ripara le reti al tramonto"))
        self.assertIsNone(personaggi.vietata("una mercante di stoffe nel foro di Roma"))
        for t in ("Gesù sulla barca", "la Madonna", "San Benedetto", "un bambino al mercato", "una ragazza",
                  "Mosè sul monte", "un angelo", "il papa", "a saint praying"):
            self.assertIsNotNone(personaggi.vietata(t), t)


class ParoleATempo(unittest.TestCase):
    """Le scritte del reel si accendono quando la voce dice la parola (tempi di Whisper)."""

    def test_stesso_numero(self):
        import voce
        self.assertEqual(voce.allinea(2, [(0.1, 0.4), (0.5, 0.9)]), [[0.1, 0.4], [0.5, 0.9]])

    def test_parole_dette_in_piu(self):   # «labirc.it» detto «lab i erre ci»
        import voce
        t = voce.allinea(2, [(0.0, 0.3), (0.4, 0.5), (0.6, 0.7), (0.8, 0.9), (1.0, 1.2)])
        self.assertEqual(len(t), 2)
        self.assertEqual(t[0][0], 0.0)
        self.assertEqual(t[-1][1], 1.2)
        self.assertLess(t[0][0], t[1][0])

    def test_senza_tempi(self):
        import voce
        self.assertIsNone(voce.allinea(3, []))
class PuliziaVideo(unittest.TestCase):
    """seo/reel.mjs toglie solo i suoi video: non i video di anticipo delle storie né i reel dei giochi,
    che restano in promozione/reel/ quando Cloudflare R2 non risponde."""

    def test_reel_mjs_non_cancella_anticipi_e_giochi(self):
        import os
        import subprocess
        with tempfile.TemporaryDirectory() as d:
            radice = Path(d)
            (radice / "promozione" / "reel").mkdir(parents=True)
            (radice / "promozione" / "reel.json").write_text(json.dumps([
                {"video": "reel2-x.mp4", "anticipo_video": "anticipo-reel2-x.mp4", "motore": "reel2"}]), encoding="utf-8")
            for nome in ("reel2-x.mp4", "anticipo-reel2-x.mp4", "gioco-y-2026-11-12.mp4", "vecchio.mp4"):
                (radice / "promozione" / "reel" / nome).write_bytes(b"x")
            esito = subprocess.run(["node", str(Path(__file__).resolve().parent / "reel.mjs")], capture_output=True, text=True,
                                   env={**os.environ, "LAB_RADICE": d, "PW_MODULE": "/non/esiste"})
            self.assertEqual(esito.returncode, 0, esito.stderr)
            rimasti = sorted(f.name for f in (radice / "promozione" / "reel").glob("*.mp4"))
            self.assertEqual(rimasti, ["anticipo-reel2-x.mp4", "gioco-y-2026-11-12.mp4", "reel2-x.mp4"])


class VoceCheNonRiesce(unittest.TestCase):
    """Se seo/voce.py fallisce (Gemini senza quota), la regia prosegue senza voce invece di fermare il reel."""

    def test_regia_senza_voce(self):
        import os
        import regia
        copione = {"serie": "Prova", "titolo": "T", "anno": 2, "inquadrature": [
            {"tipo": "gancio", "testo": "Ciao", "voce": "Ciao a tutti", "durata": 2},
            {"tipo": "chiusa", "voce": "La lezione completa è su labirc.it", "durata": 3}]}
        with tempfile.TemporaryDirectory() as d:
            finto = Path(d) / "voce.py"
            finto.write_text("import sys; sys.exit(3)\n", encoding="utf-8")
            vera, regia.RADICE = regia.RADICE, Path(d) / "radice"
            (regia.RADICE / "seo").mkdir(parents=True)
            (regia.RADICE / "seo" / "voce.py").write_text(finto.read_text(), encoding="utf-8")
            os.environ["GEMINI_API_KEY"] = "finta"
            try:
                r = regia.prepara(copione, Path(d) / "lavoro")
            finally:
                regia.RADICE = vera
                del os.environ["GEMINI_API_KEY"]
            self.assertEqual(len(r["inquadrature"]), 2)
            self.assertFalse(any(q.get("voce_file") for q in r["inquadrature"]))


class SfondiIA(unittest.TestCase):
    """Gli sfondi dipinti servono ai video a fumetti e alle copertine del weekend, non ai reel del regista."""

    def test_reel2_senza_sfondo(self):
        import immagini_ia
        elenchi = {"reel.json": [{"origine": "a", "motore": "reel2", "video": "reel2-a.mp4"},
                                 {"origine": "b", "video": "reel-b.mp4"}],
                   "domenica.json": [{"chiave": "dom-1", "carosello": [{"titolo": "t", "testo": "x"}]}],
                   "reel-domenica.json": [{"origine": "dom-1", "video": "domenica-1.mp4"}]}
        self.assertEqual(sorted(immagini_ia.voci_da_dipingere(elenchi)), ["b", "dom-1"])
        self.assertIsNone(immagini_ia.chiave_sfondo("reel.json", elenchi["reel.json"][0]))
        self.assertTrue(immagini_ia.voci_da_dipingere(elenchi)["dom-1"].get("carosello"))   # la copertina, non il video


class CaroselliMartedi(unittest.TestCase):
    """Il martedì esce il carosello della rubrica del giorno (seo/caroselli.py), se è pronto."""

    LEZIONI = [{"chiave": "lez", "titolo": "L", "anno": "2", "url": "u", "classe": "seconda", "uda": "U"}]

    def test_quali_martedi(self):
        import caroselli
        with tempfile.TemporaryDirectory() as d:
            f = Path(d) / "coda.json"
            f.write_text(json.dumps({"coda": [
                {"chiave": "lez", "quando": "2026-11-10", "esito": "approvato"},     # martedì: Parole con una storia
                {"chiave": "lez", "quando": "2026-11-09", "esito": "approvato"},     # lunedì: reel, non un carosello
                {"chiave": "lez", "quando": "2026-11-17", "esito": "approvato"}]}))  # oltre i 7 giorni
            vero, coda.FILE_CODA = coda.FILE_CODA, f
            try:
                da_fare = caroselli.martedi_da_preparare(dt.date(2026, 11, 6), self.LEZIONI)
            finally:
                coda.FILE_CODA = vero
        self.assertEqual([(r, q) for _, r, q in da_fare], [("Parole con una storia", "2026-11-10")])

    def test_schede_con_pagina_vera_o_testo(self):
        import caroselli
        schede = [{"tipo": "pagina", "titolo": "T", "testo": "x", "citazione": "una frase che non c'è nel fascicolo", "cerchia": ""},
                  {"tipo": "numero", "titolo": "N", "testo": "y", "numero": "525", "citazione": "", "cerchia": ""}]
        pronte = caroselli.prepara_schede(schede, None)
        self.assertEqual([s["tipo"] for s in pronte], ["testo", "numero"])   # senza la pagina la scheda diventa testo
        self.assertNotIn("citazione", pronte[0])
        voce = caroselli.voce_elenco(self.LEZIONI[0], "In numeri", "2026-11-24",
                                     {"copertina": {"titolo": "525", "frase": "f"}, "schede": schede, "facebook": "fb",
                                      "instagram": "ig", "telegram": "tg", "hashtag": ["irc"]})
        self.assertEqual(voce["chiave"], "lez")                    # la stessa chiave della lezione in coda
        self.assertEqual(len(voce["immagini"]), 4)                 # copertina, due schede, finale
        self.assertTrue(voce["file"].startswith("martedi-"))
        self.assertIn("#irc", voce["instagram"])

    def test_pubblica_preferisce_la_rubrica_pronta(self):
        import pubblica
        kit = [{"chiave": "lez", "titolo": "kit", "file": "a.png"}, {"chiave": "altra", "titolo": "k2", "file": "b.png"}]
        rubrica = [{"chiave": "lez", "titolo": "rubrica", "file": "m.png", "immagini": ["m.png", "m-2.png"]}]
        self.assertEqual([p["titolo"] for p in pubblica.con_caroselli_martedi(kit, rubrica, pronto=lambda c: True)], ["rubrica", "k2"])
        self.assertEqual([p["titolo"] for p in pubblica.con_caroselli_martedi(kit, rubrica, pronto=lambda c: False)], ["kit", "k2"])


class Curiosita(unittest.TestCase):
    """La biblioteca seo/curiosita.json: forma giusta e arrivo al regista (le citazioni esatte si controllano
    con i PDF del ramo del sito: python seo/fascicolo.py)."""

    def test_forma(self):
        dati = json.loads((Path(__file__).resolve().parent / "curiosita.json").read_text(encoding="utf-8"))
        lezioni = {k: v for k, v in dati.items() if not k.startswith("_")}
        self.assertGreaterEqual(len(lezioni), 40)
        for chiave, voci in lezioni.items():
            self.assertEqual(chiave.count("|"), 2, chiave)
            self.assertTrue(2 <= len(voci) <= 4, chiave)
            for v in voci:
                self.assertLessEqual(len(v["gancio"]), 60, v["gancio"])
                self.assertLessEqual(len(v["testo"]), 200, v["testo"])
                self.assertGreaterEqual(len(v["citazione"].split()), 6, v["citazione"])
                self.assertTrue(v["fascicolo"].endswith("-fascicolo.pdf"))
                self.assertNotIn("http", json.dumps(v))

    def test_note_di_regia_dal_piano(self):
        import regista
        with tempfile.TemporaryDirectory() as d:
            f = Path(d) / "coda.json"
            f.write_text(json.dumps({"coda": [{"chiave": "lez", "quando": "2026-11-09", "esito": "approvato",
                                               "regia": {"angolo": "Dionigi sbaglia i conti", "gancio": "Gesù è nato avanti Cristo", "tono": "ironico"}}]}))
            vero, regista.FILE_CODA = regista.FILE_CODA, f
            try:
                note = regista.note_di_regia("lez", "2026-11-09")
                self.assertIn("<note_del_direttore>", note)
                self.assertIn("Dionigi", note)
                self.assertEqual(regista.note_di_regia("lez", "2026-11-11"), "")   # un'altra data: niente
                self.assertEqual(regista.note_di_regia("altra"), "")
            finally:
                regista.FILE_CODA = vero
        self.assertEqual(regista.rubrica_del_giorno("2026-11-09"), "Lo sapevi?")
        self.assertIn("Falso mito", regista.rubrica_del_giorno("2026-11-13"))

    def test_al_regista(self):
        import regista
        blocco = regista.blocco_curiosita("3|I luoghi che cambiano la vita - regola di san Benedetto|I benedettini")
        self.assertIn("<curiosita_verificate>", blocco)
        self.assertIn("ora et labora", blocco)
        self.assertEqual(regista.blocco_curiosita("chiave|che|non esiste"), "")


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

    def test_regole_per_ambito(self):
        with tempfile.TemporaryDirectory() as d:
            vero, quaderno.FILE = quaderno.FILE, Path(d) / "q.json"
            quaderno.FILE.write_text(json.dumps({"regole_apprese": [
                {"regola": "Per tutti", "prova": "p", "forza": "confermata"},
                {"regola": "Solo reel", "prova": "p", "forza": "confermata", "per": "reel"},
                {"regola": "Solo storie", "prova": "p", "forza": "confermata", "per": "storie"},
                {"regola": "Ipotesi", "prova": "p", "forza": "ipotesi"}]}))
            try:
                tutto = quaderno.istruzioni_apprese()
                self.assertIn("Solo storie", tutto)
                reel = quaderno.istruzioni_apprese("reel", "didascalie")
                self.assertIn("Per tutti", reel)
                self.assertIn("Solo reel", reel)
                self.assertNotIn("Solo storie", reel)
                self.assertNotIn("Ipotesi", reel)
            finally:
                quaderno.FILE = vero

    def test_niente_email(self):
        con_email = {**self.BUONO, "idee": [{"idea": "scrivere a prova@esempio.it", "stato": "nuova"}]}
        self.assertTrue(any("email" in e for e in quaderno.controlla(con_email)))


if __name__ == "__main__":
    unittest.main(verbosity=1)
