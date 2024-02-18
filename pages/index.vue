<script setup>
import HeaderFull from "@/components/HeaderFull.vue";
import {LINK_TO_GIT} from "../constants"
import { defineAsyncComponent, ref, onMounted } from "vue";
const Search = defineAsyncComponent(() => import("@/components/Search.vue"));
const Table = defineAsyncComponent(() => import("@/components/Table.vue"));
const lastUrl = ref("")
const lastName = ref("")
onBeforeMount(() => {
  const value = localStorage.getItem("url")
  if ((lastUrl.value = value)) {
  lastUrl.value = value.split(",")[0];
  lastName.value = value.split(",")[1];
}
})

let footer = ref(null); 
const timer = ref()

onUnmounted(() => {
  clearTimeout(timer.value)
  window.removeEventListener("scroll", () => {})
})

onMounted(() => {
  let didScroll;
  let lastScrollTop = 0;
  let delta = 5;
  let footerHeight = footer.value.offsetHeight
  window.addEventListener("scroll", function (event) {
    didScroll = true;
  });

  timer.value = setInterval(function () {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  function hasScrolled() {
    let st = window.scrollY;
    if (Math.abs(lastScrollTop - st) <= delta) return;

    if (st > lastScrollTop && st > footerHeight) {
      // Scroll Down
      footer.value.classList.remove("footer-down")
    } else {
      // Scroll Up
      if (st < document.body.scrollHeight) {
        footer.value.classList.add("footer-down");
      }
    }

    lastScrollTop = st;
  }
});
</script>

<template>
  <HeaderFull />
  <Search class="search-cont" />
  <div class="last-visited" v-if="lastName != ''">
    Последнее просмотренное:
    <router-link :to="lastUrl" v-if="lastName">{{ lastName }}</router-link>
    <router-link :to="lastUrl" v-else>Ссылка</router-link>
  </div>
  <Table class="table-container"></Table>
  <div class="footer footer-down" ref="footer">
    <div class="footer__cont">
      <font-awesome-icon class="footer__info-icon fa-2x" :icon="['fas', 'circle-info']" />
      <div class="footer__info-text">
        <span>Нашли баг? Возник вопрос? </span>
        <a href="https://vk.com/redmaunn">Пишите мне</a>
        <a class="linkToGit" :href="LINK_TO_GIT">
          Исходный код
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  color: #f8f8f2;
}
.table-container
{
  height: 100vh;
}
.linkToGit {
  display: block;
  width: fit-content;
}
#one,
#two {
  color: #282a36;
}

.last-visited {
  width: fit-content;
  margin: auto;
  margin-top: 2rem;
}

.search-cont {
  margin-top: 10rem;
}
.message {
  width: fit-content;
  margin: auto;
  margin-top: 6rem;
  background-color: #ff5555;
  padding: 1rem;
  border-radius: 1rem;
}
.footer {
  width: 100%;
  padding: 0.7rem;
  background-color: #2b2f3a;
  position: fixed;
  bottom: 0rem;
  transition: bottom 0.2s ease-in-out;
}

.footer-down
{
  bottom: -4rem;
}

.footer__cont {
  width: fit-content;
  margin: auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.table-cont {
  width: 30rem;
  border-spacing: 0;
  border-radius: 0.8rem;
  margin: auto;
  margin-top: 4rem;
  margin-bottom: 30vh;
}
@media only screen and (max-width: 840px) {
  .table-cont {
    width: 90%;
  }
}
@media only screen and (max-width: 600px) {
  * {
    font-size: small;
  }
}
@media only screen and (max-width: 370px) {
  * {
    font-size: x-small;
  }
  .footer__info-icon {
    font-size: 2rem !important;
  }
  .group {
    border-radius: 0 !important;
    background-color: #656981 !important;
    border: none !important;
  }
  .message {
    width: 80%;
  }
}
</style>
