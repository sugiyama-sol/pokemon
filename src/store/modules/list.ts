import Vue from "vue";
import Vuex, { Module, GetterTree, MutationTree, ActionTree } from "vuex";
import { RootState } from "../root";
import axios from "axios";

Vue.use(Vuex);

const PAGE_SIZE = 30;

export interface PokemonState {
  name: string;
  index: string;
}

export interface ListState {
  list: PokemonState[];
  currentList: PokemonState[];
  currentPage: number;
}

const state: ListState = {
  list: [],
  currentList: [],
  currentPage: 1
};

const getters: GetterTree<ListState, RootState> = {};

const mutations: MutationTree<ListState> = {
  SET_LIST(state: ListState, data: { [key: string]: string }[]): void {
    for (const record of data) {
      const index = record.url.match(/\/\d+\//);
      if (index && index.length > 0) {
        state.list.push({
          name: record.name,
          index: index[0].replace(/\//g, "")
        });
      }
    }
  },
  SET_CURRENT(state: ListState, page: number): void {
    if (page === 0) {
      page = Math.ceil(state.list.length / PAGE_SIZE);
    } else if (page > Math.ceil(state.list.length / PAGE_SIZE)) {
      page = 1;
    }
    const start = (page - 1) * PAGE_SIZE;
    const end = page * PAGE_SIZE;
    state.currentList.length = 0;
    state.currentList = state.list.slice(start, end);
    state.currentPage = page;
  }
};

const actions = <ActionTree<ListState, any>>{
  loadList({ commit }): void {
    const URL_BASE = "https://pokeapi.co/api/v2/pokemon/";
    axios.get(URL_BASE).then(res => {
      commit("SET_LIST", res.data.results);
      commit("SET_CURRENT", 1);
    });
  },
  setPage({ commit }, page): void {
    commit("SET_CURRENT", page);
  }
};

const namespaced: boolean = true;

export const list: Module<ListState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
