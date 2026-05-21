import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { DashboardPage } from "./pages/DashboardPage";
import { PerfilPage } from "./pages/PerfilPage";
import { LinksPage } from "./pages/LinksPage";
import { CuentaPage } from "./pages/CuentaPage";
import { RequireAuth } from "./components/auth/RequireAuth";
import { AppShell } from "./components/layout/AppShell";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/"
        element={
          <RequireAuth>
            <AppShell>
              <DashboardPage />
            </AppShell>
          </RequireAuth>
        }
      />
      <Route
        path="/perfil"
        element={
          <RequireAuth>
            <AppShell>
              <PerfilPage />
            </AppShell>
          </RequireAuth>
        }
      />
      <Route
        path="/links"
        element={
          <RequireAuth>
            <AppShell>
              <LinksPage />
            </AppShell>
          </RequireAuth>
        }
      />
      <Route
        path="/cuenta"
        element={
          <RequireAuth>
            <AppShell>
              <CuentaPage />
            </AppShell>
          </RequireAuth>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
