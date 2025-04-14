import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Index from "./Index";
import UploadForm from "./UploadForm";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme-provider"

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Router>
      <header>
        <SignedOut>
          {/* <Navbar /> */}
          <Hero />
        </SignedOut>

        <SignedIn>
          {/* <UserButton /> */}
      <Toaster />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/upload" element={<UploadForm />} />
          </Routes>
        </SignedIn>
      </header>
    </Router>
    </ThemeProvider>
  );
}
