from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Kubernetes Demo API", version="1.0")


# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # For demo only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request Model
class LoginRequest(BaseModel):
    username: str
    password: str


# Demo user (later we'll replace this with PostgreSQL)
DEMO_USER = {
    "username": "admin",
    "password": "admin123"
}


@app.get("/")
def home():
    return {
        "message": "Welcome to Kubernetes Demo API",
        "version": "1.0"
    }


@app.get("/health")
def health():
    return {
        "status": "UP"
    }


@app.post("/login")
def login(user: LoginRequest):

    if (
        user.username == DEMO_USER["username"]
        and user.password == DEMO_USER["password"]
    ):
        return {
            "success": True,
            "message": "Login Successful"
        }

    return {
        "success": False,
        "message": "Invalid Username or Password"
    }