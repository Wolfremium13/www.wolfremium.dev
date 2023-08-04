type NavLinksProps = {
  isOpen: boolean;
};

const NavLinks: React.FC<NavLinksProps> = ({ isOpen }) => {
  const navLinks = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Blog", path: "/blog" },
    { title: "Contact", path: "/contact" },
  ];
  if (!isOpen) {
    return <></>;
  }

  return (
    <div
      className={`items-center justify-between w-full md:flex md:w-auto md:order-1 flex`}
      data-testid="navbar-link-container"
    >
      <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        {navLinks.map((link, index) => (
          <li key={index}>
            <a
              href={link.path}
              className="block py-2.5 px-1 md:p-2 lg:px-4 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
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
