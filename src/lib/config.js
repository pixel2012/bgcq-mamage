export const debug = process.env.NODE_ENV !== "production";
export const ipA0 = "http://172.23.161.5:8003";
export const ipB0 = "http://www.pcApi.boguchuanqi.com";
export const ip = debug ? ipA0 : ipB0;
export default {
  debug,
  ipA0,
  ipB0,
  ip
};
