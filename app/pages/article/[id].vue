<template>
  <MacWindow @close="closeWindow">
    <h1 class="text-3xl font-bold mb-8 text-center">文章详情-{{ id }}</h1>
  </MacWindow>
</template>
<script setup>
const route = useRoute();
const id = route.params.id;
</script>
