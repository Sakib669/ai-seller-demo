export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  description?: string;
  count?: number;
}

export interface ProductVariantItem {
  id: string;
  productId: string;
  title: string;
  duration?: string;
  screenType?: string;
  price: number;
  originalPrice?: number;
  stockCount: number;
  isAvailable: boolean;
}

export interface ProductItem {
  id: string;
  title: string;
  slug: string;
  shortDesc?: string;
  description?: string;
  categoryId: string;
  categoryName?: string;
  badge?: string;
  isFeatured: boolean;
  inStock: boolean;
  imageUrl?: string;
  minPrice: number;
  maxPrice: number;
  variants: ProductVariantItem[];
}

export interface CartItem {
  cartId: string;
  productId: string;
  variantId: string;
  productTitle: string;
  variantTitle: string;
  imageUrl?: string;
  unitPrice: number;
  quantity: number;
}
