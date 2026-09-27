/* =====================================================================
   Lab IRC — il sito, come da modello di Claude Design
   (design-system/ui_kits/main-site/index.html), collegato ai dati veri
   del pannello Decap (data/*.json).

   I componenti (YearCard, Card, Button, Badge, Chip, YearMascot, AmdgEgg,
   Amdg) sono quelli del design system, importati così come sono.
   ===================================================================== */
import React, { useState, useEffect, useRef, useMemo } from "react";
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
  azione, varianteBadge,
} from "./dati.js";

import "./app.css";

const EASE = "cubic-bezier(.16,1,.3,1)";
const ROMAN = { 1: "I", 2: "II", 3: "III", 4: "IV", 5: "V" };
const conMouse = () => window.matchMedia && matchMedia("(hover: hover) and (pointer: fine)").matches;
const movimentoRidotto = () => window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
const slug = (s) => encodeURIComponent(String(s || "").trim());
const plurale = (n) => n + " " + (n === 1 ? "contenuto" : "contenuti");

/* ---------- aiuti di movimento (dal modello) ---------- */
function Reveal({ children, delay = 0, style, className }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (on) return;
    const check = () => { const el = ref.current; if (el && el.getBoundingClientRect().top < innerHeight * 0.92) setOn(true); };
    check();
    let io;
    if ("IntersectionObserver" in window && ref.current) {
      io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold: 0.12 });
      io.observe(ref.current);
    }
    addEventListener("scroll", check, { passive: true });
    const safety = setTimeout(() => setOn(true), 1618);
    return () => { io && io.disconnect(); removeEventListener("scroll", check); clearTimeout(safety); };
  }, [on]);
  const tr = `987ms ${EASE} ${delay}ms`;
  return (
    <div ref={ref} className={className} style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateY(21px)", filter: on ? "none" : "blur(6px)", transition: `opacity ${tr}, transform ${tr}, filter ${tr}`, ...style }}>
      {children}
    </div>
  );
}

function useMouse() {
  const [m, setM] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (!conMouse()) return;
    const f = (e) => setM({ x: (e.clientX / innerWidth) * 2 - 1, y: (e.clientY / innerHeight) * 2 - 1 });
    addEventListener("mousemove", f);
    return () => removeEventListener("mousemove", f);
  }, []);
  return m;
}

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
  return <div ref={ref} className="lab-alone" aria-hidden="true" style={{ position: "fixed", left: 0, top: 0, width: 466, height: 466, borderRadius: "50%", pointerEvents: "none", zIndex: 0, opacity: 0, transition: "opacity 610ms", background: "radial-gradient(circle, rgba(139,92,246,.10), rgba(227,194,122,.04) 38.2%, transparent 61.8%)" }} />;
}

/* ---------- piccoli pezzi ---------- */
function Eyebrow({ children, color = "var(--lab-oro)" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 13, whiteSpace: "nowrap", fontFamily: "var(--lab-font-inscription)", fontSize: 13, letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 600, color, marginBottom: 13 }}>
      <span style={{ width: 34, height: 1, background: "currentColor", opacity: 0.7, flexShrink: 0 }} />
      <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{children}</span>
    </div>
  );
}

function SectionHead({ eyebrow, title, sub, small }) {
  return (
    <Reveal className="lab-shead" style={{ display: "grid", gridTemplateColumns: "minmax(0,1.618fr) minmax(0,1fr)", alignItems: "end", gap: 34, margin: small ? "55px 0 21px" : "89px 0 34px" }}>
      <div><Eyebrow>{eyebrow}</Eyebrow><h2 style={{ fontSize: small ? "clamp(24px,3vw,33px)" : "clamp(26px,3.6vw,42px)", margin: 0 }}>{title}</h2></div>
      {sub && <p style={{ color: "var(--lab-muted)", fontSize: 15, margin: 0 }}>{sub}</p>}
    </Reveal>
  );
}

function NavLink({ children, href, className }) {
  const [h, setH] = useState(false);
  return (
    <a href={href} className={className} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ position: "relative", color: h ? "var(--lab-ink)" : "var(--lab-ink-soft)", textDecoration: "none", fontWeight: 600, fontSize: 14.5, padding: "8px 13px", transition: "color 233ms", whiteSpace: "nowrap" }}>
      {children}
      <span style={{ position: "absolute", left: 13, right: 13, bottom: 3, height: 1.5, background: "var(--lab-oro)", transform: `scaleX(${h ? 1 : 0})`, transition: `transform 377ms ${EASE}` }} />
    </a>
  );
}

