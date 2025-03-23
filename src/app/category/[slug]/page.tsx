import React from 'react';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { sampleProducts } from '@/components/product/ProductGrid';
import CategoryContent from './CategoryContent';

// Category data mapping
const categories = {
  'dress': {
    title: 'เดรส',
    description: 'เดรสสวยสำหรับทุกโอกาส ไม่ว่าจะเป็นชุดทำงาน ชุดออกงาน ชุดลำลอง'
  },
  'top': {
    title: 'เสื้อผ้า',
    description: 'เสื้อผ้าคุณภาพดี ดีไซน์สวย สำหรับสาวทันสมัย'
  },
  'bottom': {
    title: 'กางเกง กระโปรง',
    description: 'กางเกงและกระโปรงหลากหลายสไตล์'
  },
  'sets': {
    title: 'เซ็ท',
    description: 'ชุดเซ็ทสวย ใส่ง่าย ดูดี ในชุดเดียว'
  },
  'outerwear': {
    title: 'เสื้อคลุม',
    description: 'เสื้อคลุมสวย สไตล์หลากหลาย'
  },
  'products': {
    title: 'สินค้าทั้งหมด',
    description: 'สินค้าคุณภาพดี ดีไซน์สวย สำหรับสาวทันสมัย'
  },
  'floral-dress': {
    title: 'เดรสลายดอก',
    description: 'เดรสลายดอกสวยหวาน สำหรับทุกโอกาส'
  },
  'default': {
    title: 'สินค้า',
    description: 'สินค้าคุณภาพดี ดีไซน์สวย'
  }
};

export default function CategoryPage({ params }) {
  // Get category info or use default if not found
  const categoryInfo = categories[params.slug] || categories.default;

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-icyicy-dark">{categoryInfo.title}</h1>
          <p className="text-gray-600 mt-2">{categoryInfo.description}</p>
        </div>

        <CategoryContent slug={params.slug} products={sampleProducts} />
      </main>
      <Footer />
    </>
  );
}
