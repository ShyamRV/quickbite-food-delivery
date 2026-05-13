"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

export default function Home() {
  const [cart, setCart] = useState<{ id: number; name: string; price: number; quantity: number }[]>([]);

  const menuItems = [
    { id: 1, name: "Classic Burger", description: "Juicy beef patty with fresh vegetables", price: 12.99, image: "🍔" },
    { id: 2, name: "Margherita Pizza", description: "Traditional Italian pizza with mozzarella", price: 14.99, image: "🍕" },
    { id: 3, name: "Chicken Tacos", description: "Three soft tacos with grilled chicken", price: 10.99, image: "🌮" },
    { id: 4, name: "Sushi Platter", description: "Assorted fresh sushi rolls", price: 18.99, image: "🍣" },
    { id: 5, name: "Caesar Salad", description: "Crisp romaine with parmesan and croutons", price: 8.99, image: "🥗" },
    { id: 6, name: "Pasta Carbonara", description: "Creamy pasta with bacon and eggs", price: 13.99, image: "🍝" },
    { id: 7, name: "Grilled Salmon", description: "Fresh Atlantic salmon with herbs", price: 19.99, image: "🐟" },
    { id: 8, name: "Chocolate Cake", description: "Rich chocolate layer cake", price: 6.99, image: "🍰" },
  ];

  const addToCart = (item: { id: number; name: string; price: number }) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🚀</span>
              <h1 className="text-2xl font-bold text-orange-600">QuickBite</h1>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#menu" className="text-gray-700 hover:text-orange-600 transition">Menu</a>
              <a href="#about" className="text-gray-700 hover:text-orange-600 transition">About</a>
              <a href="#contact" className="text-gray-700 hover:text-orange-600 transition">Contact</a>
            </nav>
            <div className="relative">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-full flex items-center gap-2">
                <span>🛒</span>
                <span>Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
              </Button>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-6">Delicious Food Delivered Fast</h2>
          <p className="text-xl mb-8 opacity-90">Order your favorite meals from the best local restaurants</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-orange-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition">
              Order Now
            </Button>
            <Button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition">
              View Menu
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your food delivered in 30 minutes or less</p>
            </Card>
            <Card className="text-center p-8">
              <div className="text-5xl mb-4">👨‍🍳</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Best Chefs</h3>
              <p className="text-gray-600">Food prepared by experienced professional chefs</p>
            </Card>
            <Card className="text-center p-8">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Best Prices</h3>
              <p className="text-gray-600">Quality food at affordable prices</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Menu</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-br from-orange-100 to-amber-100 p-8 text-center">
                  <span className="text-7xl">{item.image}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-orange-600">${item.price.toFixed(2)}</span>
                    <Button
                      onClick={() => addToCart(item)}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Section */}
      {cart.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Your Cart</h2>
            <Card className="p-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-4 border-b last:border-0">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{menuItems.find((m) => m.id === item.id)?.image}</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">{item.name}</h4>
                      <p className="text-orange-600 font-bold">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-8 h-8 rounded-lg"
                      >
                        -
                      </Button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <Button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-8 h-8 rounded-lg"
                      >
                        +
                      </Button>
                    </div>
                    <Button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded-lg text-sm"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-bold text-gray-800">Total:</span>
                  <span className="text-3xl font-bold text-orange-600">${cartTotal.toFixed(2)}</span>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg text-lg font-semibold transition">
                  Proceed to Checkout
                </Button>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* About Section */}
      <section id="about" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">About QuickBite</h2>
              <p className="text-gray-600 text-lg mb-6">
                We&apos;re passionate about bringing you the best food from your favorite local restaurants.
                Our platform connects hungry customers with top-rated eateries, ensuring fast delivery
                and exceptional quality every time.
              </p>
              <p className="text-gray-600 text-lg mb-6">
                With our easy-to-use app, you can browse menus, customize orders, and track your
                delivery in real-time. We&apos;re committed to making food ordering convenient and enjoyable.
              </p>
              <div className="flex gap-8">
                <div>
                  <div className="text-4xl font-bold text-orange-600">500+</div>
                  <div className="text-gray-600">Restaurants</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-orange-600">50K+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-orange-600">4.9★</div>
                  <div className="text-gray-600">Rating</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl p-12 text-center">
              <span className="text-9xl">🍽️</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Get In Touch</h2>
          <p className="text-gray-600 text-lg mb-8">
            Have questions or feedback? We&apos;d love to hear from you!
          </p>
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <div className="text-3xl mb-2">📞</div>
              <div className="font-semibold text-gray-800">Call Us</div>
              <div className="text-gray-600">+1 (555) 123-4567</div>
            </Card>
            <Card className="p-6">
              <div className="text-3xl mb-2">📧</div>
              <div className="font-semibold text-gray-800">Email Us</div>
              <div className="text-gray-600">hello@quickbite.com</div>
            </Card>
            <Card className="p-6">
              <div className="text-3xl mb-2">📍</div>
              <div className="font-semibold text-gray-800">Visit Us</div>
              <div className="text-gray-600">123 Food Street</div>
            </Card>
          </div>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition">
            Contact Support
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🚀</span>
                <span className="text-xl font-bold">QuickBite</span>
              </div>
              <p className="text-gray-400">Delivering happiness, one meal at a time.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#menu" className="hover:text-white transition">Menu</a></li>
                <li><a href="#about" className="hover:text-white transition">About Us</a></li>
                <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Refund Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="text-2xl hover:text-orange-500 transition">📘</a>
                <a href="#" className="text-2xl hover:text-orange-500 transition">🐦</a>
                <a href="#" className="text-2xl hover:text-orange-500 transition">📸</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 QuickBite. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
