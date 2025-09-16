# Cap. 10 — Glossario e risorse
> **Scopo**: 1 facciata complessiva. Fornire un **glossario minimo** (termini chiave spiegati in modo semplice, con rimando ai capitoli) e una **lista di risorse**: riferimenti normativi e collegamenti utili (da finalizzare in impaginazione).
> 
> **Pubblico**: lettori non specialisti e stakeholder tecnici (PMI/Asset Owner, OEM, Service Provider/SI).
--- 
## Metodo — **Canvas → Bozza → Merge**
* **Canvas** (questa pagina): struttura, prompt, tabelle modello, regole editoriali.
* **Bozza**: testo finito in linguaggio pratico; nessun link vivo (si inseriscono in produzione).
* **Merge**: inserimento della bozza sotto i prompt; **QC** con checklist di fine pagina.
--- 
### Regole editoriali (valide per tutto il capitolo)
* Spiega gli **acronimi alla prima occorrenza**; poi usa la sigla.
* Aggiungi tra parentesi una **parafrasi semplice** dei tecnicismi (es. *conduit* = canale di rete **controllato** tra zone).
* Ogni voce del glossario indica **dove si usa** (capitoli/sezioni) e il **riferimento IEC 62443** (parte/FR/SL se rilevante).
* Tono **pratico‑operativo**, vendor‑neutral, frasi brevi.
--- 
## 10.1 Glossario minimo (A→Z)
> **Modello tabellare** (compila brevemente, 1 riga per item):
> 
> | Termine | Definizione semplice (max 1 riga) | Dove si usa (capitoli) | Riferimento IEC 62443 |
> | ------- | --------------------------------- | ---------------------- | --------------------- |
**Seed (da completare/rivedere)**
* **IACS/OT** — sistemi di automazione e controllo industriale (impianto).  → Cap. 1–2; **‑1‑1**.
* **Zona (Zone)** — gruppo di asset con rischio simile.  → Cap. 2, 5; **FR5**, **‑3‑2**.
* **Conduit** — canale di comunicazione **controllato** tra zone.  → Cap. 2, 5; **FR5**.
* **SL / SL‑Target / SL‑Achieved** — livello di sicurezza obiettivo/ottenuto **per FR**.  → Cap. 2, 3; **SL0–SL4**.
* **FR1–FR7** — 7 aree di controllo (identità → disponibilità).  → Cap. 2, 5; **‑3‑3**.
* **DMZ** — zona cuscinetto IT/OT per scambio dati.  → Cap. 2, 5; **FR5**.
* **RBAC** — controllo accessi basato su ruoli.  → Cap. 5; **FR2**.
* **MFA** — autenticazione a più fattori.  → Cap. 3, 5; **FR1**.
* **SOC** — centro operativo di sicurezza.  → Cap. 3, 5; **FR6**.
* **PSIRT** — team gestione vulnerabilità di prodotto.  → Cap. 3, 5, 6; **‑4‑1**.
* **SBOM** — distinta componenti software.  → Cap. 3, 5, 6; **‑4‑1/‑4‑2**.
* **FAT/SAT** — collaudo in fabbrica/sito.  → Cap. 2; **‑3‑3**.
* **RPO/RTO** — obiettivi di punto/tempo di ripristino.  → Cap. 5; **FR7**.
* **Allow/Whitelisting** — consentire **solo** ciò che è autorizzato.  → Cap. 2, 5; **FR5**.
* **CVE/CVSS** — catalogo e punteggio vulnerabilità.  → Cap. 3, 5; **‑2‑3**.
* **CVD** — divulgazione coordinata delle vulnerabilità.  → Cap. 3, 6; **PSIRT**.
* **Staging** — ambiente di prova pre‑produzione.  → Cap. 3, 5; **‑2‑3/‑3‑3**.
* **Baseline (hardening)** — configurazione sicura di riferimento.  → Cap. 5; **FR3**.
* **Break‑glass** — accesso d’emergenza con post‑review.  → Cap. 3, 5; **FR1/FR2**.
* **Two‑person rule** — approvazione a due persone per attività critiche.  → Cap. 3; **‑2‑1**.
* **SIS/ESD** — sistemi di sicurezza strumentata / arresto di emergenza.  → Cap. 7; **FR7**.
* **HMI/PLC/DCS/SCADA** — interfacce e sistemi di controllo.  → Cap. 2, 5, 7; **‑1‑1**.
**Prompt operativo — Glossario**
“Compila la tabella del **Glossario minimo** con definizioni **in una riga**, aggiungendo ‘Dove si usa’ e ‘Riferimento IEC 62443’ per ogni termine; mantieni toni semplici e coerenti.”
--- 
## 10.2 Riferimenti normativi (mappa rapida)
> **Modello tabellare** (riassunto in 1 riga per item):
> 
> | Oggetto | Documento/standard | Scopo (1 riga) | Pubblico/ruolo | Uso nella guida |
> | ------- | ------------------ | -------------- | -------------- | --------------- |
**Seed (da completare/rivedere)**
* **Terminologia e concetti** — IEC **62443‑1‑1** — base comune — tutti — Cap. 2.
* **Programma sicurezza OT** — IEC **62443‑2‑1** — governance/processi — **Asset Owner** — Cap. 3.
* **Patch & vuln mgmt** — IEC **62443‑2‑3** — processo OT — Owner/SI/OEM — Cap. 3, 5.
* **Service providers** — IEC **62443‑2‑4** — requisiti servizio — Service Provider/SI — Cap. 3, 5.
* **Risk & SL‑Target** — IEC **62443‑3‑2** — analisi rischio/SL — Owner/SI — Cap. 2.
* **System Requirements** — IEC **62443‑3‑3** — requisiti di sistema (FR1–FR7) — SI/OEM — Cap. 2, 5.
* **Secure Dev Lifecycle** — IEC **62443‑4‑1** — ciclo sviluppo sicuro — OEM — Cap. 3, 5.
* **Requisiti di componente** — IEC **62443‑4‑2** — capability prodotto — OEM — Cap. 2, 3, 5.
* **Direttiva NIS2** — **UE** — requisiti organizzativi e notifiche — Owner/Legal — Cap. 6.
* **NIST SP 800‑82** — **NIST** — guida sicurezza ICS — SI/Owner — Cap. 2, 5.
    *(entuali norme settoriali: ISO 27019/energia, ecc., da valutare in revisione)*
