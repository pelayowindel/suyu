export type Store = {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
};

export type Category = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  is_available: boolean;
  category_id: string | null;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
};

export type CustomerOrder = {
  id: string;
  type: string;
  status: string;
  total: number;
  notes: string | null;
  delivery_address: string | null;
  created_at: string;
  stores: { name: string } | null;
};

export type RiderOrder = {
  id: string;
  type: string;
  status: string;
  total: number;
  delivery_address: string | null;
  notes: string | null;
  created_at: string;
  users: { full_name: string } | null;
  stores: { name: string } | null;
};

export type OrderDetail = {
  id: string;
  type: string;
  status: string;
  total: number;
  subtotal: number;
  delivery_fee: number;
  delivery_address: string | null;
  notes: string | null;
  created_at: string;
  users: { full_name: string; phone: string | null } | null;
  stores: { name: string } | null;
  order_items: OrderItem[];
};

export type ActiveOrder = {
  id: string;
  status: string;
  total: number;
  delivery_address: string | null;
  notes: string | null;
  users: { full_name: string; phone: string | null } | null;
  stores: { name: string } | null;
};
