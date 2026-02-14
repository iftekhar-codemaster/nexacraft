'use client'

import { useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  Save,
  Store,
  CreditCard,
  Mail,
  Shield,
  Palette,
  Globe,
  Database
} from 'lucide-react'

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    store: {
      name: 'NexaCraft',
      description: 'Premium 3D T-shirt Designs',
      email: 'admin@nexacraft.com',
      phone: '+1 (555) 123-4567',
      address: '123 Design Street, Creative City, CC 12345'
    },
    payment: {
      stripePublishableKey: '',
      stripeSecretKey: '',
      paypalClientId: '',
      paypalSecret: '',
      currency: 'USD',
      taxRate: 8.25
    },
    email: {
      smtpHost: '',
      smtpPort: 587,
      smtpUser: '',
      smtpPassword: '',
      fromEmail: 'noreply@nexacraft.com',
      fromName: 'NexaCraft'
    },
    security: {
      sessionTimeout: 24,
      passwordMinLength: 8,
      twoFactorEnabled: false,
      loginAttempts: 5
    },
    design: {
      maxFileSize: 10,
      allowedFormats: ['jpg', 'png', 'svg'],
      defaultCurrency: 'USD',
      enableCustomDesigns: true
    },
    system: {
      maintenanceMode: false,
      debugMode: false,
      logLevel: 'info',
      backupFrequency: 'daily'
    }
  })

  const handleSave = (section: string) => {
    // In real app, save to Supabase
    alert(`${section} settings saved successfully!`)
  }

  const updateSetting = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }))
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        </div>

        {/* Store Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Store className="h-5 w-5 mr-2" />
              Store Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Store Name
                </label>
                <input
                  type="text"
                  value={settings.store.name}
                  onChange={(e) => updateSetting('store', 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Store Email
                </label>
                <input
                  type="email"
                  value={settings.store.email}
                  onChange={(e) => updateSetting('store', 'email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={settings.store.phone}
                  onChange={(e) => updateSetting('store', 'phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Default Currency
                </label>
                <select
                  value={settings.payment.currency}
                  onChange={(e) => updateSetting('payment', 'currency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="USD">USD ($)</option>
                  <option value="BDT">BDT (৳)</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Store Description
              </label>
              <textarea
                value={settings.store.description}
                onChange={(e) => updateSetting('store', 'description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Store Address
              </label>
              <textarea
                value={settings.store.address}
                onChange={(e) => updateSetting('store', 'address', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <Button onClick={() => handleSave('Store')}>
              <Save className="h-4 w-4 mr-2" />
              Save Store Settings
            </Button>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Payment Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stripe Publishable Key
                </label>
                <input
                  type="password"
                  value={settings.payment.stripePublishableKey}
                  onChange={(e) => updateSetting('payment', 'stripePublishableKey', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="pk_test_..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stripe Secret Key
                </label>
                <input
                  type="password"
                  value={settings.payment.stripeSecretKey}
                  onChange={(e) => updateSetting('payment', 'stripeSecretKey', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="sk_test_..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tax Rate (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={settings.payment.taxRate}
                  onChange={(e) => updateSetting('payment', 'taxRate', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <Button onClick={() => handleSave('Payment')}>
              <Save className="h-4 w-4 mr-2" />
              Save Payment Settings
            </Button>
          </CardContent>
        </Card>

        {/* Email Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              Email Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SMTP Host
                </label>
                <input
                  type="text"
                  value={settings.email.smtpHost}
                  onChange={(e) => updateSetting('email', 'smtpHost', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="smtp.gmail.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SMTP Port
                </label>
                <input
                  type="number"
                  value={settings.email.smtpPort}
                  onChange={(e) => updateSetting('email', 'smtpPort', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SMTP Username
                </label>
                <input
                  type="text"
                  value={settings.email.smtpUser}
                  onChange={(e) => updateSetting('email', 'smtpUser', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SMTP Password
                </label>
                <input
                  type="password"
                  value={settings.email.smtpPassword}
                  onChange={(e) => updateSetting('email', 'smtpPassword', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <Button onClick={() => handleSave('Email')}>
              <Save className="h-4 w-4 mr-2" />
              Save Email Settings
            </Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Session Timeout (hours)
                </label>
                <input
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password Min Length
                </label>
                <input
                  type="number"
                  value={settings.security.passwordMinLength}
                  onChange={(e) => updateSetting('security', 'passwordMinLength', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Login Attempts
                </label>
                <input
                  type="number"
                  value={settings.security.loginAttempts}
                  onChange={(e) => updateSetting('security', 'loginAttempts', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="twoFactor"
                  checked={settings.security.twoFactorEnabled}
                  onChange={(e) => updateSetting('security', 'twoFactorEnabled', e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="twoFactor" className="ml-2 block text-sm text-gray-900">
                  Enable Two-Factor Authentication
                </label>
              </div>
            </div>
            <Button onClick={() => handleSave('Security')}>
              <Save className="h-4 w-4 mr-2" />
              Save Security Settings
            </Button>
          </CardContent>
        </Card>

        {/* Design Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="h-5 w-5 mr-2" />
              Design Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max File Size (MB)
                </label>
                <input
                  type="number"
                  value={settings.design.maxFileSize}
                  onChange={(e) => updateSetting('design', 'maxFileSize', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Allowed Formats
                </label>
                <input
                  type="text"
                  value={settings.design.allowedFormats.join(', ')}
                  onChange={(e) => updateSetting('design', 'allowedFormats', e.target.value.split(', '))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="jpg, png, svg"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="customDesigns"
                  checked={settings.design.enableCustomDesigns}
                  onChange={(e) => updateSetting('design', 'enableCustomDesigns', e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="customDesigns" className="ml-2 block text-sm text-gray-900">
                  Enable Custom Design Requests
                </label>
              </div>
            </div>
            <Button onClick={() => handleSave('Design')}>
              <Save className="h-4 w-4 mr-2" />
              Save Design Settings
            </Button>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="h-5 w-5 mr-2" />
              System Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Log Level
                </label>
                <select
                  value={settings.system.logLevel}
                  onChange={(e) => updateSetting('system', 'logLevel', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="error">Error</option>
                  <option value="warn">Warning</option>
                  <option value="info">Info</option>
                  <option value="debug">Debug</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Backup Frequency
                </label>
                <select
                  value={settings.system.backupFrequency}
                  onChange={(e) => updateSetting('system', 'backupFrequency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="maintenance"
                  checked={settings.system.maintenanceMode}
                  onChange={(e) => updateSetting('system', 'maintenanceMode', e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="maintenance" className="ml-2 block text-sm text-gray-900">
                  Maintenance Mode
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="debug"
                  checked={settings.system.debugMode}
                  onChange={(e) => updateSetting('system', 'debugMode', e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="debug" className="ml-2 block text-sm text-gray-900">
                  Debug Mode
                </label>
              </div>
            </div>
            <Button onClick={() => handleSave('System')}>
              <Save className="h-4 w-4 mr-2" />
              Save System Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}