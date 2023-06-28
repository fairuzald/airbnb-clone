"use client";
import React, { useCallback, useState } from "react";
import HamburgerIcon from "../icons/HamburgerIcon";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

// Define the props for the UserMenu component
interface UserMenuProps {
  currentUser?: SafeUser | null;
}

// UserMenu component definition
const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  // Initialize the register and login modals
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  // Set up state for menu toggle
  const [isOpen, setIsOpen] = useState(false);

  // Router to navigate on specific page
  const router = useRouter();
  // Define the toggleMenu function to toggle the menu state
  const toggleMenu = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  // Define the menu items based on whether there is a currentUser or not
  const dataMenu = !currentUser
    ? [
        { label: "Sign in", onClick: registerModal.onOpen },
        { label: "Log in", onClick: loginModal.onOpen },
      ]
    : [
        { label: "My Trips", onClick: () => router.push("/trips") },
        { label: "My Favorites", onClick: () => router.push("/favorites") },
        {
          label: "My Reservations",
          onClick: () => router.push("/reservations"),
        },
        { label: "My Properties", onClick: () => router.push("/properties") },
        { label: "Airbnb My Home", onClick: () => {} },
        {
          label: "Logout",
          onClick: () => {
            signOut();
            toast.success("Logged out");
          },
        },
      ];

  const onOpen = useCallback(() => {
    if (!currentUser) {
      return registerModal.onOpen();
    }
    return rentModal.onOpen();
  }, [currentUser, rentModal, registerModal]);

  // Render the UserMenu component
  return (
    <>
      <div className="relative flex gap-4 bg-transparent w-auto items-center justify-center">
        <button onClick={onOpen}>
          <p className="text-black font-semibold">Ainbnb your home</p>
        </button>
        <button
          onClick={toggleMenu}
          className="flex items-center justify-center border-bnb-border border shadow-sm hover:shadow-md transition rounded-full gap-3 px-[14px] py-1.5"
        >
          <HamburgerIcon style="w-4 h-4 fill-bnb-soft-gray" />

          <Avatar image={currentUser?.image} />
        </button>
        {isOpen && (
          <div className="flex flex-col py-2 absolute top-[60px] w-[40vw] md:w-[200px] shadow-md bg-white rounded-lg right-2">
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
