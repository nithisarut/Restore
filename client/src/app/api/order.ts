import { req } from "./agent";

const Order = {
  list: () => req.get("apiorders"),
  fetch: (id: number) => req.get(`apiorders/${id}`),
  create: (values: any) => req.post("apiorders", values),
};

export default Order;
