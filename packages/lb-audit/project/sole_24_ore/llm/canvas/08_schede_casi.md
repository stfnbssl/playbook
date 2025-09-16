# Mini Guida IEC 62443 — Schede Casi (6 pubblici + 2 sintetici)

> **Obiettivo**: fornire 8 schede a una pagina ciascuna (testo max \~500–700 parole), con struttura uniforme e pronta per l’impaginazione della Mini Guida.
>
> **Uso**: compila i campi, mantieni toni vendor‑neutral e numeri espressi come valori relativi o range; inserisci figure/diagrammi originali.

---

## Legenda rapida

* **FR (Foundational Requirements)**: FR1 Identificazione & Autenticazione; FR2 Uso controllato; FR3 Integrità; FR4 Riservatezza; FR5 Restrizione dei flussi (segregazione/rete); FR6 Risposta tempestiva agli eventi; FR7 Disponibilità & Ripristino.
* **SL (Security Level)**: SL0–SL4 per zona/conduit/asset. Usare SL‑Target realistici.

## Istruzioni di compilazione (per tutte le schede)

1. **Contesto & problema**: 4–5 righe, solo fatti rilevanti per sicurezza/operatività.
2. **Soluzione IEC 62443**: bullet operativi, ciascuno mappato a FR/SL e, se utile, allo standard di riferimento (‑2‑1, ‑3‑2, ‑3‑3, ‑4‑1, ‑4‑2, ‑2‑3, ‑2‑4).
3. **Metriche/Risultati**: max 3 KPI, evitare valori sensibili; preferire percentuali/range e “prima→dopo”.
4. **Lezioni pratiche**: 3 takeaway applicabili da PMI/OEM/gestori.
5. **Figure/diagrammi**: indicare schema previsto (es. Zone\&Conduits, DMZ, flusso patch).
6. **Fonti**: 1–2 riferimenti autorevoli (titolo/ente/anno). Nessun link live in bozza; i link si inseriscono in impaginazione finale.
7. **Disclaimer**: per i casi sintetici indicare esplicitamente che i dati sono ricostruiti a fini didattici.

---

## Scheda 1 — TRITON/TRISIS (pubblico)

**Contesto & problema**
\[Scrivi qui: impianto, ruolo dei SIS, vettore d’attacco ad alto livello]

**Soluzione IEC 62443 (FR/SL)**

* Segregazione rigorosa SIS vs. controllo di processo; conduits con whitelisting protocolli OT (**FR5**, SL2–SL3).
* Hardening e gestione change su SIS/HMI engineering (**FR2/FR3**, ‑3‑3).
* Monitoraggio eventi safety‑critical e runbook incident (**FR6/FR7**, ‑2‑1).

**Metriche/Risultati (esempi)**

* ↓ 50–70% superfici di rete tra zona SIS e DCS.
* 100% modifiche SIS con approvazione a due persone (two‑person rule).
* MTTD eventi critici < 15–30 min.

**Lezioni pratiche**

* Non condividere ambienti/strumenti di engineering tra SIS e controllo.
* Test di validazione separati e registrati per SIS.
* Change management stringente su logiche safety.

**Figure/diagrammi**: Zona SIS isolata + conduit filtrato.
**Fonti**: Analisi tecnica TRITON/TRISIS (ente/anno); advisory istituzionale.

**Prompt operativo**
“Redigi 1 pagina, tono pratico e vendor‑neutral, che riassuma TRITON/TRISIS, mappi le contromisure a FR/SL della IEC 62443 e chiuda con 3 takeaway per impianti con SIS.”

---

## Scheda 2 — Ucraina 2015/2016 (blackout su SCADA) (pubblico)

**Contesto & problema**
\[Scrivi qui: utility elettrica, uso di credenziali legittime, operazioni remote]

**Soluzione IEC 62443 (FR/SL)**

* Controllo accessi e identità con MFA per conduits remoti (**FR1/FR2**).
* Segmentazione e DMZ tra IT/OT con broker di accesso (**FR5**).
* Telemetria e piani di risposta/riavvio manuale (**FR6/FR7**).

**Metriche/Risultati (esempi)**

* 100% sessioni remote registrate e approvate.
* Ripristino operativo tramite runbook in < X ore.
* ↓ 60% tentativi di accesso anomali post‑segmentazione.

**Lezioni pratiche**

* Gli attaccanti usano strumenti legittimi: serve least privilege e tracciabilità.
* Preparare esercizi di “operazione in modalità degradata”.
* Conduits VPN separati per manutenzione vs. monitoraggio.

