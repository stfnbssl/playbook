# Cap. 3 — Governance e Security Program (IEC 62443-2-1, -2-3, -2-4)

> **Obiettivo**: capitolo pratico-operativo (2–4 facciate) che spieghi governance, ruoli/RACI, supply chain & procurement, accessi terze parti, patch & vulnerability management, PSIRT/disclosure.
>
> **Pubblico**: PMI **asset owner**, **OEM/product supplier**, **service provider** (gestori impianti).
>
> **Output attesi**: 1) **Policy set** OT, 2) **RACI** ruoli-responsabilità, 3) **Procedure** (remote access, change, patch/vuln), 4) **Requisiti contrattuali fornitore** (-2-4), 5) **Piano KPI** e roadmap 30/90/180 gg, 6) **Charter PSIRT**.

---

### Regole editoriali trasversali (valide per tutto il capitolo e per tutti i prompt)

* **Spiega gli acronimi** alla prima occorrenza: forma estesa in italiano (ed eventuale inglese), poi l'acronimo tra parentesi. Esempio: *Zona di controllo* (control **Zone**), *Livello di sicurezza* (**SL**).
* **Parafrasa i tecnicismi** tra parentesi con linguaggio professionale ma semplice. Esempio: *conduit* (canale di rete **controllato** tra due zone OT), *whitelisting* (consentire **solo** protocolli/indirizzi autorizzati).
* **Chiarisci il pubblico** per ogni sottosezione con un box **Per i ruoli** che includa 2–3 bullet **ciascuno** per: **PMI/Asset Owner**, **OEM/Product Supplier**, **Service Provider/System Integrator**.
* **Tono**: pratico‑operativo, frasi brevi (12–20 parole), voce attiva, niente gergo superfluo, vendor‑neutral.
* **Struttura**: chiudi ogni sottosezione con **2–3 takeaway** e **1 avvertenza safety**.
* **Coerenza 62443**: mappa sempre i controlli a **FR1–FR7** e agli **SL‑Target** realisti (evitare "SL4 ovunque").

> **Nota per gli autori**: copia‑incolla questo blocco in eventuali estratti del capitolo e applicalo a tutti i prompt di redazione.

---

## 3.1 Programma di Sicurezza OT (‑2‑1)

**Sintesi**
Il **programma di sicurezza OT** (Operational Technology) secondo **IEC 62443‑2‑1** è un ciclo **PDCA** (Plan‑Do‑Check‑Act) che collega politiche e ruoli, **valutazione del rischio** sugli **IACS** (Industrial Automation and Control Systems), definizione degli **SL‑Target** (obiettivi di sicurezza per zona/conduit/asset), implementazione dei controlli (**FR1–FR7**), **validazione** (‑3‑3) e **miglioramento continuo**. Il perimetro comprende impianti, linee, PLC/DCS/SCADA, HMI, conduits verso IT tramite **DMZ** (zona cuscinetto), con integrazione esplicita con **safety**, qualità e manutenzione.

**Componenti chiave**

* **Governo**: comitato ICS con mandato, calendario, registro decisioni ed **eccezioni**.
* **Politiche & standard**: accessi remoti, change, backup/restore, logging, hardening; mapping a **FR/SL**.
* **Processi**: risk‑based per **zona**, pianificazione misure e **verifica** (test/‑3‑3), audit periodico.
* **Evidenze**: RACI approvato, registro asset, SL‑Target per zona, piani e report **KPI**.

**Per i ruoli**

* **PMI / Asset Owner**: delimitare confine IT/OT; nominare owner di zona; approvare SL‑Target realistici.
* **OEM / Product Supplier**: manuale di **integrazione sicura**, **SBOM** (Software Bill of Materials), tempi patch; supporto alla validazione.
* **Service Provider / System Integrator**: progettare **zone & conduits**, impostare broker di accesso, logging ed evidenze di test.

**Takeaway**

