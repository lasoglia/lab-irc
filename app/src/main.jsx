/* =====================================================================
   Lab IRC — il sito, come da modello di Claude Design
   (design-system/ui_kits/main-site/index.html), collegato ai dati veri
   del pannello Decap (data/*.json).

   I componenti (YearCard, Card, Button, Badge, Chip, YearMascot, AmdgEgg,
   Amdg) sono quelli del design system, importati così come sono.

   PERCEZIONE (design-system/tokens/perception.css, guidelines/perception):
   - prossimità a tre livelli: 8 dentro un gruppo, 21 tra gruppi, 55 tra sezioni;
   - una sola figura e UN solo accento per vista: il pulsante pieno indica
     il prossimo passo del percorso, tutti gli altri sono "ghost";
   - continuità: il colore dell'anno accompagna dalla vetrata alla lezione;
   - chiusura: anelli e sigilli d'oro sui materiali già aperti, ogni
     pagina finisce con "Per continuare" (mai un vicolo cieco);
   - movimento calmo (durate di Fibonacci), fermo con "riduci movimento";
   - modalità LIM per la lavagna di classe (pulsante LIM, tasto L, ?lim=1).
   Le "orme" dello studente restano SOLO nel suo browser (vedi dati.js).
   ===================================================================== */
import React, { useState, useEffect, useRef, useMemo, useSyncExternalStore } from "react";
import { createRoot } from "react-dom/client";

import { YearCard } from "../../design-system/components/core/YearCard.jsx";
import { Button } from "../../design-system/components/core/Button.jsx";
import { Badge } from "../../design-system/components/core/Badge.jsx";
import { Chip } from "../../design-system/components/core/Chip.jsx";
import { Card } from "../../design-system/components/core/Card.jsx";
import { YearMascot } from "../../design-system/components/brand/YearMascot.jsx";
import { AmdgEgg } from "../../design-system/components/brand/AmdgEgg.jsx";
import { Amdg } from "../../design-system/components/brand/Amdg.jsx";

import {
  ANNI, annoMeta, colore, caricaDati, descAnno, itemsAnno, udaForYear, itemsInUda,
  lezioniForUda, itemsInLezione, trovaUda, trovaLezione, normT, resolvePath, ytId,
  azione, varianteBadge, percorso, iscriviPercorso, chiaveItem, segnaAperto, segnaUltima,
  dimenticaPercorso, contaAperti, vicini, slug, hrefUda, hrefLezione, ordinaPercorso, cerca,
  titoloPulito, titoloMateriale, breve, ruolo, risolviUda, risolviLezione,
} from "./dati.js";

import "./app.css";

const EASE = "cubic-bezier(.16,1,.3,1)";
const ROMAN = { 1: "I", 2: "II", 3: "III", 4: "IV", 5: "V" };
const conMouse = () => window.matchMedia && matchMedia("(hover: hover) and (pointer: fine)").matches;
const movimentoRidotto = () => window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
/* numero e parola non si separano mai a capo (spazio unificatore) */
const plurale = (n) => n + " " + (n === 1 ? "contenuto" : "contenuti");
const lezioni = (n) => n + " " + (n === 1 ? "lezione" : "lezioni");
const materiali = (n) => n + " " + (n === 1 ? "materiale" : "materiali");
const metaConteggio = (n) => (n ? plurale(n) : "In preparazione");
const pulito = (t) => titoloPulito(t).titolo;

/* cambio di tema o di LIM: un solo crossfade (View Transitions), dove c'è */
function conTransizione(run) {
  if (document.startViewTransition && !movimentoRidotto()) document.startViewTransition(run);
  else run();
}

/* scorrimento immediato (anche se il CSS chiede "smooth") */
function vaiA(y) {
  const h = document.documentElement;
  h.style.scrollBehavior = "auto";
  window.scrollTo(0, y);
  requestAnimationFrame(() => { h.style.scrollBehavior = ""; });
}

/* ---------- modalità LIM (lavagna di classe) ----------
   Come nel modello del design system: pulsante «LIM», tasto L o ?lim=1
   nell'indirizzo; la scelta resta salvata in 'lim_lab'. */
function initLim() {
  const r = document.documentElement;
  const q = /[?&]lim=(1|0)/.exec(location.search);
  let on = false;
  try {
    if (q) localStorage.setItem("lim_lab", q[1]);
    on = localStorage.getItem("lim_lab") === "1";
  } catch (e) { /* storage bloccato: vale solo l'indirizzo */ }
  if (q) on = q[1] === "1";
  /* sul telefono la LIM non ha senso (e non avrebbe un pulsante per uscirne) */
  if (on && window.matchMedia && matchMedia("(max-width: 720px)").matches) on = false;
  r.toggleAttribute("data-lim", on);
}
function setLim(on) {
  conTransizione(() => document.documentElement.toggleAttribute("data-lim", on));
  try { localStorage.setItem("lim_lab", on ? "1" : "0"); } catch (e) { /* niente */ }
  window.dispatchEvent(new CustomEvent("lab:lim", { detail: on }));
}
const leggiLim = () => document.documentElement.hasAttribute("data-lim");
const iscriviLim = (f) => { addEventListener("lab:lim", f); return () => removeEventListener("lab:lim", f); };
const useLim = () => useSyncExternalStore(iscriviLim, leggiLim);
initLim();

/* le orme dello studente, come le vede la pagina (vuote in LIM) */
const NESSUNA_ORMA = { set: new Set(), ultima: null, vuoto: true };
function usePercorsoVisibile() {
  const st = useSyncExternalStore(iscriviPercorso, percorso);
  const lim = useLim();
  return useMemo(() => (lim ? NESSUNA_ORMA : { set: new Set(st.aperti), ultima: st.ultima, vuoto: !st.aperti.length && !st.ultima }), [st, lim]);
}

/* ---------- aiuti di movimento (dal modello) ---------- */
/* griglia: entrata insieme ("destino comune"), sfalsata di 55ms, senza sfocatura */
function Reveal({ children, delay = 0, style, className, griglia }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (on) return;
    const el = ref.current;
    if (el && el.getBoundingClientRect().top < innerHeight * 0.92) { setOn(true); return; }
    let io, check;
    if ("IntersectionObserver" in window && el) {
      io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold: 0.12 });
      io.observe(el);
    } else {
      check = () => { const x = ref.current; if (x && x.getBoundingClientRect().top < innerHeight * 0.92) setOn(true); };
      addEventListener("scroll", check, { passive: true });
    }
    const safety = setTimeout(() => setOn(true), 1618);
    return () => { io && io.disconnect(); check && removeEventListener("scroll", check); clearTimeout(safety); };
  }, [on]);
  const st = griglia
    ? { opacity: on ? 1 : 0, transform: on ? "none" : "translateY(13px)", transition: `opacity 610ms ${EASE} ${delay}ms, transform 610ms ${EASE} ${delay}ms` }
    : { opacity: on ? 1 : 0, transform: on ? "none" : "translateY(21px)", filter: on ? "none" : "blur(6px)", transition: `opacity 987ms ${EASE} ${delay}ms, transform 987ms ${EASE} ${delay}ms, filter 987ms ${EASE} ${delay}ms` };
  return <div ref={ref} className={className} style={{ ...st, ...style }}>{children}</div>;
}
const ritardo = (i) => Math.min(i, 3) * 55;

/* la prima pagina della visita entra solenne (labRise, 987ms); le pagine
   successive con un passo breve (labSu, 610ms): la navigazione non deve pesare */
const PrimaVista = React.createContext(true);
const usePrimaVista = () => React.useContext(PrimaVista);
/* "backwards": finita l'entrata l'elemento torna ai suoi stili (niente filtro residuo da comporre) */
const entrata = (prima, ms = 0) => (prima ? `labRise 987ms ${EASE} ${ms}ms backwards` : `labSu 610ms ${EASE} ${Math.round(ms * 0.618)}ms backwards`);

function CursorHalo() {
  const ref = useRef(null);
  useEffect(() => {
    if (movimentoRidotto() || !conMouse()) return;
    let x = innerWidth / 2, y = innerHeight / 3, tx = x, ty = y, raf;
    const mv = (e) => { tx = e.clientX; ty = e.clientY; if (ref.current) ref.current.style.opacity = 1; };
    const loop = () => { x += (tx - x) * 0.1618; y += (ty - y) * 0.1618; if (ref.current) ref.current.style.transform = `translate(${x - 233}px,${y - 233}px)`; raf = requestAnimationFrame(loop); };
    loop();
    addEventListener("mousemove", mv);
    return () => { cancelAnimationFrame(raf); removeEventListener("mousemove", mv); };
  }, []);
  if (!conMouse()) return null; /* sul telefono non serve (e non deve allargare la pagina) */
  return <div ref={ref} className="lab-alone" data-halo="" aria-hidden="true" style={{ position: "fixed", left: 0, top: 0, width: 466, height: 466, borderRadius: "50%", pointerEvents: "none", zIndex: 0, opacity: 0, transition: "opacity 610ms", background: "radial-gradient(circle, rgba(139,92,246,.10), rgba(227,194,122,.04) 38.2%, transparent 61.8%)" }} />;
}

/* ---------- piccoli pezzi ---------- */
function Eyebrow({ children, color = "var(--lab-oro-text)" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 13, whiteSpace: "nowrap", fontFamily: "var(--lab-font-inscription)", fontSize: 13, letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 600, color, marginBottom: 13, minWidth: 0 }}>
      <span style={{ width: 34, height: 1, background: "currentColor", opacity: 0.7, flexShrink: 0 }} />
      <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{children}</span>
    </div>
  );
}

function SectionHead({ eyebrow, title, sub, small, h1 }) {
  const T = h1 ? "h1" : "h2";
  return (
    <Reveal className="lab-shead" style={{ display: "grid", gridTemplateColumns: "minmax(0,1.618fr) minmax(0,1fr)", alignItems: "end", gap: 34, margin: small ? "55px 0 21px" : "89px 0 34px" }}>
      <div style={{ minWidth: 0 }}><Eyebrow>{eyebrow}</Eyebrow><T style={{ fontSize: small ? "clamp(24px,3vw,33px)" : "clamp(26px,3.6vw,42px)", margin: 0, overflowWrap: "anywhere" }}>{title}</T></div>
      {sub && <p style={{ color: "var(--lab-ink-soft)", fontSize: 16, lineHeight: 1.5, margin: 0, maxWidth: "38ch", textWrap: "pretty" }}>{sub}</p>}
    </Reveal>
  );
}

function NavLink({ children, href, className, attivo }) {
  const [h, setH] = useState(false);
  const acceso = h || attivo;
  return (
    <a href={href} className={className} aria-current={attivo ? "page" : undefined} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ position: "relative", color: acceso ? "var(--lab-ink)" : "var(--lab-ink-soft)", textDecoration: "none", fontWeight: 600, fontSize: 14.5, padding: "8px 13px", transition: "color 233ms", whiteSpace: "nowrap" }}>
      {children}
      <span style={{ position: "absolute", left: 13, right: 13, bottom: 3, height: 1.5, background: "var(--lab-oro)", transform: `scaleX(${acceso ? 1 : 0})`, transition: `transform 377ms ${EASE}` }} />
    </a>
  );
}

function Logo({ titolo, onHome }) {
  const [h, setH] = useState(false);
  const parole = String(titolo || "Lab IRC").trim().split(/\s+/);
  const ultima = parole.length > 1 ? parole.pop() : null;
  return (
    <a href="#" data-amdg-trigger className="lab-logo" aria-label={(titolo || "Lab IRC") + " — home"} onClick={(e) => { e.preventDefault(); onHome(); }} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: "flex", alignItems: "center", gap: 13, marginRight: "auto", textDecoration: "none", color: "var(--lab-ink)" }}>
      <span style={{ position: "relative", width: 42, height: 42, borderRadius: 13, background: "var(--lab-grad)", display: "grid", placeItems: "center", flexShrink: 0, transform: `rotate(${h ? -6 : 0}deg) scale(${h ? 1.06 : 1})`, transition: `transform 610ms ${EASE}` }}>
        <span style={{ fontFamily: "var(--lab-font-display)", fontWeight: 600, fontSize: 24, color: "#fff" }}>{(parole[0] || "L").charAt(0).toUpperCase()}</span>
        <span style={{ position: "absolute", top: 3, right: 5, color: "var(--lab-ambra)", fontSize: 10, transform: `rotate(${h ? 90 : 0}deg)`, transition: `transform 987ms ${EASE}` }}>✦</span>
      </span>
      <b style={{ fontFamily: "var(--lab-font-display)", fontWeight: 600, fontSize: 23, whiteSpace: "nowrap", flexShrink: 0 }}>
        {parole.join(" ")}{ultima && <> <span className="lab-grad-text">{ultima}</span></>}
      </b>
    </a>
  );
}

