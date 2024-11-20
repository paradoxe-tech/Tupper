import React from 'react';

export const Navbar: React.FC<{ onSelect: (option: string) => void }> = ({ onSelect }) => (
  <nav className="z-20 flex main-width justify-around bg-blue-500 text-white py-3 fixed top-0 ml-64 w-full">
    <button className="hover:underline" onClick={() => onSelect("map")}>
      Carte
    </button>
    <button className="hover:underline" onClick={() => onSelect("graph")}>
      Graphe
    </button>
    <button className="hover:underline" onClick={() => onSelect("tree")}>
      Généalogie
    </button>
    <button className="hover:underline" onClick={() => onSelect("organisation")}>
      Organisations
    </button>
  </nav>
);