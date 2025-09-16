# Cap. 1 — Contesto, perimetro e come usare la mini guida (IEC 62443)

> **Pubblico**: PMI **Asset Owner**, **OEM/Product Supplier**, **Service Provider/Gestori impianti**.
> **Obiettivo**: capitolo introduttivo (2 facciate) per definire contesto, perimetro, destinatari, cosa **non** è la 62443, output attesi e modalità d’uso della mini guida.

---

## Metodo di lavoro — **Canvas → Bozza → Merge**

1. **Canvas** (questa pagina)

   * Struttura del capitolo, sezioni, **prompt operativi**, segnaposto figure/tabelle e **regole editoriali**.
   * **Accettazione**: il referente conferma sezioni, taglio e tono.
2. **Bozza**

   * Produzione del testo completo (in stile pratico‑operativo), con **acronimi spiegati** alla prima occorrenza, box **Per i ruoli**, **takeaway** e **avvertenza safety** per ogni sezione.
   * **Accettazione**: revisione contenuti + coerenza con Canvas.
3. **Merge**

   * Inserimento della **Bozza** dentro al **Canvas** (sotto ogni prompt), mantenendo i prompt come call‑out editoriali per future revisioni.
   * **QC finale**: checklist di qualità, figure/template, coerenza **FR/SL**.

**Versioning & QC**

* Versioni denominate *Cap1\_vX*; changelog sintetico.
* **Checklist redazionale** (in fondo a questo canvas) da spuntare prima della consegna.

---

### Regole editoriali trasversali (valide per tutto il capitolo)

* **Spiega gli acronimi** alla prima occorrenza (in italiano/inglese), poi usa la sigla.
* **Parafrasa i tecnicismi** tra parentesi con linguaggio professionale ma semplice (es. *conduit* = canale di rete **controllato**; *whitelisting* = consentire **solo** ciò che è autorizzato).
* **Box Per i ruoli** in ogni sezione: 2–3 bullet ciascuno per **PMI/Asset Owner**, **OEM/Product Supplier**, **Service Provider/System Integrator**.
* **Chiusura sezione**: **2–3 takeaway** + **1 avvertenza safety**.
* **Coerenza 62443**: mappa sempre i controlli a **FR1–FR7** e agli **SL‑Target** realistici (evita “SL4 ovunque”).
* **Tono**: pratico‑operativo, vendor‑neutral, frasi brevi, voce attiva.

---

## 1.1 Scopo e perimetro

**Cosa includere (OT/IACS)**
PLC, DCS/SCADA, HMI, workstation di ingegneria, historian, server OT (dominio, applicativi), apparati rete industriale, VPN/remote access, sistemi di backup/restore, virtualizzazione on‑prem OT, interfacce con MES/ERP.

**Cosa resta fuori (ma con interfacce)**
IT office (posta, collaboration), endpoint non usati in OT, applicazioni corporate irrilevanti per l’operatività.

**Confine IT/OT e conduits**
Descrivere la **DMZ** (zona cuscinetto), i **conduits** (canali controllati) e le **trust boundaries**.

**Prompt operativo**
“Scrivi 8–12 righe su scopo e perimetro del Cap. 1, chiarendo confine IT/OT, DMZ e conduits, con esempi di asset OT e interfacce.”

*Regole fisse per questo prompt*: definisci acronimi alla prima occorrenza; aggiungi parafrasi semplice ai tecnicismi; inserisci box **Per i ruoli**; chiudi con **takeaway** e **avvertenza safety**; mappa a **FR/SL** dove pertinente.

---

## 1.2 A chi serve (pubblico)

**Segmenti destinatari**

* **PMI/Asset Owner**: impostare un **programma di sicurezza OT** essenziale ma efficace.
* **OEM/Product Supplier**: allineare **SDL 62443‑4‑1** e capacità **‑4‑2**; definire condizioni d’uso sicure.
* **Service Provider/System Integrator**: operare secondo **‑2‑4**, con accessi remoti tracciati e procedure concordate.

