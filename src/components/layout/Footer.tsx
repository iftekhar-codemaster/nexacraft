export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">NexaCraft</h3>
            <p className="text-gray-400">
              Premium 3D t-shirt designs with immersive shopping experience.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/products" className="hover:text-white">All Products</a></li>
              <li><a href="/collections" className="hover:text-white">Collections</a></li>
              <li><a href="/custom-design" className="hover:text-white">Custom Design</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/shipping" className="hover:text-white">Shipping Info</a></li>
              <li><a href="/returns" className="hover:text-white">Returns</a></li>
              <li><a href="/size-guide" className="hover:text-white">Size Guide</a></li>
              <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/about" className="hover:text-white">About</a></li>
              <li><a href="/careers" className="hover:text-white">Careers</a></li>
              <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 NexaCraft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}