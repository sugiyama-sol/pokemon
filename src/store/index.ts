import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { RootState } from "./root";
import { list } from "./modules/list";
import { detail } from "./modules/detail";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    version: "1.0.0"
  },
  modules: {
    list,
    detail
  }
};

export default new Vuex.Store<RootState>(store);
