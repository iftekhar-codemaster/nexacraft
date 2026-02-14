'use client'

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Package,
  ShoppingCart,
  Users,
  Palette,
  TrendingUp,
  DollarSign,
  Eye,
  Star
} from 'lucide-react'

// Mock data - in real app, this would come from Supabase
const mockStats = {
  totalProducts: 45,
  totalOrders: 128,
  totalUsers: 892,
  pendingDesigns: 12,
  totalRevenue: 15420,
  monthlyRevenue: 3240,
  averageOrderValue: 120.5,
  conversionRate: 3.2
}

const recentOrders = [
  {
    id: 'ORD-001',
    customer: 'John Doe',
    amount: 145.99,
    currency: 'USD',
    status: 'processing',
    date: '2024-01-15'
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    amount: 8900,
    currency: 'BDT',
    status: 'shipped',
    date: '2024-01-14'
  },
  {
    id: 'ORD-003',
    customer: 'Mike Johnson',
    amount: 89.99,
    currency: 'USD',
    status: 'delivered',
    date: '2024-01-13'
  }
]

const topProducts = [
  { name: 'Urban Street Art', sales: 45, revenue: 2025 },
  { name: 'Minimalist Geometric', sales: 38, revenue: 1710 },
  { name: 'Retro Wave', sales: 32, revenue: 1440 },
  { name: 'Abstract Pattern', sales: 28, revenue: 1260 },
  { name: 'Vintage Logo', sales: 25, revenue: 1125 }
]

export default function AdminDashboard() {
  const [stats, setStats] = useState(mockStats)

  // In real app, fetch stats from Supabase
  useEffect(() => {
    // fetchDashboardStats()
  }, [])

  const StatCard = ({ title, value, icon: Icon, change, changeType }: {
    title: string
    value: string | number
    icon: any
    change?: string
    changeType?: 'positive' | 'negative'
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className={`text-xs ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  )

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <Button>Export Report</Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Products"
            value={stats.totalProducts}
            icon={Package}
            change="+12% from last month"
            changeType="positive"
          />
          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            icon={ShoppingCart}
            change="+8% from last month"
            changeType="positive"
          />
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={Users}
            change="+15% from last month"
            changeType="positive"
          />
          <StatCard
            title="Pending Designs"
            value={stats.pendingDesigns}
            icon={Palette}
            change="-3 from yesterday"
            changeType="positive"
          />
        </div>

        {/* Revenue Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Revenue"
            value={`$${stats.totalRevenue.toLocaleString()}`}
            icon={DollarSign}
            change="+22% from last month"
            changeType="positive"
          />
          <StatCard
            title="Monthly Revenue"
            value={`$${stats.monthlyRevenue.toLocaleString()}`}
            icon={TrendingUp}
            change="+18% from last month"
            changeType="positive"
          />
          <StatCard
            title="Avg Order Value"
            value={`$${stats.averageOrderValue}`}
            icon={Eye}
            change="+5% from last month"
            changeType="positive"
          />
        </div>

        {/* Recent Orders and Top Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-gray-600">{order.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {order.currency === 'USD' ? '$' : '৳'}{order.amount}
                      </p>
                      <p className={`text-sm ${
                        order.status === 'delivered' ? 'text-green-600' :
                        order.status === 'shipped' ? 'text-blue-600' :
                        'text-yellow-600'
                      }`}>
                        {order.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Orders
              </Button>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
                        <span className="text-sm font-medium">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.sales} sales</p>
                      </div>
                    </div>
                    <p className="font-medium">${product.revenue}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Products
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-20 flex flex-col items-center justify-center space-y-2">
                <Package className="h-6 w-6" />
                <span>Add Product</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <ShoppingCart className="h-6 w-6" />
                <span>View Orders</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <Users className="h-6 w-6" />
                <span>Manage Users</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                <Palette className="h-6 w-6" />
                <span>Review Designs</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}