**Prompt operativo**
“Descrivi 10–12 righe di ‘a chi serve’, con value proposition distinta per PMI/Owner, OEM e Service Provider, includendo esempi di risultati attesi.”

*Regole fisse per questo prompt*: come sopra.

---

## 1.3 Cosa **NON** è la IEC 62443

* Non è **solo IT**: tratta esigenze OT (disponibilità, tempi reali, safety).
* Non è **un prodotto**: nessun componente singolo “rende conforme” l’impianto.
* Non è **solo una checklist**: richiede **processi** e **ruoli** (‑2‑1).
* Non è **zero incidenti**: riduce il rischio in modo misurabile.
* Non è **compliance legale automatica**: aiuta a mappare (es. NIS2), ma servono governance e reporting.

**Prompt operativo**
“Scrivi un box ‘cosa NON è la 62443’ in 6–8 righe con esempi pratici e correzione dei miti ricorrenti.”

*Regole fisse per questo prompt*: come sopra.

---

## 1.4 Come usare la mini guida

**Percorsi di lettura**

* **Executive (15–20 min)**: rischi/benefici, decisioni chiave, investimenti minimi.
* **Implementer OT (2–3 ore)**: inventario → zone/conduits → SL‑Target → misure → validazione → esercizio.
* **OEM track**: ‑4‑1/‑4‑2, dichiarazioni di conformità, manuale di integrazione sicura, accesso remoto.

**Approccio step‑by‑step**

1. Inventario & perimetro.  2) Rischio & **SL‑Target**.  3) Architettura (zone, conduits, DMZ, identità).  4) Piano misure (tecniche+organizzative).  5) Validazione/verifica (**‑3‑3**).  6) Operazioni & miglioramento.

**Prompt operativo**
“Redigi 10–12 righe su come usare la guida: tre percorsi di lettura + approccio step‑by‑step riusabile nei progetti.”

*Regole fisse per questo prompt*: come sopra.

---

## 1.5 Output attesi dal lettore (deliverable)

* **Mappa dei rischi OT** per zona (asset critici, minacce, impatti, rischio residuo).
* **SL‑Target per zona** (FR1–FR7) coerenti con vincoli operativi.
* **Piano misure** prioritizzato (costo/beneficio, owner, prerequisiti, finestre di downtime).
* **Roadmap 30/90/180+** con quick wins (remoto, backup, logging), interventi strutturali (segmentazione, identity OT) e iniziative di programma.

**Metriche di successo**
Esempi: % asset inventariati; % sessioni remote con **MFA**; copertura patch; **MTTD/MTTR**; % zone con SL‑Target formalizzati.

**Prompt operativo**
“Scrivi 8–10 righe sugli output attesi e 4–5 metriche chiave per misurare il progresso senza dati sensibili.”

*Regole fisse per questo prompt*: come sopra.

---

## 1.6 Figure e template (segnaposto)

* **Schema Zone & Conduits** (con **DMZ**) — figura 1.
* **Tabella FR × SL** — figura 2.
* **RACI essenziale** (ruoli/responsabilità) — tabella 1.
* **Template**: inventario asset, matrice **SL‑Target**, piano patch/vuln, policy accessi remoti.

**Prompt operativo**
“Indica figure e template che inserirai in Cap. 1 e dove verranno richiamati nei capitoli successivi.”

*Regole fisse per questo prompt*: come sopra.

---

## 1.7 Domande per i committenti (solo Cap. 1)

1. Pubblico principale tra PMI/Owner, OEM, Service Provider e settore prevalente?
2. Livello di dettaglio desiderato per **NIS2 ⇄ 62443** nel Cap. 1?
3. Figure obbligatorie (es. Zone/Conduits, FR×SL, RACI) e stile grafico preferito?
4. Tono (formale/pratico) e riferimenti editoriali (Sole 24 Ore / Fondazione Fenice)?
5. Lingua (solo IT o anche EN) e registro (voi/tu)?

**Prompt operativo**
“Raccogli queste risposte in 8–10 righe, trasformandole in vincoli editoriali da applicare a tutto il capitolo.”

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