#!/usr/bin/env bash
# seo/social_claude.sh — Lancia Claude Code sul runner di GitHub, a mani legate.
#
# Uso: bash seo/social_claude.sh "/social-settimana" <budget in dollari> <turni massimi>
#
# Claude qui può solo leggere il repository, usare i sottoagenti e scrivere nei due
# posti indicati: .social/ e data/social-coda.json. Non ha Bash; in rete può solo cercare e
# leggere pagine (il ricercatore verifica i fatti dubbi). Non vede
# le chiavi di Meta e Telegram, che restano nel passo di pubblicazione.
# Il filtro successivo è seo/social_valida.py.
set -uo pipefail

richiesta="$1"
budget="${2:-3}"
turni="${3:-40}"
mkdir -p .social/riscritture

claude -p "$richiesta" \
  --model "${SOCIAL_MODELLO:-claude-opus-5-5}" \
  --tools "Read,Write,Edit,Glob,Grep,Agent,WebSearch,WebFetch" \
  --allowedTools "Read,Glob,Grep,Agent,WebSearch,WebFetch,Edit(.social/**),Write(.social/**),Edit(data/social-coda.json),Write(data/social-coda.json)" \
  --permission-mode dontAsk \
  --max-turns "$turni" \
  --max-budget-usd "$budget" \
  --output-format json < /dev/null > .social/esito-claude.json
codice=$?

python - <<'PY'
import json
try:
    d = json.load(open(".social/esito-claude.json", encoding="utf-8"))
    print(f"Claude: {d.get('subtype')}, turni {d.get('num_turns')}, costo stimato {d.get('total_cost_usd')} $, "
          f"errore: {d.get('is_error')}")
    print("Permessi negati:", len(d.get("permission_denials") or []))
    # l'ultimo messaggio di Claude, per capire dove si è fermato (niente chiavi: il rapporto è pubblico)
    print("Ultime parole:", str(d.get("result") or "")[-700:].replace("\n", " "))
    open(".social/costo.txt", "w", encoding="utf-8").write(str(d.get("total_cost_usd", "?")))
except Exception as err:
    print("Esito di Claude non leggibile:", err)
PY
echo "Codice di uscita di Claude: $codice"
exit "$codice"
