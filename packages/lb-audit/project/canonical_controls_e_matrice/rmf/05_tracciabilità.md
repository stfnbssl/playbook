Capito 👍, andiamo a fondo di questo punto che sembra nebuloso: la **tracciabilità risk → control**.

---

## 1. Perché serve la tracciabilità

NIST insiste che i controlli non devono essere visti come “checklist”, ma come **risposta concreta a rischi identificati**.

* Se **parto da baseline/overlay** e non collego ai rischi, rischio di implementare misure inutili o di trascurare gap importanti.
* Se **collego RA ↔ controlli**, posso dimostrare:

  * *Perché* un controllo è presente,
  * *Perché* un controllo è modificato o escluso,
  * *Quale rischio resta scoperto* se un controllo non è applicabile.

Questo collegamento è richiesto da:

* **SP 800-37 Rev.2** (Risk Management Framework, Step 1–3),
* **SP 800-53A Rev.5** (Assessment Procedures, serve per testare i controlli scelti),
* **SSP (System Security Plan)**: documento dove giustifichi baseline, overlay, tailoring.
* **POA\&M (Plan of Action & Milestones)**: quando un rischio resta e non puoi chiuderlo subito.

---

## 2. Cosa vuol dire concretamente “risk → control”

Immagina un **RA cliente** che individua i seguenti rischi OT:

| Asset/Scenario             | Minaccia                        | Impatto   | Livello  |
| -------------------------- | ------------------------------- | --------- | -------- |
| PLC linea imbottigliamento | Malware via USB                 | Avail.    | High     |
| HMI packaging              | Operatore disattento / lock HMI | Safety    | High     |
| Gateway IT/OT              | Intrusione dalla rete corporate | Integrity | Mod/High |

Ora, i controlli NIST selezionati (baseline + overlay) vanno legati a questi rischi:

* **Malware via USB →** controlli come **SI-3 (Malicious Code Protection)**, **CM-7 (Least Functionality)**, **PE-3 (Physical Access)**.
* **Lock HMI →** controlli **AC-11 / AC-12**, ma con tailoring OT (es. no lock automatico su HMI safety-critical → compensazione con **PE-2 (Physical Access)** + logging).
* **Intrusione IT→OT →** controlli **SC-7 (Boundary Protection)** + enhancements, **SI-4 (Monitoring)** con regole di OT overlay.

---

## 3. Come rappresentare la tracciabilità

Puoi farlo in diversi formati:

### a) Matrice (classico risk → control mapping)

```text
Rischio                        → Controlli NIST applicati
--------------------------------------------------------
Malware via USB su PLC         → SI-3, CM-7, PE-3
Operatore inattento su HMI     → AC-11 (tailored), AC-12 (compensated NA), PE-2
Intrusione IT/OT               → SC-7, SC-7(3), SC-7(12), SI-4
```

### b) In OSCAL (con `back-matter` o `implementation-uuid`)

Puoi arricchire il tuo `implementation` con riferimenti a “risk statements”:

```yaml
implemented-requirement:
  uuid: ...
  control-id: ac-11
  props:
    - name: risk-mapping
      ns: https://example/ns/risk
      value: "RISK-002: Operatore inattento su HMI"
```

---

## 4. Benefici della tracciabilità

* **SSP (SP 800-18 + 800-37)**: giustifichi scelte, aggiunte, esclusioni → il revisore vede che non è arbitrio.
* **53A (Assessment Procedures)**: colleghi procedure di test ai rischi → puoi dimostrare coverage.
* **POA\&M**: se un rischio rimane senza controllo efficace, lo documenti e pianifichi remediation.
* **Audit/Authority (es. regulator, NISTIR 8286)**: mostri coerenza tra RA e control set.

---

✅ **In sintesi**:
“Risk → Control” significa che non ti fermi a dire “il mio set è baseline+overlay”, ma **mappi ogni rischio del RA** ad almeno un controllo NIST (selezionato/tailored/sostituito). È il collante che rende il pacchetto **difendibile** in un SSP, **verificabile** con 53A, e **gestibile** con POA\&M.

