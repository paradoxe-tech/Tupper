import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom/client';
import './App.css';

import { Navbar } from "./parts/Navbar";
import { Sidebar } from "./parts/Sidebar";
import { Contact } from "./parts/Contact";

import { Contact as ContactData, Place } from "../../shared/types";

import { ContactGraph } from "./parts/Graph";
import { MapView } from "./parts/Map";
import { Explorer } from "./parts/Explorer";
import { Dashboard } from "./parts/Dashboard";

const App: React.FC = () => {
  const [activeContent, setActiveContent] = useState("dashboard");
  const [popContact, setPopContact] = useState<ContactData | null>(null);
  const [contacts, setContacts] = useState<ContactData[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [popup, togglePopup] = useState(false);

  type Setter = React.Dispatch<React.SetStateAction<any[]>>

  useEffect(() => {
    const retrieveData = async (endpoint: string, setter: Setter) => {
      try {
        const response = await fetch(endpoint);
        const data = await response.json();
        setter(data);
      } catch (error) {
        console.error(`Erreur lors du chargement de ${endpoint}:`, error);
      }
    };

    retrieveData("/api/contacts", setContacts);
    retrieveData("/api/places", setPlaces);
  }, []);

  function handleContactSelection(contact: ContactData) {
    setPopContact(contact);
    togglePopup(true);
  }

  return (
    <div>
      <div className="flex flex-col h-screen">
        <div className="flex flex-1 fixed w-screen">
          <Sidebar onSelect={setActiveContent} />
          <main className="relative h-screen flex-1 w-full bg-gray-50">
            <div className="w-full h-full">
              {activeContent === "dashboard" && 
                <Dashboard left={<Explorer 
                  contacts={contacts}
                  popContact={handleContactSelection} />} 
                topRight={<ContactGraph 
                  contacts={contacts} 
                  popContact={handleContactSelection} />}
                middleRight={<MapView places={places} />}
                bottomRight={<div></div>} />
              }
              {activeContent === "explore" && 
                <Explorer 
                  contacts={contacts}
                  popContact={handleContactSelection} />
              }
              {activeContent === "map" && 
                <MapView 
                  places={places} 
                  popContact={handleContactSelection} />
              }
              {activeContent === "graph" && 
                <ContactGraph 
                  contacts={contacts} 
                  popContact={handleContactSelection} />
              }
              {activeContent === "tree" && <div>Pas de contenu de généalogie pour l'instant.</div>}
              {activeContent === "tools" && <div>Pas d'outils pour l'instant.</div>}
            </div>
          </main>
        </div>
      </div>
      <div className={`z-30 fixed top-0 h-screen w-screen ${popup ? "" : "pointer-events-none"}`}>
        {popup && <div className="relative h-screen w-screen">
        <div className="smokescreen h-full w-full bg-gray-500 opacity-50"
          onClick={() => togglePopup(false)}></div>
        {popContact && <Contact user={popContact} places={places} />}
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