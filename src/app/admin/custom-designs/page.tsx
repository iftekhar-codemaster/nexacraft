'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Palette,
  MessageSquare,
  Image as ImageIcon
} from 'lucide-react'

// Mock custom design data - in real app, this would come from Supabase
const mockDesigns = [
  {
    id: 'DES-001',
    customer: 'Alice Johnson',
    email: 'alice@example.com',
    description: 'Custom dragon design for black t-shirt',
    status: 'pending',
    estimated_price_usd: 75,
    estimated_price_bdt: 6375,
    quantity: 5,
    size: 'L',
    placement: 'Center chest',
    colors: 'Black and gold',
    reference_images: ['image1.jpg', 'image2.jpg'],
    created_at: '2024-01-14',
    comments: []
  },
  {
    id: 'DES-002',
    customer: 'Bob Smith',
    email: 'bob@example.com',
    description: 'Minimalist line art portrait',
    status: 'approved',
    estimated_price_usd: 60,
    estimated_price_bdt: 5100,
    quantity: 3,
    size: 'M',
    placement: 'Full back',
    colors: 'White ink on navy',
    reference_images: ['portrait.jpg'],
    created_at: '2024-01-13',
    comments: ['Looks great! We can start production.']
  },
  {
    id: 'DES-003',
    customer: 'Carol Davis',
    email: 'carol@example.com',
    description: 'Vintage band logo recreation',
    status: 'in_progress',
    estimated_price_usd: 45,
    estimated_price_bdt: 3825,
    quantity: 10,
    size: 'XL',
    placement: 'Left chest',
    colors: 'Red and white',
    reference_images: ['logo_ref.png'],
    created_at: '2024-01-12',
    comments: ['Working on the vectorization', 'Should be ready by tomorrow']
  },
  {
    id: 'DES-004',
    customer: 'David Wilson',
    email: 'david@example.com',
    description: 'Abstract geometric pattern',
    status: 'rejected',
    estimated_price_usd: 55,
    estimated_price_bdt: 4675,
    quantity: 2,
    size: 'S',
    placement: 'Full front',
    colors: 'Multi-color',
    reference_images: ['pattern.jpg'],
    created_at: '2024-01-11',
    comments: ['Design too complex for our current printing capabilities']
  }
]

const statusOptions = [
  { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  { value: 'approved', label: 'Approved', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  { value: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-800', icon: XCircle },
  { value: 'in_progress', label: 'In Progress', color: 'bg-blue-100 text-blue-800', icon: Palette },
  { value: 'completed', label: 'Completed', color: 'bg-purple-100 text-purple-800', icon: CheckCircle }
]

export default function AdminCustomDesigns() {
  const [designs, setDesigns] = useState(mockDesigns)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [selectedDesign, setSelectedDesign] = useState<any>(null)
  const [showComments, setShowComments] = useState<string | null>(null)

  const filteredDesigns = designs.filter(design => {
    const matchesSearch = design.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         design.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         design.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         design.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = !statusFilter || design.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const updateDesignStatus = (designId: string, newStatus: string) => {
    setDesigns(designs.map(design =>
      design.id === designId ? { ...design, status: newStatus } : design
    ))
  }

  const addComment = (designId: string, comment: string) => {
    setDesigns(designs.map(design =>
      design.id === designId
        ? { ...design, comments: [...design.comments, comment] }
        : design
    ))
  }

  const designStats = {
    total: designs.length,
    pending: designs.filter(d => d.status === 'pending').length,
    approved: designs.filter(d => d.status === 'approved').length,
    in_progress: designs.filter(d => d.status === 'in_progress').length,
    completed: designs.filter(d => d.status === 'completed').length,
    rejected: designs.filter(d => d.status === 'rejected').length,
    totalRevenue: designs
      .filter(d => d.status === 'approved' || d.status === 'in_progress' || d.status === 'completed')
      .reduce((sum, d) => sum + d.estimated_price_usd * d.quantity, 0)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Custom Designs</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
              <Palette className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{designStats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{designStats.pending}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{designStats.approved}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Palette className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{designStats.in_progress}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{designStats.completed}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{designStats.rejected}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <Palette className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${designStats.totalRevenue.toFixed(2)}</div>
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
                    placeholder="Search designs..."
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
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Designs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Custom Design Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Design ID</th>
                    <th className="text-left py-3 px-4 font-medium">Customer</th>
                    <th className="text-left py-3 px-4 font-medium">Description</th>
                    <th className="text-left py-3 px-4 font-medium">Quantity</th>
                    <th className="text-left py-3 px-4 font-medium">Price</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-left py-3 px-4 font-medium">Date</th>
                    <th className="text-left py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDesigns.map((design) => {
                    const statusOption = statusOptions.find(s => s.value === design.status)
                    const StatusIcon = statusOption?.icon || Clock

                    return (
                      <tr key={design.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{design.id}</td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{design.customer}</p>
                            <p className="text-sm text-gray-600">{design.email}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 max-w-xs">
                          <p className="truncate">{design.description}</p>
                        </td>
                        <td className="py-3 px-4">{design.quantity}</td>
                        <td className="py-3 px-4">
                          <div>
                            <p>${design.estimated_price_usd}</p>
                            <p className="text-sm text-gray-600">৳{design.estimated_price_bdt}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <StatusIcon className="h-4 w-4" />
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusOption?.color}`}>
                              {statusOption?.label}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{new Date(design.created_at).toLocaleDateString()}</td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedDesign(design)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setShowComments(showComments === design.id ? null : design.id)}
                            >
                              <MessageSquare className="h-4 w-4" />
                            </Button>
                            <select
                              value={design.status}
                              onChange={(e) => updateDesignStatus(design.id, e.target.value)}
                              className="px-2 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                              {statusOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {filteredDesigns.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No custom designs found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Design Details Modal */}
        {selectedDesign && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Design Details - {selectedDesign.id}</h2>
                <button
                  onClick={() => setSelectedDesign(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Customer Information</h3>
                    <p><strong>Name:</strong> {selectedDesign.customer}</p>
                    <p><strong>Email:</strong> {selectedDesign.email}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Design Details</h3>
                    <p><strong>Description:</strong> {selectedDesign.description}</p>
                    <p><strong>Placement:</strong> {selectedDesign.placement}</p>
                    <p><strong>Colors:</strong> {selectedDesign.colors}</p>
                    <p><strong>Size:</strong> {selectedDesign.size}</p>
                    <p><strong>Quantity:</strong> {selectedDesign.quantity}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Pricing</h3>
                    <p><strong>Unit Price:</strong> ${selectedDesign.estimated_price_usd} (৳{selectedDesign.estimated_price_bdt})</p>
                    <p><strong>Total:</strong> ${(selectedDesign.estimated_price_usd * selectedDesign.quantity).toFixed(2)}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Reference Images</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedDesign.reference_images.map((image: string, index: number) => (
                        <div key={index} className="border border-gray-300 rounded p-4 flex items-center justify-center">
                          <div className="text-center">
                            <ImageIcon className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-600">{image}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Comments</h3>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {selectedDesign.comments.map((comment: string, index: number) => (
                        <div key={index} className="bg-gray-50 p-2 rounded text-sm">
                          {comment}
                        </div>
                      ))}
                      {selectedDesign.comments.length === 0 && (
                        <p className="text-gray-500 text-sm">No comments yet</p>
                      )}
                    </div>
                    <div className="mt-2">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addComment(selectedDesign.id, e.currentTarget.value)
                            e.currentTarget.value = ''
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <Button variant="outline" onClick={() => setSelectedDesign(null)}>
                  Close
                </Button>
                <Button>
                  Update Design
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}