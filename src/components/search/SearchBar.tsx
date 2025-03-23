"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { sampleProducts } from '@/components/product/ProductGrid';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof sampleProducts>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Focus the input field when dialog opens
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Filter products based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = sampleProducts.filter(product => {
      return (
        product.name.toLowerCase().includes(query) ||
        (product.description && product.description.toLowerCase().includes(query))
      );
    });

    setSearchResults(results);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, we would navigate to a search results page
      // For now, just close the dialog
      setIsOpen(false);

      // Navigate to the first product if there are results
      if (searchResults.length > 0) {
        router.push(`/product/${searchResults[0].id}`);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-600 hover:text-black"
        >
          <Search size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <div className="py-4">
          <form onSubmit={handleSearch} className="relative">
            <Input
              ref={inputRef}
              type="text"
              placeholder="ค้นหาสินค้า..."
              className="pr-12 h-12 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-12 top-0 h-12"
                onClick={() => setSearchQuery('')}
              >
                <X size={18} />
              </Button>
            )}
            <Button
              type="submit"
              size="icon"
              className="absolute right-0 top-0 h-12 rounded-l-none bg-black hover:bg-gray-800"
            >
              <Search size={18} />
            </Button>
          </form>

          {searchQuery && (
            <div className="mt-6">
              <h3 className="text-sm text-gray-500 mb-3">ผลการค้นหา</h3>

              {searchResults.length > 0 ? (
                <div className="space-y-4 max-h-[400px] overflow-y-auto">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="flex gap-3 p-2 hover:bg-gray-50 transition-colors">
                        <div className="relative w-16 h-20 flex-shrink-0">
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{product.name}</h4>
                          <p className="text-sm text-gray-600 line-clamp-1">{product.description}</p>
                          <p className="text-sm font-semibold mt-1">{product.price.toLocaleString()} ฿</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  ไม่พบสินค้าที่ตรงกับคำค้นหา
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchBar;