function Search({ value, onChange }) {
  const [f, setF] = useState(false);
  return (
    <div className="lab-search" style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--lab-bg-2)", border: "1px solid", borderColor: f ? "var(--lab-oro)" : "var(--lab-line)", borderRadius: 999, padding: "6px 13px", width: f ? 233 : 170, transition: `width 377ms ${EASE}, border-color 233ms` }}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true" style={{ color: "var(--lab-muted)", flexShrink: 0 }}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
      <input value={value} onChange={(e) => onChange(e.target.value)} onKeyDown={(e) => { if (e.key === "Escape") onChange(""); }} onFocus={() => setF(true)} onBlur={() => setF(false)} type="search" placeholder="Cerca…" aria-label="Cerca nei contenuti" autoComplete="off"
        style={{ border: "none", outline: "none", background: "none", font: "inherit", fontSize: 16, width: "100%", minWidth: 0, color: "var(--lab-ink)" }} />
    </div>
  );
}

function Header({ titolo, onHome, q, setQ, anno, rotta, conStrumenti, conVideo }) {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 40, background: "color-mix(in srgb, var(--lab-bg) 80%, transparent)", backdropFilter: "saturate(160%) blur(13px)", WebkitBackdropFilter: "saturate(160%) blur(13px)", borderBottom: "1px solid var(--lab-line-soft)" }}>
      <div className="lab-bar" style={{ maxWidth: 1140, margin: "0 auto", padding: "0 21px", display: "flex", alignItems: "center", gap: 13, height: 68 }}>
        <Logo titolo={titolo} onHome={onHome} />
        <Search value={q} onChange={setQ} />
        <nav aria-label="Sezioni" style={{ display: "flex", gap: 5 }}>
          {conStrumenti && <NavLink href="#strumenti" className="lab-nav-opt" attivo={rotta === "strumenti"}>Strumenti</NavLink>}
          {conVideo && <NavLink href="#video" className="lab-nav-opt" attivo={rotta === "video"}>Video</NavLink>}
          <NavLink href="esami/">Verifiche</NavLink>
        </nav>
      </div>
      {/* continuità: il filo del colore dell'anno resta sotto la testata */}
      {anno && <span aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, bottom: -1, height: 2, background: `var(--lab-anno-${anno})`, transition: "background 377ms ease" }} />}
    </header>
  );
}

/* ---------- rosone (vetrata) ---------- */
const PETAL = "M0 -40 C15 -52 15 -80 0 -93 C-15 -80 -15 -52 0 -40 Z";
const CROSS = "M-2 -12 H2 V-5 H8 V-1 H2 V12 H-2 V-1 H-8 V-5 H-2 Z";

function Rosone({ anni, onYear }) {
  const ref = useRef(null);
  const [c, setC] = useState({ a: -90, p: 0.35, tx: 0, ty: 0 });
  const [hi, setHi] = useState(null);
  const [ch, setCh] = useState(false);
  useEffect(() => {
    if (!conMouse()) return;
    const mv = (e) => {
      const el = ref.current; if (!el) return;
      const r = el.getBoundingClientRect(), x = e.clientX - (r.left + r.width / 2), y = e.clientY - (r.top + r.height / 2);
      setC({ a: (Math.atan2(y, x) * 180) / Math.PI, p: Math.max(0.3, 1 - Math.hypot(x, y) / (r.width * 1.618)), tx: Math.max(-1, Math.min(1, x / r.width)), ty: Math.max(-1, Math.min(1, y / r.height)) });
    };
    addEventListener("mousemove", mv);
    return () => removeEventListener("mousemove", mv);
  }, []);
  const lit = (ang) => { const d = Math.abs((((c.a - ang) % 360) + 540) % 360 - 180); return Math.pow((Math.cos((d * Math.PI) / 180) + 1) / 2, 3) * c.p; };
  const rad = (d) => (d * Math.PI) / 180;
  const items = Array.from({ length: 10 }, (_, i) => { const y = (i % 5) + 1, ang = -90 + i * 36, l = lit(ang); return { i, y, ang, l, op: hi === y ? 1 : 0.22 + 0.78 * l }; });
  const info = hi ? anni.find((x) => x.year === hi) : null;
  return (
    <div style={{ position: "relative", maxWidth: 440, margin: "0 auto" }}>
      <div aria-hidden="true" className="lab-rosone-luce" style={{ position: "absolute", inset: "-21%", borderRadius: "50%", pointerEvents: "none", background: `conic-gradient(from ${c.a + 90 - 13}deg, rgba(227,194,122,0) 0deg, rgba(227,194,122,${(0.26 * c.p).toFixed(3)}) 13deg, rgba(227,194,122,0) 26deg, rgba(227,194,122,0) 360deg)`, WebkitMaskImage: "radial-gradient(circle, #000 21%, transparent 70%)", maskImage: "radial-gradient(circle, #000 21%, transparent 70%)" }} />
      <div ref={ref} style={{ position: "relative", transform: `perspective(987px) rotateX(${(-c.ty * 8).toFixed(2)}deg) rotateY(${(c.tx * 8).toFixed(2)}deg)`, transition: `transform 610ms ${EASE}`, animation: `labRise 1597ms ${EASE} 233ms both` }}>
        <svg viewBox="-100 -100 200 200" role="img" aria-label="Rosone: scegli l'anno" style={{ width: "100%", display: "block", overflow: "visible" }} onMouseLeave={() => setHi(null)}>
          <circle r="98" style={{ fill: "var(--lab-bg-2)", stroke: "var(--lab-oro)", strokeWidth: 1.5, strokeOpacity: 0.85 }} />
          <circle r="94" style={{ fill: "none", stroke: "var(--lab-oro)", strokeWidth: 0.6, strokeOpacity: 0.45 }} />
          {items.map((p) => (
            <g key={p.i} transform={`rotate(${p.i * 36})`} onMouseEnter={() => setHi(p.y)} onClick={() => onYear(p.y)} style={{ cursor: "pointer" }}>
              <title>{"Anno " + ROMAN[p.y]}</title>
              <path d={PETAL} style={{ fill: `var(--lab-anno-${p.y})`, fillOpacity: p.op, stroke: "var(--lab-bg)", strokeWidth: 2.5, transition: "fill-opacity 377ms ease" }} />
              <circle cy="-67" r="5.5" style={{ fill: "none", stroke: "var(--lab-bg)", strokeWidth: 1.6, strokeOpacity: 0.8 }} />
              <path d="M0 -46 V-58 M0 -76 V-86" style={{ stroke: "var(--lab-bg)", strokeWidth: 1.4, strokeOpacity: 0.7 }} />
            </g>
          ))}
          {items.map((p) => <circle key={"o" + p.i} cx={86 * Math.cos(rad(p.ang + 18))} cy={86 * Math.sin(rad(p.ang + 18))} r="5" style={{ fill: "var(--lab-oro)", fillOpacity: 0.35 + 0.6 * lit(p.ang + 18), transition: "fill-opacity 377ms" }} />)}
          <circle r="37" style={{ fill: "none", stroke: "var(--lab-oro)", strokeWidth: 1, strokeOpacity: 0.8 }} />
          {items.map((p) => <circle key={"r" + p.i} cx={28 * Math.cos(rad(p.ang + 18))} cy={28 * Math.sin(rad(p.ang + 18))} r="7.5" style={{ fill: `var(--lab-anno-${((p.i + 2) % 5) + 1})`, fillOpacity: 0.3 + 0.6 * lit(p.ang + 18), stroke: "var(--lab-bg)", strokeWidth: 2, transition: "fill-opacity 377ms" }} />)}
          <g onMouseEnter={() => setCh(true)} onMouseLeave={() => setCh(false)} onClick={() => window.dispatchEvent(new Event("lab:amdg"))}
            style={{ cursor: "pointer", transform: `scale(${ch ? 1.13 : 1})`, transition: `transform 610ms ${EASE}`, filter: ch ? "drop-shadow(0 0 8px rgba(227,194,122,.8))" : "none" }}>
            <circle r="19" style={{ fill: "var(--lab-surface)", stroke: "var(--lab-oro)", strokeWidth: 1.2 }} />
            <path d={CROSS} style={{ fill: "var(--lab-oro)" }} />
          </g>
        </svg>
      </div>
      <div style={{ textAlign: "center", marginTop: 21, minHeight: 55, fontFamily: "var(--lab-font-inscription)", fontWeight: 600, fontSize: 12.5, letterSpacing: ".18em", textTransform: "uppercase", color: info ? `var(--lab-anno-${info.year})` : "var(--lab-muted)", transition: "color 377ms" }}>
        {info ? (
          <>Anno {ROMAN[info.year]} · {info.nome}<div style={{ fontFamily: "var(--lab-font-body)", fontWeight: 500, textTransform: "none", letterSpacing: 0, fontSize: 13.5, color: "var(--lab-muted)", marginTop: 5 }}>{info.desc}</div></>
        ) : conMouse() ? "Passa il cursore sulle vetrate" : "Tocca una vetrata"}
      </div>
    </div>
  );
}

/* ---------- il santo patrono: il laboratorio è intitolato a lui, come una parrocchia ----------
   festa: "gg-mm" dal pannello; quel giorno la home lo dice e la lapide si illumina */
function festaOggi(festa) {
  const m = /^\s*(\d{1,2})\s*[-/.]\s*(\d{1,2})\s*$/.exec(String(festa || ""));
  if (!m) return false;
  const oggi = new Date();
  return oggi.getDate() === +m[1] && oggi.getMonth() + 1 === +m[2];
}

