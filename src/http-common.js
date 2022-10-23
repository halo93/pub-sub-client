import axios from "axios";

export default axios.create({
  baseURL: "http://pub-sub-8ec1ef932c23801d.elb.eu-central-1.amazonaws.com:8080/api",
  // baseURL:"http://localhost:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});
