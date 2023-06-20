"use client";
import React, { useCallback, useState } from "react";
import HamburgerIcon from "../icons/HamburgerIcon";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";

const UserMenu: React.FC = () => {
  const registerModal = useRegisterModal();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  const dataMenu = [
    { label: "Sign in", onClick: registerModal.onOpen },
    { label: "Log in", onClick: registerModal.onOpen },
  ];
  return (
    <>
      <div className="relative flex gap-4 bg-transparent w-auto items-center justify-center">
        <p className="text-black font-semibold">Ainbnb your home</p>
        <button
          onClick={toggleMenu}
          className="flex items-center justify-center border-bnb-border border shadow-sm hover:shadow-md transition rounded-full gap-3 px-[14px] py-1.5"
        >
            <HamburgerIcon style="w-4 h-4 fill-bnb-soft-gray" />
 
          <Avatar />
        </button>
        {isOpen && (
          <div className="flex flex-col py-2 absolute top-[60px] w-[40vw] md:w-[200px] shadow-md bg-white rounded-lg right-2 z-10">
            {dataMenu.map((menu, index) => (
              <MenuItem label={menu.label} onClick={menu.onClick} key={index} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default UserMenu;
