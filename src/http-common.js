import axios from "axios";

export default axios.create({
  baseURL: "http://pub-sub-8ec1ef932c23801d.elb.eu-central-1.amazonaws.com:8080/api",
  //baseURL:"http://bdab-192-165-134-226.ngrok.io/api",
  headers: {
    "Content-type": "application/json"
  }
});
