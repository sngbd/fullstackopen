import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(response => response.data)
}

const add = personObject => {
  return axios.post(baseUrl, personObject)
}

const del = id => {
  axios.delete(`${baseUrl}/${id}`)
  return getAll()
}

const exportedObjects = {
  getAll,
  add,
  del
}

export default exportedObjects