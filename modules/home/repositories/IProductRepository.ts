import { Product } from '../models';

export interface IProductRepository {
  getProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | null>;
  saveProduct(product: Product): Promise<void>;
}
