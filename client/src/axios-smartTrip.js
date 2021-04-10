import axios from "axios";
import config from "./config/config";

const instance = axios.create({
  baseURL: config.serverUrl,
});

export default instance;