/* ---------- home ---------- */
function Hero({ site, anni, onStart, onYear, riprendi }) {
  const parole = String(site.sottotitolo || "Il laboratorio di Religione").trim().split(/\s+/);
  const ultima = parole.pop();
  const prima = usePrimaVista();
  const patrono = String(site.patrono || "").trim();
  const festa = patrono && festaOggi(site.patrono_festa);
  return (
    <section className="lab-hero" style={{ maxWidth: 1140, margin: "0 auto", padding: "89px 21px 34px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 55 }}>
      <div style={{ flex: "1.618 1 420px", minWidth: 0 }}>
        <div style={{ animation: entrata(prima) }}><Eyebrow>Religione Cattolica</Eyebrow></div>
        <h1 style={{ fontSize: "clamp(42px,6.4vw,76px)", lineHeight: 1.08, letterSpacing: "-.025em", margin: "13px 0 13px" }}>
          {parole.map((w, i) => <span key={i} style={{ display: "inline-block", marginRight: ".25em", animation: entrata(prima, 89 + i * 89) }}>{w}</span>)}
          {parole.length > 0 && <br />}
          <span style={{ display: "inline-block", paddingBottom: ".14em", paddingRight: ".06em", fontStyle: "italic", fontWeight: 500, animation: entrata(prima, 89 + parole.length * 89) }} className="lab-grad-text">{ultima}</span>
        </h1>
        {/* la "facciata": il nome del santo titolare, inciso sotto il titolo */}
        {patrono && (
          <div className={"lab-patrono" + (festa ? " lab-patrono--festa" : "")} style={{ display: "flex", alignItems: "center", gap: 13, margin: "0 0 21px", fontFamily: "var(--lab-font-inscription)", fontSize: 13, letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 600, color: "var(--lab-oro-text)", minWidth: 0, animation: entrata(prima, 377) }}>
            <span aria-hidden="true" style={{ width: 34, height: 1, background: "currentColor", opacity: 0.7, flexShrink: 0 }} />
            <span style={{ textWrap: "balance" }}>{patrono} · {festa ? "oggi è la sua festa" : "patrono"}</span>
          </div>
        )}
        <p style={{ fontSize: "clamp(16px,1.6vw,20.5px)", lineHeight: 1.5, color: "var(--lab-ink-soft)", maxWidth: "38ch", margin: "0 0 34px", textWrap: "pretty", animation: entrata(prima, 445) }}>
          {site.intro}<span aria-hidden="true" style={{ color: "transparent" }}> A·M·D·G</span>
        </p>
        <div style={{ animation: entrata(prima, 534) }}>
          <div style={{ display: "flex", gap: 13, flexWrap: "wrap" }}>
            {riprendi ? (
              <>
                <Button href={riprendi.href}>{riprendi.etichetta}</Button>
                <Button variant="ghost" onClick={onStart}>Inizia il percorso →</Button>
              </>
            ) : <Button onClick={onStart}>Inizia il percorso →</Button>}
          </div>
          {riprendi && <div className="lab-riprendi-nota" style={{ marginTop: 8, fontSize: 13.5, color: "var(--lab-ink-soft)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }}>{riprendi.didascalia}</div>}
        </div>
      </div>
      <div style={{ flex: "1 1 320px", minWidth: 0 }}><Rosone anni={anni} onYear={onYear} /></div>
    </section>
  );
}

/* il finale della home: il "pensiero guida" (picco e fine) */
function Quote({ testo }) {
  if (!testo) return null;
  return (
    <Reveal className="lab-pensiero" style={{ margin: "89px 0 0", textAlign: "center", padding: "55px 21px 21px" }}>
      <div aria-hidden="true" style={{ color: "var(--lab-oro)", fontSize: 13, marginBottom: 21, animation: "labBreath 3.2s ease-in-out 3" }}>✦</div>
      <blockquote style={{ margin: "0 auto", maxWidth: "22ch", fontFamily: "var(--lab-font-display)", fontStyle: "italic", fontWeight: 500, fontSize: "clamp(26px,3.6vw,42px)", lineHeight: 1.2, color: "var(--lab-ink)", textWrap: "balance" }}>«{testo}»</blockquote>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 13, marginTop: 34 }}>
        <span style={{ width: 55, height: 1, background: "var(--lab-oro)", opacity: 0.6 }} />
        <span className="lab-pensiero-eb" style={{ fontSize: 12.5, letterSpacing: ".2em", textTransform: "uppercase", fontWeight: 800, color: "var(--lab-oro-text)", whiteSpace: "nowrap" }}>Pensiero guida</span>
        <span style={{ width: 55, height: 1, background: "var(--lab-oro)", opacity: 0.6 }} />
      </div>
    </Reveal>
  );
}

/* Strumenti & Video: superfici neutre (il colore resta il significato dell'anno) */
function Tools({ nS, nV }) {
  const t = [
    nS > 0 && { label: "Interattivi", title: "Strumenti", desc: "Quiz, bacheche e attività digitali per la classe.", icon: "⚙", n: nS, href: "#strumenti" },
    nV > 0 && { label: "Guardare insieme", title: "Video", desc: "Clip e documentari selezionati per ogni tema.", icon: "▶", n: nV, href: "#video" },
  ].filter(Boolean);
  if (!t.length) return null;
  return (
    <div className="lab-tools" style={t.length === 2 ? { display: "grid", gridTemplateColumns: "minmax(0,1.618fr) minmax(0,1fr)", gap: 21 } : { display: "grid", gridTemplateColumns: "minmax(0,1fr)", maxWidth: 610 }}>
      {t.map((x, i) => (
        <Reveal key={x.title} delay={ritardo(i)} griglia style={{ height: "100%" }}>
          <a href={x.href} className="ds-calmo" style={{ display: "block", textDecoration: "none", color: "inherit", height: "100%" }}>
            <Card onClick={() => {}} style={{ padding: 34, minHeight: 233, height: "100%" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 13, height: "100%", minHeight: 165 }}>
                <span aria-hidden="true" style={{ width: 42, height: 42, borderRadius: "50%", background: "var(--lab-oro-soft)", color: "var(--lab-oro)", display: "grid", placeItems: "center", fontSize: 21 }}>{x.icon}</span>
                <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: "auto" }}>
                  <span style={{ fontFamily: "var(--lab-font-inscription)", fontSize: 12.5, letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 600, color: "var(--lab-oro-text)" }}>{x.label}</span>
                  <h3 style={{ fontSize: 33, margin: 0 }}>{x.title}</h3>
                  <p style={{ margin: 0, fontSize: 16, lineHeight: 1.5, color: "var(--lab-ink-soft)", maxWidth: "34ch" }}>{x.desc}</p>
                </div>
                <span style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: ".13em", textTransform: "uppercase", color: "var(--lab-ink-soft)" }}>{plurale(x.n)}</span>
              </div>
            </Card>
          </a>
        </Reveal>
      ))}
    </div>
  );
}

const BIO = "Insegno Religione Cattolica nella scuola secondaria. Qui raccolgo i materiali che uso in classe, perché ogni domanda seria merita tempo, cura e bellezza.";

function About({ site }) {
  return (
    <Reveal className="lab-about" style={{ margin: "89px 0 0", padding: "55px 34px", borderRadius: 34, display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.618fr)", gap: 55, alignItems: "center" }}>
      <div id="chisono" style={{ minWidth: 0 }}>
        <Eyebrow>Chi sono</Eyebrow>
        <h2 style={{ fontSize: "clamp(26px,3.2vw,42px)", margin: 0 }}>{site.autore || "L'insegnante"}</h2>
      </div>
      <div style={{ minWidth: 0 }}>
        <p style={{ fontSize: 17, lineHeight: 1.5, color: "var(--lab-ink-soft)", margin: "0 0 21px" }}>{site.bio || BIO}</p>
        {site.email && <Button variant="ghost" size="sm" href={"mailto:" + site.email}>Scrivimi</Button>}
      </div>
    </Reveal>
  );
}

/* "Riprendi": l'ultima lezione/unità aperta, solo se esiste ancora nei dati */
function calcolaRiprendi(D, ultima, set) {
  if (!ultima) return null;
  const n = ultima.anno, meta = annoMeta(n);
  if (!meta) return null;
  const u = udaForYear(D, n).find((x) => normT(x.titolo) === normT(ultima.uda));
  if (!u) return null;
  if (ultima.lezione) {
    const lez = lezioniForUda(D, n, u.titolo);
    const L = lez.find((x) => normT(x.titolo) === normT(ultima.lezione));
    if (!L) return null;
    const items = itemsInLezione(D, n, u.titolo, L.titolo);
    if (items.length && contaAperti(items, set) === items.length) {
      /* lezione finita: la strada continua (lezione → unità → anno), mai un pulsante che sparisce */
      const v = vicini(lez, L.titolo);
      if (v.succ) return { href: hrefLezione(n, u.titolo, v.succ.titolo), etichetta: "Vai alla lezione successiva →", didascalia: `Dopo «${breve(pulito(L.titolo), 34)}» · Anno ${meta.rom}` };
      return dopoUnita(D, n, u, meta, `Dopo «${breve(pulito(L.titolo), 34)}» · Anno ${meta.rom}`);
    }
    return { href: hrefLezione(n, u.titolo, L.titolo), etichetta: "Riprendi la lezione →", didascalia: `Eri a «${breve(pulito(L.titolo), 34)}» · Anno ${meta.rom}` };
  }
  const items = itemsInUda(D, n, u.titolo);
  if (items.length && contaAperti(items, set) === items.length) return dopoUnita(D, n, u, meta, `Hai aperto tutto in «${breve(pulito(u.titolo), 34)}»`);
  return { href: hrefUda(n, u.titolo), etichetta: "Riprendi l'unità →", didascalia: `Eri a «${breve(pulito(u.titolo), 34)}» · Anno ${meta.rom}` };
}
function dopoUnita(D, n, u, meta, didascalia) {
  const vu = vicini(udaForYear(D, n), u.titolo);
  if (vu.succ) return { href: hrefUda(n, vu.succ.titolo), etichetta: "Vai all'unità successiva →", didascalia };
  return { href: "#anno/" + n, etichetta: `Torna al ${meta.nome.toLowerCase()} →`, didascalia: `Hai aperto tutto in «${breve(pulito(u.titolo), 34)}»` };
}

function HomePage({ D, onYear }) {
  const anniRef = useRef(null);
  const orme = usePercorsoVisibile();
  const stretto = useStretto();
  const anni = ANNI.map((a) => ({ year: +a.n, nome: a.nome, desc: descAnno(D, a.n), count: itemsAnno(D, a.n).length }));
  const nS = D.ITEMS.filter((it) => it.kind === "strumento").length;
  const nV = D.ITEMS.filter((it) => it.kind === "video").length;
  const riprendi = useMemo(() => calcolaRiprendi(D, orme.ultima, orme.set), [D, orme]);
  const vaiAgliAnni = () => {
    const el = anniRef.current; if (!el) return;
    const hdr = document.querySelector(".lab-app header");
    const alto = hdr ? hdr.getBoundingClientRect().height : 68;
    window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - alto, behavior: movimentoRidotto() ? "auto" : "smooth" });
  };
  return (
    <>
      <Hero site={D.SITE} anni={anni} onStart={vaiAgliAnni} onYear={onYear} riprendi={riprendi} />
      <div className="lab-pagina" style={{ maxWidth: 1140, margin: "0 auto", padding: "0 21px 89px" }}>
        <div ref={anniRef} />
        <SectionHead eyebrow="Percorso" title="Gli anni di corso" sub="Ogni anno ha le sue domande: entra nel tuo e trovi unità e lezioni, in ordine." />
        <div className="lab-anni" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(199px,1fr))", gap: stretto ? 13 : 21 }}>
          {anni.map((a, i) => (
            <Reveal key={a.year} delay={ritardo(i)} griglia className="ds-calmo">
              <YearCard year={a.year} name={a.nome} description={a.desc} count={a.count} href={"#anno/" + a.year} compatto={stretto} />
            </Reveal>
          ))}
        </div>
        {nS + nV > 0 && (
          <>
            <SectionHead eyebrow="Per fare lezione" title={nS && nV ? "Strumenti & Video" : nS ? "Strumenti" : "Video"} sub="Risorse interattive e clip per animare le lezioni." />
            <Tools nS={nS} nV={nV} />
          </>
        )}
        <About site={D.SITE} />
        <Quote testo={D.SITE.pensiero} />
      </div>
    </>
  );
}

/* ---------- pagine interne ---------- */
/* briciole: il filo da sinistra a destra; sul telefono un solo "‹ su" grande */
function Briciole({ voci, su }) {
  const home = (e) => { e.preventDefault(); window.dispatchEvent(new Event("lab:home")); };
  /* sul telefono un titolo lungo non si tronca: si mostra il livello («‹ Unità», «‹ Anno IV») */
  const testoSu = su && (su.testo.length > 28 && su.livello ? su.livello : su.testo);
  return (
    <nav aria-label="Percorso" className="lab-briciole" style={{ fontSize: 14, color: "var(--lab-muted)", margin: "34px 0 0" }}>
      <div className="lab-briciole-full" style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <a href="#" style={{ fontWeight: 600 }} onClick={home}>← Home</a>
        {voci.map((v, i) => (
          <React.Fragment key={i}>
            <span aria-hidden="true" style={{ opacity: 0.4 }}>›</span>
            {v.href ? <a href={v.href} style={{ fontWeight: 600 }}>{pulito(v.testo)}</a> : <span aria-current="page">{pulito(v.testo)}</span>}
          </React.Fragment>
        ))}
      </div>
      {su && (
        <a className="lab-su" href={su.href || "#"} onClick={su.href ? undefined : home}>
          <span aria-hidden="true">‹</span> <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{pulito(testoSu)}</span>
        </a>
      )}
    </nav>
  );
}

/* schermo stretto (telefono): alcune misure cambiano davvero, non solo in scala */
const STRETTO = "(max-width: 720px)";
const iscriviStretto = (f) => { const m = matchMedia(STRETTO); m.addEventListener ? m.addEventListener("change", f) : m.addListener(f); return () => (m.removeEventListener ? m.removeEventListener("change", f) : m.removeListener(f)); };
const useStretto = () => useSyncExternalStore(iscriviStretto, () => matchMedia(STRETTO).matches);

/* la mascotte della testata parla al massimo una volta per pagina e per sessione */
function giaSalutato(chiave) {
  try {
    const l = JSON.parse(sessionStorage.getItem("saluti_lab") || "[]");
    if (l.includes(chiave)) return true;
    sessionStorage.setItem("saluti_lab", JSON.stringify([...l, chiave].slice(-55)));
    return false;
  } catch (e) { return false; }
}
/* la voce della mascotte: sul telefono un nastro sotto la fascia (il fumetto
   coprirebbe il titolo), altrove il fumetto del componente */
const durataVoce = (t) => Math.min(4181, 2618 + Math.max(0, String(t || "").length - 30) * 55);
function faiParlare(ref, testo) {
  if (!testo) return;
  const el = ref && ref.current;
  if (!el) return;
  if (matchMedia(STRETTO).matches) { el.dispatchEvent(new CustomEvent("lab:voce", { detail: testo, bubbles: true })); return; }
  const m = el.querySelector("lab-mascotte");
  if (m && typeof m.bubble === "function") m.bubble(testo);
}

/* testata colorata della pagina: il "picco" visivo (una sola figura: la mascotte).
   I colori stanno in app.css (.lab-pagina-hero--anno / --neutra, tema chiaro, LIM). */
