import axios from 'axios'
const baseUrl = 'api/persons'

const getAll = () => {
  return axios.get(baseUrl).then(
    response => response.data
  )
}

const add = personObject => {
  return axios.post(baseUrl, personObject).then(
    response => response.data
  )
}

const del = id => {
  return axios.delete(`${baseUrl}/${id}`).then(
    response => response.data
  )
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then(
    response => response.data
  )
}

const exportedObjects = {
  getAll,
  add,
  del,
  update
}

export default exportedObjects