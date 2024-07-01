from typing import List
from fastapi import APIRouter, Depends, status, HTTPException
from constant import schemas, database, models, oauth2
from sqlalchemy.orm import Session
from constant.repository import sidebar

router = APIRouter(
    prefix="/api/sidebar",
    tags=['Sidebar']
)

get_db = database.get_db

@router.get('/renderList', response_model = List[schemas.SidebarData])
def get_sidebar_render_list(db:Session = Depends(get_db)):
   return sidebar.get_sidebar_render_data(db)


@router.post('/group')
def create_sidebar_group(req:schemas.SidebarGroup, db:Session = Depends(get_db)):
   return sidebar.create_sidebar_group(req, db)


@router.put('/group')
def update_sidebar_group(req:schemas.SidebarGroup, db:Session = Depends(get_db)):
   return sidebar.create_sidebar_group(req, db)


@router.get('/items', response_model = List[schemas.SidebarTableDataOut])
def get_sidebar_items( search:str = None, skip:int = 0, limit:int = 100 ,db:Session = Depends(get_db)):
   return sidebar.get_sidebar_items(db, search,limit,skip)


@router.get("/item/{id}", response_model = schemas.SidebarTableDataOut)
def get_sidebar_item( id: int, db:Session = Depends(get_db)):
   return sidebar.get_sidebar_item(id, db)


@router.post("/item", description="Create sidebar items")
def get_sidebar_item( req:schemas.SidebarTableDataIn, db:Session = Depends(get_db)):
   return sidebar.create_sidebar_table_data(req, db)


@router.put("/item/{id}", description="Edit sidebar items")
def update_sidebar_item( req:schemas.SidebarTableDataIn, db:Session = Depends(get_db)):
   return sidebar.updatee_sidebar_item(req, db)


@router.delete("/item/{id}", description="Delete sidebar items")
def delete_sidebar_item( id: int, db:Session = Depends(get_db)):
   return sidebar.delete_sidebar_item(id, db)


# @router.get('/', response_model=List[schemas.ShowBlog])
# def all(db: Session = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_current_user)):
#     return sidebar.get_all(db)


# @router.post('/', status_code=status.HTTP_201_CREATED,)
# def create(request: schemas.Blog, db: Session = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_current_user)):
#     return sidebar.create(request, db)


# @router.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
# def destroy(id: int, db: Session = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_current_user)):
#     return sidebar.destroy(id, db)


# @router.put('/{id}', status_code=status.HTTP_202_ACCEPTED)
# def update(id: int, request: schemas.Blog, db: Session = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_current_user)):
#     return sidebar.update(id, request, db)


# @router.get('/{id}', status_code=200, response_model=schemas.ShowBlog)
# def show(id: int, db: Session = Depends(get_db), current_user: schemas.User = Depends(oauth2.get_current_user)):
#     return sidebar.show(id, db)
