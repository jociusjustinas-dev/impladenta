#!/usr/bin/env python3
"""Push rank_math_title + rank_math_description to unicos.lt via StifLi Flex MCP."""
from __future__ import annotations

import base64
import json
import ssl
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

SITE = "https://unicos.lt"
REPORT = Path(__file__).resolve().parent / "unicos_rank_math_report.txt"

# post_id -> (title, description)
SEO: dict[int, tuple[str, str]] = {
    # Pages
    23: (
        "UNICOS — Profesionali kosmetika specialistams",
        "Pasaulinio lygio prekių ženklai grožio salonams, klinikoms ir vaistinėms. 500+ partnerių, akademija, B2B palaikymas ir pristatymas per 24 val.",
    ),
    32: (
        "Apie UNICOS — 25 metai šalia profesionalų",
        "UNICOS (buvęs Sugihara PRO) — oficialūs prekių ženklų atstovai Lietuvoje. Partnerystė, mokymai ir kokybės standartas nuo 2001 m.",
    ),
    88: (
        "Kontaktai | UNICOS",
        "Susisiekite su UNICOS komanda — konsultacijos, partnerystė, užsakymai ir mokymai. Esame visoje Lietuvoje, atsakome operatyviai.",
    ),
    90: (
        "Partnerystė su UNICOS | B2B grožio verslui",
        "UNICOS partnerystė — ne tik tiekimas. Asmeninis vadybininkas, protokolai, mokymai ir asortimento konsultacijos Jūsų verslui.",
    ),
    86: (
        "Tapti UNICOS partneriu | Paraiška",
        "Užpildykite partnerio paraišką — per 24 val. gausite asmeninį vadybininko skambutį ir pasiūlymą pagal Jūsų veiklą.",
    ),
    96: (
        "Resursai profesionalams | UNICOS",
        "Protokolai, gidai, metodikos ir praktinės gairės saugiam darbui su profesionalia kosmetika odos ir plaukų specialistams.",
    ),
    94: (
        "UNICOS akademija — mokymai ir renginiai",
        "Mokymų kalendorius grožio profesionalams: seminarai, sertifikatai, tarptautiniai lektoriai. Raskite tinkamiausią UNICOS renginį.",
    ),
    102: (
        "Dažniausiai užduodami klausimai (DUK) | UNICOS",
        "Atsakymai į dažniausius klausimus apie UNICOS partnerystę, užsakymus, mokymus, prekių ženklus ir B2B platformą.",
    ),
    100: (
        "Gidai ir metodikos | UNICOS",
        "Praktiniai gidai grožio specialistams — procedūros, produktų taikymas ir klientų konsultavimas pagal UNICOS metodiką.",
    ),
    104: (
        "Katalogai | UNICOS",
        "Profesionalios kosmetikos katalogai ir produktų apžvalgos. Peržiūrėkite UNICOS prekių ženklų katalogus vienoje vietoje.",
    ),
    106: (
        "Mokymų medžiaga | UNICOS partneriams",
        "Prieiga prie mokymų įrašų, prezentacijų ir protokolų. Partneriams skirta medžiaga nuolatiniam tobulėjimui.",
    ),
    108: (
        "Partnerio dokumentai | UNICOS",
        "Sutartys, sąlygos ir partneriams skirti dokumentai vienoje vietoje. Paprasta administracija su UNICOS B2B platforma.",
    ),
    98: (
        "Tinklaraštis | UNICOS",
        "Straipsniai grožio profesionalams: kainodara, procedūros, produktų naujienos ir verslo augimo patarimai iš UNICOS komandos.",
    ),
    110: (
        "Privatumo politika | UNICOS",
        "Sužinokite, kaip UNICOS renka, saugo ir tvarko asmens duomenis. Jūsų privatumas ir skaidrumas mums svarbūs.",
    ),
    114: (
        "Slapukų politika | UNICOS",
        "Informacija apie slapukus unicos.lt svetainėje — kokius naudojame, kodėl ir kaip galite valdyti savo pasirinkimus.",
    ),
    112: (
        "Naudojimo sąlygos | UNICOS",
        "UNICOS svetainės ir B2B platformos naudojimo sąlygos. Teisės, atsakomybės ir partnerių įsipareigojimai.",
    ),
    687: (
        "Prisijungti | UNICOS",
        "Prisijunkite prie UNICOS paskyros — matykite mokymus, paraiškas ir partneriams skirtus išteklius.",
    ),
    689: (
        "Sukurti paskyrą | UNICOS",
        "Susikurkite UNICOS paskyrą individualiam naudojimui arba būsimai partnerystei su grožio verslu.",
    ),
    691: (
        "Atkurti slaptažodį | UNICOS",
        "Pamiršote slaptažodį? Įveskite el. paštą — atsiųsime saugią nuorodą UNICOS paskyros atkūrimui.",
    ),
    703: (
        "Mano paskyra | UNICOS",
        "Jūsų UNICOS paskyros valdymas — užsakymai, mokymai, paraiškos ir partnerio informacija.",
    ),
    92: (
        "B2B platforma | UNICOS",
        "UNICOS B2B platforma partneriams — užsakymai, dokumentai, kainos ir asortimentas vienoje sistemoje.",
    ),
    7: (
        "Parduotuvė | UNICOS",
        "Profesionalios kosmetikos parduotuvė partneriams — atrinkti prekių ženklai, mokymų renginiai ir verslo sprendimai.",
    ),
    8: (
        "Krepšelis | UNICOS",
        "Jūsų UNICOS krepšelis — peržiūrėkite pasirinktas prekes ir tęskite užsakymą.",
    ),
    9: (
        "Apmokėjimas | UNICOS",
        "Užbaikite UNICOS užsakymą — saugus apmokėjimas ir pristatymo pasirinkimas.",
    ),
    10: (
        "Mano paskyra | UNICOS",
        "Valdykite UNICOS užsakymus, adresus ir paskyros nustatymus.",
    ),
    2: (
        "Sample Page | UNICOS",
        "UNICOS — profesionali kosmetika grožio specialistams Lietuvoje.",
    ),
    844: (
        "Visi įrašai | UNICOS",
        "Visi UNICOS tinklaraščio straipsniai grožio profesionalams.",
    ),
    845: (
        "Visi įrašai | UNICOS",
        "UNICOS straipsnių archyvas — praktiniai patarimai salonams ir klinikoms.",
    ),
    594: (
        "Prekių ženklai | UNICOS",
        "Oficialiai atstovaujami profesionalios kosmetikos prekių ženklai Lietuvoje — Guinot, Neostrata, Mary Cohr ir kiti.",
    ),
    # Solutions (sprendimai)
    129: (
        "Profesionali kosmetika odos specialistams | UNICOS",
        "Pritaikyta odos specialistams: prekių ženklai, protokolai ir mokymai pagal Jūsų klientų poreikius. Oficialus atstovavimas Lietuvoje.",
    ),
    130: (
        "Profesionali plaukų kosmetika salonams | UNICOS",
        "Profesionalūs plaukų priežiūros prekių ženklai, technikų mokymai ir salono paslaugų programa su asmeniniu palaikymu.",
    ),
    131: (
        "Kosmetika estetinės medicinos klinikoms | UNICOS",
        "Klinikinio lygio kosmetika, oficiali atstovystė ir struktūruoti procedūrų protokolai estetinės dermatologijos specialistams.",
    ),
    132: (
        "Dermakosmetika vaistinėms | UNICOS",
        "Dermakosmetikos linija vaistinėms — paprastas asortimentas, aiškūs konsultavimo įrankiai ir mokymai farmacininkams.",
    ),
    # Brands
    117: (
        "Guinot — oficialus atstovas Lietuvoje | UNICOS",
        "Profesionali Guinot odos priežiūra su unikaliomis aparatinėmis procedūromis. Oficialus UNICOS atstovavimas salonams ir klinikoms.",
    ),
    116: (
        "Mary Cohr — oficialus atstovas Lietuvoje | UNICOS",
        "Aukščiausios klasės Mary Cohr sprendimai veidui ir kūnui profesionalioms procedūroms. Partnerystė su UNICOS.",
    ),
    118: (
        "Comfort Zone — oficialus atstovas Lietuvoje | UNICOS",
        "Italų niche prekės ženklas — sąmoningas, holistinis grožis ir aukščiausios klasės procedūros salonams.",
    ),
    770: (
        "Neostrata — oficialus atstovas Lietuvoje | UNICOS",
        "Dermatologinė Neostrata kosmetika, paremta glikolio ir polihidroksi rūgščių mokslu. Klinikoms ir dermatologams.",
    ),
    771: (
        "Anna Lotan — oficialus atstovas Lietuvoje | UNICOS",
        "Profesionali Anna Lotan kosmetika natūralių ingredientų pagrindu. Oficialus atstovavimas kosmetologams Lietuvoje.",
    ),
    774: (
        "Exuviance — oficialus atstovas Lietuvoje | UNICOS",
        "Švelni, bet efektyvi Exuviance priežiūra jautriai ir probleminei odai. Protokolai ir mokymai su UNICOS.",
    ),
    1037: (
        "Martom — oficialus atstovas Lietuvoje | UNICOS",
        "Italų Martom niche prekės ženklas — sąmoningas, holistinis grožis ir aukščiausios klasės procedūros.",
    ),
    1038: (
        "Actyva — oficialus atstovas Lietuvoje | UNICOS",
        "Profesionali Actyva odos priežiūra su unikaliomis aparatinėmis procedūromis. Oficialus UNICOS atstovavimas.",
    ),
    1039: (
        "Kemon — oficialus atstovas Lietuvoje | UNICOS",
        "Profesionali Kemon odos priežiūra salonams. Atrinkti produktai, protokolai ir partnerių palaikymas su UNICOS.",
    ),
    1040: (
        "Skymedic — oficialus atstovas Lietuvoje | UNICOS",
        "Dermatologinė Skymedic kosmetika, paremta mokslu ir klinikine praktika. Oficialus atstovavimas Lietuvoje.",
    ),
    1041: (
        "Totally Derma — oficialus atstovas Lietuvoje | UNICOS",
        "Dermatologinė Totally Derma kosmetika, paremta glikolio ir polihidroksi rūgščių mokslu.",
    ),
    1061: (
        "Topicrem — oficialus atstovas Lietuvoje | UNICOS",
        "Švelni, bet efektyvi Topicrem priežiūra jautriai ir probleminei odai. Konsultacijos ir protokolai su UNICOS.",
    ),
    1063: (
        "Derma Lotana — oficialus atstovas Lietuvoje | UNICOS",
        "Švelni, bet efektyvi Derma Lotana priežiūra jautriai ir probleminei odai profesionalioms procedūroms.",
    ),
    1065: (
        "Bailleul — oficialus atstovas Lietuvoje | UNICOS",
        "Švelni, bet efektyvi Bailleul priežiūra jautriai ir probleminei odai. Oficialus UNICOS atstovavimas.",
    ),
    1066: (
        "Perron Rigot — oficialus atstovas Lietuvoje | UNICOS",
        "Švelni, bet efektyvi Perron Rigot priežiūra jautriai ir probleminei odai salonams ir klinikoms.",
    ),
    1067: (
        "Eneomey — oficialus atstovas Lietuvoje | UNICOS",
        "Profesionali Eneomey odos priežiūra su unikaliomis aparatinėmis procedūromis. Partnerystė su UNICOS.",
    ),
    # Blog posts
    830: (
        "Rūgštinių pilingų klaidos: ko vengti | UNICOS",
        "Praktinis vadovas pradedančiajam: kaip išvengti dažniausių klaidų atliekant rūgštinius pilingus salone.",
    ),
    831: (
        "Hydradermie procedūros poveikis | UNICOS",
        "Apžvalga: ką realiai duoda Hydradermie procedūrų serija ir kaip pristatyti rezultatus klientui be perdėtų pažadų.",
    ),
    832: (
        "Kainodara grožio salonui: 5 sprendimai | UNICOS",
        "Penki konkretūs žingsniai, padedantys grožio salono savininkui pagrįstai didinti kainas ir gerinti pelningumą.",
    ),
    # Academy products (WooCommerce)
    924: (
        "Neostrata rūgštinių pilingų meistriškumas | UNICOS akademija",
        "Praktinis seminaras: mokysitės atlikti Neostrata rūgštinius pilingus saugiai ir efektyviai. Registruokitės į UNICOS mokymą.",
    ),
    927: (
        "Verslo augimo pusryčiai: Kainodara | UNICOS akademija",
        "Kaip strategiškai įkainoti paslaugas ir gauti realią maržą grožio versle. UNICOS verslo renginys profesionalams.",
    ),
    929: (
        "Estetinės dermatologijos protokolai | UNICOS akademija",
        "Aiškūs procedūrų protokolai estetinės dermatologijos klinikoms. Mokymai su praktiniais pavyzdžiais.",
    ),
    931: (
        "Mary Cohr pavasario protokolai | UNICOS akademija",
        "Sezoninio asortimento mokymai ir naujos procedūros 2026 pavasariui. Registruokitės į UNICOS seminarą.",
    ),
    # Mokymai CPT
    930: (
        "Mary Cohr pavasario protokolai | UNICOS mokymai",
        "Sezoninio asortimento mokymai ir naujos procedūros 2026 pavasariui su Mary Cohr produktais.",
    ),
    932: (
        "Odos tipai ir diagnostika praktikoje | UNICOS mokymai",
        "Pradedantiesiems kosmetologams: tikslios odos diagnostikos pagrindas ir praktiniai patarimai kasdieniam darbui.",
    ),
}


