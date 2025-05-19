# ShoppingMate – Fullstack

Detta repo innehåller både frontend (React) och backend (ASP.NET Core) för applikationen ShoppingMate.

---

## Struktur

- **/frontend** – React-applikation (klient)
- **/backend** – ASP.NET Core Web API (server)

---

## Kom igång

### Backend

1. Navigera till mappen `backend`:
   ```bash
   cd backend
   ```
2. Starta API:et ( API:et körs på http://localhost:5096 enl. launchSettings.json)
 ```
 dotnet run
 ```

3. Ingen extern databas är kopplad, allt lagras i minnet med InMemoryDatabas.


### Frontend

1. Öppna en ny terminal och gå till frontend:
```
cd frontend
```
2. Installera beroenden:
```
npm install
```

3. Starta react (Frontenden körs på http://localhost:5173)
```
npm run dev
```

## Koppling frontend-backend

- API_URL i frontend är satt till backendens adress (t.ex. http://localhost:5096).

- Backend måste vara igång innan frontend används.

- Frontenden kommunicerar med backend via fetch/REST.

## Endpoints

- ApiTest.http innehåller olika endpoint-tester som man kan testköra med REST-Client
- endpoints.md innehåller beskrivning av de olika endpointsen. 