function Logo({ titolo, onHome }) {
  const [h, setH] = useState(false);
  const parole = String(titolo || "Lab IRC").trim().split(/\s+/);
  const ultima = parole.length > 1 ? parole.pop() : null;
  return (
    <a href="#" data-amdg-trigger className="lab-logo" onClick={(e) => { e.preventDefault(); onHome(); }} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
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
    <div className="lab-search" style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--lab-bg-2)", border: "1px solid", borderColor: f ? "var(--lab-oro)" : "var(--lab-line)", borderRadius: 999, padding: "8px 13px", width: f ? 233 : 170, transition: `width 377ms ${EASE}, border-color 233ms` }}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ color: "var(--lab-muted)", flexShrink: 0 }}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></svg>
      <input value={value} onChange={(e) => onChange(e.target.value)} onFocus={() => setF(true)} onBlur={() => setF(false)} type="search" placeholder="Cerca…" aria-label="Cerca nei contenuti" autoComplete="off"
        style={{ border: "none", outline: "none", background: "none", font: "inherit", fontSize: 14, width: "100%", minWidth: 0, color: "var(--lab-ink)" }} />
    </div>
  );
}

function Header({ titolo, onHome, q, setQ }) {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 40, background: "color-mix(in srgb, var(--lab-bg) 80%, transparent)", backdropFilter: "saturate(160%) blur(13px)", WebkitBackdropFilter: "saturate(160%) blur(13px)", borderBottom: "1px solid var(--lab-line-soft)" }}>
      <div className="lab-bar" style={{ maxWidth: 1140, margin: "0 auto", padding: "0 21px", display: "flex", alignItems: "center", gap: 13, height: 68 }}>
        <Logo titolo={titolo} onHome={onHome} />
        <Search value={q} onChange={setQ} />
        <nav style={{ display: "flex", gap: 5 }}>
          <NavLink href="#strumenti" className="lab-nav-opt">Strumenti</NavLink>
          <NavLink href="#video" className="lab-nav-opt">Video</NavLink>
          <NavLink href="esami/">Verifiche</NavLink>
        </nav>
      </div>
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
      <div aria-hidden="true" style={{ position: "absolute", inset: "-21%", borderRadius: "50%", pointerEvents: "none", background: `conic-gradient(from ${c.a + 90 - 13}deg, rgba(227,194,122,0) 0deg, rgba(227,194,122,${(0.26 * c.p).toFixed(3)}) 13deg, rgba(227,194,122,0) 26deg, rgba(227,194,122,0) 360deg)`, WebkitMaskImage: "radial-gradient(circle, #000 21%, transparent 70%)", maskImage: "radial-gradient(circle, #000 21%, transparent 70%)" }} />
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

/* ---------- home ---------- */
function Hero({ site, anni, onStart, onYear }) {
  useMouse();
  const parole = String(site.sottotitolo || "Il laboratorio di Religione").trim().split(/\s+/);
  const ultima = parole.pop();
  return (
    <section className="lab-hero" style={{ maxWidth: 1140, margin: "0 auto", padding: "89px 21px 34px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 55 }}>
      <div style={{ flex: "1.618 1 420px", minWidth: 0 }}>
        <div style={{ animation: `labRise 987ms ${EASE} both` }}><Eyebrow>Religione Cattolica</Eyebrow></div>
        <h1 style={{ fontSize: "clamp(42px,6.4vw,76px)", lineHeight: 1.08, letterSpacing: "-.025em", margin: "13px 0 13px" }}>
          {parole.map((w, i) => <span key={i} style={{ display: "inline-block", marginRight: ".25em", animation: `labRise 987ms ${EASE} ${89 + i * 89}ms both` }}>{w}</span>)}
          {parole.length > 0 && <br />}
          <span style={{ display: "inline-block", paddingBottom: ".14em", paddingRight: ".06em", fontStyle: "italic", fontWeight: 500, animation: `labRise 987ms ${EASE} ${89 + parole.length * 89}ms both` }} className="lab-grad-text">{ultima}</span>
        </h1>
        <p style={{ fontSize: "clamp(16px,1.6vw,20.5px)", color: "var(--lab-muted)", maxWidth: "38ch", margin: "0 0 34px", animation: `labRise 987ms ${EASE} 445ms both` }}>
          {site.intro}<span aria-hidden="true" style={{ color: "transparent" }}> A·M·D·G</span>
        </p>
        <div style={{ display: "flex", gap: 13, flexWrap: "wrap", animation: `labRise 987ms ${EASE} 534ms both` }}>
          <Button onClick={onStart}>Inizia il percorso →</Button>
        </div>
      </div>
      <div style={{ flex: "1 1 320px", minWidth: 0 }}><Rosone anni={anni} onYear={onYear} /></div>
    </section>
  );
}

function Quote({ testo }) {
  if (!testo) return null;
  return (
    <Reveal style={{ margin: "89px 0 0", textAlign: "center", padding: "55px 21px" }}>
      <div style={{ color: "var(--lab-oro)", fontSize: 13, marginBottom: 21, animation: "labBreath 3.2s ease-in-out infinite" }}>✦</div>
      <blockquote style={{ margin: "0 auto", maxWidth: "22ch", fontFamily: "var(--lab-font-display)", fontStyle: "italic", fontWeight: 500, fontSize: "clamp(26px,3.6vw,42px)", lineHeight: 1.2, color: "var(--lab-ink)", textWrap: "balance" }}>«{testo}»</blockquote>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 13, marginTop: 34 }}>
        <span style={{ width: 55, height: 1, background: "var(--lab-oro)", opacity: 0.6 }} />
        <span style={{ fontSize: 12.5, letterSpacing: ".2em", textTransform: "uppercase", fontWeight: 800, color: "var(--lab-oro)" }}>Pensiero guida</span>
        <span style={{ width: 55, height: 1, background: "var(--lab-oro)", opacity: 0.6 }} />
      </div>
    </Reveal>
  );
}

