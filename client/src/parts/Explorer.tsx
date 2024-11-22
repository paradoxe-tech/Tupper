import React, { useState } from "react";
import { Contact } from "../../../shared/types";
import { identifier } from "../../../shared/identifier";
import { Icon } from "./Icon";

type ExplorerProps = {
  contacts: Contact[];
  popContact: Function;
};

export const Explorer: React.FC<ExplorerProps> = ({ contacts, popContact }) => {
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState("");

  const toggleSelection = (contact: Contact) => {
    setSelectedContacts((prev) =>
      prev.includes(contact)
        ? prev.filter((c) => c !== contact)
        : [...prev, contact]
    );
  };

  const filteredContacts = contacts.filter((contact) =>
    identifier(contact).toLowerCase().includes(search.toLowerCase())
  );

  const bttnClass = `border flex gap-3 p-2.5 bg-white text-left px-5 border rounded-md hover:bg-gray-50`;

  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-4 bg-gray-200 flex justify-between items-center">
        <span className="text-sm block w-1/3 font-semibold">
          {filteredContacts.length} contact{filteredContacts.length > 1 ? "s" : ""} ({selectedContacts.length} séléctionné{filteredContacts.length > 1 ? "s" : ""})
        </span>
        <div className="flex space-x-2">
          <button className={bttnClass}>
            <Icon name="add" />
            <span>Nouveau</span>
          </button>
          <button className={bttnClass}>
            <Icon name="search" />
              <input 
                onChange={(e) => setSearch(e.target.value)}
                className="w-full placeholder-black bg-transparent focus:outline-none"
                type="text" placeholder="Recherche"/>
          </button>
          <button className={bttnClass}>
            <Icon name="ellipsis-vertical" fill={true} />
          </button>
        </div>
      </div>

      <ul className="flex-grow overflow-y-auto p-4 space-y-2">
        {filteredContacts.map((contact) => (
          <li
            key={contact.id}
            className={`flex cursor-pointer items-center justify-between p-3 border rounded-md bg-white hover:bg-gray-50`}
            onClick={() => popContact(contact)}
          >
            <span className="text-sm">{identifier(contact)}</span>
            <div className="flex gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSelection(contact);
                }}
                className={`px-3 py-1 text-sm rounded-md ${
                  selectedContacts.includes(contact)
                    ? "bg-purple-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {selectedContacts.includes(contact) ? "Déséléctionner" : "Séléctionner"}
              </button>
            </div>
            
          </li>
        ))}
      </ul>
    </div>
  );
};
