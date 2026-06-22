# API Testing

## Informazioni Generali

Progetto:

Portfolio Web Personale

Tecnologie:

* FastAPI
* Python
* Swagger
* REST API

Ambiente di Test:

* Swagger UI
* Browser Web
* Ambiente Locale

---

## API-001 - Verifica Endpoint Home

Obiettivo:

Verificare che l'endpoint principale sia disponibile.

Metodo:

GET

Endpoint:

/

Risultato Atteso:

Status Code 200

Risultato:

PASS

---

## API-002 - Verifica Endpoint Contact

Obiettivo:

Verificare il corretto funzionamento dell'endpoint di contatto.

Metodo:

POST

Endpoint:

/contact

Risultato Atteso:

Ricezione corretta dei dati inviati.

Risultato:

PASS

---

## API-003 - Validazione Campi Obbligatori

Obiettivo:

Verificare la gestione dei campi mancanti.

Metodo:

POST

Endpoint:

/contact

Risultato Atteso:

Messaggio di errore o validazione.

Risultato:

PASS

---

## API-004 - Validazione Email

Obiettivo:

Verificare la validazione del campo email.

Metodo:

POST

Endpoint:

/contact

Risultato Atteso:

Rifiuto di indirizzi email non validi.

Risultato:

PASS
