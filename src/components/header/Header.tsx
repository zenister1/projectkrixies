"use client";

import React from 'react';
import Link from 'next/link';
import { SiLine, SiTelegram } from 'react-icons/si'; // ✅ ใช้ icons ใหม่
import { Menu, ShoppingCart, User, Heart } from 'lucide-react';
import Logo from './Logo';
import NavMenu from './NavMenu';
import { Button } from '@/components/ui/button';
import MobileMenu from './MobileMenu';
import SearchBar from '@/components/search/SearchBar';
import { useWishlist } from '@/lib/wishlist-context';

const Header = () => {
  const { wishlist } = useWishlist();

  return (
    <header className="w-full">
      <div className="bg-icyicy-beige text-icyicy-dark text-xs py-2 px-4 text-center">
        <span className="font-medium">ซื้อครบ 2,000 บาท ลด 5% | ซื้อครบ 3,000 บาท ลด 10%</span>
      </div>

      <div className="bg-white py-2 px-4 flex justify-between items-center border-b text-sm">
        <div className="flex items-center space-x-4">
          <Link href="/login" className="hover:underline text-gray-700">
            <span className="flex items-center gap-1">
              <User size={14} />
              เข้าสู่ระบบ
            </span>
          </Link>
          <Link href="/register" className="hover:underline text-gray-700">
            <span>สมัครสมาชิก</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {/* ✅ LINE */}
            <Link href="https://lin.ee/35BFvnQ" target="_blank" aria-label="LINE">
              <SiLine size={16} className="text-gray-600 hover:text-gray-900" />
            </Link>
            {/* ✅ Telegram */}
            <Link href="https://t.me/krixieshop" target="_blank" aria-label="Telegram">
              <SiTelegram size={16} className="text-gray-600 hover:text-gray-900" />
            </Link>
          </div>
          <div className="relative group">
            <button className="flex items-center gap-1">
              TH <span className="text-[10px]">▼</span>
            </button>
            <div className="absolute hidden group-hover:block right-0 bg-white shadow-md z-10 w-20 mt-1">
              <Link href="#" className="block px-4 py-2 hover:bg-gray-100">
                EN
              </Link>
            </div>
          </div>
          <Link href="/checkout" className="relative">
            <ShoppingCart size={18} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
              2
            </span>
          </Link>
        </div>
      </div>

      <div className="bg-white py-4 px-6 flex justify-between items-center">
        <div className="md:hidden">
          <MobileMenu />
        </div>
        <div className="flex-1 flex justify-start md:justify-center">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
        </div>
        <div className="hidden md:block flex-1 mx-auto">
          <NavMenu />
        </div>
        <div className="flex items-center space-x-2">
          <SearchBar />

          <Link href="/wishlist">
            <Button variant="ghost" size="icon" className="relative">
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                  {wishlist.length}
                </span>
              )}
            </Button>
          </Link>

          <Link href="/checkout" className="md:block hidden">
            <Button variant="ghost" size="icon">
              <ShoppingCart size={20} />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

