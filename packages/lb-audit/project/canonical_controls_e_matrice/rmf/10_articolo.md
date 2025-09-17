# **1. Introduzione**

Negli ultimi anni i sistemi di controllo industriale (ICS) e più in generale gli ambienti operativi (OT) hanno visto crescere in modo significativo la loro esposizione alle minacce informatiche. L’integrazione con le reti IT, la diffusione di componenti standard e la spinta verso l’Industrial IoT hanno aumentato le superfici di attacco e reso più urgente l’adozione di approcci strutturati alla sicurezza.

In questo contesto, due famiglie di standard internazionali rappresentano i riferimenti principali:

* le pubblicazioni del **NIST** (National Institute of Standards and Technology), in particolare la **serie SP 800-53** e la guida per ICS **SP 800-82**, che appartengono al quadro metodologico del **Risk Management Framework (RMF)**;
* la **serie IEC 62443**, sviluppata a livello internazionale come standard specifico per la sicurezza dei sistemi di automazione e controllo industriale.

Entrambi gli approcci condividono un principio di fondo: la sicurezza non è una checklist statica, ma un **processo basato sul rischio** che deve portare a definire un profilo di protezioni adeguato al contesto operativo.

* Nel mondo **NIST**, questo profilo nasce dall’applicazione di **baseline** di controlli (Low, Moderate, High), che possono essere **adattate (tailoring)** e arricchite da **overlay settoriali** (come quello specifico per ICS descritto in SP 800-82r3). L’obiettivo è ottenere un set finale di controlli giustificato dal **risk assessment** e coerente con le capacità dell’organizzazione (**capability**).

* Nel mondo **IEC 62443**, il profilo di sicurezza si esprime attraverso la combinazione dei **Foundational Requirements (FR)** e dei **Security Levels (SL1–SL4)**, organizzati in una **Security Level Matrix**. In questo modello, la tolleranza al rischio dell’organizzazione viene tradotta nella scelta di un livello di sicurezza diverso per ciascun requisito fondamentale, e applicata a zone e conduit del sistema industriale.

Questi due linguaggi – uno basato su **cataloghi di controlli**, l’altro su una **matrice FR/SL** – convergono però sullo stesso obiettivo: fornire un metodo chiaro e ripetibile per collegare i rischi individuati a misure di protezione concrete, documentabili e verificabili.

---

# **2. Concetti NIST**

Il **NIST Risk Management Framework (RMF)**, descritto in particolare nelle pubblicazioni **SP 800-37** e **SP 800-53/53B**, fornisce un linguaggio comune e un processo strutturato per selezionare, adattare e applicare i controlli di sicurezza ai sistemi informativi e, con le opportune estensioni, anche ai sistemi ICS/OT.

I concetti chiave sono i seguenti:

---

### **2.1 Baseline**

Le **baseline** sono insiemi predefiniti di controlli di sicurezza, organizzati in tre livelli (**Low, Moderate, High**) in base all’impatto potenziale sul sistema secondo la classificazione di **FIPS 199** (Confidentiality, Integrity, Availability).

* **Low baseline**: contiene un set minimo di controlli fondamentali.
* **Moderate baseline**: amplia le misure includendo cifratura, monitoraggio e logging più strutturati.
* **High baseline**: prevede i requisiti più rigorosi, con controlli avanzati di resilienza, segregazione e verifica continua.

Le baseline si trovano formalmente nella **SP 800-53B**, e in formato machine-readable nei profili OSCAL distribuiti dal NIST.

---

### **2.2 Selection**

La **selection** è il processo con cui si scelgono i controlli da applicare partendo dalla baseline. La selezione può essere influenzata da fattori come:

* requisiti normativi e contrattuali,
* contesto operativo,
* minacce specifiche evidenziate dal risk assessment.

In altre parole, la selection riduce il catalogo teorico a ciò che serve davvero nel contesto del sistema da proteggere.

---

### **2.3 Tailoring**

Il **tailoring** è l’attività di personalizzazione della baseline, che può includere:

* **Scoping**: escludere controlli non pertinenti (es. funzioni non presenti nell’OT).
* **Parametrizzazione**: definire valori specifici per controlli generici (es. tempo massimo di inattività per il lock di sessione).
* **Compensazione**: sostituire un controllo non applicabile con altri meccanismi equivalenti.
* **Supplementing**: aggiungere controlli extra richiesti da rischi particolari.

Il tailoring deve sempre essere **giustificato e documentato** nel **System Security Plan (SSP)**, per garantire trasparenza e tracciabilità.

---

### **2.4 Overlay**

Gli **overlay** sono profili specializzati che si applicano sopra una baseline per contesti particolari (es. cloud, classified systems, privacy, oppure ICS/OT).
L’overlay non sostituisce la baseline, ma:

* marca alcuni controlli come non applicabili,
* aggiunge nuovi controlli,
* modifica la guida di implementazione di altri.

Per gli ambienti industriali, il riferimento è la **SP 800-82 Rev.3**, che fornisce l’**ICS Overlay** alla 800-53R5, adattando i controlli alle esigenze di disponibilità e safety tipiche dell’OT.

