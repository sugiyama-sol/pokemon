<template>
  <div class="line" @click="openDetail();">
    <p class="name">{{ name }}</p>
    <img :src="url" />
    <p class="arrow">＞</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";
const namespace: string = "detail";

@Component
export default class ListLine extends Vue {
  @Prop() private name!: string;
  @Prop() private index!: string;
  @Action("loadDetail", { namespace }) loadDetail!: (index: string) => void;

  get url() {
    const index = this.index;
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`;
  }

  async openDetail() {
    await this.loadDetail(this.index);
    this.$router.push("/detail");
  }
}
</script>

<style scoped>
.line {
  height: 80px;
  border-bottom: 1px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.line img {
  height: 75px;
  width: 75px;
}
.name {
  margin-right: 20px;
}
.arrow {
  margin-left: 20px;
}
</style>
