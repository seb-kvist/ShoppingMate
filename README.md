# ShoppingMate – Fullstack

Detta repo innehåller både frontend (React) och backend (ASP.NET Core) för applikationen ShoppingMate.

---

## Struktur

- **/frontend** – React-applikation (klient)
- **/backend** – ASP.NET Core Web API (server)

---

## Kom igång

### 1. Klona projektet frånn shoppingmate-fullstack
```
git clone --branch shoppingmate-fullstack https://github.com/seb-kvist/ShoppingMate.git
```

### 2. Starta backend/API

Gå till platsen du klonade filerna till och navigera till mappen backend.
```
cd backend
```
Starta API:et
```
dotnet run
```
API:et körs på http://localhost:5096 enl. launchSettings.json)

### 3. Starta frontend (react + vite)

Gå till platsen du klonade filerna till och navigera till mappen frontend
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
