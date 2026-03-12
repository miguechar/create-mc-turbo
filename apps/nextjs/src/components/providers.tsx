import React from "react";

import { TooltipProvider } from "../../../../packages/ui/src/components/tooltip";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <TooltipProvider>{children}</TooltipProvider>
    </>
  );
};

export default Providers;
