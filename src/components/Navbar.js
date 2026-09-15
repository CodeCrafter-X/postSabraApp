'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { FiChevronDown, FiGrid, FiLogOut, FiUser } from 'react-icons/fi';

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
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#07543f] text-white shadow-[0_4px_20px_rgba(7,84,63,0.12)]">
      <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-6 px-5 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-3 cursor-pointer">
          <div className="relative h-11 w-11 rounded-full bg-white/95 p-1">
            <Image
              src="/Logo-SUSL.png"
              alt="SUSL Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="hidden text-xl font-bold tracking-[-0.02em] sm:inline-block">SUSL<span className="text-[#b9e4c9]">~</span>Notice</span>
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-5 text-sm font-semibold tracking-wide sm:gap-8">
          <Link
            href="/notices"
            className={`rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-[#c9efd7] ${pathname === '/notices' ? 'bg-white/10 text-[#c9efd7]' : ''}`}
          >
            Notices
          </Link>

          {loading ? (
            <span>Loading...</span>
          ) : user ? (
            <div className="flex items-center gap-3 sm:gap-5">
              {user.role === 'poster' && (
                <Link
                  href="/post-notice"
                  className="hidden rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-[#c9efd7] sm:inline-flex"
                >
                  Add Notice
                </Link>
              )}
              {user.role === 'admin' && (
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-2 rounded-full bg-[#c9efd7] px-3 py-2 text-[#07543f] transition hover:bg-white"
                >
                  Admin
                </Link>
              )}

              {/* Dropdown */}
              <div className="relative">
                <button
                  ref={buttonRef}
                  className="flex items-center gap-2 rounded-full border border-white/20 px-3 py-2 transition hover:border-white/50 hover:bg-white/10"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  onMouseEnter={() => setIsDropdownOpen(true)}
                >
                  <span>{user.username}</span>
                  <FiChevronDown className="h-4 w-4" />
                </button>

                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-3 w-48 rounded-xl border border-[#dfe7e1] bg-white py-2 text-sm text-[#17231f] shadow-xl"
                    onMouseEnter={() => setIsDropdownOpen(true)}
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-2.5 transition hover:bg-[#e8f4ee]"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FiUser /> Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsDropdownOpen(false);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition hover:bg-[#e8f4ee]"
                    >
                      <FiLogOut /> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-[#c9efd7]"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-full border border-white/30 px-4 py-2 transition hover:border-white hover:bg-white/10"
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