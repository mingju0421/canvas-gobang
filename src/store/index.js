import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 实例化vuex
const store = new Vuex.Store({
  state: {
    user: {}
  },
  getters: {
    user: state => state.user
  },
  mutations: {
    setUser (state, data) {
      console.log(data)
      state.user = data
    }
  }
})

// 到处实例
export default store;
