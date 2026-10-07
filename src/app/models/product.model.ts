export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string; // optional not all the product have an assigned brand
  thumbnail: string;
  dimensions: Dimension;
}
export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
export interface Dimension {
  width: number;
  height: number;
  depth: number;
}
