"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Share2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useWishlist } from '@/lib/wishlist-context';
import { Product } from '@/components/product/ProductGrid';

// Size options for Thai clothing
const sizeOptions = ['S', 'M', 'L', 'XL'];

interface ProductDetailProps {
  product: Product;
  productImages: string[];
  productDetails: {
    material: string;
    care: string;
    fit: string;
    model: string;
  };
  relatedProducts: Product[];
}

export default function ProductDetail({
  product,
  productImages,
  productDetails,
  relatedProducts
}: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('กรุณาเลือกไซส์');
      return;
    }

    toast.success('เพิ่มสินค้าลงในตะกร้าเรียบร้อย');
  };

  const handleToggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
            <Image
              src={productImages[activeImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {product.isNew && (
              <Badge variant="default" className="absolute top-2 left-2 bg-black text-white">
                New
              </Badge>
            )}
          </div>

          <div className="flex space-x-2 overflow-x-auto pb-2">
            {productImages.map((img, idx) => (
              <button
                key={idx}
                className={`relative w-20 h-24 border-2 ${activeImage === idx ? 'border-black' : 'border-transparent'}`}
                onClick={() => setActiveImage(idx)}
              >
                <Image
                  src={img}
                  alt={`${product.name} view ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-medium text-icyicy-dark">{product.name}</h1>
            <p className="text-xl font-semibold mt-2">{product.price.toLocaleString()} ฿</p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">ไซส์</h3>
              <div className="flex space-x-2">
                {sizeOptions.map((size) => (
                  <button
                    key={size}
                    className={`w-10 h-10 flex items-center justify-center border ${selectedSize === size ? 'border-black bg-black text-white' : 'border-gray-300 hover:border-gray-400'}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">จำนวน</h3>
              <div className="flex items-center space-x-2">
                <button
                  className="w-8 h-8 border border-gray-300 flex items-center justify-center"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                >
                  -
                </button>
                <span className="w-10 text-center">{quantity}</span>
                <button
                  className="w-8 h-8 border border-gray-300 flex items-center justify-center"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              className="flex-1 bg-black hover:bg-gray-800 text-white rounded-none"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={18} className="mr-2" />
              เพิ่มลงตะกร้า
            </Button>

            <Button
              variant="outline"
              size="icon"
              className={`rounded-none ${isWishlisted ? 'text-red-500' : ''}`}
              onClick={handleToggleWishlist}
            >
              <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="rounded-none"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success('คัดลอก URL แล้ว');
              }}
            >
              <Share2 size={18} />
            </Button>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium mb-2">รายละเอียดสินค้า</h3>
            <p className="text-gray-600 text-sm">{product.description}</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">ข้อมูลสินค้า</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li className="flex">
                <span className="w-24 font-medium">วัสดุ:</span>
                <span>{productDetails.material}</span>
              </li>
              <li className="flex">
                <span className="w-24 font-medium">การดูแล:</span>
                <span>{productDetails.care}</span>
              </li>
              <li className="flex">
                <span className="w-24 font-medium">ทรง:</span>
                <span>{productDetails.fit}</span>
              </li>
              <li className="flex">
                <span className="w-24 font-medium">นางแบบ:</span>
                <span>{productDetails.model}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Separator className="my-12" />

      <div>
        <h2 className="text-xl font-medium mb-6 text-center">สินค้าแนะนำ</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.map((product) => (
            <div key={product.id} className="group">
              <Link href={`/product/${product.id}`}>
                <div className="relative aspect-[3/4] overflow-hidden mb-2">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-sm font-medium">{product.name}</h3>
                <p className="text-sm font-semibold mt-1">{product.price.toLocaleString()} ฿</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
