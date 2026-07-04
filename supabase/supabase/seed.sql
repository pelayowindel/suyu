-- ============================================================
-- Seed data for development / testing
-- ============================================================

-- ============================================================
-- USERS
-- ============================================================
INSERT INTO public.users (id, full_name, phone, role) VALUES
  ('86e91eeb-a28c-497e-8e20-4448e253247a', 'Juan Dela Cruz', '+639171234567', 'customer'),
  ('67b6cba4-138d-48eb-84e5-421c079231c2', 'Marco Reyes', '+639181234567', 'rider'),
  ('6c176875-4edf-49b1-861c-b74113b38e09', 'Maria Santos', '+639191234567', 'merchant');

-- ============================================================
-- STORE (owned by merchant)
-- ============================================================
INSERT INTO public.stores (id, owner_id, name, description, is_active) VALUES
  ('a1b2c3d4-0001-4000-8000-000000000001', '6c176875-4edf-49b1-861c-b74113b38e09', 'Kusina ni Maria', 'Authentic Filipino home-cooked meals and snacks', true);

-- ============================================================
-- CATEGORIES
-- ============================================================
INSERT INTO public.categories (id, store_id, name, sort_order) VALUES
  ('b1b2c3d4-0001-4000-8000-000000000001', 'a1b2c3d4-0001-4000-8000-000000000001', 'Rice Meals', 1),
  ('b1b2c3d4-0002-4000-8000-000000000002', 'a1b2c3d4-0001-4000-8000-000000000001', 'Snacks', 2),
  ('b1b2c3d4-0003-4000-8000-000000000003', 'a1b2c3d4-0001-4000-8000-000000000001', 'Beverages', 3);

-- ============================================================
-- PRODUCTS
-- ============================================================
INSERT INTO public.products (id, store_id, category_id, name, description, price, is_available) VALUES
  -- Rice Meals
  ('c1b2c3d4-0001-4000-8000-000000000001', 'a1b2c3d4-0001-4000-8000-000000000001', 'b1b2c3d4-0001-4000-8000-000000000001', 'Chicken Adobo', 'Classic Filipino chicken adobo with rice', 120.00, true),
  ('c1b2c3d4-0002-4000-8000-000000000002', 'a1b2c3d4-0001-4000-8000-000000000001', 'b1b2c3d4-0001-4000-8000-000000000001', 'Pork Sinigang', 'Sour tamarind soup with pork belly and veggies, served with rice', 135.00, true),
  ('c1b2c3d4-0003-4000-8000-000000000003', 'a1b2c3d4-0001-4000-8000-000000000001', 'b1b2c3d4-0001-4000-8000-000000000001', 'Bangus Sisig', 'Crispy milkfish sisig with egg on a sizzling plate, served with rice', 140.00, true),
  ('c1b2c3d4-0004-4000-8000-000000000004', 'a1b2c3d4-0001-4000-8000-000000000001', 'b1b2c3d4-0001-4000-8000-000000000001', 'Kare-Kare', 'Oxtail stew in peanut sauce with veggies and bagoong, served with rice', 160.00, true),
  -- Snacks
  ('c1b2c3d4-0005-4000-8000-000000000005', 'a1b2c3d4-0001-4000-8000-000000000001', 'b1b2c3d4-0002-4000-8000-000000000002', 'Lumpiang Shanghai', '10 pcs crispy fried spring rolls with sweet chili sauce', 80.00, true),
  ('c1b2c3d4-0006-4000-8000-000000000006', 'a1b2c3d4-0001-4000-8000-000000000001', 'b1b2c3d4-0002-4000-8000-000000000002', 'Kwek-Kwek', '8 pcs deep-fried quail eggs in orange batter with vinegar dip', 50.00, true),
  ('c1b2c3d4-0007-4000-8000-000000000007', 'a1b2c3d4-0001-4000-8000-000000000001', 'b1b2c3d4-0002-4000-8000-000000000002', 'Banana Cue', '3 pcs caramelized saba banana on sticks', 40.00, true),
  -- Beverages
  ('c1b2c3d4-0008-4000-8000-000000000008', 'a1b2c3d4-0001-4000-8000-000000000001', 'b1b2c3d4-0003-4000-8000-000000000003', 'Sago''t Gulaman', 'Sweet tapioca pearls and jelly drink', 35.00, true),
  ('c1b2c3d4-0009-4000-8000-000000000009', 'a1b2c3d4-0001-4000-8000-000000000001', 'b1b2c3d4-0003-4000-8000-000000000003', 'Calamansi Juice', 'Freshly squeezed calamansi with honey', 30.00, true),
  ('c1b2c3d4-0010-4000-8000-000000000010', 'a1b2c3d4-0001-4000-8000-000000000001', 'b1b2c3d4-0003-4000-8000-000000000003', 'Iced Coffee', 'Local brewed barako coffee over ice', 45.00, true);
