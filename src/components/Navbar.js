'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/profile');
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-green-600 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 cursor-pointer">
          <div className="relative h-12 w-12">
            <Image
              src="/Logo-SUSL.png"
              alt="SUSL Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-2xl font-bold tracking-wide hidden sm:inline-block">
            SUSL~Notice
          </span>
        </Link>

        {/* Menu */}
        <div className="flex items-center space-x-8 text-lg font-medium tracking-wide">
          <Link
            href="/notices"
            className={`relative hover:text-green-200 transition after:block after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300 hover:after:w-full ${
              pathname === '/notices' ? 'after:w-full font-semibold' : ''
            } cursor-pointer`}
          >
            Notices
          </Link>

          {loading ? (
            <span>Loading...</span>
          ) : user ? (
            <div className="flex items-center space-x-8">
              {user.role === 'poster' && (
                <Link
                  href="/post-notice"
                  className="hover:text-green-200 transition relative after:block after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
                >
                  Add Notice
                </Link>
              )}
              {user.role === 'admin' && (
                <Link
                  href="/admin"
                  className="hover:text-green-200 transition relative after:block after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
                >
                  Admin
                </Link>
              )}

              {/* Dropdown */}
              <div className="relative">
                <button
                  ref={buttonRef}
                  className="flex items-center space-x-1 focus:outline-none hover:text-green-200"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  onMouseEnter={() => setIsDropdownOpen(true)}
                >
                  <span>{user.username}</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-40 bg-white text-gray-900 rounded-lg shadow-lg py-2 border border-gray-200 z-50"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <Link
                      href="/profile"
                      className="block px-4 py-2 hover:bg-green-100 transition text-sm cursor-pointer"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-green-100 transition text-sm cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className={`relative hover:text-green-200 transition after:block after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300 hover:after:w-full ${
                  pathname === '/login' ? 'after:w-full font-semibold' : ''
                } cursor-pointer`}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={`relative hover:text-green-200 transition after:block after:h-[2px] after:bg-white after:w-0 after:transition-all after:duration-300 hover:after:w-full ${
                  pathname === '/register' ? 'after:w-full font-semibold' : ''
                } cursor-pointer`}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}