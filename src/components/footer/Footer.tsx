"use client";

import { SiLine } from "react-icons/si";
import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-icyicy-dark">เกี่ยวกับเรา</h3>
            <p className="text-sm text-gray-600 mb-4">
              Krixies Shop - แบรนด์เสื้อผ้าผู้หญิง งานคุณภาพเกรดพรีเมี่ยม สำหรับใส่ทำงาน
              ออกงานเลี้ยง งานแต่ง เรียบหรู ดูแพง เน้นลายคลาสสิค
              ลายดอก ผ้าชีฟอง มีดีเทล เปิดมานาน 12 ปี การันตีคุณภาพ
            </p>
            <div className="flex space-x-3">
  		<Link href="https://lin.ee/35BFvmQ" target="_blank" className="text-gray-600 hover:text-black">
    		<SiLine size={20} />
 		 </Link>
  		<Link href="https://t.me/yourusername" target="_blank" className="text-gray-600 hover:text-black">
  		  <SiTelegram size={20} />
 		</Link>
		</div>
          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-icyicy-dark">เมนูช่วยเหลือ</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about-us" className="text-sm text-gray-600 hover:text-black">
                  เกี่ยวกับเรา
                </Link>
              </li>
              <li>
                <Link href="/how-to-order" className="text-sm text-gray-600 hover:text-black">
                  วิธีการสั่งซื้อ
                </Link>
              </li>
              <li>
                <Link href="/payment-methods" className="text-sm text-gray-600 hover:text-black">
                  วิธีการชำระเงิน
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-sm text-gray-600 hover:text-black">
                  การจัดส่งสินค้า
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="text-sm text-gray-600 hover:text-black">
                  เงื่อนไขการเปลี่ยนคืนสินค้า
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-icyicy-dark">หมวดหมู่สินค้า</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/dress" className="text-sm text-gray-600 hover:text-black">
                  เดรส
                </Link>
              </li>
              <li>
                <Link href="/category/top" className="text-sm text-gray-600 hover:text-black">
                  เสื้อผ้า
                </Link>
              </li>
              <li>
                <Link href="/category/outerwear" className="text-sm text-gray-600 hover:text-black">
                  เสื้อคลุม
                </Link>
              </li>
              <li>
                <Link href="/category/bottom" className="text-sm text-gray-600 hover:text-black">
                  กางเกง กระโปรง
                </Link>
              </li>
              <li>
                <Link href="/category/sets" className="text-sm text-gray-600 hover:text-black">
                  เซ็ท
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-icyicy-dark">ติดต่อเรา</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="text-gray-600 mr-2 mt-0.5" />
                <span className="text-sm text-gray-600">
                  Krixies Shop <br />
                  เลขที่ 1234 ถนนสุขุมวิท <br />
                  กรุงเทพมหานคร 10110
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-gray-600 mr-2" />
                <span className="text-sm text-gray-600">02-123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-gray-600 mr-2" />
                <span className="text-sm text-gray-600">contact@icyicyshop.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-200" />

      <div className="container mx-auto px-4 py-4">
        <div className="text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Krixies Shop. สงวนลิขสิทธิ์.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
