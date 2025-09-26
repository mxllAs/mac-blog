<template>
  <div class="text-white" >文章列表第-{{ pageNumber }}-页</div>
</template>
<script setup>
const route = useRoute();
const pageNumber = route.params.page;
</script>
