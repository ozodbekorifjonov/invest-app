import React from "react";
import { ProvideAuth } from "./auth-provider";

function Providers({ children }) {
  return <ProvideAuth>{children}</ProvideAuth>;
}

export default Providers;
