-- Add role field to users table for admin functionality
ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin'));

-- Update RLS policies to allow admin access
CREATE POLICY "Admins can view all users" ON users FOR SELECT USING (
  auth.uid() IN (
    SELECT id FROM users WHERE role = 'admin'
  )
);

CREATE POLICY "Admins can update all users" ON users FOR UPDATE USING (
  auth.uid() IN (
    SELECT id FROM users WHERE role = 'admin'
  )
);

-- Allow admins to manage all products
CREATE POLICY "Admins can manage all products" ON products FOR ALL USING (
  auth.uid() IN (
    SELECT id FROM users WHERE role = 'admin'
  )
);

-- Allow admins to manage all orders
CREATE POLICY "Admins can manage all orders" ON orders FOR ALL USING (
  auth.uid() IN (
    SELECT id FROM users WHERE role = 'admin'
  )
);

-- Allow admins to manage custom design requests
CREATE POLICY "Admins can manage custom designs" ON custom_design_requests FOR ALL USING (
  auth.uid() IN (
    SELECT id FROM users WHERE role = 'admin'
  )
);