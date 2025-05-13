export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
  }
  
  export interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    categories: Category[];
    images: Image[];
    description?: string;
    short_description?: string;
    stock_status: 'instock' | 'outofstock' | 'onbackorder';
    stock_quantity: number;
    sku: string;
  }
  
  export interface Category {
    id: number;
    name: string;
    slug: string;
  }
  
  export interface Image {
    id: number;
    src: string;
    name: string;
    alt?: string;
  }