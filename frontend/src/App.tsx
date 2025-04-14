import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Index from "./Index";
import UploadForm from "./UploadForm";

export default function App() {
  return (
    <Router>
      <header>
        <SignedOut>
          <Navbar />
          <Hero />
        </SignedOut>

        <SignedIn>
          <UserButton />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/upload" element={<UploadForm />} />
          </Routes>
        </SignedIn>
      </header>
    </Router>
  );
}
