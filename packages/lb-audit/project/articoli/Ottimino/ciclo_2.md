# 📖 Ciclo 2 – Episodio 1 – L’Ufficio dei Badge (FR1 – IAC)

Optimino entra in un grande ufficio pieno di schedari e computer.
Sulle scrivanie ci sono pile di badge colorati, alcuni nuovi e scintillanti, altri vecchi e polverosi.

«Che posto è questo?» chiede incuriosito.
La Guida risponde: «È l’**ufficio delle identità**. Qui si creano, si gestiscono e si revocano gli account di tutti: umani, pacchetti e persino macchine.»

---

### 1. L’onboarding e l’offboarding

Un impiegato consegna un badge a un nuovo tecnico.
«Ecco il tuo **credential provisioning**: badge + password iniziale.»
Un altro invece restituisce il suo badge perché lascia l’azienda.
«Questo è l’**offboarding**: dobbiamo disattivare subito i suoi accessi.»
Optimino annuisce: «Scaricato modulo! Nessun ex-dipendente deve restare dentro!»

Buggy sbuca subito travestito da vecchio impiegato: «Ehi, ho ancora il mio vecchio badge… posso rientrare?»
Il Guardian lo blocca: «Accesso negato. Il tuo account è stato **revocato**.»

---

### 2. Politiche di password

Un pacchetto-tirocinante digita “1234” come password.
Optimino sgrana gli occhi-lente: «Ma è facilissima!»
La Guida scuote il capo: «Per questo servono **password policy**: lunghezza minima, complessità, e scadenza periodica. Così Buggy non può indovinare facilmente.»
Buggy sbuffa: «Uffa, non posso più usare “admin/admin”!».

---

### 3. Account unici e monitoraggio

Un Guardian distribuisce badge personalizzati: «Ognuno ha un **unique account**, niente condivisione.»
Sul muro brilla un grande schermo: è il sistema di **centralized identity management**, che mostra chi è dentro, chi è fuori e quando.
«Così possiamo fare **audit trail** delle identità» spiega la Guida.

---

### 4. Device identity

Optimino nota che non solo le persone ricevono badge, ma anche i macchinari e i laptop dei tecnici.
«È la **machine identity**» dice la Guida. «Anche i dispositivi devono autenticarsi, non solo gli umani.»
Optimino applaude: «Scaricato modulo! Persino i camion digitali hanno la loro carta d’identità!»

---

### ✅ Epilogo Episodio 1

Buggy, con un badge scaduto in mano, sbraita: «Non vale! Una volta potevo rientrare senza problemi!»
Optimino lo indica col dito multi-tool: «Ora ho imparato che la gestione delle identità non è solo tecnologia: servono processi chiari per creare, aggiornare e revocare gli account.»

📘 Diario digitale:

> Concetti scaricati: onboarding/offboarding, credential provisioning, revocation, password policy, unique account, centralized identity management, machine identity, audit trail.

---

# 📖 Ciclo 2 – Episodio 2 – I Permessi dei Manutentori (FR2 – UC)

Optimino arriva in una sala dove ci sono tanti armadietti digitali.
Ogni armadietto ha un cartello: *Operatore*, *Supervisore*, *Amministratore*, *Manutentore esterno*.
Davanti, una fila di persone e macchine aspetta il proprio turno.

---

### 1. Ruoli chiari

Un Guardian distribuisce chiavi diverse:
«Questa per l’operatore: può solo avviare e fermare macchine.
Questa per il supervisore: può anche cambiare parametri.
Questa per l’amministratore: accesso completo.»
Optimino applaude: «È la **Role-Based Access Control (RBAC)**! Ogni ruolo ha i suoi permessi.»

Buggy prova a rubare la chiave dell’amministratore: «Con questa faccio tutto io!»
Il Guardian la ritira subito: «Tentativo di **privilege escalation**!»

---

### 2. Account temporanei

Un tecnico esterno riceve una chiave che brilla di colore arancione.
«Questa è un’**account temporaneo**: valido solo per la durata della manutenzione» spiega la Guida.
Optimino sorride: «Scaricato modulo! Così non resta in giro per sempre.»

Buggy tenta di usare una vecchia chiave scaduta, ma il Guardian lo caccia via: «Accesso negato. L’account era temporaneo e ora è chiuso.»

---

### 3. Separazione dei compiti