**Figure/diagrammi**: Architettura IT/OT con DMZ e jump host.
**Fonti**: Report E‑ISAC/SANS; nota tecnica istituzionale (anno).

**Prompt operativo**
“Scrivi 1 pagina su Ucraina 2015/2016 (SCADA), evidenziando misure 62443 per accessi remoti/DMZ e lezioni per PMI.”

---

## Scheda 3 — INDUSTROYER2 (2022) (pubblico)

**Contesto & problema**
\[Scrivi qui: targeting grid operations, protocolli OT specifici]

**Soluzione IEC 62443 (FR/SL)**

* Whitelisting protocolli/porte OT per conduits critici (**FR5**).
* Validazione e test dei sistemi di controllo (**‑3‑3**) con ambienti di staging.
* Telemetria di rete/host specifica OT e indicatori procedurali (**FR6**).

**Metriche/Risultati (esempi)**

* ↓ 40–60% traffico non whitelisted tra zone.
* Copertura logging > 80% per asset critici.
* Tempo di propagazione patch regolate per finestre OT (X giorni).

**Lezioni pratiche**

* SL‑Target differenziati per sottosistemi.
* Testare scenari di “protocol misuse”.
* Evitare dipendenze IT non controllate su conduits OT.

**Figure/diagrammi**: Flusso whitelisting su conduits.
**Fonti**: Analisi tecnica (ente/anno) + nota complementare.

**Prompt operativo**
“Redigi 1 pagina su INDUSTROYER2 con focus su FR5/‑3‑3 e checklist minima per whitelisting OT.”

---

## Scheda 4 — Colonial Pipeline (2021) (pubblico)

**Contesto & problema**
\[Scrivi qui: attacco ransomware IT con impatto sulla continuità OT]

**Soluzione IEC 62443 (FR/SL)**

* Segregazione netta IT/OT e criteri di interscambio dati (**FR5**).
* Business continuity & piani di esercizio alternativo (**FR7**).
* Gestione identità/terze parti e hardening accessi remoti (**FR1/FR2**).

**Metriche/Risultati (esempi)**

* RTO/RPO definiti per sistemi OT critici.
* 100% conduits con policy di scambio unidirezionale dove possibile.
* ↓ X% esposizioni condivise IT→OT dopo revisione architettura.

**Lezioni pratiche**

* Un incidente IT può richiedere stop OT: preparare criteri decisionali.
* Isolare e testare periodicamente le dipendenze IT dei processi OT.
* Logistica/fornitura come fattore di rischio sistemico.

**Figure/diagrammi**: Mappa dipendenze IT/OT e punti di controllo.
**Fonti**: Sintesi istituzionale; rapporto di audit/GAO (anno).

**Prompt operativo**
“Scrivi 1 pagina su Colonial Pipeline: mappa dipendenze IT/OT e come la 62443 struttura BC/DR in OT.”

---

## Scheda 5 — Oldsmar (2021) impianto idrico (pubblico)

**Contesto & problema**
\[Scrivi qui: tentativo di alterazione parametri chimici via accesso remoto]

**Soluzione IEC 62443 (FR/SL)**

* MFA, least privilege e gestione account condivisi (**FR1/FR2**).
* HMI e workstation di engineering con hardening e logging (**FR3/FR6**).
* Allarmi di processo e interlocks come ultima difesa (**FR6/FR7**).

**Metriche/Risultati (esempi)**

* 100% accessi remoti mediati e approvati.
* ↓ 90% account condivisi entro 60 gg.
* Tempo di rilevazione manuale/automatica degli out‑of‑range < X min.

**Lezioni pratiche**

* L’operatore resta un sensore: formazione + allarmi ben tarati.
* Gli accessi remoti devono essere **brokered** e registrati.
* Ridurre il numero di HMI con capacità di modifica diretta.

**Figure/diagrammi**: Catena di difesa per parametri chimici.
**Fonti**: Advisory ufficiale (titolo/ente/anno).

**Prompt operativo**
“Redigi 1 pagina su Oldsmar evidenziando policy per accessi remoti e controllo dei parametri di processo secondo 62443.”

---

## Scheda 6 — Norsk Hydro (2019) (pubblico)

**Contesto & problema**
\[Scrivi qui: ransomware diffuso, passaggio a procedure manuali]

**Soluzione IEC 62443 (FR/SL)**

* Backup/restore e piani di continuità operativa (**FR7**).
* Separazione ambienti e criteri di ripristino a fasi (**FR5/FR7**).
* Governance del programma sicurezza (**‑2‑1**) e comunicazione trasparente.

**Metriche/Risultati (esempi)**

