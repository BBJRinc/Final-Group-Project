const tasks = require('./RossData');
const axios = require('axios');

module.exports = {

  getPreviousDay: function () {
    let oneDay = 86400000;
    let selectedDay = 1491091200;
    let previousDateUnix = selectedDay - oneDay;
    return axios({
      method: "get",
      url: `http://192.168.3.176:4040/api/day/${previousDateUnix}`,
      headers: {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTIyNzcxMjExLCJleHAiOjE1MjMzNzYwMTF9.0_jcGd74qHMqFOhTf7qgrmDUOMl0ndsbUDUF4Ps4TrQ",
      }
    }).then(response => {
      return response.data
    }).catch(err => console.log(err));
  },

  submitComment: function () {
    return axios({
      method: 'post',
      url: `http://192.168.3.176:4040/api/comment/18`,
      headers: {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTIyNzcxMjExLCJleHAiOjE1MjMzNzYwMTF9.0_jcGd74qHMqFOhTf7qgrmDUOMl0ndsbUDUF4Ps4TrQ",
      },
      data: {
        content: 'Jest Test comment 6'
      }
    }).then(response => {
      return response.data
    }).catch(err => console.log(err));
  },
}