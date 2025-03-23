"use client";

import React from 'react';
import ProductCard from './ProductCard';

// Define proper interface for products
export interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  imageUrl: string;
  link: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  description?: string;
}

// Sample product data based on what we saw in the Krixies Shop
export const sampleProducts: Product[] = [
  {
    id: '198264',
    name: 'Jn Y Dress DI15501',
    price: 1690,
    imageUrl: 'https://ext.same-assets.com/2516256495/2733599545.jpeg',
    link: '/product/198264/jn-y-dress--di15501',
    isNew: true,
    description: 'เนื้อผ้าดีมากกกก เป็นผ้า texture นูนๆ สวยมาก อยากให้ได้ลองใส่ (สาวสูง 173 ซม.)'
  },
  {
    id: '198263',
    name: 'QnL Dress DI15502',
    price: 1490,
    imageUrl: 'https://ext.same-assets.com/2516256495/3858956619.jpeg',
    link: '/product/198263/qnl-dress--di15502',
    isNew: true,
    description: 'เดรสลายดอกหวานๆ สไตล์สาวเกาหลี!'
  },
  {
    id: '196659',
    name: 'Iris Sweetpea Dress DI15401',
    price: 1490,
    imageUrl: 'https://ext.same-assets.com/2516256495/745225891.jpeg',
    link: '/product/196659/iris-sweetpea-dress-di15401',
    isNew: true,
    isBestSeller: true,
    description: 'เดรสสายเดี่ยวสีชมพู สวยมาก ผ้านิ่มใส่สบาย'
  },
  {
    id: '196584',
    name: 'Peony Ivory DI14103',
    price: 1590,
    imageUrl: 'https://ext.same-assets.com/2516256495/1345576763.jpeg',
    link: '/product/196584/peony-ivory-di14103',
    isNew: true,
    isBestSeller: true,
    description: 'เดรสสีขาวครีม คอเลคชั่น "A DAY IN LONDON" สวยมาก'
  },
  {
    id: '196578',
    name: 'Jasmine Mist Dress (set) DI15302',
    price: 1590,
    imageUrl: 'https://ext.same-assets.com/2516256495/4149304721.png',
    link: '/product/196578/jasmine-mist-dress-set-di15302',
    isNew: true,
    description: 'เซ็ทเดรสสวยหวาน งานพรีเมี่ยมเกรด Krixies'
  },
  {
    id: '196522',
    name: 'Marine Glow Dress DI15301',
    price: 1690,
    imageUrl: 'https://ext.same-assets.com/2516256495/1734162078.jpeg',
    link: '/product/196522/marine-glow-dress-di15301',
    isNew: true,
    description: 'เดรสดีไซน์เก๋ ใส่ได้หลายโอกาส'
  },
  {
    id: '196239',
    name: 'Le Lita Dress DI15202',
    price: 1690,
    imageUrl: 'https://ext.same-assets.com/2516256495/1640837162.jpeg',
    link: '/product/196239/le-lita-dress-di15202',
    isNew: true,
    isBestSeller: true,
    description: 'เดรสเนื้อผ้า Texture พิเศษ งาน Exclusive ของ Krixies'
  },
  {
    id: '196238',
    name: 'Iris Baby Blue Dress DI15201',
    price: 1490,
    imageUrl: 'https://ext.same-assets.com/2516256495/673338597.jpeg',
    link: '/product/196238/iris-baby-blue-dress-di15201',
    isNew: true,
    isBestSeller: true,
    description: 'เดรสสายเดี่ยวสีฟ้าพาสเทล สวยมาก'
  },
];

interface ProductGridProps {
  title?: string;
  products?: Product[]; // Using the proper Product interface
}

const ProductGrid = ({ title = "NEW ARRIVAL", products = sampleProducts }: ProductGridProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {title && (
        <div className="mb-8 text-center">
          <h2 className="text-xl md:text-2xl font-semibold text-Krixies-dark">{title}</h2>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            salePrice={product.salePrice}
            imageUrl={product.imageUrl}
            link={product.link}
            isNew={product.isNew}
            isBestSeller={product.isBestSeller}
            description={product.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
