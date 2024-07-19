from fastapi import APIRouter, Depends, status, HTTPException, Request
from constant import schemas, database, models, token
from sqlalchemy.orm import Session
from constant.repository import table_session

router = APIRouter(tags=['TableSession'], prefix='/api/table_session')

get_db = database.get_db

@router.get('/open_session/{tableId}')
def get_open_table_session(tableId:int, db:Session = Depends(get_db)):
   return table_session.get_open_table_session(tableId, db)
   

@router.post('/create_session/{tableId}/{userId}')
def create_table_session(tableId:int,userId:int, request:Request,  db:Session = Depends(get_db)):
   return table_session.create_table_session(tableId, userId,db=db, ipaddress=request.client.host)
   

@router.put('/close_session/{tableId}/{userId}')
def close_table_session(tableId:int,userId:int, request:Request,  db:Session = Depends(get_db)):
   return table_session.close_table_session(tableId, userId, db,)
   

