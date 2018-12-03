import Vue from "vue";
import Vuex, { Module, GetterTree, MutationTree, ActionTree } from "vuex";
import { RootState } from "../root";
import axios from "axios";

Vue.use(Vuex);

export interface DetailState {
  index: string;
  name: string;
  genus: string;
  description: string;
}

const state: DetailState = {
  index: "",
  name: "",
  genus: "",
  description: ""
};

const getters: GetterTree<DetailState, RootState> = {};

const mutations: MutationTree<DetailState> = {
  SET_INDEX(state: DetailState, index: string): void {
    state.index = index;
  },
  SET_NAME(state: DetailState, name: string): void {
    state.name = name;
  },
  SET_GENUS(state: DetailState, genus: string): void {
    state.genus = genus;
  },
  SET_DESCRIPTION(state: DetailState, description: string): void {
    state.description = description;
  }
};

const actions = <ActionTree<DetailState, any>>{
  async loadDetail({ commit }, index): Promise<any> {
    const URL_BASE = `https://pokeapi.co/api/v2/pokemon-species/${index}/`;
    try {
      const res = await axios.get(URL_BASE);
      commit("SET_INDEX", index);
      for (const name of res.data.names) {
        if (name.language.name === "ja") {
          commit("SET_NAME", name.name);
        }
      }
      for (const genus of res.data.genera) {
        if (genus.language.name === "ja") {
          commit("SET_GENUS", genus.genus);
        }
      }
      for (const description of res.data.flavor_text_entries) {
        if (description.language.name === "ja") {
          commit("SET_DESCRIPTION", description.flavor_text);
        }
      }
    } catch (err) {
      alert("詳細情報がデータベースにありませんでした");
      throw err;
    }
  }
};

const namespaced: boolean = true;

export const detail: Module<DetailState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
