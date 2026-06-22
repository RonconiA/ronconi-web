# Bug Report

## BUG-001 - Errore invio email tramite Resend

### Descrizione

Durante il test del modulo contatti, il sistema non riusciva a inviare email verso indirizzi esterni.

### Ambiente

* FastAPI
* Resend
* Ambiente locale

### Passi per Riprodurre

1. Aprire il modulo contatti.
2. Compilare tutti i campi.
3. Inviare il messaggio.

### Risultato Attuale

L'email non viene inviata.

Messaggio restituito:

"You can only send testing emails to your own email address."

### Risultato Atteso

Invio corretto dell'email al destinatario.

### Severità

Media

### Stato

Risolto

---

## BUG-002 - Connessione MySQL fallita su Render

### Descrizione

Dopo il deploy del backend su Render, il sistema non riusciva a connettersi al database.

### Ambiente

* FastAPI
* MySQL
* Render

### Passi per Riprodurre

1. Aprire Swagger.
2. Eseguire una richiesta POST al modulo contatti.

### Risultato Attuale

Errore:

"Can't connect to MySQL server on localhost"

### Risultato Atteso

Salvataggio corretto dei dati nel database.

### Severità

Alta

### Stato

In Analisi

---

## BUG-003 - Disallineamento pulsante Hero

### Descrizione

Il pulsante "Inviami un messaggio" risultava disallineato rispetto al pulsante "Vedi Progetti".

### Ambiente

* HTML
* CSS
* Vercel

### Passi per Riprodurre

1. Aprire la homepage.
2. Visualizzare la sezione Hero.

### Risultato Attuale

I due pulsanti non risultano allineati correttamente.

### Risultato Atteso

Entrambi i pulsanti devono avere la stessa dimensione e allineamento.

### Severità

Bassa

### Stato

Risolto
