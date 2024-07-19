from sqlalchemy.orm import Session
from sqlalchemy import text
from constant import models, schemas
from fastapi import HTTPException, status



def get_table_comment(db:Session, tableName:str, schemaName:str):
   try:
      sql = f""" SELECT description
                        FROM pg_description
                        JOIN pg_class ON pg_description.objoid = pg_class.oid
                        JOIN pg_namespace ON pg_class.relnamespace = pg_namespace.oid
                        WHERE pg_namespace.nspname = '{schemaName}' AND pg_class.relname = '{tableName}' AND pg_description.objsubid = 0
                        LIMIT 1
                     """
      result  = db.execute(text(sql))
      result = result.fetchall()

      if result:
         return {"comment" : result[0][0]}
      else:
         return {"comment" : ""}
      
   except Exception as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"failed to get comment for the table - {tableName}") 


def insert_table_comment(db:Session, tableName:str, schemaName:str, comment:str):
   try:
      comment_sql = f""" COMMENT ON TABLE "{schemaName}"."{tableName}" IS '{comment}' """
      db.execute(text(comment_sql))
      db.commit()
      return True
   except Exception as e:
      print(f"Failed to update comment: Error : {e}")
      return False




