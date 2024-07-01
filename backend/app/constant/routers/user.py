from fastapi import APIRouter
from constant import database, schemas, models, oauth2
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, status
from constant.repository import user

router = APIRouter(
    prefix="/api/user",
    tags=['Users']
)

get_db = database.get_db

@router.get('/me', response_model=schemas.ShowUser)
def get_user_me(current_user:schemas.User = Depends(oauth2.get_current_user) ):
    return current_user


@router.get('/{id}', response_model=schemas.ShowUser)
def get_user(id: int, db: Session = Depends(get_db)):
    return user.show(id, db)


@router.post('/register', response_model=schemas.ShowUser)
def signup(user_data : schemas.RegisterRequest, db: Session = Depends(get_db) ):
    return user.create(user_data, db)
