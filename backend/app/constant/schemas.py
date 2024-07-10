from enum import StrEnum
from typing import List, Optional
from pydantic import BaseModel

class Role(StrEnum):
    ADMIN = "ADMIN"
    MODERATOR = "MODERATOR"
    USER = "GUEST"

class User(BaseModel):
    id:int
    name:str
    email:str
    role:Role
    password:str
    image:str

class ShowUser(BaseModel):
    name:str
    email:str
    class Config():
        from_attributes = True

class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    email: str
    username :str
    password: str
    role:str = "USER"
    image:str = ""

class Token(BaseModel):
    access_token: str
    token_type: str

class UserWithToken(BaseModel):
    id:int
    name:str
    email:str
    role:Role
    image:str | None = None
    isActive:bool = True
    accessToken: str
    tokenType: str = 'barear'

class TokenData(BaseModel):
    email: Optional[str] = None


class SidebarTableDataOut(BaseModel):
    id:int
    name:str
    tableName:str
    schemaName:str
    dbName:str
    description:str | None = None
    icon:str | None = None


# side bar render schema
class SidebarData(BaseModel):
    id:int
    title:str
    description:str | None = None
    icon:str | None = None
    tables:list[SidebarTableDataOut] = []


# side bar group creation schema
class SidebarGroup(BaseModel):
    title : str
    description : str | None = None
    icon : str | None = None


# side bar group item creation schema
class SidebarTableDataIn(BaseModel):
    name: Optional[str] = None
    tableName: Optional[str] = None
    schemaName: Optional[str] = None
    dbName: Optional[str] = None
    description: Optional[str] = None
    icon: Optional[str] = None
    groupId: Optional[int] = 99
    columnsList: List[str] = []
    keyColumns: List[str] = []
    editableColumns: List[str] = []
    
class Message(BaseModel):
    message: str