function Tools() {
  const t = [
    { label: "Interattivi", title: "Strumenti", desc: "Quiz, bacheche e attività digitali per la classe.", icon: "⚙", bg: "linear-gradient(135deg,#7A5AC9,#4A338C)", href: "#strumenti" },
    { label: "Guardare insieme", title: "Video", desc: "Clip e documentari selezionati per ogni tema.", icon: "▶", bg: "linear-gradient(135deg,#D24F86,#9E2D5E)", href: "#video" },
  ];
  return (
    <div className="lab-tools" style={{ display: "grid", gridTemplateColumns: "minmax(0,1.618fr) minmax(0,1fr)", gap: 21 }}>
      {t.map((x, i) => (
        <Reveal key={x.title} delay={i * 89}>
          <a href={x.href} className="ds-calmo" style={{ display: "block", textDecoration: "none", color: "inherit" }}>
            <Card onClick={() => {}} glow="rgba(255,255,255,.22)" style={{ background: x.bg, border: 0, color: "#fff", padding: 34, minHeight: 233 }}>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%", minHeight: 165 }}>
                <span aria-hidden="true" style={{ position: "absolute", right: -8, top: -21, fontSize: 110, opacity: 0.14, lineHeight: 1 }}>{x.icon}</span>
                <span style={{ fontSize: 12.5, letterSpacing: ".2em", textTransform: "uppercase", fontWeight: 800, opacity: 0.85 }}>{x.label}</span>
                <h3 style={{ fontSize: 33, margin: "5px 0 8px", color: "#fff" }}>{x.title}</h3>
                <p style={{ margin: 0, fontSize: 15, color: "rgba(255,255,255,.88)", maxWidth: "34ch" }}>{x.desc}</p>
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
    <Reveal className="lab-about" style={{ margin: "89px 0 0", padding: "55px 34px", borderRadius: 34, border: "1px solid var(--lab-line)", background: "var(--lab-grad-soft)", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.618fr)", gap: 55, alignItems: "center" }}>
      <div id="chisono">
        <Eyebrow>Chi sono</Eyebrow>
        <h2 style={{ fontSize: "clamp(26px,3.2vw,42px)", margin: 0 }}>{site.autore || "L'insegnante"}</h2>
      </div>
      <div>
        <p style={{ fontSize: 17, margin: "0 0 21px" }}>{site.bio || BIO}</p>
        {site.email && <Button variant="ghost" size="sm" href={"mailto:" + site.email}>Scrivimi</Button>}
      </div>
    </Reveal>
  );
}

function HomePage({ D, onYear }) {
  const anniRef = useRef(null);
  const anni = ANNI.map((a) => ({ year: +a.n, nome: a.nome, desc: descAnno(D, a.n), count: itemsAnno(D, a.n).length }));
  const vaiAgliAnni = () => {
    const el = anniRef.current; if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 68, behavior: movimentoRidotto() ? "auto" : "smooth" });
  };
  return (
    <>
      <Hero site={D.SITE} anni={anni} onStart={vaiAgliAnni} onYear={onYear} />
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "0 21px 89px" }}>
        <div ref={anniRef} />
        <SectionHead eyebrow="Percorso" title="Gli anni di corso" sub="Scegli l'anno per trovare slide, documenti, video e strumenti." />
        <div className="lab-anni" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(199px,1fr))", gap: 21 }}>
          {anni.map((a, i) => (
            <Reveal key={a.year} delay={i * 89} className="ds-calmo">
              <YearCard year={a.year} name={a.nome} description={a.desc} count={a.count} href={"#anno/" + a.year} />
            </Reveal>
          ))}
        </div>
        <Quote testo={D.SITE.pensiero} />
        <SectionHead eyebrow="Per fare lezione" title="Strumenti & Video" sub="Risorse interattive e clip per animare le lezioni." />
        <Tools />
        <About site={D.SITE} />
      </div>
    </>
  );
}

