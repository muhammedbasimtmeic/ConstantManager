from fastapi import FastAPI
from constant import  models
from constant.database import engine
from constant.routers import user, authentication, sidebar, dbinfo
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000", "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(engine)

app.include_router(authentication.router)
app.include_router(sidebar.router)
app.include_router(user.router)
app.include_router(dbinfo.router)
