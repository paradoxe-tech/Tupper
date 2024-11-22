import React from "react";

type DashboardProps = {
  left: React.ReactNode;
  topRight: React.ReactNode;
  middleRight: React.ReactNode;
  bottomRight: React.ReactNode;
};

export const Dashboard: React.FC<DashboardProps> = ({
  left,
  topRight,
  middleRight,
  bottomRight,
}) => {
  const common = "bg-gray-100 rounded-md border overflow-clip"
  return (
    <div className="grid grid-cols-2 grid-rows-3 h-full w-full gap-8 p-8">
      <div className={`col-span-1 row-span-3 ${common}`}>{left}</div>
      <div className={`col-span-1 row-span-1 ${common}`}>{topRight}</div>
      <div className={`col-span-1 row-span-1 ${common}`}>{middleRight}</div>
      <div className={`col-span-1 row-span-1 ${common}`}>{bottomRight}</div>
    </div>
  );
};