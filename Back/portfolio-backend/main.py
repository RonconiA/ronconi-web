import os

from dotenv import load_dotenv

import resend

from fastapi import FastAPI
from pydantic import BaseModel, EmailStr
from fastapi.middleware.cors import CORSMiddleware

from database import get_connection


# =====================================
# CONFIGURAZIONE
# =====================================

load_dotenv()

resend.api_key = os.getenv("RESEND_API_KEY")


# =====================================
# FASTAPI
# =====================================

app = FastAPI(
    title="Ronconi Portfolio API",
    description="Backend Portfolio QA Tester",
    version="1.0.0"
)


# =====================================
# CORS
# =====================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =====================================
# MODELS
# =====================================

class ContactForm(BaseModel):
    fullname: str
    email: EmailStr
    reason: str
    message: str


# =====================================
# ROOT
# =====================================

@app.get("/")
def root():
    return {
        "status": "online",
        "message": "Portfolio Backend Running"
    }


# =====================================
# CONTACT
# =====================================

@app.post("/contact")
def receive_contact(data: ContactForm):

    try:

        # -----------------------------
        # SALVATAGGIO DATABASE
        # -----------------------------

        conn = get_connection()

        with conn.cursor() as cursor:

            sql = """
            INSERT INTO contacts
            (
                fullname,
                email,
                reason,
                message
            )
            VALUES
            (
                %s,
                %s,
                %s,
                %s
            )
            """

            cursor.execute(
                sql,
                (
                    data.fullname,
                    data.email,
                    data.reason,
                    data.message
                )
            )

            conn.commit()

        conn.close()

        print("✅ Contatto salvato nel database")

        # -----------------------------
        # EMAIL A JOAQUÍN
        # -----------------------------

        resend.Emails.send({

            "from": "onboarding@resend.dev",

            "to": ["ronconija@gmail.com"],

            "subject": "Nuovo contatto dal Portfolio",

            "html": f"""

            <h2>Nuovo contatto ricevuto 🚀</h2>

            <p><strong>Nome:</strong> {data.fullname}</p>

            <p><strong>Email:</strong> {data.email}</p>

            <p><strong>Motivo:</strong> {data.reason}</p>

            <hr>

            <p><strong>Messaggio:</strong></p>

            <p>{data.message}</p>

            """
        })

        print("✅ Email inviata correttamente")

        resend.Emails.send({

            "from": "onboarding@resend.dev",

            "to": [data.email],

            "subject": "Messaggio ricevuto con successo",

            "html": f"""

            <h2>✓ Messaggio ricevuto!</h2>

            <p>Ciao {data.fullname},</p>

            <p>
            grazie per aver dedicato qualche minuto a visitare il mio portfolio.
            </p>

            <p>
            Ho ricevuto il tuo messaggio e ti risponderò il prima possibile.
            </p>

            <p>
            Nel frattempo, ti auguro una splendida giornata.
            </p>

            <br>

            <p>— Joaquín Ronconi</p>

            """
        })

        print("✅ Email di conferma inviata")

        # -----------------------------
        # LOG TERMINALE
        # -----------------------------

        print("\n========== NEW CONTACT ==========")
        print(f"Nome: {data.fullname}")
        print(f"Email: {data.email}")
        print(f"Motivo: {data.reason}")
        print(f"Messaggio: {data.message}")
        print("=================================\n")

        return {
            "success": True,
            "message": "Messaggio salvato nel database"
        }

    except Exception as e:

        print("❌ ERRORE:")
        print(e)

        return {
            "success": False,
            "message": str(e)
        }