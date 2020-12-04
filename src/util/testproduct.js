import axios from 'axios';
import configP from './configProduct.js';

/* config */
axios.defaults.headers.common = {
  Accept: 'application/json; charset=utf-8',
}

axios.defaults.headers.post = {
  'Access-Control-Allow-Origin': '*',
}

const apiGatewayInstance = axios.create({
  baseURL: configP.service,
});


const service = () => {
  //const getToken = localStorage.getItem("token")
  const getToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1ZGQxMzJhNDQyZWQyNTJlODcxMTU0NTEiLCJpYXQiOjE2MDY2MDg4Mjc0OTV9.xULXpPgcHYAAcSCWDsdodV5YA5xrlD0uHgvpdoq8b5Y"
  if (getToken) {
    apiGatewayInstance.interceptors.request.use((configP) => {
      configP.headers.authorization = getToken
      return configP
    })
    
  }
  return apiGatewayInstance
}
export default service
