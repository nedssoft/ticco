import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://oriechinedu-politico.herokuapp.com/api/v1'
})
export default instance;