<script setup>
import MainFrame from "@/components/MainFrame.vue";
import axios from "axios";
import dataRefactoring from "@/utils/dataRefactoring";
import { useRoute } from "vue-router";
import { ref, onBeforeMount } from "vue";

const route = useRoute();
const urlJson = ref(null);
const weeks = ref(null);
const groupName = ref(null);

const url = "https://schedule.npi-tu.ru/api/v2" + route.fullPath;
const sort = ["discipline", "lecturer", "groups"];
const type = "au";

onBeforeMount(async () => {
  urlJson.value = (await axios.get(url)).data;
  groupName.value = route.params.auditorium;
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
