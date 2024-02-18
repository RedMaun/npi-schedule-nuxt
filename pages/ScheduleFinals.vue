<script setup>
import MainFrame from "@/components/MainFrame.vue";
import axios from "axios";
import { ref, onBeforeMount } from "vue";
import finalsDataRefactoring from "@/utils/finalsDataRefactoring";
import { useTimesStore } from "@/stores/times";
import { useRoute } from "vue-router";

const props = defineProps({
  urlSchedule: String,
  urlName: String,
  sort: String,
  type: String,
});
const route = useRoute();
const group = ref(null);
const urlJson = ref(null);
const errorMessage = ref(null);
const weeks = ref(null);
onBeforeMount(async () => {
  let urlSchedule = `${props.urlSchedule.split("$")[0]}`;
  urlSchedule = urlSchedule.slice(0, urlSchedule.length - 1);
  for (let i = 1; i < props.urlSchedule.split("$").length; i++) {
    urlSchedule +=
      `/${route.params[props.urlSchedule.split("$")[i].split("/")[0]]}/` +
      `${props.urlSchedule.split("$")[i].split("/")[1]}`;
  }
  urlJson.value = (await axios.get(urlSchedule)).data;

  if (props.type === "st-fin") {
    const urlName =
      props.urlName.split("$")[0] +
      route.params[
        props.urlName
          .split("$")
          [props.urlName.split("$").length - 1].split("/")[0]
      ];
    group.value = Object.keys((await axios.get(urlName)).data)[0];
  } else if (props.type === "pr-fin") {
    const urlName =
      props.urlName.split("$")[0] + route.params[props.urlName.split("$")[1]];
    const groupResp = await fetch(urlName);
    group.value = (await groupResp.json())[0];
  }
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
    weeks.value = finalsDataRefactoring.func(
      urlJson.value,
      props.sort,
      timesJson,
    );
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
