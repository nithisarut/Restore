import axios, { AxiosError } from "axios";

import { toast } from "react-toastify";

import { history } from "../../main";
import Basket from "./basket.axios";
import Catalog from "./catalog.axios";
import TestError from "./test_error.axios";
import { PaginatedResponse } from "../models/Pagination";
import Account from "./account";
import { store } from "../store/store.config";
import Order from "./order";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.defaults.withCredentials = true;

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

const ResponseBody = (res: any) => res.data;

axios.interceptors.request.use((config: any) => {
  const token = store.getState().account.user?.token; //เรียกใช้ State โดยตรง
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (res) => {
    if (import.meta.env.VITE_ENV_MODE === "development") await sleep();
    const pagination = res.headers["pagination"]; //ส่งมำจำก ProductController
    if (pagination) {
      res.data = new PaginatedResponse(res.data, JSON.parse(pagination));
    }
    return res;
  },
  (err: AxiosError) => {
    var data = err.response?.data;
    var json = JSON.stringify(data);
    var result = JSON.parse(json);

    switch (result.status) {
      case 400:
        if (result.errors) {
          const modelStateErrors: string[] = [];
          for (const key in result.errors)
            if (result.errors[key]) modelStateErrors.push(result.errors[key]);
          throw modelStateErrors.flat();
        }
        toast.error(result.title);
        break;
      case 401:
        toast.error(result.title);
        break;
      case 404:
        toast.error(result.title);
        break;
      case 500:
        toast.error(result.title);
        history.push("/server-error", { state: result });
        break;
      default:
        break;
    }
  }
);

export const req = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(ResponseBody),
  post: (url: string, body: object = {}) =>
    axios.post(url, body).then(ResponseBody),
  delete: (url: string) => axios.delete(url).then(ResponseBody),
};

const Payments = {
  createPaymentIntent: () => req.post('apipayments', {})
}


export default {
  Catalog,
  TestError,
  Basket,
  Account,
  Order,
  Payments
};
