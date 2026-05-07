import React from 'react';
import { NavLink } from 'react-router-dom';

interface NavbarProps {
  onOpenConnect?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenConnect }) => {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/services' },
    { name: 'Templates', path: '/portfolio' },
    { name: 'Get Access', path: '/pricing' },
  ];

  return (
    <header className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-fit">
      <nav className="pill-nav px-2 py-1.5 shadow-xl flex items-center gap-1">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'nav-item-active' : 'text-neutral-500 hover:text-brand-black'}`
            }
          >
            {link.name}
          </NavLink>
        ))}
        <button 
          onClick={onOpenConnect}
          className="nav-item bg-brand-black text-white hover:bg-brand-accent transition-colors ml-1 px-4"
        >
          Sign In
        </button>
      </nav>
    </header>
  );
};

export default Navbar;

