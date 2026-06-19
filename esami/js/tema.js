// Tema chiaro/scuro per l'area verifiche. La preferenza resta sul
// dispositivo (localStorage), non sul server: nessun dato personale.
const CHIAVE = "tema_verifiche";

export function temaCorrente() {
  return document.documentElement.dataset.tema === "scuro" ? "scuro" : "chiaro";
}

function applica(t) {
  document.documentElement.dataset.tema = t;
  try { localStorage.setItem(CHIAVE, t); } catch (_e) {}
}

// Crea il pulsante fisso che alterna il tema. Da chiamare una volta all'avvio
// di ogni pagina (docente e studente).
export function inizializzaTemaToggle() {
  const btn = document.createElement("button");
  btn.id = "toggleTema";
  btn.type = "button";
  btn.setAttribute("aria-label", "Cambia tema chiaro/scuro");
  btn.textContent = temaCorrente() === "scuro" ? "☀️" : "🌙";
  btn.addEventListener("click", () => {
    const nuovo = temaCorrente() === "scuro" ? "chiaro" : "scuro";
    applica(nuovo);
    btn.textContent = nuovo === "scuro" ? "☀️" : "🌙";
  });
  document.body.append(btn);
}
