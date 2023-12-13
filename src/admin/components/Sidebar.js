import React, { useState } from 'react';
import classNames from 'classnames';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { DASHBOARD_SIDEBAR_LINKS, DASHBOARD_SIDEBAR_BOTTOM_LINKS } from '../lib';
import { HiOutlineChevronRight, HiOutlineChevronDown } from 'react-icons/hi';
import { successNotify } from '../../utils/Notifications';

const linkClass =
	'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

function SidebarLink({ link, isOpen, toggleSubMenu }) {
    const { pathname } = useLocation();

    const hasSubLinks = link.subLinks && link.subLinks.length > 0;

    const handleClick = (e) => {
        if (link.action) {
            e.preventDefault();
            link.action(); // Wywołanie funkcji przekazanej w linku
            return;
        }

        if (hasSubLinks) {
            e.preventDefault(); // Zapobieganie standardowemu zachowaniu linku
            toggleSubMenu(link.key);
        }
        // Dla linków bez podlinków nie robimy nic, pozwalamy na standardowe zachowanie linku
    };

    const linkStyle = classNames(
        pathname === link.path ? 'bg-neutral-700 text-white' : 'text-neutral-400',
        "text-white",
        linkClass,
        "flex justify-between items-center"
    );

    return (
        <div>
            <Link
                to={link.path}
                onClick={handleClick}
                className={linkStyle}
            >
                <span className="flex items-center gap-2">
                    <span className="text-xl">{link.icon}</span>
                    {link.label}
                </span>
                {hasSubLinks && (isOpen[link.key] ? <HiOutlineChevronDown /> : <HiOutlineChevronRight />)}
            </Link>
            {hasSubLinks && isOpen[link.key] && (
                <ul className="pl-4">
                    {link.subLinks.map((subLink) => (
                        <li key={subLink.label} className="mt-2">
                            <Link to={subLink.path} className={linkStyle}>
                                {subLink.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}



function Sidebar() {
    const [openSubMenus, setOpenSubMenus] = useState({});
    const navigate = useNavigate();

     // Funkcja wylogowania
     const logout = () => {
        localStorage.removeItem('token');
        successNotify('Poprawnie wylogowano!');
        navigate('/login');
    };

    const toggleSubMenu = (key) => {
        setOpenSubMenus(prevOpenSubMenus => ({
            ...prevOpenSubMenus,
            [key]: !prevOpenSubMenus[key]
        }));
    };

    // Aktualizacja linku wylogowania
    DASHBOARD_SIDEBAR_BOTTOM_LINKS.find(link => link.key === 'logout').action = logout;

    return(
        <div className='bg-neutral-900 w-60 p-3 flex flex-col text-white'>
            <div className='flex items-center gap-2 px-1 py-3'>
                {/* <img src={logo} className="w-10" alt="Logo"/> */}
                <span className="text-xl font-semibold text-white">Library Management</span>
            </div>
            <div className="py-8 flex flex-1 flex-col gap-0.5">
				{DASHBOARD_SIDEBAR_LINKS.map((link) => (
					 <SidebarLink key={link.key} link={link} isOpen={openSubMenus} toggleSubMenu={toggleSubMenu} />
				    ))}
			</div>
            <div>
                {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
                        <SidebarLink key={link.key} link={link} />
                    ))}
            </div>
        </div>
    );
}

export default Sidebar;