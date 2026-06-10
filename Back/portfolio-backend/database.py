import pymysql


def get_connection():

    connection = pymysql.connect(
        host="localhost",
        user="root",
        password="123456",
        database="portfolio_db",
        cursorclass=pymysql.cursors.DictCursor
    )

    return connection