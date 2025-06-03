import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

// 假设有一个useAuth钩子可以获取用户信息
// 实际项目中请替换为你的登录状态管理逻辑
const useAuth = () => {
  // 示例：未登录返回null，已登录返回用户对象
  return {
    user: {
      name: 'Demo User',
      avatar: '/images/avatar-demo.jpg', // 你可以替换为真实头像
    },
    // user: null,
  };
};

const navs = [
  { name: 'Home', path: '/' },
  { name: 'DesignRoom', path: '/design-room' },
  { name: 'TextRoom', path: '/text-room' },
  { name: 'Pricing', path: '/pricing' },
];

const DesignNavbar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-black bg-opacity-50 text-white p-4 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="/images/图标.jpg" alt="Logo" className="h-8 w-8 mr-2 animate-spin-slow" />
          <a href="/" className="text-2xl font-bold animate-pulse bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
            Ai Interior Design
          </a>
        </div>
        {/* 桌面端菜单 */}
        <div className="hidden md:flex items-center space-x-6">
          {navs.map(nav => (
            <NavLink
              key={nav.name}
              to={nav.path}
              className={({ isActive }) =>
                `font-medium transition-colors duration-200 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent hover:from-blue-500 hover:to-cyan-400 hover:to-teal-500 ${
                  isActive || location.pathname === nav.path ? 'underline underline-offset-4' : ''
                }`
              }
              end={nav.path === '/'}
            >
              {nav.name}
            </NavLink>
          ))}
          {user ? (
            <div className="relative ml-4">
              <img
                src={user.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full border-2 border-pink-400 shadow cursor-pointer"
                onClick={() => setDropdownOpen(v => !v)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-lg shadow-lg z-50">
                  <button
                    className="w-full text-left px-4 py-3 hover:bg-pink-100 rounded-t-lg"
                    onClick={() => { setDropdownOpen(false); navigate('/user-profile'); }}
                  >
                    View Profile
                  </button>
                  <button
                    className="w-full text-left px-4 py-3 hover:bg-pink-100 rounded-b-lg"
                    onClick={() => { setDropdownOpen(false); /* 这里可加登出逻辑 */ }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <a href="/login" className="bg-gradient-to-r from-blue-200 via-blue-300 to-purple-200 hover:from-blue-300 hover:to-purple-300 text-white px-4 py-2 rounded-lg font-semibold shadow ml-4">Login with Google</a>
          )}
        </div>
        {/* 移动端汉堡按钮 */}
        <button className="md:hidden p-2" onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <Menu className="w-7 h-7" />
        </button>
      </div>
      {/* 移动端抽屉菜单 */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-gray-800">
            <div className="flex items-center">
              <img src="/images/图标.jpg" alt="Logo" className="h-8 w-8 mr-2 animate-spin-slow" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">Ai Interior Design</span>
            </div>
            <button className="p-2" onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <X className="w-7 h-7" />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center flex-1 space-y-8">
            {navs.map(nav => (
              <NavLink
                key={nav.name}
                to={nav.path}
                className={({ isActive }) =>
                  `text-2xl font-semibold px-8 py-4 rounded-lg w-60 text-center transition-colors duration-200 ${
                    isActive || location.pathname === nav.path ? 'bg-pink-500 text-white' : 'bg-gray-800 text-gray-200 hover:bg-pink-600 hover:text-white'
                  }`
                }
                end={nav.path === '/'}
                onClick={() => setMobileOpen(false)}
              >
                {nav.name}
              </NavLink>
            ))}
            {user ? (
              <div className="relative ml-4">
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-16 h-16 rounded-full border-2 border-pink-400 shadow cursor-pointer"
                  onClick={() => setDropdownOpen(v => !v)}
                />
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-lg shadow-lg z-50">
                    <button
                      className="w-full text-left px-4 py-3 hover:bg-pink-100 rounded-t-lg"
                      onClick={() => { setDropdownOpen(false); navigate('/user-profile'); }}
                    >
                      View Profile
                    </button>
                    <button
                      className="w-full text-left px-4 py-3 hover:bg-pink-100 rounded-b-lg"
                      onClick={() => { setDropdownOpen(false); /* 这里可加登出逻辑 */ }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <a href="/login" className="bg-gradient-to-r from-blue-200 via-blue-300 to-purple-200 hover:from-blue-300 hover:to-purple-300 text-white px-8 py-4 rounded-lg font-semibold shadow text-xl mt-6">Login with Google</a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default DesignNavbar; 