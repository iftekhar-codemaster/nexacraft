'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Layout from '@/components/layout/Layout'
import { useCart } from '@/contexts/CartContext'

export default function CartPage() {
  const { state, updateQuantity, removeItem, clearCart, setCurrency } = useCart()
  const { items, currency, total, itemCount } = state

  const currencySymbol = currency === 'USD' ? '$' : '৳'

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  if (items.length === 0) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
            <p className="text-gray-600 mb-6">Add some amazing t-shirts to get started!</p>
            <Link href="/products">
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
              <p className="text-gray-600 mt-1">
                {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as 'USD' | 'BDT')}
                className="border border-gray-300 rounded px-3 py-2 text-sm"
              >
                <option value="USD">USD</option>
                <option value="BDT">BDT</option>
              </select>

              <Button
                variant="outline"
                onClick={clearCart}
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                Clear Cart
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                {items.map((item) => (
                  <div key={item.id} className="border-b border-gray-200 last:border-b-0 p-6">
                    <div className="flex items-center space-x-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <div className="text-center">
                          <div className="w-12 h-16 bg-white border border-gray-200 rounded flex items-center justify-center">
                            <span className="text-gray-400 text-xs">3D</span>
                          </div>
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <Link href={`/products/${item.productId}`}>
                          <h3 className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                            {item.name}
                          </h3>
                        </Link>

                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                          <span>Color: {item.selectedColor}</span>
                          <span>Size: {item.selectedSize}</span>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                            >
                              <Minus className="h-4 w-4" />
                            </button>

                            <span className="w-12 text-center font-medium">{item.quantity}</span>

                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900">
                              {currencySymbol}{(item.price * item.quantity).toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-600">
                              {currencySymbol}{item.price} each
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="mt-6">
                <Link href="/products">
                  <Button variant="outline" className="flex items-center">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({itemCount} items)</span>
                    <span>{currencySymbol}{total.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>{currencySymbol}{(total * 0.1).toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{currencySymbol}{(total * 1.1).toFixed(2)}</span>
                  </div>
                </div>

                <Link href="/checkout">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3">
                    Proceed to Checkout
                  </Button>
                </Link>

                {/* Promo Code */}
                <div className="mt-4">
                  <div className="text-sm text-gray-600 mb-2">Have a promo code?</div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                    <Button variant="outline" size="sm">
                      Apply
                    </Button>
                  </div>
                </div>

                {/* Security Badges */}
                <div className="mt-6 pt-4 border-t">
                  <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                      Secure Checkout
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                      SSL Encrypted
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}