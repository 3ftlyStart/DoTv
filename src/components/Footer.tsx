import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="py-20 border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <Logo className="mb-6" />
            <p className="text-white/40 max-w-xs text-sm leading-relaxed">
              Bringing all your favorite content together. The next evolution of the smart TV platform.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-sm">Products</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><a href="#" className="hover:text-white transition-colors">Streaming Stick</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Smart TV</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Remote Control</a></li>
              <li><a href="#do-drop" className="hover:text-white transition-colors">DoDrop</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm">Support</h4>
            <ul className="space-y-4 text-sm text-white/40">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-xs text-white/20">
            © 2026 DoTv. All rights reserved. Google TV is a trademark of Google LLC.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-white/20 hover:text-white transition-colors">YouTube</a>
            <a href="#" className="text-xs text-white/20 hover:text-white transition-colors">Twitter</a>
            <a href="#" className="text-xs text-white/20 hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
