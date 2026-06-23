/* =====================================================================
   lab-tema.js — interruttore chiaro/scuro condiviso per lab-irc
   ---------------------------------------------------------------------
   Da includere con UNA riga, alla fine del <body>:

       <script src="../assets/lab-tema.js"></script>

   Crea il pulsante 🌙/☀️ in basso a destra e ricorda la scelta sul
   dispositivo (localStorage). Usa la stessa logica data-tema dell'area
   verifiche, così la preferenza è coerente in tutto il sito.

   Per evitare il "lampo" di tema sbagliato al caricamento, metti anche
   questo nello <head> della pagina, PRIMA del CSS:

     <script>try{var t=localStorage.getItem('tema_lab');
       if(t)document.documentElement.dataset.tema=t;}catch(e){}</script>
   ===================================================================== */
(function(){
  var CHIAVE = "tema_lab";

  function corrente(){
    /* Default del sito = "scuro" (Notte studio). */
    return document.documentElement.dataset.tema === "chiaro" ? "chiaro" : "scuro";
  }
  function applica(t){
    document.documentElement.dataset.tema = t;
    try{ localStorage.setItem(CHIAVE, t); }catch(e){}
  }

  /* Applica subito la preferenza salvata (se lo script di <head> non c'era). */
  try{
    var salvato = localStorage.getItem(CHIAVE);
    if(salvato) document.documentElement.dataset.tema = salvato;
  }catch(e){}

  function crea(){
    if(document.getElementById("labTema")) return;
    var btn = document.createElement("button");
    btn.id = "labTema";
    btn.type = "button";
    btn.setAttribute("aria-label", "Cambia tema chiaro/scuro");
    btn.textContent = corrente() === "scuro" ? "☀️" : "🌙";
    btn.addEventListener("click", function(){
      var nuovo = corrente() === "scuro" ? "chiaro" : "scuro";
      applica(nuovo);
      btn.textContent = nuovo === "scuro" ? "☀️" : "🌙";
    });
    document.body.appendChild(btn);
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", crea);
  }else{
    crea();
  }
})();
