<script setup>
import { ref, onUpdated } from "vue";
import axios from "axios";
import { LECTURERS_URL } from "@/constants";
const props = defineProps({
  toggleFunc: Object,
});
const searchInput = ref(null);
const searchItems = ref([]);
const getData = async () => {
  if (searchInput.value !== "") {
    searchItems.value = (
      await axios.get(LECTURERS_URL + "/" + encodeURI(searchInput.value))
    ).data;
  } else {
    searchItems.value = [];
  }
};
</script>

<template>
  <div class="popup">
    <header class="popup__header">
      Написать отзыв на преподавателя
    </header>
    <button class="popup__close" @click="toggleFunc()">
      <font-awesome-icon icon="x" class="page-title__icon fa-lg" />
    </button>
    <input
      class="popup__input"
      placeholder="Поиск преподавателя"
      @input="getData"
      v-model="searchInput"
    />
    <div class="href-cont">
      <a
        class="href-cont__item"
        :href="`/reviews/${item}`"
        v-for="item in searchItems"
        >{{ item }}</a
      >
    </div>
  </div>
</template>

<style>
.popup {
  width: 38rem;
  height: fit-content;
  max-height: 30rem;
  background-color: #282a36;
  border: 0.1rem solid #424653;
  position: fixed;
  z-index: 6;
  padding: 1rem;
  top: 3rem;
  left: 50%;
  transform: translate(-50%, 0);
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.popup__header {
  margin-top: 3rem;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}
.href-cont {
  width: 90%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  margin-top: 1rem;
  /* padding: 1rem; */
  border-radius: 0.5rem;
}
.href-cont::-webkit-scrollbar {
  width: 0.5rem;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}
.href-cont::-webkit-scrollbar-track {
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  background-color: #1a1b22;
}

.href-cont::-webkit-scrollbar-thumb {
  border-radius: 0.5rem;
  background-color: #232530;
  /* box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
}

.href-cont__item {
  background-color: #44475a;
  padding: 0.4rem;
  text-decoration: none;
  color: #f8f8f2;
}
.href-cont__item:hover {
  background-color: #6272a4;
}
.popup__close {
  position: absolute;
  right: 1rem;
  top: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  border-radius: 2.5rem;
  background-color: #f8f8f2;
  cursor: pointer;
}
.popup__input {
  width: 60%;
  padding: 0.5rem;
  border: 0.1rem solid #44475a;
  background-color: #232530;
  border-radius: 0.5rem;
  outline: none;
}

.popup__input:focus {
  border: 0.1rem solid #6272a4;
}
.popup__input::placeholder {
  color: #f8f8f2af;
}
@media only screen and (max-width: 560px) {
  .popup
  {
    width: 88%;
  }
  .popup__input
  {
    width: 90%;
  }
  .href-cont
  {
    width: 100%;
  }
  .popup__header
  {
    font-size: 1rem;
  }
}
</style>
