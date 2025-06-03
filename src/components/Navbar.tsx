import React from 'react';
import { Sling as Hamburger } from 'hamburger-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const navs = [
  { name: 'Home', path: '/' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Pricing', path: '/pricing' },
];

const user = {
  name: 'Demo User',
  email: 'demo@example.com',
  avatar: '/images/avatar-demo.jpg',
  daysLeft: 12,
};

const Navbar: React.FC = () => {
  const [isOpen, setOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="bg-black bg-opacity-50 text-white p-4 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="/images/图标.jpg" alt="Logo" className="h-8 w-8 mr-2 animate-spin-slow opacity-60 blur-[1.5px] drop-shadow-[0_0_12px_rgba(64,224,208,0.5)]" />
          <a href="/" className="text-2xl font-bold animate-pulse bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">Ai Interior Design</a>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          {navs.map(nav => (
            nav.name === 'Pricing' ? (
              <a
                key={nav.name}
                href="/#pricing-plans"
                className={`font-medium transition-colors duration-200 text-cyan-200 hover:text-cyan-300 ${location.hash === '#pricing-plans' ? 'underline underline-offset-4' : ''}`}
              >
                {nav.name}
              </a>
            ) : (
              <NavLink
                key={nav.name}
                to={nav.path}
                className={({ isActive }) =>
                  `font-medium transition-colors duration-200 text-cyan-200 hover:text-cyan-300 ${
                    isActive || location.pathname === nav.path ? 'underline underline-offset-4' : ''
                  }`
                }
                end={nav.path === '/'}
              >
                {nav.name}
              </NavLink>
            )
          ))}
          <a
            href="/design-room"
            className="bg-gradient-to-r from-blue-200 via-blue-300 to-purple-200 text-purple-500 hover:from-blue-300 hover:to-purple-300 text-orange font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 border-2 border-transparent bg-clip-padding"
          >
            Start Designing &rarr;
          </a>
        </div>
        <div className="md:hidden">
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 items-center">
          {navs.map(nav => (
            nav.name === 'Pricing' ? (
              <a
                key={nav.name}
                href="/#pricing-plans"
                className={`font-medium transition-colors duration-200 text-cyan-200 hover:text-cyan-300 ${location.hash === '#pricing-plans' ? 'underline underline-offset-4' : ''}`}
              >
                {nav.name}
              </a>
            ) : (
              <NavLink
                key={nav.name}
                to={nav.path}
                className={({ isActive }) =>
                  `font-medium transition-colors duration-200 text-cyan-200 hover:text-cyan-300 ${
                    isActive || location.pathname === nav.path ? 'underline underline-offset-4' : ''
                  }`
                }
                end={nav.path === '/'}
              >
                {nav.name}
              </NavLink>
            )
          ))}
          <a
            href="/design-room"
            className="bg-gradient-to-r from-blue-200 via-blue-300 to-purple-200 hover:from-blue-300 hover:to-purple-300 text-orange font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 w-full text-center border-2 border-transparent bg-clip-padding"
          >
            Start Designing &rarr;
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;