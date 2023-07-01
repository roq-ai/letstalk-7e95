const mapping: Record<string, string> = {
  companies: 'company',
  orders: 'order',
  products: 'product',
  shippings: 'shipping',
  stocks: 'stock',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