---

### **2.5 Capability**

Il concetto di **capability** riguarda la capacità effettiva di un’organizzazione di applicare i controlli in modo coerente e ripetibile.

* Non basta selezionare un controllo: bisogna dimostrare di avere personale, processi e strumenti per attuarlo.
* Ad esempio, “incident response capability” implica non solo avere una policy, ma anche team addestrato, playbook di risposta e sistemi di detection.

La capability è quindi il ponte tra “controlli selezionati” e “controlli operativi e verificabili”.

---

### **2.6 Risk → Control Mapping**

Elemento cruciale dell’approccio NIST è la tracciabilità tra **rischi individuati** e **controlli applicati**.

* Ogni rischio identificato nel RA deve avere almeno un controllo associato.
* Ogni esclusione o adattamento deve essere giustificata.
* Questa tracciabilità permette di alimentare documenti come:

  * **SSP (System Security Plan)**,
  * **POA\&M (Plan of Action & Milestones)**,
  * **piani di test di conformità (SP 800-53A)**.

---

✅ In sintesi, il linguaggio NIST (baseline, selection, tailoring, overlay, capability) fornisce una griglia sistematica per tradurre il **risk assessment** in un set di controlli coerente, documentato e verificabile.

---

# **3. Concetti IEC 62443**

La serie **IEC 62443** è lo standard internazionale specifico per la sicurezza dei sistemi di automazione e controllo industriale. La sua forza è quella di declinare la sicurezza in un linguaggio aderente al contesto OT, introducendo concetti che permettono di tradurre le esigenze di **tolleranza al rischio** in requisiti tecnici applicabili a **zone e conduit**.

---

### **3.1 Foundational Requirements (FR1–FR7)**

La IEC 62443 definisce sette categorie fondamentali, dette **Foundational Requirements (FR)**, che rappresentano i pilastri della sicurezza OT:

1. **FR1 – Identification & Authentication Control**
2. **FR2 – Use Control**
3. **FR3 – System Integrity**
4. **FR4 – Data Confidentiality**
5. **FR5 – Restricted Data Flow**
6. **FR6 – Timely Response to Events**
7. **FR7 – Resource Availability**

Ogni requisito racchiude sotto-requisiti più specifici (Security Requirements – SR).

---

### **3.2 Security Levels (SL1–SL4)**

A differenza di NIST, che usa baseline generiche (Low, Moderate, High), la IEC 62443 definisce quattro **Security Levels (SL)** che misurano il grado di protezione contro diversi profili di attaccante:

* **SL1**: protezione contro errori accidentali o uso involontario.
* **SL2**: protezione contro attacchi intenzionali da parte di soggetti con mezzi e motivazioni limitate.
* **SL3**: protezione contro attacchi da attori con competenze elevate e risorse moderate.
* **SL4**: protezione contro attaccanti sofisticati con risorse estese (es. nation state).

La combinazione **FR × SL** definisce il livello di robustezza richiesto per ciascun requisito.

---

### **3.3 SL-C, SL-T, SL-A**

Un concetto centrale della IEC 62443-1-5 è la distinzione tra tre prospettive di Security Level:

* **SL-C (Capability)**: livello massimo che un componente o sistema è in grado di garantire, dichiarato dal fornitore.
* **SL-T (Target)**: livello richiesto in base al *risk assessment* per una zona o conduit specifico.
* **SL-A (Achieved)**: livello effettivamente raggiunto dopo implementazione e verifica.

👉 Questa distinzione consente di confrontare ciò che serve (SL-T) con ciò che i prodotti offrono (SL-C), e valutare il gap fino a quanto effettivamente ottenuto (SL-A).

---

### **3.4 Profili di sicurezza**

Il concetto di **Security Profile** è l’equivalente dell’“overlay” NIST:

* Un profilo combina i vari FR con SL diversi a seconda del contesto.
* Es.: in una DMZ industriale si potrebbe avere **SL2 per la confidenzialità (FR4)**, ma **SL3 per la disponibilità (FR7)**.
* Il profilo diventa quindi la rappresentazione strutturata della **tolleranza al rischio dell’organizzazione**.

---

### **3.5 Security Level Matrix**

La IEC 62443 rappresenta i profili attraverso una **matrice FR/SL**, in cui ogni colonna è un Security Level (1–4) e ogni riga un Foundational Requirement.

* È uno strumento visivo che rende immediato capire dove l’organizzazione richiede il massimo livello (es. Availability a SL3) e dove accetta requisiti minimi (es. Confidentiality a SL1).
* In questo modo, la matrice traduce la **tolleranza al rischio differenziata** in un modello tecnico.

---

✅ In sintesi, la IEC 62443 non ragiona in termini di cataloghi di controlli, ma in termini di **matrice FR/SL**. È una modalità diversa per raggiungere lo stesso obiettivo del NIST: allineare le protezioni al rischio accettabile per il business e per la sicurezza operativa.

---

# **4. Mapping NIST ↔ IEC 62443**

