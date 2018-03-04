import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getToken = () => {
  return token;
}

const update = async (updatedObject) => {
  const url = baseUrl + '/' + updatedObject._id
  const respone = await axios.put(url, updatedObject)
  return respone;
}

const create = async (newObject) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const remove = async (object) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const url = baseUrl + '/' + object._id
  const respone = await axios.delete(url, config)
  return respone;
}


export default { getAll, setToken, getToken, create, update, remove }