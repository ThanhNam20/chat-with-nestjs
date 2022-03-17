import axios from "axios";
import { environment } from "../environment";

const private_axios = axios.create({
  baseURL: environment.BASE_URL,
  headers: {
    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtodWF0dGhhbmhuYW1AZ21haWwuY29tIiwiaWF0IjoxNjQ3NDk4NTQ2LCJleHAiOjE2NDgxMDMzNDZ9.X-0Xlgq_dhe4TYFGefxwu7jrE84RtADTsk-qLQcZDR4`,
    'Content-Type' : 'application/json'
  }
});

export default private_axios;