Sebbene NIST e IEC 62443 usino linguaggi diversi, entrambi gli approcci mirano allo stesso risultato: **tradurre il rischio in profili di sicurezza applicabili e verificabili**.
Il confronto seguente mostra le corrispondenze concettuali principali.

---

### **4.1 Tabella di corrispondenza**

| Concetto NIST                                                 | Concetto IEC 62443                                     | Descrizione comparativa                                                                                          |
| ------------------------------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| **Baseline (Low / Moderate / High)** (SP 800-53B)             | **Security Levels (SL1–SL4)**                          | Entrambi rappresentano insiemi standard di requisiti che crescono in severità in funzione del rischio accettato. |
| **Overlay** (es. SP 800-82 ICS Overlay)                       | **Security Profiles** (IEC 62443-1-5)                  | Sono specializzazioni dei set standard per contesti specifici (es. ICS, settori critici).                        |
| **Tailoring** (scoping, parametrizzazione, compensazione)     | **Assegnazione SL-T per FR nelle zone/conduit**        | In NIST si modifica la baseline; in IEC si personalizza la SL Matrix per ogni requisito e contesto.              |
| **Capability** (es. incident response capability)             | **SL-C (Capability)**                                  | Entrambi descrivono la capacità effettiva di un’organizzazione o componente di soddisfare i controlli/requisiti. |
| **Achieved security** (controlli implementati e verificati)   | **SL-A (Achieved)**                                    | In entrambi i casi è la misura dello stato effettivo raggiunto dopo implementazione e assessment.                |
| **Risk → Control Mapping** (collegamento RA ↔ controlli NIST) | **Determinazione SL-T dal RA** (IEC 62443-3-2)         | Entrambi derivano dal risk assessment e servono a giustificare i requisiti applicati.                            |
| **Documentazione SSP, POA\&M, Test 53A**                      | **Security Level Conformance metrics (IEC 62443-1-5)** | Entrambi forniscono strumenti per dimostrare, tracciare e verificare la conformità.                              |

---

### **4.2 Differenze di approccio**

* **NIST**: catalogo esteso di controlli → selezione, tailoring e overlay portano a un **set finale di controlli**.
* **IEC 62443**: matrice FR/SL → combinazione dei livelli porta a un **profilo di sicurezza** per zone e conduit.

👉 In altre parole:

* NIST lavora per **lista di controlli** → “questi sono i controlli richiesti”.
* IEC lavora per **matrice di requisiti** → “questi sono i livelli di sicurezza richiesti per ogni area”.

---

### **4.3 Complementarietà**

* **NIST** è più ricco per il dettaglio operativo dei controlli (utile per implementazione e audit).
* **IEC 62443** è più intuitivo per descrivere la **tolleranza al rischio per ciascun aspetto** (Availability, Integrity, ecc.), e meglio accettato nel mondo industriale.
* Insieme forniscono una visione completa:

  * **NIST** → *“Cosa fare e come controllarlo”*.
  * **IEC 62443** → *“Quanto mi serve per ogni requisito fondamentale in funzione del rischio”*.

---

✅ Con questa tabella hai già un contenuto che funziona bene sia nell’articolo (spiegato in dettaglio), sia in una slide riassuntiva a colpo d’occhio.

---

# **5. Esempio pratico: Impianto di imbottigliamento**

Per chiarire come i due approcci si applicano in pratica, consideriamo un impianto di imbottigliamento con tre asset chiave:

* **PLC di linea** → controlla il processo di imbottigliamento.
* **HMI di sala controllo** → interfaccia operatore.
* **Gateway IT/OT** → punto di collegamento con i sistemi ERP aziendali.

Il *risk assessment* individua tre rischi principali:

1. **R1 – Malware via USB su PLC** (impatto sulla disponibilità).
2. **R2 – Lock/disconnessione automatica su HMI safety-critical** (impatto safety).
3. **R3 – Intrusione dalla rete IT verso OT tramite il gateway** (impatto su integrità e disponibilità).

---

## **5.1 Vista NIST (Baseline Moderate + Overlay ICS)**

### Controlli selezionati

* **R1 (Malware su PLC)**

  * SI-3 (Malicious Code Protection) → antivirus/whitelisting su engineering station.
  * CM-7 (Least Functionality) → disabilitare servizi non necessari.
  * PE-3 (Physical Access Control) → limitare accesso a workstation di ingegneria.

* **R2 (Lock HMI)**

  * AC-11 (Session Lock) → tailoring: lock manuale su HMI, lock automatico su workstation non critiche.
  * AC-12 (Session Termination) → non applicabile (NA) alle HMI safety-critical; compensato da PE-2 (Physical Access).

* **R3 (Intrusione IT→OT)**

  * SC-7 (Boundary Protection) + enhancements (3) e (12) → firewall OT-aware, Purdue segmentation.
  * SI-4 (Monitoring) → monitoraggio passivo TAP/SPAN, SIEM industriale.

### Documentazione

* **SSP** → giustifica esclusioni/compensazioni (es. AC-12 NA).
* **53A Test Plan** → definisce metodi di verifica (Examine, Interview, Test).
* **POA\&M** → registra gap (es. firewall avanzato ancora in implementazione).

