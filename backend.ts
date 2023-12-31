const BASE_URL = process.env.APP_BACKEND_URL ?? 'http://localhost:8080/api';

export const ALL_PRODUCTS_API = BASE_URL + '/product/all';
export const PRODUCT_API = BASE_URL + '/product/';
export const LOGIN_API = BASE_URL + '/auth/login';
export const REGISTER_API = BASE_URL + '/auth/register';
export const CREATE_ORDER_API = BASE_URL + '/order/create';
export const MY_PACKAGES_API = BASE_URL + '/order/my';
export const ALL_PICKUP_POINTS_API = BASE_URL + "/pickuppoints/all"