/* ---------- pagine interne ---------- */
function Briciole({ voci }) {
  return (
    <nav aria-label="Percorso" style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", fontSize: 14, color: "var(--lab-muted)", margin: "34px 0 0" }}>
      <a href="#" style={{ fontWeight: 600 }} onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event("lab:home")); }}>← Home</a>
      {voci.map((v, i) => (
        <React.Fragment key={i}>
          <span style={{ opacity: 0.4 }}>›</span>
          {v.href ? <a href={v.href} style={{ fontWeight: 600 }}>{v.testo}</a> : <span>{v.testo}</span>}
        </React.Fragment>
      ))}
    </nav>
  );
}

/* testata colorata della pagina (numero romano con parallasse + mascotte) */
function PaginaHero({ color, glifo, eyebrow, titolo, desc, mascotte }) {
  const [p, setP] = useState({ x: 0, y: 0 });
  const segui = conMouse();
  return (
    <div className="lab-pagina-hero"
      onMouseMove={segui ? (e) => { const r = e.currentTarget.getBoundingClientRect(); setP({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 }); } : undefined}
      onMouseLeave={segui ? () => setP({ x: 0, y: 0 }) : undefined}
      style={{ position: "relative", padding: "55px 34px", borderRadius: 34, margin: "21px 0 34px", overflow: "hidden", color: "#fff", background: `linear-gradient(130deg, ${color}, color-mix(in srgb, ${color} 50%, #14101a))`, animation: `labRise 987ms ${EASE} both` }}>
      <div aria-hidden="true" className="lab-glifo" style={{ position: "absolute", right: 21, bottom: -34, fontSize: 199, opacity: 0.14, fontFamily: "var(--lab-font-inscription)", fontWeight: 600, lineHeight: 1, transform: `translate(${p.x * 34}px, ${p.y * 21}px)`, transition: `transform 610ms ${EASE}` }}>{glifo}</div>
      {mascotte && <div className="lab-pagina-mascotte" style={{ position: "absolute", right: 34, top: 34, zIndex: 2 }}><YearMascot year={mascotte} size={96} /></div>}
      <Eyebrow color="rgba(255,255,255,.85)">{eyebrow}</Eyebrow>
      <h2 style={{ fontSize: "clamp(33px,5vw,55px)", margin: "0 0 8px", color: "#fff", paddingRight: mascotte ? 110 : 0 }}>{titolo}</h2>
      {desc && <p style={{ margin: 0, maxWidth: "46ch", color: "rgba(255,255,255,.9)" }}>{desc}</p>}
    </div>
  );
}

/* cartella (UDA o lezione) */
function Cartella({ href, color, titolo, desc, count, icona, i }) {
  return (
    <Reveal delay={i * 89} className="ds-calmo">
      <a href={href} style={{ display: "block", textDecoration: "none", color: "inherit", height: "100%" }}>
        <Card onClick={() => {}} glow={`color-mix(in srgb, ${color} 22%, transparent)`} style={{ padding: "21px 21px 21px 34px", height: "100%" }}>
          <span aria-hidden="true" style={{ position: "absolute", left: -34, top: -21, bottom: -21, width: 5, background: color }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 5, height: "100%" }}>
            <span style={{ width: 42, height: 42, borderRadius: 13, display: "grid", placeItems: "center", color, background: `color-mix(in srgb, ${color} 16%, transparent)`, marginBottom: 8 }}>
              {icona === "lezione"
                ? <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
                : <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" /></svg>}
            </span>
            <h3 style={{ fontSize: 24, margin: 0 }}>{titolo}</h3>
            {desc && <p style={{ fontSize: 14, color: "var(--lab-muted)", margin: 0, lineHeight: 1.5 }}>{desc}</p>}
            <span style={{ marginTop: "auto", paddingTop: 13, fontSize: 11.5, fontWeight: 800, letterSpacing: ".13em", textTransform: "uppercase", color }}>{plurale(count)}</span>
          </div>
        </Card>
      </a>
    </Reveal>
  );
}

