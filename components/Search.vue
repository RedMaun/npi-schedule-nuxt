<script setup>
import { ref } from "vue";
import axios from "axios";
import { GROUPS_URL, LECTURERS_URL, AUDITORIUMS_URL } from "@/constants";
const inputSearch = ref([]);

async function getData(val) {
  if (val === "") {
    inputSearch.value = [];
  } else {
    let respGr = (await axios.get(GROUPS_URL + "/" + encodeURI(val))).data;
    respGr = Object.entries(respGr);
    let respLe = (await axios.get(LECTURERS_URL + "/" + encodeURI(val))).data;
    let respAu = (await axios.get(AUDITORIUMS_URL + "/" + encodeURI(val))).data;
    let respAuTemp = Object.entries(respAu);
    respAu = [];
    for (let i of respAuTemp) {
      respAu.push(i[1][0][0]);
    }
    respAu = respAu;
    inputSearch.value = [
      respGr.splice(0, 6),
      respLe.splice(0, 6),
      respAu.splice(0, 6),
    ];
  }
}
</script>

<template>
  <div class="search-cont">
    <div class="search-cont__input-cont">
      <input
        autocomplete="off"
        class="search-cont__search"
        v-model="message"
        :placeholder="'Поиск'"
        @input="getData(message)"
      />
      <div class="search-cont__search-icon">
        <font-awesome-icon :icon="['fas', 'search']" class="fa-2x" />
      </div>
    </div>
    <div
      class="search-cont__buttons-cont"
      v-if="
        (inputSearch[0] && inputSearch[0] != '') ||
        (inputSearch[1] && inputSearch[1] != '') ||
        (inputSearch[2] && inputSearch[2] != '')
      "
    >
      <div v-if="inputSearch[0]">
        <div v-for="(i, index) in inputSearch[0]" :key="index">
          <router-link
            :to="
              '/faculties/' +
              i[1].faculty +
              '/years/' +
              i[1].year +
              '/groups/' +
              encodeURI(i[1].group) +
              '/schedule'
            "
          >
            <button class="search-cont__group">
              {{ i[0] }}
              <span class="search-cont__type">- Группа</span>
            </button>
          </router-link>
        </div>
      </div>

      <div v-if="inputSearch[1]">
        <div v-for="(i, index) in inputSearch[1]" :key="index">
          <router-link :to="`/lecturers/${i}/schedule`">
            <button class="search-cont__group">
              {{ i }}
              <span class="search-cont__type">- Преподаватель</span>
            </button>
          </router-link>
        </div>
      </div>

      <div v-if="inputSearch[2]">
        <div v-for="(i, index) in inputSearch[2]" :key="index">
          <router-link :to="'/auditoriums/' + i + '/schedule'">
            <button class="search-cont__group">
              {{ i }}
              <span class="search-cont__type">- Аудитория</span>
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
a {
  width: 100%;
}
.search-cont {
  position: relative;
  height: auto;
  border-radius: 1rem;
}
.search-cont__search-icon {
  position: absolute;
  width: fit-content;
  height: fit-content;
  top: 0.9rem;
  right: 1.2rem;
}
.search-cont__type {
  color: #f8f8f296;
}
.search-cont__buttons-cont {
  width: 32rem;
  height: fit-content;
  border-radius: 0.5rem;
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  background-color: #44475a;
}
.search-cont__search {
  font-size: larger;
  width: 30rem;
  height: 1.6rem;
  border-radius: 1rem;
  padding: 1rem;
  border: 0.1rem solid #44475a;
  background-color: #282a36;
  outline: none;
  margin: auto;
}
.search-cont__search:focus {
  border: 0.1rem solid #6272a4;
}
.search-cont__search::placeholder {
  color: #f8f8f2af;
}
.search-cont__input-cont {
  max-width: fit-content;
  margin: auto;
  margin-bottom: 0.2rem;
  position: relative;
}

.search-cont__group {
  width: 100%;
  outline: none;
  height: 1rem;
  border: 0.1rem solid rgb(87, 91, 112);
  background-color: #44475a;
  padding: 0.5rem;
  height: fit-content;
  cursor: pointer;
  text-align: left;
  border-radius: 0.5rem;
  position: relative;
  z-index: 5;
}
.search-cont__group:hover {
  background-color: #6272a4;
}
@media only screen and (max-width: 550px) {
  .search-contgroup,
  .search-conttype {
    font-size: small;
    width: 100%;
  }
  .search-cont__buttons-cont {
    background-color: #44475a;
    width: 96%;
    max-width: 28rem;
    overflow: hidden;
    overflow-y: scroll;
  }
  .search-cont__search {
    width: 20rem;
  }
}
</style>
