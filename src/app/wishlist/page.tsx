"use client";

import React from 'react';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { useWishlist } from '@/lib/wishlist-context';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Trash2, ShoppingCart, Heart } from 'lucide-react';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import ProductCard from '@/components/product/ProductCard';
import { sampleProducts } from '@/components/product/ProductGrid';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();

  const addToCart = (productId: string) => {
    // In a real application, this would add to the cart
    toast.success('เพิ่มสินค้าลงในตะกร้าเรียบร้อย');
  };

  // Recommended products (products not in wishlist)
  const recommendedProducts = sampleProducts
    .filter(product => !wishlist.some(item => item.id === product.id))
    .slice(0, 4);

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Heart size={20} className="text-icyicy-rose" />
          สินค้าที่ชอบ
        </h1>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-600">{wishlist.length} รายการ</p>
                <Button
                  variant="ghost"
                  className="text-red-500 hover:bg-red-50 hover:text-red-600 text-xs"
                  onClick={clearWishlist}
                >
                  <Trash2 size={14} className="mr-1" />
                  ล้างรายการโปรด
                </Button>
              </div>

              <div className="space-y-6">
                {wishlist.map((product) => (
                  <div key={product.id} className="flex flex-col sm:flex-row gap-4 border-b pb-6">
                    <div className="relative w-24 h-32 flex-shrink-0">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-grow">
                      <Link href={`/product/${product.id}`}>
                        <h3 className="font-medium hover:underline">{product.name}</h3>
                      </Link>

                      <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                      <p className="font-semibold mt-2">{product.price.toLocaleString()} ฿</p>

                      <div className="flex gap-2 mt-4">
                        <Button
                          className="bg-black hover:bg-gray-800 text-white rounded-none"
                          onClick={() => addToCart(product.id)}
                        >
                          <ShoppingCart size={16} className="mr-1" />
                          เพิ่มลงตะกร้า
                        </Button>

                        <Button
                          variant="outline"
                          className="text-red-500 rounded-none"
                          onClick={() => removeFromWishlist(product.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="bg-gray-50 p-6 border">
                <h2 className="text-lg font-medium mb-4">สรุปรายการ</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>จำนวนสินค้า</span>
                    <span>{wishlist.length} รายการ</span>
                  </div>

                  <div className="flex justify-between">
                    <span>ยอดรวม</span>
                    <span>
                      {wishlist.reduce((sum, item) => sum + item.price, 0).toLocaleString()} ฿
                    </span>
                  </div>
                </div>

                <Link href="/checkout">
                  <Button
                    className="w-full mt-6 bg-black hover:bg-gray-800 text-white rounded-none"
                  >
                    ไปที่ตะกร้าสินค้า
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed rounded">
            <Heart size={48} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-medium mb-2">รายการโปรดของคุณว่างเปล่า</h2>
            <p className="text-gray-500 mb-6">ค้นหาสินค้าที่คุณชื่นชอบและเพิ่มลงในรายการโปรด</p>
            <Link href="/category/products">
              <Button className="bg-black hover:bg-gray-800 text-white rounded-none">
                ช้อปปิ้งต่อ
              </Button>
            </Link>
          </div>
        )}

        {recommendedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-medium mb-6">สินค้าแนะนำสำหรับคุณ</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recommendedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  imageUrl={product.imageUrl}
                  isNew={product.isNew}
                  isBestSeller={product.isBestSeller}
                />
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