function PaginaHero({ color, glifo, eyebrow, titolo, desc, mascotte, compatto, neutro, saluto, mascotteRef, luce }) {
  const conM = !!mascotte;
  const stretto = useStretto();
  const prima = usePrimaVista();
  const [p, setP] = useState({ x: 0, y: 0 });
  const segui = conMouse() && !movimentoRidotto();
  const lim = useLim();
  const proprio = useRef(null);
  const mRef = mascotteRef || proprio;
  const radice = useRef(null);
  const [voce, setVoce] = useState(null);
  const clic = useRef(0);
  useEffect(() => {
    if (!mascotte || !saluto || lim) return;
    const chiave = location.hash;
    const t = setTimeout(() => {
      if (document.body.classList.contains("viewing") || location.hash !== chiave) return;
      if (giaSalutato(chiave)) return;
      faiParlare(mRef, saluto);
    }, 1597);
    return () => clearTimeout(t);
  }, []); // solo all'arrivo
  /* il nastro: ascolta "lab:voce" e lo mostra per una durata proporzionale al testo */
  useEffect(() => {
    const el = radice.current; if (!el) return;
    const h = (e) => setVoce({ testo: String(e.detail || ""), id: Date.now(), via: false });
    el.addEventListener("lab:voce", h);
    return () => el.removeEventListener("lab:voce", h);
  }, []);
  useEffect(() => {
    if (!voce || voce.via) return;
    const t1 = setTimeout(() => setVoce((v) => (v && v.id === voce.id ? { ...v, via: true } : v)), durataVoce(voce.testo));
    return () => clearTimeout(t1);
  }, [voce]);
  useEffect(() => {
    if (!voce || !voce.via) return;
    const t2 = setTimeout(() => setVoce((v) => (v && v.id === voce.id ? null : v)), 377);
    return () => clearTimeout(t2);
  }, [voce]);
  /* sul telefono il tocco sulla mascotte parla nel nastro (il componente tace) */
  const tocca = () => {
    if (!stretto) return;
    const I = window.LabMascotte && LabMascotte.INFO && LabMascotte.INFO[mascotte];
    if (!I) return;
    clic.current += 1;
    faiParlare(mRef, clic.current === 1 ? `Ciao, sono ${I.nome}!` : I.frasi[(clic.current - 2) % I.frasi.length]);
  };
  return (
    <div ref={radice} className={"lab-pagina-hero " + (neutro ? "lab-pagina-hero--neutra" : "lab-pagina-hero--anno")}
      onMouseMove={segui ? (e) => { const r = e.currentTarget.getBoundingClientRect(); setP({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 }); } : undefined}
      onMouseLeave={segui ? () => setP({ x: 0, y: 0 }) : undefined}
      style={{ "--c": color || "var(--lab-oro)", "--luce": luce || "61.8%", position: "relative", padding: "55px 34px", borderRadius: 34, margin: "21px 0 55px", animation: entrata(prima) }}>
      {/* solo il grande numero romano resta ritagliato: il fumetto della mascotte deve poter uscire */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, borderRadius: "inherit", overflow: "hidden", pointerEvents: "none" }}>
        <div className="lab-glifo" style={{ position: "absolute", right: conM ? 199 : 21, bottom: -34, fontSize: 199, fontFamily: "var(--lab-font-inscription)", fontWeight: 600, lineHeight: 1, transform: `translate(${p.x * 34}px, ${p.y * 21}px)`, transition: `transform 610ms ${EASE}` }}>{glifo}</div>
      </div>
      {/* onClickCapture: il componente ferma la propagazione del clic, la cattura arriva prima */}
      {conM && (
        <div ref={mRef} className="lab-pagina-mascotte" onClickCapture={tocca} style={{ position: "absolute", right: 34, top: 21, zIndex: 2 }}>
          <YearMascot year={mascotte} size={stretto || lim ? 89 : 144} fumetto="sotto" speak={!stretto} />
        </div>
      )}
      <div className="lab-pagina-testo" style={{ position: "relative", paddingRight: conM ? 165 : 0, minWidth: 0 }}>
        <div className="lab-pagina-eyebrow" style={{ display: "flex", alignItems: "flex-start", gap: 13, fontFamily: "var(--lab-font-inscription)", fontSize: 13, letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 600, marginBottom: 13, animation: `labSu 610ms ${EASE} both` }}>
          <span style={{ width: 34, height: 1, marginTop: ".6em", background: "currentColor", opacity: 0.7, flexShrink: 0 }} />
          <span style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", minWidth: 0 }}>{eyebrow}</span>
        </div>
        <h1 style={{ fontSize: compatto ? "clamp(26px,4vw,42px)" : "clamp(33px,5vw,55px)", margin: "0 0 8px", textWrap: "balance", overflowWrap: "anywhere", animation: `labSu 610ms ${EASE} 89ms both` }}>{pulito(titolo)}</h1>
        {desc && <p style={{ margin: 0, fontSize: 17, lineHeight: 1.5, maxWidth: "46ch", textWrap: "pretty", animation: `labSu 610ms ${EASE} 178ms both` }}>{desc}</p>}
      </div>
      {voce && <span key={voce.id} className={"lab-voce" + (voce.via ? " via" : "")} role="status">{voce.testo}</span>}
    </div>
  );
}

/* icone (stile Lucide, come nel design system) */
const IconaCartella = () => <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" /></svg>;
const IconaLibro = () => <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>;

/* il tag d'oro del "prossimo passo" (al massimo uno per vista) */
const Tag = ({ children }) => <span className="lab-tag">{children}</span>;

/* cartella (UDA o lezione): l'anello d'oro si chiude man mano che apri i materiali */
function Cartella({ href, color, titolo, desc, count, aperti = 0, tag, icona, i, meta, anteprima }) {
  const a = count > 0 ? Math.min(1, aperti / count) : 0;
  const vuota = count === 0;
  const tinta = `color-mix(in srgb, ${color} var(--lab-tinta-testo), var(--lab-ink))`;
  const icona_ = `color-mix(in srgb, ${color} var(--lab-tinta-icona, 100%), var(--lab-ink))`;
  return (
    <Reveal delay={ritardo(i)} griglia className="ds-calmo" style={{ height: "100%" }}>
      <a href={href} className="lab-fig" style={{ display: "block", textDecoration: "none", color: "inherit", height: "100%" }}>
        <Card onClick={() => {}} tint={color} glow={`color-mix(in srgb, ${color} 22%, transparent)`} style={{ padding: "21px 21px 21px 34px", height: "100%" }}>
          <span aria-hidden="true" style={{ position: "absolute", left: -34, top: -21, bottom: -21, width: 5, background: vuota ? `repeating-linear-gradient(to bottom, ${color} 0 5px, transparent 5px 8px)` : color, opacity: vuota ? 0.6 : 1 }} />
          {tag && <span style={{ position: "absolute", top: 0, right: 0 }}><Tag>{tag}</Tag></span>}
          <div style={{ display: "flex", flexDirection: "column", height: "100%", minWidth: 0 }}>
            <span style={{ position: "relative", width: 42, height: 42, borderRadius: "50%", display: "grid", placeItems: "center", color: icona_, background: `color-mix(in srgb, ${color} 16%, transparent)`, marginBottom: 13, flexShrink: 0 }}>
              {icona === "lezione" ? <IconaLibro /> : <IconaCartella />}
              {a > 0 && <span className="lab-anello" aria-hidden="true" style={{ "--lz-a": a }} />}
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 5, minWidth: 0 }}>
              <h3 style={{ fontSize: 24, margin: 0, textWrap: "balance", overflowWrap: "anywhere", paddingRight: tag ? 8 : 0 }}>{pulito(titolo)}</h3>
              {desc
                ? <p className="lab-3righe" style={{ fontSize: 15, color: "var(--lab-ink-soft)", margin: 0, lineHeight: 1.5, textWrap: "pretty" }}>{desc}</p>
                : anteprima ? <p className="lab-3righe lab-anteprima" style={{ fontSize: 15, color: "var(--lab-ink-soft)", margin: 0, lineHeight: 1.5 }}>{anteprima}</p> : null}
            </div>
            <span style={{ marginTop: "auto", paddingTop: 21, fontSize: 11.5, fontWeight: 800, letterSpacing: ".13em", textTransform: "uppercase", color: vuota ? "var(--lab-muted)" : tinta }}>
              {vuota ? "In preparazione" : meta || plurale(count)}
              {!vuota && aperti > 0 && (
                a >= 1
                  ? <span className="lab-mio" style={{ color: "var(--lab-oro-text)" }}>{count === 1 ? " · aperto ✓" : " · tutti aperti ✓"}</span>
                  : <span className="lab-mio" style={{ color: "var(--lab-ink-soft)" }}>{" · " + aperti + (aperti === 1 ? " aperto" : " aperti")}</span>
              )}
            </span>
          </div>
        </Card>
      </a>
    </Reveal>
  );
}

/* griglia che si adatta a 1–2 elementi (una scheda sola non resta "sperduta") */
function Griglia({ n, children }) {
  const cols = n === 1 ? "minmax(0,1fr)" : n === 2 ? "repeat(auto-fit,minmax(min(288px,100%),1fr))" : "repeat(auto-fill,minmax(min(288px,100%),1fr))";
  return <div className="lab-griglia" style={{ display: "grid", gridTemplateColumns: cols, gap: 21, maxWidth: n === 1 ? 610 : undefined }}>{children}</div>;
}

/* mai una pagina vuota: chi arriva trova un volto amico e una strada */
function Vuoto({ anno, titolo, testo, indietro, children }) {
  return (
    <div className="lab-vuoto" style={{ textAlign: "center", padding: "55px 21px", border: "1.5px dashed var(--lab-line)", borderRadius: 21, background: "var(--lab-surface)", display: "flex", flexDirection: "column", alignItems: "center", gap: 21 }}>
      {anno ? <YearMascot year={anno} size={89} /> : <span aria-hidden="true" style={{ fontSize: 34, lineHeight: 1, color: "var(--lab-oro)" }}>✦</span>}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
        <b style={{ fontFamily: "var(--lab-font-display)", color: "var(--lab-ink)", fontSize: 26, fontWeight: 600, lineHeight: 1.2, textWrap: "balance" }}>{titolo}</b>
        {testo && <p style={{ margin: 0, fontSize: 16, lineHeight: 1.5, color: "var(--lab-ink-soft)", maxWidth: "38ch" }}>{testo}</p>}
      </div>
      {children}
      {indietro && <Button variant="ghost" size="sm" href={indietro.href} onClick={indietro.onClick}>{indietro.testo}</Button>}
    </div>
  );
}

const ETICHETTE_RIAPRI = { "Apri": "Riapri", "Apri ↗": "Riapri ↗", "Scarica": "Scarica di nuovo", "Guarda ▶": "Riguarda ▶" };

