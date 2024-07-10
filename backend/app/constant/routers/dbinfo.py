from typing import List
from fastapi import APIRouter, Depends, status, HTTPException
from constant import schemas, database, models, oauth2, sessions
from sqlalchemy.orm import Session
from constant.repository import database_utils, sidebar

get_ext_db = sessions.session_manager.get_session

get_db = database.get_db

router = APIRouter(
    prefix="/api/dbinfo",
    tags=['DB Info']
)


@router.get("/dblist", description="Get DB List")
def get_db_list(db:Session = Depends(get_db)):
   return database_utils.get_db_list(db)


@router.get("/schemaList", description="Get schema List for given DB")
def get_schema_list(dbName:str):
   ext_db:Session = get_ext_db(dbName)
   return database_utils.get_schema_list(ext_db)


@router.get("/tableList", description="Get table List for given DB and schema, which are not in existing table list")
def get_schema_list(dbName:str, schemaName:str, db:Session = Depends(get_db)):
   ext_db:Session = get_ext_db(dbName)
   all_tables = database_utils.get_table_list(ext_db, dbName,  schemaName)
   existing_tables_query = db.query(models.SidebarDefnition).filter(models.SidebarDefnition.dbName == dbName).filter(models.SidebarDefnition.schemaName == schemaName).all()
   existing_tables = [t.tableName for t in existing_tables_query]
   tables = [tbl for tbl in all_tables if tbl not in existing_tables]
   return tables

@router.get("/columnList", description="Get column List given Table")
def get_schema_list(dbName:str, schemaName:str, tableName:str):
   ext_db:Session = get_ext_db(dbName)
   return database_utils.get_columns_list(ext_db, dbName,  schemaName, tableName)
