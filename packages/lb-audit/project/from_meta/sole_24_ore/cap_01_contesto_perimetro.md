# Cap. 1 — Contesto, perimetro e come usare la mini guida (IEC 62443)
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
> **Obiettivo**: capitolo introduttivo (2 facciate) per definire contesto, perimetro, destinatari, cosa **non** è la 62443, output attesi e modalità d’uso della mini guida.
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
### 1.1 Scopo e perimetro
**Cosa includere (OT/IACS)**
PLC, DCS/SCADA, HMI, workstation di ingegneria, historian, server OT (dominio, applicativi), apparati rete industriale, VPN/remote access, sistemi di backup/restore, virtualizzazione on‑prem OT, interfacce con MES/ERP.
**Cosa resta fuori (ma con interfacce)**
IT office (posta, collaboration), endpoint non usati in OT, applicazioni corporate irrilevanti per l’operatività.
**Confine IT/OT e conduits**
Descrivere la **DMZ** (zona cuscinetto), i **conduits** (canali controllati) e le **trust boundaries**.
#### Prompt operativo
“Scrivi 8–12 righe su scopo e perimetro del Cap. 1, chiarendo confine IT/OT, DMZ e conduits, con esempi di asset OT e interfacce.”
*Regole fisse per questo prompt*: definisci acronimi alla prima occorrenza; aggiungi parafrasi semplice ai tecnicismi; inserisci box **Per i ruoli**; chiudi con **takeaway** e **avvertenza safety**; mappa a **FR/SL** dove pertinente.
--- 
### 1.2 A chi serve (pubblico)
**Segmenti destinatari**
* **PMI/Asset Owner**: impostare un **programma di sicurezza OT** essenziale ma efficace.
* **OEM/Product Supplier**: allineare **SDL 62443‑4‑1** e capacità **‑4‑2**; definire condizioni d’uso sicure.
* **Service Provider/System Integrator**: operare secondo **‑2‑4**, con accessi remoti tracciati e procedure concordate.
#### Prompt operativo
“Descrivi 10–12 righe di ‘a chi serve’, con value proposition distinta per PMI/Owner, OEM e Service Provider, includendo esempi di risultati attesi.”
*Regole fisse per questo prompt*: come sopra.
--- 
### 1.3 Cosa **NON** è la IEC 62443
* Non è **solo IT**: tratta esigenze OT (disponibilità, tempi reali, safety).
* Non è **un prodotto**: nessun componente singolo “rende conforme” l’impianto.
* Non è **solo una checklist**: richiede **processi** e **ruoli** (‑2‑1).
* Non è **zero incidenti**: riduce il rischio in modo misurabile.
* Non è **compliance legale automatica**: aiuta a mappare (es. NIS2), ma servono governance e reporting.
#### Prompt operativo
“Scrivi un box ‘cosa NON è la 62443’ in 6–8 righe con esempi pratici e correzione dei miti ricorrenti.”
*Regole fisse per questo prompt*: come sopra.
--- 
### 1.4 Come usare la mini guida
La mini guida è concepita come strumento Executive: descrive con chiarezza i rischi, i benefici e le decisioni chiave da prendere per impostare un programma di sicurezza OT. Il documento non fornisce istruzioni operative passo-passo, ma illustra i concetti fondamentali e indica i percorsi decisionali. Gli approfondimenti tecnici sono limitati e hanno valore introduttivo; per la loro applicazione concreta occorre coinvolgere figure specialistiche interne o partner qualificati. La guida supporta tre livelli di lettura: **Executive track** (principale), orientata a chi decide; **OEM/Product Supplier track**, con cenni su sviluppo sicuro e conformità; **Service Provider/System Integrator track**, con riferimenti a modalità di erogazione e responsabilità. In ogni caso, il documento non sostituisce manuali operativi, ma serve da quadro di riferimento per allineare linguaggio, priorità e obiettivi.
**Per i ruoli**
* **PMI/Asset Owner**: visione chiara su rischi e priorità.
* **OEM/Product Supplier**: riferimenti al percorso di sviluppo sicuro.
* **Service Provider/System Integrator**: chiarimenti sul perimetro di responsabilità.
**Takeaway** 
* La guida è descrittiva e orientata al decision making.
* Non è un manuale operativo.
* Gli approfondimenti tecnici richiedono supporto specialistico.
**Avvertenza safety**
Interpretare il documento come guida operativa potrebbe portare a implementazioni parziali o scorrette, con impatti sulla sicurezza degli impianti.
**Approccio step‑by‑step**
1. Inventario & perimetro. 2) Rischio & **SL‑Target**. 3) Architettura (zone, conduits, DMZ, identità). 4) Piano misure (tecniche+organizzative). 5) Validazione/verifica (**‑3‑3**). 6) Operazioni & miglioramento.
#### Prompt operativo
*Regole fisse per questo prompt*: come sopra.
--- 
### 1.5 Output attesi dal lettore (deliverable)
* **Mappa dei rischi OT** per zona (asset critici, minacce, impatti, rischio residuo).
* **SL‑Target per zona** (FR1–FR7) coerenti con vincoli operativi.
* **Piano misure** prioritizzato (costo/beneficio, owner, prerequisiti, finestre di downtime).
* **Roadmap 30/90/180+** con quick wins (remoto, backup, logging), interventi strutturali (segmentazione, identity OT) e iniziative di programma.
**Metriche di successo**
Esempi: % asset inventariati; % sessioni remote con **MFA**; copertura patch; **MTTD/MTTR**; % zone con SL‑Target formalizzati.
#### Prompt operativo
“Scrivi 8–10 righe sugli output attesi e 4–5 metriche chiave per misurare il progresso senza dati sensibili.”
*Regole fisse per questo prompt*: come sopra.
--- 
### 1.6 Figure e template (segnaposto)
* **Schema Zone & Conduits** (con **DMZ**) — figura 1.
* **Tabella FR × SL** — figura 2.
* **RACI essenziale** (ruoli/responsabilità) — tabella 1.
* **Template**: inventario asset, matrice **SL‑Target**, piano patch/vuln, policy accessi remoti.
#### Prompt operativo
“Indica figure e template che inserirai in Cap. 1 e dove verranno richiamati nei capitoli successivi.”
*Regole fisse per questo prompt*: come sopra.
--- 
## Glossario minimo (Cap. 1)
* **IACS/OT**: sistemi di automazione e controllo industriale; ambiente operativo di fabbrica/impianto.
* **Zona (Zone)**: insieme di asset OT con profilo di rischio simile, separati logicamente da altre zone.
* **Conduit**: canale di comunicazione **controllato** tra zone; filtra protocolli e direzioni dei flussi.
* **SL — Security Level (SL0–SL4)**: obiettivo di robustezza **per requisito** e **per zona/conduit/asset**.
* **FR — Foundational Requirements**: 7 aree di controllo (FR1–FR7) dalla gestione delle identità al ripristino.
* **DMZ**: zona demilitarizzata industriale, cuscinetto tra IT e OT.
* **MFA**: autenticazione a più fattori.
* **Whitelisting**: consentire **solo** protocolli/indirizzi autorizzati.
--- 
## Checklist finale (QA redazionale — Cap. 1)
* [ ] Acronomi spiegati alla prima occorrenza; tecnicismi parafrasati.
* [ ] Box **Per i ruoli** presente in ogni sezione.
* [ ] Takeaway + **avvertenza safety** per sezione.
* [ ] Mapping a **FR/SL** dove pertinente.
* [ ] Figure/template elencati e coerenti.
* [ ] Tono pratico‑operativo, vendor‑neutral.
### sys_source https://chatgpt.com/c/68b73c35-0298-8328-a7b9-76f473241645