/* scheda di un contenuto (come la "MatCard" del modello) */
function MatCard({ item, color, apri, primario, tag, mascotte, contesto, aperto }) {
  const [video, setVideo] = useState(false);
  const [appena, setAppena] = useState(false);
  const [voce, setVoce] = useState(null);
  const act = azione(item);
  const anno = annoMeta(item.anno) ? +item.anno : 0;
  const yt = item.kind === "video" ? ytId(item.youtube) : "";
  const immagine = item.immagine ? resolvePath(item.immagine) : yt ? `https://img.youtube.com/vi/${yt}/hqdefault.jpg` : "";
  const glifo = item.kind === "video" ? "▶" : anno ? ROMAN[anno] : "✦";
  const attivo = act.tipo !== "nessuna";
  const titolo = titoloMateriale(item.titolo || "Senza titolo", item.lezione);

  const azioneRef = useRef(null);
  const esegui = () => {
    if (!attivo) return;
    const b = azioneRef.current && azioneRef.current.querySelector("button");
    if (b && document.activeElement !== b) { try { b.focus({ preventScroll: true }); } catch (e) { /* niente */ } }
    if (!aperto && !leggiLim()) { segnaAperto(item); setAppena(true); }
    if (act.tipo === "video") setVideo(true);
    else if (act.tipo === "visore") apri(act.href, item, color);
    else if (act.tipo === "esterno") window.open(act.href, "_blank", "noopener");
  };
  const testoBottone = aperto && ETICHETTE_RIAPRI[act.testo] ? ETICHETTE_RIAPRI[act.testo] : act.testo;

  /* la voce sul sigillo: il commento al progresso arriva dove è avvenuta l'azione,
     se la mascotte della fascia non è in vista (vedi useVoceProgresso) */
  useEffect(() => {
    const h = (e) => { if (e.detail && e.detail.chiave === chiaveItem(item)) setVoce({ testo: e.detail.testo, id: Date.now() }); };
    addEventListener("lab:voce-sigillo", h);
    return () => removeEventListener("lab:voce-sigillo", h);
  }, [item]);
  useEffect(() => {
    if (!voce) return;
    const t = setTimeout(() => setVoce((v) => (v && v.id === voce.id ? null : v)), 987 + durataVoce(voce.testo) + 377);
    return () => clearTimeout(t);
  }, [voce]);

  return (
    <Card style={{ "--c": color, padding: 0, height: "100%" }} tint={color} glow={`color-mix(in srgb, ${color} 22%, transparent)`}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {video ? (
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, background: "#000" }}>
          <iframe src={`https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0&modestbranding=1`} title={titolo || "Video"} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullScreen style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }} />
        </div>
      ) : (
        <div onClick={attivo ? esegui : undefined} aria-hidden="true" className={"lab-copertina" + (immagine ? " lab-copertina--img" : "")}
          style={{ position: "relative", height: 144, background: immagine ? `center/cover no-repeat url("${immagine.replace(/"/g, "%22")}")` : `linear-gradient(135deg, color-mix(in srgb, ${color} 61.8%, var(--lab-surface)), color-mix(in srgb, ${color} 21%, var(--lab-surface)))`, boxShadow: immagine ? "none" : "inset 0 -1px 0 color-mix(in srgb, var(--lab-oro) 35%, transparent)", display: "grid", placeItems: "center", fontFamily: "var(--lab-font-inscription)", fontWeight: 600, fontSize: 55, color: immagine ? "rgba(255,255,255,.85)" : color, opacity: 1, cursor: attivo ? "pointer" : "default" }}>
          {!immagine && <span style={{ opacity: 0.9 }}>{glifo}</span>}
          {yt && <span style={{ width: 55, height: 55, borderRadius: "50%", background: "rgba(255,255,255,.92)", boxShadow: "0 8px 21px rgba(0,0,0,.3)", display: "grid", placeItems: "center", color: "#14131F", fontSize: 21, paddingLeft: 4 }}>▶</span>}
        </div>
      )}
      {mascotte && anno && !video ? <span className="lab-mini-mascotte" style={{ position: "absolute", right: 13, top: 127, zIndex: 2 }}><YearMascot year={anno} size={34} halo={false} still /></span> : null}
      {item.in_evidenza && <span className="lab-evidenza">In evidenza</span>}
      {aperto && !video && <span className={"lab-sigillo" + (appena ? " lab-sigillo--nuovo" : "")} role="img" aria-label="già aperto"><span aria-hidden="true">✓</span></span>}
      {voce && <span key={voce.id} className="lab-sigillo-voce" role="status" style={{ "--via": `${987 + durataVoce(voce.testo)}ms` }}>{voce.testo}</span>}
      <div style={{ padding: 21, display: "flex", flexDirection: "column", gap: 13, flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <Badge variant={contesto ? varianteBadge(item) : "neutro"}>{item.tipo || "Materiale"}</Badge>
          {tag && <Tag>{tag}</Tag>}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5, minWidth: 0 }}>
          {contesto && <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--lab-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{contesto}</span>}
          <h3 style={{ fontSize: 24, margin: 0, textWrap: "balance", overflowWrap: "anywhere" }}>{titolo}</h3>
          {item.descrizione && <p style={{ fontSize: 15, lineHeight: 1.5, color: "var(--lab-ink-soft)", margin: 0, textWrap: "pretty" }}>{item.descrizione}</p>}
        </div>
        <div ref={azioneRef} className="lab-azione" style={{ marginTop: "auto", paddingTop: 8 }}>
          {!attivo
            ? <Button size="sm" variant="ghost" disabled>{act.testo}</Button>
            : <Button size="sm" variant={primario ? "primary" : "ghost"} onClick={esegui}>{testoBottone}</Button>}
        </div>
      </div>
      </div>
    </Card>
  );
}

/* contesto di un contenuto: "Anno V › Scienza e fede › Lemaitre e Einstein" */
const contestoDi = (m) => [annoMeta(m.anno) ? "Anno " + annoMeta(m.anno).rom : "", pulito(m.uda), pulito(m.lezione)].map((x) => String(x || "").trim()).filter(Boolean).join(" › ");

/* contenuti con filtro per tipo.
   percorso: il primo materiale non ancora aperto è il "prossimo passo"
   (l'unico pulsante pieno, con il tag d'oro); altrimenti l'unico pieno è
   il primo "in evidenza". Niente è bloccato: è solo un invito. */
function Contenuti({ items, color, apri, percorso: inPercorso = false, mascotte = false, contesto = false }) {
  const [chip, setChip] = useState("Tutti");
  const orme = usePercorsoVisibile();
  const lista = useMemo(() => (inPercorso ? ordinaPercorso(items) : items), [items, inPercorso]);
  const tipi = useMemo(() => [...new Set(lista.map((m) => m.tipo || "Materiale"))], [lista]);
  const aperto = (m) => orme.set.has(chiaveItem(m));
  let p, tag = null;
  if (inPercorso) {
    p = lista.findIndex((m) => !aperto(m) && azione(m).tipo !== "nessuna");
    if (p >= 0) tag = lista.some(aperto) ? "Prossimo" : "Inizia da qui";
  } else p = lista.findIndex((m) => m.in_evidenza && azione(m).tipo !== "nessuna");
  const conChip = lista.length >= 5 && tipi.length > 1;
  const mostrati = conChip && chip !== "Tutti" ? lista.filter((m) => (m.tipo || "Materiale") === chip) : lista;
  const col = (m) => (typeof color === "function" ? color(m) : color);
  if (!items.length) return null;
  return (
    <>
      {conChip && (
        <div role="group" aria-label="Filtra per tipo" style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 21 }}>
          {["Tutti", ...tipi].map((t) => <Chip key={t} active={chip === t} onClick={() => setChip(t)}>{t}</Chip>)}
        </div>
      )}
      <Griglia n={mostrati.length}>
        {mostrati.map((m, i) => {
          const idx = lista.indexOf(m);
          return (
            <Reveal key={chiaveItem(m)} delay={ritardo(i)} griglia className="ds-calmo" style={{ height: "100%" }}>
              <div className="lab-fig" style={{ height: "100%" }}>
                <MatCard item={m} color={col(m)} apri={apri} aperto={aperto(m)} primario={idx === p} tag={idx === p ? tag : null} mascotte={mascotte} contesto={contesto ? contestoDi(m) : ""} />
              </div>
            </Reveal>
          );
        })}
      </Griglia>
    </>
  );
}

/* "Per continuare": ogni pagina di unità e di lezione finisce con una strada */
function Continua({ tiles, chiama, color, stretto }) {
  if (!tiles.length) return null;
  const due = tiles.length === 2;
  return (
    <nav aria-label="Per continuare" className="lab-continua" style={{ display: "grid", gridTemplateColumns: due ? "minmax(0,1.618fr) minmax(0,1fr)" : "minmax(0,1fr)", maxWidth: due ? undefined : 610, gap: 21, marginTop: stretto ? 13 : 55 }}>
      {tiles.map((t, i) => (
        <a key={i} href={t.href} onClick={t.onClick} className={"lab-avanti" + (t.main ? " lab-avanti--main" : "") + (t.main && chiama ? " lab-avanti--chiama" : "")} style={{ "--c": color }}>
          <span className="lab-avanti-eb">{t.eyebrow}</span>
          <b>{pulito(t.titolo)}</b>
          {t.meta && <span className="lab-avanti-meta">{t.meta}</span>}
          <span aria-hidden="true" className="lab-avanti-freccia">{t.indietro ? "↩" : "→"}</span>
        </a>
      ))}
    </nav>
  );
}

const Fine = ({ children }) => (
  <p className="lab-fine"><span aria-hidden="true" style={{ color: "var(--lab-oro)" }}>✦ </span>{children}</p>
);

/* quando l'ultimo materiale viene aperto in questa visita, la strada avanti
   "chiama" due volte (picco e fine); mai di nuovo al ricaricare */
function useChiama(aperti, tot) {
  const lim = useLim();
  const prima = useRef(aperti), limPrima = useRef(lim);
  const [chiama, setChiama] = useState(false);
  useEffect(() => {
    /* entrare/uscire dalla LIM cambia ciò che si vede, non ciò che si è fatto */
    if (lim || limPrima.current !== lim) { prima.current = aperti; limPrima.current = lim; return; }
    if (tot > 0 && prima.current < tot && aperti >= tot) setChiama(true);
    prima.current = aperti;
  }, [aperti, tot, lim]);
  return chiama && !lim;
}

/* la mascotte commenta un progresso appena fatto (una frase, senza giudizi).
   Se la fascia con la mascotte non è in vista, la voce compare sul sigillo
   della scheda appena aperta: il feedback arriva dove è avvenuta l'azione. */
function useVoceProgresso(mRef, aperti, frase) {
  const lim = useLim();
  const prima = useRef(aperti), limPrima = useRef(lim);
  useEffect(() => {
    if (lim || limPrima.current !== lim) { prima.current = aperti; limPrima.current = lim; return; }
    if (aperti > prima.current) {
      prima.current = aperti;
      const ultimo = percorso().aperti.slice(-1)[0];
      const parla = () => {
        const el = mRef.current;
        const hdr = document.querySelector(".lab-app header");
        const hb = hdr ? hdr.getBoundingClientRect().bottom : 68;
        const inVista = el && el.getBoundingClientRect().bottom > hb && el.getBoundingClientRect().top < innerHeight;
        if (inVista || !ultimo) faiParlare(mRef, frase());
        else window.dispatchEvent(new CustomEvent("lab:voce-sigillo", { detail: { chiave: ultimo, testo: frase() } }));
      };
      let f = null;
      const t = setTimeout(() => {
        if (document.body.classList.contains("viewing")) {
          f = () => { removeEventListener("lab:visore-chiuso", f); f = null; setTimeout(parla, 610); };
          addEventListener("lab:visore-chiuso", f);
        } else parla();
      }, 377);
      return () => { clearTimeout(t); if (f) removeEventListener("lab:visore-chiuso", f); };
    }
    prima.current = aperti;
  }, [aperti, lim]);
}

function AnnoPage({ D, n, apri }) {
  const meta = annoMeta(n);
  const color = colore(n);
  const orme = usePercorsoVisibile();
  const udas = udaForYear(D, n);
  const loose = itemsAnno(D, n).filter((it) => !normT(it.uda));
  const conteggi = udas.map((u) => { const it = itemsInUda(D, n, u.titolo); return { n: it.length, a: contaAperti(it, orme.set) }; });
  const bersaglio = conteggi.findIndex((c) => c.n > 0 && c.a < c.n);
  const nome = (window.LabMascotte && LabMascotte.INFO && LabMascotte.INFO[n] && LabMascotte.INFO[n].nome) || "";
  const vuoto = !udas.length && !loose.length;
  return (
    <div className="lab-pagina" style={{ maxWidth: 1140, margin: "0 auto", padding: "0 21px 89px" }}>
      <Briciole voci={[{ testo: "Anno " + meta.rom }]} su={{ testo: "Home" }} />
      <PaginaHero color={color} luce={n === "5" ? "50%" : undefined} glifo={meta.rom} eyebrow={udas.length ? `Anno ${meta.rom} · ${udas.length} unità` : "Anno " + meta.rom} titolo={meta.nome} desc={descAnno(D, n)} mascotte={+n}
        saluto={nome ? `Sono ${nome}: ti accompagno nel ${meta.nome.toLowerCase()}.` : ""} />
      {udas.length > 0 && (
        <>
          <SectionHead small eyebrow="Percorso" title="Unità di apprendimento" />
          <Griglia n={udas.length}>
            {udas.map((u, i) => {
              const lez = lezioniForUda(D, n, u.titolo);
              return (
                <Cartella key={u.titolo} i={i} href={hrefUda(n, u.titolo)} color={color} titolo={u.titolo} desc={u.descrizione}
                  meta={lez.length ? `${lezioni(lez.length)} · ${plurale(conteggi[i].n)}` : undefined}
                  anteprima={!u.descrizione && lez.length ? lez.slice(0, 2).map((l) => pulito(l.titolo)).join(" · ") : ""}
                  count={conteggi[i].n} aperti={conteggi[i].a} tag={i === bersaglio ? (conteggi[i].a ? "Riprendi da qui" : "Inizia da qui") : null} />
              );
            })}
          </Griglia>
        </>
      )}
      {loose.length > 0 && (
        <>
          {udas.length > 0 && <SectionHead small eyebrow="Fuori dalle unità" title="Altri contenuti" />}
          <Contenuti items={loose} color={color} apri={apri} percorso={udas.length === 0} />
        </>
      )}
      {vuoto && <Vuoto anno={+n} titolo="Quest'anno è in preparazione" testo="I materiali arriveranno presto." indietro={{ testo: "← Torna alla home", onClick: (e) => { e.preventDefault(); window.dispatchEvent(new Event("lab:home")); } }} />}
    </div>
  );
}

