/* =====================================================================
   Mascotte in 3D (three.js). Questo file si carica SOLO quando una pagina
   mostra un modello 3D: la home resta leggera.

   Cosa fa, con il modello di Terra (e con i prossimi, se hanno gli stessi
   nomi dei pezzi):
   - il mappamondo ("asse": continenti, calotte, meridiano) gira piano
     sul suo asse, mentre la faccina resta davanti;
   - tutta la figura si volta un poco verso il cursore;
   - le pupille seguono il cursore, gli occhi sbattono ogni tanto;
   - la foglia ondeggia;
   - si può ruotare trascinando (anche col dito); un tocco la fa saltellare.
   Con "riduci movimento" resta ferma. Fuori schermo non consuma nulla.
   ===================================================================== */
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

const lerp = (a, b, t) => a + (b - a) * t;

export async function montaModello3D(contenitore, url, { ridotto = false, onClic } = {}) {
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
  const asse = pezzo("asse");
  const foglia = pezzo("foglia");
  const pupille = ["occhio_sx_pupilla", "occhio_dx_pupilla"].map(pezzo).filter(Boolean)
    .map((o) => ({ o, x: o.position.x, y: o.position.y }));
  const palpebre = ["occhio_sx_bianco", "occhio_sx_pupilla", "occhio_sx_luce", "occhio_dx_bianco", "occhio_dx_pupilla", "occhio_dx_luce"]
    .map(pezzo).filter(Boolean).map((o) => ({ o, sy: o.scale.y }));
  const passoPupilla = raggio * 0.018;

  /* stato */
  let mx = 0, my = 0;              /* cursore, -1…1 rispetto alla figura */
  let yaw = 0, pitch = 0, trascinaYaw = 0;
  let trascina = null;
  let salto = 0;                   /* 0…1 durante il saltello */
  let prossimoBattito = performance.now() + 1800;
  let battito = 0;
  let visibile = true, raf = 0, t0 = performance.now(), ultimo = t0;

  function dimensiona() {
    const w = contenitore.clientWidth || 1, h = contenitore.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    disegna(performance.now());
  }

  function disegna(ora) {
    const dt = Math.min(0.05, (ora - ultimo) / 1000);
    ultimo = ora;
    const t = (ora - t0) / 1000;

    if (!ridotto) {
      if (asse) asse.rotation.y += dt * 0.42;
      if (foglia) foglia.rotation.z = Math.sin(t * 1.618) * 0.09;
      yaw = lerp(yaw, mx * 0.5 + trascinaYaw, 0.0618);
      pitch = lerp(pitch, -my * 0.16, 0.0618);
      if (!trascina) trascinaYaw = lerp(trascinaYaw, 0, 0.03);
      perno.rotation.set(pitch, yaw, 0);
      perno.position.y = Math.sin(t * 1.2) * raggio * 0.018;

      /* saltello al tocco */
      if (salto > 0) {
        salto = Math.max(0, salto - dt * 1.9);
        const s = Math.sin((1 - salto) * Math.PI);
        perno.position.y += s * raggio * 0.12;
        perno.scale.set(1 + s * 0.04, 1 - s * 0.03, 1 + s * 0.04);
      } else perno.scale.set(1, 1, 1);

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
    }
    renderer.render(scena, camera);
  }

  function ciclo(ora) {
    raf = 0;
    if (!visibile || document.hidden) return;
    disegna(ora);
    raf = requestAnimationFrame(ciclo);
  }
  function avvia() { if (!ridotto && !raf && visibile && !document.hidden) { ultimo = performance.now(); raf = requestAnimationFrame(ciclo); } }

  /* il cursore, ovunque sulla pagina */
  const suMouse = (e) => {
    if (e.pointerType && e.pointerType !== "mouse") return;
    const r = contenitore.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    mx = Math.max(-1, Math.min(1, (e.clientX - cx) / (innerWidth * 0.4)));
    my = Math.max(-1, Math.min(1, (e.clientY - cy) / (innerHeight * 0.4)));
  };
  window.addEventListener("pointermove", suMouse, { passive: true });

  /* trascinare per ruotare; toccare per farla saltellare e parlare */
  const giu = (e) => { trascina = { x: e.clientX, y0: trascinaYaw, mosso: false }; tela.style.cursor = "grabbing"; try { tela.setPointerCapture(e.pointerId); } catch (x) {} };
  const muovi = (e) => {
    if (!trascina) return;
    const dx = e.clientX - trascina.x;
    if (Math.abs(dx) > 4) trascina.mosso = true;
    trascinaYaw = trascina.y0 + dx * 0.012;
    if (ridotto) { perno.rotation.y = trascinaYaw; disegna(performance.now()); }
  };
  const su = () => {
    if (!trascina) return;
    const clic = !trascina.mosso;
    trascina = null;
    tela.style.cursor = "grab";
    if (clic) { salto = 1; avvia(); if (onClic) onClic(); }
  };
  tela.addEventListener("pointerdown", giu);
  tela.addEventListener("pointermove", muovi);
  tela.addEventListener("pointerup", su);
  tela.addEventListener("pointercancel", su);

  /* fuori schermo o scheda nascosta: niente calcoli */
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver(([v]) => { visibile = v.isIntersecting; if (visibile) avvia(); })
    : null;
  if (io) io.observe(contenitore);
  const suVisibilita = () => { if (!document.hidden) avvia(); };
  document.addEventListener("visibilitychange", suVisibilita);
  const ro = "ResizeObserver" in window ? new ResizeObserver(dimensiona) : null;
  if (ro) ro.observe(contenitore);

  dimensiona();
  avvia();

  return {
    distruggi() {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", suMouse);
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
}