---

## **5.2 Vista IEC 62443 (SL Matrix per zona imbottigliamento)**

Traducendo lo stesso RA con la logica IEC 62443, si ottiene la seguente **SL Matrix** per la zona imbottigliamento:

| Foundational Requirement        | SL richiesto | Motivazione                                           |
| ------------------------------- | ------------ | ----------------------------------------------------- |
| FR1 – Identification & Auth     | **SL2**      | Accessi controllati con MFA su engineering station.   |
| FR2 – Use Control               | **SL2**      | Separazione ruoli HMI vs ingegneria, RBAC semplice.   |
| FR3 – System Integrity          | **SL3**      | Firmware firmato, whitelisting, patch rigorose.       |
| FR4 – Data Confidentiality      | **SL1**      | Dati non sensibili, solo protezione minima.           |
| FR5 – Restricted Data Flow      | **SL3**      | Segmentazione Purdue, firewall OT-aware, DMZ.         |
| FR6 – Timely Response to Events | **SL2**      | Log centralizzati, monitoring passivo.                |
| FR7 – Resource Availability     | **SL3**      | Alta disponibilità HMI, cluster ridondanti, failover. |

👉 Risultato: **profilo SL-T** = { FR1\:SL2, FR2\:SL2, FR3\:SL3, FR4\:SL1, FR5\:SL3, FR6\:SL2, FR7\:SL3 }.

---

## **5.3 Confronto delle prospettive**

| Aspetto            | Vista NIST                                                 | Vista IEC 62443                                                       |
| ------------------ | ---------------------------------------------------------- | --------------------------------------------------------------------- |
| **Struttura**      | Lista di controlli selezionati (AC-11, SI-4, SC-7…).       | Matrice FR/SL differenziata (SL2 in FR1-2, SL3 in FR3-5-7…).          |
| **Flessibilità**   | Ogni controllo può essere escluso, modificato, compensato. | Ogni requisito può avere un SL diverso in base al rischio/tolleranza. |
| **Documentazione** | SSP, 53A, POA\&M.                                          | SL-T, SL-C, SL-A documentati in profili e metriche.                   |
| **Punto di forza** | Dettaglio operativo dei controlli.                         | Visione sintetica della tolleranza al rischio.                        |
| **Limite**         | Può sembrare “burocratico” per gli operatori OT.           | Meno dettagliata su implementazione pratica dei controlli.            |

---

✅ **Conclusione dell’esempio**:
Entrambe le viste conducono a un risultato coerente: **rafforzare availability e integrity, accettare livelli minimi sulla confidentiality**. La differenza è nel linguaggio usato: NIST parla di *controlli selezionati e testabili*, IEC 62443 di *livelli di sicurezza assegnati ai requisiti fondamentali*.

---

# **6. La prospettiva OEM (produttori di componenti e macchine)**

Finora abbiamo analizzato il punto di vista dell’**asset owner**, cioè chi gestisce un impianto industriale e costruisce il proprio sistema di controlli sulla base del risk assessment.
Dal lato opposto della catena del valore ci sono gli **OEM (Original Equipment Manufacturer)**, i produttori di componenti e macchine industriali, e gli **integratori di sistemi**.
Per loro il problema è diverso: non devono partire da un risk assessment specifico, ma devono **fornire prodotti e soluzioni che possano essere inseriti nei profili di sicurezza definiti dagli asset owner**.

---

### **6.1 Che cosa serve all’asset owner**

L’asset owner, come visto nelle sezioni precedenti:

* definisce un **profilo di sicurezza target (SL-T)** basato sul proprio RA;
* mappa i rischi a controlli concreti (NIST) o livelli FR/SL (IEC 62443);
* cerca componenti e sistemi che possano raggiungere o superare questi requisiti.

👉 Dal punto di vista dell’asset owner, un componente “sicuro” è quello che **dichiara chiaramente le sue capacità di sicurezza** e fornisce evidenze che possono essere integrate nella documentazione complessiva.

---

### **6.2 Cosa può dichiarare l’OEM**

Per facilitare l’integrazione nei profili dell’asset owner, l’OEM può agire su più piani:

1. **Security Level Capability (SL-C)**

   * Secondo IEC 62443, ogni componente può essere valutato o certificato rispetto a un **SL-C** per i vari Foundational Requirements.
   * Es.: un firewall industriale può dichiarare *SL-C3 su FR5 (Restricted Data Flow)*.

2. **Capability Statement (vista NIST)**

   * L’OEM può rilasciare una tabella che elenca i controlli NIST supportati.
   * Es.: un PLC con secure boot → soddisfa parzialmente SI-7 (Firmware Integrity).
   * Questo aiuta l’asset owner a colmare il gap fra baseline/overlay e capacità dei prodotti.

3. **Documentazione machine-readable (OSCAL Component Definition)**

   * Il produttore può descrivere in OSCAL quali controlli il componente soddisfa, come sono implementati e quali parametri devono essere configurati.
   * Questo permette all’asset owner di “importare” il componente direttamente nel proprio profilo.

