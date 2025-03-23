import React from 'react';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { sampleProducts } from '@/components/product/ProductGrid';
import ProductDetail from './ProductDetail';

export default function ProductPage({ params }) {
  // Find the product by ID
  const product = sampleProducts.find(p => p.id === params.id) || {
    id: params.id,
    name: 'Sample Product',
    price: 1590,
    imageUrl: 'https://ext.same-assets.com/2516256495/2733599545.jpeg',
    link: `/product/${params.id}`,
    isNew: true,
    description: 'This is a sample product description'
  };

  // Additional product images (sample)
  const productImages = [
    product.imageUrl,
    'https://ext.same-assets.com/2516256495/3858956619.jpeg',
    'https://ext.same-assets.com/2516256495/745225891.jpeg',
    'https://ext.same-assets.com/2516256495/1345576763.jpeg',
  ];

  // Product details (sample)
  const productDetails = {
    material: 'ผ้าชีฟอง',
    care: 'ซักมือ ซักเครื่องโปรแกรมผ้าบอบบาง',
    fit: 'ทรงปกติ',
    model: 'นางแบบสูง 175 ซม. สวมใส่ไซส์ M',
  };

  // Related products (using sample products)
  const relatedProducts = sampleProducts
    .filter(p => p.id !== params.id)
    .slice(0, 4);

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <ProductDetail
          product={product}
          productImages={productImages}
          productDetails={productDetails}
          relatedProducts={relatedProducts}
        />
      </main>
      <Footer />
    </>
  );
}
