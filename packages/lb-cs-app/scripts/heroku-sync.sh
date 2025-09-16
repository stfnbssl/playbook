#!/usr/bin/env bash
set -euo pipefail

branch="${1:-main}"

echo "[heroku:sync] Push su Heroku ($branch)" 
git push heroku "$branch:$branch"
echo "[heroku:sync] Done"
