import { navMenu } from '@/constant/nav-menu';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import Button from './button';
import { useState } from 'react';

interface MobileNavProps {
  isMobileMenuOpen: boolean;
  closeMobileMenu: () => void;
}

const MobileNav = ({ isMobileMenuOpen, closeMobileMenu }: MobileNavProps) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleSubmenu = (name: string) => {
    setOpenMenu(openMenu === name ? null : name);
  };

  return (
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
            className="absolute top-full left-2 right-2 mt-1 bg-white rounded-lg shadow-xl z-50 md:hidden overflow-hidden"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <nav className="py-4">
              <ul className="space-y-1">
                {navMenu.map((navItem, index) => {
                  const hasSubmenu =
                    navItem?.submenu && navItem?.submenu?.length > 0;
                  const isOpen = openMenu === navItem.name;

                  return (
                    <li key={index}>
                      <div
                        className="flex items-center justify-between px-6 py-3 cursor-pointer"
                        onClick={() =>
                          hasSubmenu
                            ? toggleSubmenu(navItem.name)
                            : closeMobileMenu()
                        }
                      >
                        <Link
                          href={navItem.href}
                          className="font-semibold text-background text-base flex-1"
                        >
                          {navItem.name}
                        </Link>
                        {hasSubmenu && (
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown
                              size={18}
                              strokeWidth={3}
                              color="#7F56D9"
                            />
                          </motion.div>
                        )}
                      </div>

                      {/* Submenu with smooth expand */}
                      <AnimatePresence>
                        {isOpen && hasSubmenu && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden pl-10 pr-6 space-y-2"
                          >
                            {navItem.submenu.map((sub, i) => (
                              <li key={i}>
                                <Link
                                  href={sub.href}
                                  className="block py-2 text-sm text-gray-700 hover:text-[#7F56D9]"
                                  onClick={closeMobileMenu}
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

              {/* Mobile Contact Buttons */}
              <div className="px-6 pt-4 pb-2 flex flex-col w-full gap-3">
                <Button className="bg-[#7F56D9]">
                  <Link href="/">Log in</Link>
                </Button>
                <Button className="bg-[#7F56D9]">
                  <Link href="/">Sign up</Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
