"use client";
import { useState } from "react";
import { GiLetterBomb } from "react-icons/gi";
import { VscGithub } from "react-icons/vsc";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";

const Footer = () => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleEmailClick = () => {
    navigator.clipboard.writeText("wolfremiuminformatica@gmail.com");
    setTooltipVisible(true);
    setTimeout(() => setTooltipVisible(false), 1000);
  };

  return (
    <footer className="bg-gray-900/50 text-lightGreen  p-4 border-t-2 border-darkGreen hover:border-lightGreen">
      <div className="max-w-screen-xl container mx-auto flex justify-between items-center md:flex-row flex-col">
        <div className="text-lg font-bold text-lightGreen">
          <p role="author">Kevin Hierro Carrasco - {new Date().getFullYear()}</p>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <button onClick={handleEmailClick} className="relative hover:text-lightViolet" title="Gmail">
            <GiLetterBomb size={30} />
            {tooltipVisible && (
              <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-900/90 text-white text-xs px-2 py-1 rounded shadow-lg">
                Copiado al portapapeles
              </span>
            )}
          </button>

          <a
            href="https://github.com/Wolfremium13"
            className="hover:text-lightViolet"
            title={"Github"}
          >
            <VscGithub size={27} />
          </a>
          <a
            href="https://github.com/Wolfremium13"
            className="hover:text-lightViolet"
            title={"Linkedin"}
          >
            <FaLinkedin size={27} />
          </a>
          <a
            href="https://github.com/Wolfremium13"
            className="hover:text-lightViolet"
            title={"Linkedin"}
          >
            <IoLogoYoutube size={27} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
