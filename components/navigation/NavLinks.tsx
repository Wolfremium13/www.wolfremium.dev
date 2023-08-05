type NavLinksProps = {
  isOpen: boolean;
  isMobile: boolean;
};

const NavLinks: React.FC<NavLinksProps> = ({ isOpen, isMobile }) => {
  const navLinks = [
    { title: "Home", path: "/" },
    { title: "About", path: "/#" },
    { title: "Blog", path: "/#" },
    { title: "Contact", path: "/#" },
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
          <li key={index} className="md:min-w-[30%] text-center min-w-full py-1 md:py-0">
            <a
              href={link.path}
              className="block py-1.5 px-1 lg:px-4 text-lightGreen hover:text-gray-300 bg-darkViolet hover:bg-mediumViolet border border-darkGreen hover:border-lightGreen rounded-lg"
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavLinks;

export { NavLinks };
