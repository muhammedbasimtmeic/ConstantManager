import psycopg2
from sqlalchemy.orm import Session
from sqlalchemy import or_, exc
from constant import models, schemas
from fastapi import HTTPException, status


# get list of side bar with grouping for rendering
def get_sidebar_render_data(db: Session):
    sidebar_data = db.query(models.SidebarGroups).all()
    return sidebar_data


# get side bar items in raw form 
def get_sidebar_items(db: Session, search:str = None, limit:int = 100, skip:int = 0):
    if search:
        sidebar_items = db.query(models.SidebarDefnition).filter(
            or_(
                models.SidebarDefnition.name.ilike(f"%{search}%"),
                models.SidebarDefnition.tableName.ilike(f"%{search}%"),
                models.SidebarDefnition.description.ilike(f"%{search}%")
            )
        ).offset(skip).limit(limit).all()
    else:
        sidebar_items = db.query(models.SidebarDefnition).limit(limit).all()
    
    # if not sidebar_items:
    #     raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
    #                         detail=f"Failed to get sidebar data items. Please check the config table")
    return sidebar_items

# get one side bar item
def get_sidebar_item(id: int, db: Session):
    sidebar_item = db.query(models.SidebarDefnition).filter(models.SidebarDefnition.id == id).first()
    if not sidebar_item:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Sidebar item with the id {id} is not available")
    return sidebar_item

def create_sidebar_table_data(request: schemas.SidebarTableDataIn, db: Session):
    try:
        new_sidebar_item = models.SidebarDefnition(name=request.name, 
                                                tableName=request.tableName, 
                                                schemaName = request.schemaName,
                                                dbName = request.dbName,
                                                groupId = request.groupId,
                                                icon = request.icon,
                                                description = request.description,
                                                columnsList = request.columnsList,
                                                keyColumns = request.keyColumns,
                                                editableColumns = request.editableColumns
                                                )
        db.add(new_sidebar_item)
        db.commit()
        db.refresh(new_sidebar_item)
        return new_sidebar_item
    
    except exc.IntegrityError as e:
        if isinstance(e.orig, psycopg2.errors.ForeignKeyViolation):
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Foriegn Key Viaolation error - {e.orig.diag.message_detail}")
        elif isinstance(e.orig, psycopg2.errors.UniqueViolation):
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                            detail=f"Unique Key Viaolation error - {e.orig.diag.message_detail}")
        

def delete_sidebar_item(id: int, db: Session):
    item_to_delete = db.query(models.SidebarDefnition).filter(models.SidebarDefnition.id == id)

    if not item_to_delete.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Item with id {id} not found")

    item_to_delete.delete(synchronize_session=False)
    db.commit()
    return 'done'


def updatee_sidebar_item(id: int, request: schemas.SidebarTableDataIn, db: Session):
    item = db.query(models.SidebarDefnition).filter(models.SidebarDefnition.id == id)

    if not item.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Item with id {id} not found")

    item.update(request)
    db.commit()
    return 'updated'


def create_sidebar_group(request: schemas.SidebarGroup, db: Session):
    new_sidebar_group = models.SidebarGroups(title = request.title, 
                                            description = request.description, 
                                            icon = request.icon
                                               )
    db.add(new_sidebar_group)
    db.commit()
    db.refresh(new_sidebar_group)
    return new_sidebar_group


def update_sidebar_group(id:int, request: schemas.SidebarGroup, db: Session):

    group = db.query(models.SidebarGroups).filter(models.SidebarGroups.id == id).first()

    if not group:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Sidebar group with id {id} not found")

    group.update(request)
    db.commit()
    return "Sidebar group updated"

def delete_sidebar_group(id: int, db: Session):
    group_to_delete = db.query(models.SidebarGroups).filter(models.SidebarGroups.id == id)

    if not group_to_delete.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Sidebar group with id {id} not found")

    group_to_delete.delete(synchronize_session=False)
    db.commit()
    return 'done'

