import { ProductInterface } from 'interfaces/product';
import { GetQueryInterface } from 'interfaces';

export interface StockInterface {
  id?: string;
  product_id?: string;
  quantity: number;
  created_at?: any;
  updated_at?: any;

  product?: ProductInterface;
  _count?: {};
}

export interface StockGetQueryInterface extends GetQueryInterface {
  id?: string;
  product_id?: string;
}