Due tecnici si presentano insieme: uno per configurare, l’altro per validare.
«È la **separation of duties**» dice la Guida. «Così nessuno può fare da solo un cambiamento pericoloso.»
Optimino annuisce: «Scaricato modulo! Se lavori in coppia, Buggy non passa.»

---

### 4. Least privilege

Un manutentore chiede accesso completo “tanto per comodità”.
Il Guardian rifiuta: «Solo i permessi minimi necessari: è il **principle of least privilege**.»
Optimino fa una linguaccia a Buggy: «Niente scorciatoie, piccolo virus!»

---

### 5. Accessi di emergenza

Un allarme suona: una valvola si blocca.
Un manutentore riceve una chiave rossa speciale.
«È l’**emergency account**» spiega la Guida. «Si usa solo per situazioni critiche e viene registrato nel log.»
Optimino corre dietro di lui, prendendo nota veloce: «Scaricato modulo!»

---

### ✅ Epilogo Episodio 2

Buggy, arrabbiato, brontola: «Troppi limiti, troppe regole! Non posso più girare liberamente!»
Optimino risponde deciso: «Ho imparato che i ruoli, i privilegi minimi e gli account temporanei servono a impedire abusi e confusione.»

📘 Diario digitale:

> Concetti scaricati: RBAC, privilege escalation, account temporanei, separation of duties, least privilege, emergency account.

---

# 📖 Ciclo 2 – Episodio 3 – La Sala delle Modifiche (FR3 – System Integrity)

Optimino entra in una stanza enorme, piena di scaffali e registri digitali che lampeggiano come libri viventi.
Ogni tanto, un Guardian appiccica un sigillo luminoso su un registro, come se fosse una ceralacca.

«Benvenuto nella **sala delle modifiche**» dice la Guida. «Qui teniamo traccia di ogni aggiornamento ai sistemi. Senza procedure chiare, l’integrità va persa.»

---

### 1. Inventario aggiornato

Optimino nota una grande lavagna dove sono elencati tutti i dispositivi della fabbrica: PLC, HMI, server.
«Questo è l’**asset inventory**» spiega la Guida. «Serve a sapere cosa c’è in campo, altrimenti non possiamo proteggerlo.»
Buggy ride: «Hehe, se manca un dispositivo dalla lista, io ci entro di nascosto!»

---

### 2. Patch management

Un Guardian consegna a uno gnomo-PLC un pacchetto sigillato:
«È una **patch di sicurezza**. Va installata secondo le procedure.»
Optimino chiede: «E se qualcuno la dimentica?»
La Guida risponde: «Buggy approfitta delle vulnerabilità non corrette. Per questo serve un **patch management plan**.»

---

### 3. Change control

Un tecnico alza la mano: «Vorrei cambiare la configurazione del sistema.»
Il Guardian risponde: «Serve un documento di approvazione. Ogni modifica deve seguire il **change control**.»
Optimino annuisce: «Scaricato modulo! Così nessuno cambia le cose a caso.»

---

### 4. Code signing e versioni

In uno scaffale, Optimino trova CD e chiavette con software etichettati. Alcuni hanno un timbro digitale, altri no.
«Quelli con il sigillo hanno la **firma digitale (code signing)**. Garantisce che il software non sia stato alterato.»
Accanto c’è una libreria con i numeri delle versioni: v1.0, v1.1, v2.0.
«È il **version control**» spiega la Guida.

---

### 5. Malware protection

Buggy tenta di infilare un file corrotto dentro un PLC.
All’improvviso una barriera di luce lo respinge:
«È il sistema di **malware protection**. Non basta la tecnologia, servono anche regole su cosa installare e chi può farlo.»

---

### ✅ Epilogo Episodio 3

Optimino tira un sospiro di sollievo: «Oggi ho imparato che l’integrità si difende non solo con software sicuri, ma anche con regole: inventario, patch gestite, cambi approvati, firme digitali e controllo delle versioni.»

Buggy, scottato, urla: «Troppa burocrazia! Non riesco a fare i miei giochetti!»

📘 Diario digitale:

> Concetti scaricati: asset inventory, patch management, change control, code signing, version control, malware protection.

---

# 📘 Diario Digitale di Optimino – Ciclo 2 (dopo Episodio 3)

### Episodio 1 – L’Ufficio dei Badge (FR1 – IAC)

Ho imparato che le identità vanno gestite come documenti vivi.

