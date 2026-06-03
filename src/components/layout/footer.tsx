export default function Footer() {
  return (
    <footer className="bg-[#f5f5f5] text-neutral-800 pt-24 pb-12 mt-auto">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-16">
        <div>
          <h3 className="text-xl font-bold tracking-tight mb-6">QELVORYN</h3>
          <p className="text-neutral-500 max-w-sm mb-6 text-sm leading-relaxed">
            Premium digital products designed to elevate your online presence and streamline your workflow.
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest font-semibold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm text-neutral-500">
            <li><a href="/shop" className="hover:text-black transition-colors">Shop</a></li>
            <li><a href="/about" className="hover:text-black transition-colors">About Us</a></li>
            <li><a href="/contact" className="hover:text-black transition-colors">Contact</a></li>
            <li><a href="/faq" className="hover:text-black transition-colors">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-widest font-semibold mb-6">Newsletter</h4>
          <p className="text-sm text-neutral-500 mb-4">Subscribe for exclusive offers and updates.</p>
          <form className="flex border border-neutral-300">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full px-4 py-3 bg-transparent outline-none text-sm placeholder-neutral-400"
              required
            />
            <button 
              type="submit" 
              className="bg-black text-white px-6 py-3 text-xs uppercase tracking-wider font-semibold hover:bg-neutral-800 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="container mx-auto px-6 md:px-12 mt-24 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-400">
        <p>&copy; {new Date().getFullYear()} Qelvoryn Digital. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="/privacy" className="hover:text-black transition-colors">Privacy Policy</a>
          <a href="/terms" className="hover:text-black transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
