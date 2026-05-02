-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new'
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  homepage_image_url TEXT,
  services_image_url TEXT
);

-- Create subcategories table
CREATE TABLE IF NOT EXISTS subcategories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT
);

-- Enable RLS
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE subcategories ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Inquiries: public can insert, authenticated admin can view/update
CREATE POLICY "Public can insert inquiries" ON inquiries FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Authenticated users can select inquiries" ON inquiries FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can update inquiries" ON inquiries FOR UPDATE TO authenticated USING (true);

-- Categories: public can select, authenticated admin can all
CREATE POLICY "Public can select categories" ON categories FOR SELECT TO public USING (true);
CREATE POLICY "Authenticated users can manage categories" ON categories FOR ALL TO authenticated USING (true);

-- Subcategories: public can select, authenticated admin can all
CREATE POLICY "Public can select subcategories" ON subcategories FOR SELECT TO public USING (true);
CREATE POLICY "Authenticated users can manage subcategories" ON subcategories FOR ALL TO authenticated USING (true);

-- Insert sample categories (optional, to match the 4 main categories if needed, but they can be created in the UI)

-- Create storage bucket if not exists
INSERT INTO storage.buckets (id, name, public) VALUES ('site-assets', 'site-assets', true) ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Public Access" ON storage.objects FOR SELECT TO public USING (bucket_id = 'site-assets');
CREATE POLICY "Auth Insert" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'site-assets');
CREATE POLICY "Auth Update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'site-assets');
CREATE POLICY "Auth Delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'site-assets');