4. **Linee guida di configurazione**

   * Molti controlli non sono soddisfatti dal componente *by design*, ma richiedono una configurazione corretta.
   * Esempio: un software SCADA può supportare l’autenticazione LDAP, ma è l’asset owner che deve attivarla.
   * In questo caso l’OEM deve fornire istruzioni chiare: *“se configuri LDAP, raggiungi SL2 su FR1”*.

---

### **6.3 Differenza tra funzionalità e configurazione**

È importante distinguere:

* **Funzionalità disponibili (out-of-the-box)**: controlli già integrati, es. cifratura TLS supportata dal dispositivo.
* **Configurazioni richieste**: impostazioni che l’asset owner deve abilitare, es. disabilitare porte non necessarie.

Un OEM responsabile deve specificare chiaramente **quali controlli sono nativi** e **quali dipendono dall’uso corretto del prodotto**.

---

### **6.4 Valore aggiunto per OEM e asset owner**

* Trasparenza → l’asset owner può valutare subito la copertura dei requisiti.
* Facilità di integrazione → i profili si costruiscono più velocemente se i componenti sono già documentati.
* Vantaggio competitivo → un prodotto certificato 62443-4-2 o con un package OSCAL è più attraente sul mercato.
* Collaborazione → l’OEM non si limita a vendere un prodotto, ma contribuisce al sistema dei controlli dell’asset owner.

---

✅ In sintesi: l’OEM non parte dal rischio, ma deve **mettere a disposizione del mercato componenti “parlanti” in termini di sicurezza**, cioè con un livello dichiarato (SL-C), con un capability statement documentato e con guide pratiche di configurazione.
In questo modo, il produttore diventa parte attiva del processo di sicurezza dell’asset owner.

---

Perfetto 🙌. Ecco la **Sezione 7 – La prospettiva dell’integratore di sistemi**, in continuità con l’articolo.

---

# **7. La prospettiva dell’integratore di sistemi**

Tra asset owner e OEM si colloca un attore cruciale: **l’integratore di sistemi**.
Il suo compito non è né solo gestire i rischi, né solo fornire componenti, ma **assemblare un sistema coerente che raggiunga i livelli di sicurezza richiesti**.

---

### **7.1 Il ruolo dell’integratore**

L’integratore di sistemi deve:

* **Comprendere i requisiti di sicurezza target (SL-T)** definiti dall’asset owner.
* **Selezionare componenti** che dichiarano capacità adeguate (SL-C) o che possono essere configurati per soddisfare i requisiti.
* **Progettare l’architettura OT** (zone e conduit) in modo da massimizzare la copertura dei requisiti.
* **Documentare e dimostrare** che il sistema assemblato raggiunge gli obiettivi → questo è lo **SL-A (Achieved)**.

---

### **7.2 Il ponte tra SL-T e SL-C**

* L’asset owner dice: *“Per la zona imbottigliamento mi serve SL3 in Availability (FR7)”*.
* L’OEM dichiara: *“Il mio PLC supporta SL-C2 in Availability, con protocollo di ridondanza base”*.
* L’integratore deve decidere come **colmare il gap**:

  * es. aggiungendo un cluster HMI ridondante,
  * inserendo un modulo hot-standby,
  * implementando procedure di failover documentate.

👉 In pratica, l’integratore fa la **gap analysis** fra SL-T (target) e SL-C (capabilities disponibili) → e produce le azioni per arrivare a SL-A (achieved).

---

### **7.3 Documentazione a supporto**

L’integratore deve produrre documentazione tecnica che dimostri la conformità:

* **System Security Plan (SSP)** → descrive come i controlli sono soddisfatti dai componenti scelti.
* **POA\&M (Plan of Action & Milestones)** → registra gap temporanei (es. componente in upgrade).
* **Test Plan (53A o IEC 62443-4-2 verification)** → dimostra che le funzionalità di sicurezza sono operative.
* **SL Conformance Metrics (IEC 62443-1-5)** → mostra numericamente il livello raggiunto.

---

### **7.4 Esempio pratico**

* **Requisito asset owner (SL-T)**: Zona imbottigliamento → SL3 per Availability (FR7).
* **OEM (SL-C)**: PLC con ridondanza base (SL2), HMI con supporto clustering (SL3).
* **Integratore**:

  * Sceglie PLC in coppia hot-standby per portare SL2 → SL3.
  * Configura HMI in cluster per raggiungere SL3.
  * Documenta configurazioni e test di failover.

Risultato → **SL-A = SL3** per Availability nella zona, conforme al target.

---

### **7.5 Valore aggiunto dell’integratore**

* Converte requisiti astratti in **soluzioni architetturali concrete**.
* Riduce l’incertezza per l’asset owner, che vede una documentazione chiara e verificabile.
* Crea un **ponte collaborativo** tra la dichiarazione dell’OEM e le esigenze del business finale.

---

✅ **In sintesi:**
L’integratore è il **mediatore tecnico e organizzativo** che rende possibile la convergenza tra rischio (SL-T), capacità dei prodotti (SL-C) e risultato operativo (SL-A). Senza questa figura, l’ecosistema rischia di non chiudere il cerchio della sicurezza OT.

