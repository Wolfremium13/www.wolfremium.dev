"use client";
import { useState } from "react";
import { ToggleButton } from "./ToggleButton";
import NavLinks from "./NavLinks";
import { Search } from "./Search";

const Navbar: React.FC = () => {
   const [isOpen, setIsOpen] = useState(false);
 
   return (
     <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
       <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
         <div className="flex md:order-2">
           <ToggleButton setIsOpen={setIsOpen} />
         </div>
         <div className="order-first md:order-none">
           <Search isOpen={isOpen} />
         </div>
         <NavLinks isOpen={isOpen} />
       </div>
     </nav>
   );
 };

export { Navbar };
