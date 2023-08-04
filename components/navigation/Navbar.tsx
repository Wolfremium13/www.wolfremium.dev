"use client";
import { useState, useEffect } from "react";
import { ToggleButton } from "./ToggleButton";
import NavLinks from "./NavLinks";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const minimumDesktopWidth = 768;
    const isClient = typeof window !== "undefined";
    if (isClient) {
      setIsMobile(window.innerWidth < minimumDesktopWidth);
    }
    const handleResize = () => {
      const mobile = window.innerWidth < minimumDesktopWidth;
      setIsMobile(mobile);

      if (!mobile) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {isMobile && (
          <div className="flex md:order-2">
            <ToggleButton setIsOpen={setIsOpen} />
          </div>
        )}
        <NavLinks isOpen={isOpen} isMobile={isMobile} />
      </div>
    </nav>
  );
};

export { Navbar };
