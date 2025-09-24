import {
    GiCastleRuins,
    GiPunchBlast,
    GiScrollQuill,
    GiKey,
    GiAnvilImpact,
    GiDwarfHelmet,
    GiChalkOutlineMurder
} from "react-icons/gi";
import React, {useState, useEffect} from "react";

type NavLinksProps = {
    isOpen: boolean;
    isMobile: boolean;
};

export const NavLinks: React.FC<NavLinksProps> = ({isOpen, isMobile}) => {
    const [showManagementLinks, setShowManagementLinks] = useState(false);
    const publicNavLinks = [
        {title: "Home", path: "/", icon: <GiCastleRuins size={30}/>},
        // {title: "Katas", path: "/#", icon: <GiPunchBlast size={30}/>},
        // {title: "Blog", path: "/blog", icon: <GiScrollQuill size={30}/>},
    ];
    const managementLinks = [
        // {title: "Admin", path: "/admin", icon: <GiDwarfHelmet size={30}/>},
        // {title: "Login", path: "/user/login", icon: <GiKey size={30}/>},
        // {title: "Posts", path: "/admin/blog", icon: <GiAnvilImpact size={30}/>},
        // {title: "Salir", path: "/api/user/sign-out", icon: <GiChalkOutlineMurder size={30}/>}
    ];

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === 'l') {
                event.preventDefault();
                setShowManagementLinks(prev => !prev);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    if (isMobile && !isOpen) {
        return <></>;
    }

    const linksToShow = publicNavLinks;

    return (
        <div
            className="items-center justify-between w-full md:w-auto flex py-4 md:py-0"
            data-testid="navbar-link-container"
        >
            <ul className="flex flex-col md:flex-row content-center font-medium md:space-x-8 w-full">
                {linksToShow.map((link, index) => (
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
