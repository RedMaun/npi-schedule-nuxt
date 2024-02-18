import { defineStore } from "pinia";
import axios from "axios";
import { CURRENT_WEEK_URL } from "@/constants";

export const useCurrentWeekNumberStore = defineStore("currentWeekNumber", {
  state: () => ({
    currentWeekNumber: null,
  }),
  actions: {
    async getCurrentWeekNumber() {
      this.currentWeekNumber = (await axios.get(CURRENT_WEEK_URL)).data;
    },
  },
});
