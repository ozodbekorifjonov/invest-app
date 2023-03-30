import React from "react";
import { ProvideAuth } from "./auth-provider";
import { ProvideRecommends } from "./recommend-provider";

function Providers({ children }) {
  return (
    <ProvideAuth>
      <ProvideRecommends>{children}</ProvideRecommends>
    </ProvideAuth>
  );
}

export default Providers;