def load_credentials() -> tuple[str, str]:
    import os

    user = os.environ.get("UNICOS_WP_USER", "Justinas")
    pw = os.environ.get("UNICOS_WP_APP_PASSWORD", "").strip()
    if not pw:
        raise SystemExit("Set UNICOS_WP_APP_PASSWORD env var")
    return user, pw


def unverified_ctx() -> ssl.SSLContext:
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    return ctx


def mcp_update_meta(post_id: int, meta_key: str, meta_value: str, user: str, pw: str) -> str:
    mcp = f"{SITE.rstrip('/')}/wp-json/stifli-flex-mcp/v1/messages"
    payload = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "tools/call",
        "params": {
            "name": "wp_update_post_meta",
            "arguments": {
                "post_id": post_id,
                "meta_key": meta_key,
                "meta_value": meta_value,
            },
        },
    }
    data = json.dumps(payload).encode()
    token = base64.b64encode(f"{user}:{pw}".encode()).decode()

    for attempt in range(6):
        req = urllib.request.Request(
            mcp,
            method="POST",
            data=data,
            headers={"Content-Type": "application/json", "User-Agent": "UnicosRankMath/1.0"},
        )
        req.add_header("Authorization", f"Basic {token}")
        try:
            with urllib.request.urlopen(req, context=unverified_ctx(), timeout=120) as r:
                out = json.loads(r.read().decode())
        except urllib.error.HTTPError as exc:
            if exc.code == 429 and attempt < 5:
                time.sleep(65)
                continue
            raise
        if "error" in out:
            return f"ERR {out['error']}"
        content = out.get("result", {}).get("content", [])
        if content:
            return content[0].get("text", str(out))
        return str(out)
    return "ERR rate limit"


