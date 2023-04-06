import axios from 'axios';

export async function signUpAPI(firstname, lastname, telephone, email, password) {
  const form = new FormData();

  form.set('firstname', firstname);
  form.set('lastname', lastname);
  form.set('telephone', telephone);
  form.set('email', email);
  form.set('password', password);

  return axios({
    method: 'post',
    url: '/api/signup/',
    data: form,
    contentType: 'application/json',
    accept: '*/*',
  });
}

export async function signInAPI(email, password) {
  const form = new FormData();

  form.set('email', email);
  form.set('password', password);

  return axios({
    method: 'post',
    url: '/api/login/',
    data: form,
    contentType: 'application/json',
    accept: '*/*',
  });
}

export async function updateUserRecommendsAPI(id, product_types, currencies, countries) {
  return axios({
    method: 'put',
    url: `/api/user-recommends/${id}`,
    data: { product_types, currencies, countries },
  });
}

export async function productTypesListAPI() {
  return axios({
    method: 'get',
    url: '/api/product-types/',
  });
}

export async function createProductTypeAPI(name) {
  const form = new FormData();

  form.set('name', name);

  return axios({
    method: 'post',
    url: '/api/product-types/',
    data: form,
  });
}

export async function deleteProductTypeAPI(id) {
  return axios({
    method: 'delete',
    url: `/api/product-types/${id}`,
  });
}

export async function updateProductTypeAPI(id, name) {
  return axios({
    method: 'put',
    url: `/api/product-types/${id}`,
    data: { name },
  });
}

export async function currencyListAPI() {
  return axios({
    method: 'get',
    url: '/api/currency/',
  });
}

export async function createCurrencyAPI(name) {
  const form = new FormData();

  form.set('title', name);

  return axios({
    method: 'post',
    url: '/api/currency/',
    data: form,
  });
}

export async function deleteCurrencyAPI(id) {
  return axios({
    method: 'delete',
    url: `/api/currency/${id}`,
  });
}

export async function updateCurrencyAPI(id, title) {
  return axios({
    method: 'put',
    url: `/api/currency/${id}`,
    data: { title },
  });
}

export async function countryListAPI() {
  return axios({
    method: 'get',
    url: '/api/country/',
  });
}

export async function createCountryAPI(name, image) {
  const form = new FormData();

  form.set('name', name);
  form.set('image', image);

  return axios({
    method: 'post',
    url: '/api/country/',
    data: form,
  });
}

export async function deleteCountryAPI(id) {
  return axios({
    method: 'delete',
    url: `/api/country/${id}`,
  });
}

export async function updateCountryAPI(id, name, image) {
  console.log('name, image');
  console.log(name, image);
  return axios({
    method: 'put',
    url: `/api/country/${id}`,
    data: { name, image },
  });
}
