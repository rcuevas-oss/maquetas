import { useEffect, useState } from "react";
import { Footer } from "./components/Footer";
import { Modal } from "./components/Modal";
import { Navbar } from "./components/Navbar";
import { ContactForm } from "./components/ContactForm";
import { SuccessModal } from "./components/SuccessModal";
import { BrandsView } from "./views/BrandsView";
import { DashboardView } from "./views/DashboardView";
import { LandingView } from "./views/LandingView";
import { ProfileView } from "./views/ProfileView";
import type { View } from "./types";

type FormVariant = "rider" | "brand";

export default function App() {
  const [view, setView] = useState<View>("landing");
  const [formOpen, setFormOpen] = useState(false);
  const [formVariant, setFormVariant] = useState<FormVariant>("rider");
  const [successOpen, setSuccessOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Apply dark class to <html> so CSS vars take effect
  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [view]);

  const openForm = (variant: FormVariant) => {
    setFormVariant(variant);
    setFormOpen(true);
  };

  const onSuccess = () => {
    setFormOpen(false);
    setSuccessOpen(true);
  };

  const formCopy =
    formVariant === "rider"
      ? { title: "Solicitar mi RiderBio", desc: "Cuéntanos sobre ti. Te ayudamos a montar tu perfil ciclista profesional." }
      : { title: "Soy tienda o marca", desc: "Conecta tu tienda con embajadores ciclistas reales. Activamos tu campaña." };

  return (
    <div className="min-h-full flex flex-col" style={{ background: "var(--rb-bg)", color: "var(--rb-text)" }}>
      <Navbar
        current={view}
        onNavigate={setView}
        onCTA={() => openForm("rider")}
        isDark={isDark}
        onToggleTheme={() => setIsDark((d) => !d)}
      />

      <main className="flex-1">
        {view === "landing" && (
          <LandingView onNavigate={setView} onRequestRider={() => openForm("rider")} onRequestBrand={() => openForm("brand")} />
        )}
        {view === "profile" && (
          <ProfileView onNavigate={setView} onContactBrand={() => openForm("brand")} />
        )}
        {view === "dashboard" && <DashboardView onNavigate={setView} />}
        {view === "brands" && (
          <BrandsView onNavigate={setView} onContactBrand={() => openForm("brand")} />
        )}
      </main>

      <Footer context={view === "profile" ? "profile" : "default"} />

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title={formCopy.title} description={formCopy.desc} size="lg">
        <ContactForm variant={formVariant} onSuccess={onSuccess} />
      </Modal>

      <SuccessModal open={successOpen} onClose={() => setSuccessOpen(false)} />
    </div>
  );
}