def pending_from_report(report_path: Path) -> set[tuple[int, str]]:
    pending: set[tuple[int, str]] = set()
    if not report_path.is_file():
        return pending
    for line in report_path.read_text(encoding="utf-8").splitlines():
        if line.startswith("FAIL id="):
            # FAIL id=23 rank_math_title: ...
            parts = line.split()
            post_id = int(parts[1].split("=")[1])
            meta_key = parts[2].rstrip(":")
            pending.add((post_id, meta_key))
    return pending


def main() -> int:
    import argparse

    ap = argparse.ArgumentParser()
    ap.add_argument("--retry-failed", action="store_true", help="Only retry FAIL lines from report")
    args = ap.parse_args()

    user, pw = load_credentials()
    lines: list[str] = []
    ok = 0
    fail = 0
    pending = pending_from_report(REPORT) if args.retry_failed else None

    for post_id, (title, desc) in sorted(SEO.items()):
        updates = (
            ("rank_math_title", title),
            ("rank_math_description", desc),
        )
        for meta_key, value in updates:
            if pending is not None and (post_id, meta_key) not in pending:
                continue
            try:
                result = mcp_update_meta(post_id, meta_key, value, user, pw)
                if "ERR" in result:
                    raise RuntimeError(result)
                lines.append(f"OK id={post_id} {meta_key}")
                ok += 1
            except Exception as exc:
                msg = f"FAIL id={post_id} {meta_key}: {exc}"
                lines.append(msg)
                print(msg, file=sys.stderr)
                fail += 1
            time.sleep(2.2)

    summary = f"Done OK={ok} FAIL={fail} items={len(SEO)}"
    lines.append(summary)
    print(summary)
    if args.retry_failed and REPORT.is_file():
        prior = [ln for ln in REPORT.read_text(encoding="utf-8").splitlines() if ln.startswith("OK ")]
        lines = prior + lines
    REPORT.write_text("\n".join(lines), encoding="utf-8")
    print("Report:", REPORT)
    return 0 if fail == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
