import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "sonner";
// https://dribbble.com/shots/23799483-Flavoriz-Food-Recipes-Website-UI-Figma-Template

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
        <Toaster position="bottom-right" richColors closeButton />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
