/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
import axios from 'axios';

const BASE_API_URL = 'https://api.apilayer.com/exchangerates_data/';
const API_KEY = 'fh8Ub9E6mxhIz29XM3IBY8tV4gYEWp1o';

const headers = new Headers();
headers.append('apikey', 'fh8Ub9E6mxhIz29XM3IBY8tV4gYEWp1o');

export default {
  namespaced: true,
  state: {
    symbols: {},
    currentRates: {},
  },

  mutations: {
    SET_CURRENT_RATES(state, value) {
      state.currentRates = value;
    },
    SET_SYMBOLS(state, value) {
      state.symbols = value;
    },
  },

  actions: {
    async fetchCurrentRates({ commit }, payload) {
      const response = await axios.get(
        `${BASE_API_URL}latest?base=${payload}`,
        { headers: { apikey: API_KEY } },
        payload
      );
      commit('SET_CURRENT_RATES', response.data.rates);
    },

    async fetchSymbols({ commit }, payload) {
      const response = await axios.get(
        `${BASE_API_URL}symbols`,
        { headers: { apikey: API_KEY } },
        payload
      );
      commit('SET_SYMBOLS', response.data.symbols);
    },
  },

  getters: {
    getCurrentRates: (state) => state.currentRates,
  },
};