* **Onboarding/offboarding**.
* **Credential provisioning & revocation**.
* **Password policy**.
* **Unique account**.
* **Centralized identity management**.
* **Machine identity** per dispositivi.

---

### Episodio 2 – I Permessi dei Manutentori (FR2 – UC)

Ho visto che i ruoli devono essere chiari e i privilegi limitati.

* **RBAC** con ruoli definiti.
* **Privilege escalation** da bloccare.
* **Account temporanei** per esterni.
* **Separation of duties**.
* **Least privilege**.
* **Emergency account** controllati.

---

### Episodio 3 – La Sala delle Modifiche (FR3 – SI)

Ho capito che l’integrità non si difende da sola: servono regole.

* **Asset inventory**.
* **Patch management**.
* **Change control**.
* **Code signing**.
* **Version control**.
* **Malware protection**.

---

✅ **Stato intermedio:**
Buggy tenta di approfittare di dimenticanze e procedure assenti, ma con regole di identità, ruoli e integrità ho imparato a fermarlo meglio.

---

# 📖 Ciclo 2 – Episodio 4 – L’Archivio dei Segreti (FR4 – Data Confidentiality)

Optimino entra in una stanza silenziosa, piena di scaffali digitali. Su ogni scaffale ci sono cartelle luminose, alcune chiuse da lucchetti, altre lasciate aperte.

«Che posto è questo?» chiede.
«È l’**archivio dei dati**» risponde la Guida. «Qui si decide chi può leggere cosa, e come proteggere le informazioni sensibili.»

---

### 1. Classificazione dei dati

Un Guardian prende due cartelle: una è etichettata *Pubblica*, l’altra *Confidenziale*.
«Prima di proteggere i dati, bisogna classificarli: pubblici, interni, riservati, segreti. È la **data classification**.»
Optimino annota: «Scaricato modulo! Ogni informazione deve avere la sua etichetta.»

---

### 2. Politiche di accesso

Un operatore prova a prendere una cartella “Segreta”, ma il Guardian lo ferma:
«Non hai i permessi. Serve una **data access policy**: regole su chi può leggere o copiare certi file.»
Buggy si infila in una cartella aperta e ride: «Hehe, se non ci sono regole, faccio festa!»

---

### 3. Supporti rimovibili

Su un tavolo, Optimino vede chiavette USB sparse. Alcune brillano, altre hanno un alone sospetto.
La Guida avverte: «I supporti rimovibili devono essere controllati. Se porti fuori dati senza protezione, la **data confidentiality** è persa.»
Optimino afferra una chiavetta e la chiude in una scatola sicura: «Scaricato modulo!»

---

### 4. Laptop e dispositivi mobili

Un tecnico esce dall’ufficio con un portatile aperto, pieno di dati sensibili non cifrati.
Buggy lo segue zampettando: «Oh, quante informazioni gratis!»
Il Guardian lo richiama: «I dispositivi mobili devono avere **disk encryption** e policy di protezione, altrimenti sono porte aperte.»

---

### 5. Gestione delle chiavi

In fondo alla sala c’è un caveau digitale con un mazzo di chiavi luminose.
«Sono le **crypto keys**» dice la Guida. «Non basta avere la crittografia: bisogna anche gestire bene le chiavi, cambiarle periodicamente, revocarle quando serve.»
Buggy cerca di rubarne una, ma appena la tocca, svanisce in fumo.

---

### ✅ Epilogo Episodio 4

Optimino sorride: «Oggi ho imparato che i dati non sono tutti uguali: vanno classificati, protetti, e custoditi anche quando viaggiano su USB o laptop. E senza una buona gestione delle chiavi, la crittografia è inutile.»

Buggy, arrabbiato, sbatte le zampette digitali: «Uffa, non posso più leggere nulla!»

📘 Diario digitale:

> Concetti scaricati: data classification, data access policy, removable media control, disk encryption, key management.

---

# 📖 Ciclo 2 – Episodio 5 – Le Regole dei Confini (FR5 – Restricted Data Flow)

Optimino entra in una sala di controllo divisa a metà: da una parte gli uffici IT pieni di Pacchetti con giacca e cravatta, dall’altra l’officina OT, con gnomi-PLC che martellano su macchinari digitali.
In mezzo, un grande muro trasparente vibra di luce.

---

### 1. Zone di sicurezza

