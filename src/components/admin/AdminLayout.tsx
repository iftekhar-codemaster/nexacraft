'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Palette,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
}

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Custom Designs', href: '/admin/custom-designs', icon: Palette },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    // TODO: Implement logout logicebarOpen] = useState(false)
    router.push('/')  const [sidebarOpen, setSidebarOpen] = useState(false)
  }

  return ( = () => {
    <div className="min-h-screen bg-gray-100"> // TODO: Implement logout logic
      {/* Mobile sidebar */}    router.push('/')
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setSidebarOpen(false)} />
        <div className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow-lg">
          <div className="flex items-center justify-center h-16 px-4 border-b">
            <h2 className="text-lg font-semibold">Admin Panel</h2>
          </div> 'hidden'}`}>
          <nav className="p-4">=> setSidebarOpen(false)} />
            <ul className="space-y-2">shadow-lg">
              {navigation.map((item) => (n p-4 border-b">
                <li key={item.name}>-semibold">Admin Panel</h2>
                  <LinknClick={() => setSidebarOpen(false)}>
                    href={item.href} className="h-6 w-6" />
                    className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="h-5 w-5 mr-3" />">
                    {item.name}on.map((item) => (
                  </Link>
                </li>
              ))}
            </ul> className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
          </nav>
        </div>
      </div>.icon className="h-5 w-5 mr-3" />
item.name}
      {/* Desktop sidebar */} </Link>
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:block">/li>
        <div className="flex flex-col h-full bg-white shadow-lg">}
          <div className="flex items-center justify-center h-16 px-4 border-b">ul>
            <h1 className="text-xl font-bold text-gray-900">NexaCraft Admin</h1>nav>
          </div>        </div>
          <nav className="flex-1 px-4 py-6">
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}lassName="flex items-center justify-center h-16 px-4 border-b">
                    className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900" text-gray-900">NexaCraft Admin</h1>
                  >
                    <item.icon className="h-5 w-5 mr-3" />6">
                    {item.name}">
                  </Link>on.map((item) => (
                </li>
              ))}
            </ul> href={item.href}
          </nav> text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900"
          <div className="p-4 border-t">
            <button.icon className="h-5 w-5 mr-3" />
              onClick={handleLogout}item.name}
              className="flex items-center w-full px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100" </Link>
            >/li>
              <LogOut className="h-5 w-5 mr-3" />}
              Logout
            </button>
          </div>-t">
        </div>
      </div> onClick={handleLogout}
 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
      {/* Main content */}
      <div className="lg:pl-64"> className="h-5 w-5 mr-3" />
        {/* Top bar */}gout
        <div className="sticky top-0 z-40 bg-white shadow-sm border-b">button>
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">div>
            <button        </div>
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-500 hover:text-gray-700"
            >*/}
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex-1" />ame="sticky top-0 z-40 bg-white shadow-sm border-b">
            <div className="flex items-center space-x-4">y-between h-16 px-4 sm:px-6 lg:px-8">
              <span className="text-sm text-gray-700">Welcome, Admin</span>
            </div> onClick={() => setSidebarOpen(true)}
          </div>t-gray-500 hover:text-gray-700"
        </div>
" />
        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}lassName="flex items-center space-x-4">
        </main>pan className="text-sm text-gray-700">Welcome, Admin</span>
      </div>div>
    </div>          </div>
  )
}  )
}