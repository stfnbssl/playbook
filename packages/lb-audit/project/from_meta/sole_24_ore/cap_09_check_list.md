# Cap. 9 — Checklist essenziale “per non addetti” (15 passi)
> **Scopo**: 1 facciata, linguaggio semplice, per guidare chi **non è specialista** OT/IEC 62443 ai **primi passi concreti**.
> **Output**: una checklist **spuntabile** con riferimenti ai capitoli della guida, alle aree **FR1–FR7** e alle **evidenze** minime da raccogliere.
--- 
## Metodo di lavoro — **Canvas → Bozza → Merge**
* **Canvas** (questa pagina): struttura, voce semplice, prompt e segnaposto.
* **Bozza**: testo finale pronto per impaginazione.
* **Merge**: inserimento della bozza nel canvas e **QC** con checklist.
--- 
### Regole editoriali (linguaggio semplice)
* Spiega gli **acronimi** alla prima occorrenza; poi usa la sigla.
* Evita gergo: aggiungi tra parentesi la **parafrasi** (*es. conduit = canale di rete controllato*).
* Ogni passo indica **chi decide** (owner) e **chi fa** (esecutore).
* Chiudi con **cosa tenere come prova** (evidenze).
* Se **non applicabile**, segna **N/A** e scrivi **perché**.
--- 
## Checklist 15 passi (spuntabile)
> **Istruzioni**: spunta ✓ quando il punto è completato. Compila eventuali **azioni** e **scadenze**.
1. ☐ **Nomina responsabili e perimetro**
**Cosa**: nomina uno **sponsor** e un **referente OT**; definisci impianti/linee nel **perimetro**.
**Chi**: *decide* Direzione/Owner; *fa* Referente OT.
**Evidenze**: nomina scritta; perimetro.
**Rif.**: Cap. 1, 3 — FR7.
2. ☐ **Inventario minimo asset**
**Cosa**: elenco di base (nome, funzione, modello/versione, criticità, owner).
**Chi**: *fa* OT/Manutenzione con supporto SI.
**Evidenze**: file inventario.
**Rif.**: Cap. 5.6; Cap. 2.1 — FR3/FR7.
3. ☐ **Mappa Zone & Conduits (bozza)**
**Cosa**: disegna le **Zone** (gruppi di asset simili) e i **Conduits** (canali controllati) con **DMZ**.
**Chi**: *decide* Owner; *fa* SI/OT.
**Evidenze**: schema rete con DMZ.
**Rif.**: Cap. 2.2; Cap. 5.5 — FR5.
4. ☐ **Definisci SL‑Target per zona**
**Cosa**: imposta i **Livelli di Sicurezza** (SL0–SL4) realistici per ogni **FR**.
**Chi**: *decide* Owner con SI; *fa* OT.
**Evidenze**: matrice **Zona × FR (SL‑T)**.
**Rif.**: Cap. 2.1; Cap. 2.4 — FR1–FR7.
5. ☐ **Policy accessi remoti**
**Cosa**: usa un **broker** (salto controllato), **MFA** (più fattori) e approvazioni **a tempo**.
**Chi**: *decide* Owner; *fa* SI/Service Provider.
**Evidenze**: policy firmata; registro approvazioni.
**Rif.**: Cap. 3.4; Cap. 5.5 — FR1/FR2/FR5.
6. ☐ **Account & ruoli (RBAC)**
**Cosa**: solo **account nominativi**, ruoli **minimi**; gestisci **emergenza** (break‑glass) con revisione.
**Chi**: *decide* Owner/OT; *fa* SI/IT‑IdM.
**Evidenze**: matrice ruolo→permessi; registro audit.
**Rif.**: Cap. 5.1 — FR1/FR2.
7. ☐ **Backup baseline + test**
**Cosa**: esegui **backup** iniziale e prova il **ripristino**.
**Chi**: *decide* Owner/OT; *fa* OT/SI.
**Evidenze**: report backup; esito test.
**Rif.**: Cap. 5.4 — FR7.
8. ☐ **Logging & monitoring (minimo)**
**Cosa**: centralizza **log** (accessi remoti, cambi, allarmi) e definisci 3–5 **use case** base.
**Chi**: *decide* Owner; *fa* SI/SOC.
**Evidenze**: piano logging; esempi log.
**Rif.**: Cap. 5.3 — FR6.
9. ☐ **Hardening di base**
**Cosa**: disattiva servizi inutili, configura **default sicuri**, versiona le **configurazioni**.
**Chi**: *fa* SI/OT.
**Evidenze**: checklist hardening; repository config.
**Rif.**: Cap. 5.2 — FR3.
10. ☐ **Patch & vulnerability management**
    **Cosa**: calendario **patch**, ambiente di **staging** per provare, eccezioni con **compensazioni**.
    **Chi**: *decide* Owner; *fa* SI con OEM/PSIRT.
    **Evidenze**: piano patch; registro eccezioni.
    **Rif.**: Cap. 3.5; Cap. 5.6 — FR3/FR7.
