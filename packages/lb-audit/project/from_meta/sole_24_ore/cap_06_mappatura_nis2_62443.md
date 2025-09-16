# Cap. 6 — Mappatura pratica **NIS2 ⇄ IEC 62443**
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
> **Obiettivo**: capitolo operativo (≈2 facciate) che offra una **tabella di mappatura** tra requisiti NIS2 e controlli/parti IEC 62443, e chiarisca **cosa copre la 62443** e **cosa serve in più** per NIS2 (governance, notifiche, supply chain, reporting).
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
## 6.1 NIS2 in breve (contesto e perimetro)
**Cosa copre**
Sintesi dei **settori** e dei **soggetti** (es. *entità essenziali* e *importanti*), aree di obbligo: **governance/gestione del rischio**, **misure tecniche/organizzative**, **gestione supply chain**, **business continuity**, **reporting/notification** verso autorità/CSIRT (Computer Security Incident Response Team).
**Nota**: tempi/forme di notifica e dettagli procedurali derivano dal **recepimento nazionale**; prevedere segnaposto “X ore/giorni” da confermare.
#### Prompt operativo
“Scrivi 8–10 righe che riassumano NIS2 per il lettore OT: chi è coinvolto, quali macro‑obblighi, e perché una base IEC 62443 accelera l’adeguamento.”
*Regole fisse per questo prompt*: definisci acronimi alla prima occorrenza; parafrasa i tecnicismi; inserisci box **Per i ruoli**; chiudi con **takeaway** e **avvertenza safety**.
--- 
## 6.2 **Tabella di mappatura NIS2 ⇄ IEC 62443**
**Obiettivo sezione 6.2**
Fornire una **crosswalk** pratica tra obblighi NIS2 e controlli/parti IEC 62443, con evidenze richieste.
**Struttura tabella (modello)**
| Requisito NIS2 (riassunto)                      | Riferimento 62443                          | Evidenze/Deliverable                                        | Ruolo principale  | Gap/Note                                           |
| ----------------------------------------------- | ------------------------------------------ | ----------------------------------------------------------- | ----------------- | -------------------------------------------------- |
| Governance & **risk management**                | 2‑1 (programma), 3‑2 (risk & **SL‑T**)     | Security Policy OT; registro rischi; **SL‑Target** per zona | Asset Owner       | Allineare criteri rischio al recepimento nazionale |
| **Incident handling** & **business continuity** | 2‑1; 3‑3 (FR6/FR7)                         | Runbook IR; piani **BC/DR**; test esercitazioni             | Asset Owner / SOC | Integrare requisiti di **notifica** NIS2           |
| **Supply chain security**                       | 2‑4 (service), 4‑1 (SDL), 4‑2 (componente) | Clausole contrattuali; **SBOM**; PSIRT; qualifica fornitori | Owner / OEM / SP  | Due diligence fornitori critici                    |
| **Logging/monitoring**                          | 3‑3 (FR6), 2‑1                             | Piano logging; use case; evidenze **SOC**                   | Owner / SI        | Retention conforme                                 |
| **Accessi remoti** sicuri                       | 2‑4; 3‑3 (FR1/FR2/FR5)                     | Broker, **MFA**, session recording; policy approvazioni     | Owner / SP        | Tracciabilità completa                             |
| **Patch/vuln mgmt**                             | 2‑3; 4‑1/4‑2                               | Inventario, calendario patch, registro eccezioni            | Owner / SI / OEM  | Finestra OT‑feasible                               |
| **Reporting/notifiche** a autorità/CSIRT        | 2‑1 (processo), 3‑3 (FR6)                  | Procedure e **template** di notifica; registro eventi       | Owner             | Tempistiche e canali nazionali                     |
#### Prompt operativo
“Compila la tabella NIS2 ⇄ IEC 62443 usando il modello: per ogni obbligo NIS2 indica la parte 62443 che aiuta a soddisfarlo, le **evidenze** richieste e il **ruolo** responsabile; annota eventuali **gap** (da colmare con processi/documenti NIS2).”
*Regole fisse per questo prompt*: come sopra.
--- 
## 6.3 **Cosa copre la 62443** e **cosa serve in più** per NIS2
**Coperto (principalmente) dalla 62443**
* **Programma OT** (2‑1), **risk & SL‑T** (3‑2), **requisiti di sistema** (3‑3, FR1–FR7).
* **Service providers** (2‑4) e **processi** di **patch/vuln** (2‑3).
* **Sicurezza prodotto**: **SDL** (4‑1), **requisiti di componente** (4‑2), **SBOM/PSIRT**.
**Richiesto in più per NIS2** (integrare alla 62443)
* **Notifiche di incidente** a **autorità/CSIRT** con **tempistiche** definite dal recepimento nazionale; **template** e runbook comunicazione.
* **Governance** formale su ruoli e responsabilità NIS2, **risk appetite** e reporting al vertice.
* **Supply chain due diligence** e **reporting**: criteri di qualificazione, monitoraggio continuo e clausole contrattuali specifiche NIS2.
* **Business continuity** a livello enterprise e **crisis management** (integrazione con OT).
* **Documentazione e audit trail** specifici per conformità e verifiche.
#### Prompt operativo
“Scrivi 10–12 righe che distinguano tra coperture 62443 e requisiti aggiuntivi NIS2: elenca cosa aggiungere (notifiche, governance, supply chain, BC/crisis, audit) e dove attingere alle parti 62443 per i controlli tecnici.”
*Regole fisse per questo prompt*: come sopra.
--- 
## 6.4 Processo operativo di adeguamento (combina NIS2 + 62443)
**Passi consigliati**
1. **Applicabilità**: verificare se l’organizzazione rientra tra *entità essenziali/importanti*; perimetro impianti/servizi.
2. **Crosswalk**: compilare la **tabella 6.2** e segnare i **gap**.
3. **Governance**: nominare responsabili, definire policy di notifica, tenere un **registro incidenti**.
4. **Supply chain**: aggiornare capitolati e **qualifica fornitori** (‑2‑4, 4‑1/4‑2) e definire flussi **SBOM/PSIRT**.
5. **Runbook di notifica**: procedure e **template** verso autorità/CSIRT, con **SLA**.
6. **Evidenze & KPI**: allestire raccolta documentale e cruscotto.
#### Prompt operativo
“Redigi 8–10 righe sul processo operativo di adeguamento: come usare la tabella 6.2 per il gap analysis, definire governance/notifiche e attivare supply chain & KPI.”
*Regole fisse per questo prompt*: come sopra.
--- 
## 6.5 Metriche & KPI (focus NIS2)
**Esempi** 
* % incidenti **notificati entro SLA**; **tempo alla prima notifica**; % runbook aggiornati.
* % fornitori **qualificati** rispetto ai criteri NIS2; % prodotti con **SBOM** ricevuto; **tempo di triage PSIRT**.
* % controlli 62443 implementati vs piano; **copertura patch** per criticità; **MTTD/MTTR** OT.
#### Prompt operativo
“Indica 5–7 KPI specifici per NIS2 e come raccoglierli senza dati sensibili (fonti: ticket, log, registro incidenti, audit).”
*Regole fisse per questo prompt*: come sopra.
--- 
## 6.6 Artefatti & Evidenze (deliverable)
* **Tabella di mappatura** NIS2 ⇄ IEC 62443 aggiornata.
* **Policy di notifica** con **template** e canali verso autorità/CSIRT.
* **Registro incidenti** e **registro rischi**.
* Clausole **procurement** (‑2‑4) e **qualifica fornitori**; SBOM/PSIRT integrati.
* Prove di **esercitazioni** (IR/BC) e verbali; **audit trail**.
--- 
## 6.7 Figure & Template (segnaposto)
* **Tabella 6.2** — Crosswalk **NIS2 ⇄ IEC 62443**.
* **Figura 6.1** — Flusso di **notifica incidenti** verso autorità/CSIRT con SLA.
* **Template** — Registro incidenti; Policy di notifica; Scheda qualifica fornitore (NIS2‑aware).
--- 
## Glossario minimo (Cap. 6)
* **NIS2**: Direttiva UE sulla **sicurezza delle reti e dei sistemi informativi** (nuova versione).
* **CSIRT**: **Computer Security Incident Response Team** nazionale/settoriale.
* **Entità essenziali/importanti**: categorie di soggetti obbligati (definizioni nel recepimento nazionale).
* **BC/DR**: **Business Continuity / Disaster Recovery**.
* **CVD/PSIRT**: **Coordinated Vulnerability Disclosure** / team per vulnerabilità di prodotto.
--- 
## Checklist finale (QA redazionale — Cap. 6)
* [ ] Acronomi spiegati e tecnicismi parafrasati.
* [ ] **Tabella di mappatura** completa e coerente.
* [ ] Distinzione chiara tra **coperto da 62443** e **extra NIS2**.
* [ ] Runbook/Template **notifica incidenti** presenti.
* [ ] Box **Per i ruoli** in ogni sezione; Takeaway + **avvertenza safety**.
* [ ] Tono pratico‑operativo, vendor‑neutral.
### sys_source https://chatgpt.com/c/68b73c35-0298-8328-a7b9-76f473241645