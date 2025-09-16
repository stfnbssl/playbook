# Cap. 8 v2.1 — Canvas (versione Executive, con riferimenti IEC 62443 rafforzati)

> **Intento**: offrire a lettori **Executive** e responsabili di linea una guida narrativa, professionale e formale all’adozione della **IEC 62443**, con particolare enfasi sulla parte **62443‑3‑3** (requisiti di sistema) come griglia di riferimento. Linguaggio consulenziale, pochi elenchi, tecnicismi e acronimi **tra parentesi dopo il concetto**. Dettagli tecnici e matrici rimangono negli allegati.

> **Prospettiva**: da questo punto in avanti si adotta la prospettiva del **Produttore di macchine (OEM – Original Equipment Manufacturer)**. Le tematiche e le responsabilità dell’**Asset Owner (AO – proprietario/gestore dell’impianto)** sono state trattate nei capitoli precedenti e qui sono richiamate soltanto quando necessario per definire l’“handshake” OEM⇄AO, le dipendenze di sito e gli impegni di servizio (**SLA – Service Level Agreement**).

---

## Regole editoriali (v2.1)

* **Tono**: formale‑professionale, **board‑ready** e non didascalico; assumere competenza del lettore. Periodi completi, connettivi espliciti (pertanto, di conseguenza, in pratica) ed evitare “frasi secche”.
* **Acronimi/tecnicismi tra parentesi dopo il concetto**: es. *livello obiettivo di sicurezza (SL‑Target)*, *autenticazione a più fattori (MFA)*, *punto di ingresso intermediato (broker)*.
* **Riferimenti IEC 62443 espliciti nel corpo**: citare **62443‑3‑3** quando si descrivono obiettivi e controlli (es. “conforme all’impianto dei requisiti **FR1–FR7** della 62443‑3‑3”); richiamare **62443‑4‑1/4‑2** per aspetti di prodotto e **62443‑2‑4** per requisiti verso fornitori/servizi.
* **Citazioni normative**: usare forma “IEC 62443‑X‑Y, clausola/ambito” senza riportare numerazioni dettagliate delle *SR* se non necessario. Le matrici **FR×SL** rimandano agli allegati.
* **Stile delle frasi**: evitare telegraphic style. Variare la lunghezza delle frasi (media 18–24 parole) e chiudere con proposizioni che esplicitano **valore e impatto**.
* **Elenchi**: usare solo quando indispensabili; preferire paragrafi discorsivi (3–5 frasi) con transizioni fluide.
* **Box essenziali** per sezione: *Per i ruoli* (max 2 bullet), *Takeaway* (max 2 frasi), *Avvertenza safety* (1 frase).
* **Coerenza tra capitolo e allegati**: ogni affermazione che richiama la 62443 deve poter essere dimostrata con un riferimento negli allegati (schede, matrici, piani, evidenze).

**Target**

* Primari: `OEM:Executive`, `AssetOwner:Operational` (lettura manageriale).
* Co‑primari: `OEM:Engineering:Developers` (stakeholder), `ServiceProvider:Operational`.
* Secondari: `OEM:Legal`, `ServiceProvider:Legal`.

---

## Riferimenti normativi minimi da citare

* **IEC 62443‑3‑3** — requisiti di sistema (**FR1–FR7**) come spina dorsale del discorso.
* **IEC 62443‑4‑1 / 62443‑4‑2** — pratiche di sviluppo e requisiti di componente (richiamo quando si parla di prodotto).
* **IEC 62443‑2‑4** — requisiti per service provider/integratori (richiamo nei rapporti OEM–cliente–fornitore).
* **Terminologia**: allineare ai concetti di **zona e condotto (zones & conduits)** e **SL‑Target**.
* **Contesto UE** (solo richiamo): Regolamento Macchine 2023/1230; NIS2/CRA ove pertinente.

---

## Struttura del capitolo (narrativa, con riferimenti 62443 integrati)

### 8.1 Executive overview — Il perché della 62443 per la macchina

**Obiettivo**: illustrare il valore per vendite, post‑vendita e rischio operativo, citando la **62443‑3‑3** come struttura dei controlli (FR1–FR7).
**Output**: pagina *board‑ready* con tre messaggi chiave e tre metriche (aggiornamenti, tempi di avviso, interventi remoti tracciati).
**Prompt**: “Spiega come la 62443‑3‑3 orienta il set minimo di controlli e perché agevola le decisioni (ROI, TCO, SLA).”

*Per i ruoli*: **AO** ciò che chiedere; **OEM** impegni e perimetro.
*Takeaway*: la 62443 **riduce ambiguità** e accelera la qualifica.
*Avvertenza safety*: nessuna misura può ridurre le protezioni di sicurezza fisica.

---

### 8.2 Ambito e perimetro — Che cosa rientra nella “security di macchina”

**Obiettivo**: definire in modo chiaro il perimetro della **macchina** e i punti di esposizione, collegando i concetti alle famiglie di requisiti della **62443‑3‑3** (es. **FR5 – flussi ristretti**).
**Output**: descrizione narrativa della scheda macchina con rinvio agli allegati.
**Prompt**: “Racconta cosa è incluso (accessi, scambi, aggiornamenti) e cosa resta in capo al sito, richiamando i FR pertinenti.”

*Per i ruoli*: **AO** convalida confini; **OEM** aggiorna la scheda.
*Takeaway*: perimetro chiaro = responsabilità chiare.

