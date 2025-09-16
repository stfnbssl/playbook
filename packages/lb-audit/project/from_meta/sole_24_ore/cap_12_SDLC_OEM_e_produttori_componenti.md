# Cap. 10 — Canvas (Istruzioni tecniche) — v1.0
# Cap. 10 — Software Development Life Cycle per OEM & fornitori di componenti (IEC 62443‑4‑1 / 62443‑4‑2) con supporto LLM
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
> **Idea chiave**: per un produttore di componenti/soluzioni OT, la **conformità** non è solo qualità: è **accesso ai mercati**. Un **SDLC conforme** (‑4‑1) e capacità di **prodotto** (‑4‑2) riducono barriere d’ingresso, parlano il linguaggio degli **Asset Owner** e abilitano risposte rapide a RFI/RFP. Gli **LLM** accelerano conoscenza, evidence‑building e automazione documentale, con *guardrail*.
--- 
## Regole editoriali
* Acronimi **espansi** alla prima occorrenza (poi sigla). Glossario a fine guida.
* Ogni sezione chiude con **Valore per OEM** / **Rischi & limiti** / **Prossimi passi**.
* Evidenze **tracciabili** (link a policy/procedure, template, record CI/CD).
* Linguaggio **pratico‑operativo**; evitare marketing; includere **KPI** dove sensato.
* Tag nelle sottosezioni per audience: `[OEM:Executive]`, `[OEM:Engineering:Developers]`, `[ServiceProvider:Operational]`, `[AssetOwner:Operational]`, `[Legal]`.
## Pubblico & taglio editoriale
**Regola d’oro**: l’ordine narrativo segue i **bisogni dell’Asset Owner** (cosa chiede al fornitore); la **profondità tecnica** privilegia **OEM**.
**Target (etichette audience)**
* **Primari**: `OEM:Executive` | `OEM:Engineering:Developers`
* **Co‑primari**: `ServiceProvider:Operational` | `AssetOwner:Operational`
* **Secondari**: `OEM:Legal` | `ServiceProvider:Legal`
**Obiettivi per audience (1 riga)**
* `OEM:Executive` → capire ROI/compliance, rischi e **barriere d’accesso** ridotte da SDLC conforme.
* `OEM:Engineering:Developers` → implementare **‑4‑1** (processi), **‑4‑2** (capabilities), **SBOM**, **PSIRT**, **secure update**.
* `AssetOwner:Operational` → cosa chiedere e quali **evidenze** pretendere.
* `ServiceProvider:Operational` → integrazione sicura, teleassistenza e aggiornamenti.
* `Legal` → clausole contrattuali, **DPA**, diritti su **SBOM/advisory**.
**Taglio**: **board‑ready** per Executive; **tecnico‑operativo** per Engineering/Operational; **compliance‑oriented** per Legal.
**Livello tecnico (1–5)**: 3/5 (Executive 2/5; Developers 4/5).
**Tempo lettura target**: 20–25 min.
## Obiettivo (capitolo)
* Definire un **SDLC conforme 62443‑4‑1** e le **capabilities 62443‑4‑2** richieste dai clienti Asset Owner.
* Usare **LLM** per catalogare standard e **automatizzare** deliverable/evidenze (RFI/RFP, advisory, SBOM, manuali integrazione).
* Mappare **strumenti** necessari (versioning, SBOM auto, CVE analysis, CI/CD, container, **secure update** remoto, inventario asset, teleassistenza sicura).
* Proporre un **programma**: audit di compliance + toolkit + risposte rapide ai clienti per rimuovere **barriere d’accesso ai mercati**.
--- 
## Struttura delle sezioni
### 10.1 Executive brief — Compliance = Accesso ai mercati
#### Obiettivo della sezione 10.1
Spiegare in 1 pagina a `OEM:Executive` come SDLC (‑4‑1) + capability (‑4‑2) riducono rifiuti in RFI/RFP, tempi di vendita e costi di supporto.
#### Output attesi
Decision memo con 3 KPI, 90/180/365 e decisioni richieste.
#### Prompt operativo
"Scrivi 1 pagina board‑ready su valore e rischi: SDLC 4‑1, capability 4‑2, SBOM/PSIRT, secure update, risposte RFI/RFP."
#### Checklist QC
KPI presenti; rischi chiave; roadmap tri‑fase; niente dettagli di protocollo.
### 10.2 Landscape norme & barriere (focalizzato su 62443‑4‑1/‑4‑2)
#### Obiettivo 10.2
Contestualizzare 62443 rispetto a richieste tipiche degli Asset Owner e alle principali barriere (evidence mancanti, PSIRT assente, SBOM).
#### Output
Tabella "Richiesta AO → Evidenza OEM (norma/artefatto)".
#### Prompt
"Costruisci una tabella AO→OEM con colonna norma (‑4‑1/‑4‑2) ed evidenza."
#### QC
Mappature chiare; esempi concreti; zero promesse vaghe.
### 10.3 SDLC 62443‑4‑1 — Governance, processi, RACI
#### Obiettivo 10.3
Disegnare i processi 4‑1 (policy, requisiti, secure design, coding, test, gestione vulnerabilità, release, manutenzione) e ruoli.
#### Output
Mappa processi; RACI; policy SDLC; checklist audit.
#### Prompt
"Elenca e descrivi i processi 4‑1 con input/output, ruoli, evidenze e KPI."
#### QC
Ogni processo ha evidenze e KPI; RACI completo.
### 10.4 Capabilities 62443‑4‑2 — Requisiti di componente
#### Obiettivo 10.4
Indicare capacità minime di prodotto (FR1–FR7) e come dichiararle (datasheet/security profile).
#### Output
Matrice capability FR×SL; scheda "Security Profile" del prodotto.
#### Prompt
"Compila capability FR×SL e bozza di security profile per un componente OT tipo."
#### QC
Capacità verificabili; niente claim generici.
### 10.5 Toolchain sicura: versioning, build, firma, artefatti
#### Obiettivo 10.5
Definire pipeline CI/CD con **versionamento**, **build automatizzata**, **firma artefatti**, repository, **segreti** in vault.
#### Output
Diagramma pipeline; policy versioning; guida firma.
#### Prompt
"Disegna una pipeline CI/CD sicura (SCM→build→test→sign→release) con controlli."
#### QC
Segreti mai in chiaro; artefatti firmati; tracciabilità commit→release.
### 10.6 SBOM automatizzata & analisi CVE (SCA, VEX)
#### Obiettivo 10.6
Automatizzare generazione **SBOM** (SPDX/CycloneDX), **SCA** (Software Composition Analysis), correlazione **CVE** e produzione **VEX** (Vulnerability Exploitability eXchange).
#### Output
SBOM di esempio; report SCA; bozza VEX.
#### Prompt
"Genera SBOM+report CVE e un VEX di esempio per una release fittizia."
#### QC
Formati standard; CVE spiegate; stato sfruttabilità dichiarato.
### 10.7 Sicurezza del codice: SAST, DAST, IaC, secret scanning
#### Obiettivo 10.7
Integrare analisi statiche/dinamiche, policy IaC (Infrastructure as Code) e scansione segreti nelle pipeline.
#### Output
Policy qualità; gate CI; report esempio.
#### Prompt
"Definisci quality gate (SAST/DAST/IaC/secret) e criteri di blocco."
#### QC
Soglie chiare; falsi positivi gestiti; eccezioni motivate.
### 10.8 Containerizzazione & migrazione a Docker (quando e come)
#### Obiettivo 10.8
Guidare migrazione **Docker/containers** in contesti OT dove applicabile; immagini **golden**, **least privilege**, scanning.
#### Output
Checklist migrazione; Dockerfile hardening; policy registry.
#### Prompt
"Scrivi guida ‘container hardening’ con controlli minimi e criteri d’uso in OT."
#### QC
No privilegi eccessivi; immagini firmate; registry privato.
### 10.9 Secure update & OTA — aggiornare/patchare da remoto
#### Obiettivo 10.9
Progettare **canali di aggiornamento sicuri** (firmware/app) con firma, **rollback** e prove in **staging**.
#### Output
Specifica secure update; runbook rollout/rollback; schema chiavi.
#### Prompt
"Redigi specifica ‘secure update’ (firmware/app): firma, verifica, canali, staging, rollback."
#### QC
Catena di fiducia; test in staging; audit trail completo.
### 10.10 Teleassistenza sicura & accessi remoti
#### Obiettivo 10.10
Definire **broker** di accesso, **MFA**, **session recording**, account **time‑bound** per supporto campo.
#### Output
Manuale teleassistenza sicura; requisiti minimi per integrazione con AO.
#### Prompt
"Crea manuale teleassistenza (broker, MFA, recording, approvi a tempo, evidenze)."
#### QC
FR1/FR2/FR6 coperti; evidenze post‑sessione; niente accessi diretti.
### 10.11 Inventario asset & telemetria (integrazione lato macchina)
#### Obiettivo 10.11
Inventariare asset della macchina e fornire telemetria minima per supporto/versioni.
#### Output
Schema campi inventario; API/format per export; policy privacy.
#### Prompt
"Definisci schema inventario asset macchina + export API/CSV e policy minime."
#### QC
Dati minimi; nessuna PII; versione/seriale sempre tracciati.
### 10.12 PSIRT per OEM & CVD (Coordinated Vulnerability Disclosure)
#### Obiettivo 10.12
Istituire **PSIRT** (Product Security Incident Response Team) e processo **CVD**: intake, triage, remediation, advisory firmati.
#### Output
Charter PSIRT; SLA triage; template advisory; contatto PGP.
#### Prompt
"Scrivi charter PSIRT, SLA e template advisory (prodotto/impatti/mitigazioni)."
#### QC
Tempi chiari; canali sicuri; versione advisories.
### 10.13 Pacchetto evidenze per clienti (PSEP)
#### Obiettivo 10.13
Standardizzare ciò che il cliente richiede: **Security Profile**, **SBOM**, **VEX**, **manuale integrazione sicura**, **test report**.
#### Output
Indice **PSEP** (Product Security Evidence Package) e modelli.
#### Prompt
"Crea indice PSEP e compila esempi di sezioni chiave (SBOM, VEX, manuale integrazione)."
#### QC
Tracciabilità release; formati standard; riferimenti a ‑4‑1/‑4‑2.
### 10.14 Programma LLM‑assisted: knowledge base & risposte rapide
#### Obiettivo 10.14
Usare **LLM** per catalogare standard, policy, procedure e **automatizzare** RFI/RFP, FAQ tecniche, advisories, manuali.
#### Output
Knowledge base indicizzata; prompt templates; guardrail LLM.
#### Prompt
"Definisci RAG per SDLC: fonti, indici, permessi; crea 6 prompt template (RFI, advisory, SBOM note, manuale, PSEP, FAQ)."
#### QC
Read‑only su repo; citazioni artefatti; *prompt logging*.
### 10.15 Audit di conformità & maturity model
#### Obiettivo 10.15
Impostare **audit interno** su 4‑1/4‑2 e modello di maturità (L1→L4) con gap/remediation.
#### Output
Checklist audit; scorecard maturità; piano remediation 90/180/365.
#### Prompt
"Compila checklist audit 4‑1/4‑2 e scorecard maturità con priorità remediation."
#### QC
Evidenze richieste; NA motivati; date e owner.
### 10.16 Roadmap strumenti & selezione (tooling catalog)
#### Obiettivo 10.16
Selezionare strumenti: **SCM**, **CI/CD**, **SAST/DAST/SCA**, **container registry/scanner**, **signing**, **secrets**, **SBOM**, **ticketing**.
#### Output
Matrice requisiti→tool; criteri *build vs buy*; TCO stimato.
#### Prompt
"Crea catalogo strumenti con criteri di scelta e matrice requisiti→tool; includi TCO indicativo."
#### QC
No lock‑in obbligato; alternative open/commercial; integrazione API.
### 10.17 KPI & reporting per OEM
#### Obiettivo 10.17
Definire KPI: **SBOM coverage**, **CVE backlog aging**, **Time‑to‑Advisory**, **Patch adoption**, % build firmate, % release con VEX.
#### Output
Tabella KPI + definizioni + formule + target 12 mesi.
#### Prompt
"Definisci 8 KPI con formule, soglie e owner."
#### QC
Misurabili; fonte dati indicata; reporting mensile.
### 10.18 Rischi & anti‑pattern
#### Obiettivo 10.18
Evitare errori comuni: segreti nel codice/prompt, firma assente, SBOM non aggiornate, accessi remoti diretti, container privilegiati.
#### Output
Tabella anti‑pattern → controllo 62443 corrispondente.
#### Prompt
"Elenca 10 anti‑pattern e mappa a controlli/processi 4‑1/FR pertinenti."
#### QC
Azioni correttive pratiche; owner; tempi.
### 10.19 Template & deliverable
#### Obiettivo 10.19
Raccogliere tutti i **modelli**: policy SDLC, RACI, pipeline, SBOM/VEX, advisory, PSEP, manuale integrazione, secure update, audit checklist.
#### Output
Pacchetto template editabili.
#### Prompt
"Genera i template elencati (struttura, sezioni, segnaposto)."
#### QC
Coerenza naming; versioning; campi obbligatori marcati.
--- 
## Comandi standard per le bozze (fuori dal canvas)
* **Intero capitolo**: "Leggi questo canvas. Genera `Bozza — Cap. ${cap} — vX.Y` con tutte le sezioni 10.1–10.19, rispettando Pubblico & taglio. Non modificare il canvas."
* **Sezione singola**: "Leggi questo canvas → sezione 10.Z. Scrivi la bozza per audience `OEM:Engineering:Developers` (o altra) e **APPENDI A** `Bozza — Cap. ${cap} — vX.Y` sotto il titolo della sezione."
## Checklist qualità (capitolo)
* [ ] Ogni sezione ha **Obiettivo/Output/Prompt/QC**.
* [ ] Evidenze tracciabili (repo, ticket, build ID) citate.
* [ ] Mappature esplicite a **62443‑4‑1/‑4‑2** e **FR1–FR7** dove rilevante.
* [ ] KPI presenti e misurabili.
* [ ] LLM con **guardrail** e citazioni delle fonti interne.
* [ ] Niente testi finiti: questo file resta **solo istruzioni**.