«Questa è la **zona IT**, e quella è la **zona OT**» spiega la Guida. «Ogni area ha i suoi confini, e non tutti i dati possono attraversarli.»
Optimino tocca il muro curioso: «Scaricato modulo! Questo è un **zone boundary**.»

Buggy appare con un trapano digitale: «Se buco il muro, posso fare viaggiare i dati come voglio!»

---

### 2. Conduits autorizzati

Il Guardian mostra un varco luminoso: «Solo qui i dati possono passare. È un **conduit**: un collegamento autorizzato e controllato.»
Un pacchetto cerca di passare da un buco laterale, ma viene respinto: «Accesso negato!».

---

### 3. Politiche di flusso

Un gruppo di tecnici discute davanti a un tavolo digitale.
«Serve un documento di approvazione per aprire nuovi flussi tra le zone» dice uno.
«È la **data flow policy**» spiega la Guida. «Senza regole scritte, ognuno apre tunnel a caso, e Buggy entra.»
Optimino annuisce: «Scaricato modulo! Prima si autorizza, poi si collega.»

---

### 4. Separazione dei domini

In una stanza vicina Optimino sente urlare: «Questo è mio! No, è mio!»
Sono i capi di IT e OT che litigano.
La Guida sospira: «Per gestire i flussi serve collaborazione. Senza accordi, Buggy approfitta dei conflitti.»
Buggy, ridacchiando, prova a correre da IT a OT: «Hehehe, nessuno mi ferma se i due non si parlano!»
Ma un Guardian lo blocca: «La separazione dei domini si decide con procedure comuni.»

---

### 5. Flussi minimi

Un pacchetto logorroico vuole passare per raccontare barzellette.
Il Guardian lo respinge: «Solo i dati indispensabili. È la regola del **least data flow**.»
Optimino applaude: «Scaricato modulo! Meno chiacchiere, più sicurezza.»

---

### ✅ Epilogo Episodio 5

Optimino scrive nel suo diario digitale:
«Oggi ho imparato che i dati devono muoversi solo attraverso conduits autorizzati, con regole scritte, e solo se strettamente necessari. IT e OT devono collaborare, altrimenti Buggy vince.»

Buggy, con il trapano spezzato in mano, brontola: «Sempre più muri e sempre meno divertimento!»

📘 Diario digitale:

> Concetti scaricati: zone IT/OT, zone boundary, conduits, data flow policy, separation of domains, least data flow.

---

# 📖 Ciclo 2 – Episodio 5 – Le Regole dei Confini (FR5 – Restricted Data Flow)

Optimino entra in una sala di controllo divisa a metà: da una parte gli uffici IT pieni di Pacchetti con giacca e cravatta, dall’altra l’officina OT, con gnomi-PLC che martellano su macchinari digitali.
In mezzo, un grande muro trasparente vibra di luce.

---

### 1. Zone di sicurezza

«Questa è la **zona IT**, e quella è la **zona OT**» spiega la Guida. «Ogni area ha i suoi confini, e non tutti i dati possono attraversarli.»
Optimino tocca il muro curioso: «Scaricato modulo! Questo è un **zone boundary**.»

Buggy appare con un trapano digitale: «Se buco il muro, posso fare viaggiare i dati come voglio!»

---

### 2. Conduits autorizzati

Il Guardian mostra un varco luminoso: «Solo qui i dati possono passare. È un **conduit**: un collegamento autorizzato e controllato.»
Un pacchetto cerca di passare da un buco laterale, ma viene respinto: «Accesso negato!».

---

### 3. Politiche di flusso

Un gruppo di tecnici discute davanti a un tavolo digitale.
«Serve un documento di approvazione per aprire nuovi flussi tra le zone» dice uno.
«È la **data flow policy**» spiega la Guida. «Senza regole scritte, ognuno apre tunnel a caso, e Buggy entra.»
Optimino annuisce: «Scaricato modulo! Prima si autorizza, poi si collega.»

---

### 4. Separazione dei domini

In una stanza vicina Optimino sente urlare: «Questo è mio! No, è mio!»
Sono i capi di IT e OT che litigano.
La Guida sospira: «Per gestire i flussi serve collaborazione. Senza accordi, Buggy approfitta dei conflitti.»
Buggy, ridacchiando, prova a correre da IT a OT: «Hehehe, nessuno mi ferma se i due non si parlano!»
Ma un Guardian lo blocca: «La separazione dei domini si decide con procedure comuni.»

---

### 5. Flussi minimi

