'use client';
import Wrapper from './Wrapper';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import Image from 'next/image';
import Button from './button';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
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
                {/* <li>
                  <Link
                    href="/about"
                    className="font-semibold text-[#8d493a] hover:text-[#6d3a2a] transition-colors duration-300 text-sm lg:text-base"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects"
                    className="font-semibold text-[#8d493a] hover:text-[#6d3a2a] transition-colors duration-300 text-sm lg:text-base"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/news"
                    className="font-semibold text-[#8d493a] hover:text-[#6d3a2a] transition-colors duration-300 text-sm lg:text-base"
                  >
                    News
                  </Link>
                </li> */}
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

        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={closeMobileMenu}
              />

              {/* Mobile Menu */}
              <motion.div
                className="absolute top-full left-2 right-2 mt-1 bg-[#ffffff] rounded-lg shadow-xl z-50 md:hidden overflow-hidden"
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <nav className="py-4">
                  <ul className="space-y-1">
                    <li>
                      <Link
                        href="/about"
                        className="block px-6 py-3 font-semibold text-[#8d493a] hover:bg-[#8d493a]/10 transition-colors duration-300 text-base"
                        onClick={closeMobileMenu}
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/projects"
                        className="block px-6 py-3 font-semibold text-[#8d493a] hover:bg-[#8d493a]/10 transition-colors duration-300 text-base"
                        onClick={closeMobileMenu}
                      >
                        Projects
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/news"
                        className="block px-6 py-3 font-semibold text-[#8d493a] hover:bg-[#8d493a]/10 transition-colors duration-300 text-base"
                        onClick={closeMobileMenu}
                      >
                        News
                      </Link>
                    </li>
                  </ul>

                  {/* Mobile Contact Button */}
                  <div className="px-6 pt-4 pb-2">
                    <Link
                      href="/contactus"
                      className="block w-full text-center bg-[#8d493a] hover:bg-[#6d3a2a] text-white px-6 py-3 rounded-md font-semibold transition-all duration-300 text-base"
                      onClick={closeMobileMenu}
                    >
                      Contact us
                    </Link>
                  </div>
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </Wrapper>
    </header>
  );
};

export default Navbar;
