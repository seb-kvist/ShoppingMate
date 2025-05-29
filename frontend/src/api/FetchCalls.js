// src/api/FetchCalls.js

import { API_URL, authHeaders } from '../api';

// AUTH
export async function fetchCurrentUser() {
  const res = await fetch(`${API_URL}/auth/user`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Kunde inte hämta användare');
  return res.json();
}

export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('Inloggning misslyckades');
  return res.json();
}

export async function register(email, password, firstName, lastName) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, firstName, lastName })
  });
  if (!res.ok) throw new Error('Registrering misslyckades');
  // Hantera tomt svar
  const text = await res.text();
  return text ? JSON.parse(text) : {};
}

// SHOPPING LISTS
export async function fetchShoppingLists() {
  const res = await fetch(`${API_URL}/shoppinglist`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Kunde inte hämta listor');
  return res.json();
}

export async function createShoppingList(name) {
  const res = await fetch(`${API_URL}/shoppinglist`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ name })
  });
  if (!res.ok) throw new Error('Kunde inte skapa lista');
  return res.json();
}

export async function deleteShoppingList(listId) {
  const res = await fetch(`${API_URL}/shoppinglist/${listId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Kunde inte ta bort listan');
  return res.text();
}

export async function updateShoppingListName(listId, newName) {
  const res = await fetch(`${API_URL}/shoppinglist/${listId}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify({ newListName: newName })
  });
  if (!res.ok) throw new Error('Kunde inte uppdatera namn på lista');
  return res.json();
}

export async function inviteUserToList(listId, email) {
  const res = await fetch(`${API_URL}/shoppinglist/invite?listId=${listId}`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ email })
  });
  if (!res.ok) throw new Error('Kunde inte bjuda in användare');
  return res.text();
}

//ITEMS
export async function fetchListItems(listId) {
  const res = await fetch(`${API_URL}/shoppinglist/${listId}/items`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Kunde inte hämta produkter');
  return res.json();
}

export async function addItemToList(listId, item) {
  const res = await fetch(`${API_URL}/shoppinglist/${listId}/items`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(item)
  });
  if (!res.ok) throw new Error('Kunde inte lägga till produkt');
  return res.json();
}

export async function updateItemInList(listId, itemId, item) {
  const res = await fetch(`${API_URL}/shoppinglist/${listId}/items/${itemId}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(item)
  });
  if (!res.ok) throw new Error('Kunde inte uppdatera produkt');
  return res.json();
}

export async function deleteItemInList(listId, itemId) {
  const res = await fetch(`${API_URL}/shoppinglist/${listId}/items/${itemId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Kunde inte ta bort produkt');
  return res.text();
}
