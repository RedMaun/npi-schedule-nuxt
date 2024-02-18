<template>
  <div class="spin"></div>
</template>

<style scoped>
@keyframes spinner {
  0% {
    transform: translate3d(-50%, -50%, 0) rotate(0deg);
  }
  100% {
    transform: translate3d(-50%, -50%, 0) rotate(360deg);
  }
}

.spin::before {
  animation: 1s linear infinite spinner;
  animation-play-state: inherit;
  border: solid 0.4rem #f8f8f2;
  border-bottom-color: #ff79c6;
  border-radius: 50%;
  content: "";
  height: 40px;
  width: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  will-change: transform;
}
</style>
