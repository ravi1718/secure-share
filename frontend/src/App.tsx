// import React from 'react'
import Index from "./Index.tsx";
import Navbar from "./Navbar.tsx";
import Hero from "./Hero.tsx";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";


export default function App() {
  return (
    <header>
      
      <SignedOut>
        {/* <SignInButton /> */}
        <Navbar />
        <Hero/>
      </SignedOut>
      <SignedIn>
        <UserButton />
        <Index />
      </SignedIn>
    </header>
  );
}

