# NexaCraft Admin Panel

A comprehensive admin panel for managing the NexaCraft e-commerce platform.

## Features

### 🏠 Dashboard
- Overview statistics (products, orders, users, revenue)
- Recent orders and top-selling products
- Quick action buttons for common tasks

### 📦 Product Management
- View all products with filtering and search
- Add, edit, and delete products
- Product status management (active/inactive)
- Stock and pricing management
- Category and sales analytics

### 🛒 Order Management
- View and manage all orders
- Order status updates (pending → processing → shipped → delivered)
- Order details with customer information
- Shipping address management
- Revenue tracking

### 👥 User Management
- View all registered users
- User activity tracking
- Order history per user
- User status management
- Customer analytics

### 🎨 Custom Design Requests
- Review and manage custom design submissions
- Status updates (pending → approved → in progress → completed)
- Customer communication via comments
- Design approval workflow
- Revenue tracking for custom orders

### ⚙️ Settings
- Store information configuration
- Payment gateway settings (Stripe)
- Email/SMTP configuration
- Security settings
- Design upload preferences
- System maintenance options

## Access

Navigate to `/admin` to access the admin panel.

## Technical Implementation

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **State Management**: React Context (for cart)
- **UI Components**: Custom component library

## Database Schema

The admin panel works with the following database tables:
- `users` - Customer information
- `products` - Product catalog
- `orders` - Order management
- `order_items` - Order line items
- `custom_design_requests` - Custom design submissions
- `reviews` - Product reviews
- `cart` & `cart_items` - Shopping cart data

## Security

- Row Level Security (RLS) enabled on all tables
- Admin role-based access control
- Secure API endpoints
- Input validation and sanitization

## Future Enhancements

- [ ] Real-time notifications
- [ ] Advanced analytics and reporting
- [ ] Bulk operations for products/orders
- [ ] Export functionality (CSV/PDF)
- [ ] Admin user management
- [ ] Audit logs
- [ ] Email templates and automation
- [ ] Inventory management system
- [ ] Multi-language support