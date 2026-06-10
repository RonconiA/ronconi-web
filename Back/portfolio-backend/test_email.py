import os
from dotenv import load_dotenv
import resend

load_dotenv()

key = os.getenv("RESEND_API_KEY")

print("API:", key[:10] + "...")
print("Versión resend:", resend.__version__)

resend.api_key = key

params = {
    "from": "onboarding@resend.dev",
    "to": ["ronconija@gmail.com"],
    "subject": "Test Portfolio FastAPI",
    "html": """
    <h2>Test riuscito 🎉</h2>

    <p>Questo messaggio è stato inviato tramite Resend.</p>

    <p>Portfolio QA Tester - Joaquín Ronconi</p>
    """
}

email = resend.Emails.send(params)

print(email)