* Programma **documentato e misurabile**, non solo tecnico.
* **SL‑Target** guidano priorità e investimenti (evitare "SL4 ovunque").
* Safety, manutenzione e qualità sono **stakeholder** permanenti.

**Avvertenza safety**
Ogni controllo va valutato contro interlock e vincoli del processo: nessuna modifica senza **analisi d’impatto** e test in ambiente sicuro.

**Prompt operativo**
“Redigi una panoramica di 10–12 righe del programma di sicurezza OT secondo 62443‑2‑1, collegandolo a SL‑Target e cicli PDCA.”

**Regole fisse per questo prompt**: definisci ogni acronimo alla **prima occorrenza**; aggiungi **parafrasi semplice** tra parentesi per i termini tecnici; inserisci un box **Per i ruoli** con 2–3 bullet ciascuno (PMI/Asset Owner, OEM/Product Supplier, Service Provider/System Integrator); chiudi con **2–3 takeaway** e **1 avvertenza safety**; mantieni tono **pratico‑operativo** e **vendor‑neutral**.

---

## 3.2 Ruoli & Responsabilità + **RACI**

**Ruoli**

* **Asset Owner / Gestore impianto**: detiene il rischio, approva **SL‑Target**, policy e finestre di fermo.
* **System Integrator**: design di **zone & conduits**, hardening, validazione (‑3‑3).
* **Product Supplier / OEM**: **SDL** (Secure Development Lifecycle, ‑4‑1), requisiti di **componente** (‑4‑2), **SBOM**, advisory vulnerabilità.
* **Service Provider (‑2‑4)**: accessi remoti, manutenzione, logging e consegna **evidenze**.
* **OT Security / SOC** (Security Operations Center): monitoraggio, incident response, reporting **KPI**.
* **HSE/Safety**: impatti di processo e interlocks.

**Tabella RACI — modello**

| Attività chiave                    | Asset Owner | System Integrator | OEM | Service Provider | OT Sec/SOC | HSE/Safety |
| ---------------------------------- | ----------: | ----------------: | --: | ---------------: | ---------: | ---------: |
| Definizione **SL‑Target** per zona |         R/A |                 C |   C |                C |          C |          C |
| **Zoning & conduits** design       |           A |                 R |   C |                C |          C |          C |
| **Remote access** policy & broker  |           A |                 R |   C |                R |          C |          C |
| **Change management** OT           |           A |                 R |   C |                C |          C |          C |
| **Patch/Vuln management (‑2‑3)**   |           A |                 C |   C |                R |          R |          C |
| **Monitoring & logging**           |           A |                 C |   C |                C |          R |          C |
| **Incident response** (IR/PSIRT)   |           A |                 C |   C |                C |          R |          C |
| **Procurement** (‑2‑4, ‑4‑1/‑4‑2)  |         R/A |                 C |   R |                C |          C |          C |

**Perché R/A così**

* **SL‑Target**: l’Owner detiene il rischio → **A**; contributi tecnici in **C**.
* **Zoning & conduits**: responsabilità **R** al SI per il design; **A** all’Owner.
* **Remote access**: policy **A** all’Owner; implementazione **R** al SI; **R** operativo al Service Provider.

**Per i ruoli**

* **PMI / Asset Owner**: formalizzare **RACI** e criteri di eccezione; definire owner per ogni zona.
* **OEM**: dichiarare capacità ‑4‑2 e pratiche ‑4‑1; nominare un **referente tecnico** per integrazione.
* **Service Provider**: adottare procedure del cliente, fornire **log** e **report** a chiusura attività.

**Takeaway**

* Ruoli chiari evitano **zone grigie** su accessi e cambi.
* Il RACI va **pubblicato** e rivisto a ogni modifica organizzativa.
* Collegare il RACI ai **ticket** (change, incident, accessi).

**Avvertenza safety**
Attività che incidono su logiche **SIS/ESD** (Safety) richiedono **two‑person rule** e approvazioni dedicate.

**Prompt operativo**
“Compila il RACI per il tuo contesto, giustificando in 3–5 righe le scelte di R/A sulle prime tre attività.”

