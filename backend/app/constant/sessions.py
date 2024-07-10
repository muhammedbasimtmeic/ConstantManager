
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker,Session
from constant import models, database

db = database.get_db()

class SessionManager:
   _sessions = {}

   def __init__(self):
      self.init_sessions(database.SessionLocal())

   def init_sessions(self,db:Session):
      db_configs = db.query(models.DatabasesConfig).all()

      for config in db_configs:
         database_url = (
               f"postgresql+psycopg2://{config.user}:{config.password}"
               f"@{config.server}:{config.port}/{config.databaseName}"
         )
         engine = create_engine(database_url)
         SessionCustom = sessionmaker(bind=engine, autocommit=False, autoflush=False)
         self._sessions[config.databaseName] = SessionCustom()

   def get_session(self, database_name):
      if database_name in self._sessions:
         return self._sessions[database_name]
      else:
         raise ValueError(f"Database configuration not found for '{database_name}'")

# Singleton instance of SessionManager
session_manager = SessionManager()
