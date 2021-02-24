import { request } from './request'
const axios = require('axios')

function GET(url){
  return axios({
    url
  })
}
function POST(url,data){
  return axios({
    method:'POST',
    url,
    data,
  })
}

module.exports = {
  GET
}