**Regole fisse per questo prompt**: definisci ogni acronimo alla **prima occorrenza**; aggiungi **parafrasi semplice** tra parentesi per i termini tecnici; inserisci un box **Per i ruoli** con 2–3 bullet ciascuno (PMI/Asset Owner, OEM/Product Supplier, Service Provider/System Integrator); chiudi con **2–3 takeaway** e **1 avvertenza safety**; mantieni tono **pratico‑operativo** e **vendor‑neutral**.

---

## 3.3 Supply Chain Security & **Procurement** (‑2‑4)

**Clausole contrattuali (modello vendor‑neutral)**

1. **SDL 62443‑4‑1** con audit su richiesta (NDA).
2. **Requisiti 62443‑4‑2** dichiarati (FR/SL supportati) e guida all’hardening.
3. **SBOM** aggiornato per release; formato aperto (es. SPDX).
4. **PSIRT** attivo: canale cifrato, **SLA** triage (es. 5 gg), advisory firmati.
5. **Patch policy**: tempi indicativi per criticità (CRIT/HIGH entro 30–60 gg **OT‑feasible**).
6. **Accessi remoti**: solo **brokered**, **MFA**, approvazioni time‑bound, **session recording**.
7. **Logging** interventi e consegna **evidenze** a fine attività.
8. **Incident/Disclosure** coordinato con l’Owner entro X ore.
9. **Data ownership**: limiti su copie/configurazioni; restituzione a progetto chiuso.
10. **Sicurezza in produzione**: manuale di integrazione sicura, porte/protocolli, account, backup.

**Qualifica fornitori**
Criteri: maturità **SDL**, storico **CVE/TTR** (Time‑To‑Remediate), referenze di settore, disponibilità a test di integrazione, certificazioni pertinenti, continuità **PSIRT**.

**Per i ruoli**

* **PMI / Asset Owner**: inserire clausole nei **capitolati**; penali solo su impegni ragionevoli.
* **OEM**: pubblicare **advisory** e SBOM; dichiarare tempi medi di remediation.
* **Service Provider**: accettare **registrazione sessioni** e checklist di chiusura.

**Takeaway**

* Il contratto è lo strumento chiave per **‑2‑4/‑4‑1/‑4‑2**.
* Prevedere una **matrice di conformità** allegata all’ordine.
* Accessi remoti e disclosure **non si improvvisano**.

**Avvertenza safety**
Interventi da remoto solo in **finestre di fermo** con piano di **rollback** concordato.

**Prompt operativo**
“Scrivi 8–10 clausole procurement vendor‑neutral che impongano ‑4‑1/‑4‑2, PSIRT, SBOM, patch e controlli su accessi remoti.”

**Regole fisse per questo prompt**: definisci ogni acronimo alla **prima occorrenza**; aggiungi **parafrasi semplice** tra parentesi per i termini tecnici; inserisci un box **Per i ruoli** con 2–3 bullet ciascuno (PMI/Asset Owner, OEM/Product Supplier, Service Provider/System Integrator); chiudi con **2–3 takeaway** e **1 avvertenza safety**; mantieni tono **pratico‑operativo** e **vendor‑neutral**.

---

## 3.4 **Accessi remoti di terze parti** (policy e controlli)

**Principi**
Accesso **brokered** tramite jump host/gateway privilegiato; **no** VPN dirette verso asset. **MFA**, autorizzazioni **time‑bound**, **least privilege**, **session recording**, **separation of duties**.

**Procedura in 12 passi**

1. Richiesta con scopo e asset.
2. Verifica prerequisiti (formazione, NDA).
3. Approvazione **owner di zona**.
4. Pianificazione finestra (con safety).
5. **Pre‑check**: backup configurazioni/snapshot.
6. Assegnazione profilo minimo e **account temporaneo**.
7. Avvio sessione tramite **broker** con registrazione.
8. Esecuzione attività con **two‑person rule** se critiche.
9. Chiusura sessione e revoca account.
10. **Post‑check** funzionale/processo.
11. Allegare **log/evidenze** al ticket.
12. **Post‑review** con miglioramenti.

