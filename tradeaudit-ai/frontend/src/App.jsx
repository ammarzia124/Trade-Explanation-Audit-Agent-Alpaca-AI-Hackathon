import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import DashboardPage from './pages/DashboardPage';
import TradesPage from './pages/TradesPage';
import ChatPage from './pages/ChatPage';
import AuditLogPage from './pages/AuditLogPage';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 ml-64">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/trades" element={<TradesPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/audit" element={<AuditLogPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