---

Perfetto 🙌. Ecco la **Sezione 8 – Esempio integrato OEM + Integratore**, che completa il ciclo **Asset Owner ↔ OEM ↔ Integratore** applicato all’impianto di imbottigliamento.

---

# **8. Esempio integrato (OEM + Integratore)**

Per mostrare come le tre prospettive si incastrano, riprendiamo il caso dell’**impianto di imbottigliamento** già analizzato dal punto di vista dell’asset owner.

---

### **8.1 Requisiti dell’asset owner (SL-T)**

Dal *risk assessment* (RA), l’asset owner stabilisce:

* **FR3 – System Integrity** → SL3 (protezione firmware e supply chain).
* **FR5 – Restricted Data Flow** → SL3 (segmentazione Purdue, firewall OT-aware).
* **FR7 – Availability** → SL3 (ridondanza PLC e HMI).
* **FR4 – Confidentiality** → SL1 (requisito minimo, non critico).

👉 Questo costituisce la **SL Matrix target (SL-T)** per la zona imbottigliamento.

---

### **8.2 Capacità dichiarate dall’OEM (SL-C)**

* **PLC fornito dal produttore**

  * SL-C2 per System Integrity (firmware signed, secure boot).
  * SL-C2 per Availability (supporto base a hot-standby, ma non cluster avanzato).

* **HMI fornite dal vendor SCADA**

  * SL-C2 per Use Control (RBAC semplice).
  * SL-C3 per Availability (supporto clustering HMI).

* **Gateway IT/OT industriale**

  * SL-C3 per Restricted Data Flow (firewall L3/L4, DPI protocolli Modbus e OPC UA).

👉 Ogni OEM dichiara capacità parziali (SL-C), che vanno confrontate con i target.

---

### **8.3 Azioni dell’integratore**

L’integratore analizza il gap **SL-T vs SL-C** e propone le seguenti soluzioni:

* **Gap Integrity (FR3)**: PLC a SL-C2, target SL3 → aggiunge modulo di whitelisting software + gestione patch centralizzata → raggiunge SL3.
* **Gap Availability (FR7)**: PLC a SL-C2, target SL3 → implementa architettura di PLC ridondanti hot-standby + ridondanza rete Profinet → SL3.
* **Data Flow (FR5)**: Gateway già a SL-C3 → target SL3 soddisfatto senza modifiche.
* **Confidentiality (FR4)**: target SL1 → supporto nativo sufficiente.

---

### **8.4 Risultato finale (SL-A)**

Grazie al lavoro di integrazione:

* FR3 (System Integrity) → **SL-A = 3** (target raggiunto).
* FR5 (Restricted Data Flow) → **SL-A = 3** (target raggiunto).
* FR7 (Availability) → **SL-A = 3** (target raggiunto).
* FR4 (Confidentiality) → **SL-A = 1** (coerente con target).

👉 Il sistema assemblato raggiunge la conformità con gli obiettivi di sicurezza richiesti dall’asset owner.

---

### **8.5 Documentazione**

* **OEM**: fornisce schede SL-C, manuali di configurazione, OSCAL component definition.
* **Integratore**: produce il System Security Plan (SSP) e i test di validazione.
* **Asset Owner**: riceve il pacchetto completo, che collega **Risk → SL-T → SL-C → SL-A**.

---

✅ **Sintesi:**
Questo esempio mostra come i tre attori collaborano:

* L’asset owner definisce i requisiti (SL-T).
* L’OEM fornisce componenti con capacità dichiarate (SL-C).
* L’integratore compone e completa la soluzione per raggiungere lo stato richiesto (SL-A).

---

Perfetto 🙌. Ecco la **Sezione 9 – Integrazione NIST–IEC (il ponte metodologico)**, che chiude il quadro tecnico e mette insieme i due mondi.

---

# **9. Integrazione NIST–IEC (il ponte metodologico)**

L’adozione di standard diversi può sembrare una complicazione, ma in realtà NIST e IEC 62443 sono **complementari**:

* il NIST fornisce un **catalogo di controlli dettagliati** e una metodologia di **tailoring e overlay**;
* la IEC 62443 fornisce un **modello di livelli di sicurezza (SL-T, SL-C, SL-A)** che traduce la **tolleranza al rischio** in profili di sicurezza.

Quando messi in relazione, i due approcci costruiscono un **ciclo end-to-end** che collega il rischio alla realizzazione pratica.

---

### **9.1 Flusso integrato**

1. **Risk Assessment (RA)**

   * Identificazione minacce, vulnerabilità, conseguenze.
   * In IEC: definizione di **SL-T** per ogni FR/zone/conduit.
   * In NIST: classificazione FIPS-199 (Low/Mod/High) e scelta baseline iniziale.

2. **Profilo Target**

   * In IEC: SL Matrix (FR × SL-T).
   * In NIST: baseline + overlay (es. 800-82r3 per ICS).

3. **Componenti e Capabilities**

   * In IEC: dichiarazioni OEM come **SL-C**.
   * In NIST: capability statement (controlli già implementati).

