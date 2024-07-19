from typing import List
from fastapi import APIRouter, Depends, status, HTTPException
from constant import schemas, database, models, oauth2, sessions
from sqlalchemy.orm import Session
from constant.repository import tableData, sidebar

router = APIRouter(tags = ["Tables"] ,prefix= '/api/table')

get_db = database.get_db
get_ext_db = sessions.session_manager.get_session


#Get table comment
@router.get('/comment', response_model=schemas.TableComment)
def read_table_comment(tableName:str, schemaName:str, dbName:str):
   ext_db:Session = get_ext_db(dbName)
   return tableData.get_table_comment(ext_db, tableName, schemaName)

# Change comment of the table 
@router.post('/comment', response_model=schemas.TableComment)
def create_table_comment(req:schemas.TableCommentEdit):
   ext_db:Session = get_ext_db(req.dbName)
   result = tableData.insert_table_comment(ext_db, req.tableName, req.schemaName, req.comment)
   if result:
      return {"comment" : req.comment}


