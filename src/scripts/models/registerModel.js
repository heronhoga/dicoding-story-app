import { register as registerAPI } from "../data/api";

export default class RegisterModel {
  async register(data) {
    return await registerAPI(data);
  }
}
