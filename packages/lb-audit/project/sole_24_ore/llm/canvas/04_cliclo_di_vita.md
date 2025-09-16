# Cap. 2 — Ciclo di vita della sicurezza IACS (IEC 62443‑3‑2, ‑3‑3)

> **Pubblico**: PMI **Asset Owner**, **OEM/Product Supplier**, **Service Provider/System Integrator**.
> **Obiettivo**: capitolo pratico‑operativo (3–5 facciate) che guidi il ciclo di vita: **risk assessment → SL‑Target → design (zone & conduits) → requisiti di sistema → validazione/verifica → esercizio & miglioramento**.

---

## Metodo di lavoro — **Canvas → Bozza → Merge**

* **Canvas** (questa pagina): struttura, prompt, segnaposto figure/template e regole editoriali.
* **Bozza**: testo completo, con acronimi spiegati, box **Per i ruoli**, takeaway e **avvertenza safety** per ogni sezione.
* **Merge**: inserimento della bozza dentro il canvas mantenendo i prompt come call‑out editoriali; **QC** su checklist di qualità.

---

### Regole editoriali trasversali (valide per tutto il capitolo)

* **Spiega gli acronimi** alla prima occorrenza (IT/EN), poi usa la sigla.
* **Parafrasa i tecnicismi** tra parentesi con termini semplici (es. *conduit* = canale di rete **controllato**; *whitelisting* = consentire **solo** ciò che è autorizzato).
* **Box Per i ruoli** in ogni sezione: 2–3 bullet ciascuno per **PMI/Asset Owner**, **OEM/Product Supplier**, **Service Provider/System Integrator**.
* **Chiusura**: **2–3 takeaway** + **1 avvertenza safety**.
* **Coerenza 62443**: mappa a **FR1–FR7** e **SL‑Target** realistici (evita “SL4 ovunque”).
* **Tono**: pratico‑operativo, vendor‑neutral, frasi brevi.

---

## 2.1 Risk assessment & definizione **SL‑Target** (IEC 62443‑3‑2)

**Obiettivo**
Determinare gli **SL‑Target** per zone, conduits e (se necessario) asset, a partire dall’analisi del rischio sugli **IACS**.

**Passi minimi**

1. **Inventario** asset e mappa **Zone & Conduits** (schizzo iniziale).
2. **Valutazione impatti** (safety, disponibilità, qualità, ambiente, legale).
3. **Minacce/scenari** per zona (inclusi accessi remoti/terze parti).
4. **Valore di rischio** (scala semplice, es. Basso/Medio/Alto) con criteri documentati.
5. **Derivazione SL‑Target** per **FR1–FR7** (tabella per zona).
6. **Eccezioni/compensazioni** (compensating controls) quando SL desiderato non è **OT‑feasible** (attuabile in OT).

**Output**

* Matrice **Zona × FR (SL‑Target)**, profili di minaccia per zona, registro rischi.

**Prompt operativo**
“Scrivi 10–12 righe che spieghino come condurre il risk assessment 62443‑3‑2 e determinare gli **SL‑Target** (per FR/zone/conduits), con esempi di compensating controls.”

*Regole fisse per questo prompt*: definisci acronimi alla prima occorrenza; parafrasa i tecnicismi; inserisci box **Per i ruoli**; chiudi con **takeaway** e **avvertenza safety**; mappa a **FR/SL**.

**Figure/Template (segnaposto)**

* **Figura 2.1**: esempio di mappa Zone/Conduits.
* **Tabella 2.1**: matrice **Zona × FR (SL‑Target)**.
* **Template**: registro rischi con criteri di scoring.

---

## 2.2 Segmentazione & **design sicuro** dell’architettura OT (zone & conduits)

**Obiettivo**
Tradurre gli **SL‑Target** in un’architettura a **Zone & Conduits** con **DMZ** (zona cuscinetto IT/OT), politiche di rete e accessi remoti **brokered**.

**Linee guida**

* **Zone** per processi/criticità omogenee; **conduits** con **whitelisting** di protocolli/porte/direzioni.
* **DMZ** industriale per scambio dati (storici, report, aggiornamenti); servizi intermedi (jump host, broker di accesso).
* **Remote access**: MFA, time‑bound, least privilege, **session recording**.
* **Identità/ruoli OT** separati da IT; **account temporanei** per terze parti.
* **Politiche di rete**: deny‑by‑default, inspection protocolli OT, logging centralizzato.
* **Requisiti di sistema** (IEC 62443‑3‑3): derivare **SR** (System Requirements) per raggiungere gli SL‑Target di zona.

**Output**

* Diagramma architetturale, policy conduits, elenco **SR** mappati a **FR/SL**.

**Prompt operativo**
“Redigi 12–14 righe sul design a zone & conduits: DMZ, whitelisting, accessi remoti, identità OT, e come derivare i **System Requirements** (‑3‑3) dagli **SL‑Target**.”

*Regole fisse per questo prompt*: come sopra.

**Figure/Template (segnaposto)**

* **Figura 2.2**: architettura target con DMZ e conduits.
* **Tabella 2.2**: elenco **SR (‑3‑3)** per zona con mapping **FR/SL**.

---

