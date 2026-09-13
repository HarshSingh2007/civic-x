from app.services.gov_data_service import GovDataService

class RiskService:
    @staticmethod
    def calculate_city_risk(city_data: dict) -> dict:
        """
        Calculates an Analytical Civic Risk Score (0-100) based on verified government indicators.
        Note: This is an analytical score derived by CIVIC X methodology, not an official govt index.
        """
        aqi = city_data.get("aqi", 100)
        waste_eff = city_data.get("waste_collection_efficiency_pct", 85)
        transit_cov = city_data.get("public_transit_coverage_pct", 70)
        digital_idx = city_data.get("digital_services_index", 80)

        # Environmental Risk Component (0-100) normalized from AQI (500 max)
        env_risk = min(100.0, (aqi / 300.0) * 100.0)
        
        # Waste Stress Component (0-100) inverse of efficiency
        waste_risk = max(0.0, 100.0 - waste_eff)
        
        # Transit Gap Component (0-100) inverse of coverage
        transit_risk = max(0.0, 100.0 - transit_cov)
        
        # Digital Service Gap Component
        digital_risk = max(0.0, 100.0 - digital_idx)

        # Weighted combination: 40% Environment, 25% Waste, 20% Transit, 15% Digital
        overall_score = round(
            (0.40 * env_risk) + (0.25 * waste_risk) + (0.20 * transit_risk) + (0.15 * digital_risk),
            1
        )

        trend = "Stable"
        if overall_score > 65:
            risk_level = "High"
            trend = "Deteriorating"
        elif overall_score > 40:
            risk_level = "Moderate"
            trend = "Watch"
        else:
            risk_level = "Low"
            trend = "Improving"

        contributing_factors = [
            {
                "factor": "Air Quality Index (AQI Stress)",
                "weight": 0.40,
                "score": round(env_risk, 1),
                "data_source": "Central Pollution Control Board (CPCB)"
            },
            {
                "factor": "Solid Waste Collection Deficit",
                "weight": 0.25,
                "score": round(waste_risk, 1),
                "data_source": "Smart Cities Mission (MoHUA)"
            },
            {
                "factor": "Public Transport Access Deficit",
                "weight": 0.20,
                "score": round(transit_risk, 1),
                "data_source": "Urban Transport Division (MoHUA)"
            },
            {
                "factor": "Digital Service Response Deficit",
                "weight": 0.15,
                "score": round(digital_risk, 1),
                "data_source": "National e-Governance Division"
            }
        ]

        return {
            "city_id": city_data.get("id"),
            "city_name": city_data.get("city_name"),
            "score": overall_score,
            "risk_level": risk_level,
            "trend": trend,
            "contributing_factors": contributing_factors,
            "data_sources": [
                "CPCB Air Quality Stations",
                "Smart Cities Mission (MoHUA)",
                "National e-Governance Division"
            ]
        }
