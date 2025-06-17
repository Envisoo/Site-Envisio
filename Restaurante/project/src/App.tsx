import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { CustomerMenu } from "./components/CustomerMenu";
import { AdminDashboard } from "./components/AdminDashboard";
import { Chat } from "./components/Chat";
import { Auth } from "./components/Auth";
import { OrderSystem } from "./components/OrderSystem";
import { Reservations } from "./components/Reservations";
import { UserProvider } from "./context/UserContext";
import { useUser } from "./context/UserContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  return user ? <>{children}</> : <Navigate to="/auth" />;
}

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-amber-50">
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <>
                    <Navigation />
                    <main className="max-w-7xl mx-auto px-4 py-8">
                      <CustomerMenu />
                    </main>
                  </>
                </PrivateRoute>
              }
            />
            <Route
              path="/order"
              element={
                <PrivateRoute>
                  <>
                    <Navigation />
                    <OrderSystem />
                  </>
                </PrivateRoute>
              }
            />
            <Route
              path="/reservations"
              element={
                <PrivateRoute>
                  <>
                    <Navigation />
                    <Reservations />
                  </>
                </PrivateRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <PrivateRoute>
                  <>
                    <Navigation />
                    <Chat />
                  </>
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <>
                    <Navigation />
                    <AdminDashboard />
                  </>
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
