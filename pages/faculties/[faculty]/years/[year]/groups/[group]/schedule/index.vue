<script setup>
import axios from "axios";
import dataRefactoring from "@/utils/dataRefactoring";

const urlJson = ref(null);
const weeks = ref(null);
const route = useRoute();
const groupName = ref(null);

const url = "https://schedule.npi-tu.ru/api/v2" + route.fullPath;
const sort = ["discipline", "lecturer", "auditorium"];
const type = "st";
const name = "group";

onBeforeMount(async () => {
  urlJson.value = (await axios.get(url)).data;
  groupName.value = urlJson.value[name];
  localStorage.setItem("url", [window.location.pathname, groupName.value]);
  weeks.value = dataRefactoring.func(urlJson.value, sort);
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
