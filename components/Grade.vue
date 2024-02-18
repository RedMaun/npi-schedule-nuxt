<script setup>
const props = defineProps({
  grade: Number,
  size: String,
});
</script>

<template>
  <div class="icon-cont">
    <div v-for="index in 5" :id="index">
      <font-awesome-icon
        :style="{ color: grade >= index ? '#F1FA8C' : '#44475A' }"
        icon="star"
        class="icon-cont__icon"
        :class="size ? size : 'fa-sm'"
      />
    </div>
  </div>
</template>

<style scoped>
.icon-cont {
  display: flex;
  flex-direction: row;
}
</style>
