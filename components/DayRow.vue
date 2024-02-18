<script setup>
import currentClass from "@/utils/currentClass";
import CustomIcon from "./CustomIcon.vue";
import { computed, ref } from "vue";

const props = defineProps({
  data: Object,
  times: Object,
  colors: Object,
  pageType: String,
  index: Number,
  isCurrentDay: Boolean,
  day: Number,
  timeNow: Number,
});

const fullNameChecker = (name) => {
  const splittedName = name.split(" ");
  if (splittedName.length < 3) {
    return false;
  }
  return splittedName[1].length === 1 && splittedName[2].length === 1;
};

const hrefForLecturer = (name) => {
  const splittedName = name.split(" ");
  const encodedURI = `${splittedName[0]} ${splittedName[1]} ${splittedName[2]}`;
  return `/lecturers/${encodedURI}/schedule`;
};

const groupNameChecker = (name) => {
  return name.split("-").length === 3;
};

function hrefForAuditorium(name) {
  return "/auditoriums/" + name + "/schedule";
}

const { type, firstRow, secondRow, thirdRow } = props.data;
const classNum = props.data.class;
const todaysDayOfWeek = new Date().getDay() === 0 ? 7 : new Date().getDay();
const isCurrent = computed(() => {
  return (
    currentClass.isCurrent(props.times, classNum - 1, props.timeNow) &&
    props.isCurrentDay &&
    props.day === todaysDayOfWeek - 1
  );
});
const isGroup = props.pageType === "pr" ? "compass" : "user";

const isAuditorium =
  props.pageType === "pr" || props.pageType === "au" ? "user-group" : "compass";

const bookmarkColor = props.colors[type].color;
const startOfClass = props.times[classNum - 1][0];
const endOfClass = props.times[classNum - 1][1];
const collapsible = ref(null);

const showMoreText = "Показать больше...";
const showLessText = "Скрыть";

function toggleCollapsible() {
  const collapsibleDivs = Array.from(
    collapsible.value.getElementsByClassName("box__text-item_collapsible")
  );
  const opacityText = collapsible.value.getElementsByClassName(
    "box__text-item_opacity"
  )[0];
  if (opacityText.style.backgroundImage !== "none") {
    opacityText.style.backgroundImage = "none";
    opacityText.style.color = "#f8f8f2";
  } else {
    opacityText.style.backgroundImage =
      "linear-gradient(to bottom, #f8f8f2 30%, transparent 100%)";
    opacityText.style.color = "transparent";
  }

  collapsibleDivs.map((item) => {
    item.style.display =
      item.style.display === "" || item.style.display === "none"
        ? "block"
        : "none";
  });
  const collapsiblePath =
    collapsible.value.getElementsByClassName("box__button")[0];
  collapsiblePath.innerText =
    collapsiblePath.innerText === showMoreText ? showLessText : showMoreText;
}

const boxTextClass = isCurrent.value ? "box__text_selected" : "box__text";
const boxTextItemClass = (i, thirdRow) => {
  if (i === 1 && thirdRow.length > 2) {
    return "box__text-item_opacity";
  }
  return i <= 1 ? "box__text-item" : "box__text-item_collapsible";
};
</script>

<template>
  <div class="day-row" ref="collapsible">
    <div class="day-row__number">
      <span>{{ classNum }}</span>
    </div>
    <div class="day-row__time">
      <span class="day-row__start">{{ startOfClass }}</span>
      <span class="day-row__end">{{ endOfClass }}</span>
    </div>
    <div class="day-row__content">
      <div class="box">
        <div class="box__icon">
          <CustomIcon name="bookmark" :color="bookmarkColor" />
        </div>
        <div :class="boxTextClass">
          <b>{{ firstRow }}</b>
        </div>
      </div>
      <div class="box">
        <div class="box__icon">
          <CustomIcon :name="isGroup" />
        </div>
        <div class="box__text">
          <div v-for="item in secondRow" class="box__text-item">
            <router-link
              v-if="fullNameChecker(item)"
              :to="hrefForLecturer(item)"
            >
              {{ item }}
            </router-link>
            <router-link
              v-else-if="pageType === 'pr'"
              :to="hrefForAuditorium(item)"
            >
              {{ item }}
            </router-link>
            <span v-else>{{ item }}</span>
          </div>
        </div>
      </div>
      <div class="box">
        <div class="box__icon">
          <CustomIcon :name="isAuditorium" />
        </div>
        <div class="box__text">
          <div
            v-for="(item, i) in thirdRow"
            :class="boxTextItemClass(i, thirdRow)"
          >
            <router-link
              v-if="!groupNameChecker(item)"
              :to="hrefForAuditorium(item)"
            >
              {{ item }}
            </router-link>
            <span v-else>{{ item }}</span>
          </div>
        </div>
      </div>
      <div class="box" v-if="thirdRow.length > 2">
        <button class="box__button" @click="toggleCollapsible">
          {{ showMoreText }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
a {
  color: #f8f8f2;
  text-decoration: none;
}
a:hover {
  color: #adadad;
}
a:active {
  color: #797979;
}
.day-row {
  display: flex;
  flex-direction: row;
}
.box__text-item_opacity {
  background-image: linear-gradient(to bottom, #f8f8f2 30%, transparent 100%);
  background-clip: text;
  color: transparent;
}
.box__button {
  width: fit-content;
  outline: none;
  border: none;
  background: transparent;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  cursor: pointer;
  font-size: 0.8rem;
  margin-left: 1.6rem;
  color: "#f8f8f2";
  padding-top: 0;
}
.box__text-item_collapsible {
  display: none;
}
.day-row:nth-child(odd) {
  background-color: #2b2e3b;
}
.day-row__content,
.day-row__time,
.day-row__number {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
}
.day-row__number,
.day-row__time {
  align-items: left;
  justify-content: center;
}
.day-row__number {
  background: #44475a1a;
}
.day-row__number span {
  font-weight: 700;
}
.day-row__start,
.day-row__end {
  font-weight: 700;
}
.day-row__start {
  font-size: 1.1rem;
}
.day-row__end {
  font-size: 0.8rem;
  color: #f8f8f2ad;
}
.box__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
}
.box_text {
  display: flex;
  flex-direction: column;
  flex-flow: column;
}
.box {
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
}
.day-row__time {
  padding-right: 0.8rem;
  padding-left: 1rem;
}
.day-row__content {
  gap: 0.3rem;
  border-left: 0.1rem solid #44475a;
  padding-left: 1rem;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  flex-wrap: wrap;
}
.box__text_selected {
  padding: 0.3rem;
  line-height: 1rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border-radius: 0.3rem;
  background: #44475a;
}
</style>