---

### 8.3 Fase 1 — Priorità e livelli obiettivo (SL‑Target)

**Obiettivo**: fissare priorità (continuità, qualità, safety) e un **livello obiettivo di sicurezza (SL‑Target)** per le aree rilevanti, riferendo gli obiettivi alle famiglie **FR** della **62443‑3‑3**.
**Output**: nota decisionale con rischi chiave e *trade‑off* dichiarati.
**Prompt**: “Descrivi scelte e compromessi, collegandoli ai FR pertinenti, senza entrare nelle *SR*.”

*Per i ruoli*: **AO** indica impatti/finestre; **OEM** traduce in milestone.
*Takeaway*: obiettivi realistici guidano tempi e costi.

---

### 8.4 Fase 2 — Comprendere i flussi (FR5) e i punti di contatto

**Obiettivo**: descrivere i flussi indispensabili e il *single point* verso l’esterno, con richiamo a **FR5 – Restricted Data Flow** e, quando opportuno, a controlli di **FR1/FR2** per gli accessi.
**Output**: diagramma unico (segnaposto) con regole essenziali approvate.
**Prompt**: “Spiega come la semplificazione dei flussi facilita l’adozione della 62443.”

*Per i ruoli*: **AO** approva schema; **OEM** propone semplificazioni.
*Takeaway*: un solo varco controllato riduce esposizione e responsabilità ambigue.

---

### 8.5 Fase 3 — Messa a punto sostenibile (FR1/FR2/FR6/FR7)

**Obiettivo**: stabilire poche regole stabili per accessi (**FR1/FR2**), registrazioni e risposta a eventi (**FR6**), aggiornamenti e ripristino (**FR7**), con linguaggio comprensibile e rinvio agli allegati.
**Output**: guida di configurazione “leggibile” che rende attuabili i controlli 62443.
**Prompt**: “Trasforma i requisiti FR in abitudini operative sostenibili (MFA, registrazioni, rollback).”

*Per i ruoli*: **AO** concorda finestre; **OEM** prova su banco e documenta.
*Takeaway*: poche regole, ben eseguite, riducono MTTR e contenziosi.

---

### 8.6 Fase 4 — Il dossier che parla la lingua della 62443

**Obiettivo**: predisporre un **dossier** che richiami esplicitamente i **FR** applicati e le evidenze collegate agli allegati (schede, piani, report).
**Output**: indice chiaro con riferimenti alla **62443‑3‑3** e ai documenti di prova.
**Prompt**: “Spiega perché il dossier ancorato alla 62443 accelera qualifiche e gare.”

*Per i ruoli*: **AO** usa il dossier per la qualifica; **OEM** mantiene le revisioni.
*Takeaway*: dossier ancorato allo standard = fiducia e tempi più brevi.

---

### 8.7 Fase 5 — Monitoraggio, advisory e teleassistenza

**Obiettivo**: illustrare canali di advisory e regole di accesso remoto collegandoli a **FR6** e, per i processi di fornitura, a **62443‑2‑4**.
**Output**: pagina narrativa su comunicazioni, finestre e tracciamento.
**Prompt**: “Racconta il ciclo post‑vendita citando i FR pertinenti e gli impegni di servizio (SLA).”

*Per i ruoli*: **AO** fornisce contatti/canali; **OEM** garantisce ritmo e qualità.
*Takeaway*: trasparenza e tempi certi consolidano la relazione.

---

### 8.8 Evidenze e metriche essenziali (allineate alla 62443)

**Obiettivo**: scegliere tre indicatori che riflettano l’adozione dei controlli 62443 (es. aggiornamenti entro finestra, tempo di advisory, percentuale di interventi remoti tracciati).
**Output**: definizioni narrative con cadenza di revisione.
**Prompt**: “Seleziona KPI leggibili in 5 minuti per il comitato.”

*Per i ruoli*: **AO** condivide dati minimi; **OEM** presenta trend trimestrali.
*Takeaway*: poche metriche, ben curate, orientano decisioni efficaci.

---

### 8.9 Uso dell’IA (LLM) a supporto, con guardrail

**Obiettivo**: spiegare come gli **LLM (Large Language Model)** velocizzano dossier e risposte, mantenendo **governance** e verifica umana.
**Output**: pagina su benefici/limiti con rinvio a policy interne.
**Prompt**: “Illustra benefici e limiti, citando fonti interne e revisione umana.”

*Per i ruoli*: **AO** riceve documenti consistenti; **OEM** applica controlli e *escalation*.
*Takeaway*: rapidità senza perdita di controllo.

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

---

## Checklist qualità (v2.1)

* [ ] Riferimenti **espliciti** alla **IEC 62443‑3‑3** in **ogni sezione** (almeno una volta), con richiamo a **FR** pertinenti.
* [ ] Dove opportuno, richiamo a **62443‑4‑1/4‑2** (prodotto) e **62443‑2‑4** (fornitura/servizi).
* [ ] **Acronimi/tecnicismi** tra parentesi dopo il concetto; no glossari estesi nel corpo del testo.
* [ ] **Tono formale‑professionale**, con periodi completi e connettivi; evitare frasi telegrafiche o imperativi secchi.
* [ ] Elenchi **essenziali**; prevalenza di paragrafi discorsivi con transizioni.
* [ ] Ogni affermazione legata alla 62443 è **tracciabile** a un allegato (schede, matrici, piani, evidenze).
