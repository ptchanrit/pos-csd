import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

const POSApp: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const products: Product[] = [
    { id: 1, name: 'สินค้า 1', price: 10, image: 'https://via.placeholder.com/500' },
    { id: 2, name: 'สินค้า 2', price: 15, image: 'https://via.placeholder.com/500' },
    { id: 3, name: 'สินค้า 3', price: 20, image: 'https://via.placeholder.com/500' },
    { id: 4, name: 'สินค้า 4', price: 25, image: 'https://via.placeholder.com/500' },
  ];

  const addToCart = (productId: number) => {
    const existingItem = cartItems.find((item) => item.id === productId);
    if (existingItem) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
    } else {
      const productToAdd = products.find((product) => product.id === productId);
      if (productToAdd) {
        setCartItems((prevItems) => [...prevItems, { ...productToAdd, quantity: 1 }]);
      }
    }
  };

  const removeFromCart = (itemId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const getTotalAmount = (): string => {
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return total.toFixed(2);
  };

  const handleCheckout = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (

    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 py-4">
        <h1 className="text-white text-2xl text-center font-bold">POS SYSTEM</h1>
      </header>
      <div className="font-noto grid grid-cols-1 md:grid-cols-3 gap-4 py-8 px-4 ">
        <div className="col-span-2">
          <div className="bg-white rounded shadow-lg  p-4  h-full">
            <h2 className="text-2xl mb-4">รายการสินค้า</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4   gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded shadow-lg cursor-pointer border border-gray-200"
                  onClick={() => addToCart(product.id)}
                >
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t" />
                  <div className="p-4">
                    <p className="text-lg font-semibold mb-2">{product.name}</p>
                    <p className="text-gray-600">{product.price} บาท</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="bg-white rounded shadow-lg p-4 h-full">
            <h2 className="text-2xl mb-4">ตะกร้าสินค้า</h2>
            {cartItems.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex items-center py-4">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <div className="flex-grow ml-4">
                      <p className="text-lg font-semibold">{item.name}</p>
                      <p className="text-gray-600">
                        {item.price} - จำนวน: {item.quantity}บาท
                      </p>
                    </div>
                    <button
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">ไม่มีสินค้าในตะกร้า</p>
            )}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl">ราคารวมทั้งหมด: {getTotalAmount()} บาท</h3>
              </div>
              <button
                className="w-full mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
              >
                ชำระเงิน
              </button>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg transform transition-all duration-200">
            <p className="text-xl font-semibold mb-4">ขอบคุณสำหรับการสั่งซื้อ!</p>
            <p className="text-gray-700">คำสั่งซื้อของคุณได้รับการประมวลผลเรียบร้อยแล้ว</p>
            <button

              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={closeModal}
            >
              ปิด
            </button>
          </div>
        </div>
      
  )
}
    </div >
   
  );
};

export default POSApp;
