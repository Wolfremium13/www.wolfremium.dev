type NavLinksProps = {
  isOpen: boolean;
  isMobile: boolean;
};

const NavLinks: React.FC<NavLinksProps> = ({ isOpen, isMobile }) => {
  const navLinks = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Blog", path: "/blog" },
    { title: "Contact", path: "/contact" },
  ];

  if (isMobile && !isOpen) {
    return <></>;
  }

  return (
    <div
      className="items-center justify-between w-full md:w-auto flex"
      data-testid="navbar-link-container"
    >
      <ul className="flex flex-col p-4 md:p-0 mt-4 md:mt-0 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:border-0 md:bg-white">
        {navLinks.map((link, index) => (
          <li key={index}>
            <a
              href={link.path}
              className="block py-2.5 px-1 md:p-2 lg:px-4 hover:text-gray-900"
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
