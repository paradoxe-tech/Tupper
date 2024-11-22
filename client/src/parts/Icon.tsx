import React from "react";

export const Icon: React.FC<{ name: string, fill: boolean }> = ({ name, fill=false }) => {
  return (
    <div className="relative top-[2px] inline-block">
      <ion-icon name={`${name}${fill ? '' : '-outline'}`}></ion-icon>
    </div>
  );
};