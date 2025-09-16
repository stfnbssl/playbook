# Capitolo 8 v2.1 — Adozione della IEC 62443 (versione Executive, rigenerata)

> Documento *board‑ready* per **Executive** e responsabili di linea. Tono formale‑professionale, frasi complete e transizioni esplicite. Acronimi e tecnicismi compaiono **dopo** il concetto: es. livello obiettivo di sicurezza (**SL‑Target**), autenticazione a più fattori (**MFA**), punto di ingresso intermediato (**broker**). I dettagli tecnici, le matrici e le tabelle restano negli allegati.
>
> **Prospettiva**: a partire da questo capitolo adottiamo la prospettiva del **Produttore di macchine (OEM – Original Equipment Manufacturer)**. Le tematiche dell’**Asset Owner (AO – proprietario/gestore dell’impianto)** sono state trattate nei capitoli precedenti e qui sono richiamate solo quando necessario per l’“handshake” OEM⇄AO, le dipendenze di sito e gli impegni di servizio (**SLA – Service Level Agreement**).

---

## 8.1 Executive overview — Il perché della 62443 per la macchina

La famiglia **IEC 62443** fornisce un linguaggio condiviso per progettare, comunicare e verificare la sicurezza delle macchine in ambienti **OT (Operational Technology)**. Nel perimetro OEM, la parte **62443‑3‑3** funge da dorsale: le sette famiglie di requisiti (**FR1–FR7**) consentono di spiegare con coerenza cosa proteggiamo, come lo dimostriamo e con quali impegni di servizio (**SLA**), evitando ambiguità nelle trattative.

Dal punto di vista di **ROI (Return on Investment)** e **TCO (Total Cost of Ownership)**, l’adozione della 62443 riduce i tempi di qualifica, contiene il rischio operativo e rende trasparenti ruoli e responsabilità tra **OEM**, **AO** e fornitori. In pratica, si passa da promesse generiche a impegni verificabili, sostenuti da evidenze tracciabili e facilmente riesaminabili.

*Per i ruoli* — **AO**: richiedere dossier e impegni riferiti alla 62443‑3‑3. **OEM**: dichiarare perimetro, controlli e tempi di risposta.
*Takeaway*: la 62443 offre una struttura che rende rapide e verificabili le decisioni.
*Avvertenza safety*: nessuna misura di sicurezza informatica può ridurre le protezioni di sicurezza fisica.

---

## 8.2 Ambito e perimetro — Che cosa rientra nella “security di macchina”

La **security di macchina** copre componenti, interfacce verso l’esterno, accessi, aggiornamenti e teleassistenza. Non coincide con la sicurezza dell’intero sito, che resta in capo al cliente; richiede tuttavia un coordinamento serrato. L’ancoraggio alla **62443‑3‑3** permette di mappare ogni tema alla relativa famiglia di requisiti: ad esempio **FR5 – flussi ristretti (Restricted Data Flow)** quando definiamo come la macchina scambia informazioni con l’esterno, oppure **FR1/FR2** quando trattiamo identità e autorizzazioni.

Inquadrare il perimetro chiarisce chi fa cosa, quali dipendenze sono necessarie (tempo di rete, nomi a dominio, repository) e quali scambi risultano legittimi. Ne derivano aspettative stabili, riduzione dei fraintendimenti e una base condivisa per audit, assistenza e aggiornamenti regolati.

*Per i ruoli* — **AO**: condividere confini e dipendenze. **OEM**: mantenere aggiornata la scheda di macchina con richiami alla 62443‑3‑3.
*Takeaway*: perimetro definito significa responsabilità chiare e costi prevedibili.
*Avvertenza safety*: le scelte di perimetro non devono incidere su arresti di emergenza e interlock.

---

## 8.3 Fase 1 — Priorità e livelli obiettivo (SL‑Target)

La fase preliminare definisce le **priorità** (continuità, qualità, tutela delle persone) e assegna un **livello obiettivo di sicurezza (SL‑Target)** alle aree esposte, con riferimento alle famiglie **FR** della **62443‑3‑3**. L’obiettivo è selezionare un grado di protezione coerente con il **risk appetite** del cliente, evitando ambizioni non sostenibili e dichiarando i relativi *trade‑off*.

