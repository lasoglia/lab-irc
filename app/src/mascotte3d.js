/* =====================================================================
   Figure in 3D (three.js). Questo file si carica SOLO quando una pagina
   mostra un modello 3D e il dispositivo lo regge.

   montaModello3D → le mascotte degli anni (Semino, Ichthy, Navicella,
   Bussolina, Terra). Le animazioni si agganciano ai NOMI dei pezzi del
   modello, così un modello nuovo con gli stessi nomi si anima da solo:
   - "asse"            gira piano (il mappamondo di Terra)
   - "foglia", "foglia_sx/dx"  ondeggiano (Terra, Semino)
   - "braccio_sx/dx"   salutano quando la tocchi (Semino)
   - "coda", "bolla_N" la coda sbatte, le bolle salgono (Ichthy)
   - "barca"           dondola sulle onde (Navicella)
   - "ago"             punta verso il cursore, con un po' di molla (Bussolina)
   - "occhio_…_pupilla"  seguono il cursore; gli occhi sbattono ogni tanto
   Tutta la figura si volta un poco verso il cursore, si può ruotare
   trascinando (anche col dito) e un tocco la fa saltellare.

   montaRosone3D → il rosone della home: le vetrate si accendono dove passa
   il cursore, si inclina verso di lui; clic su una vetrata = apri l'anno,
   clic sulla croce = A·M·D·G.

   Con "riduci movimento" niente animazioni. Fuori schermo non consuma nulla.
   ===================================================================== */
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

const lerp = (a, b, t) => a + (b - a) * t;
/* differenza fra due angoli (radianti), sempre la via più corta */
const diffAng = (a, b) => Math.atan2(Math.sin(a - b), Math.cos(a - b));

/* ---------- parti comuni: scena, luci, caricamento, ciclo di disegno ---------- */
async function preparaScena(contenitore, url, disegna) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  const tela = renderer.domElement;
  tela.style.cssText = "width:100%;height:100%;display:block;touch-action:pan-y;cursor:grab";
  tela.setAttribute("aria-hidden", "true");
  contenitore.appendChild(tela);

  const scena = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(28, 1, 0.01, 20);
  scena.add(new THREE.HemisphereLight(0xfff4e6, 0x2a2440, 1.35));
  const luce = new THREE.DirectionalLight(0xffffff, 2.3);
  luce.position.set(1.3, 1.8, 2.2);
  const controluce = new THREE.DirectionalLight(0xe3c27a, 1.7); /* l'oro del design */
  controluce.position.set(-1.6, 0.9, -1.4);
  scena.add(luce, controluce);

  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);
  let gltf;
  try {
    gltf = await loader.loadAsync(url);
  } catch (e) {
    renderer.dispose();
    tela.remove();
    throw e;
  }
  const modello = gltf.scene;
  const perno = new THREE.Group();
  perno.add(modello);
  scena.add(perno);

  let visibile = true, raf = 0, ultimo = performance.now(), fermo = false;
  const ciclo = (ora) => {
    raf = 0;
    if (!visibile || document.hidden) return;
    const dt = Math.min(0.05, (ora - ultimo) / 1000);
    ultimo = ora;
    disegna(ora, dt);
    renderer.render(scena, camera);
    if (!fermo) raf = requestAnimationFrame(ciclo);
  };
  /* avvia(): anima di continuo. Con fermo=true (riduci movimento) disegna una volta sola. */
  const avvia = () => { if (!raf && visibile && !document.hidden) { ultimo = performance.now(); raf = requestAnimationFrame(ciclo); } };
  const dimensiona = () => {
    const w = contenitore.clientWidth || 1, h = contenitore.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    if (api.suDimensione) api.suDimensione();
    avvia();
  };
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver(([v]) => { visibile = v.isIntersecting; if (visibile) avvia(); })
    : null;
  if (io) io.observe(contenitore);
  const suVisibilita = () => { if (!document.hidden) avvia(); };
  document.addEventListener("visibilitychange", suVisibilita);
  const ro = "ResizeObserver" in window ? new ResizeObserver(dimensiona) : null;
  if (ro) ro.observe(contenitore);

  const pulizie = [];
  const api = {
    renderer, tela, scena, camera, modello, perno, avvia, dimensiona,
    set fermo(v) { fermo = v; },
    alDistruggi: (f) => pulizie.push(f),
    distruggi() {
      cancelAnimationFrame(raf);
      pulizie.forEach((f) => f());
      document.removeEventListener("visibilitychange", suVisibilita);
      if (io) io.disconnect();
      if (ro) ro.disconnect();
      scena.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) [].concat(o.material).forEach((m) => m.dispose());
      });
      renderer.dispose();
      tela.remove();
    },
  };
  return api;
}

