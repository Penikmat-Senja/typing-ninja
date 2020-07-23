import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index.js'

Vue.use(Vuex)
const baseUrl = `http://localhost:3000/`
export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    addUser(contex, username) {
      return axios({
        method: 'POST',
        url: `${baseUrl}`,
        data: {
          name: username,
          score: 1000,
        },
      })
        .then((result) => {
          console.log(result, 'result.data');
          router.push({path: '/games'})
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  modules: {
  }
})
