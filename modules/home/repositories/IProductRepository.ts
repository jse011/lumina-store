import { Product } from '../models';

export interface IProductRepository {
  getProducts(): Promise<Product[]>;
  saveProduct(product: Product): Promise<void>;
}