Un pacchetto logorroico vuole passare per raccontare barzellette.
Il Guardian lo respinge: «Solo i dati indispensabili. È la regola del **least data flow**.»
Optimino applaude: «Scaricato modulo! Meno chiacchiere, più sicurezza.»

---

### ✅ Epilogo Episodio 5

Optimino scrive nel suo diario digitale:
«Oggi ho imparato che i dati devono muoversi solo attraverso conduits autorizzati, con regole scritte, e solo se strettamente necessari. IT e OT devono collaborare, altrimenti Buggy vince.»

Buggy, con il trapano spezzato in mano, brontola: «Sempre più muri e sempre meno divertimento!»

📘 Diario digitale:

> Concetti scaricati: zone IT/OT, zone boundary, conduits, data flow policy, separation of domains, least data flow.

---

# 📖 Ciclo 2 – Episodio 6 – Il Piano degli Allarmi (FR6 – Timely Response to Events)

Optimino entra in una sala piena di schermi che lampeggiano, telefoni che squillano e Guardian che corrono avanti e indietro.
«Che confusione!» esclama.
La Guida risponde: «Questa è la **sala di risposta agli incidenti**. Qui impariamo che non basta avere allarmi: bisogna sapere *chi fa cosa* quando suonano.»

---

### 1. Gli allarmi senza risposta

Un orologio digitale suona fortissimo: *ALERT! ALERT!*
Ma nessuno si muove. Un tecnico scrolla le spalle: «Pensavo toccasse a lui!»
Buggy approfitta e si infila tra i sistemi.
La Guida sospira: «Ecco il problema: senza ruoli chiari, gli allarmi non servono.»

---

### 2. Incident Response Plan

Un Guardian apre un grande libro luminoso.
«Questo è l’**incident response plan**: un manuale che dice chi deve reagire, in che ordine, con quali strumenti.»
Optimino lo sfoglia incuriosito: «Scaricato modulo! Così non si perde tempo prezioso.»

---

### 3. Le esercitazioni

Un gruppo di tecnici simula un attacco finto: i Guardian fanno scattare sirene, i registri iniziano a scrivere.
«Sono le **drills**» spiega la Guida. «Serve allenarsi, così quando arriva un vero incidente, non regna il caos.»
Buggy, confuso, cerca di capire se l’attacco è vero o falso: «Eh? Non capisco più niente!»

---

### 4. Preservare le evidenze

Un Guardian raccoglie file e log in una scatola protetta:
«Durante un incidente, bisogna fare **preservation of evidence**. Servono per capire cosa è successo e per migliorare le difese.»
Optimino annuisce: «Scaricato modulo! Anche i bug lasciano tracce digitali.»

---

### 5. Comunicazione chiara

Un tecnico prende un telefono e chiama la direzione: «Allarme contenuto, sistemi in sicurezza.»
«La **crisis communication** è parte del piano» dice la Guida. «Tutti devono sapere cosa dire e a chi.»
Buggy prova a fare confusione con falsi messaggi, ma viene smentito dal protocollo ufficiale.

---

### ✅ Epilogo Episodio 6

Optimino chiude il libro luminoso e sorride:
«Oggi ho imparato che serve un piano chiaro, esercitazioni regolari, ruoli definiti e regole di comunicazione. Così gli allarmi diventano azioni.»

Buggy si lamenta: «Non riesco più a sfruttare il panico! Troppa organizzazione!»

📘 Diario digitale:

> Concetti scaricati: incident response plan, roles & responsibilities, drills/esercitazioni, preservation of evidence, crisis communication.

---

# 📖 Ciclo 2 – Episodio 7 – Il Centro della Continuità (FR7 – Resource Availability)

Optimino entra in una sala enorme piena di generatori di riserva, armadi di backup e planimetrie luminose sulle pareti.
Sul tavolo centrale c’è un grande libro con la scritta: *Business Continuity & Disaster Recovery*.

«Wow!» esclama. «Sembra una centrale segreta!»
La Guida sorride: «Qui impariamo a garantire che la fabbrica resti disponibile anche se qualcosa va storto.»

---

### 1. Business Continuity Plan

Un Guardian indica il libro:
«Il **Business Continuity Plan (BCP)** dice come mantenere operative le funzioni critiche anche durante un’emergenza.»
Optimino sfoglia le pagine: «Scaricato modulo! Se Buggy rompe qualcosa, il lavoro deve continuare.»

---

