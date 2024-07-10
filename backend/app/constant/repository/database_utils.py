from constant import database, models, schemas, sessions
from sqlalchemy.orm import Session
from sqlalchemy import text

def get_db_list(db:Session):
    databases = db.query(models.DatabasesConfig).all()
    database_names_list = [db_name.databaseName for db_name in databases]
    return database_names_list


def get_database_list(db:Session):
    return db.query(models.Databases).all()


def get_schema_list(db:Session):
    schemas_query = """
                    SELECT schema_name
                    FROM information_schema.schemata
                    WHERE schema_name NOT LIKE 'pg_%'
                    AND schema_name != 'information_schema'
                    ORDER BY schema_name;
                    """
    schemas_result = db.execute(text(schemas_query))
    schemas = schemas_result.fetchall()
    schemas = [s[0] for s in schemas] 
    return schemas


def get_table_list(db:Session, dbName:str, schemaName:str):
    query = f"""
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = '{schemaName}'
        AND table_catalog = '{dbName}'
        AND table_type = 'BASE TABLE'
        ORDER BY table_name;
    """
    tables_result = db.execute(text(query))
    tables = tables_result.fetchall()
    tables = [t[0] for t in tables] 
    return tables


def get_columns_list(db: Session, dbName: str, schemaName: str, tableName: str):
    # Query for all columns
    columns_query = f"""
        SELECT column_name
        FROM information_schema.columns
        WHERE table_schema = '{schemaName}'
        AND table_catalog = '{dbName}'
        AND table_name = '{tableName}'
        ORDER BY ordinal_position;
    """
    
    # Query for primary key columns
    primary_keys_query = f"""
        SELECT column_name
        FROM information_schema.key_column_usage kcu
        JOIN information_schema.table_constraints tc
        ON kcu.constraint_name = tc.constraint_name
        AND kcu.table_schema = tc.table_schema
        WHERE tc.constraint_type = 'PRIMARY KEY'
        AND kcu.table_schema = '{schemaName}'
        AND kcu.table_catalog = '{dbName}'
        AND kcu.table_name = '{tableName}';
    """
    
    columns_result = db.execute(text(columns_query))
    primary_keys_result = db.execute(text(primary_keys_query))
    
    columns = columns_result.fetchall()
    primary_keys = primary_keys_result.fetchall()
    
    primary_keys_set = {pk[0] for pk in primary_keys}
    
    columns_list = [
        {"columnName": column[0], "isPrimaryKey": column[0] in primary_keys_set}
        for column in columns
    ]
    
    return columns_list

