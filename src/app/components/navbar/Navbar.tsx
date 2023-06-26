import React from "react";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";
import Categories from "./Categories";
interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="fixed z-10 w-full flex flex-col items-center justify-center bg-white ">
      {/* Container */}
      <div className="w-full mx-auto xl:px-20 md:px-10 sm:px-2 px-4 py-5 flex shadow-sm border-b border-b-bnb-border flex-row justify-between items-center gap-3 md:gap-0">
        <Logo />
        <Search />
        <UserMenu currentUser={currentUser} />
      </div>
      {/* Container */}
      <div className="w-full mx-auto px-16 py-2 flex flex-row justify-between items-center gap-3 md:gap-0">
        <Categories />
      </div>
    </div>
  );
};

export default Navbar;
