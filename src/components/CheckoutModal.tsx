import { motion, AnimatePresence } from 'motion/react';
import { X, CreditCard, Truck, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { Product } from '../constants';
import { cn } from '../lib/utils';

interface CheckoutModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

type CheckoutStep = 'info' | 'payment' | 'success';

export default function CheckoutModal({ product, isOpen, onClose }: CheckoutModalProps) {
  const [step, setStep] = useState<CheckoutStep>('info');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!product) return null;

  const handleNext = () => {
    if (step === 'info') setStep('payment');
    else if (step === 'payment') {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep('success');
      }, 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-[#0A0A0A] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[600px]"
          >
            {/* Left Side: Product Summary */}
            <div className="w-full md:w-5/12 bg-zinc-900/50 p-8 md:p-12 border-r border-white/5 flex flex-col">
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-4 text-blue-500">
                  <ShieldCheck size={20} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Secure Checkout</span>
                </div>
                <h3 className="text-2xl font-bold font-display">Order Summary</h3>
              </div>

              <div className="flex-1">
                <div className="aspect-video rounded-2xl overflow-hidden mb-8 border border-white/5 shadow-xl">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-xs font-black text-blue-500 uppercase tracking-widest mb-1">{product.category}</p>
                  <h4 className="text-xl font-bold mb-4">{product.name}</h4>
                  <div className="flex items-center justify-between py-4 border-t border-white/5">
                    <span className="text-white/40">Subtotal</span>
                    <span className="font-bold">{product.price}</span>
                  </div>
                  <div className="flex items-center justify-between py-4 border-t border-white/5">
                    <span className="text-white/40">Ogle Drop Delivery</span>
                    <span className="text-emerald-500 font-bold">FREE</span>
                  </div>
                  <div className="flex items-center justify-between py-6 border-t border-white/10 mt-4">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-black text-blue-500">{product.price}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Checkout Form */}
            <div className="flex-1 p-8 md:p-12 flex flex-col relative">
              <button 
                onClick={onClose}
                className="absolute top-8 right-8 p-2 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-all"
              >
                <X size={24} />
              </button>

              <div className="mb-12">
                <div className="flex gap-4 mb-8">
                  {(['info', 'payment', 'success'] as const).map((s, i) => (
                    <div 
                      key={s}
                      className={cn(
                        "h-1 flex-1 rounded-full transition-all duration-500",
                        step === s || (i < 2 && step === 'payment') || (i < 3 && step === 'success')
                          ? "bg-blue-500"
                          : "bg-white/10"
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide">
                <AnimatePresence mode="wait">
                  {step === 'info' && (
                    <motion.div
                      key="info"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h2 className="text-3xl font-bold font-display mb-8">Delivery Info</h2>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-white/40 ml-1">First Name</label>
                          <input type="text" placeholder="John" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition-all" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-white/40 ml-1">Last Name</label>
                          <input type="text" placeholder="Doe" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition-all" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-white/40 ml-1">Full Address</label>
                        <input type="text" placeholder="London, SW1A 1AA, UK" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500 outline-none transition-all" />
                      </div>
                      <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-center gap-4 text-blue-400">
                        <Truck size={20} />
                        <p className="text-sm">Ogle Drop ensures same-day dispatch for all orders placed before 4PM.</p>
                      </div>
                    </motion.div>
                  )}

                  {step === 'payment' && (
                    <motion.div
                      key="payment"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h2 className="text-3xl font-bold font-display mb-8">Payment Methods</h2>
                      <div className="grid gap-4">
                        <div className="p-5 rounded-2xl bg-white/5 border border-blue-500/50 flex items-center justify-between cursor-pointer">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-500">
                              <CreditCard />
                            </div>
                            <div>
                              <p className="font-bold text-sm">Stored Visa Card</p>
                              <p className="text-xs text-white/40">Ending in **** 4242</p>
                            </div>
                          </div>
                          <div className="w-5 h-5 rounded-full border-4 border-blue-500" />
                        </div>
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between cursor-pointer opacity-40 hover:opacity-100 transition-opacity">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                              <div className="font-black italic text-sky-400">P</div>
                            </div>
                            <p className="font-bold text-sm">PayPal</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 'success' && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="h-full flex flex-col items-center justify-center text-center space-y-6"
                    >
                      <div className="w-24 h-24 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mb-4">
                        <CheckCircle size={48} />
                      </div>
                      <h2 className="text-4xl font-bold font-display">Drop Confirmed!</h2>
                      <p className="text-white/50 max-w-xs mx-auto">
                        Your {product.name} is being prepared for delivery. Expect it in less than 24 hours.
                      </p>
                      <button 
                        onClick={onClose}
                        className="px-8 py-3 bg-white text-black font-bold rounded-xl active:scale-95 transition-transform"
                      >
                        Back to Store
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {step !== 'success' && (
                <div className="mt-12">
                  <button 
                    disabled={isProcessing}
                    onClick={handleNext}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white font-black rounded-2xl flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-xl shadow-blue-500/20 group"
                  >
                    {isProcessing ? (
                      <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        {step === 'info' ? 'Continue to Payment' : `Pay ${product.price}`}
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