4. **Integrazione**

   * L’integratore combina SL-T (richiesto) con SL-C (disponibile).
   * Gap analysis → azioni compensative.

5. **Implementazione e Verifica**

   * In IEC: calcolo SL-A (Achieved).
   * In NIST: generazione SSP, piani di test (53A), POA\&M.

---

### **9.2 Mapping operativo**

* **SL-T (IEC)** ↔ *Baseline + Tailoring (NIST)*
  → entrambi definiscono il “profilo target” derivato dal rischio.
* **SL-C (IEC)** ↔ *Capability (NIST)*
  → entrambi dichiarano ciò che un prodotto/organizzazione può realmente fare.
* **SL-A (IEC)** ↔ *Implementation Evidence (NIST: SSP + 53A)*
  → entrambi rappresentano lo stato effettivo raggiunto e verificato.

---

Perfetto 🙌. Ecco la **Sezione 10 – Conclusioni finali**, che chiude l’articolo con la visione unificata.

---

# **10. Conclusioni finali**

La sicurezza nei sistemi industriali non è responsabilità di un singolo attore, ma il risultato di un **ecosistema collaborativo** che coinvolge:

* l’**asset owner**, che conosce il proprio contesto operativo e definisce i requisiti target in base al rischio (SL-T / baseline + overlay);
* gli **OEM e i produttori di componenti**, che dichiarano le capacità di sicurezza dei loro prodotti (SL-C / capability statement) e forniscono strumenti di configurazione e documentazione;
* gli **integratori di sistemi**, che assemblano componenti e architetture per raggiungere i livelli richiesti e producono le evidenze di conformità (SL-A / SSP + piani di test).

---

### **10.1 NIST e IEC come linguaggi complementari**

* Il **NIST** fornisce un approccio dettagliato, basato su cataloghi di controlli e processi di tailoring, che rende ogni requisito **testabile e documentabile**.
* La **IEC 62443** fornisce un modello sintetico e immediato per descrivere la **tolleranza al rischio** con la SL Matrix, rendendo chiara la destinazione finale da raggiungere.

Usati insieme, i due standard permettono di passare da una visione **strategica e sintetica** (IEC) a una visione **operativa e verificabile** (NIST).

---

### **10.2 Il valore dell’automazione**

Grazie a OSCAL e ad approcci machine-readable, è possibile:

* ridurre gli errori manuali,
* aumentare la trasparenza,
* semplificare audit e conformità,
* creare un linguaggio condiviso tra asset owner, OEM e integratori.

---

### **10.3 Verso un ecosistema trasparente**

Il futuro della sicurezza OT si gioca su **collaborazione e trasparenza**:

* l’asset owner non deve reinventare la ruota, ma poter contare su prodotti già “parlanti” in termini di sicurezza;
* l’OEM non deve limitarsi a vendere componenti, ma fornire informazioni chiare sulle capacità di sicurezza (SL-C, controlli implementati);
* l’integratore deve essere in grado di chiudere il cerchio, dimostrando in modo oggettivo che il sistema raggiunge i livelli richiesti.

---

✅ **Conclusione finale**:
La combinazione tra NIST e IEC 62443, supportata dall’automazione con OSCAL, consente di costruire un **sistema dei controlli industriale basato sul rischio, trasparente e verificabile**.
Non si tratta di un esercizio teorico, ma di un modello operativo che permette ad asset owner, produttori e integratori di parlare lo stesso linguaggio e lavorare verso un obiettivo comune: **la resilienza dei sistemi industriali in un mondo sempre più connesso**.

---

### **9.3 Ruolo di OSCAL**

Con OSCAL si possono modellare entrambi i mondi:

* **Profilo target (SL-T)** come proprietà aggiuntive legate ai controlli NIST.
* **Component Definition (SL-C)** fornita da OEM.
* **System Implementation (SL-A)** prodotta dall’integratore.

👉 In questo modo, il ciclo **RA → SL-T → SL-C → SL-A** diventa leggibile, automatizzabile e verificabile, unificando il linguaggio IEC e NIST.

---

✅ **Sintesi:**
L’integrazione NIST–IEC consente di unire **profondità operativa** (NIST: controlli dettagliati e testabili) con **chiarezza strategica** (IEC: SL Matrix come traduzione della tolleranza al rischio).
Per l’asset owner, l’OEM e l’integratore questo significa poter parlare un **linguaggio comune**, con tracciabilità completa dal rischio al controllo implementato.

---

Vuoi che chiuda ora con la **Sezione 10 – Conclusioni finali**, che tirerà le fila includendo asset owner, OEM e integratori come un unico ecosistema di sicurezza?

# **11. Automazione con OSCAL**

Una delle sfide principali per chi deve applicare standard complessi come NIST SP 800-53 o IEC 62443 è **gestire in modo consistente e tracciabile** la selezione, l’adattamento e la documentazione dei controlli.

Il **NIST Open Security Controls Assessment Language (OSCAL)** fornisce un formato machine-readable (JSON, XML, YAML) per rappresentare cataloghi, profili e piani di implementazione dei controlli.
Grazie a OSCAL è possibile **automatizzare** il processo di costruzione dei profili di sicurezza a partire da:

