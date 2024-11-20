import React from 'react';

export const Navbar: React.FC<{ onSelect: (option: string) => void }> = ({ onSelect }) => (
  <nav className="z-20 flex main-width justify-around bg-gray-200 text-black py-3 fixed top-0 ml-64 w-full">
    <button className="hover:bg-gray-300" onClick={() => onSelect("map")}>
      Carte
    </button>
    <button className="hover:bg-gray-300" onClick={() => onSelect("graph")}>
      Graphe
    </button>
    <button className="hover:bg-gray-300" onClick={() => onSelect("tree")}>
      Généalogie
    </button>
    <button className="hover:bg-gray-300" onClick={() => onSelect("organisation")}>
      Organisations
    </button>
  </nav>
);