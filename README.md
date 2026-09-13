# CIVIC X — AI Urban Intelligence & Governance Platform

> **Tagline**: *"From City Data to City Decisions."*  
> **Secondary**: *"Building cities that understand before they react. Today's intelligence. Tomorrow's cities."*

CIVIC X is a lightweight, high-performance urban intelligence and governance platform designed for the **"Smart Cities & Public Services"** hackathon theme. It leverages verified Indian Government datasets (CPCB, MoHUA Smart Cities Mission, data.gov.in) to provide real-time urban telemetry, anomaly detection, root cause insight, public transit monitoring, air quality tracking, and citizen feedback analytics in simple, easy-to-understand English and Hindi (`EN` / `हिंदी`).

---

## 1. System Architecture

```text
React (Vite) + Tailwind CSS + Recharts + Spatial Grid Matrix
                     ↓
        FastAPI Central API Gateway (Python 3.10+)
                     ↓
    Data Processing Engine & Scikit-Learn IsolationForest
                     ↓
Official Indian Government Telemetry (data.gov.in / CPCB / MoHUA)
```

### Key Architectural Highlights
1. **Strict Data Governance & Provenance**: All platform metrics are tagged with official classification tags:
   - `REAL GOVERNMENT DATA` (CPCB Air Quality, MoHUA Smart Cities, data.gov.in)
   - `SIMULATED SCENARIO` (Policy Lab outputs)
   - `MODEL PREDICTION` (Scikit-Learn IsolationForest anomalies)
   - `ANALYTICAL SCORE` (CIVIC X Risk & Readiness Index)
2. **State Spatial Grid Matrix**: A lightweight, robust UI replacement for bulky map renders. Displays all Indian States and UTs with live risk status, color-coded health indicators, and direct telemetry inspection.
3. **Bilingual Accessibility**: Instant toggle between simple English and plain Hindi (`EN` / `हिंदी`) for intuitive navigation and high hackathon judge readability.

---

## 2. Platform Core Modules

1. **01 — India Pulse**: National administrative matrix displaying urban health indicators across Indian states and union territories.
2. **02 — City Digital Intelligence**: Deep-dive analytics into key Indian cities (Delhi, Mumbai, Bengaluru, Chennai, Pune, etc.) with real-time public infrastructure metrics.
3. **03 — Civic Radar**: Machine learning anomaly detection powered by Scikit-Learn `IsolationForest`.
4. **04 — Root Cause Engine**: Probabilistic multi-domain correlation solver explaining underlying causes behind civic anomalies.
5. **05 — Buses & Public Transport**: Fleet electrification, transit route coverage, and EV bus adoption telemetry across Indian municipal transport corporations.
6. **06 — Air Quality & Clean Air**: Station-by-station CPCB telemetry tracking PM2.5, PM10, AQI levels, and NCAP compliance across major cities.
7. **07 — Citizen Feedback & Ratings**: Interactive citizen satisfaction portal featuring star ratings, complaint status tracking, category filters, and feedback distribution analytics.

---

## 3. Quick Start & Setup Instructions

### Prerequisites
- Python 3.10+
- Node.js 18+ & npm

### 1. Backend Setup (FastAPI)
```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On macOS/Linux:
# source venv/bin/activate

pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```
- FastAPI API Documentation: `http://localhost:8000/docs`
- Health Check Endpoint: `http://localhost:8000/api/health`

### 2. Frontend Setup (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
- Open Web Application: `http://localhost:5173`

---

## 4. Official Government Data Sources Integrated

CIVIC X integrates 11 official Indian Government datasets with transparent attribution:
1. **CPCB Central Pollution Control Board**: Live AQI & Station Telemetry
2. **MoHUA Smart Cities Mission Data Portal**: Urban Service Delivery Indicators
3. **Open Government Data (OGD) Platform India (data.gov.in)**: City Infrastructure & EV Fleets
4. **Swachh Bharat Mission (Urban 2.0)**: Waste Processing & Solid Waste Management Statistics
5. **Jal Jeevan Mission (Urban)**: Piped Water & Sanitation Coverage Data
6. **National Clean Air Programme (NCAP)**: City Air Quality Target Milestones
7. **Census & Urban Population Projections**: Demographic Base Metrics
8. **Ministry of Road Transport & Highways (MoRTH)**: Municipal Transit & Fleet Electrification
9. **PM-eBus Sewa Telemetry**: Electric Bus Fleet Allocation Metrics
10. **National Crime Records Bureau (NCRB / Municipal Safety)**: Urban Public Safety Index
11. **Digital India / UMANG Platform**: Civic Service Delivery Latency Metrics

---

## 5. Hackathon Presentation Walkthrough (3-5 Mins)

1. **Landing & India Pulse**: Introduce CIVIC X tagline *"From City Data to City Decisions."* Show the State Spatial Grid Matrix and switch language between English and Hindi.
2. **City Digital Intelligence**: Click on a city (e.g. Delhi NCR or Bengaluru) to view live government indicators and AQI monitoring.
3. **Civic Radar & Root Cause**: Demonstrate automated anomaly detection using Scikit-Learn `IsolationForest` and explainable root cause breakdown.
4. **Public Transport & Air Quality**: Highlight real government EV bus metrics and NCAP air monitoring updates.
5. **Citizen Feedback**: Show how citizens rate municipal services (Water, Roads, Air Quality, Waste) with interactive live rating breakdowns and complaint tracking.

---

## 6. License & Hackathon Attribution

Created for the **Smart Cities & Public Services Hackathon 2026**. Built with open-source technologies (FastAPI, React, Vite, Tailwind CSS, Recharts, Scikit-Learn).
