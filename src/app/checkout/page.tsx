"use client";

import React, { useState } from 'react';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Link from 'next/link';

// Sample cart items
const initialCartItems = [
  {
    id: '198264',
    name: 'Jn Y Dress DI15501',
    price: 1690,
    imageUrl: 'https://ext.same-assets.com/2516256495/2733599545.jpeg',
    size: 'M',
    quantity: 1,
  },
  {
    id: '196238',
    name: 'Iris Baby Blue Dress DI15201',
    price: 1490,
    imageUrl: 'https://ext.same-assets.com/2516256495/673338597.jpeg',
    size: 'S',
    quantity: 1,
  },
];

// Address provinces (sample)
const provinces = [
  'กรุงเทพมหานคร',
  'นนทบุรี',
  'ปทุมธานี',
  'สมุทรปราการ',
  'เชียงใหม่',
  'ขอนแก่น',
  'ภูเก็ต',
  'ชลบุรี',
  'ระยอง',
];

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'payment' | 'confirmation'>('cart');
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('bank-transfer');

  // Calculate subtotals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = shippingMethod === 'express' ? 100 : 50;
  const discount = subtotal > 3000 ? subtotal * 0.1 : subtotal > 2000 ? subtotal * 0.05 : 0;
  const total = subtotal + shipping - discount;

  // Update item quantity
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Remove item from cart
  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast.success('ลบสินค้าออกจากตะกร้าเรียบร้อย');
  };

  // Process to next step
  const handleProceedToShipping = () => {
    if (cartItems.length === 0) {
      toast.error('กรุณาเพิ่มสินค้าในตะกร้า');
      return;
    }
    setCheckoutStep('shipping');
    window.scrollTo(0, 0);
  };

  const handleProceedToPayment = () => {
    // In a real application, would validate shipping info here
    setCheckoutStep('payment');
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = () => {
    // In a real application, would process payment and order here
    setCheckoutStep('confirmation');
    window.scrollTo(0, 0);
  };

  // Render cart step
  const renderCartStep = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <h2 className="text-lg font-medium mb-4">รถเข็นของฉัน ({cartItems.length} รายการ)</h2>

        {cartItems.length > 0 ? (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row gap-4 border-b pb-6">
                <div className="relative w-24 h-32 flex-shrink-0">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-grow">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="font-semibold">{(item.price * item.quantity).toLocaleString()} ฿</p>
                  </div>

                  <p className="text-gray-600 text-sm mt-1">ไซส์: {item.size}</p>
                  <p className="text-gray-600 text-sm">ราคา: {item.price.toLocaleString()} ฿</p>

                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:bg-red-50 hover:text-red-600 p-0 h-8 w-8"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-dashed rounded-md p-8 text-center">
            <p className="text-gray-500 mb-4">ตะกร้าสินค้าของคุณว่างเปล่า</p>
            <Link href="/category/products">
              <Button variant="outline">ซื้อสินค้าต่อ</Button>
            </Link>
          </div>
        )}
      </div>

      <div>
        <div className="bg-gray-50 p-6 border sticky top-4">
          <h2 className="text-lg font-medium mb-4">สรุปคำสั่งซื้อ</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>ยอดรวม</span>
              <span>{subtotal.toLocaleString()} ฿</span>
            </div>

            <div className="flex justify-between">
              <span>ค่าจัดส่ง</span>
              <span>{shipping.toLocaleString()} ฿</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>ส่วนลด</span>
                <span>-{discount.toLocaleString()} ฿</span>
              </div>
            )}

            <Separator />

            <div className="flex justify-between font-semibold text-base">
              <span>ยอดรวมทั้งหมด</span>
              <span>{total.toLocaleString()} ฿</span>
            </div>
          </div>

          <Button
            className="w-full mt-6 bg-black hover:bg-gray-800 text-white rounded-none"
            onClick={handleProceedToShipping}
            disabled={cartItems.length === 0}
          >
            ดำเนินการชำระเงิน
          </Button>
        </div>
      </div>
    </div>
  );

  // Render shipping step
  const renderShippingStep = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <h2 className="text-lg font-medium mb-4">ที่อยู่จัดส่ง</h2>

        <div className="space-y-4 bg-white p-6 border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="first-name">ชื่อ</Label>
              <Input id="first-name" className="mt-1" />
            </div>

            <div>
              <Label htmlFor="last-name">นามสกุล</Label>
              <Input id="last-name" className="mt-1" />
            </div>
          </div>

          <div>
            <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
            <Input id="phone" type="tel" className="mt-1" />
          </div>

          <div>
            <Label htmlFor="address">ที่อยู่</Label>
            <Input id="address" className="mt-1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="province">จังหวัด</Label>
              <Select>
                <SelectTrigger id="province" className="mt-1">
                  <SelectValue placeholder="เลือกจังหวัด" />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map((province) => (
                    <SelectItem key={province} value={province.toLowerCase()}>
                      {province}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="district">อำเภอ/เขต</Label>
              <Input id="district" className="mt-1" />
            </div>

            <div>
              <Label htmlFor="postal-code">รหัสไปรษณีย์</Label>
              <Input id="postal-code" className="mt-1" />
            </div>
          </div>
        </div>

        <h2 className="text-lg font-medium mb-4 mt-8">วิธีการจัดส่ง</h2>

        <div className="space-y-4 bg-white p-6 border">
          <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
            <div className="flex items-start space-x-2 p-2 hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value="standard" id="standard" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="standard" className="flex justify-between font-medium cursor-pointer">
                  <span>จัดส่งมาตรฐาน (2-3 วันทำการ)</span>
                  <span>50 ฿</span>
                </Label>
                <p className="text-gray-500 text-sm mt-1">จัดส่งโดย Kerry Express</p>
              </div>
            </div>

            <div className="flex items-start space-x-2 p-2 hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value="express" id="express" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="express" className="flex justify-between font-medium cursor-pointer">
                  <span>จัดส่งด่วน (1-2 วันทำการ)</span>
                  <span>100 ฿</span>
                </Label>
                <p className="text-gray-500 text-sm mt-1">จัดส่งโดย Flash Express</p>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="mt-8 flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCheckoutStep('cart')}
          >
            กลับไปยังตะกร้าสินค้า
          </Button>

          <Button
            className="bg-black hover:bg-gray-800 text-white rounded-none"
            onClick={handleProceedToPayment}
          >
            ดำเนินการต่อ
          </Button>
        </div>
      </div>

      <div>
        <div className="bg-gray-50 p-6 border sticky top-4">
          <h2 className="text-lg font-medium mb-4">สรุปคำสั่งซื้อ</h2>

          <div className="space-y-3 mb-4 text-sm">
            <div className="flex justify-between">
              <span>สินค้า ({cartItems.length} รายการ)</span>
              <span>{subtotal.toLocaleString()} ฿</span>
            </div>

            <div className="flex justify-between">
              <span>ค่าจัดส่ง</span>
              <span>{shipping.toLocaleString()} ฿</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>ส่วนลด</span>
                <span>-{discount.toLocaleString()} ฿</span>
              </div>
            )}

            <Separator />

            <div className="flex justify-between font-semibold text-base">
              <span>ยอดรวมทั้งหมด</span>
              <span>{total.toLocaleString()} ฿</span>
            </div>
          </div>

          <div className="space-y-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-2">
                <div className="relative w-10 h-12 flex-shrink-0">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-xs flex-1">
                  <p className="line-clamp-1 font-medium">{item.name}</p>
                  <p className="text-gray-500">ไซส์: {item.size}, จำนวน: {item.quantity}</p>
                  <p>{(item.price * item.quantity).toLocaleString()} ฿</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Render payment step
  const renderPaymentStep = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <h2 className="text-lg font-medium mb-4">วิธีการชำระเงิน</h2>

        <div className="space-y-4 bg-white p-6 border">
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="flex items-start space-x-2 p-2 hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value="bank-transfer" id="bank-transfer" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="bank-transfer" className="font-medium cursor-pointer">
                  โอนเงินผ่านธนาคาร
                </Label>
                <p className="text-gray-500 text-sm mt-1">โอนเงินผ่านบัญชีธนาคารของเรา</p>

                {paymentMethod === 'bank-transfer' && (
                  <div className="mt-3 p-3 bg-gray-50 text-sm space-y-2">
                    <p>ธนาคารกสิกรไทย</p>
                    <p>ชื่อบัญชี: Krixies SHOP</p>
                    <p>เลขที่บัญชี: 123-4-56789-0</p>
                    <p className="text-xs text-gray-500 mt-2">* หลังจากทำการโอนเงิน กรุณาแจ้งชำระเงินในเมนู "แจ้งชำระเงิน" พร้อมแนบหลักฐานการโอนเงิน</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-2 p-2 hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value="credit-card" id="credit-card" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="credit-card" className="font-medium cursor-pointer">
                  บัตรเครดิต / เดบิต
                </Label>
                <p className="text-gray-500 text-sm mt-1">ชำระเงินผ่านบัตรเครดิตหรือเดบิตของคุณ</p>

                {paymentMethod === 'credit-card' && (
                  <div className="mt-3 grid gap-4">
                    <div>
                      <Label htmlFor="card-number">หมายเลขบัตร</Label>
                      <Input id="card-number" placeholder="0000 0000 0000 0000" className="mt-1" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">วันหมดอายุ</Label>
                        <Input id="expiry" placeholder="MM/YY" className="mt-1" />
                      </div>

                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" className="mt-1" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="card-name">ชื่อผู้ถือบัตร</Label>
                      <Input id="card-name" className="mt-1" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-2 p-2 hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value="cod" id="cod" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="cod" className="font-medium cursor-pointer">
                  เก็บเงินปลายทาง
                </Label>
                <p className="text-gray-500 text-sm mt-1">ชำระเงินเมื่อได้รับสินค้า (มีค่าธรรมเนียมเพิ่มเติม 20 บาท)</p>
              </div>
            </div>
          </RadioGroup>
        </div>

        <div className="mt-8 flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCheckoutStep('shipping')}
          >
            กลับไปยังที่อยู่จัดส่ง
          </Button>

          <Button
            className="bg-black hover:bg-gray-800 text-white rounded-none"
            onClick={handlePlaceOrder}
          >
            สั่งซื้อสินค้า
          </Button>
        </div>
      </div>

      <div>
        <div className="bg-gray-50 p-6 border sticky top-4">
          <h2 className="text-lg font-medium mb-4">สรุปคำสั่งซื้อ</h2>

          <div className="space-y-3 mb-4 text-sm">
            <div className="flex justify-between">
              <span>สินค้า ({cartItems.length} รายการ)</span>
              <span>{subtotal.toLocaleString()} ฿</span>
            </div>

            <div className="flex justify-between">
              <span>ค่าจัดส่ง</span>
              <span>{shipping.toLocaleString()} ฿</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>ส่วนลด</span>
                <span>-{discount.toLocaleString()} ฿</span>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="flex justify-between">
                <span>ค่าธรรมเนียมเก็บเงินปลายทาง</span>
                <span>20 ฿</span>
              </div>
            )}

            <Separator />

            <div className="flex justify-between font-semibold text-base">
              <span>ยอดรวมทั้งหมด</span>
              <span>{(total + (paymentMethod === 'cod' ? 20 : 0)).toLocaleString()} ฿</span>
            </div>
          </div>

          <div className="space-y-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-2">
                <div className="relative w-10 h-12 flex-shrink-0">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-xs flex-1">
                  <p className="line-clamp-1 font-medium">{item.name}</p>
                  <p className="text-gray-500">ไซส์: {item.size}, จำนวน: {item.quantity}</p>
                  <p>{(item.price * item.quantity).toLocaleString()} ฿</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Render confirmation step
  const renderConfirmationStep = () => (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>

      <h1 className="text-2xl font-semibold mb-4">ขอบคุณสำหรับคำสั่งซื้อ!</h1>
      <p className="text-gray-600 mb-8">คำสั่งซื้อของคุณได้รับการยืนยันแล้ว</p>

      <div className="bg-gray-50 p-6 text-left rounded-md mb-8">
        <h2 className="text-lg font-medium mb-4">รายละเอียดคำสั่งซื้อ</h2>
        <p className="text-sm text-gray-600 mb-1">หมายเลขคำสั่งซื้อ: #ICY{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
        <p className="text-sm text-gray-600">วันที่: {new Date().toLocaleDateString('th-TH')}</p>

        <Separator className="my-4" />

        <h3 className="font-medium mb-2">สินค้า</h3>
        <div className="space-y-3">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>{item.name} (ไซส์: {item.size}) x {item.quantity}</span>
              <span>{(item.price * item.quantity).toLocaleString()} ฿</span>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>ยอดรวม</span>
            <span>{subtotal.toLocaleString()} ฿</span>
          </div>

          <div className="flex justify-between">
            <span>ค่าจัดส่ง</span>
            <span>{shipping.toLocaleString()} ฿</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>ส่วนลด</span>
              <span>-{discount.toLocaleString()} ฿</span>
            </div>
          )}

          {paymentMethod === 'cod' && (
            <div className="flex justify-between">
              <span>ค่าธรรมเนียมเก็บเงินปลายทาง</span>
              <span>20 ฿</span>
            </div>
          )}

          <div className="flex justify-between font-semibold">
            <span>ยอดรวมทั้งหมด</span>
            <span>{(total + (paymentMethod === 'cod' ? 20 : 0)).toLocaleString()} ฿</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        <Link href="/">
          <Button variant="outline">กลับไปยังหน้าหลัก</Button>
        </Link>

        <Link href="/category/products">
          <Button className="bg-black hover:bg-gray-800 text-white rounded-none">ซื้อสินค้าต่อ</Button>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        {checkoutStep !== 'confirmation' && (
          <div className="mb-8">
            <div className="flex justify-between">
              <div className={`flex items-center ${checkoutStep === 'cart' ? 'text-black font-medium' : 'text-gray-500'}`}>
                <span className="w-6 h-6 rounded-full flex items-center justify-center border border-current mr-2">1</span>
                ตะกร้าสินค้า
              </div>

              <div className="flex-1 border-b border-gray-200 mx-2 self-center" />

              <div className={`flex items-center ${checkoutStep === 'shipping' ? 'text-black font-medium' : 'text-gray-500'}`}>
                <span className="w-6 h-6 rounded-full flex items-center justify-center border border-current mr-2">2</span>
                ที่อยู่จัดส่ง
              </div>

              <div className="flex-1 border-b border-gray-200 mx-2 self-center" />

              <div className={`flex items-center ${checkoutStep === 'payment' ? 'text-black font-medium' : 'text-gray-500'}`}>
                <span className="w-6 h-6 rounded-full flex items-center justify-center border border-current mr-2">3</span>
                ชำระเงิน
              </div>
            </div>
          </div>
        )}

        {/* Step Content */}
        {checkoutStep === 'cart' && renderCartStep()}
        {checkoutStep === 'shipping' && renderShippingStep()}
        {checkoutStep === 'payment' && renderPaymentStep()}
        {checkoutStep === 'confirmation' && renderConfirmationStep()}
      </main>
      <Footer />
    </>
  );
}
