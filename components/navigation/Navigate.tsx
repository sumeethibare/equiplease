"use client";
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { HomeIcon } from '@heroicons/react/24/outline';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

interface NavItem {
  href: string;
  label: string;
  icon: JSX.Element;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.4 },
  }),
};

const Navigate: React.FC = () => {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { href: '/', label: 'Home', icon: <HomeIcon className="w-5 h-5" /> },
    { href: '/store', label: 'Store', icon: <ShoppingBagIcon className="w-5 h-5" /> },
  ];

  const isActive = (href: string): string => (pathname === href ? 'active' : '');

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden lg:flex justify-center fixed bottom-0 left-0 right-0 py-4 z-[999]">
        <div className="bg-pink-200 rounded-xl p-2 space-x-2 flex">
          {navItems.map(({ href, icon, label }, index) => (
            <motion.div
              key={href}
              className="relative group"
              variants={itemVariants}
              custom={index}
              initial="hidden"
              animate="visible"
            >
              <Link href={href} aria-label={label} className={`navigate-btn ${isActive(href)}`}>
                {icon}
              </Link>
              <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 text-sm text-white bg-black rounded px-2 py-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="btm-nav lg:hidden fixed bottom-0 left-0 right-0 bg-zinc-50 p-0.5 flex justify-around items-center z-[9999]">
        {navItems.map(({ href, icon, label }, index) => (
          <Link
            key={href}
            href={href}
            aria-label={label}
            className={`flex flex-col items-center space-y-1 ${isActive(href)}`}
          >
            {icon}
            <span className="text-xs">{label}</span>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Navigate;