function Griglia({ children }) {
  return <div className="lab-griglia" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(288px,1fr))", gap: 21 }}>{children}</div>;
}

function Vuoto() {
  return (
    <div style={{ textAlign: "center", padding: "55px 21px", color: "var(--lab-muted)", border: "1.5px dashed var(--lab-line)", borderRadius: 21, background: "var(--lab-surface)" }}>
      <b style={{ fontFamily: "var(--lab-font-display)", color: "var(--lab-ink)", display: "block", fontSize: 24, marginBottom: 8, fontWeight: 600 }}>Ancora nessun contenuto</b>
      Apri l'<a href="admin/">area gestione</a> per aggiungerne.
    </div>
  );
}

/* scheda di un contenuto (come la "MatCard" del modello) */
function MatCard({ item, color, apri }) {
  const [video, setVideo] = useState(false);
  const act = azione(item);
  const anno = annoMeta(item.anno) ? +item.anno : 0;
  const yt = item.kind === "video" ? ytId(item.youtube) : "";
  const immagine = item.immagine ? resolvePath(item.immagine) : yt ? `https://img.youtube.com/vi/${yt}/hqdefault.jpg` : "";
  const glifo = item.kind === "video" ? "▶" : anno ? ROMAN[anno] : "✦";

  const esegui = () => {
    if (act.tipo === "video") setVideo(true);
    else if (act.tipo === "visore") apri(act.href, item.titolo);
    else if (act.tipo === "esterno") window.open(act.href, "_blank", "noopener");
  };

  return (
    <Card style={{ padding: 0, height: "100%" }} glow={`color-mix(in srgb, ${color} 22%, transparent)`}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {video ? (
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, background: "#000" }}>
          <iframe src={`https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0&modestbranding=1`} title={item.titolo || "Video"} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowFullScreen style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }} />
        </div>
      ) : (
        <div onClick={yt ? () => setVideo(true) : undefined}
          style={{ position: "relative", height: 144, background: immagine ? `center/cover no-repeat url("${immagine.replace(/"/g, "%22")}")` : `linear-gradient(135deg, ${color}, color-mix(in srgb, ${color} 45%, #14101a))`, display: "grid", placeItems: "center", fontFamily: "var(--lab-font-inscription)", fontWeight: 600, fontSize: 46, color: "rgba(255,255,255,.85)", cursor: yt ? "pointer" : "default" }}>
          {!immagine && glifo}
          {yt && <span aria-hidden="true" style={{ width: 55, height: 55, borderRadius: "50%", background: "rgba(255,255,255,.92)", boxShadow: "0 8px 21px rgba(0,0,0,.3)", display: "grid", placeItems: "center", color: "#14131F", fontSize: 21, paddingLeft: 4 }}>▶</span>}
        </div>
      )}
      {anno && !video ? <span style={{ position: "absolute", right: 13, top: 119, zIndex: 2 }}><YearMascot year={anno} size={42} /></span> : null}
      {item.in_evidenza && <span style={{ position: "absolute", top: 13, left: 13, background: "var(--lab-ambra)", color: "#3a2a06", fontSize: 10.5, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", padding: "5px 8px", borderRadius: 999, zIndex: 2 }}>In evidenza</span>}
      <div style={{ padding: 21, display: "flex", flexDirection: "column", gap: 13, flex: 1 }}>
        <div><Badge variant={varianteBadge(item)}>{item.tipo || "Materiale"}</Badge></div>
        <h3 style={{ fontSize: 24, margin: 0 }}>{item.titolo || "Senza titolo"}</h3>
        {item.descrizione && <p style={{ fontSize: 14, color: "var(--lab-muted)", margin: 0 }}>{item.descrizione}</p>}
        <div style={{ marginTop: "auto" }}>
          {act.tipo === "nessuna"
            ? <Button size="sm" variant="ghost" disabled>{act.testo}</Button>
            : <Button size="sm" variant={item.kind === "video" ? "ghost" : "primary"} onClick={esegui}>{act.testo}</Button>}
        </div>
      </div>
      </div>
    </Card>
  );
}

/* contenuti con filtro per tipo */
function Contenuti({ items, color, apri }) {
  const [chip, setChip] = useState("Tutti");
  const tipi = useMemo(() => [...new Set(items.map((m) => m.tipo || "Materiale"))], [items]);
  const mostrati = chip === "Tutti" ? items : items.filter((m) => (m.tipo || "Materiale") === chip);
  if (!items.length) return <Vuoto />;
  return (
    <>
      {tipi.length > 1 && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 34 }}>
          {["Tutti", ...tipi].map((t) => <Chip key={t} active={chip === t} onClick={() => setChip(t)}>{t}</Chip>)}
        </div>
      )}
      <Griglia>
        {mostrati.map((m, i) => (
          <Reveal key={(m.titolo || "") + i + chip} delay={Math.min(i, 8) * 89} className="ds-calmo" style={{ height: "100%" }}>
            <MatCard item={m} color={color} apri={apri} />
          </Reveal>
        ))}
      </Griglia>
    </>
  );
}

