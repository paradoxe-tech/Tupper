import React from "react";

export const Icon: React.FC<{ name: string }> = ({ name }) => {
  return (
    <div className="mr-3 inline-block">
      <ion-icon name={name}></ion-icon>
    </div>
  );
};