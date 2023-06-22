const BASE_URL = process.env.APP_BACKEND_URL ?? 'http://localhost:8080/api';

export const ALL_PRODUCTS_API = BASE_URL + '/product/all';
export const PRODUCT_API = BASE_URL + '/product/';