import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Experience', path: '/experience' },
    { name: 'Connect', path: '/connect' },
  ];

  return (
    <header className="fixed top-8 left-1/2 -translate-x-1/2 z-[100]">
      <nav className="pill-nav px-2 py-1.5 shadow-lg">
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
      </nav>
    </header>
  );
};

export default Navbar;

