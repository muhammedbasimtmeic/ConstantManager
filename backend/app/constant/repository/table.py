from sqlalchemy.orm import Session
from app.constant.repository.sidebar import models, schemas
from fastapi import HTTPException, status


def insert_table_comment(db:Session, tableName:str, schemaName:str, comment:str):
   try:
      comment_sql = f""" COMMENT ON TABLE "{schemaName}"."{tableName}" IS '{comment}' """
      db.execute(comment_sql)
      db.commit()
      return True
   except Exception as e:
      print(f"Failed to update comment: Error : {e}")
      return False




