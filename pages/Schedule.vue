<script setup>
import MainFrame from "@/components/MainFrame.vue";
import axios from "axios";
import dataRefactoring from "@/utils/dataRefactoring";
import { useRoute } from "vue-router";
import { ref, onBeforeMount } from "vue";

const props = defineProps({
  sort: Object,
  url: String,
  type: String,
  name: String,
});
const urlJson = ref(null);
const weeks = ref(null);
const route = useRoute();
const groupName = ref(null);
let url = `${props.url.split("$")[0]}`;
url = url.slice(0, url.length - 1);
for (let i = 1; i < props.url.split("$").length; i++) {
  url +=
    `/${route.params[props.url.split("$")[i].split("/")[0]]}/` +
    `${props.url.split("$")[i].split("/")[1]}`;
}
onBeforeMount(async () => {
  urlJson.value = (await axios.get(url)).data;
  if (props.type != "au") {
    groupName.value = urlJson.value[props.name];
  } else {
    groupName.value = route.params.auditorium;
  }
  localStorage.setItem("url", [window.location.pathname, groupName.value]);
  weeks.value = dataRefactoring.func(urlJson.value, props.sort);
});
</script>

<template>
  <MainFrame
    v-if="urlJson !== null && weeks !== null && groupName !== null"
    :type="type"
    :groupName="groupName"
    :info="[urlJson.finals, urlJson.semester]"
    :weeks="weeks"
  >
  </MainFrame>
</template>
