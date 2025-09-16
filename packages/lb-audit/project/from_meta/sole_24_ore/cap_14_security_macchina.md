# Cap. 12 — Canvas (Istruzioni tecniche) — v1.0
# Cap. 12 — Security di Macchina per OEM (Audit, messa a punto, hardening & monitoraggio)
## Regole editoriali trasversali (valide per tutto il capitolo)
* **Glossario inline**: spiegare **sempre**, tassativamente gli acronimi al primo utilizzo (OT, IACS, PLC, DMZ, ecc.).
* **Parafrasare i tecnicismi** tra parentesi con linguaggio professionale ma semplice (es. *conduit* = canale di rete **controllato**; *whitelisting* = consentire **solo** ciò che è autorizzato).
* **Coerenza 62443**: mappa sempre i controlli a **FR1–FR7** e agli **SL‑Target** realistici (evita “SL4 ovunque”).
* **Stile di apertura paragrafi**: evitare formule meta-discorsive come “Lo scopo di questo capitolo è…”; aprire invece con enunciati assertivi, diretti e d’impatto che descrivano subito il contesto o il punto chiave.
* Preferire frasi assertive e dirette, che descrivono il contesto e le priorità come fatti, non come spiegazioni per il lettore.
* Integrare il lessico operativo (responsabilità, impatti, misure), evitando giri introduttivi.
* **Tono**: pratico‑operativo, vendor‑neutral, frasi brevi, voce attiva.
* **Box Per i ruoli** in ogni sezione: 2–3 bullet ciascuno per **PMI/Asset Owner**, **OEM/Product Supplier**, **Service Provider/System Integrator**.
* **Evidenze tracciabili**: link a manuali/procedure, matrici FR×SL, guide di sicurezza, record di test.
* **Chiusura sezione**: **2–3 takeaway** + **1 avvertenza safety**.
* **Box strutturati**: mantenere format *Per i ruoli* / *Takeaway* / *Avvertenza safety*.
* Inserire box o takeaway come “ancore di lettura”, non come giustificazioni del testo.
**Regola d’oro**: **ordine narrativo = AssetOwner**, **profondità tecnica = OEM**.
**Target (etichette audience)**
* **Primari**: `OEM:Executive` | `OEM:Engineering:Developers`
* **Co‑primari**: `AssetOwner:Operational` | `ServiceProvider:Operational`
* **Secondari**: `OEM:Legal` | `ServiceProvider:Legal`
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
> **Idea chiave**: per i **produttori di macchine** (OEM), la sicurezza “di prodotto” **non basta**: serve una **security di macchina** dimostrabile lungo il ciclo di vita (messa a punto, esercizio, supporto). Questo capitolo fornisce metodo, deliverable e template per **audit→remediation→documentazione→monitoraggio**, usando IEC **62443‑2‑x/3‑x/4‑1/4‑2** e supporti **LLM** per velocizzare analisi e risposte ai clienti.
## Obiettivo (capitolo)
* Definire **metodo e deliverable** per audit/messa a punto security di una **macchina** (CNC, packaging, robotica, ecc.).
* Tradurre lo schema *Preliminare → Assessment profondo → Remediation → Documentazione → Monitoraggio* in **artefatti ripetibili**.
* Mostrare come i **LLM** aiutano a standardizzare raccolta dati, analisi, generazione di report e pacchetti evidenze.
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
**Obiettivi per audience (1 riga)**
* `OEM:Executive` → comprendere ROI/compliance e **barriere d’accesso** ridotte da audit/messa a punto.
* `OEM:Engineering:Developers` → applicare **62443‑3‑3 a livello di macchina** (zone/conduits, FR×SL) e integrare controlli 4‑2.
* `AssetOwner:Operational` → sapere **cosa chiedere** (evidenze, matrici flussi, runbook) e come validare.
* `ServiceProvider:Operational` → procedure di **teleassistenza**, aggiornamenti, logging & evidenze.
**Taglio**: *board‑ready* per Executive; *tecnico‑operativo* per Engineering/Operational; *compliance‑oriented* per Legal.
**Livello tecnico (1–5)**: 3/5 (Executive 2/5; Developers 4/5).
**Tempo lettura target**: 20–25 min.
--- 
## Struttura delle sezioni
### 12.1 Executive brief — Perché la security “di macchina” conta per gli OEM
**Obiettivo sezione 12.1**: 1 pagina per `OEM:Executive` su impatti (vendite, post‑vendita, incidenti), **barriere di mercato**, richieste tipiche AO.
**Output**: decision memo con 3 KPI, 90/180/365, decisioni richieste.
**Prompt**: "Scrivi una pagina *board‑ready* su valore/ROI e rischi della security di macchina (audit→remediation→doc→monitoraggio)."
### 12.2 Profilo macchina & perimetro (scheda parametrica)
**Obiettivo sezione 12.2**: creare la **scheda macchina** (parametrica) per il caso pilota e per riuso su portfolio.
**Campi minimi**: tipo (es. CNC), controllori (CN/PLC), HMI, PC/gateway, protocolli (es. **PROFINET IRT**/**PROFISAFE**, **OPC UA**/**REST**), segmentazione (VLAN/SDN), accessi remoti, firewall/NGFW, dipendenze IT.
**Output**: *Machine Fact Sheet* + *Bill of Interfaces* + mappa versioni firmware/software.
**Prompt**: "Crea scheda macchina parametrica (campi+esempi), includi interfacce, protocolli, VLAN, punti unici di scambio, firmware."
### 12.3 Metodologia (Fase 1) — Analisi preliminare & competenze
**Obiettivo sezione 12.3**: formazione/metodo su **risk**, **SL‑Target (SL‑T)**, **FR1–FR7**, mappatura controlli.
**Output**: matrice **rischi×zone**, bozza **SL‑T**, *gap list*.
**Prompt**: "Imposta metodologia e deliverable Fase 1 (risk, SL‑T, gap) con esempi tipici per macchine CNC."
**QC**: NA motivati; SL‑T realistici (no *SL4 ovunque*).
### 12.4 Assessment profondo (Fase 2) — Architettura & test mirato
**Obiettivo sezione 12.4**: valutare rete (3 VLAN: automazione/HMI/esterno), conduits, gateway/NGFW, **SDN**, protocolli (PN‑IRT/PROFISAFE), pannello operatore (RDP/VNC), accessi remoti.
**Output**: **matrice flussi** approvata; **piano di test** (inclusi 2 **pen‑test** mirati: inizio/fine); **report** assessment.
**Prompt**: "Produci piano assessment per macchina pilota con analisi rete/protocolli, test mirati, evidenze richieste."
**QC**: safety prima di tutto; test in **staging** dove possibile; *session recording* su accessi.
### 12.5 Remediation (Fase 3) — Hardening & misure prioritarie
**Obiettivo sezione 12.5**: definire **hardening** (least functionality), password policy, gestione certificati, **time sync**, **syslog**, **secure update** (firmware/app), backup/restore.
**Output**: **Secure Configuration Guide (Machine)**; piano cambi con finestre/rollback; *exception register*.
**Prompt**: "Scrivi guida hardening per la macchina (parametri minimi, protocolli, logging, update firmati, backup, rollback)."
**QC**: FR3/FR6/FR7 coperti; prove in **staging**; approvazioni (*two‑person rule*).
### 12.6 Documentazione (Fase 4) — Fascicolo tecnico & compliance
**Obiettivo sezione 12.6**: predisporre fascicolo per **Regolamento Macchine (UE) 2023/1230**, riferimenti **62443**, e documentazione per richieste cliente (incluso **CRA/NIS2** se rilevanti).
**Output**: **Machine Security Evidence Package (MSEP)**: scheda, FR×SL, flussi, test, Secure Config, registro cambi, manuali utente.
**Prompt**: "Componi indice MSEP e popola segnaposto con riferimenti a prove e versioni."
### 12.7 Monitoraggio & manutenzione (Fase 5) — Operazioni & post‑vendita
**Obiettivo sezione 12.7**: monitoraggio vulnerabilità, **advisory** ai clienti, canali **PSIRT**, teleassistenza **brokered** con **MFA** e **session recording**.
**Output**: runbook O\&M (alert, triage, aggiornamenti), **SLA** notifiche incidenti, playbook teleassistenza.
**Prompt**: "Scrivi runbook post‑vendita: monitoraggio vuln, advisory, teleassistenza, evidenze per chiusura interventi."
### 12.8 Segmentazione, conduits & DMZ (applicazione FR5)
**Obiettivo sezione 12.8**: progettare **zone & conduits** a livello di macchina: VLAN/SDN, *deny‑by‑default*, whitelisting protocolli, *single point* esterno (OPC UA/REST), **DMZ**.
**Output**: diagramma segmentazione + **matrice flussi**.
**Prompt**: "Genera diagramma zone/conduits e matrice flussi per la macchina; evidenzia ‘single point’ e policy."
### 12.9 Accessi remoti & teleassistenza sicura
**Obiettivo sezione 12.9**: definire **broker** (jump/gateway), **MFA**, **account time‑bound**, **session recording**, **approvazioni su ticket**.
**Output**: manuale teleassistenza sicura e requisiti di integrazione con AO.
**Prompt**: "Crea manuale teleassistenza: prerequisiti, flussi, evidenze e revoca permessi."
### 12.10 Secure update/OTA & gestione versioni
**Obiettivo sezione 12.10**: canali di aggiornamento **firmati**, verifica integrità, *rollback*, prerequisiti di rete, staging su banchi prova.
**Output**: **specifica ‘secure update di macchina’** e **registro versioni**.
**Prompt**: "Redigi specifica aggiornamenti firmati (firmware/app), staging, rollback e registro versioni."
### 12.11 Logging, audit & sincronizzazione tempo
**Obiettivo sezione 12.11**: eventi audit minimi (login, change, update), **syslog** verso collezionatore AO/SP, **NTP** affidabile, protezione origine tempo.
**Output**: elenco eventi, policy retention, *log routing*.
**Prompt**: "Elenca eventi audit e configura syslog/NTP per compliance a 62443 (FR6)."
### 12.12 Safety & modalità degradata (integrazione con HSE)
**Obiettivo sezione 12.12**: preservare **safety** durante cambi/test; pianificare **modalità degradata** e criteri di stop sicuro.
**Output**: checklist safety‑by‑design con HSE; piano di prova degrade.
**Prompt**: "Definisci interlock safety e modalità degradata durante hardening/patch."
### 12.13 Pen‑test mirato su macchina (scopo, limiti, prove)
**Obiettivo sezione 12.13**: impostare **pen‑test** controllato *in sicurezza*: perimetro, limitazioni, prove su RDP/VNC, OPC UA, gateway/NGFW, protocolli real‑time.
**Output**: **piano di test** con approvazioni, evidenze e criteri di successo.
**Prompt**: "Stendi piano pen‑test macchina (in/out of scope, metodi, prove, safety)."
### 12.14 KPI & reporting
**Obiettivo sezione 12.12**: definire KPI misurabili: % macchine con **MSEP** completo, **patch adoption**, **tempo advisory**, % sessioni remote con MFA+recording, **MTTD/MTTR** su eventi macchina.
**Output**: tabella KPI con formule, owner, target 12 mesi.
**Prompt**: "Definisci KPI e target per programma di security di macchina (OEM/SP)."
### 12.15 Programma LLM‑assisted (audit & risposte rapide)
**Obiettivo sezione 12.15**: usare **LLM** per: estrarre dati da schede/protocolli, generare **MSEP**, risposte a **RFI/RFP**, checklist e piani di prova; **guardrail**.
**Output**: architettura RAG, *prompt templates*, policy d’uso.
**Prompt**: "Definisci RAG per security di macchina e 6 prompt per MSEP, RFI/RFP, test, advisory, manuale teleassistenza."
### 12.16 Template & deliverable
**Obiettivo sezione 12.16**: raccogliere modelli riusabili: **Machine Fact Sheet**, **Bill of Interfaces**, **Matrice flussi**, **Secure Config Guide (Machine)**, **Piano pen‑test**, **MSEP**, **Runbook teleassistenza**, **Registro versioni**, **Exception register**, **Checklist safety**.
**Output**: pacchetto template editabili.
**Prompt**: "Genera i template elencati (struttura, sezioni, segnaposto)."
--- 
## Checklist qualità (capitolo)
* [ ] Ogni sezione ha **Obiettivo/Output/Prompt/QC**.
* [ ] **Machine Fact Sheet** completo (controllori, HMI, gateway, protocolli, VLAN/SDN, accessi).
* [ ] **Matrice flussi** e policy *deny‑by‑default*; “single point” esterno definito.
* [ ] **Secure Config Guide** con parametri minimi (password/cert, NTP, syslog, update firmati, backup).
* [ ] **MSEP** indicizzato; versioni/firmware e prove dichiarati.
* [ ] **Pen‑test** con perimetro/limiti e approvazioni; safety preservata.
* [ ] LLM con **guardrail** e citazioni artefatti interni.
* [ ] Niente testi finiti: questo file resta **solo istruzioni**.