import axios from "axios";
import { environment } from "../environment";

const public_axios = axios.create({
  baseURL: environment.BASE_URL,
  headers: {
    'Content-Type' : 'application/json'
  }
});

export default public_axios;