function AnnoPage({ D, n, apri }) {
  const meta = annoMeta(n);
  const color = colore(n);
  const udas = udaForYear(D, n);
  const loose = itemsAnno(D, n).filter((it) => !normT(it.uda));
  return (
    <div className="lab-pagina" style={{ maxWidth: 1140, margin: "0 auto", padding: "0 21px 89px" }}>
      <Briciole voci={[{ testo: "Anno " + meta.rom }]} />
      <PaginaHero color={color} glifo={meta.rom} eyebrow={"Anno " + meta.rom} titolo={meta.nome} desc={descAnno(D, n)} mascotte={+n} />
      {udas.length > 0 && (
        <>
          <SectionHead small eyebrow="Percorsi" title="Unità di apprendimento" sub="Le cartelle con i materiali di ogni unità." />
          <Griglia>
            {udas.map((u, i) => <Cartella key={u.titolo} i={i} href={`#anno/${n}/uda/${slug(u.titolo)}`} color={color} titolo={u.titolo} desc={u.descrizione} count={itemsInUda(D, n, u.titolo).length} />)}
          </Griglia>
        </>
      )}
      {(loose.length > 0 || !udas.length) && (
        <>
          {udas.length > 0 && <SectionHead small eyebrow="Fuori dalle cartelle" title="Altri contenuti" />}
          <Contenuti items={loose} color={color} apri={apri} />
        </>
      )}
    </div>
  );
}

function UdaPage({ D, n, uda, apri }) {
  const meta = annoMeta(n);
  const color = colore(n);
  const u = trovaUda(D, n, uda);
  const lez = lezioniForUda(D, n, uda);
  const loose = itemsInUda(D, n, uda).filter((it) => !normT(it.lezione));
  return (
    <div className="lab-pagina" style={{ maxWidth: 1140, margin: "0 auto", padding: "0 21px 89px" }}>
      <Briciole voci={[{ testo: "Anno " + meta.rom, href: "#anno/" + n }, { testo: u.titolo }]} />
      <PaginaHero color={color} glifo={meta.rom} eyebrow={meta.nome + " · Unità di apprendimento"} titolo={u.titolo} desc={u.descrizione} mascotte={+n} />
      {lez.length > 0 && (
        <>
          <SectionHead small eyebrow="Percorso" title="Lezioni" sub="Le sottocartelle con i materiali di ogni lezione." />
          <Griglia>
            {lez.map((l, i) => <Cartella key={l.titolo} i={i} icona="lezione" href={`#anno/${n}/uda/${slug(uda)}/lezione/${slug(l.titolo)}`} color={color} titolo={l.titolo} desc={l.descrizione} count={itemsInLezione(D, n, uda, l.titolo).length} />)}
          </Griglia>
        </>
      )}
      {(loose.length > 0 || !lez.length) && (
        <>
          {lez.length > 0 && <SectionHead small eyebrow="Fuori dalle lezioni" title="Altri contenuti" />}
          <Contenuti items={loose} color={color} apri={apri} />
        </>
      )}
    </div>
  );
}

