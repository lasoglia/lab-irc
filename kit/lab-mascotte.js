/* Lab IRC — Mascotte 2D. Web component senza dipendenze.
   Uso: <script src="lab-mascotte.js"></script>  <lab-mascotte anno="1" size="89"></lab-mascotte>
   Attributi: anno 1–5 · size px (default 89) · aureola="false" · parla="false" · statica (niente occhi che seguono)
   Al 7° clic emette window 'lab:amdg'. */
(() => {
  const C = { 1: '#FF7A59', 2: '#4FB0FF', 3: '#A78BFA', 4: '#FB7BB5', 5: '#FBBF24' };
  const O = '#E3C27A', K = '#14131F', G = '#34D399';
  const eyes = pts => `<g data-occhi>${pts.map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="3.4" ry="5.5" fill="${K}"/><circle data-luce cx="${x - 1}" cy="${y - 2}" r="1.3" fill="#fff"/>`).join('')}</g>`;
  const smile = d => `<path d="${d}" fill="none" stroke="${K}" stroke-width="2.5" stroke-linecap="round"/>`;
  const leaf = (rot, c) => `<g transform="translate(72 36) rotate(${rot})"><path d="M0 0 Q17 -13 34 0 Q17 13 0 0Z" fill="${c}"/><path d="M5 0 H26" stroke="${O}" stroke-width="1" stroke-linecap="round"/></g>`;
  const HALO = `<circle cx="72" cy="72" r="68" fill="none" stroke="${O}" stroke-width=".8" stroke-opacity=".5"/>`;

  const BODY = {
    1: () => `<path d="M72 57 V36" stroke="${C[1]}" stroke-width="5" stroke-linecap="round"/>${leaf(-34, C[1])}${leaf(-146, C[1])}
      <circle cx="72" cy="89" r="34" fill="${C[1]}"/>${eyes([[61.5, 85], [82.5, 85]])}${smile('M66 99 Q72 104 78 99')}`,
    2: () => `<path d="M94 89 L123 68 Q115 89 123 110 Z" fill="${C[2]}" stroke-linejoin="round"/>
      <path d="M21 89 A47 47 0 0 1 102 89 A47 47 0 0 1 21 89 Z" fill="${C[2]}"/>
      <path d="M68 71 Q76 89 68 107" fill="none" stroke="${O}" stroke-width="1" stroke-linecap="round"/>${eyes([[42, 84]])}${smile('M29 95 Q33 98 37 95')}`,
    3: () => `<path d="M72 89 V21" stroke="${C[3]}" stroke-width="4" stroke-linecap="round"/>
      <path d="M72 5 V18 M66 10 H78" stroke="${O}" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M78 26 L112 81 H78 Z" fill="${C[3]}" fill-opacity=".618" stroke-linejoin="round"/>
      <path d="M66 47 L45 81 H66 Z" fill="${C[3]}" fill-opacity=".382"/>
      <path d="M18 89 H126 Q120 112 102 120 H42 Q24 112 18 89 Z" fill="${C[3]}"/>
      <path d="M21 89 H123" stroke="${O}" stroke-width="1.2" stroke-linecap="round"/>${eyes([[61.5, 101], [82.5, 101]])}${smile('M67 110 Q72 114 77 110')}`,
    4: () => `<circle cx="72" cy="30" r="5" fill="none" stroke="${O}" stroke-width="2"/><rect x="67" y="35" width="10" height="7" rx="2" fill="${O}"/>
      <circle cx="72" cy="89" r="47" fill="${C[4]}" stroke="${O}" stroke-width="1.2"/>
      <circle cx="72" cy="89" r="29" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="1.5"/>
      <path d="M72 55 V61 M72 117 V123 M38 89 H44 M100 89 H106" stroke="#fff" stroke-opacity=".7" stroke-width="2" stroke-linecap="round"/>
      <g data-ago><path d="M72 63 L77 89 L67 89 Z" fill="#fff"/><path d="M72 115 L77 89 L67 89 Z" fill="${K}" fill-opacity=".55"/></g>
      <circle cx="72" cy="89" r="3.4" fill="${O}"/>`,
    5: uid => `<defs><clipPath id="${uid}"><circle cx="72" cy="89" r="42"/></clipPath></defs>
      <g transform="rotate(23.4 72 89)"><path d="M72 39 A50 50 0 0 1 72 139" fill="none" stroke="${O}" stroke-width="1.6" stroke-linecap="round"/>
      <circle cx="72" cy="39" r="3" fill="${O}"/><circle cx="72" cy="139" r="3" fill="${O}"/></g>
      <circle cx="72" cy="89" r="42" fill="${C[5]}"/>
      <g clip-path="url(#${uid})" fill="${G}">
        <path d="M26 64 C38 58 50 64 48 75 C46 84 38 86 41 96 C44 105 37 112 28 108 Z"/>
        <path d="M76 49 C90 45 106 52 114 64 C106 70 97 65 93 72 C86 71 79 63 76 56 Z"/>
        <path d="M96 106 C104 101 114 106 112 115 C105 122 95 117 96 106 Z"/>
        <path d="M48 124 C60 117 78 119 88 128 C78 136 58 136 48 124 Z"/></g>
      <circle cx="72" cy="89" r="42" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="1.2"/>
      ${eyes([[61.5, 87], [82.5, 87]])}${smile('M66 100 Q72 105 78 100')}`,
  };

  const INFO = {
    1: { nome: 'Semino', frasi: ['Ogni grande albero è stato un seme.', 'Da dove vengo? Bella domanda!', 'In principio… c’era una domanda.'] },
    2: { nome: 'Ichthy', frasi: ['ΙΧΘΥΣ: Gesù Cristo, Figlio di Dio, Salvatore.', 'I primi cristiani mi disegnavano in segreto.', 'Venite dietro a me! (Mc 1,17)'] },
    3: { nome: 'Navicella', frasi: ['Duc in altum! Prendi il largo. (Lc 5,4)', 'Duemila anni di mare… e ancora a galla.', 'Tempesta? Non temete!'] },
    4: { nome: 'Bussolina', frasi: ['La coscienza è la mia bussola.', 'E la tua, dove punta?', 'Libertà non è andare ovunque: è sapere dove.'] },
    5: { nome: 'Terra', frasi: ['Laudato si’! Custodisci la casa comune.', 'Tutto è connesso.', 'Il futuro comincia adesso.'] },
  };

  let uidN = 0;
  function svg(n, { aureola = true, uid = 'lab-terra-' + (++uidN) } = {}) {
    n = C[n] ? +n : 1;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 144" role="img" aria-label="${INFO[n].nome}" style="overflow:visible">${aureola ? HALO : ''}${BODY[n](uid)}</svg>`;
  }
  window.LabMascotte = { svg, INFO, COLORI: C };

  if (typeof customElements === 'undefined' || customElements.get('lab-mascotte')) return;
  const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

  class El extends HTMLElement {
    static get observedAttributes() { return ['anno', 'size', 'aureola']; }
    connectedCallback() {
      if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
      this.render();
      this.clicks = 0;
      this.onMove = e => this.look(e);
      if (!this.hasAttribute('statica')) { addEventListener('mousemove', this.onMove); this.blinkLoop(); }
    }
    disconnectedCallback() { removeEventListener('mousemove', this.onMove); clearTimeout(this.bt); clearTimeout(this.bt2); clearTimeout(this.mt); }
    attributeChangedCallback() { if (this.shadowRoot) this.render(); }
    render() {
      const n = +this.getAttribute('anno') || 1, s = +this.getAttribute('size') || 89;
      this.n = C[n] ? n : 1;
      this.shadowRoot.innerHTML = `<style>
        :host{display:inline-block;position:relative;width:${s}px;height:${s}px;line-height:0;cursor:pointer;vertical-align:middle}
        .m{display:block;width:100%;height:100%;transition:transform 610ms cubic-bezier(.16,1,.3,1)}
        :host(:hover) .m{transform:translateY(-5px) rotate(-5deg);transition-duration:233ms}
        :host(:active) .m{transform:scale(.94)}
        svg{width:100%;height:100%}
        [data-occhi]{transition:transform 144ms linear}
        .b{position:absolute;left:50%;bottom:calc(100% + 8px);transform:translateX(-50%);width:max-content;max-width:189px;z-index:20;pointer-events:none;
          background:var(--lab-surface,#1E1C2E);color:var(--lab-ink,#ECEAF5);border:1px solid var(--lab-oro,#E3C27A);border-radius:13px;padding:8px 13px;
          font:500 13px/1.4 var(--lab-font-body,'Figtree',system-ui,sans-serif);text-align:left;box-shadow:0 8px 21px rgba(0,0,0,.3);animation:r 377ms cubic-bezier(.16,1,.3,1) both}
        @keyframes r{from{opacity:0;transform:translate(-50%,8px)}}
        @media (prefers-reduced-motion:reduce){.m,.b,[data-occhi]{transition:none;animation:none}}
      </style><span class="m">${svg(this.n, { aureola: this.getAttribute('aureola') !== 'false' })}</span>`;
      this.shadowRoot.querySelector('.m').onclick = e => this.click(e);
      this.occhi = [...this.shadowRoot.querySelectorAll('[data-occhi]')];
      this.ago = this.shadowRoot.querySelector('[data-ago]');
    }
    look(e) {
      if (this.raf) return;
      this.raf = requestAnimationFrame(() => {
        this.raf = null;
        const r = this.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2), y = e.clientY - (r.top + r.height * .6);
        const d = Math.hypot(x, y) || 1, k = Math.min(1, d / 144);
        this.occhi.forEach(g => g.setAttribute('transform', `translate(${(x / d * 1.6 * k).toFixed(2)} ${(y / d * 1.6 * k).toFixed(2)})`));
        if (this.ago) this.ago.setAttribute('transform', `rotate(${(Math.atan2(y, x) * 180 / Math.PI + 90).toFixed(1)} 72 89)`);
      });
    }
    blinkLoop() {
      if (reduce()) return;
      this.bt = setTimeout(() => {
        const set = (ry, v) => this.shadowRoot.querySelectorAll('[data-occhi] ellipse').forEach(el => el.setAttribute('ry', ry)) ||
          this.shadowRoot.querySelectorAll('[data-luce]').forEach(el => el.style.visibility = v);
        set(.8, 'hidden');
        this.bt2 = setTimeout(() => { set(5.5, 'visible'); this.blinkLoop(); }, 144);
      }, 2584 + Math.random() * 2584);
    }
    click(e) {
      e.preventDefault(); e.stopPropagation();
      this.clicks++;
      if (this.clicks >= 7) { this.clicks = 0; this.bubble(null); dispatchEvent(new Event('lab:amdg')); return; }
      if (this.getAttribute('parla') === 'false') return;
      const i = INFO[this.n];
      this.bubble(this.clicks === 1 ? `Ciao, sono ${i.nome}!` : i.frasi[(this.clicks - 2) % i.frasi.length]);
    }
    bubble(t) {
      this.shadowRoot.querySelector('.b')?.remove(); clearTimeout(this.mt);
      if (!t) return;
      const b = document.createElement('span'); b.className = 'b'; b.textContent = t;
      this.shadowRoot.appendChild(b);
      this.mt = setTimeout(() => b.remove(), 2618);
    }
  }
  customElements.define('lab-mascotte', El);
})();
