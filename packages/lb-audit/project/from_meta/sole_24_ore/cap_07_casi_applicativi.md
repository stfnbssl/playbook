# Cap. 7 — Casi applicativi e buone pratiche (IEC 62443)
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
> **Obiettivo**: 4 facciate totali (≈ 1 pagina per caso + 1 pagina di buone pratiche) con struttura uniforme **Contesto → Problema → Soluzione 62443 → Risultati/KPI → Lezioni apprese**.
> **Nota di coerenza**: le **Schede Energia** e **Acque** sono allineate al canvas “8 Schede Casi”. Qui sono adattate al formato capitolo.
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
--- 
## 7.1 Caso — **Energia**: segmentazione OT & conduits
**Contesto** 
Impianto di generazione/distribuzione con rete OT piatta; scambi dati con IT (reportistica, manutenzione remota).
**Problema** 
Superficie d’attacco elevata; accessi remoti eterogenei; assenza di **DMZ** e di **whitelisting** sui flussi.
**Soluzione IEC 62443 (mappata FR/SL)**
* Architettura a **Zone & Conduits** con **DMZ** industriale; **deny‑by‑default** e whitelisting protocolli/porte (**FR5**, **SL2–SL3**).
* **Broker** per accessi privilegiati con **MFA**, approvazioni **time‑bound**, **session recording** (**FR1/FR2**).
* Telemetria di rete/host OT (firewall/IDS/syslog), **use case** su accessi e modifiche di configurazione (**FR6**).
* **RACI** e **runbook** per finestre di fermo; test e **rollback** (‑2‑1, **FR7**).
**Risultati/KPI (esempi)**
* ↓ 40–70% flussi inter‑zona non necessari.
* 100% sessioni remote con **MFA** + registrazione.
* **MTTD** allarmi critici 15–30 min; **MTTR** < X ore.
**Lezioni apprese**
* Definire **SL‑Target** diversi per safety, controllo, HMI.
* Le regole di rete sono **change‑controlled** e testate in **staging**.
* Audit periodici su accessi terze parti.
**Per i ruoli**
* **PMI/Owner**: approvare mappa Zone/Conduits e SL‑Target.
* **OEM**: manuale integrazione sicura e SBOM.
* **Service Provider/SI**: progettare DMZ e broker, consegnare **evidenze**.
**Figure**: Schema Zone & Conduits con DMZ e flussi consentiti.
**Fonti**: standard IEC 62443; linee guida settore energia (titolo/ente/anno).
#### Prompt operativo
“Scrivi 1 pagina sul caso **Energia**: da rete piatta a **Zone & Conduits** con DMZ e accessi **brokered**, KPI in range e mapping **FR/SL**.”
--- 
## 7.2 Caso — **Acque**: aggiornamenti & accessi remoti sicuri
**Contesto** 
Impianto di trattamento acque; patch applicate **ad hoc**; interventi di terze parti non sempre tracciati.
**Problema** 
Rischio di config‑drift (deriva configurazioni), mancata evidenza degli interventi, finestre non pianificate.
**Soluzione IEC 62443 (mappata FR/SL)**
* **Inventario** asset e criticità; calendario patch trimestrale con **staging** (‑2‑3; **FR3/FR7**).
* Accessi remoti **mediati/approvati**; **account temporanei**, **least privilege** e **session recording** (‑2‑4; **FR1/FR2**).
* **Backup/restore** testati; logging centralizzato e **runbook** incident (**FR6/FR7**).
**Risultati/KPI (esempi)**
* Copertura patch su asset “critical” > 80–90% entro 90 gg.
* 0 interventi non registrati; approvazioni in < 2 h.
* ↓ 30–40% incidenti legati ad accessi remoti.
**Lezioni apprese**
* **PSIRT** dei fornitori e finestra di manutenzione **pianificata**.
* Policy per **account temporanei** e **registrazione** sessioni.
* **Test di ripristino** mensile documentato.
**Per i ruoli**
* **PMI/Owner**: imporre evidenze di intervento.
* **OEM**: advisory e **SBOM** aggiornati.
* **Service Provider**: usare broker del cliente e chiudere con **evidenze**.
**Figure**: Flusso patch mgmt + broker accessi remoti.
**Fonti**: linee guida settore idrico; advisory ICS‑CERT (titolo/anno).
#### Prompt operativo
“Scrivi 1 pagina sul caso **Acque**: **vuln & patch mgmt** (‑2‑3) e **accessi terze parti** (‑2‑4) con KPI e mapping **FR/SL**.”
--- 
## 7.3 Caso — **PMI manifatturiera**: adozione graduale (90‑180‑365 giorni)
**Contesto** 
Azienda manifatturiera multi‑linea, eterogeneità fornitori/macchine, risorse IT/OT limitate.
**Problema** 
Assenza di inventario completo, accessi remoti non uniformi, patch e backup non standardizzati.
**Soluzione IEC 62443 — roadmap**
* **90 giorni (quick wins)**
    Inventario minimo; **policy accessi remoti** con broker e **MFA**; **backup baseline** e primo test (‑2‑1; **FR1/FR2/FR7**).
