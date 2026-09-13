from pydantic import BaseModel
from typing import Any, Optional

class APIResponse(BaseModel):
    success: bool
    data: Optional[Any] = None
    source: str = "Government Data / Official Analytical Engine"
    updated_at: str = ""
    is_simulated: bool = False
    error: Optional[str] = None

class RiskFactor(BaseModel):
    factor: str
    weight: float
    score: float
    data_source: str

class CivicRiskScoreDetail(BaseModel):
    score: float
    risk_level: str
    trend: str
    contributing_factors: list[RiskFactor]
    data_sources: list[str]

class AnomalyDetail(BaseModel):
    id: str
    metric: str
    baseline: float
    observed: float
    deviation: float
    severity: str
    geographic_area: str
    city_name: str
    timestamp: str
    source: str

class RootCauseDetail(BaseModel):
    incident_id: str
    title: str
    potential_root_cause: str
    confidence_score: float
    correlated_signals: list[dict]
    evidence: list[str]
    limitations: str
    data_sources: list[str]

class SimulationRequest(BaseModel):
    waste_efficiency_delta_pct: float = 0.0 # e.g. -15.0 for 15% drop
    public_transit_delta_pct: float = 0.0
    air_quality_delta_pct: float = 0.0
    population_density_growth_pct: float = 0.0

class ReadinessDomain(BaseModel):
    domain: str
    score: float
    status: str
    key_indicators: list[dict]
