#!/usr/bin/env bash
set -euo pipefail

HOST_ENTRY='127.0.0.1 impladenta.local'
HOSTS_FILE='/etc/hosts'

if grep -q 'impladenta.local' "$HOSTS_FILE" 2>/dev/null; then
  echo 'impladenta.local jau yra /etc/hosts faile.'
  exit 0
fi

echo "Pridedama: $HOST_ENTRY"
echo "$HOST_ENTRY" | sudo tee -a "$HOSTS_FILE" >/dev/null
echo 'Atlikta. Paleisk: npm run dev:local'
