import axios from 'axios'

const customHttp = 
   axios.create({
      baseURL: 'http://localhost:8080'
   })

export default customHttp