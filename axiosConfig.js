// import React from 'react';
import { AsyncStorage } from 'react-native';

import axios from 'axios';


const SERVER_IP = '192.168.2.121';

let axios = async () => {
  await AsyncStorage.getItem('token').then(jwt => {
    console.log('token response in axiosConfig.js::', jwt)
    if (jwt !== null) {
      return axios = axios.create({
        baseURL: `http://${SERVER_IP}:4040/api`,
        headers: {
          "token": jwt
        }
      })
    }
  }).catch(err => console.log(err));
})

export default axios;