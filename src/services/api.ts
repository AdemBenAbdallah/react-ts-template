import axios from "axios";
import Config from "../common/config/Config";

export const api = axios.create({
  baseURL: Config.getInstance().API_URL,
});