function LezionePage({ D, n, uda, lezione, apri }) {
  const meta = annoMeta(n);
  const color = colore(n);
  const u = trovaUda(D, n, uda);
  const L = trovaLezione(D, n, uda, lezione);
  return (
    <div className="lab-pagina" style={{ maxWidth: 1140, margin: "0 auto", padding: "0 21px 89px" }}>
      <Briciole voci={[{ testo: "Anno " + meta.rom, href: "#anno/" + n }, { testo: u.titolo, href: `#anno/${n}/uda/${slug(u.titolo)}` }, { testo: L.titolo }]} />
      <PaginaHero color={color} glifo={meta.rom} eyebrow={u.titolo + " · Lezione"} titolo={L.titolo} desc={L.descrizione} mascotte={+n} />
      <Contenuti items={itemsInLezione(D, n, uda, lezione)} color={color} apri={apri} />
    </div>
  );
}

function ListaPage({ D, tipo, apri }) {
  const strumenti = tipo === "strumenti";
  const color = strumenti ? "var(--lab-anno-3)" : "var(--lab-anno-4)";
  const items = D.ITEMS.filter((it) => it.kind === (strumenti ? "strumento" : "video"));
  return (
    <div className="lab-pagina" style={{ maxWidth: 1140, margin: "0 auto", padding: "0 21px 89px" }}>
      <Briciole voci={[{ testo: strumenti ? "Strumenti" : "Video" }]} />
      <PaginaHero color={color} glifo={strumenti ? "✦" : "▶"} eyebrow={strumenti ? "Interattivi" : "Guardare insieme"} titolo={strumenti ? "Strumenti" : "Video"}
        desc={strumenti ? "Quiz, bacheche e attività digitali da usare con la classe." : "Clip e documentari selezionati per ogni tema."} />
      <Contenuti items={items} color={color} apri={apri} />
    </div>
  );
}

function RicercaPage({ D, q, apri }) {
  const lq = q.toLowerCase();
  const items = D.ITEMS.filter((it) => (it.titolo || "").toLowerCase().includes(lq) || (it.descrizione || "").toLowerCase().includes(lq));
  return (
    <div className="lab-pagina" style={{ maxWidth: 1140, margin: "0 auto", padding: "0 21px 89px" }}>
      <Briciole voci={[{ testo: `Ricerca: «${q}»` }]} />
      <SectionHead small eyebrow="Ricerca" title={`${items.length} risultat${items.length === 1 ? "o" : "i"}`} sub={`per «${q}»`} />
      {items.length ? (
        <Griglia>
          {items.map((m, i) => (
            <Reveal key={(m.titolo || "") + i} delay={Math.min(i, 8) * 89} className="ds-calmo" style={{ height: "100%" }}>
              <MatCard item={m} color={colore(m.anno)} apri={apri} />
            </Reveal>
          ))}
        </Griglia>
      ) : (
        <p style={{ color: "var(--lab-muted)" }}>Nessun contenuto trovato. Prova con un'altra parola.</p>
      )}
    </div>
  );
}

/* ---------- visore degli artefatti ---------- */
/* SICUREZZA: niente "allow-same-origin": un artefatto caricato in /uploads non
   può leggere lo storage del sito (es. la sessione del docente in /esami). */