**Checklist evidenze**
Ticket, approvazione, elenco cambi, backup pre/post, log sessione, output comandi, foto/screenshot, esito test e **rollback**.

**Per i ruoli**

* **PMI / Asset Owner**: pubblicare la procedura; includerla nei contratti.
* **OEM**: predisporre tool di supporto **non‑invasivi** e guide passo‑passo.
* **Service Provider**: usare il broker del cliente e consegnare **evidenze** standard.

**Takeaway**

* Tutto l’accesso remoto passa da **un solo punto**.
* **Log** e **registrazioni** sono parte dell’evidenza.
* Account sempre **temporanei** e minimi.

**Avvertenza safety**
Attività che impattano i parametri di processo richiedono presenza (fisica o remota) di **Operations** e **HSE**.

**Prompt operativo**
“Redigi la procedura degli accessi remoti (max 12 passi) e una checklist di evidenze da allegare al ticket.”

**Regole fisse per questo prompt**: definisci ogni acronimo alla **prima occorrenza**; aggiungi **parafrasi semplice** tra parentesi per i termini tecnici; inserisci un box **Per i ruoli** con 2–3 bullet ciascuno (PMI/Asset Owner, OEM/Product Supplier, Service Provider/System Integrator); chiudi con **2–3 takeaway** e **1 avvertenza safety**; mantieni tono **pratico‑operativo** e **vendor‑neutral**.

---

## 3.5 **Patch & Vulnerability Management** (‑2‑3)

**Processo OT‑aware**

