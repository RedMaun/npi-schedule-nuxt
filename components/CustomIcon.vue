<script setup>
import { computed } from "vue";
const props = defineProps({
  name: String,
  color: String,
});

const stylesList = computed(() => ({
  color: props.color,
}));
</script>

<template>
  <font-awesome-icon :icon="name" class="fa-1x" :style="stylesList" />
</template>
