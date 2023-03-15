import { api, requestConfig } from "../utils/config";

//const config = requestConfig("GET", data);

const getAllProducts = async () => {
    const response = await await fetch(api + "/")
    .then((res) => res.json())
    .catch((err) => err);
    return response;
  };
  
  export default {
    getAllProducts
  };