L’output è una nota decisionale strutturata: rischi principali, obiettivi per area, compromessi ammessi e azioni successive. Questo documento guida pianificazione e budget e costituisce il riferimento per verifiche e revisioni periodiche dei controlli.

*Per i ruoli* — **AO**: indicare impatti e vincoli produttivi. **OEM**: tradurre priorità e **SL‑Target** in impegni e milestone.
*Takeaway*: obiettivi realistici riducono rielaborazioni e tempi di approvazione.
*Avvertenza safety*: analisi e prove iniziali in ambiente controllato o a macchina ferma.

---

## 8.4 Fase 2 — Comprendere i flussi (FR5) e i punti di contatto

Questa fase mappa come la macchina comunica all’interno e all’esterno, distinguendo gli scambi indispensabili da quelli eliminabili. In coerenza con **FR5 (Restricted Data Flow)** della **62443‑3‑3**, si privilegia un **punto unico e controllato** verso l’esterno e si definiscono regole semplici su cosa entra, cosa esce e con quale motivazione; quando rilevante, gli accessi si riferiscono a **FR1/FR2**.

L’output consiste in un diagramma unico (segnaposto) approvato con il cliente, accompagnato da poche regole di traffico. Lo schema diventa riferimento stabile per test, teleassistenza e aggiornamenti, consentendo un’applicazione coerente dei controlli nel tempo e riducendo ambiguità di responsabilità operative.

*Per i ruoli* — **AO**: approvare lo schema dei flussi. **OEM**: proporre semplificazioni coerenti con **SLA** e **TCO**.
*Takeaway*: un solo varco esterno riduce esposizione e ambiguità di responsabilità.
*Avvertenza safety*: evitare verifiche che alterino tempi di controllo o limiti di sicurezza.

---

## 8.5 Fase 3 — Messa a punto sostenibile (FR1/FR2/FR6/FR7)

La messa a punto consolida **abitudini sostenibili**: chi può entrare e con quali garanzie (autenticazione a più fattori — **MFA**, gestione degli account — **FR1/FR2**), quali eventi vengono registrati e per quanto tempo (risposta a eventi — **FR6**), come si aggiornano firmware e software con possibilità di ritorno (**rollback**) e come si assicurano disponibilità e ripristino (**FR7**). Il tutto è descritto in modo leggibile e ancorato agli allegati tecnici.

Ne risulta una guida di configurazione condivisa: ruoli e responsabilità, percorso di autorizzazione, tracciabilità degli interventi e finestre di cambio. La separazione tra corpo narrativo e allegati mantiene la fruibilità per Executive e team legali, lasciando ai tecnici i dettagli operativi.

*Per i ruoli* — **AO**: concordare finestre e modalità operative. **OEM**: documentare, provare su banco e mantenere la guida.
*Takeaway*: poche regole ben eseguite riducono ticket e **MTTR (Mean Time To Repair)**.
*Avvertenza safety*: nessun cambio senza test realistici e approvazione della funzione sicurezza.

---

## 8.6 Fase 4 — Il dossier che parla la lingua della 62443

Il **dossier di macchina** riunisce gli elementi utili a verifiche rapide e qualifiche più semplici: descrizione, flussi approvati, guida di configurazione, registro delle versioni e indicazioni d’uso sicuro. Ogni sezione richiama le famiglie **FR** pertinenti della **62443‑3‑3**, mentre gli aspetti di prodotto rinviano a **62443‑4‑1/4‑2** (pratiche di sviluppo e requisiti di componente), così da garantire coerenza tra sistema e componenti.

Il dossier riduce attriti con gli uffici legali, chiarisce responsabilità e accelera le decisioni. In termini di **governance**, rende visibili proprietà, revisioni e aderenza alle evidenze di prova allegate, migliorando la **auditability** verso clienti e auditor terzi.

*Per i ruoli* — **AO**: usare il dossier per valutazioni e richieste di integrazione. **OEM**: mantenerlo allineato alla versione fornita.
*Takeaway*: dossier ancorato alla 62443 genera fiducia e tempi più brevi di qualifica.
*Avvertenza safety*: il dossier deve rispecchiare la macchina **reale**.

---

## 8.7 Fase 5 — Monitoraggio, advisory e teleassistenza

