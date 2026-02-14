'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, User, Search, Menu } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'

export default function Header() {
  const [currency, setCurrency] = useState<'USD' | 'BDT'>('USD')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { state } = useCart()
  const { itemCount } = state

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900">
            NexaCraft
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/products" className="text-gray-700 hover:text-gray-900">
              Products
            </Link>
            <Link href="/collections" className="text-gray-700 hover:text-gray-900">
              Collections
            </Link>
            <Link href="/custom-design" className="text-gray-700 hover:text-gray-900">
              Custom Design
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900">
              About
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Currency Selector */}
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as 'USD' | 'BDT')}
              className="bg-gray-50 border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value="USD">USD</option>
              <option value="BDT">BDT</option>
            </select>

            {/* Search */}
            <button className="p-2 text-gray-700 hover:text-gray-900">
              <Search className="h-5 w-5" />
            </button>

            {/* Cart */}
            <Link href="/cart" className="p-2 text-gray-700 hover:text-gray-900 relative">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>

            {/* User Account */}
            <Link href="/account" className="p-2 text-gray-700 hover:text-gray-900">
              <User className="h-5 w-5" />
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-gray-900"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/products" className="text-gray-700 hover:text-gray-900">
                Products
              </Link>
              <Link href="/collections" className="text-gray-700 hover:text-gray-900">
                Collections
              </Link>
              <Link href="/custom-design" className="text-gray-700 hover:text-gray-900">
                Custom Design
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-gray-900">
                About
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}