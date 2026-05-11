import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="py-20 border-t border-cyber-cyan/10 bg-cyber-bg relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <Logo className="mb-6" />
            <p className="text-white/30 max-w-xs font-mono text-[10px] leading-relaxed uppercase tracking-wider">
              &gt; SYST_MSG: DISTRIBUTING DATA ACROSS THE SPRAWL.
              <br />
              &gt; STATUS: OPERATIONAL.
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] font-mono font-bold text-cyber-cyan uppercase tracking-[0.3em] mb-6">Neural_Links</h4>
            <ul className="space-y-4 text-[10px] font-mono text-white/40 uppercase tracking-widest">
              <li><a href="#" className="hover:text-cyber-pink transition-colors">Streaming_Stick</a></li>
              <li><a href="#" className="hover:text-cyber-pink transition-colors">Smart_TV</a></li>
              <li><a href="#" className="hover:text-cyber-pink transition-colors">Remote_Control</a></li>
              <li><a href="#do-drop" className="hover:text-cyber-pink transition-colors">DoDrop_Module</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-mono font-bold text-cyber-pink uppercase tracking-[0.3em] mb-6">Protocols</h4>
            <ul className="space-y-4 text-[10px] font-mono text-white/40 uppercase tracking-widest">
              <li><a href="#" className="hover:text-cyber-cyan transition-colors">Help_Node</a></li>
              <li><a href="#" className="hover:text-cyber-cyan transition-colors">Contact_Proxy</a></li>
              <li><a href="#" className="hover:text-cyber-cyan transition-colors">Privacy_Layer</a></li>
              <li><a href="#" className="hover:text-cyber-cyan transition-colors">Terms_Of_Usage</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4">
          <p className="font-mono text-[8px] text-white/20 uppercase tracking-[0.5em]">
            © 2026 DoTv_CyberSystems // All Rights Reserved
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-mono text-[8px] text-white/20 hover:text-white uppercase tracking-widest transition-colors">[YouTube]</a>
            <a href="#" className="font-mono text-[8px] text-white/20 hover:text-white uppercase tracking-widest transition-colors">[X]</a>
            <a href="#" className="font-mono text-[8px] text-white/20 hover:text-white uppercase tracking-widest transition-colors">[Discord]</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
