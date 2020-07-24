import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index.js'

let baseUrl = ""
Vue.use(Vuex)
if (process.env.NODE_ENV === 'production') {
  baseUrl = `https://nameless-fjord-30696.herokuapp.com/`
} else {
  baseUrl = `http://localhost:3000/`
}
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
          score: 0,
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
