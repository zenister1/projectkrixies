"use client";

import React from 'react';
import Image from 'next/image';

const Logo = () => {
  return (
    <div className="flex flex-col items-center">
      <Image
        src="/logo.png
        alt="Krixies Shop Logo"
        width={80}
        height={80}
        className="object-contain"
      />
      <div className="text-center mt-1">
        <h1 className="font-montserrat text-sm font-semibold tracking-wider">Krixies Shop</h1>
        <p className="text-[10px] text-gray-500 italic">Since 2007</p>
      </div>
    </div>
  );
};

export default Logo;
