from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.config import settings
from app.database import engine, Base
from app.api.endpoints import router as api_router

# Initialize database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.PROJECT_VERSION,
    description="CIVIC X Backend Gateway — AI Urban Intelligence & India @ 2047 Readiness Platform"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global Exception Handler preventing unhandled 500 crashes
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=200, # Return 200 with success=False as mandated by API contract
        content={
            "success": False,
            "data": None,
            "error": f"Backend processing error: {str(exc)}",
            "source": "CIVIC X Backend Gateway",
            "updated_at": "",
            "is_simulated": False
        }
    )

# Include central API endpoints router
app.include_router(api_router, prefix="/api")

@app.get("/")
def root():
    return {
        "title": settings.PROJECT_NAME,
        "version": settings.PROJECT_VERSION,
        "docs": "/docs",
        "api_health": "/api/health"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
