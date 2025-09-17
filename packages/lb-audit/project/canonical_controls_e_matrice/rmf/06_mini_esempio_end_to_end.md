Perfetto 👍, allora ti preparo un **mini-esempio end-to-end** per un impianto ICS/OT. Usiamo:

* **Baseline Moderate (53B)**,
* **Overlay ICS (82r3)**,
* Un **RA ipotetico** con 3 rischi,
* Collegamento **Risk → Control → Evidenza/Test (53A)**.

---

## 1. Scenario ICS ipotetico

Impianto imbottigliamento con:

* PLC (linea di processo),
* HMI (console operatore),
* Gateway IT/OT verso ERP.

---

## 2. Risk Assessment sintetico

| ID Rischio | Asset/Scenario             | Minaccia                                | Impatto          | Livello |
| ---------- | -------------------------- | --------------------------------------- | ---------------- | ------- |
| R1         | PLC linea imbottigliamento | Malware via USB stick                   | Availability     | High    |
| R2         | HMI sala controllo         | Lock/disconnessione automatica HMI      | Safety           | High    |
| R3         | Gateway IT/OT              | Intrusione dalla rete corporate (IT→OT) | Integrity/Avail. | High    |

---

## 3. Mappatura Risk → Control (Baseline Moderate + Overlay 82r3)

| Rischio                     | Controlli NIST (baseline + overlay)                                                                      | Tailoring / Note ICS (82r3)                                                                                 |
| --------------------------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| R1: Malware via USB su PLC  | **SI-3 (Malicious Code Protection)**, **CM-7 (Least Functionality)**, **PE-3 (Physical Access Control)** | 82r3 → vietare USB non autorizzate; build ICS “kiosk” per HMI; controllo fisico accesso engineering station |
| R2: Lock/disconnessione HMI | **AC-11 (Session Lock)**, **AC-12 (Session Termination)**, **PE-2 (Physical Access Control)**            | 82r3 → AC-12 non applicabile su HMI safety-critical; compensato da controllo fisico + logging accessi       |
| R3: Intrusione IT→OT        | **SC-7 (Boundary Protection)** con enhancements (3) e (12), **SI-4 (Monitoring)**                        | 82r3 → segmentazione Purdue, firewall OT-aware, monitoring passivo TAP/SPAN                                 |

---

## 4. Collegamento a evidenze/test (53A)

Ogni controllo ha procedure di assessment standard (SP 800-53A).
Esempio:

### R1 – SI-3 (Malicious Code Protection)

* **Objective**: sistema previene/mitiga codice malevolo.
* **Method**: Interview + Examine + Test.
* **Evidenza**: policy USB, whitelist dispositivi, report AV/EDR su engineering station.

### R2 – AC-11 / AC-12

* **Objective**: sistema blocca o termina sessioni non usate.
* **Tailoring ICS**: AC-12 NA su HMI, documentato.
* **Compensazione**: PE-2 → controllo badge sala controllo.
* **Evidenza**: registro accessi badge, log HMI, giustificazione in SSP.

### R3 – SC-7 + SI-4

* **Objective**: boundary protection tra IT e OT, monitoring attivo.
* **Method**: Examine configurazioni firewall, Test regole.
* **Evidenza**: screenshot regole firewall, schema Purdue, log SIEM con feed da TAP OT.

---

## 5. Come appare in OSCAL (pseudo-YAML)

```yaml
implemented-requirement:
  uuid: 1234
  control-id: ac-12
  props:
    - name: risk-mapping
      ns: https://example/ns/risk
      value: "R2"
    - name: applicability
      ns: https://example/ns/overlay/ics
      value: "not-applicable"
      remarks: "HMI safety-critical; compensato da PE-2"
  links:
    - rel: evidence
      href: artifacts/hmi_badge_log.pdf
```

---

## 6. Risultato finale

* **SSP**: mostra per ogni rischio → controlli applicati / tailoring / giustificazione.
* **53A Test Plan**: deriva automaticamente dai controlli selezionati, con metodi di verifica (interview, examine, test).
* **POA\&M**: se ad es. il firewall SC-7 non è ancora in produzione, registri come gap con milestone di implementazione.

---

✅ **Sintesi**:
La tracciabilità ti permette di dire:

* *“Ho un rischio R2 (HMI lock). Ho valutato AC-12 come NA per motivi di safety, ma ho compensato con PE-2. Lo documento in SSP. Lo testerò via 53A con evidenze badge log. Se non completo, lo metto in POA\&M.”*

