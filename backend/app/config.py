import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "CIVIC X — AI Urban Intelligence Platform"
    PROJECT_VERSION: str = "1.0.0"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./civic_x.db")
    
    # Parse CORS origins list
    cors_str = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173")
    CORS_ORIGINS: list = [origin.strip() for origin in cors_str.split(",") if origin.strip()]
    
    MAPBOX_TOKEN: str = os.getenv("MAPBOX_TOKEN", "")
    DATA_GOV_IN_API_KEY: str = os.getenv("DATA_GOV_IN_API_KEY", "")

settings = Settings()
