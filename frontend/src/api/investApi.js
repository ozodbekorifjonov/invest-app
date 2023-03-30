import axios from "axios";

export async function productTypesListAPI() {
  return axios({
    method: "get",
    url: "/api/product-types/",
  });
}

export async function createProductTypeAPI(name) {
  const form = new FormData();

  form.set("name", name);

  return axios({
    method: "post",
    url: "/api/product-types/",
    data: form,
  });
}

export async function deleteProductTypeAPI(id) {
  return axios({
    method: "delete",
    url: `/api/product-types/${id}`,
  });
}

export async function updateProductTypeAPI(id, name) {
  return axios({
    method: "put",
    url: `/api/product-types/${id}`,
    data: { name },
  });
}

export async function currencyListAPI() {
  return axios({
    method: "get",
    url: "/api/currency/",
  });
}

export async function createCurrencyAPI(name) {
  const form = new FormData();

  form.set("title", name);

  return axios({
    method: "post",
    url: "/api/currency/",
    data: form,
  });
}

export async function deleteCurrencyAPI(id) {
  return axios({
    method: "delete",
    url: `/api/currency/${id}`,
  });
}

export async function updateCurrencyAPI(id, title) {
  return axios({
    method: "put",
    url: `/api/currency/${id}`,
    data: { title },
  });
}
