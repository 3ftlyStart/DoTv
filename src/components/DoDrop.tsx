import { motion } from 'motion/react';
import { ShoppingBag, Truck, Zap, Star } from 'lucide-react';
import { PRODUCTS, Product } from '../constants';
import { useState } from 'react';
import CheckoutModal from './CheckoutModal';

export default function DoDrop() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckout = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <section id="do-drop" className="py-32 bg-black relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-8 sm:px-12">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              Exclusive Hardware
            </div>
            <h2 className="text-4xl md:text-7xl font-bold font-display tracking-tighter leading-[0.9]">
              DO <span className="text-blue-500">DROP</span>
            </h2>
            <p className="text-xl text-white/50 mt-6 leading-relaxed">
              Express checkout for premium hardware. Delivered to your door.
            </p>
          </div>
          <div className="flex gap-8 text-white/40">
            <div className="flex items-center gap-2">
              <Truck size={18} className="text-blue-500" />
              <span className="text-sm font-bold">Free Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={18} className="text-blue-500" />
              <span className="text-sm font-bold">Next Day Delivery</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {PRODUCTS.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] p-4 transition-all duration-500 hover:border-blue-500/30 hover:bg-[#0E0E0E]">
                <div className="aspect-[4/3] rounded-[2rem] overflow-hidden bg-zinc-900 mb-8 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-xs font-black text-white">
                    {product.price}
                  </div>
                </div>
                
                <div className="px-4 pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{product.category}</span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} size={8} className="fill-blue-500 text-blue-500" />)}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-8 group-hover:text-white transition-colors">{product.name}</h3>
                  
                  <button 
                    onClick={() => handleCheckout(product)}
                    className="w-full py-4 bg-white text-black font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-400 transition-all transform group-active:scale-95 shadow-xl shadow-white/5"
                  >
                    <ShoppingBag size={18} />
                    Express Checkout
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <CheckoutModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </section>
  );
}
