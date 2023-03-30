import axios from "axios";

export async function productTypesListAPI() {
  return axios({
    method: "get",
    url: "/api/product-types/",
  });
}
