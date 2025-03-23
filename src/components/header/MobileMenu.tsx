"use client";

import React from 'react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ChevronRight } from 'lucide-react';
import Logo from './Logo';

// Define the navigation data structure (same as in NavMenu.tsx)
const navData = [
  {
    label: 'หมวดหมู่สินค้า',
    link: '/category',
    subMenu: [
      { label: 'สินค้าทั้งหมด', link: '/category/products' },
      { label: 'เสื้อผ้า', link: '/category/top' },
      { label: 'กางเกง กระโปรง', link: '/category/bottom' },
      { label: 'เดรส', link: '/category/dress' },
      { label: 'เซ็ท', link: '/category/sets' },
      { label: 'เสื้อคลุม', link: '/category/outerwear' },
      { label: 'จั๊มสูท', link: '/category/playsuits' },
      { label: 'อุปกรณ์เสริม', link: '/category/accessories' },
      { label: 'กระเป๋า', link: '/category/bag' },
      { label: 'รองเท้า', link: '/category/shoes' },
    ]
  },
  {
    label: 'สินค้ามาใหม่',
    link: '/new-arrival',
    subMenu: []
  },
  {
    label: 'สินค้าขายดี',
    link: '/best-sellers',
    subMenu: [
      { label: 'สินค้าขายดีประจำสัปดาห์', link: '/best-sellers/week' },
      { label: 'สินค้าขายดีประจำปี', link: '/best-sellers/year' },
    ]
  },
  {
    label: 'สินค้าลดราคา',
    link: '/sale',
    subMenu: [
      { label: 'สินค้าลดราคา', link: '/sale' },
    ]
  },
  {
    label: 'แจ้งชำระเงิน',
    link: '/payment',
    subMenu: []
  },
  {
    label: 'เกี่ยวกับเรา',
    link: '/about-us',
    subMenu: []
  },
  {
    label: 'ติดต่อเรา',
    link: '/contact',
    subMenu: []
  },
];

const MobileMenu = () => {
  const [openSubMenus, setOpenSubMenus] = React.useState<number[]>([]);

  const toggleSubMenu = (index: number) => {
    if (openSubMenus.includes(index)) {
      setOpenSubMenus(openSubMenus.filter((item) => item !== index));
    } else {
      setOpenSubMenus([...openSubMenus, index]);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-2">
          <Menu size={24} className="text-icyicy-dark" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] overflow-y-auto">
        <div className="flex justify-center py-4">
          <Logo />
        </div>

        <nav className="mt-6">
          <ul className="space-y-4">
            {navData.map((item, index) => (
              <li key={index} className="border-b border-gray-100">
                <div className="flex justify-between items-center py-2">
                  <Link href={item.link} className="text-icyicy-dark text-base">
                    {item.label}
                  </Link>

                  {item.subMenu.length > 0 && (
                    <button
                      onClick={() => toggleSubMenu(index)}
                      className="p-2"
                    >
                      <ChevronRight
                        size={16}
                        className={`text-gray-500 transition-transform ${
                          openSubMenus.includes(index) ? 'rotate-90' : ''
                        }`}
                      />
                    </button>
                  )}
                </div>

                {item.subMenu.length > 0 && openSubMenus.includes(index) && (
                  <ul className="pl-4 py-2 bg-gray-50">
                    {item.subMenu.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          href={subItem.link}
                          className="block py-2 text-sm text-gray-700"
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
