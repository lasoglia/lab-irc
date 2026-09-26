/* =====================================================================
   lab-amdg.js — A·M·D·G  (Ad maiorem Dei gloria)
   ---------------------------------------------------------------------
   Easter egg nascosto, mai pubblicizzato. Da includere a fine <body>:

       <script src="assets/lab-amdg.js"></script>

   Mostra a tutto schermo un "A · M · D · G" dorato quando:
   1. si scrive la parola  amdg  in un punto qualsiasi (non nei campi);
   2. si clicca 7 volte di fila sul logo  → elemento con [data-amdg-trigger];
   3. si clicca la stella ✦ nell'occhio della spirale aurea
      → qualsiasi elemento con [data-amdg-open];
   4. si clicca il marchio quasi invisibile del footer (.lab-amdg);
   5. (passivo) si seleziona il testo dell'hero: dentro c'è un
      "A·M·D·G" trasparente (.lab-amdg-sel) che appare nella selezione;
   6. (per sviluppatori) si apre la console.

   Si chiude con un clic, con Esc o da solo dopo 6,18 secondi.
   Da codice: window.dispatchEvent(new Event("lab:amdg"))  o  LabAmdg.mostra()
   ===================================================================== */
(function(){
  "use strict";
  if(window.LabAmdg) return;

  var PAROLA = "amdg", CLIC = 7, DURATA = 6180;
  var LETTERE = ["A", "M", "D", "G"];
  var EASE = "cubic-bezier(.16,1,.3,1)";

  function stile(){
    if(document.getElementById("lab-amdg-stile")) return;
    var css = ""
      + ".lab-amdg-velo{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;cursor:pointer;"
      +   "background:radial-gradient(circle at 50% 45%,rgba(227,194,122,.18),rgba(10,9,16,.95) 61.8%);"
      +   "-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);"
      +   "opacity:1;transition:opacity 610ms ease;animation:labAmdgFade 610ms ease-out both;outline:none}"
      + ".lab-amdg-velo.via{opacity:0}"
      + ".lab-amdg-dentro{text-align:center;padding:34px}"
      + ".lab-amdg-stella{color:#E3C27A;font-size:34px;margin-bottom:21px;animation:labAmdgRespiro 2.6s ease-in-out infinite}"
      + ".lab-amdg-lettere{display:flex;justify-content:center;align-items:baseline;gap:.2em;"
      +   "font-family:var(--lab-font-inscription,'Cinzel','Trajan Pro',Georgia,serif);font-weight:600;"
      +   "font-size:clamp(55px,11vw,144px);line-height:1;color:#F3E7C6;text-shadow:0 0 34px rgba(227,194,122,.45)}"
      + ".lab-amdg-lettere .l{display:inline-block;animation:labAmdgSale 987ms "+EASE+" both}"
      + ".lab-amdg-lettere .p{color:#E3C27A;font-size:.382em;animation:labAmdgFade 987ms ease both}"
      + ".lab-amdg-filo{height:1px;width:min(377px,61.8vw);margin:34px auto 21px;"
      +   "background:linear-gradient(90deg,transparent,#E3C27A,transparent);transform-origin:center;"
      +   "animation:labAmdgFilo 987ms "+EASE+" 987ms both}"
      + ".lab-amdg-motto{font-family:var(--lab-font-display,'Cormorant Garamond',Georgia,serif);font-style:italic;font-weight:500;"
      +   "font-size:clamp(20px,2.6vw,26px);color:rgba(243,231,198,.9);animation:labAmdgSale 987ms "+EASE+" 1220ms both}"
      + ".lab-amdg-trad{font-family:var(--lab-font-body,system-ui,sans-serif);font-size:12.5px;font-weight:800;letter-spacing:.2em;"
      +   "text-transform:uppercase;color:rgba(227,194,122,.7);margin-top:13px;animation:labAmdgFade 987ms ease 1600ms both}"
      /* marchio del footer: quasi invisibile, si accende d'oro al passaggio */
      + ".lab-amdg{font-family:var(--lab-font-inscription,'Cinzel',Georgia,serif);font-weight:600;font-size:11px;"
      +   "letter-spacing:.3em;color:var(--lab-muted,#8E89A6);opacity:.13;cursor:default;user-select:none;-webkit-user-select:none;"
      +   "white-space:nowrap;transition:all 610ms "+EASE+"}"
      + ".lab-amdg:hover{opacity:1;letter-spacing:.5em;color:var(--lab-oro,#E3C27A);text-shadow:0 0 13px rgba(227,194,122,.6)}"
      /* testo nascosto che appare solo selezionando */
      + ".lab-amdg-sel{color:transparent;-webkit-text-fill-color:transparent}"
      + ".lab-amdg-sel::selection{color:var(--lab-oro,#E3C27A);-webkit-text-fill-color:var(--lab-oro,#E3C27A);background:rgba(227,194,122,.28)}"
      + "@keyframes labAmdgFade{from{opacity:0}to{opacity:1}}"
      + "@keyframes labAmdgSale{from{opacity:0;transform:translateY(34px);filter:blur(8px)}to{opacity:1;transform:none;filter:none}}"
      + "@keyframes labAmdgFilo{from{transform:scaleX(0)}to{transform:scaleX(1)}}"
      + "@keyframes labAmdgRespiro{0%,100%{opacity:.55;transform:scale(1)}50%{opacity:1;transform:scale(1.13)}}"
      + "@media (prefers-reduced-motion: reduce){.lab-amdg-velo,.lab-amdg-velo *{animation:none!important;transition:none!important}}";
    var el = document.createElement("style");
    el.id = "lab-amdg-stile";
    el.textContent = css;
    document.head.appendChild(el);
  }

  var velo = null, timerChiudi = 0, timerRimuovi = 0, focusPrima = null;

  function mostra(){
    stile();
    if(velo && !velo.classList.contains("via")) return;
    if(velo){ velo.remove(); velo = null; }
    clearTimeout(timerRimuovi);

    velo = document.createElement("div");
    velo.className = "lab-amdg-velo";
    velo.setAttribute("role", "dialog");
    velo.setAttribute("aria-modal", "true");
    velo.setAttribute("aria-label", "Ad maiorem Dei gloria");
    velo.tabIndex = -1;

    var lettere = "";
    LETTERE.forEach(function(l, i){
      if(i > 0) lettere += '<span class="p" style="animation-delay:' + (233 + i * 89) + 'ms">·</span>';
      lettere += '<span class="l" style="animation-delay:' + (233 + i * 144) + 'ms">' + l + '</span>';
    });
    velo.innerHTML = '<div class="lab-amdg-dentro">'
      + '<div class="lab-amdg-stella" aria-hidden="true">✦</div>'
      + '<div class="lab-amdg-lettere" aria-hidden="true">' + lettere + '</div>'
      + '<div class="lab-amdg-filo" aria-hidden="true"></div>'
      + '<div class="lab-amdg-motto">Ad maiorem Dei gloria</div>'
      + '<div class="lab-amdg-trad">Per la maggior gloria di Dio</div>'
      + '</div>';
    velo.addEventListener("click", chiudi);
    document.body.appendChild(velo);
    focusPrima = document.activeElement;
    try{ velo.focus({ preventScroll:true }); }catch(e){}
    clearTimeout(timerChiudi);
    timerChiudi = setTimeout(chiudi, DURATA);
  }

  function chiudi(){
    if(!velo || velo.classList.contains("via")) return;
    clearTimeout(timerChiudi);
    velo.classList.add("via");
    var v = velo;
    timerRimuovi = setTimeout(function(){ v.remove(); if(velo === v) velo = null; }, 610);
    if(focusPrima && focusPrima.focus){ try{ focusPrima.focus({ preventScroll:true }); }catch(e){} }
  }

  /* 1. la parola "amdg" (e Esc per chiudere) */
  var buffer = "";
  function suTasto(e){
    if(e.key === "Escape"){ chiudi(); return; }
    var t = e.target || {};
    var tag = (t.tagName || "").toLowerCase();
    if(tag === "input" || tag === "textarea" || tag === "select" || t.isContentEditable) return;
    if(e.ctrlKey || e.metaKey || e.altKey || !e.key || e.key.length !== 1) return;
    buffer = (buffer + e.key.toLowerCase()).slice(-PAROLA.length);
    if(buffer === PAROLA){ buffer = ""; mostra(); }
  }

  /* 2. sette clic sul logo · 3. stella della spirale · 4. marchio del footer */
  var conta = 0, timerConta = 0;
  function suClic(e){
    var t = e.target && e.target.closest ? e.target : null;
    if(!t) return;
    if(t.closest("[data-amdg-open], .lab-amdg")){ mostra(); return; }
    if(t.closest("[data-amdg-trigger]")){
      conta += 1;
      clearTimeout(timerConta);
      timerConta = setTimeout(function(){ conta = 0; }, 1618);
      if(conta >= CLIC){ conta = 0; mostra(); }
    }
  }

  /* 6. un saluto a chi apre la console */
  function console_(){
    if(window.__labAmdgLogged || !window.console) return;
    window.__labAmdgLogged = true;
    try{
      console.log("%cA · M · D · G", "font:600 21px Cinzel, Georgia, serif; color:#E3C27A; letter-spacing:.3em");
      console.log("%cAd maiorem Dei gloria — prova a scrivere \"amdg\".", "font:italic 13px Georgia, serif; color:#8E89A6");
    }catch(e){}
  }

  function avvio(){
    stile();
    window.addEventListener("keydown", suTasto);
    document.addEventListener("click", suClic);
    window.addEventListener("lab:amdg", mostra);
    console_();
  }

  window.LabAmdg = { mostra: mostra, chiudi: chiudi };

  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", avvio);
  else avvio();
})();
