from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text, ForeignKey, JSON
from datetime import datetime
from app.database import Base

class DataSource(Base):
    __tablename__ = "data_sources"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    organization = Column(String, nullable=False)
    official_url = Column(String, nullable=False)
    geographic_coverage = Column(String, nullable=False)
    time_period = Column(String, nullable=False)
    data_type = Column(String, nullable=False) # e.g. Government Observation, Open Data Portal
    is_observed = Column(Boolean, default=True)
    api_status = Column(String, default="Active")
    last_updated = Column(String, nullable=True)

class StateMetric(Base):
    __tablename__ = "state_metrics"

    id = Column(String, primary_key=True, index=True) # e.g., "IN-UP"
    name = Column(String, nullable=False)
    code = Column(String, nullable=False, unique=True)
    civic_risk_score = Column(Float, nullable=False)
    urban_population_pct = Column(Float, nullable=True)
    air_quality_avg = Column(Float, nullable=True)
    active_anomalies_count = Column(Integer, default=0)
    readiness_index = Column(Float, nullable=True)

class CityObservation(Base):
    __tablename__ = "city_observations"

    id = Column(String, primary_key=True, index=True)
    city_name = Column(String, nullable=False, index=True)
    state_name = Column(String, nullable=False)
    state_code = Column(String, nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    aqi = Column(Float, nullable=True)
    pm25 = Column(Float, nullable=True)
    pm10 = Column(Float, nullable=True)
    no2 = Column(Float, nullable=True)
    so2 = Column(Float, nullable=True)
    co = Column(Float, nullable=True)
    o3 = Column(Float, nullable=True)
    waste_collection_efficiency_pct = Column(Float, nullable=True)
    public_transit_coverage_pct = Column(Float, nullable=True)
    water_supply_coverage_pct = Column(Float, nullable=True)
    digital_services_index = Column(Float, nullable=True)
    last_observation_time = Column(String, nullable=False)
    source_name = Column(String, nullable=False)

class CivicAnomaly(Base):
    __tablename__ = "civic_anomalies"

    id = Column(String, primary_key=True, index=True)
    city_id = Column(String, ForeignKey("city_observations.id"), nullable=False)
    metric_name = Column(String, nullable=False)
    baseline_value = Column(Float, nullable=False)
    observed_value = Column(Float, nullable=False)
    deviation_pct = Column(Float, nullable=False)
    severity = Column(String, nullable=False) # Low, Medium, High, Critical
    detected_at = Column(DateTime, default=datetime.utcnow)
    data_source = Column(String, nullable=False)

class SimulationRecord(Base):
    __tablename__ = "simulation_records"

    id = Column(String, primary_key=True, index=True)
    scenario_name = Column(String, nullable=False)
    parameters_json = Column(JSON, nullable=False)
    results_json = Column(JSON, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
