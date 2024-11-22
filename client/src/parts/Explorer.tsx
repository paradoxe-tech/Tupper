import React, { useState } from "react";
import { Contact } from "../../../shared/types";
import { identifier } from "../../../shared/identifier";
import { Icon } from "./Icon";

type ExplorerProps = {
  contacts: Contact[];
  onAction: (action: string, selectedContacts: Contact[]) => void;
};

export const Explorer: React.FC<ExplorerProps> = ({ contacts, onAction }) => {
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState("");

  const toggleSelection = (contact: Contact) => {
    setSelectedContacts((prev) =>
      prev.includes(contact)
        ? prev.filter((c) => c !== contact)
        : [...prev, contact]
    );
  };

  const handleAction = (action: string) => {
    onAction(action, selectedContacts);
  };

  const filteredContacts = contacts.filter((contact) =>
    identifier(contact).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-4 bg-gray-200 flex justify-between items-center">
        <span className="text-sm block w-1/3 font-semibold">
          {filteredContacts.length} contact{filteredContacts.length > 1 ? "s" : ""}
        </span>
        <button className="border flex p-2.5 bg-white text-left px-5 w-1/3 border rounded-md">
          <Icon name="search" />
            <input 
              onChange={(e) => setSearch(e.target.value)}
              className="w-full placeholder-black bg-transparent focus:outline-none"
              type="text" placeholder="Recherche"/>
        </button>
        <div className="flex space-x-2">
          <Icon name="trash" />
          <Icon name="create" />
          <Icon name="options" />
          <Icon name="funnel" />
        </div>
      </div>

      <ul className="flex-grow overflow-y-auto p-4 space-y-2">
        {filteredContacts.map((contact) => (
          <li
            key={contact.id}
            className={`flex items-center justify-between p-3 border rounded-md bg-white`}
          >
            <span className="text-sm">{identifier(contact)}</span>
            <button
              onClick={() => toggleSelection(contact)}
              className={`px-3 py-1 text-sm rounded-md ${
                selectedContacts.includes(contact)
                  ? "bg-purple-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {selectedContacts.includes(contact) ? "Deselect" : "Select"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
