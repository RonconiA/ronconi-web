from database import get_connection

try:

    conn = get_connection()

    print("✅ Connessione riuscita!")

    conn.close()

except Exception as e:

    print("❌ Errore:")
    print(e)