<script setup>
import currentClass from "@/utils/currentClass";
import { useTimesStore } from "@/stores/times";

const timeSlotsStore = useTimesStore();

await timeSlotsStore.getTimeSlots();
const timesJson = timeSlotsStore.timesJson;
const timeSlots = timeSlotsStore.timeSlots;
const time = new Date().getHours() * 60 + new Date().getMinutes();

let times = [];
for (let i in timesJson) {
  times.push([timesJson[i].start + "-" + timesJson[i].end]);
}
const tableCurrentClass = (timeSlots, index, time) =>
  currentClass.isCurrent(timeSlots, index, time) ? "table__current-class" : "";
</script>

<template>
  <div class="table-cont">
    <table class="table">
      <thead>
        <tr class="table__head">
          <th class="table__head-cell">#</th>
          <th class="table__head-cell">Время</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(para, index) in times"
          :class="
            currentClass.isCurrent(timeSlots, index, time)
              ? 'table__current-class'
              : ''
          "
        >
          <td
            class="table__cell"
            v-if="times.length - 1 === index"
            :style="{ 'border-bottom-left-radius': '0.8rem' }"
          >
            <b>{{ index + 1 + " Пара" }}</b>
          </td>
          <td class="table__cell" v-else>
            <b>{{ index + 1 + " Пара" }}</b>
          </td>
          <td
            class="table__cell"
            v-if="times.length - 1 === index"
            :style="{ 'border-bottom-right-radius': '0.8rem' }"
          >
            {{ para[0] }}
          </td>
          <td class="table__cell" v-else>{{ para[0] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
* {
  font-size: medium;
}
.table__current-class {
  background: #3d3f51;
}
.table {
  width: 100%;
  color: #f8f8f2;
  border: 0.1rem solid #44475a;
  background-color: #282a36;
  text-align: left;
  border-radius: 0.8rem;
  border-spacing: 0rem;
}
.table__cell,
.table__head-cell {
  text-align: center;
  padding: 0.8rem;
  border: 0.1rem solid #44475a;
}
.table__head-cell {
  background-color: #6272a4;
}
.table__head-cell:first-child {
  border-top-left-radius: 0.8rem;
}
.table__head-cell:last-child {
  border-top-right-radius: 0.8rem;
}
@media only screen and (max-width: 600px) {
  * {
    font-size: small;
  }
}
</style>
