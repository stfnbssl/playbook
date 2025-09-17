## 1) Usa **SP 800-82 Rev.3**, non Rev.2

L’overlay OT “ufficiale” è nella **SP 800-82r3 (set. 2023)**. NIST la definisce esplicitamente come **partial tailoring** delle baseline 800-53r5/53B, con **aggiunte, rimozioni e note OT**; in appendice spiega anche le **convenzioni** della tabella: **grassetto** = discussione OT, **sottolineato** = controllo/enhancement **aggiunto** rispetto a 53B, ~~barrato~~ = **rimosso** rispetto a 53B. ([NIST Pubblicazioni Tecniche][1])

## 2) Le baseline Low / Mod / High arrivano da **SP 800-53B**

Le baseline sono definite in 800-53B (non dentro il catalogo 800-53r5) e hanno già la selezione “di partenza” per ogni impatto. In OSCAL, NIST fornisce **profili** separati per Low/Mod/High (oltre al catalogo). ([NIST Sicurezza Informatica][2])

## 3) L’impatto (Low/Mod/High) è a **livello di sistema**, non “per singolo controllo”

Il “colore” Low/Mod/High lo dai al **sistema** via FIPS-199/200; la **selezione dei controlli** che ne discende è quella della baseline 53B per quel livello. L’overlay OT di 82r3 poi **modifica quella baseline** (aggiunge / rimuove / adatta). Se vuoi raffinare per **zone/asset OT** (es. Purdue L1–L3.5), lo fai come **ulteriore tailoring** (profili ad hoc), ma è un passo successivo rispetto alla logica NIST “pura”. ([NIST Sicurezza Informatica][2])

---

# Ricetta per automatizzare (end-to-end)

### Input

* **Impatto del sistema** dal **risk assessment** cliente (CIA → Low/Mod/High).
* **Catalogo 800-53r5** + **baseline 800-53B** in **OSCAL**.
* **Overlay 800-82r3** (estratto da PDF).

### Algoritmo (in 6 passi)

1. **Seleziona baseline**
   Carica il profilo OSCAL della baseline **Low/Mod/High** (da 53B). Output: lista iniziale di controlli/enhancement. ([GitHub][3])

2. **Estrai overlay OT da 82r3**
   Dal PDF leggi l’**appendice dell’overlay**: per ogni controllo/enhancement e per ciascuna colonna **Low / Mod / High**:

   * se **sottolineato** → **ADD** (aggiungi alla baseline per quel livello);
   * se **barrato** → **REMOVE**;
   * se **in grassetto** → **AGGIUNGI GUIDANCE / PARAM** (tailoring).
     NIST esplicita queste convenzioni nell’appendice. ([NIST Pubblicazioni Tecniche][1])

3. **Normalizza in un “overlay profile” OSCAL**
   Rappresenta l’overlay come **profile** con:

   * `include-controls` per gli **ADD**;
   * `exclude`/`remove` (o `alter` con `remove`) per i **REMOVE**;
   * `alter` (`add part` “guidance”, `set-parameter`, `prop`) per i **GRASSETTO** / tailoring.
     (Non esiste—ad oggi—un file OSCAL ufficiale per l’overlay OT, quindi lo **costruisci tu** partendo dal PDF.) ([pages.nist.gov][4])

4. **Risolvi profilo (baseline ⊕ overlay)**
   Esegui la **profile resolution**: baseline 53B + tuo profilo “OT overlay”. Output: **control set OT-ready** per il livello scelto.

5. **Tailoring per contesto cliente (opzionale ma consigliato)**
   Genera **profili ad hoc** per siti/linee/zone:

   * scoping per asset che **non supportano** certi controlli (→ compensa altrove, come consiglia 82r3);
   * **parametrizzazione** (es. AC-11/AC-12 su HMI critiche);
   * note su **monitoraggio passivo** (SI-4) e **protezione perimetrale OT** (SC-7). 82r3 incoraggia ulteriore tailoring e compensazioni quando tecnicamente necessario. ([NIST Pubblicazioni Tecniche][1])

6. **Tracciabilità “risk → control”**
   Collega ciascun **requisito di rischio** del RA (minaccia/scenario/asset) ai **controlli** risultanti (baseline + overlay + tailoring). Questo ti consente:

   * generazione SSP, POA\&M, piani di test (53A);
   * rendicontazione di **aggiunte** e **deroghe**. ([NIST Pubblicazioni Tecniche][1])

---

## Suggerimenti pratici per il parsing del PDF di 82r3

* Targetizza direttamente l’**appendice dell’overlay** (sezioni F.\*): NIST descrive là **cosa viene aggiunto, rimosso, o discusso OT**, con la simbologia citata. ([NIST Pubblicazioni Tecniche][1])
* Nella tabella ci sono **colonne per Low/Mod/High**: il tuo parser deve **leggere per colonna**, perché un enhancement può essere aggiunto in **Mod/High** ma non in **Low** (o viceversa). ([NIST Pubblicazioni Tecniche][1])
* Attenzione al **PDF layout** (font/underline/strike) — quando non affidabile, usa come “verità” il **testo esplicativo** della riga/nota.
* Se possibile, affianca al parsing una **review manuale** per i controlli più critici (SC-7, SI-4, AC-11/12, CM-7, SR-\*).

---

## Output che otterrai

* Tre profili **OT-LOW / OT-MOD / OT-HIGH**: **baseline 53B** ± **modifiche 82r3** per ciascun livello.
* Profili **ad hoc** cliente/sito/linea che ereditano dall’OT-LOW/MOD/HIGH e applicano il **tailoring** derivato dal RA.

Se vuoi, nel prossimo messaggio preparo uno **scheletro di “overlay profile” OSCAL** più aderente al **Profile Model** (con `alter`, `set-parameter`, `add/prop/part`) e uno **schema CSV** di appoggio per alimentare l’automazione (colonne: `control-id`, `enh-id`, `low/mod/high action`, `tailoring-note`, `param-id`, `value`).

[1]: https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-82r3.pdf "Guide to Operational Technology (OT) Security"
[2]: https://csrc.nist.gov/pubs/sp/800/53/b/upd1/final?utm_source=chatgpt.com "SP 800-53B, Control Baselines for Information Systems and ..."
[3]: https://github.com/usnistgov/oscal-content?utm_source=chatgpt.com "NIST SP 800-53 content and other OSCAL content examples"
[4]: https://pages.nist.gov/OSCAL-Reference/models/v1.1.0/complete/json-reference/?utm_source=chatgpt.com "OSCAL Complete v1.1.0 JSON Format Reference - NIST Pages"
