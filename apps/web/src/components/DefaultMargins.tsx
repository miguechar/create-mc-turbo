import React from "react";

const DefaultMargins = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-4">{children}</div>;
};

export default DefaultMargins;
