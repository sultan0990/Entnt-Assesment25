import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import { Bell } from "lucide-react";
import { useCommunication } from "./context/data";
import { CommunicationProvider } from "./context/data";
import AdminModule from "./routes/adminModule";
import UserDashboard from "./routes/userDashboard";
import CalendarView from "./components/notificationCalander";
import CompanyListPage from "./routes/companies";
import NotificationsPage from "./components/notification";
import "./App.css";

function App() {
  const { overdueCommunicationsCount } = useCommunication();
  return (
    <CommunicationProvider>
      <Router>
        <div className="app-container">
          <nav className="main-navigation">
            <div className="logo">Calendar Application for Communication Tracking</div>
            <ul className="nav-links">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Register Company
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/calendar"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Calendar
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/company"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Company List
                </NavLink>
              </li>
              <li>
                <NavLink to="/notification" className="overdue-notification">
                  <Bell size={24} />
                  {overdueCommunicationsCount > 0 && (
                    <span className="notification-badge">
                      {overdueCommunicationsCount}
                    </span>
                  )}
                </NavLink>
              </li>
            </ul>
          </nav>

          <main className="main-content">
            <Routes>
              <Route path="/" element={<UserDashboard />} />
              <Route path="/admin" element={<AdminModule />} />
              <Route path="/calendar" element={<CalendarView />} />
              <Route path="/company" element={<CompanyListPage />} />
              <Route path="/notification" element={<NotificationsPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CommunicationProvider>
  );
}

export default App;