function UdaPage({ D, n, uda, apri }) {
  const meta = annoMeta(n);
  const color = colore(n);
  const orme = usePercorsoVisibile();
  const mRef = useRef(null);
  const u = trovaUda(D, n, uda);
  const lez = lezioniForUda(D, n, uda);
  const loose = itemsInUda(D, n, uda).filter((it) => !normT(it.lezione));
  const tutti = itemsInUda(D, n, uda);
  const aperti = contaAperti(tutti, orme.set);
  const conteggi = lez.map((l) => { const it = itemsInLezione(D, n, uda, l.titolo); return { n: it.length, a: contaAperti(it, orme.set) }; });
  const bersaglio = conteggi.findIndex((c) => c.n > 0 && c.a < c.n);
  const completa = tutti.length > 0 && aperti === tutti.length;
  const chiama = useChiama(aperti, tutti.length);

  /* memoria della "ultima tappa" solo per le unità senza lezioni */
  useEffect(() => { if (!lez.length && tutti.length && !completa) segnaUltima({ hash: hrefUda(n, u.titolo), anno: n, uda: u.titolo, titolo: u.titolo }); }, [n, uda]);

  let saluto;
  if (lez.length) {
    const t = bersaglio >= 0 ? lez[bersaglio] : null;
    if (completa) saluto = "Hai aperto tutti i materiali di questa unità.";
    else if (t && conteggi.some((c) => c.a > 0)) saluto = lez.length > 1 ? `Eccoti! Riprendi dalla lezione ${bersaglio + 1}.` : "Eccoti! Riprendi da dove eri.";
    else saluto = lez.length === 1 ? "Una lezione ti aspetta: entriamo?" : `${lez.length} lezioni ti aspettano: si parte dalla prima.`;
  } else if (tutti.length) saluto = completa ? "Hai aperto tutti i materiali di questa unità." : "Si comincia da qui.";
  useVoceProgresso(mRef, aperti, () => (aperti >= tutti.length ? "Fatto: hai aperto tutto. Se vuoi, si va avanti." : `Ne ${tutti.length - aperti === 1 ? "manca uno: ci siamo quasi." : "mancano " + (tutti.length - aperti) + "."}`));

  const udas = udaForYear(D, n);
  const v = vicini(udas, u.titolo);
  const tornaAnno = { eyebrow: "Torna all'anno", titolo: meta.nome, meta: `${udas.length} unità`, href: "#anno/" + n, indietro: true };
  const tiles = v.succ
    ? [{ main: true, eyebrow: "Unità successiva", titolo: v.succ.titolo, meta: metaConteggio(itemsInUda(D, n, v.succ.titolo).length), href: hrefUda(n, v.succ.titolo) }, tornaAnno]
    : [{ ...tornaAnno, main: true }];

  /* un indirizzo che non corrisponde a nulla nei dati: lo si dice, senza fingere "in preparazione" */
  const esiste = D.UDA.some((x) => String(x.anno) === String(n) && normT(x.titolo) === normT(uda)) || tutti.length > 0 || lez.length > 0;
  if (!esiste) return <NonTrovata n={n} meta={meta} />;

  const numero = titoloPulito(u.titolo).numero;
  const eyebrow = `Anno ${meta.rom} · Unità ${numero != null ? numero : v.pos}${v.tot >= 2 && numero == null ? ` di ${v.tot}` : ""}`;
  return (
    <div className="lab-pagina" style={{ maxWidth: 1140, margin: "0 auto", padding: "0 21px 89px" }}>
      <Briciole voci={[{ testo: "Anno " + meta.rom, href: "#anno/" + n }, { testo: u.titolo }]} su={{ testo: "Anno " + meta.rom, href: "#anno/" + n }} />
      <PaginaHero color={color} luce={n === "5" ? "50%" : undefined} glifo={meta.rom} eyebrow={eyebrow} titolo={u.titolo} desc={u.descrizione} mascotte={+n} compatto saluto={saluto} mascotteRef={mRef} />
      {lez.length > 0 && (
        <>
          <SectionHead small eyebrow="Percorso" title="Lezioni" />
          <Griglia n={lez.length}>
            {lez.map((l, i) => {
              const tipi = [...new Set(ordinaPercorso(itemsInLezione(D, n, uda, l.titolo)).map((m) => titoloMateriale(m.titolo, l.titolo)))];
              return (
                <Cartella key={l.titolo} i={i} icona="lezione" href={hrefLezione(n, uda, l.titolo)} color={color} titolo={l.titolo} desc={l.descrizione}
                  anteprima={!l.descrizione && tipi.length ? tipi.slice(0, 3).join(" · ") : ""}
                  count={conteggi[i].n} aperti={conteggi[i].a} tag={i === bersaglio ? (conteggi[i].a ? "Riprendi da qui" : "Inizia da qui") : null} />
              );
            })}
          </Griglia>
        </>
      )}
      {loose.length > 0 && (
        <>
          {lez.length > 0 && <SectionHead small eyebrow="Fuori dalle lezioni" title="Altri contenuti" />}
          <Contenuti items={loose} color={color} apri={apri} percorso={lez.length === 0} />
        </>
      )}
      {!lez.length && !loose.length && <Vuoto anno={+n} titolo="Questa unità è in preparazione" testo="Le lezioni arriveranno presto. Intanto puoi tornare all'anno." indietro={{ testo: "← Torna al " + meta.nome.toLowerCase(), href: "#anno/" + n }} />}
      {completa && <Fine>{v.succ ? "Qui hai aperto tutta l'unità. La strada continua qui sotto." : "Qui hai aperto tutta l'unità. Quando vuoi, torna all'anno per vedere il quadro."}</Fine>}
      <Continua tiles={tiles} chiama={chiama} color={color} stretto={completa} />
    </div>
  );
}

/* pagina che non esiste (link cambiato o sbagliato): si riparte dall'anno */
function NonTrovata({ n, meta }) {
  return (
    <div className="lab-pagina" style={{ maxWidth: 1140, margin: "0 auto", padding: "0 21px 89px" }}>
      <Briciole voci={[{ testo: "Anno " + meta.rom, href: "#anno/" + n }, { testo: "Pagina non trovata" }]} su={{ testo: "Anno " + meta.rom, href: "#anno/" + n }} />
      <PaginaHero neutro glifo="✦" eyebrow={"Anno " + meta.rom} titolo="Pagina non trovata" compatto />
      <Vuoto titolo="Questa pagina non c'è (o non c'è più)" testo="Forse il link è cambiato. Riparti dall'anno:">
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
          {ANNI.map((a) => <Chip key={a.n} active={a.n === String(n)} onClick={() => { location.hash = "anno/" + a.n; }}>Anno {a.rom}</Chip>)}
        </div>
      </Vuoto>
      <Continua tiles={[{ main: true, eyebrow: "Torna all'anno", titolo: meta.nome, href: "#anno/" + n, indietro: true }]} color={colore(n)} />
    </div>
  );
}

function LezionePage({ D, n, uda, lezione, apri }) {
  const meta = annoMeta(n);
  const color = colore(n);
  const orme = usePercorsoVisibile();
  const mRef = useRef(null);
  const u = trovaUda(D, n, uda);
  const L = trovaLezione(D, n, uda, lezione);
  const items = itemsInLezione(D, n, uda, lezione);
  const lista = useMemo(() => ordinaPercorso(items), [items]);
  const aperti = contaAperti(items, orme.set);
  const completa = items.length > 0 && aperti === items.length;
  const chiama = useChiama(aperti, items.length);
  const lez = lezioniForUda(D, n, uda);
  const v = vicini(lez, L.titolo);

  useEffect(() => { if (items.length && !completa) segnaUltima({ hash: hrefLezione(n, u.titolo, L.titolo), anno: n, uda: u.titolo, lezione: L.titolo, titolo: L.titolo }); }, [n, uda, lezione]);

  const primo = lista.find((m) => !orme.set.has(chiaveItem(m)));
  const resto = items.length - aperti;
  const inizio = (m) => { if (!m) return "Si comincia da qui."; const r = ruolo(m); return r === 0 ? "Si comincia dalla lezione interattiva." : r === 1 ? (m.kind === "video" ? "Si comincia dal video." : "Si comincia dalle slide.") : "Si comincia dal fascicolo."; };
  const saluto = !items.length ? "" : completa ? "Tutti i materiali aperti. Avanti?" : aperti === 0 ? inizio(primo) : resto === 1 ? "Ne manca uno: ci siamo quasi." : `Ne mancano ${resto}.`;
  useVoceProgresso(mRef, aperti, () => (aperti >= items.length ? "Fatto: hai aperto tutto. Se vuoi, si va avanti." : resto === 1 ? "Ne manca uno: ci siamo quasi." : `Ne mancano ${resto}.`));

  /* strada avanti: prossima lezione → unità successiva → torna all'unità */
  const udas = udaForYear(D, n);
  const vu = vicini(udas, u.titolo);
  const tornaUnita = { eyebrow: "Torna all'unità", titolo: u.titolo, meta: lez.length ? lezioni(lez.length) : "", href: hrefUda(n, u.titolo), indietro: true };
  let tiles;
  if (v.succ) tiles = [{ main: true, eyebrow: "Prossima lezione", titolo: v.succ.titolo, meta: metaConteggio(itemsInLezione(D, n, uda, v.succ.titolo).length), href: hrefLezione(n, uda, v.succ.titolo) }, tornaUnita];
  else if (vu.succ) tiles = [{ main: true, eyebrow: "Unità successiva", titolo: vu.succ.titolo, meta: metaConteggio(itemsInUda(D, n, vu.succ.titolo).length), href: hrefUda(n, vu.succ.titolo) }, tornaUnita];
  else tiles = [{ ...tornaUnita, main: true }, { eyebrow: "Torna all'anno", titolo: meta.nome, meta: `${udas.length} unità`, href: "#anno/" + n, indietro: true }];

  /* lezione che non esiste nei dati (né come scheda né come materiali): si dice */
  const esiste = D.LEZ.some((x) => String(x.anno) === String(n) && normT(x.uda) === normT(uda) && normT(x.titolo) === normT(lezione)) || items.length > 0;
  if (!esiste) return <NonTrovata n={n} meta={meta} />;

  const eyebrow = `${v.tot >= 2 && v.pos > 0 ? `Lezione ${v.pos} di ${v.tot}` : "Lezione"}${items.length ? ` · ${materiali(items.length)}` : ""}`;
  return (
    <div className="lab-pagina" style={{ maxWidth: 1140, margin: "0 auto", padding: "0 21px 89px" }}>
      <Briciole voci={[{ testo: "Anno " + meta.rom, href: "#anno/" + n }, { testo: u.titolo, href: hrefUda(n, u.titolo) }, { testo: L.titolo }]} su={{ testo: u.titolo, livello: "Unità", href: hrefUda(n, u.titolo) }} />
      <PaginaHero color={color} luce={n === "5" ? "50%" : undefined} glifo={meta.rom} eyebrow={eyebrow} titolo={L.titolo} desc={L.descrizione} mascotte={+n} compatto saluto={saluto} mascotteRef={mRef} />
      {items.length
        ? <Contenuti items={items} color={color} apri={apri} percorso />
        : <Vuoto anno={+n} titolo="Questa lezione è in preparazione" testo="I materiali arriveranno presto. Intanto puoi tornare all'unità." indietro={{ testo: "← Torna all'unità", href: hrefUda(n, u.titolo) }} />}
      {completa && <Fine>{v.succ || vu.succ ? "Qui hai aperto tutto. La strada continua qui sotto." : "Qui hai aperto tutto. Quando vuoi, torna all'unità per vedere il quadro."}</Fine>}
      <Continua tiles={tiles} chiama={chiama} color={color} stretto={completa} />
    </div>
  );
}

