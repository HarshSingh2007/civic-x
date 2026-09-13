class SimulationService:
    @staticmethod
    def run_simulation(
        waste_efficiency_delta_pct: float,
        public_transit_delta_pct: float,
        air_quality_delta_pct: float,
        population_density_growth_pct: float
    ) -> dict:
        """
        Runs mathematical model simulation predicting downstream civic impacts.
        Result is explicitly marked as SIMULATION — not real government observations.
        """
        # Baseline national average values
        baseline_civic_risk = 52.4
        baseline_health_cost_index = 100.0
        baseline_citizen_satisfaction_pct = 74.0
        baseline_carbon_emissions_mt = 12.8

        # Calculate hypothetical downstream changes
        # 1. Waste collection drop increases risk and reduces citizen satisfaction
        waste_impact_on_risk = -1.2 * waste_efficiency_delta_pct # e.g. -15% waste eff -> +18 risk points
        waste_impact_on_sat = 0.8 * waste_efficiency_delta_pct

        # 2. Transit increase reduces risk and carbon emissions
        transit_impact_on_risk = -0.6 * public_transit_delta_pct
        transit_impact_on_carbon = -0.4 * public_transit_delta_pct

        # 3. Air Quality change (positive delta means worse air)
        air_impact_on_health_cost = 1.5 * air_quality_delta_pct
        air_impact_on_risk = 0.8 * air_quality_delta_pct

        # Simulated state outputs
        simulated_civic_risk = max(0.0, min(100.0, baseline_civic_risk + waste_impact_on_risk + transit_impact_on_risk + air_impact_on_risk))
        simulated_health_cost_index = round(max(50.0, baseline_health_cost_index + air_impact_on_health_cost), 1)
        simulated_satisfaction_pct = round(max(10.0, min(100.0, baseline_citizen_satisfaction_pct + waste_impact_on_sat + (0.3 * public_transit_delta_pct))), 1)
        simulated_carbon_emissions_mt = round(max(2.0, baseline_carbon_emissions_mt + (transit_impact_on_carbon * 0.1)), 2)

        return {
            "is_simulated": True,
            "disclaimer": "Model simulation — not observed government data.",
            "inputs": {
                "waste_efficiency_delta_pct": waste_efficiency_delta_pct,
                "public_transit_delta_pct": public_transit_delta_pct,
                "air_quality_delta_pct": air_quality_delta_pct,
                "population_density_growth_pct": population_density_growth_pct
            },
            "baseline": {
                "civic_risk_score": baseline_civic_risk,
                "health_cost_index": baseline_health_cost_index,
                "citizen_satisfaction_pct": baseline_citizen_satisfaction_pct,
                "carbon_emissions_mt": baseline_carbon_emissions_mt
            },
            "simulated_outcome": {
                "civic_risk_score": round(simulated_civic_risk, 1),
                "health_cost_index": simulated_health_cost_index,
                "citizen_satisfaction_pct": simulated_satisfaction_pct,
                "carbon_emissions_mt": simulated_carbon_emissions_mt
            },
            "delta_summary": {
                "risk_change": round(simulated_civic_risk - baseline_civic_risk, 1),
                "health_cost_change_pct": round(simulated_health_cost_index - baseline_health_cost_index, 1),
                "satisfaction_change_pct": round(simulated_satisfaction_pct - baseline_citizen_satisfaction_pct, 1)
            },
            "analytical_insight": (
                f"A {abs(waste_efficiency_delta_pct)}% {'decrease' if waste_efficiency_delta_pct < 0 else 'increase'} in waste collection efficiency "
                f"combined with a {public_transit_delta_pct}% change in public transit coverage yields an estimated "
                f"Civic Risk Score of {round(simulated_civic_risk, 1)}."
            )
        }