1. Inventario e **criticità** asset.
2. Raccolta vuln (CVE, advisory fornitore/**PSIRT**, SOC).
3. **Risk scoring OT**: CVSS × impatto su disponibilità/safety × esposizione.
4. Valutare **OT‑feasibility** e pianificare in **finestra**.
5. Test in **staging**/banco prova.
6. **Change approval** e comunicazione.
7. Deploy con **rollback plan**.
8. Verifica e aggiornamento baseline.

**SLA di riferimento (adattare)**

* **CRIT/HIGH**: ≤ 30–60 gg se **OT‑feasible**.
* **MED**: ≤ 90 gg; **LOW**: a ciclo manutentivo.
* **Eccezioni**: compensating controls documentati e revisione trimestrale.

**KPI**
Copertura patch per criticità; **TTR** (Time‑To‑Remediate) mediano; % asset con baseline verificata; n. **eccezioni** attive.

**Per i ruoli**

* **PMI / Asset Owner**: definire finestre e priorità per **asset critici**.
* **OEM**: fornire **SBOM**, pacchetti firmati, guide di test.
* **Service Provider/SI**: mantenere **staging**, eseguire test e consegnare report.

**Takeaway**

* Patch e vuln mgmt sono **processi**, non eventi.
* Lo **staging** evita fermi imprevisti.
* Le **eccezioni** devono **scadere**.

**Avvertenza safety**
Mai patch su sistemi **safety‑critical** senza test dedicati e piano di ripristino.

**Prompt operativo**
“Scrivi il piano patch/vuln con SLA per criticità, criteri di feasibility e flusso di test/staging.”

**Regole fisse per questo prompt**: definisci ogni acronimo alla **prima occorrenza**; aggiungi **parafrasi semplice** tra parentesi per i termini tecnici; inserisci un box **Per i ruoli** con 2–3 bullet ciascuno (PMI/Asset Owner, OEM/Product Supplier, Service Provider/System Integrator); chiudi con **2–3 takeaway** e **1 avvertenza safety**; mantieni tono **pratico‑operativo** e **vendor‑neutral**.

---

## 3.6 **PSIRT** & Coordinated Vulnerability Disclosure

**Charter essenziale**
Mandato: ricevere segnalazioni, **triage**, riprodurre, coordinare **remediation/mitigazioni**, pubblicare **advisory** firmati, interfacciarsi con **CERT/ISAC** e clienti.
Contatti: e‑mail dedicata, chiave **PGP**, portale.
Tempi: finestra di disclosure **coordinata** (es. 90 gg, estendibile in OT).
Ruoli: **PSIRT Lead**, referente Engineering, Legal/Comms, OT SME.

**Flusso**
Ricezione → conferma → riproduzione → valutazione impatto → remediation/mitigazioni → advisory → chiusura → lezione appresa.

**Template advisory (pubblico)**
ID/Versione; prodotti/versioni impattate; descrizione; **gravità** (CVSS); prerequisiti; mitigazioni; patch e **workaround**; riferimenti; cronologia.

**Per i ruoli**

* **PMI / Asset Owner**: canale per inviare segnalazioni ai fornitori; politica di **coordinamento**.
* **OEM**: pubblicare pagina **PSIRT** e archivio advisory.
* **Service Provider**: supportare triage e verifica in campo.

**Takeaway**

* La **trasparenza** PSIRT aumenta fiducia e velocizza remediation.
* Coordinare disclosure con finestre **OT**.
* Standardizzare il **template** evita ambiguità.

**Avvertenza safety**
Non divulgare dettagli sfruttabili prima che esistano **mitigazioni** praticabili.

**Prompt operativo**
“Definisci un charter PSIRT di 12–15 righe e il template dell’advisory pubblico.”

**Regole fisse per questo prompt**: definisci ogni acronimo alla **prima occorrenza**; aggiungi **parafrasi semplice** tra parentesi per i termini tecnici; inserisci un box **Per i ruoli** con 2–3 bullet ciascuno (PMI/Asset Owner, OEM/Product Supplier, Service Provider/System Integrator); chiudi con **2–3 takeaway** e **1 avvertenza safety**; mantieni tono **pratico‑operativo** e **vendor‑neutral**.

---

## 3.7 **KPI & Metriche**

**Cosa misurare**

* % **asset inventariati/classificati** per zona.
* % zone con **SL‑Target** approvati e verificati.
* **Patch coverage** per criticità; **TTR** mediano.
* % **sessioni remote** registrate con **MFA**; tempo medio di approvazione.
* **MTTD/MTTR** (tempo di rilevazione/ripristino) eventi OT; % **backup/restore** testati.
* % **fornitori qualificati** (SDL/PSIRT) in procurement.

**Come raccoglierli (senza dati sensibili)**
Contatori **aggregati** per zona; no IP/host; conservare **evidenze** (log, ticket, report). Campionare mensilmente e visualizzare **trend**.

**Per i ruoli**

* **PMI / Asset Owner**: definire target trimestrali e **soglie** minime.
* **OEM**: esportare dati necessari (advisory, tempi patch).
* **Service Provider**: allegare KPI a **rapportini** di chiusura.

**Takeaway**

* Pochi KPI, **stabili** e ripetibili.
* Misura → priorità → azione → **verifica**.
* I KPI guidano la roadmap, non viceversa.

**Avvertenza safety**
La raccolta log non deve impattare **latenza** o **affidabilità** dei sistemi di controllo.

**Prompt operativo**
“Elenca 6 KPI misurabili e spiega come raccoglierli senza esporre dati sensibili.”

**Regole fisse per questo prompt**: definisci ogni acronimo alla **prima occorrenza**; aggiungi **parafrasi semplice** tra parentesi per i termini tecnici; inserisci un box **Per i ruoli** con 2–3 bullet ciascuno (PMI/Asset Owner, OEM/Product Supplier, Service Provider/System Integrator); chiudi con **2–3 takeaway** e **1 avvertenza safety**; mantieni tono **pratico‑operativo** e **vendor‑neutral**.

---

## 3.8 **Roadmap 30/90/180 gg**

**30 gg (quick wins)**

* Inventario minimo + classificazione criticità (**Owner/SI**).
* Policy **accessi remoti** pubblicata; broker installato (**SI**).
* **Backup** baseline e test di ripristino (**Operations**).
* Avvio **registro KPI** e RACI firmato (**Owner**).

**90 gg**

* Zoning logico + conduits prioritari; **DMZ** attiva (**SI**).
* **Patch/Vuln mgmt** operativo con calendario (**Owner/SI**).
* Clausole **procurement** in gara; qualifica fornitori (**Owner**).
* Prime verifiche **‑3‑3** e runbook incident (**SI/SOC**).

**180 gg**

* SL‑Target **per zona** approvati e verificati.
* **PSIRT** (OEM/fornitori) integrato; reporting KPI mensile.
* Audit di **conformità** e piano di miglioramento annuale.

**Criteri di successo**
% target raggiunti (KPI), assenza di interventi remoti **non registrati**, riduzione dei **cambi urgenti** senza approvazione.

**Prompt operativo**
“Compila la roadmap 30/90/180 gg con owner, dipendenze e criteri di successo.”

**Regole fisse per questo prompt**: definisci ogni acronimo alla **prima occorrenza**; aggiungi **parafrasi semplice** tra parentesi per i termini tecnici; inserisci un box **Per i ruoli** con 2–3 bullet ciascuno (PMI/Asset Owner, OEM/Product Supplier, Service Provider/System Integrator); chiudi con **2–3 takeaway** e **1 avvertenza safety**; mantieni tono **pratico‑operativo** e **vendor‑neutral**.

---

## 3.9 **Artefatti & Evidenze** (checklist)

* **Security Policy OT** e **Standard tecnici** (versionati).
* **RACI** firmato e pubblicato.
* **Registro asset** con classificazione e owner di zona.
* **SL‑Target** per zona e mapping controlli **FR1–FR7**.
* **Procedura accessi remoti** + **log/registrazioni** a supporto.
* **Piano patch/vuln** con registro **eccezioni** e report esecuzione.
* **Clausole procurement** (‑2‑4) e checklist qualifica fornitore.
* **Charter PSIRT** e archivio **advisory**.
* **Report KPI** mensile con trend e azioni correttive.

---

## Glossario minimo (per il capitolo)

* **IACS/OT**: sistemi di automazione e controllo industriale; ambiente operativo di fabbrica/impianto.
* **Zona (Zone)**: insieme di asset OT con profilo di rischio simile, separati logicamente da altre zone.
* **Conduit**: canale di comunicazione **controllato** tra zone; filtra protocolli e direzioni dei flussi.
* **SL — Security Level (SL0–SL4)**: obiettivo di robustezza **per requisito** e **per zona/conduit/asset**.
* **FR — Foundational Requirements**: 7 aree di controllo: FR1 Identificazione & Autenticazione; FR2 Uso controllato; FR3 Integrità; FR4 Riservatezza; FR5 Restrizione dei flussi; FR6 Risposta agli eventi; FR7 Disponibilità & Ripristino.
* **DMZ (zona demilitarizzata industriale)**: area cuscinetto tra IT e OT con controlli di scambio dati.
* **PSIRT**: team per la gestione coordinata delle vulnerabilità di prodotto e la pubblicazione di advisory.
* **SBOM**: distinta dei componenti software di un prodotto.
* **SOC**: centro operativo di sicurezza che monitora e risponde agli eventi.
* **MFA**: autenticazione a più fattori.
* **Whitelisting**: consentire **solo** protocolli/indirizzi autorizzati (tutto il resto è bloccato).

---

### Box di impaginazione (opzionale)

* **Figura**: RACI (tabella), architettura accessi remoti (broker/jump host), flusso patch mgmt.
* **Elenchi rapidi**: errori comuni da evitare; quick wins.

**Prompt finale (capitolo)**
“Usando questo canvas, redigi il Cap. 3 in 2–4 facciate, tono pratico‑operativo, con esempi per PMI asset owner, OEM e service provider, includendo RACI, clausole procurement, procedura accessi remoti, piano patch/vuln e charter PSIRT.”

### sys_source https://chatgpt.com/c/68b73c35-0298-8328-a7b9-76f473241645