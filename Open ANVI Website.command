#!/bin/bash
# ─────────────────────────────────────────────────────────────
#  ANVI — Open the website
#  Double-click this file to open the site in your browser.
#  No internet or server required — it opens the local files.
# ─────────────────────────────────────────────────────────────
DIR="$(cd "$(dirname "$0")" && pwd)"
open "$DIR/index.html"
