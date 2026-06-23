# Bug Report

## BUG-001 - Limitazione invio email tramite Resend

### Descrizione

Durante la fase iniziale di test del modulo contatti, il sistema non riusciva a inviare email utilizzando il servizio Resend a causa delle limitazioni dell'ambiente di test.

### Ambiente

* FastAPI
* Resend
* Ambiente locale

### Passi per Riprodurre

1. Aprire il modulo contatti.
2. Compilare tutti i campi obbligatori.
3. Inviare il messaggio.

### Risultato Attuale

L'invio dell'email fallisce.

Messaggio restituito:

"You can only send testing emails to your own email address."

### Risultato Atteso

Invio corretto dell'email verso il destinatario configurato.

### Severità

Media

### Stato

Risolto

### Soluzione Applicata

Configurazione corretta del servizio Resend e verifica dell'indirizzo email autorizzato per l'invio.

### Note

Attualmente il sistema invia correttamente le notifiche email al proprietario del portfolio tramite il modulo contatti.


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

### Severità

Alta

### Stato

Aperto

### Analisi

Il problema è causato dal tentativo di connessione a un database MySQL configurato su "localhost" in un ambiente cloud (Render), dove il database non è disponibile.

### Possibile Soluzione

Migrare il database verso un servizio cloud dedicato come:

* Railway
* Aiven
* Render PostgreSQL

e configurare le variabili di ambiente per la connessione al database in produzione.


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
