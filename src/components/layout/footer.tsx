export default function Footer() {
  return (
    <footer className="bg-black text-white pt-24 pb-12 mt-auto border-t border-black">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
        
        {/* Customer Help */}
        <div>
          <h4 className="text-xs uppercase tracking-widest font-bold mb-6 font-heading">Customer Help</h4>
          <ul className="space-y-4 text-sm text-neutral-400">
            <li><a href="/faq" className="hover:text-white transition-colors">FAQs</a></li>
            <li><a href="/shipping" className="hover:text-white transition-colors">Shipping & Returns</a></li>
            <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="/warranty" className="hover:text-white transition-colors">Lifetime Warranty</a></li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h4 className="text-xs uppercase tracking-widest font-bold mb-6 font-heading">About Qelvoryn</h4>
          <ul className="space-y-4 text-sm text-neutral-400">
            <li><a href="/about" className="hover:text-white transition-colors">Our Story</a></li>
            <li><a href="/shop" className="hover:text-white transition-colors">Shop All</a></li>
            <li><a href="/materials" className="hover:text-white transition-colors">Materials</a></li>
          </ul>
        </div>

        {/* Mission */}
        <div>
          <h4 className="text-xs uppercase tracking-widest font-bold mb-6 font-heading">Our Mission</h4>
          <p className="text-neutral-400 text-sm leading-relaxed pr-4">
            Jewelry designed for the relentless. We build pieces that endure every environment, so you can live without limits. Sweat, swim, and thrive.
          </p>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-xs uppercase tracking-widest font-bold mb-6 font-heading">Join The Club</h4>
          <p className="text-sm text-neutral-400 mb-4">Subscribe for exclusive drops and VIP access.</p>
          <form className="flex w-full">
            <input 
              type="email" 
              placeholder="EMAIL ADDRESS" 
              className="w-full px-4 py-3 bg-white text-black outline-none text-xs font-bold placeholder-neutral-500 rounded-none"
              required
            />
            <button 
              type="submit" 
              className="bg-neutral-800 text-white px-6 py-3 text-xs uppercase tracking-wider font-bold hover:bg-neutral-700 transition-colors rounded-none border-l border-neutral-700"
            >
              Join
            </button>
          </form>
        </div>

      </div>
      <div className="container mx-auto px-6 md:px-12 mt-24 pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500 font-medium">
        <p>&copy; {new Date().getFullYear()} QELVORYN. JEWELRY WITHOUT LIMITS.</p>
        <div className="flex gap-6 mt-4 md:mt-0 uppercase tracking-widest">
          <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
          <a href="/terms" className="hover:text-white transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