function ListaPage({ D, tipo, apri }) {
  const strumenti = tipo === "strumenti";
  const items = D.ITEMS.filter((it) => it.kind === (strumenti ? "strumento" : "video"));
  const home = { testo: "← Torna alla home", onClick: (e) => { e.preventDefault(); window.dispatchEvent(new Event("lab:home")); } };
  return (
    <div className="lab-pagina" style={{ maxWidth: 1140, margin: "0 auto", padding: "0 21px 89px" }}>
      <Briciole voci={[{ testo: strumenti ? "Strumenti" : "Video" }]} su={{ testo: "Home" }} />
      <PaginaHero neutro glifo={strumenti ? "✦" : "▶"} eyebrow={strumenti ? "Interattivi" : "Guardare insieme"} titolo={strumenti ? "Strumenti" : "Video"}
        desc={strumenti ? "Quiz, bacheche e attività digitali da usare con la classe." : "Clip e documentari selezionati per ogni tema."} />
      {items.length
        ? <Contenuti items={items} color={(m) => colore(m.anno)} apri={apri} mascotte />
        : strumenti
          ? <Vuoto titolo="Gli strumenti sono in preparazione" testo="Presto qui quiz e attività per la classe." indietro={home} />
          : <Vuoto titolo="I video sono in preparazione" testo="Presto qui clip e documentari per ogni tema." indietro={home} />}
    </div>
  );
}

/* ricerca: mostra anche DOVE stanno le cose (unità e lezioni) */
function RicercaPage({ D, q, apri, setQ }) {
  const { cartelle, items } = useMemo(() => cerca(D, q), [D, q]);
  const [tutte, setTutte] = useState(false);
  useEffect(() => setTutte(false), [q]);
  const tot = cartelle.length + items.length;
  const righe = tutte ? cartelle : cartelle.slice(0, 4);
  const sub = [cartelle.length && `${cartelle.length} tra unità e lezioni`, items.length && materiali(items.length)].filter(Boolean).join(" · ");
  return (
    <div className="lab-pagina" style={{ maxWidth: 1140, margin: "0 auto", padding: "0 21px 89px" }}>
      <Briciole voci={[{ testo: "Ricerca" }]} su={{ testo: "Home" }} />
      <SectionHead small h1 eyebrow="Ricerca" title={tot ? `Risultati per «${q}»` : `Niente per «${q}»`} sub={sub} />
      {cartelle.length > 0 && (
        <div className="lab-regione" style={{ padding: 21, borderRadius: "var(--lab-radius)", border: "1px solid var(--lab-line)", background: "var(--lab-surface)", marginBottom: 21 }}>
          <Eyebrow>Unità e lezioni</Eyebrow>
          {righe.map((c) => {
            const col = colore(c.anno);
            return (
              <a key={c.href} href={c.href} className="lab-riga" onClick={() => setQ("")}>
                <span aria-hidden="true" style={{ width: 34, height: 34, borderRadius: "50%", display: "grid", placeItems: "center", color: `color-mix(in srgb, ${col} var(--lab-tinta-icona, 100%), var(--lab-ink))`, background: `color-mix(in srgb, ${col} 16%, transparent)` }}>{c.tipo === "lezione" ? <IconaLibro /> : <IconaCartella />}</span>
                <span style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }}>
                  <b style={{ fontSize: 16, color: "var(--lab-ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{pulito(c.titolo)}</b>
                  <span style={{ fontSize: 13.5, color: "var(--lab-ink-soft)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Anno {annoMeta(c.anno).rom} · {c.tipo === "lezione" ? "Lezione · " + pulito(c.uda) : "Unità di apprendimento"}</span>
                </span>
                <span aria-hidden="true" style={{ color: "var(--lab-oro)" }}>→</span>
              </a>
            );
          })}
          {!tutte && cartelle.length > 4 && <div style={{ marginTop: 13 }}><Button size="sm" variant="ghost" onClick={() => setTutte(true)}>Mostra tutte ({cartelle.length})</Button></div>}
        </div>
      )}
      {items.length > 0 && (
        <Griglia n={items.length}>
          {items.map((m) => (
            <div key={chiaveItem(m)} className="lab-fig" style={{ height: "100%" }}>
              <MatCardRicerca item={m} apri={apri} primario={items.findIndex((x) => x.in_evidenza && azione(x).tipo !== "nessuna") === items.indexOf(m)} />
            </div>
          ))}
        </Griglia>
      )}
      {!tot && (
        <Vuoto titolo={`Niente per «${q}»`} testo="Prova con un tema (es. «Gesù», «Benedetto», «Big Bang») o con il titolo di una lezione, oppure scegli un anno:">
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
            {ANNI.map((a) => <Chip key={a.n} onClick={() => { setQ(""); location.hash = "anno/" + a.n; }}>Anno {a.rom}</Chip>)}
          </div>
        </Vuoto>
      )}
    </div>
  );
}
function MatCardRicerca({ item, apri, primario }) {
  const orme = usePercorsoVisibile();
  return <MatCard item={item} color={colore(item.anno)} apri={apri} aperto={orme.set.has(chiaveItem(item))} primario={primario} mascotte contesto={contestoDi(item)} />;
}

/* ---------- visore degli artefatti ---------- */
/* SICUREZZA: niente "allow-same-origin": un artefatto caricato in /uploads non
   può leggere lo storage del sito (es. la sessione del docente in /esami). */
/* La barra è sempre «Notte studio» (colori fissi del tema scuro): l'artefatto
   dentro l'iframe non può leggere il tema del sito e resta scuro, così nel tema
   chiaro non si vede più una barra bianca sopra una testata nera. La barra dice
   DOVE sei (anno · lezione): il titolo del materiale lo porta già l'artefatto. */
function Visore({ href, item, color, onChiudi, uscendo }) {
  const btn = useRef(null);
  const [pronto, setPronto] = useState(false);
  const stretto = useStretto();
  useEffect(() => {
    if (btn.current) btn.current.focus();
    const esc = (e) => { if (e.key === "Escape") onChiudi(); };
    addEventListener("keydown", esc);
    const t2 = setTimeout(() => setPronto(true), 4181);
    return () => { removeEventListener("keydown", esc); clearTimeout(t2); };
  }, []);
  const meta = item ? annoMeta(item.anno) : null;
  const dove = item ? [meta ? "Anno " + meta.rom : "", pulito(item.lezione || item.uda || item.titolo)].filter(Boolean).join(" · ") : "";
  const titolo = item ? titoloMateriale(item.titolo, item.lezione) : "Contenuto interattivo";
  const indietro = item && normT(item.lezione) ? "Torna alla lezione" : item && normT(item.uda) ? "Torna all'unità" : "Torna al sito";
  return (
    <div className={"lab-visore" + (uscendo ? " lab-visore--via" : "")} role="dialog" aria-modal="true" aria-label={dove ? `${titolo} · ${dove}` : titolo}
      style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", flexDirection: "column", background: "#14131F", animation: `labSu 377ms ${EASE} both` }}>
      <div className="lab-visore-barra" style={{ position: "relative", height: stretto ? 50 : 55, background: "#1E1C2E", color: "#ECEAF5", borderBottom: "1px solid #322E45", display: "flex", alignItems: "center", gap: 13, padding: "0 8px 0 3px", flex: "none" }}>
        {/* bersaglio tattile ≥44px anche sul telefono */}
        <button ref={btn} type="button" onClick={onChiudi} style={{ display: "flex", alignItems: "center", gap: 5, background: "#272438", border: "1px solid #322E45", color: "#ECEAF5", font: "inherit", fontSize: 13.5, fontWeight: 700, cursor: "pointer", padding: "0 13px", borderRadius: 999, whiteSpace: "nowrap", minHeight: 44 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M19 12H5M5 12l7-7M5 12l7 7" /></svg>
          {indietro}
        </button>
        {dove && <span style={{ font: "600 12.5px/1 var(--lab-font-inscription)", letterSpacing: ".14em", textTransform: "uppercase", color: "#E3C27A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", flex: 1, minWidth: 0, textAlign: stretto ? "right" : "left" }}>{dove}</span>}
        {/* il filo del colore dell'anno si disegna da sinistra: continuità con la pagina */}
        <span aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, bottom: -1, height: 2, background: color || "#E3C27A", transformOrigin: "left", animation: `labLine 610ms ${EASE} 144ms both` }} />
      </div>
      <div style={{ position: "relative", flex: 1, display: "flex" }}>
        {!pronto && (
          <div className="lab-carico-visore" style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", background: "#14131F", animation: "labFade 377ms ease 233ms both" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <span aria-hidden="true" style={{ fontSize: 21, color: "#E3C27A", animation: "labBreath 3.2s ease-in-out infinite" }}>✦</span>
              <span style={{ fontSize: 14, color: "#C7C3DA" }}>Carico il contenuto…</span>
            </div>
          </div>
        )}
        <iframe src={href} title={titolo} onLoad={() => setPronto(true)} sandbox="allow-scripts allow-forms allow-modals allow-popups allow-downloads" allow="fullscreen; clipboard-write"
          style={{ flex: 1, border: "none", background: "#14131F", width: "100%", opacity: pronto ? 1 : 0, transition: "opacity 233ms ease" }} />
      </div>
    </div>
  );
}

/* ---------- cornice ---------- */
const Sole = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg>;
const Luna = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>;

/* il tema è uno solo per tutta la pagina: lo leggono entrambi i pulsanti (fisso e nel footer) */
const leggiScuro = () => document.documentElement.dataset.tema !== "chiaro";
const iscriviTema = (f) => { addEventListener("lab:tema", f); return () => removeEventListener("lab:tema", f); };
function cambiaTema() {
  const next = leggiScuro() ? "chiaro" : "scuro";
  conTransizione(() => { document.documentElement.dataset.tema = next; });
  try { localStorage.setItem("tema_lab", next); } catch (e) {}
  window.dispatchEvent(new Event("lab:tema"));
}
/* sul desktop è fisso in basso a destra; sul telefono sta nel footer
   (fisso copriva la mascotte delle schede e i tag: vedi app.css) */
function ThemeToggle({ inFooter }) {
  const dark = useSyncExternalStore(iscriviTema, leggiScuro);
  const [n, setN] = useState(0);
  const toggle = () => { cambiaTema(); setN(n + 1); };
  const posizione = inFooter ? { width: 44, height: 44 } : { position: "fixed", right: 21, bottom: 21, zIndex: 60, width: 47, height: 47, boxShadow: "var(--lab-shadow)" };
  return (
    <button type="button" onClick={toggle} aria-label="Cambia tema chiaro/scuro" aria-pressed={!dark} className={inFooter ? "lab-tema-footer" : "lab-tema"}
      style={{ ...posizione, borderRadius: "50%", border: "1px solid var(--lab-line)", background: "var(--lab-surface)", color: dark ? "var(--lab-oro)" : "var(--lab-ink)", cursor: "pointer", display: "grid", placeItems: "center", transform: `rotate(${n * 180}deg)`, transition: `transform 610ms ${EASE}` }}>
      {dark ? <Sole /> : <Luna />}
    </button>
  );
}

function LimToggle() {
  const lim = useLim();
  return (
    <button type="button" className="lab-lim" aria-pressed={lim} title="Modalità LIM: caratteri grandi (tasto L)" onClick={() => setLim(!lim)}>LIM</button>
  );
}

/* "Dimentica": le orme restano solo su questo dispositivo e si cancellano con un tocco */
function Dimentica() {
  const orme = usePercorsoVisibile();
  const [fase, setFase] = useState(0); // 0 chiuso · 1 conferma · 2 fatto
  const annulla = useRef(null), fatto = useRef(null);
  useEffect(() => { if (fase === 1 && annulla.current) annulla.current.focus(); if (fase === 2 && fatto.current) fatto.current.focus(); }, [fase]);
  useEffect(() => { if (fase !== 2) return; const t = setTimeout(() => setFase(0), 2618); return () => clearTimeout(t); }, [fase]);
  if (orme.vuoto && fase !== 2) return null;
  const link = { background: "none", border: "none", padding: "0 2px", font: "inherit", color: "inherit", textDecoration: "underline", cursor: "pointer", minHeight: 34, whiteSpace: "nowrap" };
  return (
    <div className="lab-mio" role="status" aria-live="polite" style={{ gridColumn: "1 / -1", fontSize: 13.5, color: "var(--lab-muted)" }}>
      {fase === 2 ? <span ref={fatto} tabIndex={-1}>Fatto: nessuna traccia.</span> : (
        <>
          Il percorso resta su questo dispositivo{" "}
          {fase === 0
            ? <span style={{ whiteSpace: "nowrap" }}>· <button type="button" style={link} onClick={() => setFase(1)}>Dimentica</button></span>
            : <span style={{ whiteSpace: "nowrap" }}>· Sicuro? <button type="button" style={link} onClick={() => { dimenticaPercorso(); setFase(2); }}>Sì, dimentica</button> · <button ref={annulla} type="button" style={link} onClick={() => setFase(0)}>Annulla</button></span>}
        </>
      )}
    </div>
  );
}

/* la lapide di dedicazione, come sul portale di una chiesa: una riga per riga del pannello */
function Lapide({ testo, festa }) {
  const righe = String(testo || "").split(/\r?\n/).map((r) => r.trim()).filter(Boolean);
  if (!righe.length) return null;
  return (
    <div className={"lab-lapide" + (festa ? " lab-lapide--festa" : "")} role="note" aria-label="Lapide di dedicazione" style={{ gridColumn: "1 / -1", justifySelf: "center", textAlign: "center", padding: "13px 21px", borderTop: "1px solid color-mix(in srgb, var(--lab-oro) 35%, transparent)", borderBottom: "1px solid color-mix(in srgb, var(--lab-oro) 35%, transparent)", fontFamily: "var(--lab-font-inscription)", fontSize: 12.5, letterSpacing: ".2em", textTransform: "uppercase", fontWeight: 600, lineHeight: 1.9, color: "var(--lab-oro-text)" }}>
      <span aria-hidden="true" style={{ display: "block", fontSize: 11, letterSpacing: 0, lineHeight: 1.4, opacity: 0.85 }}>✦</span>
      {righe.map((r, i) => <span key={i} style={{ display: "block", textWrap: "balance" }}>{r}</span>)}
      {festa && <span style={{ display: "block", marginTop: 5, fontSize: 11.5, letterSpacing: ".18em", color: "var(--lab-oro)" }}>Oggi, festa del patrono</span>}
    </div>
  );
}

function Footer({ autore, iscrizione, festa }) {
  return (
    <footer className="lab-footer" style={{ maxWidth: 1140, margin: "0 auto", padding: "34px 21px 144px", borderTop: "1px solid var(--lab-line-soft)", color: "var(--lab-muted)", fontSize: 13.5, display: "grid", gridTemplateColumns: "minmax(0,1.618fr) auto minmax(0,1fr)", alignItems: "center", gap: 21 }}>
      <span>© {new Date().getFullYear()} {autore}<span className="lab-diritti"> · Tutti i diritti riservati</span></span>
      <Amdg />
      <span style={{ justifySelf: "end", display: "flex", alignItems: "center", gap: 13 }}>
        <a href="admin/" style={{ whiteSpace: "nowrap", color: "var(--lab-muted)" }}>Accesso docente</a>
        {/* la via breve per caricare le lezioni: discreta, ma c'è */}
        <a href="admin/importa.html" className="lab-importa" title="Importazione rapida delle lezioni" style={{ whiteSpace: "nowrap" }}>Importa</a>
        <ThemeToggle inFooter />
      </span>
      <Lapide testo={iscrizione} festa={festa} />
      <Dimentica />
    </footer>
  );
}

/* ---------- navigazione (indirizzi #anno/1/uda/…, come prima) ---------- */
function useHash() {
  const leggi = () => location.hash.replace(/^#/, "");
  const [h, setH] = useState(leggi);
  useEffect(() => {
    const f = () => setH(leggi());
    addEventListener("hashchange", f);
    return () => removeEventListener("hashchange", f);
  }, []);
  return h;
}

function dec(s) { try { return decodeURIComponent(s); } catch (e) { return s; } }

/* parametri per l'artefatto: in=visore (una sola testata), lim=1 (caratteri grandi) */
function conParam(href, k, v) {
  const [base, frag] = String(href).split("#");
  return base + (base.includes("?") ? "&" : "?") + k + "=" + v + (frag !== undefined ? "#" + frag : "");
}

function Carico() {
  const [vedi, setVedi] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVedi(true), 233); return () => clearTimeout(t); }, []);
  return (
    <div className="lab-carico" style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      {vedi && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "labFade 377ms ease both" }}>
          <span aria-hidden="true" style={{ fontSize: 21, color: "var(--lab-oro)", animation: "labBreath 3.2s ease-in-out infinite" }}>✦</span>
          <span style={{ fontSize: 14, color: "var(--lab-ink-soft)" }}>Carico…</span>
        </div>
      )}
    </div>
  );
}

