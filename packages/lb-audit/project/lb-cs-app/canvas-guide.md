Perfetto 👍 ti preparo una mini-guida operativa chiara per **organizzare i Canvas su più chat**, in stile documentazione.

---

# 📘 Guida pratica: organizzare i Canvas su più chat

## 🎯 Obiettivo

Mantenere un progetto complesso (es. LB-CS) distribuito su più chat, garantendo coerenza e tracciabilità.

---

## 1. Struttura generale

* **1 chat principale (Master)**

  * Contiene il **Canvas Master** con: standard, variabili d’ambiente, schema dati canonico, regole comuni, indice degli altri Canvas.
  * È l’unica fonte di verità che si aggiorna nel tempo.

* **1 chat per ogni dominio/funzione**

  * Ognuna ha **1 Canvas dedicato** (es. `messages`, `ops`, `items`).
  * Si lavora in dettaglio su API, routes, views, test, senza appesantire il Master.

---

## 2. Avviare una nuova chat di dominio

Checklist:

1. **Apri nuova chat.**
2. **Allega il Canvas Master** (scaricato in `.md` o `.txt`) come primo messaggio.

   * Serve solo come contesto statico.
   * Non è collegato all’originale, quindi non sarà aggiornato automaticamente.
3. **Crea il nuovo Canvas di dominio** (es. “LB-CS | Dominio: messages – API/Routes/View”).
4. In cima al Canvas scrivi:

   * Versione e data
   * “Allineato al Master vX.Y”

---

## 3. Gestione aggiornamenti

* **Aggiorni il Master solo nella sua chat originale.**
* Se in un dominio trovi una modifica che deve diventare regola comune:

  1. Annotala nel dominio (es. Changelog locale).
  2. Vai nella chat del Master, aggiorna lì.
  3. Porta manualmente la modifica negli altri domini, se serve.

---

## 4. Convenzioni utili

* **Nomenclatura titoli:**

  ```
  LB-CS | App Master – Indice & Standard
  LB-CS | Dominio: messages – API/Routes/View
  LB-CS | Ops/Deploy – Heroku & Atlas
  ```

* **Versioni:**

  * Master e domini hanno numerazione separata (es. Master v1.2, Messages v1.0).
  * Ogni Canvas figlio indica a quale versione del Master è allineato.

* **Indice nel Master:**
  Aggiorna sempre la lista dei domini e le loro versioni note.

---

## 5. Barra laterale (organizzazione visiva)

* **Prefissi coerenti** (`LB-CS | …`) per raggruppare.
* **Pin** delle chat più importanti (Master, Ops, domini attivi).

---

## 6. Backup e condivisione

* **Scarica periodicamente i Canvas** (Master e domini) in locale come `.md` o `.txt`.
* Puoi zippare l’intera repo dei Canvas come archivio documentale.

---

## 7. Flusso di lavoro tipico

1. Scrivi/aggiorna il Master.
2. Avvia chat dominio → alleghi Master (solo come riferimento statico).
3. Lavori su API/routes/view/test nel Canvas di dominio.
4. Se emergono nuove regole generali → aggiorni il Master nella sua chat.
5. Noti le differenze nelle altre chat/domìni e le riallinei manualmente.

---

✅ In questo modo:

* Hai **un punto centrale (Master)** per regole comuni.
* Ogni dominio è gestito con **il suo Canvas dedicato**.
* La coerenza è mantenuta manualmente ma chiara e tracciabile.

---

Vuoi che ti prepari anche un **template di indice** già pronto da incollare nel Master (con colonne: Dominio, Versione locale, Allineato a Master vX.Y, Ultimo update)?
