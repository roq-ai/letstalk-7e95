import { OrderInterface } from 'interfaces/order';
import { GetQueryInterface } from 'interfaces';

export interface ShippingInterface {
  id?: string;
  order_id?: string;
  address: string;
  created_at?: any;
  updated_at?: any;

  order?: OrderInterface;
  _count?: {};
}

export interface ShippingGetQueryInterface extends GetQueryInterface {
  id?: string;
  order_id?: string;
  address?: string;
}
