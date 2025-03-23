"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

// Define the navigation data structure
const navData = [
  {
    label: 'หมวดหมู่สินค้า',
    link: '/category/products',
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

const NavMenu = () => {
  return (
    <nav className="flex justify-center">
      <ul className="flex space-x-8 text-sm">
        {navData.map((item, index) => (
          <li key={index} className="relative group">
            <Link
              href={item.link}
              className="text-icyicy-dark hover:text-black py-2 flex items-center"
            >
              {item.label}
              {item.subMenu.length > 0 && (
                <ChevronDown size={14} className="ml-1 text-gray-500" />
              )}
            </Link>

            {item.subMenu.length > 0 && (
              <div className="absolute hidden group-hover:block bg-white shadow-lg z-50 min-w-[200px] left-0 mt-0 py-2">
                <ul>
                  {item.subMenu.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <Link
                        href={subItem.link}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        {subItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavMenu;
