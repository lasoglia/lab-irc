/* =====================================================================
   Costruisce il sito React in ../assets/app.js (+ ../assets/app.css).

   Uso (serve Node.js, solo per chi modifica il codice):
       cd app && npm install && npm run build

   Chi aggiorna i contenuti da Decap NON deve fare niente di tutto questo:
   il sito legge i dati (data/*.json) da solo, ogni volta che si apre.

   I componenti vengono presi così come sono dal design system esportato
   da Claude Design (../design-system/components): quando il design
   cambia si sostituisce quella cartella e si rilancia la build.
   ===================================================================== */
import * as esbuild from "esbuild";
import { fileURLToPath } from "node:url";
import path from "node:path";

const qui = path.dirname(fileURLToPath(import.meta.url));
const osserva = process.argv.includes("--watch");

const opzioni = {
  entryPoints: [path.join(qui, "src/main.jsx")],
  bundle: true,
  minify: !osserva,
  sourcemap: false,
  format: "iife",
  target: ["es2019", "chrome80", "firefox78", "safari13"],
  outfile: path.join(qui, "../assets/app.js"),
  jsx: "transform",
  loader: { ".js": "jsx", ".jsx": "jsx" },
  /* i componenti del design system importano "react": lo risolviamo da qui */
  nodePaths: [path.join(qui, "node_modules")],
  define: { "process.env.NODE_ENV": osserva ? '"development"' : '"production"' },
  legalComments: "none",
  banner: { js: "/* Lab IRC — sito generato da app/ (non modificare a mano: vedi app/build.mjs) */" },
  logLevel: "info",
};

if (osserva) {
  const ctx = await esbuild.context(opzioni);
  await ctx.watch();
  console.log("In ascolto delle modifiche…");
} else {
  await esbuild.build(opzioni);
}