function Visore({ href, titolo, onChiudi }) {
  return (
    <div className="lab-visore" style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", flexDirection: "column", background: "var(--lab-bg)" }}>
      <div style={{ height: 55, background: "#191726", color: "#fff", display: "flex", alignItems: "center", gap: 13, padding: "0 13px", flex: "none" }}>
        <button onClick={onChiudi} style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,.1)", border: "none", color: "#fff", font: "inherit", fontSize: 13.5, fontWeight: 700, cursor: "pointer", padding: "8px 13px", borderRadius: 999, whiteSpace: "nowrap" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M5 12l7-7M5 12l7 7" /></svg>
          Torna al sito
        </button>
        <div style={{ fontFamily: "var(--lab-font-display)", fontSize: 19, fontWeight: 600, flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", padding: "0 8px", opacity: 0.92 }}>{titolo}</div>
      </div>
      <iframe src={href} title="Contenuto interattivo" sandbox="allow-scripts allow-forms allow-modals allow-popups allow-downloads" allow="fullscreen; clipboard-write" style={{ flex: 1, border: "none", background: "#fff", width: "100%" }} />
    </div>
  );
}

/* ---------- cornice ---------- */
function ThemeToggle() {
  const [dark, setDark] = useState(document.documentElement.dataset.tema !== "chiaro");
  const [n, setN] = useState(0);
  const toggle = () => {
    const next = dark ? "chiaro" : "scuro";
    document.documentElement.dataset.tema = next;
    try { localStorage.setItem("tema_lab", next); } catch (e) {}
    setDark(!dark); setN(n + 1);
  };
  return (
    <button onClick={toggle} aria-label="Cambia tema chiaro/scuro" className="lab-tema"
      style={{ position: "fixed", right: 21, bottom: 21, zIndex: 60, width: 47, height: 47, borderRadius: "50%", border: "1px solid var(--lab-line)", background: "var(--lab-surface)", color: "var(--lab-ink)", fontSize: 18, cursor: "pointer", boxShadow: "var(--lab-shadow)", display: "grid", placeItems: "center", transform: `rotate(${n * 180}deg)`, transition: `transform 610ms ${EASE}` }}>
      {dark ? "☀️" : "🌙"}
    </button>
  );
}

function Footer({ autore }) {
  return (
    <footer className="lab-footer" style={{ maxWidth: 1140, margin: "0 auto", padding: "34px 21px 55px", borderTop: "1px solid var(--lab-line-soft)", color: "var(--lab-muted)", fontSize: 13.5, display: "grid", gridTemplateColumns: "minmax(0,1.618fr) auto minmax(0,1fr)", alignItems: "center", gap: 21 }}>
      <span>© {new Date().getFullYear()} {autore} · Tutti i diritti riservati</span>
      <Amdg />
      <a href="admin/" style={{ justifySelf: "end", whiteSpace: "nowrap", color: "var(--lab-muted)" }}>Area gestione</a>
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

function App() {
  const [D, setD] = useState(null);
  const [q, setQ] = useState("");
  const [visore, setVisore] = useState(null);
  const hash = useHash();

  useEffect(() => {
    caricaDati().then((d) => {
      setD(d);
      document.title = (d.SITE.titolo || "Lab IRC") + " · Religione Cattolica";
      const md = document.querySelector('meta[name="description"]');
      if (md && d.SITE.intro) md.setAttribute("content", d.SITE.intro);
    });
  }, []);

  /* cambio pagina: si riparte dall'alto */
  const primo = useRef(true);
  useEffect(() => {
    if (primo.current) { primo.current = false; return; }
    window.scrollTo(0, 0);
  }, [hash]);

  /* visore: una voce nella cronologia, così il tasto "indietro" lo chiude */
  const apri = (href, titolo) => {
    if (!href || href === "#") return;
    setVisore({ href, titolo: titolo || "" });
    history.pushState({ visore: true }, "");
  };
  const chiudi = () => { if (history.state && history.state.visore) history.back(); else setVisore(null); };
  useEffect(() => {
    const f = () => setVisore(null);
    addEventListener("popstate", f);
    return () => removeEventListener("popstate", f);
  }, []);
  useEffect(() => { document.body.classList.toggle("viewing", !!visore); }, [visore]);

  const home = () => { setQ(""); if (location.hash) location.hash = ""; else window.scrollTo({ top: 0, behavior: "smooth" }); };
  useEffect(() => {
    addEventListener("lab:home", home);
    return () => removeEventListener("lab:home", home);
  });
  const vaiAnno = (y) => { setQ(""); location.hash = "anno/" + y; };

  if (!D) return <div style={{ minHeight: "100vh" }} />;

  let pagina;
  const cerca = q.trim();
  const parti = hash.split("/");
  if (cerca.length > 1) pagina = <RicercaPage D={D} q={cerca} apri={apri} />;
  else if (parti[0] === "anno" && annoMeta(parti[1])) {
    if (parti[2] === "uda" && parti[3]) {
      pagina = parti[4] === "lezione" && parti[5]
        ? <LezionePage key={hash} D={D} n={parti[1]} uda={dec(parti[3])} lezione={dec(parti[5])} apri={apri} />
        : <UdaPage key={hash} D={D} n={parti[1]} uda={dec(parti[3])} apri={apri} />;
    } else pagina = <AnnoPage key={hash} D={D} n={parti[1]} apri={apri} />;
  } else if (hash === "strumenti" || hash === "video") pagina = <ListaPage key={hash} D={D} tipo={hash} apri={apri} />;
  else pagina = <HomePage D={D} onYear={vaiAnno} />;

  return (
    <>
      <CursorHalo />
      <div className="lab-app" style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
        <Header titolo={D.SITE.titolo} onHome={home} q={q} setQ={setQ} />
        <main>{pagina}</main>
        <Footer autore={D.SITE.autore || ""} />
      </div>
      <ThemeToggle />
      <AmdgEgg />
      {visore && <Visore href={visore.href} titolo={visore.titolo} onChiudi={chiudi} />}
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
