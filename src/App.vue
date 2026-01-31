<template>
  <div class="app">
    <Header />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
