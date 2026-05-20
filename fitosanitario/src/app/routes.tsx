import { lazy } from 'react'
import { createHashRouter } from 'react-router-dom'
import { AppLayout } from '../layouts/AppLayout'

const Dashboard = lazy(() => import('../features/dashboard/DashboardPage'))
const Inventory = lazy(() => import('../features/inventory/InventoryPage'))
const Planning = lazy(() => import('../features/planning/PlanningPage'))
const Execution = lazy(() => import('../features/execution/ExecutionPage'))
const Alerts = lazy(() => import('../features/alerts/AlertsPage'))
const Reports = lazy(() => import('../features/reports/ReportsPage'))
const Rules = lazy(() => import('../features/rules/RulesPage'))
const Audit = lazy(() => import('../features/audit/AuditPage'))

export const router = createHashRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/inventario', element: <Inventory /> },
      { path: '/planificacion', element: <Planning /> },
      { path: '/ejecucion', element: <Execution /> },
      { path: '/alertas', element: <Alerts /> },
      { path: '/reportes', element: <Reports /> },
      { path: '/reglas', element: <Rules /> },
      { path: '/auditoria', element: <Audit /> },
      { path: '*', element: <Dashboard /> }, // Catch-all route just in case
    ],
  },
])
