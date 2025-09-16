# Cap. 11 — Canvas (Istruzioni tecniche) — v1.0
## Cap. 11 — Conformità IEC 62443‑4‑2 per componenti (profilo di prodotto & evidenze)
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
> **Idea chiave**: la conformità **IEC 62443‑4‑2** dei componenti OT (PLC, RTU, HMI, gateway, drive, ecc.) è un **abilitatore di mercato** e riduce i rischi d’integrazione nei sistemi **IEC 62443‑3‑3**. Il capitolo definisce *come* un produttore deve presentare capacità, precondizioni e configurazioni, e *come* Asset Owner/Integrator devono valutarle.
## Obiettivo (capitolo)
* Spiegare cosa richiede **IEC 62443‑4‑2** (FR/CR/RE, SL) e come documentarlo.
* Standardizzare un **Component Security Profile (CSP)**: matrice **CR×SL**, precondizioni, configurazioni necessarie, dipendenze (C/S/N/N‑A).
* Mostrare come costruire un **pacchetto evidenze** per gare & audit e come **valutarlo** lato Asset Owner/Integrator.
* Introdurre un flusso **LLM‑assisted** per estrarre, normalizzare e mantenere le evidenze dal materiale del vendor.
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
### 11.1 Executive brief — Perché 4‑2 conta per i componenti
**Obiettivo sezione 11.1**: in 1 pagina, legare conformità 4‑2 a *accesso ai mercati*, integrazione veloce, riduzione rischi e oneri post‑vendita.
**Output**: memo con 3 KPI, 90/180/365, decisioni richieste.
**Prompt**: "Scrivi 1 pagina *board‑ready* su valore e rischi di 4‑2 per componenti OT (FR/CR, SL, evidenze, impatti su RFI/RFP)."
**QC**: KPI presenti; rischi chiave; roadmap tri‑fase.
### 11.2 Cosa chiede la 4‑2 (FR/CR/RE, SL, EDR/HDR/NDR/SAR)
**Obiettivo sezione 11.2**: spiegare Fondational Requirements (FR1–FR7), **Component Requirement (CR)**, **Requirement Enhancement (RE)**, mapping con **SL1–SL4** e classi **EDR/HDR/NDR/SAR**.
**Output**: tabella riassuntiva terminologia + micro‑glossario.
**Prompt**: "Sintetizza FR/CR/RE, SL, e differenza EDR/HDR/NDR/SAR con esempi di controllo."
### 11.3 Component Security Profile (CSP) — struttura e campi
**Obiettivo sezione 11.3**: definire un profilo prodotto standard: identificativi, firmware range, interfacce, **matrice CR×SL×Integrazione (C/S/N/N‑A)**, configurazioni richieste, *Not Applicable (N/A)* motivati.
**Output**: **template CSP** editabile.
**Prompt**: "Genera un template CSP: sezioni, tabella CR×SL×(C|S|N|N‑A), precondizioni e configurazioni."
### 11.4 Condizioni operative & assunzioni di sicurezza
**Obiettivo sezione 11.4**: esplicitare precondizioni (es. *defense‑in‑depth*, segmentazione, protocolli sicuri, gestione certificati), limiti d’uso e dipendenze esterne.
**Output**: checklist *Operational Environment & Security Assumptions*.
**Prompt**: "Stila la checklist di precondizioni operative e security assumptions per integrare il componente in architettura OT."
### 11.5 Matrice CR×SL×Integrazione — legenda e compilazione
**Obiettivo sezione 11.5**: spiegare la legenda **C/S/N/N‑A** e come compilarla per FR1–FR7; evidenziare *gap* e misure compensative di sistema.
**Output**: matrice compilata d’esempio + guida alla lettura.
**Prompt**: "Compila una matrice CR×SL×Integrazione con esempi rappresentativi e note di configurazione."
### 11.6 Configurazioni necessarie per raggiungere i requisiti
**Obiettivo sezione 11.6**: elencare parametri/protocolli (es. disattivare legacy, TLS per servizi, gestione certificati, password policy, time sync, syslog).
**Output**: **Secure Configuration Guide** breve per il componente.
**Prompt**: "Redigi una guida di configurazione minima per soddisfare i CR per SL2/SL3."
### 11.7 Secure Boot & Roots of Trust
**Obiettivo sezione 11.7**: descrivere catena di avvio sicuro, **Root of Trust** del fornitore e dell’Asset Owner; firmware firmati, verifica integrità.
**Output**: schema chiavi & processo di firma/aggiornamento.
**Prompt**: "Disegna il flusso Secure Boot/aggiornamenti firmati e la gestione delle chiavi (supplier/AO)."
### 11.8 Identità & gestione utenti (locale vs centrale)
**Obiettivo sezione 11.8**: chiarire **local user management** vs **central user management**, criteri password/MFA, **PKI** per OPC UA/web/servizi.
**Output**: policy di identità per il componente, tabella controlli FR1/FR2.
**Prompt**: "Definisci policy identity & access (locale/centrale), password, certificati, rotazione segreti."
### 11.9 Audit, tempo & logging
**Obiettivo sezione 11.9**: abilitare audit events, storage, **syslog**, time sync & protezione origine tempo; evidenze per audit.
**Output**: elenco *auditable events* e *log routing*.
**Prompt**: "Elenca eventi di audit minimi e configurazione syslog/NTP per compliance 4‑2."
### 11.10 Integrità software/firmware & notifiche
**Obiettivo sezione 11.10**: firma artefatti, verifica integrità, notifiche automatiche violazioni, test funzionalità sicurezza.
**Output**: *Secure Update Spec*; piano test integrità.
**Prompt**: "Scrivi specifica di aggiornata sicura (firmware/app): firma, verifica, canali, rollback, evidenze."
### 11.11 Confidenzialità & crittografia
**Obiettivo sezione 11.11**: uso della crittografia in transito e a riposo; gestione chiavi e sanificazione memorie condivise.
**Output**: tabella servizi→cifratura→algoritmi→policy.
**Prompt**: "Mappa servizi/componenti alle opzioni di cifratura e gestione chiavi."
### 11.12 Restricted Data Flow & segmentazione
**Obiettivo sezione 11.12**: politiche *deny‑by‑default*, whitelisting protocolli, conduits; note su autenticazione di rete dove applicabile.
**Output**: **matrice flussi** per conduit.
**Prompt**: "Genera una matrice flussi approvata per l’uso del componente in rete OT."
### 11.11 Timely Response to Events & monitoring
**Obiettivo sezione 11.11**: continuous monitoring lato componente e integrazione SOC; accesso programmato ai log.
**Output**: *Use case* minimi di detection.
**Prompt**: "Definisci 5 casi d’uso di detection su eventi del componente e relativo routing."
### 11.14 Resource Availability: DoS, backup, recovery, least functionality
**Obiettivo sezione 11.14**: protezioni anti‑DoS, gestione risorse, backup/recovery del sistema di controllo, **least functionality**.
**Output**: checklist hardening & backup.
**Prompt**: "Scrivi checklist hardening (servizi, risorse) e piano backup/recovery del componente."
### 11.15 Versioni, modelli, firmware & perimetro
**Obiettivo sezione 11.15**: dichiarare **range firmware** supportato, SKU coperti, funzioni abilitate per articolo/firmware; gestione variazioni.
**Output**: tabella SKU↔funzione/SL.
**Prompt**: "Compila tabella modelli/firmware/funzionalità/SL e note di perimetro."
### 11.16 Come leggere un documento di conformità 4‑2 del fornitore
**Obiettivo sezione 11.16**: guida di lettura: indice, tabelle CR, precondizioni, configurazioni, *NA motivati*, integrazione (C/S/N/N‑A), evidenze.
**Output**: **checklist di verifica** per gare/audit.
**Prompt**: "Crea una checklist di 20 punti per validare un documento di conformità 4‑2."
### 11.17 Product Security Evidence Package (PSEP) per componenti
**Obiettivo sezione 11.17**: indice standard: **CSP**, **Security Guide**, **Secure Config Guide**, **SBOM**, **VEX**, **Advisory**, certificati, report test.
**Output**: indice e template sezioni.
**Prompt**: "Componi un PSEP tipo per componenti OT con sezioni e segnaposto."
### 11.18 Flusso LLM‑assisted per parsing e normalizzazione
**Obiettivo sezione 11.18**: pipeline (*RAG*) per estrarre da PDF/schede vendor le voci CR/SL, configurazioni, firmware, modelli; validazione umana.
**Output**: architettura RAG, *prompt templates*, *guardrail*.
**Prompt**: "Definisci workflow LLM per estrarre/normalizzare CR/SL/precondizioni e generare CSP."
### 11.19 KPI per componenti & portfolio
**Obiettivo sezione 11.19**: % modelli con CSP completo; % release con **SBOM+VEX**; **Time‑to‑Advisory**; % build firmate; copertura CR per SL2/SL3.
**Output**: tabella KPI con formule, owner, target 12 mesi.
**Prompt**: "Definisci 8 KPI misurabili per la conformità 4‑2 del portfolio."
### 11.20 Rischi & anti‑pattern
**Obiettivo sezione 11.20**: evitare errori: precondizioni non dichiarate, claim non verificabili, log non esportabili, mancanza di rollback, *NA* senza motivazione.
**Output**: tabella anti‑pattern→controllo/azione correttiva.
**Prompt**: "Elenca 10 anti‑pattern tipici e le correzioni consigliate."
### 11.21 Template & deliverable
**Obiettivo sezione 11.21**: raccogliere i modelli: **CSP**, matrice **CR×SL×Integrazione**, **Secure Config Guide**, **matrice flussi**, **PSEP**, **checklist di verifica**.
**Output**: pacchetto template editabili.
**Prompt**: "Genera i template elencati (struttura, sezioni, segnaposto)."
--- 
## Checklist qualità (capitolo)
* [ ] Ogni sezione ha **Obiettivo/Output/Prompt/QC**.
* [ ] **CSP** completo con precondizioni e *NA* motivati.
* [ ] Matrice **CR×SL×(C|S|N|N‑A)** coerente con FR1–FR7.
* [ ] **Secure Config Guide** con parametri minimi (TLS, cert, password policy, NTP, syslog).
* [ ] Evidenze e **PSEP** indicizzati; versioni/firmware e SKU dichiarati.
* [ ] Flusso **LLM‑assisted** con guardrail e citazioni artefatti interni.
* [ ] Niente testi finiti: questo file resta **solo istruzioni**.