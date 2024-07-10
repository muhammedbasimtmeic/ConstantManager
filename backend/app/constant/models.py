from datetime import datetime
from sqlalchemy import ARRAY, Column, Enum, Integer, String, ForeignKey, DateTime,Boolean
from constant.database import Base
from sqlalchemy.orm import relationship


from datetime import datetime
from sqlalchemy import ARRAY, Column, Enum, Integer, String, ForeignKey, DateTime, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class User(Base):
    __tablename__ = 'Users'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    password = Column(String)
    role = Column(Enum('ADMIN', 'MODERATOR', 'GUEST', name="roleEnum"))
    isActive = Column(Boolean)
    image = Column(String)

    userSessions = relationship('UserSession', back_populates='user', cascade="all, delete")
    editTableSessions = relationship('EditTableSession', back_populates='user', cascade="all, delete")

class UserSession(Base):
    __tablename__ = 'UserSession'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    userId = Column(Integer, ForeignKey('Users.id'), nullable=False, index=True)
    expires = Column(DateTime)
    loginTime = Column(DateTime, default=datetime.now())
    logoutTime = Column(DateTime)
    autoLoggout = Column(Boolean)
    clientAddress = Column(String)

    user = relationship('User', back_populates='userSessions')


class SidebarGroups(Base):
    __tablename__ = 'SidebarGroups'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String, unique=True, nullable=True) 
    description = Column(String) 
    icon = Column(String, default='boxes') 
    tables = relationship('SidebarDefnition', back_populates='group', cascade="all, delete")


class SidebarDefnition(Base):
    __tablename__ = 'SidebarDefnition'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String)
    tableName = Column(String)
    schemaName = Column(String)
    dbName = Column(String)
    groupId = Column(Integer, ForeignKey('SidebarGroups.id'), nullable=False, index=True, default = 99)
    description = Column(String) 
    icon = Column(String, default='boxes') 
    columnsList = Column(ARRAY(String))
    keyColumns = Column(ARRAY(String))
    editableColumns = Column(ARRAY(String))

    group = relationship('SidebarGroups', back_populates='tables')

class EditTableSession(Base):
    __tablename__ = 'EditTableSessions'

    tableId = Column(Integer, ForeignKey('SidebarDefnition.id'), primary_key=True)
    userId = Column(Integer, ForeignKey('Users.id'), nullable=False, index=True)
    expires = Column(DateTime)
    entryTime = Column(DateTime, default=datetime.now())
    exitTime = Column(DateTime)
    clientAddress = Column(String)

    user = relationship('User', back_populates='editTableSessions')
    table = relationship('SidebarDefnition')

class DatabasesConfig(Base):
    __tablename__ = 'DatabaseList'

    Id = Column(Integer,autoincrement=True, primary_key=True)
    databaseName = Column(String,unique=True ,nullable=False, index=True)
    kind = Column(Enum('POSTGRES', 'MSSQL', 'ORACLE', 'SQLLITE','MYSQL', name="dbTypeEnum"))
    server = Column(String ,nullable=False)
    port = Column(Integer ,nullable=False)
    user = Column(String ,nullable=False)
    password = Column(String ,nullable=False)
 
