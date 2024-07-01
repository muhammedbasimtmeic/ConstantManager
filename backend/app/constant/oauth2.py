from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from constant import token, database, models
from sqlalchemy.orm import Session

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/token")

def get_current_user(data: str = Depends(oauth2_scheme), db:Session = Depends(database.get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    token_data =  token.verify_token(data, credentials_exception)
    user = db.query(models.User).filter(models.User.email == token_data.email).first() 
    if not user:
        raise Exception
    return user
