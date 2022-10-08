import { req } from "./agent";

const Account = {
  login: (values: any) => req.post("apiaccount/login", values),
  register: (values: any) => req.post("apiaccount/register", values),
  currentUser: () => req.get("apiaccount/currentUser"),
  fetchAddress: () => req.get('apiaccount/savedAddress')
};

export default Account;