### 2. Disaster Recovery Plan

In un armadio luminoso ci sono copie intere dei sistemi: server gemelli pronti a subentrare.
«È il **Disaster Recovery Plan (DRP)**» spiega la Guida. «Se perdiamo un datacenter, ripartiamo da qui.»
Buggy prova a staccare un server, ma subito un altro prende il suo posto: «Argh!»

---

### 3. Manutenzione preventiva

Optimino osserva tecnici che oliavano ingranaggi e testavano generatori.
«La **preventive maintenance** serve per evitare guasti prima che succedano» dice la Guida.
Optimino prende nota: «Scaricato modulo! Meglio prevenire che curare.»

---

### 4. SLA con fornitori

Un gruppo di Pacchetti-consegna entra con contratti firmati.
«Sono i fornitori di energia e connettività» spiega la Guida. «Devono garantire disponibilità minima con **Service Level Agreement (SLA)**.»
Buggy cerca di strappare un contratto, ma viene fulminato da un sigillo digitale.

---

### 5. Recovery test

Un Guardian spegne di colpo una macchina.
In pochi secondi, il sistema si riavvia da un backup.
«Sono i **recovery test**» spiega la Guida. «Non basta avere un piano: bisogna provarlo regolarmente.»
Optimino ride: «Scaricato modulo! È come allenarsi per una gara!»

---

### ✅ Epilogo Episodio 7

Optimino sorride soddisfatto:
«Oggi ho imparato che la disponibilità non è solo macchine ridondanti, ma anche piani scritti, manutenzione, contratti e prove regolari.»

Buggy, frustrato, grida: «Neanche i blackout mi servono più! Troppa resilienza!»

📘 Diario digitale:

> Concetti scaricati: Business Continuity Plan (BCP), Disaster Recovery Plan (DRP), preventive maintenance, SLA con fornitori, recovery test.

---

## 🎉 Conclusione Ciclo 2

Optimino ha completato anche il secondo ciclo di addestramento:

* **FR1 – Identità e autenticazione organizzativa** ✔
* **FR2 – Controllo degli usi e ruoli** ✔
* **FR3 – Integrità con processi di gestione** ✔
* **FR4 – Confidenzialità dei dati organizzata** ✔
* **FR5 – Flussi regolati tra IT e OT** ✔
* **FR6 – Risposta tempestiva con piani ed esercitazioni** ✔
* **FR7 – Disponibilità garantita da piani e contratti** ✔

La Guida gli dice:
«Hai visto, piccolo, che la sicurezza non è solo tecnica? Senza regole, processi e responsabilità chiare, anche le difese migliori crollano.»

Optimino stringe le manine multi-tool:
«Scaricato modulo! Ora sono pronto a scendere ancora più in profondità, dentro i dispositivi stessi!»

---

# 📘 Diario Digitale di Optimino – Ciclo 2 (Episodi 4–7)

### Episodio 4 – L’Archivio dei Segreti (FR4 – DC)

Ho imparato che i dati vanno **classificati e protetti**.

* **Data classification**.
* **Data access policy**.
* **Removable media control**.
* **Disk encryption** su laptop e dispositivi mobili.
* **Key management** rigoroso.

---

### Episodio 5 – Le Regole dei Confini (FR5 – RDF)

Ho visto che i flussi devono essere scritti e approvati.

* **Zone IT/OT**.
* **Zone boundary & conduits**.
* **Data flow policy**.
* **Separation of domains (IT/OT collaboration)**.
* **Least data flow**.

---

### Episodio 6 – Il Piano degli Allarmi (FR6 – TRE)

Ho imparato che senza organizzazione, gli allarmi sono inutili.

* **Incident Response Plan**.
* **Ruoli e responsabilità**.
* **Drills/esercitazioni**.
* **Preservation of evidence**.
* **Crisis communication**.

---

### Episodio 7 – Il Centro della Continuità (FR7 – RA)

Ho scoperto che la disponibilità si costruisce con piani e prove.

* **Business Continuity Plan (BCP)**.
* **Disaster Recovery Plan (DRP)**.
* **Preventive maintenance**.
* **SLA con fornitori**.
* **Recovery test**.

---

✅ **Ciclo 2 completato!**
Ora so che la sicurezza non è solo tecnologia: è fatta anche di processi, regole e responsabilità. Buggy odia quando le persone si organizzano bene… e io adoro quando lui si arrabbia!

