"use client";

import React, { useState } from 'react';
import ProductCard from '@/components/product/ProductCard';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FilterX, SlidersHorizontal } from 'lucide-react';
import { Product } from '@/components/product/ProductGrid';

const sortOptions = [
  { value: 'newest', label: 'สินค้าใหม่ล่าสุด' },
  { value: 'price-low-high', label: 'ราคาต่ำ-สูง' },
  { value: 'price-high-low', label: 'ราคาสูง-ต่ำ' },
  { value: 'best-seller', label: 'สินค้าขายดี' },
];

interface CategoryContentProps {
  slug: string;
  products: Product[];
}

export default function CategoryContent({ slug, products }: CategoryContentProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [sortBy, setSortBy] = useState('newest');
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [showBestSellerOnly, setShowBestSellerOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Filter products by category (simulated for now)
  let filteredProducts = [...products];

  // Filter by price range
  filteredProducts = filteredProducts.filter(
    product => product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  // Filter by new arrivals if checkbox is checked
  if (showNewOnly) {
    filteredProducts = filteredProducts.filter(product => product.isNew);
  }

  // Filter by best sellers if checkbox is checked
  if (showBestSellerOnly) {
    filteredProducts = filteredProducts.filter(product => product.isBestSeller);
  }

  // Sort products
  filteredProducts = filteredProducts.sort((a, b) => {
    if (sortBy === 'price-low-high') {
      return a.price - b.price;
    } else if (sortBy === 'price-high-low') {
      return b.price - a.price;
    } else if (sortBy === 'best-seller') {
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    } else {
      // Default sort by newest (using isNew flag for demo)
      return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    }
  });

  const resetFilters = () => {
    setPriceRange([0, 3000]);
    setShowNewOnly(false);
    setShowBestSellerOnly(false);
    setSortBy('newest');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filters - Mobile Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal size={16} />
          {showFilters ? 'ซ่อนตัวกรอง' : 'แสดงตัวกรอง'}
        </Button>
      </div>

      {/* Filters */}
      <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
        <div className="bg-white p-4 border border-gray-200 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">ตัวกรอง</h3>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs flex items-center"
              onClick={resetFilters}
            >
              <FilterX size={14} className="mr-1" />
              รีเซ็ต
            </Button>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-medium mb-3">ราคา</h4>
            <div className="px-2">
              <Slider
                defaultValue={[0, 3000]}
                max={3000}
                step={100}
                value={[priceRange[0], priceRange[1]]}
                onValueChange={(value) => setPriceRange([value[0], value[1]])}
                className="my-6"
              />
              <div className="flex justify-between text-sm">
                <span>{priceRange[0]} ฿</span>
                <span>{priceRange[1]} ฿</span>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="text-sm font-medium">สถานะสินค้า</h4>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="new-arrivals"
                checked={showNewOnly}
                onCheckedChange={(checked) => setShowNewOnly(checked as boolean)}
              />
              <Label htmlFor="new-arrivals" className="text-sm">สินค้าใหม่</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="best-sellers"
                checked={showBestSellerOnly}
                onCheckedChange={(checked) => setShowBestSellerOnly(checked as boolean)}
              />
              <Label htmlFor="best-sellers" className="text-sm">สินค้าขายดี</Label>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="lg:w-3/4">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-sm text-gray-600">แสดง {filteredProducts.length} รายการ</p>

          <div className="flex items-center space-x-2">
            <span className="text-sm">เรียงตาม:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="เรียงตาม" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              salePrice={product.salePrice}
              imageUrl={product.imageUrl}
              link={`/product/${product.id}`}
              isNew={product.isNew}
              isBestSeller={product.isBestSeller}
              description={product.description}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">ไม่พบสินค้าที่ตรงกับเงื่อนไขที่เลือก</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={resetFilters}
            >
              รีเซ็ตตัวกรอง
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
