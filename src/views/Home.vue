<template>
  <div class="home">
    <div class="container">
      <div class="header-wrap">
        <div class="header-section">
          <h2 class="page-title">Cryptocurrency Market</h2>
          <p class="page-subtitle">Track cryptocurrency prices in real-time</p>
        </div>

        <SearchBar v-model="searchQuery" />
      </div>

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

.header-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media (max-width: 640px) {
  .header-wrap {
    justify-content: center;
    flex-wrap: wrap;
  }
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
  .home {
    padding: 1.5rem 0;
  }

  .header-section {
    margin-bottom: 1.5rem;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .page-subtitle {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .home {
    padding: 1rem 0;
  }

  .header-section {
    margin-bottom: 1.25rem;
  }

  .page-title {
    font-size: 1.25rem;
  }

  .page-subtitle {
    font-size: 0.85rem;
  }
}
</style>