function App() {
  const [D, setD] = useState(null);
  const [q, setQ] = useState("");
  const [visore, setVisore] = useState(null);
  const hash = useHash();
  const lim = useLim();
  const yRef = useRef(null);
  const openerRef = useRef(null);

  useEffect(() => {
    caricaDati().then((d) => {
      setD(d);
      const md = document.querySelector('meta[name="description"]');
      if (md && d.SITE.intro) md.setAttribute("content", d.SITE.intro);
    });
  }, []);

  /* tasto L = modalità LIM (non mentre si scrive o col visore aperto) */
  useEffect(() => {
    const f = (e) => {
      if (e.key !== "l" && e.key !== "L") return;
      if (e.ctrlKey || e.metaKey || e.altKey || document.body.classList.contains("viewing")) return;
      const t = e.target, tag = (t && t.tagName ? t.tagName : "").toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select" || (t && t.isContentEditable)) return;
      setLim(!leggiLim());
    };
    addEventListener("keydown", f);
    return () => removeEventListener("keydown", f);
  }, []);

  /* cambio pagina: si riparte dall'alto; dalla seconda pagina in poi l'entrata è breve */
  const primo = useRef(true);
  const [primaVista, setPrimaVista] = useState(true);
  useEffect(() => {
    if (primo.current) { primo.current = false; return; }
    vaiA(0);
    setPrimaVista(false);
  }, [hash]);

  /* entrando nella ricerca si torna in cima ai risultati */
  const cercaAttiva = q.trim().length > 1;
  const eraAttiva = useRef(false);
  useEffect(() => { if (cercaAttiva && !eraAttiva.current) vaiA(0); eraAttiva.current = cercaAttiva; }, [cercaAttiva]);

  /* visore: una voce nella cronologia, così il tasto "indietro" lo chiude;
     al ritorno si torna nello stesso punto, con il focus sul pulsante usato */
  const apri = (href, item, color) => {
    if (!href || href === "#") return;
    yRef.current = scrollY;
    openerRef.current = document.activeElement;
    let src = conParam(href, "in", "visore");
    if (leggiLim()) src = conParam(src, "lim", "1");
    setVisore({ href: src, item: item || null, color });
    history.pushState({ visore: true }, "");
  };
  const chiudendo = useRef(false);
  const [uscendo, setUscendo] = useState(false);
  const chiudi = () => {
    if (chiudendo.current) return;
    chiudendo.current = true;
    const via = () => { if (history.state && history.state.visore) history.back(); else setVisore(null); };
    if (movimentoRidotto()) via(); else { setUscendo(true); setTimeout(via, 233); }   /* soglia d'uscita */
  };
  useEffect(() => {
    const f = () => setVisore(null);
    addEventListener("popstate", f);
    return () => removeEventListener("popstate", f);
  }, []);
  useEffect(() => {
    document.body.classList.toggle("viewing", !!visore);
    /* la pagina sotto il visore resta nel DOM (nessuna ri-animazione al ritorno) ma è inerte */
    const app = document.querySelector(".lab-app"); if (app) app.inert = !!visore;
    if (!visore) { chiudendo.current = false; setUscendo(false); }
    if (!visore && yRef.current != null) {
      const y = yRef.current, chi = openerRef.current;
      yRef.current = null;
      requestAnimationFrame(() => {
        vaiA(y);
        /* la scheda appena usata deve essere in vista (non sotto la testata): lì arriva il sigillo */
        const fig = chi && chi.closest ? chi.closest(".lab-fig") : null;
        if (fig) {
          const r = fig.getBoundingClientRect();
          const hdr = document.querySelector(".lab-app header");
          const hb = hdr ? hdr.getBoundingClientRect().bottom : 68;
          if (r.top < hb + 21) vaiA(scrollY + r.top - hb - 21);
        }
        if (chi && chi.focus && document.contains(chi)) { try { chi.focus({ preventScroll: true }); } catch (e) { chi.focus(); } }
        window.dispatchEvent(new Event("lab:visore-chiuso"));
      });
    }
  }, [visore]);

  const home = () => { setQ(""); if (location.hash) location.hash = ""; else window.scrollTo({ top: 0, behavior: movimentoRidotto() ? "auto" : "smooth" }); };
  useEffect(() => {
    addEventListener("lab:home", home);
    return () => removeEventListener("lab:home", home);
  });
  const vaiAnno = (y) => { setQ(""); location.hash = "anno/" + y; };

  const cercaQ = q.trim();
  const parti = hash.split("/");
  const annoRotta = parti[0] === "anno" && annoMeta(parti[1]) ? parti[1] : null;

  /* link con i vecchi titoli (già condivisi): si passa in silenzio al titolo nuovo */
  useEffect(() => {
    if (!D || !annoRotta || parti[2] !== "uda" || !parti[3]) return;
    const udaRaw = dec(parti[3]), udaR = risolviUda(D, annoRotta, udaRaw);
    const lezRaw = parti[4] === "lezione" && parti[5] ? dec(parti[5]) : "";
    const lezR = lezRaw ? risolviLezione(D, annoRotta, udaR, lezRaw) : "";
    if (udaR !== udaRaw || lezR !== lezRaw) location.replace(lezR ? hrefLezione(annoRotta, udaR, lezR) : hrefUda(annoRotta, udaR));
  }, [D, hash]);

  /* titolo della scheda del browser: dove sono */
  useEffect(() => {
    if (!D) return;
    const sito = D.SITE.titolo || "Lab IRC";
    let t = sito + " · Religione Cattolica";
    if (cercaQ.length > 1) t = `Ricerca: ${cercaQ} · ${sito}`;
    else if (annoRotta) {
      const m = annoMeta(annoRotta);
      if (parti[2] === "uda" && parti[3]) {
        const uda = dec(parti[3]), lez = parti[4] === "lezione" && parti[5] ? dec(parti[5]) : "";
        const udaOk = D.UDA.some((x) => String(x.anno) === String(annoRotta) && normT(x.titolo) === normT(uda)) || itemsInUda(D, annoRotta, uda).length > 0 || D.LEZ.some((x) => String(x.anno) === String(annoRotta) && normT(x.uda) === normT(uda));
        const lezOk = !lez || (udaOk && (D.LEZ.some((x) => String(x.anno) === String(annoRotta) && normT(x.uda) === normT(uda) && normT(x.titolo) === normT(lez)) || itemsInLezione(D, annoRotta, uda, lez).length > 0));
        t = udaOk && lezOk ? `${pulito(lez || uda)} · Anno ${m.rom} · ${sito}` : `Pagina non trovata · ${sito}`;
      } else t = `${m.nome} · ${sito}`;
    } else if (hash === "strumenti") t = "Strumenti · " + sito;
    else if (hash === "video") t = "Video · " + sito;
    document.title = t;
  }, [D, hash, cercaQ]);

  if (!D) return <Carico />;

  let pagina, rotta = "";
  if (cercaQ.length > 1) { pagina = <RicercaPage D={D} q={cercaQ} apri={apri} setQ={setQ} />; rotta = "ricerca"; }
  else if (annoRotta) {
    if (parti[2] === "uda" && parti[3]) {
      pagina = parti[4] === "lezione" && parti[5]
        ? <LezionePage key={hash} D={D} n={parti[1]} uda={dec(parti[3])} lezione={dec(parti[5])} apri={apri} />
        : <UdaPage key={hash} D={D} n={parti[1]} uda={dec(parti[3])} apri={apri} />;
    } else pagina = <AnnoPage key={hash} D={D} n={parti[1]} apri={apri} />;
    rotta = "anno";
  } else if (hash === "strumenti" || hash === "video") { pagina = <ListaPage key={hash} D={D} tipo={hash} apri={apri} />; rotta = hash; }
  else { pagina = <HomePage D={D} onYear={vaiAnno} />; rotta = "home"; }

  const nS = D.ITEMS.some((it) => it.kind === "strumento");
  const nV = D.ITEMS.some((it) => it.kind === "video");

  return (
    <PrimaVista.Provider value={primaVista}>
      {rotta === "home" && <CursorHalo />}
      <div className="lab-app" style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
        <Header titolo={D.SITE.titolo} onHome={home} q={q} setQ={setQ} anno={rotta === "anno" ? annoRotta : null} rotta={rotta} conStrumenti={nS} conVideo={nV} />
        <main>{pagina}</main>
        <Footer autore={D.SITE.autore || ""} iscrizione={D.SITE.iscrizione || D.SITE.dedica} festa={!!String(D.SITE.patrono || "").trim() && festaOggi(D.SITE.patrono_festa)} />
      </div>
      <LimToggle />
      <ThemeToggle />
      <AmdgEgg />
      {visore && <Visore href={visore.href} item={visore.item} color={visore.color} onChiudi={chiudi} uscendo={uscendo} />}
    </PrimaVista.Provider>
  );
}

createRoot(document.getElementById("root")).render(<App />);
