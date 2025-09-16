# Cap. 5 — Misure tecniche e organizzative (IEC 62443)
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
> **Obiettivo**: capitolo pratico‑operativo (4–6 facciate) sulle misure **tecniche e organizzative** coerenti con IEC 62443: identità/accessi/audit (**FR1–FR2**), hardening & configuration mgmt (**FR3**), logging & monitoring (**FR6**), backup/restore (**FR7**), rete/segregazione/DMZ & accesso remoto (**FR5**), vulnerability & patch mgmt con **inventory** e **SBOM** (richiami a **‑2‑3**, **‑4‑1**, **‑4‑2**), e **metriche/KPI**.
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
## 5.1 Identità, accessi e audit (**FR1 — IAC; FR2 — UC**)
**Obiettivo sezione 5.1**
Gestire **identità** (chi sei), **autorizzazioni** (cosa puoi fare) e **audit** (traccia) nell’OT.
**Contenuti da coprire**
* **Account nominali** (no *shared*), **least privilege**, **MFA** (autenticazione a più fattori) per conduits remoti e operazioni critiche.
* **RBAC** (controllo accessi basato su ruoli) separando **ruoli OT** da **ruoli IT**.
* **Privileged Access** via **jump host/broker**; **time‑bound approval**, **two‑person rule** per attività critiche.
* **Service account**: uso minimo, rotazione segreta, vault.
* **Audit trail** centralizzato (chi, cosa, quando) e **session recording** per accessi remoti.
* Gestione **break‑glass** (emergenza) con post‑review.
**Output** 
* Policy **Identity & Access OT**; matrice **ruolo→permessi**; flusso approvazione; registro audit.
#### Prompt operativo
“Scrivi 12–14 righe su identità, autorizzazioni e audit in OT (FR1‑FR2): account nominali, RBAC, MFA, privilegi tramite broker, session recording e break‑glass con post‑review.”
*Regole fisse per questo prompt*: definisci acronimi alla prima occorrenza; parafrasa i tecnicismi; inserisci box **Per i ruoli**; chiudi con **takeaway** e **avvertenza safety**; mappa a **FR1/FR2** e **SL‑Target**.
**Figure/Template (segnaposto)**
* **Figura 5.1**: Architettura **privileged access** con broker.
* **Tabella 5.1**: Matrice **ruolo→permessi** (RBAC) per ruoli OT.
--- 
## 5.2 Hardening & Configuration Management (**FR3 — SI**)
**Obiettivo sezione 5.2**
Definire **baseline di hardening** e controlli di **configurazione** per ridurre la superficie d’attacco OT.
**Contenuti da coprire**
* **Baseline** per sistemi operativi OT, HMI/engineering, PLC‑gateway, server dell’impianto.
* Disabilitare servizi/porte **non necessari**; impostare criteri **secure‑by‑default**.
* **Configurazioni versionate** (repository), **golden image**, controllo **change** con approvazione (‑2‑1).
* **Application allow‑listing** (solo software autorizzato) ove fattibile in OT.
* **Backup** delle configurazioni prima/after change; **rollback plan**.
* Check di **integrità** (hash/firma) di firmware/immagini.
**Output** 
* Standard di hardening; **checklist** per tipo di asset; repository versionato delle configurazioni.
#### Prompt operativo
“Redigi 10–12 righe su hardening e gestione configurazioni (FR3): baseline per asset OT, servizi minimi, versioning, golden image, allow‑listing e piani di rollback.”
*Regole fisse per questo prompt*: come sopra.
**Figure/Template (segnaposto)**
* **Tabella 5.2**: Checklist **hardening per asset** (HMI, server, gateway, ecc.).
* **Figura 5.2**: Flusso **change→backup→deploy→rollback**.
--- 
## 5.3 Logging & Monitoring (**FR6 — TRE**)
**Obiettivo sezione 5.3**
Raccogliere **log/telemetria** e attivare **use case** di rilevazione/risposta agli eventi OT.
**Contenuti da coprire**
* Sorgenti: **OT firewall**, switch, **IDS OT**, HMI/engineering, server OT, sistemi AV/EDR compatibili OT.
* **Centralizzazione** log, **retention** (es. > 90 gg), orari sincronizzati (**NTP**).
* Use case minimi: accessi remoti, cambi configurazione, protocolli OT **non whitelisted**, perdita comunicazioni, allarmi safety.
* **Runbook** di triage/risposta; integrazione con **SOC** (Security Operations Center).
* **Test** periodici e tuning dei falsi positivi.
**Output** 
* Piano **logging & monitoring**; elenco use case e runbook; cruscotto **KPI** (MTTD).
#### Prompt operativo
“Scrivi 10–12 righe su logging/monitoring (FR6): sorgenti log OT, centralizzazione, use case minimi e runbook con integrazione SOC.”
*Regole fisse per questo prompt*: come sopra.
**Figure/Template (segnaposto)**
* **Figura 5.3**: Flusso raccolta log → analisi → risposta.
* **Tabella 5.3**: Use case minimi e log richiesti.
--- 
## 5.4 Backup & Restore (**FR7 — RA**)
**Obiettivo sezione 5.4**
Garantire **disponibilità** e **recupero** rapido: backup affidabili e **test di ripristino**.
**Contenuti da coprire**
* Politiche **RPO/RTO** per asset OT critici; priorità per sistemi di controllo e ricette/processi.
* **3‑2‑1** (3 copie, 2 media, 1 **offline/offsite**); cifratura e gestione chiavi.
* **Test** di restore pianificati (es. mensile/trim.) con evidenze; **bare‑metal** dove necessario.
* **Isolamento** dei repository di backup dall’IT; segregazione credenziali.
**Output** 
* Policy backup/restore, **runbook di ripristino**, registro test e risultati.
#### Prompt operativo
“Redigi 8–10 righe su backup/restore (FR7): RPO/RTO, regola 3‑2‑1, test periodici, isolamento e runbook di ripristino.”
*Regole fisse per questo prompt*: come sopra.
**Figure/Template (segnaposto)**
* **Figura 5.4**: Architettura backup OT isolata.
* **Template**: Registro test di ripristino.
--- 
## 5.5 Rete, segregazione & accesso remoto (**FR5 — RDF**)
**Obiettivo sezione 5.5**
Implementare **politiche di rete** e **segmentazione**: **Zone & Conduits**, **DMZ**, accessi remoti **brokered**.
**Contenuti da coprire**
* **Zone** e livelli (cell/area/impianto); conduits con **whitelisting** di protocolli/porte/direzioni.
* **DMZ** industriale come cuscinetto **IT/OT**; servizi intermedi (jump host, proxy, broker).
* **Flussi** consentiti documentati, **deny‑by‑default**, **one‑way** dove possibile.
* **Remote access**: MFA, approvazioni **time‑bound**, **session recording**, account temporanei.
* **Test** periodici delle regole e **riconciliazione** con i need‑to‑operate.
**Output** 
* Diagramma rete OT/DMZ; policy conduits; **matrice flussi** approvata.
#### Prompt operativo
“Scrivi 12–14 righe su rete/segregazione (FR5): zone, conduits, DMZ, flussi consentiti, remote access brokered e test periodici delle regole.”
*Regole fisse per questo prompt*: come sopra.
**Figure/Template (segnaposto)**
* **Figura 5.5**: Schema Zone & Conduits con DMZ.
* **Tabella 5.5**: Matrice flussi consentiti per conduit.
--- 
## 5.6 Vulnerability & Patch Management + **Inventory & SBOM** (richiami **‑2‑3**, **‑4‑1**, **‑4‑2**)
**Obiettivo sezione 5.6**
Gestire **vulnerabilità** e **aggiornamenti** in OT, basandosi su **inventario** e **SBOM**.
**Contenuti da coprire**
* **Inventario** asset (modello/versione/firmware/owner/criticità); auto‑discovery **non intrusivo** ove possibile.
* Fonti vuln: **CVE**, advisories vendor/**PSIRT**, feed ICS‑CERT; correlazione con **SBOM**.
* **Prioritizzazione** risk‑based (CVSS × impatto OT × esposizione); **OT‑feasibility**.
* **SLA** patch (CRIT/HIGH/Med/Low); **staging** e test; **compensating controls** per eccezioni.
* **Secure update**: pacchetti firmati, canali sicuri, finestre di fermo.
* **Registro** vuln/patch ed **evidenze** di esecuzione.
**Output** 
* Inventario asset e **SBOM** per impianto; piano patch/vuln; registro eccezioni/compensazioni.
#### Prompt operativo
“Redigi 12–14 righe su vuln & patch mgmt in OT (‑2‑3): inventario e SBOM, priorità risk‑based, SLA, staging/test, secure update ed evidenze.”
*Regole fisse per questo prompt*: come sopra.
**Figure/Template (segnaposto)**
* **Tabella 5.6**: Schema inventario minimo + campi SBOM.
* **Figura 5.6**: Flusso vuln → priorità → test → deploy → evidenze.
--- 
## 5.7 Metriche & KPI
**Obiettivo sezione 5.7**
Misurare **adozione** ed **efficacia** delle misure.
**Esempi di KPI**
* % **asset inventariati/classificati**; % zone con **SL‑Target** formalizzati.
* **Patch coverage** per criticità; **TTR** (Time‑To‑Remediate) mediano; n. **eccezioni** attive.
* % **sessioni remote** con **MFA** e **session recording**; tempo medio di approvazione.
* **MTTD/MTTR** eventi OT; % **backup/restore** testati; **success rate** dei restore.
* % conduits con **policy** aggiornate e testate.
**Output** 
* **Cruscotto KPI** con trend mensili e soglie obiettivo.
#### Prompt operativo
“Scrivi 8–10 righe sulle metriche chiave per Cap. 5, indicando come raccoglierle senza esporre dati sensibili.”
*Regole fisse per questo prompt*: come sopra.
--- 
## 5.8 Artefatti & Evidenze (deliverable)
* Policy **Identity & Access OT**; matrice **ruolo→permessi**; registro audit.
* Standard di **hardening**; **checklist** per asset; repository configurazioni versionato.
* Piano **logging & monitoring**; use case e runbook; report **KPI** (MTTD/MTTR).
* Policy **backup/restore**, **runbook** e registro test.
* Diagramma rete **Zone & Conduits** con **DMZ**; matrice flussi approvata.
* Inventario asset + **SBOM**; piano **patch/vuln** con registro eccezioni/compensazioni.
--- 
## 5.9 Figure & Template (riepilogo segnaposto)
* Figura 5.1 — Architettura **privileged access** con broker.
* Tabella 5.1 — Matrice **ruolo→permessi** (RBAC).
* Tabella 5.2 — Checklist **hardening per asset**.
* Figura 5.2 — Flusso **change→backup→deploy→rollback**.
* Figura 5.3 — Flusso log → analisi → risposta.
* Tabella 5.3 — Use case minimi e log richiesti.
* Figura 5.4 — Architettura backup OT isolata.
* Template — Registro test di ripristino.
* Figura 5.5 — Schema **Zone & Conduits** con DMZ.
* Tabella 5.5 — Matrice flussi per conduit.
* Tabella 5.6 — Inventario minimo + **SBOM**.
* Figura 5.6 — Flusso vuln → priorità → test → deploy → evidenze.
* Template — Cruscotto KPI.
--- 
## Glossario minimo (Cap. 5)
* **IAC/UC**: controllo di **Identificazione & Autenticazione** / **Uso** (FR1/FR2).
* **SI**: **System Integrity** (FR3).
* **TRE**: **Timely Response to Events** (FR6).
* **RA**: **Resource Availability** (FR7).
* **SBOM**: distinta componenti software; **PSIRT**: team gestione vulnerabilità di prodotto.
* **RPO/RTO**: obiettivi di punto/tempo di ripristino.
* **RBAC**: controllo accessi basato sui ruoli.
* **NTP**: sincronizzazione oraria per sistemi/CSI.
* **Allow‑listing**: esecuzione consentita **solo** per software/servizi approvati.
--- 
## Checklist finale (QA redazionale — Cap. 5)
* [ ] Acronomi spiegati e tecnicismi parafrasati.
* [ ] Box **Per i ruoli** in ogni sezione.
* [ ] Mapping chiaro a **FR1–FR7** e **SL‑Target** realistici.
* [ ] Figure/template elencati e coerenti.
* [ ] Deliverable/Artefatti specificati.
* [ ] Takeaway + **avvertenza safety** per sezione.
* [ ] Tono pratico‑operativo, vendor‑neutral.
### sys_source https://chatgpt.com/c/68b73c35-0298-8328-a7b9-76f473241645