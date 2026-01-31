<template>
  <div class="app">
    <Header />
    <main>
      <RouterView />
    </main>
    <ScrollToTop />
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import ScrollToTop from '@/components/ScrollToTop.vue'
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
