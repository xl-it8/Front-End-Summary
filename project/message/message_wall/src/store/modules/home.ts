import { defineStore } from "pinia";

export default defineStore("home", {
  state() {
    return {
      seleInd: 0,
      isPhoto: false,
      label: 0,
    };
  },
  actions: {
    changeInd(ind: number) {
      this.seleInd = ind;
    },
    changeIsPhoto(bol: boolean) {
      this.isPhoto = bol;
    },
    changeLabel(ind: number) {
      this.label = ind;
    },
  },
  getters: {},
});