* i **cataloghi ufficiali** (es. 800-53R5 in OSCAL),
* le **baseline** (Low, Moderate, High),
* gli **overlay** (es. SP 800-82r3 per ICS),
* le **decisioni di tailoring** derivanti dal risk assessment.

---

### **11.1 Dal Risk Assessment al CSV**

Il primo passo è trasformare il *risk assessment* in una tabella di mapping “Risk ↔ Control”.
Esempio (semplificato):

```csv
Risk-ID,Risk-Description,Asset,NIST-Control-ID,Overlay-Action (82r3),Tailoring/Compensation,Evidence/Assessment,POA&M-Status
R1,Malware via USB,PLC,SI-3,As-is,Whitelist USB,Policy USB + report AV,Implemented
R2,HMI lock safety,HMI,AC-12,Removed/NA,Compensato da PE-2,Badge log access,Implemented
R3,Intrusione IT→OT,Gateway,SC-7(3),Added,Firewall OT-aware,Config firewall,Planned
```

---

### **11.2 Generazione automatica di profili OSCAL**

Un semplice script Node.js (in CommonJS) può:

* leggere il CSV,
* creare un **OSCAL Profile** che importa la baseline e applica le modifiche richieste (alters),
* creare un **OSCAL Implementation (SSP extract)** con `implemented-requirements` e proprietà che collegano ciascun controllo ai rischi.

Output tipico:

* `ics_overlay_profile.json` → profilo OSCAL pronto da risolvere con il catalogo NIST.
* `ics_implementation.json` → estratto SSP con tracciabilità risk → control.

---

### **11.3 Benefici pratici**

* **Tracciabilità automatica**: ogni rischio RA è legato a controlli e relative evidenze.
* **Documentazione coerente**: SSP, piani di test (53A) e POA\&M si generano direttamente dai dati.
* **Audit semplificato**: ogni decisione di tailoring/overlay è documentata con motivazione.
* **Adattabilità**: lo stesso approccio si può replicare per **IEC 62443**, sostituendo le baseline NIST con la SL Matrix e modellando i FR come controlli OSCAL custom.

---

### **11.4 Verso l’integrazione NIST – IEC 62443**

Con OSCAL è possibile creare un **profilo ibrido**:

* importare la baseline NIST (800-53B),
* applicare l’overlay ICS (800-82r3),
* arricchire il modello con i **Security Levels (SL-T)** derivati dalla SL Matrix IEC 62443, rappresentati come proprietà aggiuntive.

👉 In questo modo si ottiene un **profilo unico**, leggibile sia in ottica NIST (controlli dettagliati) sia in ottica IEC (tolleranza al rischio per FR).

---

✅ **Conclusione della sezione**:
Grazie a OSCAL, il percorso che parte dal **risk assessment** e porta a un **profilo di sicurezza documentato e testabile** diventa automatizzabile. Questo riduce gli errori manuali, accelera la produzione di documentazione di conformità e rende più facile dimostrare la coerenza tra rischi, controlli e capacità operative.

---

# **12. Conclusioni**

La gestione della sicurezza nei sistemi industriali richiede un equilibrio tra due esigenze spesso percepite come opposte: da un lato, la necessità di **garantire la continuità operativa e la safety**; dall’altro, la crescente pressione normativa e il rischio di attacchi informatici sempre più sofisticati.

Gli standard NIST e IEC 62443 forniscono due linguaggi diversi ma complementari per affrontare questa sfida:

* Il **NIST**, con le baseline, gli overlay e il tailoring, mette a disposizione un **catalogo di controlli dettagliato**, adatto per implementare misure specifiche e documentarle con precisione (SSP, POA\&M, piani di test 53A).
* La **IEC 62443**, con i Foundational Requirements e la Security Level Matrix, offre una **visione sintetica e strategica** della tolleranza al rischio, più facilmente comunicabile agli stakeholder industriali e meglio adattata al concetto di *zone e conduit*.

L’integrazione dei due approcci permette di:

* Tradurre le esigenze di **business e safety** (risk assessment → SL Matrix).
* Mapparle in **controlli concreti e verificabili** (baseline NIST + overlay ICS).
* Automatizzare la documentazione con **OSCAL**, riducendo errori manuali e garantendo tracciabilità completa *risk → control → evidence*.

In prospettiva, questo approccio integrato consente alle organizzazioni OT di:

1. Definire profili di sicurezza chiari e difendibili verso auditor e regolatori.
2. Comunicare in modo semplice la propria **tolleranza al rischio** (tramite SL Matrix).
3. Dimostrare in modo oggettivo la **conformità operativa** (tramite controlli implementati e verificati).

---

✅ **In sintesi**: NIST e IEC 62443 non sono percorsi alternativi, ma strumenti complementari. Usati insieme, permettono di passare da una **matrice di requisiti basata sul rischio** a un **set di controlli tecnici implementati e verificabili**, con la garanzia di tracciabilità e coerenza lungo tutto il ciclo di vita della sicurezza OT.

