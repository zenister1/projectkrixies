"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Product } from '@/components/product/ProductGrid';
import { toast } from 'sonner';

type WishlistContextType = {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Load wishlist from localStorage on initial load
  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      try {
        setWishlist(JSON.parse(storedWishlist));
      } catch (error) {
        console.error('Failed to parse wishlist from localStorage', error);
      }
    }
  }, []);

  // Update localStorage when wishlist changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product: Product) => {
    if (!isInWishlist(product.id)) {
      setWishlist([...wishlist, product]);
      toast.success('เพิ่มสินค้าลงในรายการโปรดเรียบร้อย');
    }
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(wishlist.filter(item => item.id !== productId));
    toast.success('ลบสินค้าออกจากรายการโปรดเรียบร้อย');
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
    toast.success('ล้างรายการโปรดเรียบร้อย');
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
