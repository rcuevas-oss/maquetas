import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Reservar from './pages/Reservar'
import Dashboard from './pages/admin/Dashboard'
import ServiciosPage from './pages/admin/Servicios'
import BarberosPage from './pages/admin/Barberos'
import ReservasPage from './pages/admin/Reservas'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/reservar" element={<Reservar />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/servicios" element={<ServiciosPage />} />
        <Route path="/admin/barberos" element={<BarberosPage />} />
        <Route path="/admin/reservas" element={<ReservasPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}
