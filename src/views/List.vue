<template>
  <div>
    <div class="header">
      <span class="before" @click="nextPage();">&lt;&lt;</span>
      <span class="title">Pokemon List</span>
      <span class="after" @click="beforePage();">&gt;&gt;</span>
    </div>
    <div class="list">
      <list-line
        v-for="pokemon in list.currentList"
        :key="pokemon.name"
        :name="pokemon.name"
        :index="pokemon.index"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ListLine from "./components/ListLine.vue";
import { State, Action, Getter } from "vuex-class";
import { ListState } from "@/store/modules/list";
const namespace: string = "list";

@Component({
  components: {
    ListLine
  }
})
export default class List extends Vue {
  @State("list") list!: ListState;
  @Action("loadList", { namespace }) loadList!: () => void;
  @Action("setPage", { namespace }) setPage!: (page: number) => void;

  created() {
    this.loadList();
  }
  nextPage() {
    this.setPage(this.list.currentPage - 1);
  }
  beforePage() {
    this.setPage(this.list.currentPage + 1);
  }
}
</script>

<style scoped>
.header {
  height: 30px;
  border-bottom: 1px solid gray;
}
.title {
  margin: auto;
}
.before {
  float: left;
  cursor: pointer;
}
.after {
  float: right;
  cursor: pointer;
}
</style>
