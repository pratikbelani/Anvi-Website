#!/bin/bash
# ─────────────────────────────────────────────────────────────
#  ANVI — Open the website
#  Double-click this file: it starts a tiny local server
#  (if one isn't already running) and opens the site.
# ─────────────────────────────────────────────────────────────
DIR="$(cd "$(dirname "$0")" && pwd)"
PORT=8712

if ! lsof -nP -iTCP:$PORT -sTCP:LISTEN >/dev/null 2>&1; then
  nohup python3 -m http.server $PORT --directory "$DIR" >/dev/null 2>&1 &
  disown
  sleep 1
fi

open "http://localhost:$PORT/index.html"
