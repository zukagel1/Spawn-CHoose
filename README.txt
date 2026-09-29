SPAWN CEF — matched to new(20260929-141537).pwn

Put these files at:
http://127.0.0.1:27125/cef/spawn/

GM already uses:
SPAWN_CEF_BROWSER = 1
SPAWN_CEF_URL = http://127.0.0.1:27125/cef/spawn/

CEF -> SERVER:
pwd:choice

Exact values expected by OnChoose:
exitpoint-choose = last position
fraction-choose  = faction base
home-choose      = house / rent / carhouse
spawn-choose     = main/street spawn

No Pawn event rename is required.
If a choice is invalid, the GM leaves CEF open and sends an error message;
the frontend therefore unlocks itself after 900 ms.