* **180 giorni**
    **Zoning & Conduits** logici, **DMZ**; avvio **patch/vuln mgmt** con staging; **RACI** approvato (‑3‑2/‑3‑3/‑2‑3; **FR3/FR5/FR6/FR7**).
* **365 giorni**
    **SL‑Target** per zona; **KPI** mensili; **PSIRT** fornitori integrato (‑2‑4/‑4‑1/‑4‑2); audit e miglioramento continuo.
**Risultati/KPI (esempi)**
* % **asset inventariati**: 60%→95% (12 mesi).
* **Patch coverage** (critical): 0→85–95% entro 90 gg dalla release.
* **MTTD/MTTR** eventi OT in calo di X%.
**Lezioni apprese**
* Partire da **perimetro/visibilità** prima dei progetti complessi.
* Standardizzare **accessi remoti** e **backup** riduce incidenti e tempi di ripresa.
* Pianificare **finestre** con Operations è cruciale per l’adozione.
**Per i ruoli**
* **PMI/Owner**: nominare owner di zona e fissare KPI.
* **OEM**: fornire manuali **hardening** e **SBOM**.
* **Service Provider/SI**: supporto a inventario, DMZ, staging patch.
**Figure**: Roadmap 90/180/365; matrice **SL‑Target** per zona.
**Template**: registro inventario; piano patch/vuln; RACI.
#### Prompt operativo
“Scrivi 1 pagina per una **PMI manifatturiera**: roadmap 90‑180‑365 con deliverable, KPI e mapping **FR/SL**.”
--- 
## 7.4 Buone pratiche trasversali (riquadro di servizio)
**Errori comuni**
* Cercare **SL4 ovunque** senza analisi di rischio.
* Accessi remoti diretti; assenza di **session recording**.
* Nessun **staging** per patch; nessuna **evidenza** di change.
**Quick wins**
* **Inventario** + classificazione criticità; **policy accessi remoti**; **backup baseline** con test.
* **DMZ** e conduits con whitelisting per i flussi critici.
* **KPI** minimi (patch coverage, MTTD/MTTR, % sessioni con MFA).
**Per i ruoli**
* **PMI/Owner**: adottare **RACI** e roadmap con tappe chiare.
* **OEM**: pubblicare **advisory/PSIRT** e **SBOM**.
* **Service Provider/SI**: consegnare **log/evidenze** standard a chiusura attività.
**Figure**: Tabella **FR × SL** (mini), schema accesso remoto brokered, flusso patch/staging.
#### Prompt operativo
“Scrivi 1 pagina con 3 errori comuni + 3 quick wins, collegati a **FR** e **SL**, con indicazioni pratiche per PMI/OEM/Service Provider.”
--- 
## Glossario minimo (Cap. 7)
* **IACS/OT**: sistemi di automazione e controllo industriale; ambiente operativo di fabbrica/impianto.
* **Zona (Zone)**: insieme di asset OT con profilo di rischio simile, separati logicamente da altre zone.
* **Conduit**: canale di comunicazione **controllato** tra zone; filtra protocolli e direzioni dei flussi.
* **SL — Security Level (SL0–SL4)**: obiettivo di robustezza **per requisito** e **per zona/conduit/asset**.
* **FR — Foundational Requirements**: 7 aree di controllo (FR1–FR7) dalla gestione delle identità al ripristino.
* **DMZ**: zona demilitarizzata industriale, cuscinetto tra IT e OT.
* **MFA**: autenticazione a più fattori.
* **Whitelisting**: consentire **solo** protocolli/indirizzi autorizzati.
--- 
## Checklist finale (QA redazionale — Cap. 7)
* [ ] Struttura **Contesto → Problema → Soluzione 62443 → KPI → Lezioni** rispettata.
* [ ] Box **Per i ruoli** presente in ogni caso.
* [ ] Mapping a **FR1–FR7** e **SL‑Target** realistici.
* [ ] Figure/template/segnaposto indicati.
* [ ] Tono pratico‑operativo, vendor‑neutral.
* [ ] Acronomi spiegati, tecnicismi parafrasati.
* [ ] Disclaimer per casi sintetici dove richiesto.
### sys_source https://chatgpt.com/c/68b73c35-0298-8328-a7b9-76f473241645