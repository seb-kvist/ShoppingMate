# Kravlista

## Krav 6: Prototyp renderas med React 
Appen renderar ut App.jsx och visas i webbläsaren

## Krav 7: React-trädet med minst 5 komponenter
Appen har flera olika komponenter så som MainBody, Footer, Header, LoginView, StartupView och sedan tre andra för listrelaterade vyer. 

## Krav 8: JSX-syntax (5 poäng)
Alla komponenter är i JSX-syntax. 

## Krav 9: Hantering av event (5 poäng)
Har event i flera olika delar. Men i t.ex. shoppinglistoverview.jsx har vi event med onlclick som triggar handleSelectList, som navigerar genom föräldern till en annan vy och även handleDeleteList som istället tar bort en lista. 

## Krav 10: Användning av state för tillståndsbaserad rendering (5 poäng)
Jag använder states just nu för att kolla om användaren är inloggad eller inte genom en boolean, vilket kommer visa en annan version av min header (utan navigering), men också till grund i hur min MainbBody fungerar genom att sätta rätt state för den vy jag vill se.

## Krav 11: Användning av lifecycle-metod eller hook (10 poäng)
SelectedShoppingList.jsx använder useEffect för att ladda och uppdatera listan med produkter från localStorage. Så när man laddar ink omponenten kollas det om det finns sparad data och uppdaterar den isåfall. 

## Krav 12 & 13: Spara information i LocalStorage (10 poäng)
I SelectedShoppingList.jsx används localStorage för att spara produkter som användaren lägger till i inköpslistan. När listan med produkter öppnas, redigeras eller tas bort så renderas det dynamiskt

## Krav 14: Egen CSS eller bibliotek för stil och form (5 poäng)
Använder en App.css för att styla alla komponenter

