// import React from 'react'
import Index from "./index.tsx";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

export default function App() {
  return (
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
        <Index />
      </SignedIn>
    </header>
  );
}

