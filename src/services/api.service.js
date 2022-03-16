import axios from "axios";
import { environment } from "../environment";

const instance = axios.create({
  baseURL: environment,
});

export default instance;