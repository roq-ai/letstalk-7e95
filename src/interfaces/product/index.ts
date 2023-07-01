import { OrderInterface } from 'interfaces/order';
import { StockInterface } from 'interfaces/stock';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface ProductInterface {
  id?: string;
  name: string;
  description?: string;
  image?: string;
  company_id?: string;
  created_at?: any;
  updated_at?: any;
  order?: OrderInterface[];
  stock?: StockInterface[];
  company?: CompanyInterface;
  _count?: {
    order?: number;
    stock?: number;
  };
}

export interface ProductGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  image?: string;
  company_id?: string;
}