## 2.3 Validazione, verifica & **miglioramento continuo** (‑3‑3)

**Obiettivo**
Verificare che i **System Requirements (SR)** siano implementati/eﬃcaci e mantenuti nel tempo; integrare **change management** e **monitoring**.

**Attività chiave**

* **Piani di test**: casi per requisiti **FR1–FR7**; ambienti **staging**/banco prova; **FAT/SAT** (Factory/Site Acceptance Test).
* **Evidenze**: report di test, log, configurazioni versionate, baseline di hardening.
* **Esercizio**: patch/vuln mgmt (‑2‑3), logging & **SOC**, esercitazioni di **incident response**.
* **Change management**: richieste, approvazioni, finestre, rollback; **eccezioni** tracciate.
* **Miglioramento**: KPI periodici; riesame SL‑Target; audit.

**Output**

* Piano **FAT/SAT**, report, registro **change**, dashboard **KPI**.

**Prompt operativo**
“Scrivi 10–12 righe su validazione e verifica (‑3‑3): come strutturare FAT/SAT e test per FR1–FR7, integrare change e monitoring, e mantenere efficacia nel tempo.”

*Regole fisse per questo prompt*: come sopra.

**Figure/Template (segnaposto)**

* **Figura 2.3**: flusso test/validazione → esercizio → miglioramento.
* **Template**: piano FAT/SAT; registro change.

---

## 2.4 Dalla componentistica al sistema: **integrare ‑4‑2 con ‑3‑3**

**Obiettivo**
Usare componenti/OEM con capacità **62443‑4‑2** e integrarli in un sistema conforme ai **SR ‑3‑3**.

**Passi**

* **Raccolta dichiarazioni OEM**: capacità FR/SL, **SBOM**, policy update/PSIRT.
* **Selezione**: confronto requisiti di componente vs **SR** di zona.
* **Integrazione**: hardening, account/service minimi, update sicuri, logging.
* **Verifica**: test specifici di integrazione e performance in OT.

**Prompt operativo**
“Scrivi 8–10 righe che spieghino come usare componenti con requisiti **‑4‑2** per comporre un sistema che soddisfi i **SR** **‑3‑3**.”

*Regole fisse per questo prompt*: come sopra.

**Figure/Template (segnaposto)**

* **Tabella 2.4**: matrice **SR (‑3‑3) ↔ capability (‑4‑2)**.

---

## 2.5 Artefatti & Evidenze (deliverable)

* **Mappa Zone/Conduits** e confini IT/OT (con **DMZ**).
* **Matrice SL‑Target** per zona × **FR1–FR7**.
* Elenco **SR (‑3‑3)** per zona + policy conduits.
* **Piano di test** (FAT/SAT), report di verifica e **baseline** di hardening.
* **Registro change** e **registro eccezioni** con compensazioni.
* **Dashboard KPI** e verbali di riesame.

---

## 2.6 Figure & Template (riepilogo segnaposto)

* Figura 2.1 — Mappa Zone/Conduits (iniziale).
* Tabella 2.1 — **Zona × FR (SL‑Target)**.
* Figura 2.2 — Architettura target con **DMZ** e conduits.
* Tabella 2.2 — **SR (‑3‑3)** per zona (mapping **FR/SL**).
* Figura 2.3 — Ciclo **test → esercizio → miglioramento**.
* Tabella 2.4 — **SR (‑3‑3) ↔ capability (‑4‑2)**.
* Template — Registro rischi; Piano FAT/SAT; Registro change; Dashboard KPI.

---

## Glossario minimo (Cap. 2)

* **IACS/OT**: sistemi di automazione e controllo industriale; ambiente operativo di fabbrica/impianto.
* **Zona (Zone)**: insieme di asset OT con profilo di rischio simile, separati logicamente da altre zone.
* **Conduit**: canale di comunicazione **controllato** tra zone; filtra protocolli e direzioni dei flussi.
* **SL — Security Level (SL0–SL4)**: obiettivo di robustezza **per requisito** e **per zona/conduit/asset**.
* **FR — Foundational Requirements**: 7 aree di controllo (FR1–FR7) dalla gestione delle identità al ripristino.
* **DMZ**: zona demilitarizzata industriale, cuscinetto tra IT e OT.
* **FAT/SAT**: collaudo in fabbrica/sito (Factory/Site Acceptance Test).
* **SR (System Requirements)**: requisiti di sistema secondo **IEC 62443‑3‑3**.
* **PSIRT/SBOM**: team risposta vulnerabilità di prodotto / distinta componenti software.

---

## Checklist finale (QA redazionale — Cap. 2)

* [ ] Acronomi spiegati e tecnicismi parafrasati.
* [ ] Box **Per i ruoli** in ogni sezione.
* [ ] **SL‑Target** per zona con mapping **FR1–FR7**.
* [ ] **SR (‑3‑3)** derivati dagli SL‑Target e tracciati.
* [ ] Figure/template elencati e coerenti.
* [ ] Takeaway + **avvertenza safety** per sezione.
* [ ] Tono pratico‑operativo, vendor‑neutral.

### sys_source https://chatgpt.com/c/68b73c35-0298-8328-a7b9-76f473241645