11. ☐ **Supply chain & procurement**
    **Cosa**: clausole minime: **SDL 4‑1**, **requisiti 4‑2**, **SBOM**, **PSIRT**, **session recording**.
    **Chi**: *decide* Owner/Acquisti; *fa* Legale/Procurement.
    **Evidenze**: capitolati; checklist qualifica fornitore.
    **Rif.**: Cap. 3.3; Cap. 6.3 — FR1–FR7.
12. ☐ **Validazione/test (FAT/SAT) & change**
    **Cosa**: prova in **staging**, definisci **test** e registra le **evidenze**; usa ticket per i **change**.
    **Chi**: *decide* Owner/OT; *fa* SI/OEM.
    **Evidenze**: piano FAT/SAT; verbali test; ticket change.
    **Rif.**: Cap. 2.3 — FR1–FR7.
13. ☐ **KPI minimi**
    **Cosa**: scegli 5 KPI (es. % asset inventariati, **patch coverage**, **MTTD/MTTR**, % sessioni con **MFA**).
    **Chi**: *decide* Owner; *fa* OT/SOC.
    **Evidenze**: cruscotto mensile.
    **Rif.**: Cap. 3.7; Cap. 5.7.
14. ☐ **Notifiche & NIS2 (se applica)**
    **Cosa**: prepara **runbook** e **template** di **notifica** a autorità/CSIRT (secondo norme nazionali).
    **Chi**: *decide* Owner/Legal; *fa* OT/SOC/Legal.
    **Evidenze**: policy di notifica; registro incidenti.
    **Rif.**: Cap. 6.2–6.5 — FR6/FR7.
15. ☐ **Roadmap 30/90/180 & miglioramento**
    **Cosa**: pianifica tappe con **owner**, **dipendenze** e **criteri di successo**; audit periodico.
    **Chi**: *decide* Owner; *fa* OT/SI.
    **Evidenze**: roadmap firmata; verbali riesame.
    **Rif.**: Cap. 3.8; Cap. 2.3 — FR1–FR7.
--- 
## Prompt operativo (per generare la versione finale a 1 pagina)
“Scrivi la **Checklist essenziale per non addetti** (15 passi) in linguaggio semplice, mantenendo per ogni passo: cosa fare, chi decide/chi fa, quali **evidenze** tenere e i **riferimenti** a capitoli/FR. Prevedi caselle da spuntare e istruzioni su come segnare **N/A** e definire azioni correttive.”
--- 
## Glossario minimo (Cap. 9)
* **DMZ**: zona cuscinetto tra IT e OT per scambio dati controllato.
* **MFA**: autenticazione a più fattori.
* **RBAC**: controllo accessi basato sui ruoli.
* **FAT/SAT**: test di accettazione in fabbrica/sito.
* **PSIRT/SBOM**: team vulnerabilità di prodotto / distinta componenti software.
* **MTTD/MTTR**: tempo di rilevazione/ripristino.
--- 
## Checklist qualità (QC redazionale — Cap. 9)
* [ ] Voce semplice, acronimi spiegati.
* [ ] 15 passi presenti, con **chi decide/chi fa**.
* [ ] Evidenze minime elencate.
* [ ] Riferimenti a capitoli e FR corretti.
* [ ] Caselle spuntabili e istruzioni N/A incluse.
* [ ] Tono pratico‑operativo, vendor‑neutral.