/* ======================= mascotte degli anni ======================= */
export async function montaModello3D(contenitore, url, { ridotto = false, onClic } = {}) {
  let aggiorna = () => {};
  const S = await preparaScena(contenitore, url, (ora, dt) => aggiorna(ora, dt));
  const { modello, perno, camera, tela } = S;
  S.fermo = ridotto;

  /* centratura e inquadratura */
  const box = new THREE.Box3().setFromObject(modello);
  const centro = box.getCenter(new THREE.Vector3());
  const dim = box.getSize(new THREE.Vector3());
  modello.position.sub(centro);
  const raggio = dim.length() / 2;
  const distanza = (raggio / Math.sin(THREE.MathUtils.degToRad(camera.fov / 2))) * 0.92;
  camera.position.set(0, raggio * 0.12, distanza);
  camera.lookAt(0, 0, 0);

  /* pezzi animati (se ci sono) */
  const pezzo = (n) => modello.getObjectByName(n);
  const tutti = (re) => { const l = []; modello.traverse((o) => { if (re.test(o.name)) l.push(o); }); return l; };
  const asse = pezzo("asse");
  const foglie = tutti(/^foglia(_sx|_dx)?$/).map((o, i) => ({ o, z: o.rotation.z, segno: /_dx$/.test(o.name) ? -1 : 1, fase: i * 0.8 }));
  const braccia = tutti(/^braccio_(sx|dx)$/).map((o) => ({ o, z: o.rotation.z, segno: /_dx$/.test(o.name) ? 1 : -1 }));
  const coda = pezzo("coda"), codaY = coda ? coda.rotation.y : 0;
  const bolle = tutti(/^bolla_\d+$/).map((o, i) => ({
    parti: [o, pezzo(o.name + "_luce")].filter(Boolean).map((p) => ({ p, y: p.position.y, s: p.scale.x })), fase: i / 3,
  }));
  const barca = pezzo("barca"), barcaY = barca ? barca.position.y : 0;
  const ago = pezzo("ago");
  let agoAng = ago ? ago.rotation.z : 0, agoVel = 0;
  const pupille = tutti(/^occhio_.*pupilla$/).map((o) => ({ o, x: o.position.x, y: o.position.y }));
  const palpebre = tutti(/^occhio_.*_(bianco|pupilla|luce)$/).map((o) => ({ o, sy: o.scale.y }));
  const passoPupilla = raggio * 0.018;

  /* posa di partenza: chi è di profilo si gira un poco verso di noi */
  const yawBase = coda ? 0.32 : barca ? -0.3 : 0;
  perno.rotation.y = yawBase;

  /* stato */
  let mx = 0, my = 0, mouseVisto = false;  /* cursore, -1…1 rispetto alla figura */
  let yaw = yawBase, pitch = 0, trascinaYaw = 0;
  let trascina = null;
  let salto = 0;                   /* 0…1 durante il saltello */
  let prossimoBattito = performance.now() + 1800;
  let battito = 0;
  const t0 = performance.now();

  aggiorna = (ora, dt) => {
    if (ridotto) return;
    const t = (ora - t0) / 1000;
    if (asse) asse.rotation.y += dt * 0.42;
    foglie.forEach((f) => { f.o.rotation.z = f.z + Math.sin(t * 1.618 + f.fase) * 0.09 * f.segno; });
    if (coda) coda.rotation.y = codaY + Math.sin(t * 5.2) * 0.22;
    bolle.forEach((b) => {
      const k = (t * 0.21 + b.fase) % 1;               /* 0 → 1: dalla bocca in su */
      const s = Math.min(1, Math.sin(k * Math.PI) * 1.6);
      b.parti.forEach((q) => { q.p.position.y = q.y + (k - 0.35) * raggio * 0.32; q.p.scale.setScalar(q.s * Math.max(0.001, s)); });
    });
    if (barca) {
      barca.rotation.x = Math.sin(t * 1.1) * 0.07;
      barca.rotation.z = Math.sin(t * 0.83 + 1) * 0.045;
      barca.position.y = barcaY + Math.sin(t * 1.6) * raggio * 0.012;
    }
    if (ago) {
      /* con il mouse punta il cursore; senza, cerca il nord oscillando */
      const meta = mouseVisto && (mx || my) ? Math.atan2(-mx, -my) : Math.sin(t * 0.7) * 0.5 + Math.sin(t * 1.9) * 0.12;
      agoVel += diffAng(meta, agoAng) * dt * 38;
      agoVel *= Math.pow(0.12, dt);                     /* smorzamento: arriva con un piccolo rimbalzo */
      agoAng += agoVel * dt;
      ago.rotation.z = agoAng;
    }
    yaw = lerp(yaw, yawBase + mx * 0.5 + trascinaYaw, 0.0618);
    pitch = lerp(pitch, -my * 0.16, 0.0618);
    if (!trascina) trascinaYaw = lerp(trascinaYaw, 0, 0.03);
    perno.rotation.set(pitch, yaw, 0);
    perno.position.y = Math.sin(t * 1.2) * raggio * 0.018;

    /* saltello al tocco (e le braccia salutano) */
    if (salto > 0) {
      salto = Math.max(0, salto - dt * 1.9);
      const s = Math.sin((1 - salto) * Math.PI);
      perno.position.y += s * raggio * 0.12;
      perno.scale.set(1 + s * 0.04, 1 - s * 0.03, 1 + s * 0.04);
      braccia.forEach((b) => { b.o.rotation.z = b.z + b.segno * s * 0.9 * (0.6 + 0.4 * Math.sin(t * 18)); });
    } else {
      perno.scale.set(1, 1, 1);
      braccia.forEach((b) => { b.o.rotation.z = b.z + b.segno * Math.sin(t * 1.3) * 0.06; });
    }

    /* pupille verso il cursore */
    pupille.forEach((p) => {
      p.o.position.x = lerp(p.o.position.x, p.x + mx * passoPupilla, 0.15);
      p.o.position.y = lerp(p.o.position.y, p.y - my * passoPupilla, 0.15);
    });

    /* battito di ciglia */
    if (ora > prossimoBattito) { battito = 1; prossimoBattito = ora + 2584 + Math.random() * 2584; }
    if (battito > 0) {
      battito = Math.max(0, battito - dt * 7);
      const k = 1 - Math.sin(battito * Math.PI) * 0.88;
      palpebre.forEach((e) => { e.o.scale.y = e.sy * k; });
    }
  };

  /* il cursore, ovunque sulla pagina */
  const suMouse = (e) => {
    if (e.pointerType && e.pointerType !== "mouse") return;
    const r = contenitore.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    mx = Math.max(-1, Math.min(1, (e.clientX - cx) / (innerWidth * 0.4)));
    my = Math.max(-1, Math.min(1, (e.clientY - cy) / (innerHeight * 0.4)));
    mouseVisto = true;
  };
  window.addEventListener("pointermove", suMouse, { passive: true });
  S.alDistruggi(() => window.removeEventListener("pointermove", suMouse));

  /* trascinare per ruotare; toccare per farla saltellare e parlare */
  const giu = (e) => { trascina = { x: e.clientX, y0: trascinaYaw, mosso: false }; tela.style.cursor = "grabbing"; try { tela.setPointerCapture(e.pointerId); } catch (x) {} };
  const muovi = (e) => {
    if (!trascina) return;
    const dx = e.clientX - trascina.x;
    if (Math.abs(dx) > 4) trascina.mosso = true;
    trascinaYaw = trascina.y0 + dx * 0.012;
    if (ridotto) { perno.rotation.y = yawBase + trascinaYaw; S.avvia(); }
  };
  const su = () => {
    if (!trascina) return;
    const clic = !trascina.mosso;
    trascina = null;
    tela.style.cursor = "grab";
    if (clic) { salto = 1; S.avvia(); if (onClic) onClic(); }
  };
  tela.addEventListener("pointerdown", giu);
  tela.addEventListener("pointermove", muovi);
  tela.addEventListener("pointerup", su);
  tela.addEventListener("pointercancel", su);

  S.dimensiona();
  return { distruggi: () => S.distruggi() };
}

