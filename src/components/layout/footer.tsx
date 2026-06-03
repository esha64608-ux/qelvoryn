export default function Footer() {
  return (
    <footer className="bg-[var(--color-offwhite)] text-[var(--color-foreground)] pt-20 pb-10 mt-auto border-t border-gray-200">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        
        {/* Customer Help */}
        <div>
          <h4 className="text-sm font-semibold mb-6">Support</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li><a href="/faq" className="hover:text-[var(--color-accent)] transition-colors">FAQs</a></li>
            <li><a href="/shipping" className="hover:text-[var(--color-accent)] transition-colors">Shipping & Returns</a></li>
            <li><a href="/contact" className="hover:text-[var(--color-accent)] transition-colors">Contact Us</a></li>
            <li><a href="/warranty" className="hover:text-[var(--color-accent)] transition-colors">Lifetime Warranty</a></li>
          </ul>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-sm font-semibold mb-6">Shop</h4>
          <ul className="space-y-3 text-sm text-gray-500">
            <li><a href="/shop" className="hover:text-[var(--color-accent)] transition-colors">Designer Toys</a></li>
            <li><a href="/shop" className="hover:text-[var(--color-accent)] transition-colors">Premium Wallets</a></li>
            <li><a href="/shop" className="hover:text-[var(--color-accent)] transition-colors">Modern Apparel</a></li>
          </ul>
        </div>

        {/* Mission */}
        <div>
          <h4 className="text-sm font-semibold mb-6">About Qelvoryn</h4>
          <p className="text-gray-500 text-sm leading-relaxed pr-4">
            Curated lifestyle essentials for the modern minimalist. Premium materials, flawless design, built to last.
          </p>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-sm font-semibold mb-6">Join The List</h4>
          <p className="text-sm text-gray-500 mb-4">Subscribe for early access to new drops.</p>
          <form className="flex w-full">
            <input 
              type="email" 
              placeholder="Email address" 
              className="w-full px-4 py-3 bg-white text-black border border-gray-200 outline-none text-sm placeholder-gray-400 focus:border-[var(--color-accent)] transition-colors rounded-l-md"
              required
            />
            <button 
              type="submit" 
              className="bg-[var(--color-accent)] text-white px-6 py-3 text-sm font-semibold hover:bg-[var(--color-accent-hover)] transition-colors rounded-r-md"
            >
              Join
            </button>
          </form>
        </div>

      </div>
      <div className="container mx-auto px-6 md:px-12 mt-20 pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} QELVORYN DIGITAL. ALL RIGHTS RESERVED.</p>
        
        {/* Payment Icons (Visual Mockup) */}
        <div className="flex items-center gap-3 mt-6 md:mt-0 opacity-70">
          <div className="w-10 h-6 bg-gray-300 rounded-sm"></div>
          <div className="w-10 h-6 bg-gray-300 rounded-sm"></div>
          <div className="w-10 h-6 bg-gray-300 rounded-sm"></div>
          <div className="w-10 h-6 bg-gray-300 rounded-sm"></div>
        </div>

        <div className="flex gap-6 mt-6 md:mt-0">
          <a href="/privacy" className="hover:text-[var(--color-accent)] transition-colors">Privacy</a>
          <a href="/terms" className="hover:text-[var(--color-accent)] transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
