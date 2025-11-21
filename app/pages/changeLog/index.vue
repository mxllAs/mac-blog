<template>
  <MacWindow
    @close="closeWindow"
    scrollbarColor="rgba(0, 0, 0, 0.25) rgba(255, 255, 255, 0.8)"
  >
    <div
      class="p-6 sm:p-8 text-gray-800 bg-white/80 rounded-b-lg min-h-full"
    ></div>
  </MacWindow>
</template>

<script setup>
import MacWindow from "~/components/MacWindow.vue";
const router = useRouter();
const closeWindow = () => {
  router.push("/");
};
</script>

<style scoped></style>
