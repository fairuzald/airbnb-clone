"use client";
import React, { useCallback, useState } from "react";
import HamburgerIcon from "../icons/HamburgerIcon";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
interface UserMenuProps {
  currentUser?: User | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const dataMenu = !currentUser
    ? [
        { label: "Sign in", onClick: registerModal.onOpen },
        { label: "Log in", onClick: loginModal.onOpen },
      ]
    : [
        { label: "My Trips", onClick: () => {} },
        { label: "My Favorites", onClick: () => {} },
        { label: "My Reservations", onClick: () => {} },
        { label: "My Properties", onClick: () => {} },
        { label: "Airbnb My Home", onClick: () => {} },
        {
          label: "Logout",
          onClick: () => {
            toast.success("Logged out");
            signOut();
          },
        },
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
