# FarmBridge

FarmBridge is a starter monorepo for an agriculture platform with three main parts:

- **frontend/**: React + Vite web client.
- **backend/**: Node.js + Express API service.
- **AI/**: Python workspace for advisory and pest-analysis agents.

## Current status

This repository is scaffold-first. Much of the domain logic is still placeholder code, but the backend and AI entrypoints now run for local bootstrapping.

## Quick start

### 1) Frontend

```bash
cd frontend
npm install
npm run dev
```

### 2) Backend

```bash
cd backend
npm install
npm run dev
```

Health check endpoint:

```bash
curl http://localhost:5000/health
```

### 3) AI module

```bash
cd AI
python3 main.py
```

## Suggested next implementation steps

1. Add authentication and farmer/retailer workflows in `backend/src/controllers` and `backend/src/services`.
2. Connect frontend pages to real API calls through `frontend/src/services`.
3. Implement AI agent pipelines in `AI/APP/Agents` and expose them via API/gRPC.
4. Add repository-level test and lint automation.
