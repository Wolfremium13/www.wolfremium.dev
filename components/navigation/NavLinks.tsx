import {
  GiOilySpiral,
  GiDwarfHelmet,
  GiScrollQuill,
  GiLoveLetter,
} from "react-icons/gi";

type NavLinksProps = {
  isOpen: boolean;
  isMobile: boolean;
};

const NavLinks: React.FC<NavLinksProps> = ({ isOpen, isMobile }) => {
  const navLinks = [
    { title: "Home", path: "/", icon: <GiOilySpiral size={30} /> },
    //{ title: "Acerca", path: "/#", icon: <GiDwarfHelmet size={30} /> },
    { title: "Blog", path: "/blog", icon: <GiScrollQuill size={30} /> },
    { title: "Contacto", path: "/contact", icon: <GiLoveLetter size={30} /> },
  ];

  if (isMobile && !isOpen) {
    return <></>;
  }

  return (
    <div
      className="items-center justify-between w-full md:w-auto flex py-4 md:py-0"
      data-testid="navbar-link-container"
    >
      <ul className="flex flex-col md:flex-row content-center font-medium md:space-x-8 w-full">
        {navLinks.map((link, index) => (
          <li
            key={index}
            className="md:min-w-[30%] text-center min-w-full py-1 md:py-0"
          >
            <a
              href={link.path}
              className="py-1.5 px-1.5 flex justify-center space-x-2 items-center lg:px-4 text-lightGreen hover:text-gray-300 bg-darkViolet hover:bg-gradient-to-tr hover:from-darkGreen hover:to-darkViolet  border border-darkGreen hover:border-lightGreen rounded-lg"
              title={link.title}
            >
              <>
                {link.icon}
                <span>{link.title}</span>
              </>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavLinks;

export { NavLinks };
