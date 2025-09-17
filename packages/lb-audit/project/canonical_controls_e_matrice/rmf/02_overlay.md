## 1. Origine delle baseline

Le baseline di NIST derivano da **FIPS 199** e **FIPS 200**:

* Ogni sistema informativo viene classificato in termini di **impatto potenziale** su:

  * **Confidentiality**
  * **Integrity**
  * **Availability**
* Valori possibili: **Low / Moderate / High**.
* Il livello più alto tra C, I, A diventa la **security category** del sistema.

👉 Esempio:

* ICS per distribuzione elettrica:

  * Conf = Moderate (non è segreto)
  * Integrity = High (se manipolato, rischi di blackout)
  * Availability = High (deve funzionare sempre)
  * → categoria = **High impact system**

---

## 2. Cosa implicano LOW / MOD / HIGH nella baseline

NIST SP 800-53 Rev. 5 definisce \~1000 controlli (controlli base + controlli “enhancements”).
Ma non tutti sono obbligatori in ogni contesto:

* **Low baseline**:

  * Richiede un insieme minimo di controlli “fondamentali”.
  * Es. logging di base, autenticazione semplice, controlli fisici minimi.
  * Non sempre prevede controlli avanzati di cifratura, redundancy o IR maturity.

* **Moderate baseline**:

  * Aggiunge più controlli su monitoraggio, incident response, cifratura dei dati in transito, auditing dettagliato.
  * È lo standard tipico per sistemi governativi che trattano dati sensibili ma non classificati.

* **High baseline**:

  * Richiede controlli più stringenti, ridondanze, segregazione rigorosa, cifratura avanzata, verifiche continue.
  * Spesso include **control enhancements** che nel Low/Moderate non sono obbligatori.
  * Target: sistemi critici per la nazione, militari, ICS di energia o acqua.

👉 In pratica:

* La **baseline Low** è leggera (poche decine di controlli obbligatori).
* La **baseline High** ne include centinaia, molti con “enhancements” obbligatori.

---

## 3. Dove trovi le baseline nel NIST 800-53

Le baseline sono definite nel documento **NIST SP 800-53B** (companion di 800-53R5).

* SP 800-53B = “Control Baselines for Information Systems and Organizations”.
* Lì trovi le tabelle: per ogni controllo, è marcato se fa parte di **Low / Moderate / High** baseline.

Esempio (semplificato):

* **AC-2 (Account Management)**:

  * Low: AC-2 (base)
  * Moderate: AC-2 + alcuni enhancements
  * High: AC-2 + più enhancements obbligatori

---

## 4. Come appare in OSCAL

NIST ha pubblicato in OSCAL sia i controlli che le baseline.
Struttura tipica in OSCAL JSON/YAML:

* File `NIST_SP-800-53_rev5_catalog.json`: **catalogo completo** dei controlli.
* File `NIST_SP-800-53_rev5_LOW-baseline_profile.json`: baseline Low.
* File `NIST_SP-800-53_rev5_MODERATE-baseline_profile.json`: baseline Moderate.
* File `NIST_SP-800-53_rev5_HIGH-baseline_profile.json`: baseline High.

Dentro un **profile** vedi:

```json
"imports": [
  {
    "href": "NIST_SP-800-53_rev5_catalog.json"
  }
],
"include-controls": [
  {
    "with-ids": ["ac-2", "ac-3", "si-4"]
  }
],
"alterations": [
  {
    "control-id": "ac-2",
    "adds": [...],
    "removes": [...]
  }
]
```

👉 Quindi i “valori” (Low, Moderate, High) non sono un **parametro in ogni controllo**, ma sono gestiti tramite file **profile** separati, che includono solo i controlli richiesti per quella baseline.

---

## 5. Concetto di Overlay (NIST)

Un **overlay**:

* non sostituisce la baseline,
* ma **indica adattamenti, esclusioni o integrazioni** per uno specifico dominio (qui: ICS/OT),
* è una “guida di tailoring standardizzata”.

