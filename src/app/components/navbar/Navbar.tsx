import React from "react";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

const Navbar: React.FC = () => {
  return (
    <div className="fixed w-full bg-white shadow-sm py-4 border-b border-b-bnb-border">
      {/* Container */}
      <div className=" max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 flex flex-row justify-between items-center gap-3 md:gap-0">
        <Logo />
        <Search />
        <UserMenu/>
      </div>
    </div>
  );
};

export default Navbar;
