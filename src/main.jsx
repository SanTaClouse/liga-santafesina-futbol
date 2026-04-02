import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import LigaSantafesinaStandings from "./LigaSantafesinaStandings.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LigaSantafesinaStandings />
  </StrictMode>
);