La SP 800-82R3 fornisce un **ICS Overlay** che parte da 800-53R5 e dice:

* quali controlli della baseline si applicano senza cambiamenti,
* quali richiedono **tailoring/parametrizzazione**,
* quali **non sono applicabili** (es. funzioni non realistiche per OT),
* quali **nuovi controlli vanno aggiunti** per ICS.

---

## 6. Regole generali per l’applicazione

Quando applichi un overlay a una baseline:

1. **Parti dalla baseline scelta** (Low / Moderate / High impact da 800-53R5).

   * Es. per un ICS critico potresti partire dal **Moderate** o **High baseline**.

2. **Leggi l’overlay** (SP 800-82R3, Appendix G).
   Per ogni controllo:

   * **Included as-is**: rimane uguale.
   * **Tailored**: cambia qualcosa (parametri, scoping, implementazione adattata all’OT).
   * **Not applicable**: si documenta perché non applicabile (es. certi controlli di portatili BYOD non si applicano in una DCS network).
   * **Supplemental controls**: aggiungi controlli extra richiesti dall’overlay.

3. **Parametrizza i controlli**.

   * Es.: AC-11 (Session Lock) → in IT: 15 minuti; in ICS: potrebbe essere disabilitato o configurato in modo diverso, perché il lock di una console HMI può bloccare operazioni critiche.
   * Devi motivare le differenze in termini di **safety, availability, operatività**.

4. **Documenta tutto**.

   * Ogni scostamento (esclusione, modifica) va giustificato come parte del **System Security Plan (SSP)**.
   * L’overlay non è “a la carte”, va applicato in modo disciplinato.

---

## 7. Esempio pratico ICS/OT

Prendiamo il controllo **SI-4: Information System Monitoring** (dal 800-53R5):

* **Baseline Moderate/High**: richiede capacità di monitoraggio continuo, alerting, analisi centralizzata.
* **Overlay ICS**:

  * enfatizza che il monitoraggio non deve introdurre latenza o rischi di availability,
  * può sostituire log-based monitoring con network passive monitoring (es. span port, tap),
  * esclude soluzioni intrusive come agent software su PLC/HMI.

👉 Risultato: nel “control set finale” SI-4 non viene eliminato, ma **tailored** alla realtà ICS.

Altro esempio:

* **AC-12 (Session Termination)**: in IT si forza la disconnessione dopo un certo idle time.
* **Overlay ICS**: può essere escluso o parametrizzato perché la sessione HMI deve rimanere attiva per motivi di safety.

---

## 8. Come tradurre in OSCAL

La logica che puoi seguire per unificare baseline + overlay in OSCAL:

* Parti dal file OSCAL della **baseline 800-53R5**.
* Crea un file OSCAL che rappresenta l’**ICS Overlay**:

  * `alter` → per modificare descrizione/parametri di un controllo.
  * `remove` → per segnare i controlli “not applicable”.
  * `add` → per introdurre controlli extra (es. raccomandati da 800-82R3).
* Poi usi la **OSCAL Profile Resolution** per generare il control set finale: baseline + overlay applicato.

---

## 9. In sintesi (regole operative)

* **Baseline = fondamento**.
* **Overlay = tailoring codificato per ICS**.
* Devi applicare **tutte le modifiche previste dall’overlay** → non solo selezione discrezionale.
* Risultato: ottieni un **set di controlli “ICS-ready”**, documentato e giustificato, pronto per SSP e risk assessment.



## 10. Implicazioni per il tuo lavoro ICS/OT

* Devi partire scegliendo il **profile** corretto (Low, Mod, High).
* Poi applichi sopra l’**overlay ICS (SP 800-82R3)**, che è anch’esso una forma di “profile”.
* Alla fine, usando la **profile resolution in OSCAL**, ottieni la lista dei controlli finali da applicare al tuo sistema OT.