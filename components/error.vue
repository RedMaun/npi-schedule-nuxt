<script setup>
import { ref } from "vue";
import emojis from "@/utils/emojis";
let emoji = ref("😭");

function emojiRandom() {
  const num = Math.floor(Math.random() * emojis.length);
  emoji.value = emojis[num];
}
</script>

<template>
  <div class="not-found">
    <b class="not-found__error-text">404</b>
    <p class="not-found__text">
      Не найдено
      <button @click="emojiRandom()" class="not-found__emoji">
        <transition name="base" mode="out-in">
          <span :key="emoji">{{ emoji }}</span>
        </transition>
      </button>
    </p>
    <router-link to="/"
      ><button class="not-found__home-button">На главную</button></router-link
    >
  </div>
</template>
<style scoped>
.base-leave-active {
  transition: all 0.05s linear;
}

.base-enter,
.base-leave-to {
  opacity: 0;
}
.not-found__emoji span {
  margin: auto;
  font-size: 1.8rem;
  max-width: 100%;
  max-height: 100%;
  line-height: 100%;
  text-align: center;
}
.not-found {
  width: fit-content;
  position: absolute;
  left: 0;
  right: 0;
  top: 10rem;
  margin: auto;
}

.not-found__error-text {
  font-size: 15rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
.not-found__text {
  position: relative;
  top: -3rem;
  font-size: 2rem;
  white-space: nowrap;
  font-weight: 200;
  color: #ff79c6;
}
.not-found__home-button {
  outline: none;
  border: 0.1rem solid #6272a4;
  background-color: #44475a;
  padding: 1.2rem;
  border-radius: 1rem;
  width: 10rem;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
}
.not-found__home-button:hover {
  background-color: #6a6e85;
}

.not-found__emoji {
  width: 3.5rem;
  height: 3.5rem;
  line-height: 3.5rem;
  text-align: center;
  cursor: pointer;
  font-size: 2rem;
  outline: none;
  border: none;
  background: #ff5555;
  border-radius: 1rem;
}
</style>
