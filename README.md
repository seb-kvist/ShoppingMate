q# ShoppingMate – Fullstack

Detta repo innehåller både frontend (React) och backend (ASP.NET Core) för applikationen ShoppingMate.

---

## Struktur

- **/frontend** – React-applikation (klient)
- **/backend** – ASP.NET Core Web API (server)

---

## Kom igång

### 🧾 1. Klona projektet frånn shoppingmate-fullstack
```
git clone --branch shoppingmate-fullstack https://github.com/seb-kvist/ShoppingMate.git
cd ShoppingMate
git checkout shoppingmate-fullstack
```

### 🧾 2. Starta backend/API

Navigera till mappen backend.
```
cd backend
```
Installera .NET-beroenden
```
dotnet restore
```
Starta API:et
```
dotnet run
```
API:et körs på http://localhost:5096 enl. launchSettings.json)

### 🧾 3. Starta frontend (react + vite)

Navigera till mappen frontend
```
cd frontend
```
Installera beroenden
```
npm install
```
Starta frontenden i utvecklingsläge
```
npm run dev
```

Frontenden körs på: http://localhost:5173



## Koppling frontend-backend

- API_URL i frontend är satt till backendens adress (http://localhost:5096).

- Backend måste vara igång innan frontend används.

- Frontenden kommunicerar med backend via fetch/REST.

## Endpoints / API-testning

- ApiTest.http: Innehåller testanrop, kan användas med REST Client
- endpoints.md: Beskrivning av alla tillgängliga endpoints.
