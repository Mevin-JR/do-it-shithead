import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import Home from "./pages/home";
import { AuthProvider } from "./context/authContext";
import ProtectedRoute from "./utils/protectedRoute";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        {/* TODO: Change this entry route, add "/login" and "/signup". Redirect users to "/login" instead of "/" */}
        <Route path="/" element={<App />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  </BrowserRouter>,
);
