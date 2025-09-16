# Cap. 9 v2.1 — Software Development Life Cycle per OEM & fornitori di componenti (IEC 62443‑4‑1 / 62443‑4‑2) con supporto LLM

> **Intento (Idea chiave)**: per un produttore di componenti/soluzioni OT, la **conformità** non è solo qualità: è **accesso ai mercati**. Un **SDLC conforme** (‑4‑1) e capacità di **prodotto** (‑4‑2) riducono barriere d’ingresso, parlano il linguaggio degli **Asset Owner** e abilitano risposte rapide a RFI/RFP. Gli **LLM** accelerano conoscenza, evidence‑building e automazione documentale, con *guardrail*.

---

## Regole editoriali trasversali (valide per tutto il capitolo)
* **Tono**: formale‑professionale, **board‑ready** e non didascalico; assumere competenza del lettore. Periodi completi, connettivi espliciti (pertanto, di conseguenza, in pratica) ed evitare “frasi secche”.
* **Acronimi/tecnicismi tra parentesi dopo il concetto**: es. *livello obiettivo di sicurezza (SL‑Target)*, *autenticazione a più fattori (MFA)*, *punto di ingresso intermediato (broker)*.
* **Riferimenti IEC 62443 espliciti nel corpo**: citare **62443‑3‑3** quando si descrivono obiettivi e controlli (es. “conforme all’impianto dei requisiti **FR1–FR7** della 62443‑3‑3”); richiamare **62443‑4‑1/4‑2** per aspetti di prodotto e **62443‑2‑4** per requisiti verso fornitori/servizi.
* **Citazioni normative**: usare forma “IEC 62443‑X‑Y, clausola/ambito” senza riportare numerazioni dettagliate delle *SR* se non necessario. Le matrici **FR×SL** rimandano agli allegati.
* **Stile delle frasi**: evitare telegraphic style. Variare la lunghezza delle frasi (media 18–24 parole) e chiudere con proposizioni che esplicitano **valore e impatto**.
* **Stile di apertura paragrafi**: evitare formule meta-discorsive come “Lo scopo di questo capitolo è…”; aprire invece con enunciati assertivi, diretti e d’impatto che descrivano subito il contesto o il punto chiave.
* **Elenchi**: usare solo quando indispensabili; preferire paragrafi discorsivi (3–5 frasi) con transizioni fluide.
* **Box essenziali** per sezione: *Per i ruoli* (max 2 bullet), *Takeaway* (max 2 frasi), *Avvertenza safety* (1 frase).
* **Coerenza tra capitolo e allegati**: ogni affermazione che richiama la 62443 deve poter essere dimostrata con un riferimento negli allegati (schede, matrici, piani, evidenze).

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

### 9.1 Executive brief — Compliance = Accesso ai mercati

**Obiettivo della sezione 9.1**: Spiegare in 1 pagina a `OEM:Executive` come SDLC (‑4‑1) + capability (‑4‑2) riducono rifiuti in RFI/RFP, tempi di vendita e costi di supporto.

**Output attesi**: Decision memo con 3 KPI, 90/180/365 e decisioni richieste.

#### Prompt operativo

"Scrivi 1 pagina board‑ready su valore e rischi: SDLC 4‑1, capability 4‑2, SBOM/PSIRT, secure update, risposte RFI/RFP."

#### Checklist QC

KPI presenti; rischi chiave; roadmap tri‑fase; niente dettagli di protocollo.

### 9.2 Landscape norme & barriere (focalizzato su 62443‑4‑1/‑4‑2)

**Obiettivo 9.2**: Contestualizzare 62443 rispetto a richieste tipiche degli Asset Owner e alle principali barriere (evidence mancanti, PSIRT assente, SBOM).

**Output**: Tabella "Richiesta AO → Evidenza OEM (norma/artefatto)".

#### Prompt

"Costruisci una tabella AO→OEM con colonna norma (‑4‑1/‑4‑2) ed evidenza."

#### QC

Mappature chiare; esempi concreti; zero promesse vaghe.

### 9.3 SDLC 62443‑4‑1 — Governance, processi, RACI

**Obiettivo 9.3**: Disegnare i processi 4‑1 (policy, requisiti, secure design, coding, test, gestione vulnerabilità, release, manutenzione) e ruoli.

**Output**: Mappa processi; RACI; policy SDLC; checklist audit.

#### Prompt

"Elenca e descrivi i processi 4‑1 con input/output, ruoli, evidenze e KPI."

#### QC

Ogni processo ha evidenze e KPI; RACI completo.

### 9.4 Capabilities 62443‑4‑2 — Requisiti di componente

**Obiettivo 9.4**: Indicare capacità minime di prodotto (FR1–FR7) e come dichiararle (datasheet/security profile).

