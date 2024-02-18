<script setup>
import MainFrame from "@/components/MainFrame.vue";
import axios from "axios";
import { ref, onBeforeMount } from "vue";
import finalsDataRefactoring from "@/utils/finalsDataRefactoring";
import { useTimesStore } from "@/stores/times";
import { useRoute } from "vue-router";

const route = useRoute();
const group = ref(null);
const urlJson = ref(null);
const errorMessage = ref(null);
const weeks = ref(null);

const url = "https://schedule.npi-tu.ru/api/v1" + route.fullPath;
const urlName =
  "https://schedule.npi-tu.ru/api/v1/groups/" + route.params.group;
const type = "st-fin";
const sort = "lecturer";
onBeforeMount(async () => {
  urlJson.value = (await axios.get(url)).data;
  group.value = Object.keys((await axios.get(urlName)).data)[0];

  const timeSlotsStore = useTimesStore();
  await timeSlotsStore.getTimeSlots();
  const timesJson = timeSlotsStore.timesJson;

  localStorage.setItem("url", [
    window.location.pathname,
    "Сессия " + group.value,
  ]);
  if (JSON.parse(JSON.stringify(urlJson.value)).length === 0) {
    errorMessage.value = "Даты экзаменов/переэкзаменовок не назначены!";
    weeks.value = [];
  } else {
    weeks.value = finalsDataRefactoring.func(urlJson.value, sort, timesJson);
  }
});
</script>

<template>
  <MainFrame
    v-if="weeks"
    :type="type"
    :groupName="group"
    :info="[]"
    :weeks="weeks"
    :errorMessage="errorMessage"
  ></MainFrame>
</template>
