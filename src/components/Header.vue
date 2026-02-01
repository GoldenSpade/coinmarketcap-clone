<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <RouterLink to="/">
            <h1>CryptoTracker</h1>
          </RouterLink>
        </div>

        <div class="market-stats">
          <div v-if="loading" class="stats-loading">
            <div class="mini-spinner"></div>
          </div>
          <div v-else class="stats-list">
            <div v-for="coin in topCoins" :key="coin.id" class="stat-item" @click="navigateToCoin(coin.id)">
              <img :src="coin.image" :alt="coin.symbol" class="coin-icon" />
              <div class="stat-info">
                <div class="stat-row">
                  <span class="coin-symbol">{{ coin.symbol.toUpperCase() }}</span>
                  <span class="coin-price">${{ formatPrice(coin.current_price) }}</span>
                </div>
                <span
                  :class="[
                    'price-change',
                    coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative',
                  ]"
                >
                  {{ coin.price_change_percentage_24h >= 0 ? '+' : ''
                  }}{{ coin.price_change_percentage_24h.toFixed(2) }}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getCryptoData } from '@/services/cryptoApi'

const router = useRouter()
const topCoins = ref([])
const loading = ref(true)

const fetchTopCoins = async () => {
  try {
    // Fetch only top 3 cryptocurrencies for the header
    const data = await getCryptoData({
      per_page: 3,
      page: 1,
    })
    topCoins.value = data
  } catch (error) {
    console.error('Error fetching header stats:', error)
  } finally {
    loading.value = false
  }
}

const formatPrice = (price) => {
  if (price >= 1) {
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }
  return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })
}

const navigateToCoin = (coinId) => {
  router.push(`/coin/${coinId}`)
}

onMounted(() => {
  fetchTopCoins()
})
</script>

<style scoped>
.header {
  background-color: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.logo h1 {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-green) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: opacity 0.2s;
}

.logo a:hover h1 {
  opacity: 0.8;
}

/* Market Stats */
.market-stats {
  display: flex;
  align-items: center;
}

.stats-loading {
  display: flex;
  align-items: center;
  padding: 0 1rem;
}

.mini-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid var(--border-color);
  border-top-color: var(--accent-blue);
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.stats-list {
  display: flex;
  gap: 1.5rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  background-color: var(--bg-tertiary);
  border-radius: var(--radius-md);
  transition: var(--transition);
  border: 1px solid transparent;
  cursor: pointer;
}

.stat-item:hover {
  background-color: var(--bg-hover);
  border-color: var(--border-hover);
}

.coin-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  flex-shrink: 0;
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.stat-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.coin-symbol {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
}

.coin-price {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-primary);
}

.price-change {
  font-size: 0.7rem;
  font-weight: 600;
}

.price-change.positive {
  color: var(--accent-green);
}

.price-change.negative {
  color: var(--accent-red);
}

@media (max-width: 968px) {
  .stats-list {
    gap: 0.75rem;
  }

  .stat-item {
    padding: 0.3rem 0.625rem;
  }

  .coin-icon {
    width: 18px;
    height: 18px;
  }

  .coin-symbol {
    font-size: 0.65rem;
  }

  .coin-price {
    font-size: 0.75rem;
  }

  .price-change {
    font-size: 0.65rem;
  }
}

@media (max-width: 768px) {
  .header-content {
    height: 60px;
  }

  .logo h1 {
    font-size: 1.25rem;
  }

  .stats-list {
    gap: 0.625rem;
  }

  /* Hide third coin on tablets */
  .stat-item:nth-child(3) {
    display: none;
  }
}

@media (max-width: 580px) {
  .header-content {
    height: 56px;
  }

  .logo h1 {
    font-size: 1.125rem;
  }

  /* Hide second coin on small screens */
  .stat-item:nth-child(2) {
    display: none;
  }

  .stat-item {
    padding: 0.375rem 0.625rem;
  }
}

@media (max-width: 380px) {
  .logo h1 {
    font-size: 1rem;
  }

  .coin-price {
    font-size: 0.75rem;
  }
}
</style>
