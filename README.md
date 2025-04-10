# ShoppingMate
Detta är en React-applikation byggd med Vite för att demonstrera affärsplanen och prototypidén för ShoppingMate – en app som hjälper användare att samarbeta kring sina inköpslistor.  

## 📌 Versionshantering
Projektet använder Git för versionshantering genom release och taggningar.

- `main` innehåller produktionsklar kod.
- `deploy-release` är en separat branch för produktionssättning.
- Tidigare versioner har egna releases och dokumenteras via release-taggar.

### 🔖 Release-taggar:
- `v1.0-setup` – Tidigare version från "Assignment 1, Setup", innehåller grundläggande setup och utvecklingskod.
- `v1.0-deploy` – Produktionsklar kod, redo för deployment. Skapad från `shoppingmate-deploy-release`-branchen.

## Teknik och system
- React
- React Router
- Vite

## Installation, utveckling & produktion
Följ dessa steg för att installera och köra projektet lokalt på din maskin:

### 1️: Klona projektet  
```
git clone https://github.com/seb-kvist/ShoppingMate.git

```

### 2️: Installera beroenden
```
npm install
```

### 3️: Starta utvecklingsservern eller Bygg för produktion
För att starta utvecklingsservern:
```
npm run dev
```

För att bygga för produktion: (projektet transpileras genom Vite)
Starta utvecklingsservern
```
npm run dev
```

## Lansering
Applikationen är online på DigitalOcean via följande länk:
------------------


## Projektstruktur  
Projektet följer denna mappstruktur:  

```
/src
├── /components   # Återanvändbara React-komponenter
├── /views        # Vyer för affärsplan, projektidé och AboutMe
├── /styling      # CSS-filer för styling
├── App.jsx       # Huvudkomponenten
├── main.jsx      # Ingångspunkt för React-applikationen
```
## .gitignore  

Projektet innehåller en gitignore som utesluter
```
node_modules/
dist/
.env
```