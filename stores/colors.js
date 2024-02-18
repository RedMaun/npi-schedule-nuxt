import { defineStore } from "pinia";
import axios from "axios";
import { CLASS_TYPES_URL } from "@/constants";

export const useColorsStore = defineStore("colors", {
  state: () => ({
    colors: null,
  }),
  actions: {
    async getColors() {
      this.colors = (await axios.get(CLASS_TYPES_URL)).data;
    },
  },
});
