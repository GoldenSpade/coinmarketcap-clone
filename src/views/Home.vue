<template>
  <div class="home">
    <div class="container">
      <div class="header-section">
        <h2 class="page-title">Cryptocurrency Market</h2>
        <p class="page-subtitle">Track cryptocurrency prices in real-time</p>
      </div>

      <SearchBar v-model="searchQuery" />

      <CryptoTable :search-query="searchQuery" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CryptoTable from '@/components/CryptoTable.vue'
import SearchBar from '@/components/SearchBar.vue'

const searchQuery = ref('')
</script>

<style scoped>
.home {
  padding: 2rem 0;
}

.header-section {
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  color: var(--text-secondary);
  font-size: 1rem;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 1.5rem;
  }
}
</style>