**Prompt operativo — Riferimenti**
“Compila la tabella **Riferimenti normativi** indicando per ogni documento: scopo in 1 riga, pubblico, punto d’uso nella guida. Nessun link vivo in bozza (si inseriscono a impaginazione).”
--- 
## 10.3 Risorse utili (fonti istituzionali e tecniche)
> **Modello tabellare** (riassunto, 1 riga per item):
> 
> | Categoria | Ente/Sito | Contenuto | Come usarla nella guida |
> | --------- | --------- | --------- | ----------------------- |
**Seed (categorie/esempi, link da aggiungere in produzione)**
* **Standard IEC/ISA** — portali ufficiali (schede standard, sommari).
* **ENISA** — guide e report su NIS/NIS2, supply chain.
* **CISA/ICS‑CERT** — advisory ICS, allerta e pratiche.
* **FIRST/Forum** — risorse **PSIRT** e **CVSS**.
* **MITRE** — **CVE/CWE** (cataloghi e spiegazioni).
* **SPDX/OWASP CycloneDX** — formati **SBOM**.
* **ISAC settoriali** — condivisione informazioni (energia, acqua, manifattura).
**Prompt operativo — Risorse**
“Elenca 6–10 **risorse utili** (istituzionali/tecniche), descrivendo in 1 riga il contenuto e come usarle nella guida; i link si aggiungono in fase di impaginazione.”
--- 
## 10.4 Note su link, citazioni e licenze
* **Niente link vivi** nella bozza: indicare solo ente/documento/anno; i link si inseriscono in impaginazione.
* Evitare **citazioni lunghe**: usare parafrasi con attribuzione.
* Verificare **condizioni d’uso** dei contenuti (copyright, marchi).
--- 
## Checklist finale (QA redazionale — Cap. 10)
* [ ] Glossario compilato con definizioni **in una riga** e rimandi ai capitoli.
* [ ] Tabella **Riferimenti normativi** completa e coerente.
* [ ] **Risorse utili** bilanciate (istituzionali/tecniche), senza link vivi.
* [ ] Tono semplice e pratico; acronimi spiegati.
* [ ] Coerenza con termini usati nei cap. 1–7 e nelle **8 Schede Casi**.
### sys_source https://chatgpt.com/c/68b73c35-0298-8328-a7b9-76f473241645