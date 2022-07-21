import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const add = personObject => {
  return axios.post(baseUrl, personObject)
}

const exportedObjects = {
    add
}

export default exportedObjects