import { ShippingInterface } from 'interfaces/shipping';
import { ProductInterface } from 'interfaces/product';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrderInterface {
  id?: string;
  product_id?: string;
  user_id?: string;
  status: string;
  created_at?: any;
  updated_at?: any;
  shipping?: ShippingInterface[];
  product?: ProductInterface;
  user?: UserInterface;
  _count?: {
    shipping?: number;
  };
}

export interface OrderGetQueryInterface extends GetQueryInterface {
  id?: string;
  product_id?: string;
  user_id?: string;
  status?: string;
}
