import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client';
import './App.css';

import { Navbar } from "./parts/Navbar";
import { Sidebar } from "./parts/Sidebar";
import { Contact } from "./parts/Contact";
import { Contact as ContactData } from "../../shared/types";
import { ContactGraph } from "./parts/Graph";

const App: React.FC = () => {
  const [activeContent, setActiveContent] = useState("graph");
  const [selectedContact, setSelectedContact] = useState<ContactData | null>(null);
  const [contacts, setContacts] = useState<ContactData[]>([]);
  const [popup, togglePopup] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("/api/contacts");
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error("Erreur lors du chargement des contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  function handleContactSelection(contact: ContactData) {
    setSelectedContact(contact);
    togglePopup(true);
  }

  return (
    <div>
      <div className="flex flex-col h-screen">
        <Navbar onSelect={setActiveContent} />
        <div className="flex flex-1 fixed w-screen">
          <Sidebar onContactSelect={handleContactSelection} contacts={contacts} />
          <main className="relative flex-1 mt-12 w-full p-4 bg-gray-50">
            <div className="w-full h-full" onClick={() => togglePopup(false)}>
              {activeContent === "explore" && <div>Explorer Content</div>}
              {activeContent === "map" && <div>Map Content</div>}
              {activeContent === "graph" && 
                <ContactGraph 
                  contacts={contacts} 
                  setSelectedContact={handleContactSelection} />
              }
              {activeContent === "tree" && <div>Tree Content</div>}
              {activeContent === "organisation" && <div>Orga Content</div>}
            </div>
          </main>
        </div>
      </div>
      <div className={`fixed top-0 h-screen w-screen ${popup ? "" : "pointer-events-none"}`}>
        {popup && <div className="relative h-screen w-screen">
        <div className="smokescreen h-full w-full bg-gray-500 opacity-50"
          onClick={() => togglePopup(false)}></div>
        {selectedContact && <Contact user={selectedContact} />}
      </div>}
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)