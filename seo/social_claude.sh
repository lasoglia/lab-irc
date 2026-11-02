#!/usr/bin/env bash
# seo/social_claude.sh — Lancia Claude Code sul runner di GitHub, a mani legate.
#
# Uso: bash seo/social_claude.sh "/social-settimana" <budget in dollari> <turni massimi>
#
# Claude qui può solo leggere il repository, usare i sottoagenti e scrivere nei due
# posti indicati: .social/ e data/social-coda.json. Non ha Bash né internet e non vede
# le chiavi di Meta e Telegram, che restano nel passo di pubblicazione.
# Il filtro successivo è seo/social_valida.py.
set -uo pipefail

richiesta="$1"
budget="${2:-3}"
turni="${3:-40}"
mkdir -p .social/riscritture

claude -p "$richiesta" \
  --model "${SOCIAL_MODELLO:-claude-sonnet-5-5}" \
  --tools "Read,Write,Edit,Glob,Grep,Agent" \
  --allowedTools "Read,Glob,Grep,Agent,Edit(.social/**),Write(.social/**),Edit(data/social-coda.json),Write(data/social-coda.json)" \
  --permission-mode dontAsk \
  --max-turns "$turni" \
  --max-budget-usd "$budget" \
  --output-format json < /dev/null > .social/esito-claude.json
codice=$?

python - <<'PY'
import json
try:
    d = json.load(open(".social/esito-claude.json", encoding="utf-8"))
    print(f"Claude: {d.get('subtype')}, turni {d.get('num_turns')}, costo stimato {d.get('total_cost_usd')} $")
    print("Permessi negati:", len(d.get("permission_denials") or []))
    open(".social/costo.txt", "w", encoding="utf-8").write(str(d.get("total_cost_usd", "?")))
except Exception as err:
    print("Esito di Claude non leggibile:", err)
PY
exit "$codice"
