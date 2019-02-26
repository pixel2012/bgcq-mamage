export const user = {
  login: "/user/login"
};
export const collect = {
  lists: "/api/product/collect/list",
  add: "/api/product/collect",
  remove: "/api/product/collect"
};

export const cart = {
  lists: "/api/product/shoppingCart/list",
  changeNumber: "/api/product/shoppingCart/SaveNumber",
  remove: "/api/product/shoppingCart",
  getOrder: "/api/product/shoppingCart/queryOrder",
  createOrder: "/api/product/shoppingCart/order"
};
export const location = {
  lists: "/api/member/address/list",
  getDefault: "/api/member/address/default",
  add: "/api/member/address",
  edit: "/api/member/address/saveInfo",
  setDefault: "/api/member/address/default",
  remove: "/api/member/address"
};
export const account = {
  info: "/api/member/detail",
  balanceLists: "/api/member/balance/pagelist"
};
export const order = {
  lists: "/api/product/orders/list",
  detail: "/api/product/orders/detail",
  cancel: "/api/product/orders/cancel",
  confirm: "/api/product/orders/confirm",
  evaluate: "/api/product/orders/evaluate"
};
export const upload = {
  base64: "/api/common/uploadpictrue/base64",
  binary: "/api/common/uploadpictrue/file"
};

export default {
  user,
  order,
  collect,
  cart,
  location,
  account,
  upload
};
