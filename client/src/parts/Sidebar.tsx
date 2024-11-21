import React from "react";
import { Icon } from "./Icon";

export const Sidebar: React.FC<{ onSelect: (option: string) => void }> = ({ onSelect }) => {
  const btnClass = "p-2.5 bg-white text-left px-5 w-full rounded-md hover:bg-gray-300"
  return (
    <aside className="bg-gray-100 w-64 p-4 flex flex-col h-screen">
      <img className="mb-4" src="/logo.png" />
      <div className="flex flex-col justify-start items-start flex-wrap gap-2.5">
        <button className={btnClass} onClick={() => onSelect("search")}>
          <Icon name="search-outline" /><span>Recherche</span>
        </button>
        <button className={btnClass} onClick={() => onSelect("explore")}>
          <Icon name="folder-outline" /><span>Explorateur</span>
        </button>
        <button className={btnClass} onClick={() => onSelect("map")}>
          <Icon name="location-outline" /><span>Carte</span>
        </button>
        <button className={btnClass} onClick={() => onSelect("graph")}>
          <Icon name="git-compare-outline" /><span>Graphe</span>
        </button>
        <button className={btnClass} onClick={() => onSelect("tree")}>
          <Icon name="git-network-outline" /><span>Généalogie</span>
        </button>
        <button className={btnClass} onClick={() => onSelect("organisation")}>
          <Icon name="briefcase-outline" /><span>Organisations</span>
        </button>
      </div>
    </aside>
  );
};