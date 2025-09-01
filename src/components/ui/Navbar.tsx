'use client';
import Wrapper from './Wrapper';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import Image from 'next/image';
import Button from './button';
import { navMenu } from '@/constant/nav-menu';
import { ChevronDown } from 'lucide-react';
import MobileNav from './MobileNav';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((pre) => !pre);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleSubmenu = (name: string) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  return (
    <header className="bg-background relative">
      <Wrapper className="px-2 py-4 text-white">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-10">
            <Link href="/" className="z-50 relative" onClick={closeMobileMenu}>
              <Image
                src="/logo.png"
                alt="Logo"
                width={300}
                height={200}
                quality={100}
                priority
                className="w-36 h-9"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex gap-6 lg:gap-10">
                {navMenu.map((navItem, index) => {
                  const hasSubmenu =
                    navItem?.submenu && navItem?.submenu?.length > 0;

                  const isOpen = openMenu === navItem.name;

                  return (
                    <li
                      key={index}
                      className="relative flex items-center gap-2 cursor-pointer"
                      onClick={() => hasSubmenu && toggleSubmenu(navItem.name)}
                    >
                      <Link
                        href={navItem.href}
                        className="font-semibold text-base leading-6"
                      >
                        {navItem.name}
                      </Link>
                      {hasSubmenu && (
                        <ChevronDown
                          size={18}
                          strokeWidth={3}
                          className={`transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      )}

                      {/* Submenu */}
                      <AnimatePresence>
                        {isOpen && hasSubmenu && (
                          <motion.ul
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 top-full mt-4 w-40 bg-white text-black rounded-md shadow-lg p-2 space-y-2 z-50"
                          >
                            {navItem.submenu.map((sub, i) => (
                              <li key={i}>
                                <Link
                                  href={sub.href}
                                  className="block px-3 py-1 hover:bg-gray-100 rounded"
                                  onClick={() => toggleSubmenu('')}
                                >
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Desktop Contact Button */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" className="text-white">
              <Link href="/">Log in</Link>
            </Button>
            <Button className="bg-[#7F56D9]">
              <Link href="/">Sign up</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden flex flex-col cursor-pointer justify-center items-center w-8 h-8 z-50 relative"
            onClick={toggleMobileMenu}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="w-6 h-0.5 bg-[#ffffff] rounded-full"
              animate={{
                rotate: isMobileMenuOpen ? 45 : 0,
                y: isMobileMenuOpen ? 6 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-[#ffffff] rounded-full mt-1.5"
              animate={{
                opacity: isMobileMenuOpen ? 0 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="w-6 h-0.5 bg-[#ffffff] rounded-full mt-1.5"
              animate={{
                rotate: isMobileMenuOpen ? -45 : 0,
                y: isMobileMenuOpen ? -6 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>

        <MobileNav
          isMobileMenuOpen={isMobileMenuOpen}
          closeMobileMenu={closeMobileMenu}
        />
      </Wrapper>
    </header>
  );
};

export default Navbar;
