import axios from 'axios';
import { TOKEN } from '../consts';

export async function signUpAPI(firstname, lastname, telephone, email, password) {
  const form = new FormData();

  form.set('firstname', firstname);
  form.set('lastname', lastname);
  form.set('telephone', telephone);
  form.set('email', email);
  form.set('password', password);

  return axios({
    method: 'post',
    url: '/api/register/',
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

export async function updateUserDataAPI(id, firstname, lastname, telephone, email) {
  const token = localStorage.getItem(TOKEN);

  return axios({
    method: 'put',
    url: `/api/update-user/${id}`,
    data: { firstname, lastname, telephone, email },
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function usersListAPI() {
  const token = localStorage.getItem(TOKEN);

  return axios({
    method: 'get',
    url: `/api/users-list`,
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function updateUserRoleAPI(id, role) {
  const token = localStorage.getItem(TOKEN);

  return axios({
    method: 'put',
    url: `/api/update-user-role/${id}`,
    data: { role },
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function getUserInfoAPI() {
  const token = localStorage.getItem(TOKEN);

  return axios({
    method: 'post',
    url: '/api/me/',
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function productTypesListAPI() {
  const token = localStorage.getItem(TOKEN);

  return axios({
    method: 'get',
    url: '/api/product-types/',
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function createProductTypeAPI(name) {
  const form = new FormData();
  const token = localStorage.getItem(TOKEN);

  form.set('name', name);

  return axios({
    method: 'post',
    url: '/api/product-types/',
    data: form,
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function deleteProductTypeAPI(id) {
  const token = localStorage.getItem(TOKEN);

  return axios({
    method: 'delete',
    url: `/api/product-types/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function updateProductTypeAPI(id, name) {
  const token = localStorage.getItem(TOKEN);

  return axios({
    method: 'put',
    url: `/api/product-types/${id}`,
    data: { name },
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function currencyListAPI() {
  const token = localStorage.getItem(TOKEN);

  return axios({
    method: 'get',
    url: '/api/currency/',
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function createCurrencyAPI(name) {
  const token = localStorage.getItem(TOKEN);
  const form = new FormData();

  form.set('title', name);

  return axios({
    method: 'post',
    url: '/api/currency/',
    data: form,
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function deleteCurrencyAPI(id) {
  const token = localStorage.getItem(TOKEN);

  return axios({
    method: 'delete',
    url: `/api/currency/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function updateCurrencyAPI(id, title) {
  const token = localStorage.getItem(TOKEN);

  return axios({
    method: 'put',
    url: `/api/currency/${id}`,
    data: { title },
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function countryListAPI() {
  const token = localStorage.getItem(TOKEN);

  return axios({
    method: 'get',
    url: '/api/country/',
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function createCountryAPI(name, image) {
  const token = localStorage.getItem(TOKEN);
  const form = new FormData();

  form.set('name', name);
  form.set('image', image);

  return axios({
    method: 'post',
    url: '/api/country/',
    data: form,
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function deleteCountryAPI(id) {
  const token = localStorage.getItem(TOKEN);

  return axios({
    method: 'delete',
    url: `/api/country/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function updateCountryAPI(id, name, image) {
  const token = localStorage.getItem(TOKEN);

  return axios({
    method: 'put',
    url: `/api/country/${id}`,
    data: { name, image },
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function riskRatingListAPI() {
  const token = localStorage.getItem(TOKEN);

  return axios({
    method: 'get',
    url: '/api/risk-rating/',
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function createRiskRatingAPI(name) {
  const token = localStorage.getItem(TOKEN);
  const form = new FormData();

  form.set('name', name);

  return axios({
    method: 'post',
    url: '/api/risk-rating/',
    data: form,
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function deleteRiskRatingAPI(id) {
  const token = localStorage.getItem(TOKEN);

  return axios({
    method: 'delete',
    url: `/api/risk-rating/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function updateRiskRatingAPI(id, name) {
  const token = localStorage.getItem(TOKEN);

  return axios({
    method: 'put',
    url: `/api/risk-rating/${id}`,
    data: { name },
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function instrumentsListAPI() {
  const token = localStorage.getItem(TOKEN);

  return axios({
    method: 'get',
    url: '/api/instrument/',
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function createInstrumentAPI(name) {
  const token = localStorage.getItem(TOKEN);
  const form = new FormData();

  form.set('name', name);

  return axios({
    method: 'post',
    url: '/api/instrument/',
    data: form,
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function deleteInstrumentAPI(id) {
  const token = localStorage.getItem(TOKEN);

  return axios({
    method: 'delete',
    url: `/api/instrument/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function updateInstrumentAPI(id, name) {
  const token = localStorage.getItem(TOKEN);

  return axios({
    method: 'put',
    url: `/api/instrument/${id}`,
    data: { name },
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function majorSectorListAPI() {
  const token = localStorage.getItem(TOKEN);

  return axios({
    method: 'get',
    url: '/api/major-sector/',
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function createMajorSectorAPI(name) {
  const token = localStorage.getItem(TOKEN);
  const form = new FormData();

  form.set('name', name);

  return axios({
    method: 'post',
    url: '/api/major-sector/',
    data: form,
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function deleteMajorSectorAPI(id) {
  const token = localStorage.getItem(TOKEN);

  return axios({
    method: 'delete',
    url: `/api/major-sector/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function updateMajorSectorAPI(id, name) {
  const token = localStorage.getItem(TOKEN);

  return axios({
    method: 'put',
    url: `/api/major-sector/${id}`,
    data: { name },
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function minorSectorListAPI() {
  const token = localStorage.getItem(TOKEN);

  return axios({
    method: 'get',
    url: '/api/minor-sector/',
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function createMinorSectorAPI(name) {
  const token = localStorage.getItem(TOKEN);
  const form = new FormData();

  form.set('name', name);

  return axios({
    method: 'post',
    url: '/api/minor-sector/',
    data: form,
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function deleteMinorSectorAPI(id) {
  const token = localStorage.getItem(TOKEN);

  return axios({
    method: 'delete',
    url: `/api/minor-sector/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function updateMinorSectorAPI(id, name) {
  const token = localStorage.getItem(TOKEN);

  return axios({
    method: 'put',
    url: `/api/minor-sector/${id}`,
    data: { name },
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function regionListAPI() {
  const token = localStorage.getItem(TOKEN);

  return axios({
    method: 'get',
    url: '/api/region/',
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function createRegionAPI(name) {
  const token = localStorage.getItem(TOKEN);
  const form = new FormData();

  form.set('name', name);

  return axios({
    method: 'post',
    url: '/api/region/',
    data: form,
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function deleteRegionAPI(id) {
  const token = localStorage.getItem(TOKEN);

  return axios({
    method: 'delete',
    url: `/api/region/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function updateRegionAPI(id, name) {
  const token = localStorage.getItem(TOKEN);

  return axios({
    method: 'put',
    url: `/api/region/${id}`,
    data: { name },
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function ideaListAPI() {
  const token = localStorage.getItem(TOKEN);

  return axios({
    method: 'get',
    url: '/api/idea/',
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function ideaDetailsAPI(id) {
  const token = localStorage.getItem(TOKEN);

  return axios({
    method: 'post',
    url: `/api/idea/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function ideaDetailsWithClientsAPI(id) {
  const token = localStorage.getItem(TOKEN);

  return axios({
    method: 'post',
    url: `/api/idea-details-with-clients/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function createIdeaAPI(obj) {
  const token = localStorage.getItem(TOKEN);

  const title = obj.title;
  const abstract = obj.abstract;
  const publish_date = obj.publish_date;
  const expiry_date = obj.expiry_date;
  const content = obj.content;
  const user_id = obj.user_id;
  const risk_ratings = obj.risk_ratings;
  const product_types = obj.product_types;
  const major_sectors = obj.major_sectors;
  const minor_sectors = obj.minor_sectors;
  const instruments = obj.instruments;
  const currencies = obj.currencies;
  const regions = obj.regions;
  const countries = obj.countries;

  return axios({
    method: 'post',
    url: `/api/idea/`,
    data: {
      title,
      abstract,
      publish_date,
      expiry_date,
      content,
      user_id,
      risk_ratings,
      product_types,
      major_sectors,
      minor_sectors,
      instruments,
      currencies,
      regions,
      countries,
    },
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function updateIdeaAPI(obj, id) {
  const token = localStorage.getItem(TOKEN);

  const title = obj.title;
  const abstract = obj.abstract;
  const publish_date = obj.publish_date;
  const expiry_date = obj.expiry_date;
  const content = obj.content;
  const user_id = obj.user_id;
  const risk_ratings = obj.risk_ratings;
  const product_types = obj.product_types;
  const major_sectors = obj.major_sectors;
  const minor_sectors = obj.minor_sectors;
  const instruments = obj.instruments;
  const currencies = obj.currencies;
  const regions = obj.regions;
  const countries = obj.countries;

  return axios({
    method: 'put',
    url: `/api/idea/${id}`,
    data: {
      title,
      abstract,
      publish_date,
      expiry_date,
      content,
      user_id,
      risk_ratings,
      product_types,
      major_sectors,
      minor_sectors,
      instruments,
      currencies,
      regions,
      countries,
    },
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function updateIdeaHolderAPI(user_id, id) {
  const token = localStorage.getItem(TOKEN);

  return axios({
    method: 'post',
    url: `/api/idea-holder/${id}`,
    data: {
      user_id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function updateIdeaPotentialClientsAPI(clients, id, rm_id) {
  const token = localStorage.getItem(TOKEN);

  return axios({
    method: 'post',
    url: `/api/idea-potential-clients/${id}`,
    data: {
      clients,
      rm_id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function holdingsListAPI(user_id) {
  const token = localStorage.getItem(TOKEN);

  return axios({
    method: 'post',
    url: `/api/user-holdings/${user_id}`,
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function userListByRoleAPI(role) {
  const token = localStorage.getItem(TOKEN);

  return axios({
    method: 'post',
    url: `/api/user-list-by-role/`,
    data: {
      role,
    },
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function possibleClientsListAPI(role) {
  const token = localStorage.getItem(TOKEN);

  return axios({
    method: 'post',
    url: `/api/user-possible-clients/`,
    data: {
      role,
    },
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}

export async function ideasRecommendedByRMAPI(id) {
  const token = localStorage.getItem(TOKEN);

  return axios({
    method: 'post',
    url: `/api/ideas-recommended-by-rm/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
      contentType: 'application/json',
    },
  });
}
