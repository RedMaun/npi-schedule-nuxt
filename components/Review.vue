<script setup>
import { ref } from "vue";
import Grade from "@/components/Grade.vue";
import { io } from "socket.io-client";
const props = defineProps({
  data: Object,
  visitorId: String,
  ip: String,
});

const socket = io(
  process.env.VUE_APP_SOCKET_URL || import.meta.env.VITE_SOCKET_URL,
);
const { name, grade, text, lecturer, _id } = props.data;
const likes = ref(props.data.likes);
const dislikes = ref(props.data.dislikes);
const liked = ref(false);
const disliked = ref(false);
const checkRate = () => {
  liked.value = false;
  likes.value.map((item) => {
    if (item === props.ip) {
      liked.value = true;
    }
  });
  disliked.value = false;
  dislikes.value.map((item) => {
    if (item === props.ip) {
      disliked.value = true;
    }
  });
};
checkRate();
let hours = new Date(props.data.date).getHours();
hours = hours < 10 ? "0" + hours : hours;

let minutes = new Date(props.data.date).getMinutes();
minutes = minutes < 10 ? "0" + minutes : minutes;

const date =
  hours + ":" + minutes + " " + new Date(props.data.date).toLocaleDateString("ru-RU");

const like = () => {
  if (liked.value) {
    liked.value = !liked.value;
    likes.value.splice(likes.value.length - 1, 1);
  } else {
    liked.value = !liked.value;
    likes.value.push(props.ip);
    if (disliked.value) {
      disliked.value = !disliked.value;
      dislikes.value.splice(likes.value.length - 1, 1);
    }
  }
  socket.emit("like", _id, props.ip);
};
const dislike = () => {
  if (disliked.value) {
    disliked.value = !disliked.value;
    dislikes.value.splice(likes.value.length - 1, 1);
  } else {
    disliked.value = !disliked.value;
    dislikes.value.push(props.ip);
    if (liked.value) {
      liked.value = !liked.value;
      likes.value.splice(likes.value.length - 1, 1);
    }
  }
  socket.emit("dislike", _id, props.ip);
};
</script>

<template>
  <article class="review">
    <header class="head">
      <router-link
        v-if="lecturer"
        :to="`/reviews/${lecturer}`"
        class="head__lecturer"
      >
        {{ lecturer }}
      </router-link>
      <span>{{ date }}</span>
    </header>
    <main class="content">
      <div class="content-info">
        <div class="content-info__name">
          <b>{{ name }}</b>
        </div>
        <div class="content-info__grade">
          <Grade :grade="grade"></Grade>
        </div>
      </div>
      <span class="content__text">{{ text }}</span>
      <div class="rate">
        <div class="rate__cont">
          <button
            class="rate__button rate__like"
            @click="like"
            :style="{ background: liked ? '#ff5555' : '#1e2029' }"
          >
            <font-awesome-icon icon="thumbs-up" class="fa-1x" />
          </button>
          <span>{{ likes.length }}</span>
        </div>
        <span class="rate__sep">|</span>
        <div class="rate__cont">
          <button
            class="rate__button rate__dislike"
            @click="dislike"
            :style="{ background: disliked ? '#ff5555' : '#1e2029' }"
          >
            <font-awesome-icon icon="thumbs-down" class="fa-1x" />
          </button>
          <span>{{ dislikes.length }}</span>
        </div>
      </div>
    </main>
  </article>
</template>

<style scoped>
.review {
  background-color: #282a36;
  border-radius: 0.5rem;
  padding: 1rem;
}
.content__text {
  white-space: normal;
  word-break: break-word;
  word-wrap: break-word;
}
.content {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.review__not-loaded {
  background-color: transparent;
  border-radius: 0;
  padding: 0rem;
}
.rate__button {
  padding: 0.5rem;
  border-radius: 2rem;
  border: 0.1rem solid #9ea2b9;
  border: none;
  width: 2.2rem;
  height: 2.2rem;
  background-color: #1e2029;
  cursor: pointer;
}
.rate {
  margin-top: 0.5rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.rate__sep {
  color: #4b4e60;
}
.rate__cont {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}
.content-info {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
}
.head__lecturer {
  color: #8093ca;
  text-decoration: none;
}
.head__lecturer {
  width: fit-content;
}
.head {
  position: relative;
}
.head span {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
