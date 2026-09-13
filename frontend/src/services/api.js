const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

async function fetchAPI(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (err) {
    console.warn(`API call failed for ${endpoint}:`, err.message);
    return {
      success: false,
      data: null,
      error: "Government data temporarily unavailable.",
      source: "Gateway Fallback",
      updated_at: new Date().toISOString(),
      is_simulated: false
    };
  }
}

export const api = {
  getHealth: () => fetchAPI('/health'),
  getIndiaOverview: () => fetchAPI('/india/overview'),
  getStates: () => fetchAPI('/states'),
  getStateByCode: (code) => fetchAPI(`/states/${code}`),
  getCities: () => fetchAPI('/cities'),
  getCityById: (id) => fetchAPI(`/cities/${id}`),
  getCivicRisk: (cityId = 'delhi-ncr') => fetchAPI(`/civic-risk?city_id=${cityId}`),
  getAnomalies: () => fetchAPI('/anomalies'),
  getRootCause: (incidentId) => fetchAPI(`/root-cause/${incidentId}`),
  getEnvironment: () => fetchAPI('/environment'),
  getMobility: (cityId = 'delhi-ncr') => fetchAPI(`/mobility?city_id=${cityId}`),
  get2047Readiness: () => fetchAPI('/2047/readiness'),
  get2047Trajectory: () => fetchAPI('/2047/trajectory'),
  runSimulation: (params) => fetchAPI('/simulation', {
    method: 'POST',
    body: JSON.stringify(params)
  }),
  getDataSources: () => fetchAPI('/data-sources')
};
