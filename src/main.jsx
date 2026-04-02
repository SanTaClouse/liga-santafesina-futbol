import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import LigaSantafesinaStandingsLight from "./LigaSantafesinaStandingsLight.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LigaSantafesinaStandingsLight />
  </StrictMode>
);
