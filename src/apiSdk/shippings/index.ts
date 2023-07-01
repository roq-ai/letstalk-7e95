import axios from 'axios';
import queryString from 'query-string';
import { ShippingInterface, ShippingGetQueryInterface } from 'interfaces/shipping';
import { GetQueryInterface } from '../../interfaces';

export const getShippings = async (query?: ShippingGetQueryInterface) => {
  const response = await axios.get(`/api/shippings${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createShipping = async (shipping: ShippingInterface) => {
  const response = await axios.post('/api/shippings', shipping);
  return response.data;
};

export const updateShippingById = async (id: string, shipping: ShippingInterface) => {
  const response = await axios.put(`/api/shippings/${id}`, shipping);
  return response.data;
};

export const getShippingById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/shippings/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteShippingById = async (id: string) => {
  const response = await axios.delete(`/api/shippings/${id}`);
  return response.data;
};
