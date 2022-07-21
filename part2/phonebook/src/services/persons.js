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

const update = (id, newObject) => {
  axios.put(`${baseUrl}/${id}`, newObject)
  return getAll()
}

const exportedObjects = {
  getAll,
  add,
  del,
  update
}

export default exportedObjects