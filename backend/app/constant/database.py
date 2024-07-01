from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

database_user = os.getenv('DATABASE_USER')
database_password = os.getenv('DATABASE_PASSWORD')
database_server = os.getenv('DATABASE_SERVER')
database_port = os.getenv('DATABASE_PORT')
database_name = os.getenv('DATABASE_NAME')

if None in (database_user, database_password, database_server, database_port, database_name):
    raise ValueError("One or more environment variables are missing.")

SQLALCHEMY_DATABASE_URL = (
    f"postgresql+psycopg2://{database_user}:{database_password}"
    f"@{database_server}:{database_port}/{database_name}"
)

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False,)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
