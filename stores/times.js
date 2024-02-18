import { defineStore } from "pinia";
import axios from "axios";
import { TIME_SLOTS_URL } from "@/constants";

export const useTimesStore = defineStore("times", {
  state: () => ({
    timeSlots: [],
    timesJson: null,
  }),
  actions: {
    async getTimeSlots() {
      this.timesJson = (await axios.get(TIME_SLOTS_URL)).data;
      let timesJsonArray = Object.entries(this.timesJson);

      timesJsonArray.map((item) => {
        this.timeSlots.push(Object.values(Object.values(item)[1]));
      });
    },
  },
});
