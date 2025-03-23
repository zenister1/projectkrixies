"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  imageUrl: string;
  link?: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  description?: string;
}

const ProductCard = ({
  id,
  name,
  price,
  salePrice,
  imageUrl,
  link,
  isNew = false,
  isBestSeller = false,
  description
}: ProductCardProps) => {
  // If no link is provided, use the product detail page
  const productLink = link || `/product/${id}`;

  return (
    <Card className="overflow-hidden border-0 shadow-none group hover:shadow-sm transition-shadow duration-300">
      <CardContent className="p-0">
        <Link href={productLink}>
          <div className="relative">
            <div className="relative w-full h-[400px] overflow-hidden product-card-image">
              <Image
                src={imageUrl}
                alt={name}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 left-2 flex gap-1 flex-col">
                {isNew && (
                  <Badge variant="default" className="bg-black text-white text-[10px] font-normal">
                    New
                  </Badge>
                )}
                {isBestSeller && (
                  <Badge variant="default" className="bg-icyicy-rose text-white text-[10px] font-normal">
                    Best Seller
                  </Badge>
                )}
              </div>
            </div>

            <div className="p-2 text-center group-hover:bg-gray-50 transition-colors duration-300">
              <h3 className="text-sm font-medium mt-2 text-icyicy-dark group-hover:text-black transition-colors duration-300">
                {name}
              </h3>

              {description && (
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {description}
                </p>
              )}

              <div className="mt-2 flex justify-center items-center gap-2">
                {salePrice && salePrice < price ? (
                  <>
                    <span className="text-gray-500 line-through text-sm">{price.toLocaleString()} ฿</span>
                    <span className="font-semibold text-sm text-red-600">{salePrice.toLocaleString()} ฿</span>
                  </>
                ) : (
                  <span className="font-semibold text-sm">{price.toLocaleString()} ฿</span>
                )}
              </div>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
