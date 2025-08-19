<template>
  <div class="w-full flex h-screen bg-[#e5e5e5] p-2">
    <main class="w-full bg-[#fff] rounded-md shadow-md overflow-auto relative">
      <header class="h-[42px]">
        <TopBar />
      </header>
      <slot />
      <footer
        class="absolute bottom-0 flex justify-center items-center left-0 right-0"
      >
        <BottomBar />
      </footer>
    </main>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
main {
  background-image: url("@/assets/images/bg2.webp");
  background-size: cover;
  background-position: center;
}
</style>
