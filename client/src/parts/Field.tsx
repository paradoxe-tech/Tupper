import React from "react";
import { Icon } from "./Icon";
import { parseDate } from "../../../shared/parseDate";

type props = { icon: string; value: string; type: string; };

export const Field: React.FC<props> = ({ icon, value, type }) => {
  let content = <></>;
  const defaultClass = "w-full bg-gray-200 px-3 py-1 rounded-md";
  const clickable = ` hover:bg-gray-300 cursor-pointer`;
  
  if(type == "text") {
    
    if(value.length == 0) return <></>;
    else content = <span className={defaultClass}>{value}</span>
    
  } else if(type == "date") {
    
    try {
      content = <span className={defaultClass + clickable}>
        {parseDate(value, "dd-MM-yyyy")}</span>
    } catch {
      return <></>;
    }
    
  } else if(type == "link") {
    
    content = <a 
      className={defaultClass + clickable} 
      href={value.split(';')[1]}
      target="_blank"
    >{value.split(';')[0]}</a>
    
  } else if(type == "place") {

    let place = JSON.parse(value);
    if(!place.city || place.city.length == 0) return <></>;
    content = <a className={defaultClass + clickable}>{place.city}</a>;
    
  }
  
  return (
    <div className="flex gap-3">
      <Icon name={icon} fill={true} />
      {content}
    </div>
  );
};