/* ======================= rosone della home ======================= */
export async function montaRosone3D(contenitore, url, { ridotto = false, onAnno, onSopra, onCroce } = {}) {
  let aggiorna = () => {};
  const S = await preparaScena(contenitore, url, (ora, dt) => aggiorna(ora, dt));
  const { modello, perno, camera, tela, scena } = S;
  S.fermo = ridotto;
  tela.style.cursor = "default";

  /* nella home il rosone "galleggia" come il disegno: via il piedistallo */
  ["basamento", "basamento_alto", "filo_oro", "sostegno"].forEach((n) => { const o = modello.getObjectByName(n); if (o) o.visible = false; });

  /* inquadra il disco (la cornice), non il piedistallo */
  const cornice = modello.getObjectByName("cornice") || modello;
  const box = new THREE.Box3().setFromObject(cornice);
  const centro = box.getCenter(new THREE.Vector3());
  const r = Math.max(box.max.x - box.min.x, box.max.y - box.min.y) / 2;
  modello.position.sub(centro);
  const tan = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
  const inquadra = () => { camera.position.set(0, 0, r / (0.9 * tan * Math.min(1, camera.aspect))); camera.lookAt(0, 0, 0); };
  S.suDimensione = inquadra;
  scena.children.filter((o) => o.isDirectionalLight)[0].intensity = 1.9;
  modello.updateMatrixWorld(true);

  /* vetrate: ogni pezzo con il suo materiale (per accenderlo da solo),
     il suo angolo sul disco e l'anno a cui porta */
  const annoDi = {};      /* "petalo_3" → 3 (anno) */
  const vetri = [];
  const p = new THREE.Vector3();
  modello.traverse((o) => {
    if (!o.isMesh) return;
    const m = o.material;
    const anno = m && /vetro_(anno|chiaro)_(\d)/.exec(m.name);
    const petalo = /^petalo_(\d+)/.exec(o.name);
    if (petalo && /^petalo_\d+$/.test(o.name) && anno) annoDi["petalo_" + petalo[1]] = +anno[2];
    if (!anno) return;
    o.material = m.clone();
    o.getWorldPosition(p);
    vetri.push({ m: o.material, base: o.material.emissiveIntensity, ang: Math.atan2(p.y, p.x), anno: +anno[2], petalo: !!petalo });
  });
  const croce = modello.getObjectByName("croce");
  const croceS = croce ? croce.scale.clone() : null;   /* i modelli compressi hanno scale proprie */

  /* a quale anno (o alla croce) appartiene un pezzo colpito */
  const bersaglio = (o) => {
    for (; o && o !== modello; o = o.parent) {
      const k = /^petalo_(\d+)/.exec(o.name);
      if (k) return annoDi["petalo_" + k[1]] || null;
      if (/^(croce|medaglione)/.test(o.name)) return "croce";
    }
    return null;
  };
  const ray = new THREE.Raycaster(), punto = new THREE.Vector2();
  const colpito = (e) => {
    const b = tela.getBoundingClientRect();
    punto.set(((e.clientX - b.left) / b.width) * 2 - 1, -((e.clientY - b.top) / b.height) * 2 + 1);
    ray.setFromCamera(punto, camera);
    const h = ray.intersectObject(modello, true).find((x) => x.object.visible);
    return h ? bersaglio(h.object) : null;
  };

  /* stato: angolo e vicinanza del cursore, inclinazione, vetrata indicata */
  let a = Math.PI / 2, vic = 0.35, tx = 0, ty = 0, sopra = null, croceK = 1, visto = false;
  const t0 = performance.now();

  aggiorna = (ora) => {
    const t = (ora - t0) / 1000;
    /* senza mouse (telefono) la luce gira piano da sola */
    const aa = visto || ridotto ? a : Math.PI / 2 - t * 0.5;
    const pp = visto || ridotto ? vic : 0.6;
    vetri.forEach((v) => {
      const d = Math.abs(diffAng(aa, v.ang));
      const l = Math.pow((Math.cos(d) + 1) / 2, 3) * pp;
      const acceso = sopra !== null && sopra === v.anno && v.petalo;
      const meta = v.base * (acceso ? 5 : 0.55 + 3.4 * l);
      v.m.emissiveIntensity = ridotto ? meta : lerp(v.m.emissiveIntensity, meta, 0.12);
    });
    if (!ridotto) {
      perno.rotation.x = lerp(perno.rotation.x, visto ? ty * 0.16 : Math.sin(t * 0.6) * 0.05, 0.06);
      perno.rotation.y = lerp(perno.rotation.y, visto ? tx * 0.16 : Math.sin(t * 0.43) * 0.09, 0.06);
      croceK = lerp(croceK, sopra === "croce" ? 1.13 : 1, 0.1);
      if (croce) croce.scale.copy(croceS).multiplyScalar(croceK);
    }
  };

  const suMouse = (e) => {
    if (e.pointerType && e.pointerType !== "mouse") return;
    const b = contenitore.getBoundingClientRect();
    const x = e.clientX - (b.left + b.width / 2), y = e.clientY - (b.top + b.height / 2);
    a = Math.atan2(-y, x);
    vic = Math.max(0.3, 1 - Math.hypot(x, y) / (b.width * 1.618));
    tx = Math.max(-1, Math.min(1, x / b.width));
    ty = Math.max(-1, Math.min(1, y / b.height));
    visto = true;
    if (ridotto) S.avvia();
  };
  window.addEventListener("pointermove", suMouse, { passive: true });
  S.alDistruggi(() => window.removeEventListener("pointermove", suMouse));

  /* passaggio sopra (solo mouse) → didascalia; clic/tocco → apri l'anno */
  const sulTela = (e) => {
    if (e.pointerType && e.pointerType !== "mouse") return;
    const h = colpito(e);
    tela.style.cursor = h ? "pointer" : "default";
    if (h !== sopra) { sopra = h; if (onSopra) onSopra(typeof h === "number" ? h : null); if (ridotto) S.avvia(); }
  };
  const fuori = () => { if (sopra !== null) { sopra = null; tela.style.cursor = "default"; if (onSopra) onSopra(null); if (ridotto) S.avvia(); } };
  let giu = null;
  const premi = (e) => { giu = { x: e.clientX, y: e.clientY }; };
  const rilascia = (e) => {
    if (!giu || Math.hypot(e.clientX - giu.x, e.clientY - giu.y) > 8) { giu = null; return; }
    giu = null;
    const h = colpito(e);
    if (h === "croce") { if (onCroce) onCroce(); }
    else if (h && onAnno) onAnno(h);
  };
  tela.addEventListener("pointermove", sulTela);
  tela.addEventListener("pointerleave", fuori);
  tela.addEventListener("pointerdown", premi);
  tela.addEventListener("pointerup", rilascia);

  S.dimensiona();
  return { distruggi: () => S.distruggi() };
}

