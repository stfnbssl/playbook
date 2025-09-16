# Cap. 2 — Panoramica IEC 62443: struttura e principi
## Regole editoriali trasversali (valide per tutto il capitolo)
* **Glossario inline**: spiegare **sempre**, tassativamente gli acronimi al primo utilizzo (OT, IACS, PLC, DMZ, ecc.).
* **Parafrasare i tecnicismi** tra parentesi con linguaggio professionale ma semplice (es. *conduit* = canale di rete **controllato**; *whitelisting* = consentire **solo** ciò che è autorizzato).
* **Coerenza 62443**: mappa sempre i controlli a **FR1–FR7** e agli **SL‑Target** realistici (evita “SL4 ovunque”).
* **Stile di apertura paragrafi**: evitare formule meta-discorsive come “Lo scopo di questo capitolo è…”; aprire invece con enunciati assertivi, diretti e d’impatto che descrivano subito il contesto o il punto chiave.
* Preferire frasi assertive e dirette, che descrivono il contesto e le priorità come fatti, non come spiegazioni per il lettore.
* Integrare il lessico operativo (responsabilità, impatti, misure), evitando giri introduttivi.
* **Tono**: pratico‑operativo, vendor‑neutral, frasi brevi, voce attiva.
* **Box Per i ruoli** in ogni sezione: 2–3 bullet ciascuno per **PMI/Asset Owner**, **OEM/Product Supplier**, **Service Provider/System Integrator**.
* **Chiusura sezione**: **2–3 takeaway** + **1 avvertenza safety**.
* **Box strutturati**: mantenere format *Per i ruoli* / *Takeaway* / *Avvertenza safety*.
* Inserire box o takeaway come “ancore di lettura”, non come giustificazioni del testo.
## Mini-vademecum d’uso del Canvas
### Cos’è il Canvas
* Il Canvas è il libro di istruzioni del capitolo: regole editoriali, obiettivi, struttura, prompt, checklist QA, segnaposto figure.
* Cosa NON è: non contiene testi finiti. Le bozze si producono e si salvano in file separati.
### Output e file
* Canvas — Cap. X → solo istruzioni.
* Bozza — Cap. X — vY → contenuti finiti (testo per impaginazione).
* (Opzionale) Merge Log — Cap. X → 5 righe su cosa è stato unito e quando.
### Convenzioni di naming (default)
* Bozza completa: Bozza — Cap. <X> — v<MAJOR.MINOR> (es. Bozza — Cap. 5 — v1.2).
* Bozza datata (alternativa): Bozza — Cap. <X> — YYYYMMDD-HHmm.
* Il default può essere indicato qui nel canvas; ogni comando di generazione può sovrascriverlo dichiarando “SALVA COME: …”.
### Versioning: quando sovrascrivere vs nuova versione
* Sovrascrivi la stessa versione (es. v1.2) solo per fix minori: refusi, link, formattazione, micro-chiarimenti.
* Nuova versione (es. v1.3 / v2.0) per modifiche di contenuto, nuova sezione, cambi di tono/struttura o impatti su KPI/decisioni.
* Regola pratica: se un reviewer impiegherebbe >5 minuti per riesaminare, nuova versione.
### Approvazione
* **Checklist redazionale** (in fondo a questo canvas) da spuntare prima della consegna.
**Obiettivo** 
Fornire una panoramica generale dello standard
## Pubblico & taglio editoriale
**Regola d’oro (priorità):** Ordine narrativo = AssetOwner. Profondità = OEM.
**Target (etichette audience):**
- Primari: OEM:Executive | OEM:Legal
- Co-primari: AssetOwner:Operational | OEM:Engineering:Developers
- Secondari: ServiceProvider:Operational | ServiceProvider:Legal
**Istruzione vincolante per le bozze:**
- Ogni sezione segue il flusso AssetOwner (main text).
- Ogni sezione include un box “Deep-Dive OEM”.
- Ogni sezione chiude con la tabella “Handshake AO ⇄ OEM”.
**Taglio generale:**
- Il documento è informativo ed Executive-oriented. Non fornisce istruzioni operative dettagliate; eventuali riferimenti tecnici sono introduttivi e rimandano a specialisti o ulteriori approfondimenti.
**Taglio per audience:**
- Executive → board-ready (KPI/€/decisioni).
- Legal → compliance-oriented (clausole, crosswalk, SLA).
- Operational → pratico-operativo (SOP, checklist, evidenze).
- Engineering/Developers → tecnico (architetture, 4-1/4-2, SBOM/PSIRT, staging/test).
- Security/HSE → controlli FR6/safety, runbook, BC/DR.
**Obiettivi per audience (1 riga ciascuno):**
- OEM:Executive → capire ROI delle capability 4-1/4-2, maturità PSIRT/SBOM, priorità di prodotto.
- AssetOwner:Operational → applicare procedure (change/patch/remote) con finestre e rollback.
- ServiceProvider:Operational:Security → implementare FR6 (logging/detection) e consegnare evidenze.
- OEM:Engineering:Developers → mappare SDL 4-1 e requisiti 4-2 nei deliverable.
- ServiceProvider:Legal → clausole -2-4, DPA, portabilità dati, SLA notifiche.
**Livello tecnico (1–5):** 3/5 (Executive 2/5)
**Tempo di lettura target:** 12–15 min
**Evidenze richieste:** FR×SL, RACI, matrici flussi, KPI, segnaposto figure
--- 
## Struttura delle sezioni
### 2.1 Famiglie di standard IEC 62443 (mappa della serie)
**Obiettivo sezione 2.1**
Fornire una mappa orientativa della serie, con cosa copre ogni parte e per chi è scritta.
**Contenuti da coprire**
* **IEC 62443‑1‑1** — Terminologia, concetti e modelli (glossario comune).
* **IEC 62443‑2‑1** — Programmi di sicurezza per asset owner (governance, policy, processi).
* **IEC 62443‑2‑3** — Patch & vulnerability management (processi OT).
* **IEC 62443‑2‑4** — Requisiti per service providers (manutenzione/integrazione sicura).
* **IEC 62443‑3‑2** — Risk assessment, **SL‑Target** per zone/conduits.
* **IEC 62443‑3‑3** — **System Requirements (SR)** per raggiungere gli SL‑Target.
* **IEC 62443‑4‑1** — **Secure Development Lifecycle (SDL)** per OEM/fornitori.
* **IEC 62443‑4‑2** — Requisiti di **componente** per prodotti/soluzioni OT.
**Output** 
* Tabella “**Parte → Scopo → Utente tipico**” (Owner, OEM, SI/Service Provider).
#### Prompt operativo
“Redigi 12–14 righe che spieghino le famiglie IEC 62443 (‑1‑1, ‑2‑1, ‑2‑3, ‑2‑4, ‑3‑2, ‑3‑3, ‑4‑1, ‑4‑2), indicando per ciascuna scopo e destinatario e come si incastrano lungo il ciclo di vita.”
*Regole fisse per questo prompt*: definisci acronimi alla prima occorrenza; parafrasa i tecnicismi; inserisci box **Per i ruoli**; chiudi con **takeaway** e **avvertenza safety**.
**Figure/Template (segnaposto)**
* **Figura 2.1**: mappa della famiglia 62443 (timeline del ciclo di vita con le parti).
* **Tabella 2.1**: “Parte → Scopo → Utente tipico”.
--- 
### 2.2 Livelli di sicurezza **SL0–SL4** e loro significato
**Obiettivo sezione 2.2**
Chiarire cosa rappresentano gli **SL** (Security Level) e come si applicano a zone, conduits e asset.
**Contenuti da coprire**
* **SL** come obiettivo **per FR** e **per ambito** (zona/conduit/asset).
* Esempi pratici: quando SL1 è adeguato, quando serve SL2/SL3; SL4 casi rari.
* Relazione tra **SL‑Target** (desiderato) e **SL‑Achieved** (verificato).
* Evitare “SL4 ovunque”: compromessi OT‑feasible (attuabili in OT).
**Output** 
* Box esempi “**SL per zona**” (HMI, conduits remoti, SIS/safety systems).
#### Prompt operativo
“Scrivi 10–12 righe sui livelli SL0–SL4: cosa misurano, come si impostano per FR/zone/conduits/asset, esempi reali di SL‑Target e differenza con SL‑Achieved.”
*Regole fisse per questo prompt*: come sopra.
**Figure/Template (segnaposto)**
* **Figura 2.2**: scala SL con esempi per FR; box SL‑Target vs SL‑Achieved.
--- 
### 2.3 **Defense‑in‑Depth** e **Zone & Conduits**
**Obiettivo sezione 2.3**
Introdurre i concetti chiave di **difesa in profondità**, **segmentazione** e **conduits** controllati tra zone.
**Contenuti da coprire**
* **Defense‑in‑Depth**: livelli (fisico, rete, host, applicazione, processo, persone).
* **Zone**: raggruppare asset per criticità/processo; **Conduits**: canali con **policy** su protocolli/porte/direzioni.
* **DMZ** industriale: scambio dati IT/OT, servizi intermedi (jump host, broker).
* Accessi remoti **brokered** con **MFA**, **least privilege**, **session recording**.
**Output** 
* Schema architettura a **Zone & Conduits** con DMZ.
#### Prompt operativo
“Redigi 12–14 righe su Defense‑in‑Depth e segmentazione OT: definisci Zone & Conduits, illustra la DMZ e i principi di accesso remoto sicuro (brokered, MFA, least privilege).”
*Regole fisse per questo prompt*: come sopra.
**Figure/Template (segnaposto)**
* **Figura 2.3**: schema Zone & Conduits con DMZ e flussi consentiti.
--- 
### 2.4 **Foundational Requirements (FR1–FR7)** — tabella **FR × SL**
**Obiettivo sezione 2.4**
Spiegare le **7 aree di controllo** e come il loro livello varia da **SL0 a SL4**.
**Definizioni brevi (IT/EN)**
* **FR1 — IAC (Identification & Authentication Control)**: gestione di identità e autenticazione.
* **FR2 — UC (Use Control)**: autorizzazione e controllo degli usi/operazioni.
* **FR3 — SI (System Integrity)**: integrità di sistemi/configurazioni/firmware.
* **FR4 — DC (Data Confidentiality)**: protezione della riservatezza dei dati.
* **FR5 — RDF (Restrict Data Flow)**: segregazione di rete e controllo dei flussi.
* **FR6 — TRE (Timely Response to Events)**: monitoraggio, allarmi e risposta.
* **FR7 — RA (Resource Availability)**: disponibilità, backup/restore, resilienza.
**Cosa mostrare in tabella**
* Riga per ciascun **FR**, colonne **SL0–SL4** con descrittori sintetici (es. *FR1 @ SL2*: MFA per conduits remoti, account nominali, scadenza password; *FR5 @ SL3*: whitelisting protocolli, conduits unidirezionali dove possibile).
* Colonna finale “**Esempio in OT**”.
#### Prompt operativo
“Compila la tabella **FR × SL (SL0–SL4)** con descrittori sintetici e un esempio OT per riga (massimo 1 riga di testo per cella).”
*Regole fisse per questo prompt*: come sopra.
**Figure/Template (segnaposto)**
* **Tabella 2.4**: **FR × SL** (descrittori sintetici + esempi).
* **Figura 2.4**: legenda simboli usati nella tabella.
--- 
### 2.5 Collegamenti tra parti: **dal programma al sistema al componente**
**Obiettivo sezione 2.4**
Mostrare come le parti si **incastrano** (‑2‑1 programma, ‑3‑2 rischio/SL‑T, ‑3‑3 requisiti di **sistema**, ‑4‑1/‑4‑2 **prodotto**) lungo il ciclo di vita.
**Contenuti da coprire**
* **Flusso**: programma (‑2‑1) → rischio & SL‑T (‑3‑2) → requisiti di sistema (‑3‑3) → scelta e integrazione componenti (‑4‑2) **sviluppati** secondo (‑4‑1).
* Dove entrano **‑2‑3** (patch/vuln) e **‑2‑4** (service providers).
**Output** 
* Diagramma di **tracciabilità** tra parti e deliverable (policy, SL‑Target, SR, SBOM, advisory, evidenze di test).
#### Prompt operativo
“Scrivi 8–10 righe che spieghino il collegamento tra ‑2‑1, ‑3‑2, ‑3‑3, ‑4‑1 e ‑4‑2, indicando i deliverable e la tracciabilità tra documenti.”
*Regole fisse per questo prompt*: come sopra.
**Figure/Template (segnaposto)**
* **Figura 2.5**: flusso di tracciabilità tra parti e deliverable.
--- 
### 2.6 Errori comuni & quick wins (riquadro di servizio)
* **Errori**: cercare SL4 ovunque; saltare la **zoning**; accessi remoti diretti; niente **baseline** di hardening; assenza di **staging** per patch; mancanza di **evidenze**.
* **Quick wins**: inventario minimo; policy **accessi remoti** brokered con **MFA**; backup baseline; log centralizzati; whitelisting essenziale sui conduits critici.
#### Prompt operativo
“Scrivi 6–8 righe con 3 errori comuni e 3 quick wins, collegandoli ai FR e agli SL dove rilevante.”
--- 
## Glossario minimo (Cap. 2 — Panoramica)
* **IACS/OT**: sistemi di automazione e controllo industriale; ambiente operativo di fabbrica/impianto.
* **Zona (Zone)**: insieme di asset OT con profilo di rischio simile, separati logicamente da altre zone.
* **Conduit**: canale di comunicazione **controllato** tra zone; filtra protocolli e direzioni dei flussi.
* **SL — Security Level (SL0–SL4)**: obiettivo di robustezza **per requisito** e **per zona/conduit/asset**.
* **FR — Foundational Requirements**: 7 aree di controllo (FR1–FR7) dalla gestione delle identità al ripristino.
* **DMZ**: zona demilitarizzata industriale, cuscinetto tra IT e OT.
* **SDL (‑4‑1)**: ciclo di sviluppo sicuro per prodotti.
* **SR (‑3‑3)**: requisiti di sistema; **SL‑Target** vs **SL‑Achieved**.
--- 
## Checklist finale (QA redazionale — Cap. 2 Panoramica)
* [ ] Acronomi spiegati e tecnicismi parafrasati.
* [ ] Box **Per i ruoli** in ogni sezione.
* [ ] **SL** spiegati con esempi realistici OT.
* [ ] Tabella **FR × SL** coerente e bilanciata.
* [ ] Figure/template elencati e coerenti.
* [ ] Takeaway + **avvertenza safety** per sezione.
* [ ] Tono pratico‑operativo, vendor‑neutral.