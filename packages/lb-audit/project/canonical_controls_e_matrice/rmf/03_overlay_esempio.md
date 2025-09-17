Perfetto — ecco un mini-flusso **pseudo-OSCAL** che mostra come partire da una **baseline 800-53R5** e applicare un **overlay ICS/OT (SP 800-82R3)** su alcuni controlli rappresentativi. Ho usato YAML per leggibilità (in fondo metto anche l’equivalente JSON abbreviato). I nomi dei campi seguono il **Profile Model** di OSCAL (semplificato), quindi considera che gli identificativi dei parametri (`*_prm_*`) vanno allineati al tuo catalogo reale.

---

# 1) Profile – Baseline (es. MODERATE)

```yaml
# file: profiles/800-53r5_moderate-baseline.yaml
profile:
  uuid: 11111111-1111-1111-1111-111111111111
  metadata:
    title: NIST SP 800-53 Rev.5 – Moderate Baseline
    version: 1.0.0
  imports:
    - href: catalogs/800-53r5/catalog.json
      include-controls:
        # (Esempio ridotto: in pratica qui la baseline elenca TUTTI i controlli Moderate)
        with-ids: [ "ac-2", "ac-11", "ac-12", "cm-7", "sc-7", "si-4" ]
  merge:
    as-is: true
    combine:
      method: keep
  # Nessuna modifica qui: è la baseline "pura"
```

---

# 2) Profile – ICS Overlay (SP 800-82R3) applicato alla baseline

```yaml
# file: profiles/ics-overlay_on_moderate.yaml
profile:
  uuid: 22222222-2222-2222-2222-222222222222
  metadata:
    title: ICS/OT Overlay (SP 800-82R3) applicato alla Moderate Baseline
    version: 1.0.0
  imports:
    # Importa la BASELINE Moderate come sorgente
    - href: profiles/800-53r5_moderate-baseline.yaml

  merge:
    as-is: true
    combine:
      method: keep   # mantieni ciò che non viene esplicitamente cambiato

  modify:
    # --- ESEMPIO 1: AC-12 (Session Termination) — Tailoring per HMI/console OT ---
    - control-id: ac-12
      alters:
        # Opzione A (scoping/tailoring): marcare non applicabile per HMI critiche
        - adds:
            props:
              - name: applicability
                ns: https://example/ns/overlay/ics
                value: not-applicable
                remarks: >
                  Per postazioni HMI/console operative su reti ICS, la terminazione automatica
                  della sessione può introdurre rischi per availability/safety. Si applicano
                  compensating controls (es. AC-11 parametrizzato e supervisione fisica).
        # In alternativa alla marcatura NA, si può parametricare tempi/condizioni (Opzione B)
        - sets:
            params:
              - param-id: ac-12_prm_timeout   # Sostituisci con l’ID reale del parametro
                values:
                  - "non-applicabile su HMI di area A/B; 30 min su postazioni di engineering non safety-critical"
              - param-id: ac-12_prm_conditions
                values:
                  - "non forzare termination durante operazioni di controllo in corso"

    # --- ESEMPIO 2: AC-11 (Session Lock) — Parametrizzazione sicura per OT ---
    - control-id: ac-11
      alters:
        - sets:
            params:
              - param-id: ac-11_prm_lock_timeout
                values: [ "15 minuti su workstation uffici; non applicare su HMI safety-critical" ]
        - adds:
            statements:
              - where: control
                part:
                  name: guidance
                  prose: >
                    Su HMI safety-critical usare un lock manuale controllato dall’operatore,
                    con supervisione fisica e logging, evitando lock automatici che possano
                    impedire interventi tempestivi.

    # --- ESEMPIO 3: SI-4 (System Monitoring) — Monitoring passivo di rete in ICS ---
    - control-id: si-4
      alters:
        - adds:
            statements:
              - where: control
                part:
                  name: guidance
                  prose: >
                    Preferire tecniche di monitoraggio passive (network TAP/SPAN, sFlow)
                    evitando agent intrusivi su PLC/RTU/HMI. Centralizzare i log su
                    infrastruttura separata e hardenizzata; validare che il traffico di
                    monitoraggio non impatti la latenza dei protocolli OT.
        - sets:
            params:
              - param-id: si-4_prm_monitoring_scope
                values: [ "Segmenti OT/L2–L3; DMZ industriale; flussi verso hist. e gateway IIoT" ]

    # --- ESEMPIO 4: CM-7 (Least Functionality) — Scoping specifico OT ---
    - control-id: cm-7
      alters:
        - adds:
            statements:
              - where: control
                part:
                  name: guidance
                  prose: >
                    Disabilitare servizi non necessari su HMI/engineer stations (es. SMB legacy,
                    servizi di stampa, browser generici). Vietare tool di scansione attivi
                    su reti OT operative; usare build “kiosk” per HMI.

    # --- ESEMPIO 5: SC-7 (Boundary Protection) — Aggiunta di enhancement per ICS ---
    - control-id: sc-7
      alters:
        # Aggiunta di enhancement tipici ICS (esempi illustrativi)
        - adds:
            by-ids: [ "sc-7(3)", "sc-7(12)" ]    # sostituisci con gli enhancement richiesti dall’overlay
        - adds:
            statements:
              - where: control
                part:
                  name: guidance
                  prose: >
                    Implementare Purdue model con separazioni L3/L3.5/DMZ industriale; firewall
                    stateful e application-aware per protocolli OT, one-way gateways per flussi
                    historian -> IT; regole di egress minimali e change control rigoroso.

    # --- ESEMPIO 6: (Facoltativo) Aggiunta di controlli supplementari specifici ICS ---
    # Se l’overlay prescrive controlli extra non nella baseline, puoi forzarne l’inclusione:
    - control-id: sr-3     # ESEMPIO: Supply Chain (se richiesto dall’overlay in un dato contesto)
      alters:
        - adds:
            props:
              - name: added-by-overlay
                ns: https://example/ns/overlay/ics
                value: "SP 800-82R3"
            statements:
              - where: control
                part:
                  name: guidance
                  prose: >
                    Richiedere hardening e SBOM per dispositivi OT; criteri di qualifica fornitori;
                    validazione patch/firmware in ambiente di test prima della messa in produzione.
```

