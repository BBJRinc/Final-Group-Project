import axios from 'axios';

module.exports = {
    getUnscheduled: function(userid){
        return axios({
            method: 'get',
            url: `http://192.168.3.149:4040/api/unscheduled`,
            headers: {
                "token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTIyMzM4OTg4LCJleHAiOjE1MjI5NDM3ODh9.1rsm5tgn3PzxkzRwXfZpAIeSDXE_I9M-4dNNL1WrGNg'
            }
        }).then(resp => {
            // console.log(resp.data)
            return resp.data
        });
    },

    getOngoing: function(userid){
        return axios({
            method: 'get',
            url: `http://192.168.3.149:4040/api/inprogress`,
            headers: {
                "token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTIyMzM4OTg4LCJleHAiOjE1MjI5NDM3ODh9.1rsm5tgn3PzxkzRwXfZpAIeSDXE_I9M-4dNNL1WrGNg'
            }
        }).then(resp => {
            // console.log(resp.data)
            return resp.data
        });
    }
}