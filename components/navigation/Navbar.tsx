"use client";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { ToggleButton } from "./ToggleButton";
import NavLinks from "./NavLinks";

const Navbar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const minimumDesktopWidth = 768;
      const mobile = window.innerWidth < minimumDesktopWidth;
      setIsMobile(mobile);

      if (!mobile) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <NavbarLogic isMobile={isMobile} isOpen={isOpen} setIsOpen={setIsOpen} />
  );
};

type NavbarLogicProps = {
  isMobile: boolean;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const NavbarLogic: React.FC<NavbarLogicProps> = ({
  isMobile,
  isOpen,
  setIsOpen,
}) => {
  return (
    <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {isMobile && <ToggleButton setIsOpen={setIsOpen} />}
        <NavLinks isOpen={isOpen} isMobile={isMobile} />
      </div>
    </nav>
  );
};

export { Navbar, NavbarLogic };