* % sistemi ripristinati per ondate (es. 30/60/90 gg).
* Riduzione tempi di fermo su reparti critici.
* Copertura backup verificata > 95%.

**Lezioni pratiche**

* La resilienza operativa conta quanto la prevenzione.
* Manuali di esercizio “in degrado” vanno provati sul campo.
* Recovery a fasi con priorità di business.

**Figure/diagrammi**: Timeline di ripristino a fasi.
**Fonti**: Comunicazioni ufficiali aziendali; report indipendente.

**Prompt operativo**
“Scrivi 1 pagina su Norsk Hydro focalizzata su FR7 e gestione del ripristino in contesto industriale.”

---

## Scheda 7 — Energia (sintetico) — Segmentazione OT & conduits

**Disclaimer**: caso ricostruito a fini didattici; numeri esemplificativi come range.

**Contesto & problema**
\[Impianto di generazione/distribuzione; rete piatta; manutenzione remota da IT]

**Soluzione IEC 62443 (FR/SL)**

* DMZ industriale, jump host brokered, conduits con whitelisting protocolli (**FR5**, SL2–SL3).
* Gestione identità/ruoli OT, MFA e registrazione sessioni (**FR1/FR2**).
* Telemetria OT (firewall/IDS/syslog) e runbook incident (**FR6**).

**Metriche/Risultati (range)**

* ↓ 40–70% flussi inter‑zona non necessari.
* 100% sessioni remote con MFA + registrazione.
* MTTD allarmi critici 15–30 min; MTTR < X ore.

**Lezioni pratiche**

* SL‑Target differenziati per zone (es. SL2 conduits, SL1 HMI, SL3 safety).
* Change management sulle regole di rete con finestre di fermo concordate.
* Audit periodici su accessi di terze parti.

**Figure/diagrammi**: Zone\&Conduits con DMZ e flussi consentiti.

**Prompt operativo**
“Genera 1 pagina, tono pratico, su un caso energia sintetico: da rete piatta a architettura a zone/conduits, con KPI in range.”

---

## Scheda 8 — Acque (sintetico) — Patch & accessi terze parti

**Disclaimer**: caso ricostruito a fini didattici; numeri esemplificativi come range.

**Contesto & problema**
\[Impianto trattamento acque; patch ad hoc; interventi non tracciati]

**Soluzione IEC 62443 (FR/SL)**

* Inventario asset con criticità; calendario patch trimestrale (**‑2‑3**).
* Accesso remoto mediato/approvato con ruoli separati (**FR1/FR2**, ‑2‑4).
* Backup/restore testati e logging centralizzato (**FR6/FR7**).

**Metriche/Risultati (range)**

* Copertura patch su asset “critical” > 80–90% entro 90 gg.
* 0 interventi non registrati; approvazioni in < 2 h.
* Riduzione incidenti legati ad accessi del 30–40%.

**Lezioni pratiche**

* PSIRT fornitore e finestra di manutenzione pianificata.
* Policy per account temporanei e sessioni registrate.
* Test di ripristino mensile documentato.

**Figure/diagrammi**: Flusso patch mgmt + broker accessi remoti.

**Prompt operativo**
“Scrivi 1 pagina per un caso acque sintetico: patch/vulnerability mgmt e accessi terze parti, con KPI in range e mapping 62443.”

---

## Appendice — Pack fonti (per i 6 casi pubblici)

> Inserire riferimenti bibliografici essenziali (titolo, ente/autore, anno). Link da aggiungere in impaginazione.

* TRITON/TRISIS — analisi tecnica (Dragos o equivalente); advisory istituzionale.
* Ucraina 2015/2016 — report E‑ISAC/SANS; nota tecnica di agenzia governativa.
* INDUSTROYER2 (2022) — rapporto tecnico ESET; analisi di secondo livello (es. Mandiant/TAG).
* Colonial Pipeline (2021) — sintesi CISA/DHS; rapporto GAO sulla risposta e resilienza.
* Oldsmar (2021) — advisory AA21‑042A (CISA) e fonti comunali/statali.
* Norsk Hydro (2019) — comunicazioni ufficiali aziendali; analisi indipendente.

## Checklist finale (QA redazionale)

* [ ] Tono vendor‑neutral, nessun marchio/prodotto.
* [ ] Numeri espressi come range/percentuali, niente IP/host reali.
* [ ] Mapping FR/SL coerente e non “SL4 ovunque”.
* [ ] Figura prevista indicata e coerente col testo.
* [ ] Fonti autorevoli presenti (titolo/ente/anno).
* [ ] Disclaimer esplicito per i casi sintetici.

### sys_source https://chatgpt.com/c/68b73c35-0298-8328-a7b9-76f473241645