import React, { useState } from "react";
import { Icon } from "./Icon";

export const Sidebar: React.FC<{ onSelect: (option: string) => void }> = ({ onSelect }) => {
  const [activeOption, setActiveOption] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setActiveOption(option);
    onSelect(option);
  };

  const btnClass = (option: string) =>
    `border flex gap-3 items-center p-2.5 bg-white text-left px-5 w-full rounded-md hover:bg-gray-50 ${
      activeOption === option ? "text-purple-500" : "text-black"
    }`;
  
  return (
    <aside className="bg-gray-100 w-64 p-4 flex flex-col h-screen shadow">
      <img className="mb-4" src="/logo.png" alt="Logo" />
      <div className="flex flex-col justify-start items-start flex-wrap gap-2.5">
        <button className={btnClass("search")} onClick={() => handleSelect("search")}>
          <Icon name="search" />
          <input
            className="w-full placeholder-black bg-transparent focus:outline-none"
            type="text"
            placeholder="Recherche"
          />
        </button>
        <button className={btnClass("dashboard")} onClick={() => handleSelect("dashboard")}>
          <Icon name="home" fill={activeOption === "dashboard"} />
          <span>Dashboard</span>
        </button>
        <button className={btnClass("explore")} onClick={() => handleSelect("explore")}>
          <Icon name="folder" fill={activeOption === "explore"} />
          <span>Explorateur</span>
        </button>
        <button className={btnClass("map")} onClick={() => handleSelect("map")}>
          <Icon name="location" fill={activeOption === "map"} />
          <span>Carte</span>
        </button>
        <button className={btnClass("graph")} onClick={() => handleSelect("graph")}>
          <Icon name="git-compare" fill={activeOption === "graph"} />
          <span>Graphe</span>
        </button>
        <button className={btnClass("tree")} onClick={() => handleSelect("tree")}>
          <Icon name="git-network" fill={activeOption === "tree"} />
          <span>Généalogie</span>
        </button>
      </div>
    </aside>
  );
};