> Nota: in OSCAL reale, gli oggetti sotto `modify.alters` possono essere rappresentati come `alter` con sotto-elementi `add`, `set-parameter`, `remove`, `prop`, `link`, ecc. Qui ho usato etichette parlanti (`adds`, `sets`) per chiarezza. Mappa questi concetti ai costrutti del tuo parser OSCAL (es. `alters: [{ add: {...} }, { set-parameter: {...} }]`).

---

# 3) Output atteso dopo “profile resolution” (estratto)

Dopo la risoluzione del profilo `ics-overlay_on_moderate.yaml` contro il catalogo 800-53R5, otterrai un **control set finale** in cui:

```yaml
# file: resolved/ics_on_moderate_resolved_catalog.yaml (estratto illustrativo)
catalog:
  groups:
    - id: ac
      controls:
        - id: ac-11
          params:
            - id: ac-11_prm_lock_timeout
              values: [ "15 minuti su workstation uffici; non applicare su HMI safety-critical" ]
          parts:
            - name: guidance
              prose: "Su HMI safety-critical usare lock manuale con supervisione fisica..."
        - id: ac-12
          props:
            - name: applicability
              ns: https://example/ns/overlay/ics
              value: not-applicable
              remarks: "Motivazione safety/availability; compensating controls applicati"
    - id: sc
      controls:
        - id: sc-7
          enhancements:
            - id: sc-7(3)
            - id: sc-7(12)
          parts:
            - name: guidance
              prose: "Segmentazione Purdue, DMZ industriale, firewall OT-aware..."
    - id: si
      controls:
        - id: si-4
          params:
            - id: si-4_prm_monitoring_scope
              values: [ "Segmenti OT/L2–L3; DMZ industriale; flussi verso hist. e gateway IIoT" ]
          parts:
            - name: guidance
              prose: "Preferire monitoring passivo (TAP/SPAN), evitare agent su PLC/HMI..."
```

---

## Variante JSON (abbreviata)

```json
{
  "profile": {
    "uuid": "22222222-2222-2222-2222-222222222222",
    "metadata": { "title": "ICS/OT Overlay (SP 800-82R3) on Moderate", "version": "1.0.0" },
    "imports": [ { "href": "profiles/800-53r5_moderate-baseline.yaml" } ],
    "merge": { "as-is": true, "combine": { "method": "keep" } },
    "modify": [
      {
        "control-id": "ac-12",
        "alters": [
          {
            "adds": {
              "props": [
                {
                  "name": "applicability",
                  "ns": "https://example/ns/overlay/ics",
                  "value": "not-applicable",
                  "remarks": "Termination automatica non adatta a HMI critical; compensating controls."
                }
              ]
            }
          }
        ]
      },
      {
        "control-id": "si-4",
        "alters": [
          {
            "adds": {
              "statements": [
                {
                  "where": "control",
                  "part": {
                    "name": "guidance",
                    "prose": "Usare monitoring passivo (TAP/SPAN); evitare agent intrusivi su PLC/HMI."
                  }
                }
              ]
            }
          }
        ]
      }
    ]
  }
}
```

---

## Come usare questo schema nel tuo flusso

1. **Risolvi** prima la baseline (Low/Mod/High) ⇒ ottieni il set di controlli di partenza.
2. **Applica** il profilo overlay ICS ⇒ `modify` con:

   * `set-parameter` (parametrizzazione OT-safe),
   * `add` di guidance/enhancement/props,
   * `remove` (se l’overlay marca esplicitamente NA) oppure `prop applicability: not-applicable` con motivazione,
   * eventuali **controlli supplementari** richiesti dall’overlay.
3. **Genera** il catalogo risolto finale ⇒ è la tua “ICS-ready control set” per SSP, piani di audit e implementazione.

