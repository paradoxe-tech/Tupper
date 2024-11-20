import React from "react";
import { Icon } from "./Icon";
import { parseDate } from "../../../shared/parseDate";

type props = { icon: string; value: string; type: string; };

export const Field: React.FC<props> = ({ icon, value, type }) => {
  if(type == "text") {
    if(value.length == 0) return (
      <input className="w-full bg-gray-200 px-3 py-1 rounded-md"
        type="text" placeholder="Entrez une nouvelle valeur" />
    );

  } else if(type == "date") {
    value = parseDate(value, "dd-MM-yyyy")
  }
  
  return (
    <p>
      <Icon name={icon} />
      <span className="w-full bg-gray-200 px-3 py-1 rounded-md">{value}</span>
    </p>
  );
};