**Output**: Matrice capability FR×SL; scheda "Security Profile" del prodotto.

#### Prompt

"Compila capability FR×SL e bozza di security profile per un componente OT tipo."

#### QC

Capacità verificabili; niente claim generici.

### 9.5 Toolchain sicura: versioning, build, firma, artefatti

**Obiettivo 9.5**: Definire pipeline CI/CD con **versionamento**, **build automatizzata**, **firma artefatti**, repository, **segreti** in vault.

**Output**: Diagramma pipeline; policy versioning; guida firma.

#### Prompt

"Disegna una pipeline CI/CD sicura (SCM→build→test→sign→release) con controlli."

#### QC

Segreti mai in chiaro; artefatti firmati; tracciabilità commit→release.

### 9.6 SBOM automatizzata & analisi CVE (SCA, VEX)

**Obiettivo 9.6**: Automatizzare generazione **SBOM** (SPDX/CycloneDX), **SCA** (Software Composition Analysis), correlazione **CVE** e produzione **VEX** (Vulnerability Exploitability eXchange).

**Output**: SBOM di esempio; report SCA; bozza VEX.

#### Prompt

"Genera SBOM+report CVE e un VEX di esempio per una release fittizia."

#### QC

Formati standard; CVE spiegate; stato sfruttabilità dichiarato.

### 9.7 Sicurezza del codice: SAST, DAST, IaC, secret scanning

**Obiettivo 9.7**: Integrare analisi statiche/dinamiche, policy IaC (Infrastructure as Code) e scansione segreti nelle pipeline.

**Output**: Policy qualità; gate CI; report esempio.

#### Prompt

"Definisci quality gate (SAST/DAST/IaC/secret) e criteri di blocco."

#### QC

Soglie chiare; falsi positivi gestiti; eccezioni motivate.

### 9.8 Containerizzazione & migrazione a Docker (quando e come)

**Obiettivo 9.8**: Guidare migrazione **Docker/containers** in contesti OT dove applicabile; immagini **golden**, **least privilege**, scanning.

**Output**: Checklist migrazione; Dockerfile hardening; policy registry.

#### Prompt

"Scrivi guida ‘container hardening’ con controlli minimi e criteri d’uso in OT."

#### QC

No privilegi eccessivi; immagini firmate; registry privato.

### 9.9 Secure update & OTA — aggiornare/patchare da remoto

**Obiettivo 9.9**: Progettare **canali di aggiornamento sicuri** (firmware/app) con firma, **rollback** e prove in **staging**.

**Output**: Specifica secure update; runbook rollout/rollback; schema chiavi.

#### Prompt

"Redigi specifica ‘secure update’ (firmware/app): firma, verifica, canali, staging, rollback."

#### QC

Catena di fiducia; test in staging; audit trail completo.

### 9.10 Teleassistenza sicura & accessi remoti

**Obiettivo 9.10**: Definire **broker** di accesso, **MFA**, **session recording**, account **time‑bound** per supporto campo.

**Output**: Manuale teleassistenza sicura; requisiti minimi per integrazione con AO.

#### Prompt

"Crea manuale teleassistenza (broker, MFA, recording, approvi a tempo, evidenze)."

#### QC

FR1/FR2/FR6 coperti; evidenze post‑sessione; niente accessi diretti.

### 9.11 Inventario asset & telemetria (integrazione lato macchina)

**Obiettivo 9.11**: Inventariare asset della macchina e fornire telemetria minima per supporto/versioni.

**Output**: Schema campi inventario; API/format per export; policy privacy.

#### Prompt

"Definisci schema inventario asset macchina + export API/CSV e policy minime."

#### QC

Dati minimi; nessuna PII; versione/seriale sempre tracciati.

### 9.12 PSIRT per OEM & CVD (Coordinated Vulnerability Disclosure)

**Obiettivo 9.12**: Istituire **PSIRT** (Product Security Incident Response Team) e processo **CVD**: intake, triage, remediation, advisory firmati.

**Output**: Charter PSIRT; SLA triage; template advisory; contatto PGP.

#### Prompt

"Scrivi charter PSIRT, SLA e template advisory (prodotto/impatti/mitigazioni)."

#### QC

Tempi chiari; canali sicuri; versione advisories.

### 9.13 Pacchetto evidenze per clienti (PSEP)

**Obiettivo 9.13**: Standardizzare ciò che il cliente richiede: **Security Profile**, **SBOM**, **VEX**, **manuale integrazione sicura**, **test report**.

**Output**: Indice **PSEP** (Product Security Evidence Package) e modelli.

#### Prompt

"Crea indice PSEP e compila esempi di sezioni chiave (SBOM, VEX, manuale integrazione)."

#### QC

Tracciabilità release; formati standard; riferimenti a ‑4‑1/‑4‑2.

