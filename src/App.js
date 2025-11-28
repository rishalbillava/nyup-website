import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, Mail, Phone, MapPin } from 'lucide-react';

export default function EcommerceStore() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const products = [
    { id: 1, name: 'Naruto Oversized Tee', price: 499, image: 'https://images.unsplash.com/photo-1503341338985-c4cef5a75807?w=400', category: 'Anime' },
    { id: 2, name: 'One Piece Oversized Tee', price: 499, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400', category: 'Anime' },
    { id: 3, name: 'Dragon Ball Oversized Tee', price: 499, image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400', category: 'Anime' },
    { id: 4, name: 'Attack on Titan Oversized Tee', price: 499, image: 'https://images.unsplash.com/photo-1622445275576-721325f6bbbb?w=400', category: 'Anime' },
    { id: 5, name: 'Demon Slayer Oversized Tee', price: 499, image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400', category: 'Anime' },
    { id: 6, name: 'My Hero Academia Oversized Tee', price: 499, image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=400', category: 'Anime' },
    { id: 7, name: 'Jujutsu Kaisen Oversized Tee', price: 499, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400', category: 'Anime' },
    { id: 8, name: 'Tokyo Ghoul Oversized Tee', price: 499, image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400', category: 'Anime' },
  ];

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, delta) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
    ).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100 overflow-hidden">
      <style>{`
        @keyframes rotate3d {
          from {
            transform: perspective(1000px) rotateX(-16deg) rotateY(0deg);
          }
          to {
            transform: perspective(1000px) rotateX(-16deg) rotateY(360deg);
          }
        }
        
        .carousel-3d {
          animation: rotate3d 20s linear infinite;
          transform-style: preserve-3d;
        }
        
        .carousel-item {
          position: absolute;
          inset: 0;
        }
      `}</style>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <img src="/logo.png" alt="NYUP Logo" className="h-16 cursor-pointer" onClick={() => setCurrentPage('home')} />
          
          {/* Navigation */}
          <nav className="flex gap-8 items-center">
            <button
              onClick={() => setCurrentPage('home')}
              className={`font-semibold transition ${currentPage === 'home' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('catalog')}
              className={`font-semibold transition ${currentPage === 'catalog' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Catalog
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className={`font-semibold transition ${currentPage === 'contact' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Contact
            </button>
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* HOME PAGE */}
      {currentPage === 'home' && (
        <>
          {/* Hero Section with 3D Carousel */}
          <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-white overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  repeating-linear-gradient(to right, transparent 0 100px, #25283b22 100px 101px),
                  repeating-linear-gradient(to bottom, transparent 0 100px, #25283b22 100px 101px)
                `
              }}></div>
            </div>

            {/* 3D Carousel */}
            <div className="relative w-full h-full flex items-start justify-center pt-20">
              <div 
                className="carousel-3d relative"
                style={{
                  width: '200px',
                  height: '250px',
                  transformStyle: 'preserve-3d',
                  transform: 'perspective(1000px)'
                }}
              >
                {products.map((product, index) => (
                  <div
                    key={product.id}
                    className="carousel-item cursor-pointer"
                    style={{
                      transform: `rotateY(${index * (360 / products.length)}deg) translateZ(400px)`
                    }}
                    onClick={() => {
                      setCurrentPage('catalog');
                      setTimeout(() => {
                        document.getElementById(`product-${product.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }, 100);
                    }}
                  >
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full h-full flex flex-col items-center justify-center hover:shadow-2xl transition">
                      <img src={product.image} alt={product.name} className="w-32 h-32 object-cover rounded-lg mb-2" />
                      <h3 className="text-sm font-bold text-center">{product.name}</h3>
                      <p className="text-lg font-bold text-blue-600">₹{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Text */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center z-10">
              <div className="mb-4">
                <h1 className="text-7xl md:text-9xl font-black relative leading-none" style={{
                  fontFamily: 'Impact, sans-serif',
                  color: '#FF8C00',
                }}>
                  <span className="absolute inset-0" style={{
                    WebkitTextStroke: '2px #d2d2d2',
                    color: 'transparent',
                    textShadow: '0 10px 30px rgba(0,0,0,0.3)'
                  }}>
                    NYUP
                  </span>
                  <span style={{
                    position: 'relative',
                    zIndex: 1
                  }}>
                    NYUP
                  </span>
                </h1>
              </div>
              <p className="text-xl text-gray-700 font-semibold mb-6">Oversized Anime T-Shirts</p>
              <button
                onClick={() => setCurrentPage('catalog')}
                className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
              >
                Shop Now
              </button>
            </div>
          </section>
        </>
      )}

      {/* CATALOG PAGE */}
      {currentPage === 'catalog' && (
        <main className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold mb-12 text-gray-900 text-center">Oversized Anime Collection</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <div id={`product-${product.id}`} key={product.id} className="bg-white rounded-lg shadow hover:shadow-xl transition-all duration-300 p-6 transform hover:-translate-y-1">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                <span className="text-xs text-blue-600 font-semibold uppercase tracking-wide">{product.category}</span>
                <h3 className="text-xl font-semibold mt-2 mb-2">{product.name}</h3>
                <p className="text-2xl font-bold text-gray-900 mb-4">₹{product.price}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* CONTACT PAGE */}
      {currentPage === 'contact' && (
        <main className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold mb-12 text-gray-900 text-center">Contact Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    placeholder="+91 xxxxx xxxxx"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Message</label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 h-32"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-lg">Email</h4>
                      <p className="text-gray-600">support@nyup.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-lg">Phone</h4>
                      <p className="text-gray-600">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-lg">Address</h4>
                      <p className="text-gray-600">
                        123 Anime Street<br />
                        Bengaluru, Karnataka 560001<br />
                        India
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-600 rounded-lg shadow-lg p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Business Hours</h3>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 8:00 PM</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 6:00 PM</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowCart(false)}>
          <div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Shopping Cart</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  Your cart is empty
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center gap-4 mb-4 pb-4 border-b">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-gray-600">₹{item.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 hover:bg-red-100 text-red-600 rounded ml-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between text-xl font-bold mb-4">
                      <span>Total:</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                      Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}