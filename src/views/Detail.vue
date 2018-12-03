<template>
  <div>
    <div class="header">
      <span class="before" @click="goBack();">&lt;&lt;</span>
      <span class="title">{{ detail.name }}</span>
    </div>
    <div class="detail">
      <img :src="url" />
      <p class="genus">{{ detail.genus }}</p>
      <p class="description">{{ detail.description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Action, Getter } from "vuex-class";
import { DetailState } from "@/store/modules/detail";
const namespace: string = "list";

@Component
export default class List extends Vue {
  @State("detail") detail!: DetailState;

  get url() {
    const index = this.detail.index;
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`;
  }

  goBack() {
    this.$router.push("/");
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
.genus {
  border: solid 1px #ccc;
  width: 70%;
  margin: 0 auto;
}
.description {
  border-radius: 10px;
  border: solid 1px #ccc;
  width: 70%;
  margin: 10px auto;
}
</style>
