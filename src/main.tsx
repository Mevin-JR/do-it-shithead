import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import App from "./App";
import Home from "./pages/home";
import { AuthProvider } from "./context/authContext";
import ProtectedRoute from "./utils/protectedRoute";
import Login from "./pages/login";
import Signup from "./pages/signup";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route element={<App />}>
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route
            path="home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>,
);
