
from sqlalchemy.orm import Session
from constant import schemas, models
from fastapi import HTTPException, status
from constant.hashing import Hash


def create(user_data: schemas.RegisterRequest, db: Session):
    new_user = models.User(
        name = user_data.username, email = user_data.email, password = Hash.bcrypt(user_data.password))
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def show(id: int, db: Session):
    user = db.query(models.User).filter(models.User.id == id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User with the id {id} is not available")
    return user
