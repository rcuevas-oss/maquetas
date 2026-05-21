import { Routes, Route } from "react-router-dom";
import App from "./App";
import { PublicProfilePage } from "./pages/PublicProfilePage";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/p/:username" element={<PublicProfilePage />} />
      <Route path="*" element={<App />} />
    </Routes>
  );
}
