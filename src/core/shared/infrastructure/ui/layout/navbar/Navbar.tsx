"use client";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import NavLinks from "@/core/shared/infrastructure/ui/layout/navbar/NavLinks";
import ToggleMenuButton from "@/core/shared/infrastructure/ui/layout/navbar/ToggleMenuButton";
import GitHubCorner from "@/core/shared/infrastructure/ui/layout/navbar/GithubCorner";

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
    <nav className="bg-gray-900/90 backdrop-blur-sm  hover:bg-gray-900/95 fixed w-full z-20 top-0 left-0 border-b-2 border-lightGreen/40 hover:border-lightGreen/80">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {isMobile && <ToggleMenuButton setIsOpen={setIsOpen} isOpen={isOpen}/>}
        <NavLinks isOpen={isOpen} isMobile={isMobile} />
        {!isMobile && <GitHubCorner />}
      </div>
    </nav>
  );
};

export default Navbar;
