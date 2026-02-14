'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Search,
  Filter,
  Eye,
  User,
  Mail,
  Calendar,
  DollarSign,
  ShoppingBag,
  Star
} from 'lucide-react'

// Mock user data - in real app, this would come from Supabase
const mockUsers = [
  {
    id: '1',
    email: 'john@example.com',
    full_name: 'John Doe',
    currency_preference: 'USD',
    created_at: '2024-01-10',
    last_login: '2024-01-15',
    total_orders: 5,
    total_spent: 425.50,
    status: 'active'
  },
  {
    id: '2',
    email: 'jane@example.com',
    full_name: 'Jane Smith',
    currency_preference: 'BDT',
    created_at: '2024-01-08',
    last_login: '2024-01-14',
    total_orders: 3,
    total_spent: 26700,
    status: 'active'
  },
  {
    id: '3',
    email: 'mike@example.com',
    full_name: 'Mike Johnson',
    currency_preference: 'USD',
    created_at: '2024-01-05',
    last_login: '2024-01-12',
    total_orders: 8,
    total_spent: 678.25,
    status: 'active'
  },
  {
    id: '4',
    email: 'sarah@example.com',
    full_name: 'Sarah Wilson',
    currency_preference: 'USD',
    created_at: '2024-01-03',
    last_login: null,
    total_orders: 0,
    total_spent: 0,
    status: 'inactive'
  }
]

export default function AdminUsers() {
  const [users, setUsers] = useState(mockUsers)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedUser, setSelectedUser] = useState<any>(null)

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = !statusFilter || user.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user =>
      user.id === userId
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ))
  }

  const userStats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    totalOrders: users.reduce((sum, u) => sum + u.total_orders, 0),
    totalRevenue: users.reduce((sum, u) => sum + u.total_spent, 0),
    averageOrderValue: users.length > 0
      ? users.reduce((sum, u) => sum + u.total_spent, 0) / users.reduce((sum, u) => sum + u.total_orders, 0)
      : 0
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.total}</div>
              <p className="text-xs text-muted-foreground">
                {userStats.active} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">Across all users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${userStats.totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Lifetime value</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${userStats.averageOrderValue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">Per order</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>User List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">User</th>
                    <th className="text-left py-3 px-4 font-medium">Currency</th>
                    <th className="text-left py-3 px-4 font-medium">Orders</th>
                    <th className="text-left py-3 px-4 font-medium">Total Spent</th>
                    <th className="text-left py-3 px-4 font-medium">Last Login</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-left py-3 px-4 font-medium">Joined</th>
                    <th className="text-left py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{user.full_name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {user.currency_preference}
                        </span>
                      </td>
                      <td className="py-3 px-4">{user.total_orders}</td>
                      <td className="py-3 px-4">
                        {user.currency_preference === 'USD' ? '$' : '৳'}
                        {user.total_spent.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        {user.last_login
                          ? new Date(user.last_login).toLocaleDateString()
                          : 'Never'
                        }
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedUser(user)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleUserStatus(user.id)}
                          >
                            {user.status === 'active' ? 'Deactivate' : 'Activate'}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No users found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* User Details Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">User Details</h2>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <User className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Basic Information</h3>
                    <p><strong>Name:</strong> {selectedUser.full_name}</p>
                    <p><strong>Email:</strong> {selectedUser.email}</p>
                    <p><strong>Currency:</strong> {selectedUser.currency_preference}</p>
                    <p><strong>Status:</strong> {selectedUser.status}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Activity</h3>
                    <p><strong>Joined:</strong> {new Date(selectedUser.created_at).toLocaleDateString()}</p>
                    <p><strong>Last Login:</strong> {selectedUser.last_login ? new Date(selectedUser.last_login).toLocaleDateString() : 'Never'}</p>
                    <p><strong>Total Orders:</strong> {selectedUser.total_orders}</p>
                    <p><strong>Total Spent:</strong> {selectedUser.currency_preference === 'USD' ? '$' : '৳'}{selectedUser.total_spent.toLocaleString()}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Recent Orders</h3>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="text-gray-600">Order history would be displayed here</p>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button variant="outline" onClick={() => setSelectedUser(null)}>
                    Close
                  </Button>
                  <Button>
                    Edit User
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}