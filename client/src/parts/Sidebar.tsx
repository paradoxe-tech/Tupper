import React, { useEffect, useState } from "react";
import { Contact } from "../../../shared/types";

interface SidebarProps {
  onContactSelect: (contact: Contact) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onContactSelect }) => {
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch contacts from the API endpoint
    const fetchContacts = async () => {
      try {
        const response = await fetch("/api/contacts");
        if (!response.ok) {
          throw new Error("Failed to fetch contacts.");
        }
        const data = await response.json();
        setContacts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter((contact) => {
    const fullName = `${contact.civil.first} ${contact.civil.last}`;
    return fullName.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <aside className="bg-gray-100 w-64 p-4 flex flex-col h-screen">
      <div className="mb-4 text-xl font-bold">Logo</div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher un contact"
          className="w-full px-2 py-1 border border-gray-300 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Chargement des contacts...</p>
      ) : error ? (
        <p className="text-red-500">Erreur : {error}</p>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <li
                  key={contact.id}
                  className="p-2 bg-white border rounded shadow-sm cursor-pointer"
                  onClick={() => onContactSelect(contact)} // Ajouter la sélection ici
                >
                  <p className="font-bold">{`${contact.civil.first} ${contact.civil.last}`}</p>
                  <p className="text-sm text-gray-500">
                    {contact.location.city}, {contact.location.country}
                  </p>
                </li>
              ))
            ) : (
              <p>Aucun contact trouvé.</p>
            )}
          </ul>
        </div>
      )}
    </aside>
  );
};