### 9.14 Programma LLM‑assisted: knowledge base & risposte rapide

**Obiettivo 9.14**: Usare **LLM** per catalogare standard, policy, procedure e **automatizzare** RFI/RFP, FAQ tecniche, advisories, manuali.

**Output**: Knowledge base indicizzata; prompt templates; guardrail LLM.

#### Prompt

"Definisci RAG per SDLC: fonti, indici, permessi; crea 6 prompt template (RFI, advisory, SBOM note, manuale, PSEP, FAQ)."

#### QC

Read‑only su repo; citazioni artefatti; *prompt logging*.

### 9.15 Audit di conformità & maturity model

**Obiettivo 9.15**: Impostare **audit interno** su 4‑1/4‑2 e modello di maturità (L1→L4) con gap/remediation.

**Output**: Checklist audit; scorecard maturità; piano remediation 90/180/365.

#### Prompt

"Compila checklist audit 4‑1/4‑2 e scorecard maturità con priorità remediation."

#### QC

Evidenze richieste; NA motivati; date e owner.

### 9.16 Roadmap strumenti & selezione (tooling catalog)

**Obiettivo 9.16**: Selezionare strumenti: **SCM**, **CI/CD**, **SAST/DAST/SCA**, **container registry/scanner**, **signing**, **secrets**, **SBOM**, **ticketing**.

**Output**: Matrice requisiti→tool; criteri *build vs buy*; TCO stimato.

#### Prompt

"Crea catalogo strumenti con criteri di scelta e matrice requisiti→tool; includi TCO indicativo."

#### QC

No lock‑in obbligato; alternative open/commercial; integrazione API.

### 9.17 KPI & reporting per OEM

**Obiettivo 9.17**: Definire KPI: **SBOM coverage**, **CVE backlog aging**, **Time‑to‑Advisory**, **Patch adoption**, % build firmate, % release con VEX.

**Output**: Tabella KPI + definizioni + formule + target 12 mesi.

#### Prompt

"Definisci 8 KPI con formule, soglie e owner."

#### QC

Misurabili; fonte dati indicata; reporting mensile.

### 9.18 Rischi & anti‑pattern

**Obiettivo 9.18**: Evitare errori comuni: segreti nel codice/prompt, firma assente, SBOM non aggiornate, accessi remoti diretti, container privilegiati.

**Output**: Tabella anti‑pattern → controllo 62443 corrispondente.

#### Prompt

"Elenca 10 anti‑pattern e mappa a controlli/processi 4‑1/FR pertinenti."

#### QC

Azioni correttive pratiche; owner; tempi.

### 9.19 Template & deliverable

**Obiettivo 9.19**: Raccogliere tutti i **modelli**: policy SDLC, RACI, pipeline, SBOM/VEX, advisory, PSEP, manuale integrazione, secure update, audit checklist.

**Output**: Pacchetto template editabili.

#### Prompt

"Genera i template elencati (struttura, sezioni, segnaposto)."

#### QC

Coerenza naming; versioning; campi obbligatori marcati.

---

## Convenzioni di file

* **Canvas — Cap. 8 v2.1** → istruzioni narrative con riferimenti 62443 rafforzati.
* **Bozza — Cap. 8 v2.1 — vMAJOR.MINOR** → testo per impaginazione.
* Opzionale: **Merge Log — Cap. 8 v2.1** (5 righe per unione contenuti).

**Versioning**

* **Sovrascrivi** minor (x.y→x.y) per refusi/micro‑chiarimenti.
* **Nuova versione** per cambi di contenuto/tono/struttura o impatti su decisioni.

---

## Esempi di formulazione (per evitare frasi “secche”)

* **Prima**: “Ridurre i flussi.” → **Dopo**: “Riduciamo i flussi al minimo necessario, così il controllo diventa più semplice e l’esposizione diminuisce in modo misurabile.”
* **Prima**: “Serve accesso remoto.” → **Dopo**: “L’accesso remoto avviene esclusivamente tramite un punto intermediato (broker) con autorizzazione temporanea e registrazione completa della sessione.”
* **Prima**: “Fare aggiornamenti.” → **Dopo**: “Gli aggiornamenti si pianificano su finestre concordate; si provano su banco e si rilasciano con possibilità di ritorno (rollback), così l’operatività resta sotto controllo.”

## Checklist qualità (capitolo)

* [ ] Ogni sezione ha **Obiettivo/Output/Prompt/QC**.
* [ ] Evidenze tracciabili (repo, ticket, build ID) citate.
* [ ] Mappature esplicite a **62443‑4‑1/‑4‑2** e **FR1–FR7** dove rilevante.
* [ ] KPI presenti e misurabili.
* [ ] LLM con **guardrail** e citazioni delle fonti interne.
* [ ] Niente testi finiti: questo file resta **solo istruzioni**.
