# Cap. 13 — Canvas (Istruzioni tecniche) — v1.0
# Cap. 13 — Service Providers OT (servizi gestiti, integrazione, compliance)
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
**Regola d’oro**: ordine narrativo allineato al **ciclo di vita del servizio** (onboarding→erogazione→reporting→offboarding); profondità tecnica su **Operational/Engineering/Security**.
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
> **Idea chiave**: i **Service Provider** (SP) sono l’estensione operativa dell’Asset Owner nell’OT: progettano, integrano, gestiscono e dimostrano la sicurezza **end‑to‑end**. Questo capitolo definisce *service catalog, RACI, SLA/SLO/KPI, procedure e pacchetti evidenze* in coerenza con IEC **62443‑2‑x/3‑x/4‑2**, con supporto **LLM** per runbook, RFI/RFP e reporting.
> **Obiettivo**: capitolo operativo
    * Definire un **catalogo servizi** OT coerente con IEC 62443 (progettazione, messa in esercizio, servizi gestiti, SOC, IR, compliance).
    * Stabilire **RACI**, **SLA/SLO/KPI**, **procedure** e **pacchetti evidenze** per dimostrare efficacia e conformità.
    * Integrare **LLM** per knowledge base, runbook, risposte RFI/RFP e reporting, con **guardrail**.
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
**Target (etichette audience)**
* **Primari**: `ServiceProvider:Executive` | `ServiceProvider:Operational` | `ServiceProvider:Security`
* **Co‑primari**: `ServiceProvider:Engineering` | `AssetOwner:Operational`
* **Secondari**: `ServiceProvider:Legal` | `AssetOwner:Executive` | `OEM:Engineering`
**Obiettivi per audience (1 riga)**
* `SP:Executive` → definire **service catalog**, marginalità/TCO, SLA e rischi.
* `SP:Operational` → eseguire **SOP** (patch, backup, change, accessi remoti) con evidenze.
* `SP:Security` → detection/use case FR6, runbook IR, integrazione SIEM/IDS OT.
* `SP:Engineering` → design rete/DMZ/conduits, staging, automatismi CI/CD di configurazione.
* `SP:Legal` → contratti/NIS2/DPA, data ownership, retention, sub‑processor.
**Taglio**: *board‑ready* per Executive; *tecnico‑operativo* per Operational/Engineering/Security; *compliance‑oriented* per Legal.
**Livello tecnico (1–5)**: 3/5 (Executive 2/5; Security/Engineering 4/5).
**Tempo lettura target**: 20–25 min.
--- 
## Struttura delle sezioni
### 13.1 Executive brief — Il ruolo dei Service Provider nell’OT
**Obiettivo sezione 13.1**: in 1 pagina per `SP:Executive`, illustrare come i servizi 62443 riducono tempi, rischi e costi per AO, con proposta di valore e roadmap 90/180/365.
**Output**: decision memo con 3 KPI e SLO iniziali.
**Prompt**: "Scrivi 1 pagina board‑ready sul valore dei servizi OT (design, managed services, SOC/IR, compliance)."
**QC**: KPI/SLO presenti; rischi chiave; roadmap tri‑fase.
### 13.2 Service catalog & RACI (design→gestione)
**Obiettivo sezione 13.2**: definire catalogo servizi: **Assessment 62443**, **Design zone/conduits/DMZ**, **Integration**, **Accessi remoti/PAM**, **Patch/Vuln as a Service**, **Backup/DR**, **SOC OT**, **IR**, **Compliance/NIS2**, **Reporting**.
**Output**: lista servizi con **descrizione, input, output, RACI** (AO/OEM/SP), evidenze minime.
**Prompt**: "Compila service catalog con descrizione→input→output→RACI e evidenze per ogni voce."
### 13.3 Onboarding & site readiness
**Obiettivo sezione 13.3**: questionario onboarding (inventario, versioni, flussi, finestre, safety), pre‑requisiti (DMZ, NTP, syslog, broker remoto), *data access* e DPA.
**Output**: **Onboarding pack** (questionario, check di readiness, piano di transizione).
**Prompt**: "Genera questionario onboarding + checklist readiness + piano transizione iniziale."
### 13.4 Accessi remoti & PAM (broker, MFA, recording)
**Obiettivo sezione 13.4**: definire architettura **broker/jump**, **MFA**, **time‑bound**, **session recording**, approvazioni su ticket, evidenze di chiusura.
**Output**: *Remote Access Playbook* (SOP + schema logico).
**Prompt**: "Scrivi playbook accessi remoti (broker, MFA, approvi, recording, evidenze)."
**QC**: FR1/FR2/FR6 coperti; niente accessi diretti.
### 13.5 Patch & Vulnerability Management as a Service (‑2‑3)
**Obiettivo sezione 13.5**: processo: discovery→prioritizzazione (**CVE/CVSS OT‑aware**)→staging→rollout→evidenze→KPI.
**Output**: calendario patch, *exception register*, report copertura, VEX quando possibile.
**Prompt**: "Definisci servizio Patch/Vuln: SLA, staging, finestre, rollback, report KPI."
### 13.6 Monitoring & SOC OT (FR6)
**Obiettivo sezione 13.6**: *use case* minimi (accessi remoti, change, protocolli anomali), centralizzazione log, integrazione **IDS OT**, playbook triage, *hunting* periodico.
**Output**: elenco *use case*, schema routing log, runbook SOC.
**Prompt**: "Elenca use case FR6, integra IDS OT, scrivi runbook triage e reporting."
### 13.7 Backup, restore & DR as a Service (FR7)
**Obiettivo sezione 13.7**: politica 3‑2‑1, backup offline, test di ripristino, RPO/RTO per asset industriali.
**Output**: piano backup/restore per zona, registro test, KPI % restore OK.
**Prompt**: "Stendi policy backup/restore/DR per impianti OT e schema prove periodiche."
### 13.8 Change & configuration management (staging, versioning, golden image)
**Obiettivo sezione 13.8**: processi change con staging e rollback, **repository config** (versioning), **golden image** per reinstalli rapidi, controllo *config‑drift*.
**Output**: SOP change, repo/branching model, check *drift* mensile.
**Prompt**: "Definisci change mgmt con staging/rollback, repo config, golden image e controllo drift."
### 13.9 Incident response & escalation (IR playbook)
**Obiettivo sezione 13.9**: IR end‑to‑end: ruoli,
**escalation matrix**, comunicazioni, criteri di isolamento, forensics limitata in OT, *post‑incident review*.
**Output**: **IR playbook** e *communication plan* (interno/cliente/autorità).
**Prompt**: "Scrivi IR playbook con escalation, comms, isolamento sicuro, evidenze e post‑mortem."
### 13.10 Compliance & NIS2 per SP
**Obiettivo sezione 13.10**: mappare obblighi del fornitore di servizi (governance, misure tecniche, **notifiche**, supply chain, **DPA**), crosswalk NIS2⇄62443.
**Output**: **Compliance map** e modelli di notifica.
**Prompt**: "Crea crosswalk NIS2⇄62443 per SP e modelli di notifica incidenti."
### 13.11 PSIRT liaison & advisory management
**Obiettivo sezione 13.11**: canali con **OEM PSIRT**, intake advisory, valutazione impatto sugli impianti serviti, **Time‑to‑Advisory** al cliente.
**Output**: SOP ricezione/valutazione advisory, registro stato.
**Prompt**: "Definisci processo PSIRT liaison (intake→analisi→comunicazione→chiusura) con KPI."
### 13.12 SBOM/VEX ingestion & asset impact
**Obiettivo sezione 13.12**: ingestione **SBOM** dei vendor, correlazione **CVE** con inventario asset, generazione **VEX** lato servizio quando applicabile.
**Output**: flusso SBOM→inventario→priorità remediation.
**Prompt**: "Disegna flusso SBOM/VEX: come correlare componenti→impianti e priorità."
### 13.13 Secure update orchestration (firmware/app)
**Obiettivo sezione 13.13**: orchestrare aggiornamenti **firmati** con finestra, staging e rollback coordinati tra AO/OEM/SP.
**Output**: *Update plan* e *evidence pack*.
**Prompt**: "Scrivi orchestrazione secure update multi‑stadio con evidenze richieste."
### 13.14 KPI, SLO, SLA & reporting
**Obiettivo sezione 13.14**: definire **KPI** (patch coverage, MTTD/MTTR, % sessioni MFA+recording, % restore OK, Time‑to‑Advisory, change success rate), **SLO/SLA**, report mensile.
**Output**: tabella KPI con formule/soglie, schema report.
**Prompt**: "Definisci KPI/SLO/SLA e modello di report per cliente OT."
### 13.15 LLM‑assisted operations (RAG, runbook, tickets)
**Obiettivo sezione 13.15**: knowledge base indicizzata (policy/procedure/KB), *prompt template*, risposta RFI/RFP, generazione evidenze e *QA* su runbook.
**Output**: architettura RAG, prompt catalog, guardrail (read‑only, logging).
**Prompt**: "Definisci RAG per SP e 6 prompt (RFI, runbook, report, advisory, SBOM, IR)."
### 13.16 Contratti, DPA & data governance
**Obiettivo sezione 13.16**: clausole: ambito, livelli di servizio, **data ownership**, portabilità, retention, sub‑processor, **penali**, exit/offboarding.
**Output**: **Contract checklist** e **DPA template**.
**Prompt**: "Crea checklist contrattuale e DPA template per servizi OT."
### 13.17 Handover & offboarding
**Obiettivo sezione 13.17**: riconsegna account/segreti, export configurazioni/evidenze, dismissione accessi e revoche, *knowledge transfer*.
**Output**: piano handover/offboarding e registro consegne.
**Prompt**: "Stendi piano di handover/offboarding con elenco consegne e verifiche."
### 13.18 Rischi & anti‑pattern
**Obiettivo sezione 13.18**: evitare errori: accessi diretti, assenza staging, log non consegnati, patch senza rollback, mancanza di *exception register*, confusione ruoli.
**Output**: tabella anti‑pattern→controlli/procedure correttive.
**Prompt**: "Elenca 12 anti‑pattern tipici dei servizi OT e rimedi 62443."
### 13.19 Template & deliverable
**Obiettivo sezione 13.19**: pacchetto modelli riusabili: **Service Catalog**, **RACI**, **Onboarding pack**, **Remote Access Playbook**, **Patch/Vuln SOP**, **Backup/DR SOP**, **Runbook SOC/IR**, **Compliance map**, **PSIRT liaison SOP**, **Update plan**, **Report KPI**, **Contract checklist/DPA**, **Handover plan**.
**Output**: template editabili.
**Prompt**: "Genera i template elencati (struttura, sezioni, segnaposto)."
--- 
## Checklist qualità (capitolo)
* [ ] Ogni sezione ha **Obiettivo/Output/Prompt/QC**.
* [ ] **Service catalog** completo con RACI e evidenze minime.
* [ ] **Onboarding pack** e **readiness** (DMZ, NTP, syslog, broker remoto) definiti.
* [ ] Accessi remoti con **broker/MFA/recording** e prove di evidenze.
* [ ] Patch/Vuln con **staging/rollback** e KPI; **exception register** gestito.
* [ ] SOC OT: *use case* FR6, integrazione IDS, routing log, runbook triage.
* [ ] Backup/DR con test di ripristino e RPO/RTO dichiarati.
* [ ] IR playbook con **escalation matrix** e *communication plan*.
* [ ] Compliance/NIS2 mappata; modelli di notifica; DPA/contratti.
* [ ] **LLM** con guardrail e citazioni artefatti interni.
* [ ] Niente testi finiti: questo file resta **solo istruzioni**.