Dopo la vendita, contano **comunicazioni puntuali** e **interventi tracciati**. Occorre un canale ufficiale per gli avvisi su vulnerabilità (**advisory**), finestre pianificate per aggiornamenti e regole chiare per l’accesso remoto: richiesta, approvazione, intervento registrato e chiusura con evidenze. La tracciabilità e la risposta tempestiva si collegano a **FR6** della **62443‑3‑3**, mentre i servizi erogati da terzi possono richiamare i requisiti di **62443‑2‑4**.

I tempi di risposta promessi (**SLA**) vanno rispettati e misurati; la trasparenza alimenta fiducia e riduce il costo di non‑qualità in campo. La gestione ordinata dell’accesso remoto tramite **broker** e l’autenticazione **MFA** sono prerequisiti per un servizio affidabile e verificabile.

*Per i ruoli* — **AO**: indicare referenti e canali. **OEM**: mantenere ritmo e qualità delle comunicazioni, con playbook di **escalation**.
*Takeaway*: relazione e tempi certi valgono quanto la tecnologia.
*Avvertenza safety*: interventi remoti solo con salvaguardie attive e registrazione di sessione.

---

## 8.8 Evidenze e metriche essenziali (allineate alla 62443)

Per valutare l’efficacia bastano **tre indicatori**:

1. **Adozione degli aggiornamenti** entro la finestra concordata: misura disciplina e coordinamento (coerenza con disponibilità — **FR7**).
2. **Tempo di avviso ai clienti** su nuove vulnerabilità (advisory lead time): misura trasparenza e prontezza (coerenza con risposta a eventi — **FR6**).
3. **Interventi remoti tracciati** sul totale: misura controllo operativo e qualità (coerenza con gestione degli accessi — **FR1/FR2**).

Questi numeri sostengono il dialogo direzionale e orientano priorità e budget: dove investire, cosa semplificare e quale rischio ridurre in via prioritaria.

*Per i ruoli* — **AO**: condividere i dati minimi per il calcolo. **OEM**: presentare trend trimestrali e azioni correttive.
*Takeaway*: poche metriche, ben curate, guidano decisioni efficaci.
*Avvertenza safety*: non comprimere test e collaudi per inseguire obiettivi numerici.

---

## 8.9 Uso dell’IA (LLM) a supporto, con guardrail

L’impiego di modelli di **Intelligenza Artificiale** a grandi dimensioni (**LLM — Large Language Model**) consente di accelerare la redazione di dossier coerenti, di rispondere con rapidità a richieste del cliente e di generare bozze di manuali o piani di prova. I benefici sono velocità e uniformità; i limiti sono chiari: occorrono **governance** dei dati, citazioni delle fonti interne e **verifica umana** prima della condivisione.

La regola è semplice: l’IA accelera, ma **decide sempre una persona**. Gli output devono risultare tracciabili alle evidenze e coerenti con i riferimenti alla **62443‑3‑3** richiamati in questo capitolo, così da preservare qualità e responsabilità.

*Per i ruoli* — **AO**: ricevere documenti chiari e consistenti. **OEM**: usare l’IA con controlli, tracciabilità e criteri di **escalation**.
*Takeaway*: rapidità senza perdita di controllo e qualità.
*Avvertenza safety*: nessuna azione operativa automatica.

---

### Allegati tecnici (solo riferimenti)

* Scheda della macchina (perimetro, dipendenze, scambi) — richiami **FR** pertinenti.
* Flussi approvati e regole di traffico — coerenza con **FR5**.
* Guida di configurazione (accessi, registrazioni, aggiornamenti) — richiami **FR1/FR2/FR6/FR7**.
* Registro versioni e manuali operatore — tracciabilità e usi sicuri.
* Evidenze di prova e report — collegamento alle clausole applicabili della **62443‑3‑3** e, se pertinente, a **62443‑4‑1/4‑2** e **62443‑2‑4**.

---

### Nota editoriale

Questa bozza recepisce la prospettiva OEM introdotta nel canvas v8.1 e mantiene riferimenti espliciti alla **IEC 62443‑3‑3** in ogni sezione, con acronimi e tecnicismi tra parentesi, tono formale e rimando agli allegati per dettagli e matrici.
