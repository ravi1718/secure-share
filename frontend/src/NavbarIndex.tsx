
import { UserButton } from "@clerk/clerk-react";

import { ModeToggle } from "./components/mode-toggle";

const NavbarIndex = () => {


  return (
    <nav className="bg-white dark:bg-gray-800 p-4 shadow-md">
      <div className="flex justify-between items-center">
        {/* Left side (can be logo or title) */}
        <div className="text-lg font-semibold text-gray-800 dark:text-white">
          <h1>Digi-Wallet</h1>
        </div>

        {/* Right side (User profile and Dark mode toggle) */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}

        <ModeToggle/>
          {/* User Profile Button */}
          <UserButton />
        </div>
      </div>
    </nav>
  );
};

export default NavbarIndex;
