# Webinar OEM: Cybersecurity in ambiente OT (40')

> **Target**: Responsabili Ufficio Tecnico di OEM (macchine/impianti).
> **Obiettivo**: chiarire obblighi e opportunità, indicare requisiti minimi di prodotto/processo e una roadmap 90–180 giorni.

---

## Slide 0 (copertina — non conteggiata)

**Titolo**: Cybersecurity in OT per OEM: dal design alla manutenzione

* Sottotitolo: Cosa serve davvero per essere conformi e competitivi
* Relatore, azienda, data (ultima settimana di settembre)
  **Visual segnaposto**: \[Hero con icone ingranaggio + scudo + rete]

---

## Slide 00 (agenda — non conteggiata)

**Titolo**: Agenda & obiettivi

* Inquadramento OT per OEM
* Normative & standard: cosa tocca gli OEM
* Requisiti tecnici di prodotto & processo
* Roadmap 90–180 giorni e KPI
  **Visual segnaposto**: \[Timeline 40']

---

## Slide 1

**Titolo**: OT per un OEM: cosa cambia rispetto all’IT

* Il ciclo di vita macchina: progettazione → FAT/SAT → esercizio → service
* Priorità: **safety** e **disponibilità** prima della riservatezza
* Vincoli: impianti H24, legacy, finestre di fermo ridotte
  **Visual segnaposto**: \[Schema "dispositivo → cella → linea → stabilimento" con highlight OEM]

---

## Slide 2

**Titolo**: Obiettivi di sicurezza in OT

* Prevenire impatti su persone, qualità e continuità operativa
* Integrare safety e security: interlock e modalità di manutenzione
* Approccio risk-based: impatto × probabilità
  **Visual segnaposto**: \[Matrice rischio 3×3 con esempi funzioni macchina]

---

## Slide 3

**Titolo**: Minacce tipiche per prodotti OEM

* Compromissione supply chain e firmware/boot
* Abusi della manutenzione remota e credenziali di default
* Esposizione servizi non necessari/porte di servizio
  **Visual segnaposto**: \[4 icone minacce + mini-caso reale (1 riga)]

---

## Slide 4

**Titolo**: Architetture OT e superfici d’attacco

* Purdue Model: dove vive il componente OEM
* Edge/PLC/HMI: canali fieldbus, Ethernet, seriale
* Interfacce per service: USB, Wi‑Fi/4G, VPN, cloud
  **Visual segnaposto**: \[Diagramma Purdue con evidenza dei punti d’accesso]

---

## Slide 5

**Titolo**: Panorama regolatorio per OEM

* **NIS2**: doveri come fornitore verso operatori essenziali/importanti
* **CRA**: requisiti di prodotto (secure by design, gestione vulnerabilità, SBOM)
* **GDPR**: touchpoint (teleassistenza/log) quando dati personali sono trattati
* **Reg. Macchine / RED**: sicurezza funzionale e connettività/IoT
  **Visual segnaposto**: \[Tabella “Chi riguarda / Cosa richiede / Impatto su prodotto”]

---

## Slide 6

**Titolo**: CRA in pratica per l’OEM

* PSIRT/VDP, gestione vulnerabilità e tempi di supporto dichiarati
* SBOM e governance componenti/terze parti
* Aggiornamenti sicuri (OTA), firma e verifica, hardening by default
  **Visual segnaposto**: \[Checklist minima + timeline conformità alto livello]

---

## Slide 7

**Titolo**: IEC 62443 per OEM (focus -4-1 e -4-2)

* **62443‑4‑1**: processo di sviluppo sicuro (requisiti → design → verifica)
* **62443‑4‑2**: requisiti tecnici per componenti (auth, logging, secure update…)
* Legame con **62443‑3‑3** a livello di sistema integrato
  **Visual segnaposto**: \[V‑Model con “gate” di sicurezza]

---

## Slide 8

**Titolo**: NIST CSF v2 come guida interna

* Mappare Identify–Protect–Detect–Respond–Recover su ruoli e processi
* Integrazione con Qualità e Service (non solo IT)
* Selezione controlli “sufficienti” per tempi/costi OEM
  **Visual segnaposto**: \[Mappa funzioni → ruoli (Tecnico, Qualità, Assistenza, IT/OT)]

---

## Slide 9

**Titolo**: Requisiti tecnici tipici di prodotto

* Autenticazione a ruoli, password uniche per unità, MFA dove possibile
* Secure boot, cifratura, protezione porte di servizio
* Logging/eventi e clock affidabile; aggiornamenti firmati/rollback
  **Visual segnaposto**: \[Tabella “Requisito → Evidenza/verifica in collaudo”]

---

## Slide 10

**Titolo**: Gestione vulnerabilità & patching

* Pipeline di build firmata, SCA/SAST e SBOM aggiornate
* Triage CVE, advisory al cliente, **MTTR** come KPI
* Strategia hotfix vs release; test in ambiente simulato
  **Visual segnaposto**: \[Flow “scoperta → fix → test → notifica → patch”]

---

## Slide 11

**Titolo**: SBOM & component governance

* Politiche di scelta librerie e gestione licenze
* Tracciabilità versioni, equivalenti e EoL/EoS
* Distribuzione SBOM al cliente (formati e canali)
  **Visual segnaposto**: \[Mock SBOM (5 righe) + box strumenti]

---

## Slide 12

**Titolo**: Supply Chain Security dell’OEM

* Requisiti minimi a capitolato per fornitori
* Collaudi d’ingresso e verifiche sicurezza
* Clausole contrattuali su vulnerabilità/aggiornamenti
  **Visual segnaposto**: \[Lista “minimi a capitolato” + snippet clausola 1 riga]

---

## Slide 13

**Titolo**: Configurazioni sicure di default

* Servizi inutili disabilitati, credenziali iniziali sicure
* Onboarding sicuro (provisioning chiavi/identità)
* Checklist **FAT/SAT** con controlli security
  **Visual segnaposto**: \[Checklist 10 punti spuntabili]

---

## Slide 14

**Titolo**: Manutenzione remota sicura

* Accessi **temporanei** e approvati; bastion/jump server o VPN
* Registrazione sessioni e audit trail; separazione ruoli
* Interlock di sicurezza e modalità manutenzione
  **Visual segnaposto**: \[Schema architettura teleassistenza]

---

## Slide 15

**Titolo**: Documentazione ed evidenze di conformità

* Manuale sicurezza e guida hardening per Asset Owner
* Rapporti di test/verifica e dichiarazioni (CRA/Macchine)
* Registro vulnerabilità e changelog firmware
  **Visual segnaposto**: \[Matrice “Documento → Chi lo prepara → Quando”]

---

## Slide Finale (call‑to‑action — non conteggiata)

**Titolo**: Roadmap 90–180 giorni & KPI

* Quick wins: password uniche, hardening baseline, registro vulnerabilità
* Avvio audit 62443‑4‑1 + toolchain SCA/SAST + PSIRT
* KPI: MTTR vulnerabilità, % patch distribuite, copertura SBOM
  **Visual segnaposto**: \[Mini‑Gantt + 3 tachimetri KPI]

---

## Appendice / Backup (3 slide)

**Backup A** — Checklist minima OEM (una pagina stampabile)
**Backup B** — Tabella mappatura NIS2 ↔ 62443 (governance, risk mgmt, incident reporting, supply chain)
**Backup C** — Mappa CRA ↔ (62443/ NIST CSF) su requisiti di prodotto e gestione vulnerabilità
**Visual segnaposto**: \[Tabelle sintetiche + QR per download]

---

### Note di stile per le slide

* 1 idea per slide, massimo 5 bullet, carattere leggibile, molto spazio bianco
* Preferire schemi e tabelle brevi a paragrafi
* Ogni slide include un box “**Impatto per l’OEM**” (costi/tempi/progetto)
* Palette neutra, icone lineari, niente animazioni pesanti
