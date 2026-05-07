import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Zap, Layers, CreditCard, UserCheck, Shield } from 'lucide-react';

interface NavbarProps {
  onOpenConnect?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenConnect }) => {
  const navLinks = [
    { name: 'Home', path: '/', icon: <Home className="w-4 h-4" /> },
    { name: 'Features', path: '/services', icon: <Zap className="w-4 h-4" /> },
    { name: 'Templates', path: '/portfolio', icon: <Layers className="w-4 h-4" /> },
    { name: 'Pricing', path: '/pricing', icon: <CreditCard className="w-4 h-4" /> },
    { name: 'Hire Agent', path: '/hire-agent', icon: <UserCheck className="w-4 h-4" /> },
  ];

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-fit px-4">
      <nav className="pill-nav p-1.5 shadow-2xl flex items-center gap-1 bg-white/90 backdrop-blur-xl border border-neutral-100 rounded-full">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2.5 rounded-full transition-all whitespace-nowrap ${
                isActive 
                  ? 'bg-brand-black text-white shadow-lg' 
                  : 'text-neutral-500 hover:text-brand-black hover:bg-neutral-50'
              }`
            }
          >
            <span className={({ isActive }: any) => isActive ? 'text-brand-accent' : ''}>{link.icon}</span>
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest">{link.name}</span>
          </NavLink>
        ))}
        <div className="w-[1px] h-4 bg-neutral-200 mx-2 hidden md:block" />
        <button 
          onClick={onOpenConnect}
          className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-brand-accent text-brand-black hover:bg-brand-black hover:text-white rounded-full transition-all font-mono text-[11px] font-bold uppercase tracking-widest"
        >
          <Shield className="w-4 h-4" /> Access
        </button>
      </nav>
    </header>
  );
};

export default Navbar;

