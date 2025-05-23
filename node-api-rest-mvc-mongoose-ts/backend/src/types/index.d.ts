/// <reference path="./index.d.js" />

// create an enum for status publish and unpublish

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
}

export interface ProductContract {
  name: string;
  slug: string;
  regular_price: number;
  sale_price?: number;
  on_sale: boolean;
  price: number;
  categories: Category[];
  images: Image[];
  description?: string;
  short_description?: string;
  attributes?: Atribute[];
  tags: Tags[];
  stock_status: StockStatus;
  stock_quantity: number;
  sku: string;
  type:ProductType;
  status: ProductStatus;
  catalog_visibility: CatalogVisibility;
  featured: boolean;
  downloadable: boolean;
  virtual: boolean;
  date_created: Date;
  date_modified: Date;
}

export interface Atribute {
  id: number
  name: string
  options: string[]
}
export interface Category {
  id: number
  name: string
  slug: string
}

export interface Tags {
  id: number
  name: string
  slug: string
}

export interface Image {
  id: number
  src: string
  alt?: string
}

export enum StockStatus {
  InStock = 'instock',
  OutOfStock = 'outofstock',
  OnBackOrder = 'onbackorder',
}

export enum ProductType {
  Simple = 'simple',
  Variable = 'variable'
}

export enum ProductStatus {
  Publish = 'publish',
  Draft = 'draft',
  Pending ='pending'
}

export enum CatalogVisibility {
  Visible = 'visible',
  Catalog = 'catalog',
  Search ='search',
  Hidden = 'hidden'
}

export interface ProductResponse {
  success: boolean,
  data?: ProductContract
  error?: string
} 
