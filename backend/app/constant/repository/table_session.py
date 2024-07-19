
from datetime import datetime, timedelta
import psycopg2
from sqlalchemy.orm import Session
from constant import schemas, models
from fastapi import HTTPException, status
from constant.hashing import Hash
from sqlalchemy.exc import IntegrityError

MAX_SESSION_DURATION = 30
def get_open_table_session(tableId:int, db:Session):
   existing_session = db.query(models.EditTableSession).filter(models.EditTableSession.tableId == tableId).filter(models.EditTableSession.exitTime == None).first()
   if not existing_session:
      return None
   return existing_session

def create_table_session(tableId:int, userId: int, ipaddress:str , db:Session):
   new_session = models.EditTableSession(tableId = tableId, 
                                         userId=userId, 
                                         expires = datetime.now() + timedelta(minutes=MAX_SESSION_DURATION),
                                         clientAddress = ipaddress)
   try:
      db.add(new_session)
      db.commit()
      db.refresh(new_session)
      return new_session
   except Exception as e:
      print(e)
      return None

def close_table_session(tableId:int, userId:int,db:Session):
   existing_session = db.query(models.EditTableSession).filter(models.EditTableSession.tableId == tableId).filter(models.EditTableSession.exitTime == None).first()
   if not existing_session:
      raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                     detail=f"No session exist with tableId and user as mentioned") 
   existing_session.exitTime = datetime.now()
   db.commit()
   return True
