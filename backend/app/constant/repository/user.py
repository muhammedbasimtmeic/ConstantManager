
import psycopg2
from sqlalchemy.orm import Session
from constant import schemas, models
from fastapi import HTTPException, status
from constant.hashing import Hash
from sqlalchemy.exc import IntegrityError


def create(user_data: schemas.RegisterRequest, db: Session):
    try:
        new_user = models.User(
            name = user_data.username, 
            email = user_data.email, 
            password = Hash.bcrypt(user_data.password), 
            role = schemas.Role.USER, 
            image = user_data.image)
        
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
    except IntegrityError as e:
        if isinstance(e.orig, psycopg2.errors.ForeignKeyViolation):
            raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                            detail=f"Foriegn Key Viaolation error - {e.orig.diag.message_detail}")
        elif isinstance(e.orig, psycopg2.errors.UniqueViolation):
            raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, 
                            detail=f"Email already Taken ")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
                        detail=f"Server Error : {e}")


def get_user_by_email(email:str, db:Session):
    return db.query(models.User).filter(models.User.email == email).first()

def show(id: int, db: Session):
    user = db.query(models.User).filter(models.User.id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with the id {id} is not available")
    return user
