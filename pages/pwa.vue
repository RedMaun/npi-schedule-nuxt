<script setup>
onBeforeMount(() => {
  const router = useRouter();
  let lastUrl =
    localStorage.getItem("url") === null
      ? "/"
      : localStorage.getItem("url").split(",")[0];
  router.push({ path: lastUrl });
});
</script>
<template>
  <div></div>
</template>
