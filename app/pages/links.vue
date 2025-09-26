<template>
  <MacWindow @close="closeWindow">
    <div>
      <h1 class="text-3xl font-bold mb-8 text-center">友情链接</h1>
    </div>
  </MacWindow>
</template>

<script setup>
import MacWindow from "~/components/MacWindow.vue";
const router = useRouter();
const closeWindow = () => {
  router.push("/");
};
</script>

<style></style>
