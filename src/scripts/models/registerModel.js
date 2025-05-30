import { register as registerAPI } from "../data/api";

export async function register(data) {
  return await registerAPI(data);
}
