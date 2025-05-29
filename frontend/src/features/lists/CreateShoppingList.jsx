import React, { useState } from 'react';
import GeneralAlert from '../../components/GeneralAlert';
import { createShoppingList, inviteUserToList } from '../../api/FetchCalls';

/**
 * Komponent för att skapa en ny inköpslista och bjuda in medlemmar direkt.
 * Props: onCreateList: callback som anropas när en lista har skapats (för att uppdatera listor i MainBody)
 */
function CreateShoppingList({ onCreateList }) {
  // State för formulärfält och feedback
  const [listName, setListName] = useState('');
  const [emails, setEmails] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Hanterar formulärets submit (skapa lista + bjud in användare)
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Gör om epoststrängen till en array av adresser, utan tomma värden
    const emailArray = emails
      .split(',')
      .map(email => email.trim())
      .filter(email => !!email);

    try {
      // Skapa själva listan i backend med hjälöp av FetchCalls
      const created = await createShoppingList(listName);

      //  Bjud in varje angiven e-postadress till listan
      for (const email of emailArray) {
        await inviteUserToList(created.id, email); 
      }

      //  Återställ formuläret och meddela MainBody (för omhämtning)
      setListName('');
      setEmails('');
      setError('');
      if (onCreateList) onCreateList(created);

    } catch (err) {
      setError(err.message || "Något gick fel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-shopping-list-view">
      <h2>Skapa en ny shoppinglista</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Listnamn</label>
          <input
            type="text"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder="Exempel: Arbetsplatsen"
            required
          />
        </div>

        <div>
          <label>Bjud in användare via e-post (separera med kommatecken)</label>
          <input
            type="text"
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
            placeholder="email1@exempel.com, email2@exempel.com"
          />
        </div>

        {/* Skicka-knapp och ev. felmeddelande */}
        <button type="submit" className="create-list-btn" disabled={loading}>
          {loading ? "Skapar..." : "Skapa lista"}
        </button>
        {error && <GeneralAlert type="error" message={error} />}
      </form>
    </div>
  );
}

export default CreateShoppingList;
