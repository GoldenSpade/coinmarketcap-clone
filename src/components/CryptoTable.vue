<template>
  <div class="crypto-table">
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Loading data...</p>
    </div>

    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
      <button @click="fetchCryptoData" class="retry-btn">Retry</button>
    </div>

    <div v-else-if="filteredCryptoData.length === 0" class="no-results">
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" class="no-results-icon">
        <circle cx="26" cy="26" r="16" stroke="currentColor" stroke-width="3"/>
        <path d="M38 38l10 10" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
        <path d="M26 20v12m-6-6h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <p class="no-results-text">No cryptocurrencies found</p>
      <p class="no-results-hint">Try searching for a different cryptocurrency name or symbol</p>
    </div>

    <div v-else class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th class="sortable" @click="handleSort('market_cap_rank')">
              <div class="th-content">
                <span>#</span>
                <span class="sort-icon" v-if="sortBy === 'market_cap_rank'">
                  <svg v-if="sortOrder === 'asc'" width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M6 3l4 5H2z"/>
                  </svg>
                  <svg v-else width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M6 9l4-5H2z"/>
                  </svg>
                </span>
              </div>
            </th>
            <th class="sortable" @click="handleSort('name')">
              <div class="th-content">
                <span>Name</span>
                <span class="sort-icon" v-if="sortBy === 'name'">
                  <svg v-if="sortOrder === 'asc'" width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M6 3l4 5H2z"/>
                  </svg>
                  <svg v-else width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M6 9l4-5H2z"/>
                  </svg>
                </span>
              </div>
            </th>
            <th class="sortable" @click="handleSort('current_price')">
              <div class="th-content">
                <span>Price</span>
                <span class="sort-icon" v-if="sortBy === 'current_price'">
                  <svg v-if="sortOrder === 'asc'" width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M6 3l4 5H2z"/>
                  </svg>
                  <svg v-else width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M6 9l4-5H2z"/>
                  </svg>
                </span>
              </div>
            </th>
            <th class="sortable" @click="handleSort('price_change_percentage_24h')">
              <div class="th-content">
                <span>24h %</span>
                <span class="sort-icon" v-if="sortBy === 'price_change_percentage_24h'">
                  <svg v-if="sortOrder === 'asc'" width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M6 3l4 5H2z"/>
                  </svg>
                  <svg v-else width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M6 9l4-5H2z"/>
                  </svg>
                </span>
              </div>
            </th>
            <th class="sortable" @click="handleSort('price_change_percentage_7d_in_currency')">
              <div class="th-content">
                <span>7d %</span>
                <span class="sort-icon" v-if="sortBy === 'price_change_percentage_7d_in_currency'">
                  <svg v-if="sortOrder === 'asc'" width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M6 3l4 5H2z"/>
                  </svg>
                  <svg v-else width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M6 9l4-5H2z"/>
                  </svg>
                </span>
              </div>
            </th>
            <th class="sortable" @click="handleSort('market_cap')">
              <div class="th-content">
                <span>Market Cap</span>
                <span class="sort-icon" v-if="sortBy === 'market_cap'">
                  <svg v-if="sortOrder === 'asc'" width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M6 3l4 5H2z"/>
                  </svg>
                  <svg v-else width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M6 9l4-5H2z"/>
                  </svg>
                </span>
              </div>
            </th>
            <th class="sortable" @click="handleSort('total_volume')">
              <div class="th-content">
                <span>Volume (24h)</span>
                <span class="sort-icon" v-if="sortBy === 'total_volume'">
                  <svg v-if="sortOrder === 'asc'" width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M6 3l4 5H2z"/>
                  </svg>
                  <svg v-else width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M6 9l4-5H2z"/>
                  </svg>
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="coin in filteredCryptoData" :key="coin.id" class="coin-row">
            <td>{{ coin.market_cap_rank }}</td>
            <td class="coin-info">
              <img :src="coin.image" :alt="coin.name" class="coin-logo">
              <div class="coin-name">
                <span class="name">{{ coin.name }}</span>
                <span class="symbol">{{ coin.symbol.toUpperCase() }}</span>
              </div>
            </td>
            <td class="price">${{ formatPrice(coin.current_price) }}</td>
            <td :class="getPriceChangeClass(coin.price_change_percentage_24h)">
              {{ formatPercentage(coin.price_change_percentage_24h) }}%
            </td>
            <td :class="getPriceChangeClass(coin.price_change_percentage_7d_in_currency)">
              {{ formatPercentage(coin.price_change_percentage_7d_in_currency) }}%
            </td>
            <td>${{ formatLargeNumber(coin.market_cap) }}</td>
            <td>${{ formatLargeNumber(coin.total_volume) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getCryptoData } from '@/services/cryptoApi'

const props = defineProps({
  searchQuery: {
    type: String,
    default: ''
  }
})

const cryptoData = ref([])
const loading = ref(true)
const error = ref(null)
const sortBy = ref('market_cap_rank')
const sortOrder = ref('asc')

const filteredCryptoData = computed(() => {
  let filtered = cryptoData.value

  // Apply search filter
  if (props.searchQuery.trim()) {
    const query = props.searchQuery.toLowerCase().trim()
    filtered = filtered.filter(coin => {
      const name = coin.name.toLowerCase()
      const symbol = coin.symbol.toLowerCase()
      return name.includes(query) || symbol.includes(query)
    })
  }

  // Apply sorting
  if (sortBy.value) {
    filtered = [...filtered].sort((a, b) => {
      let aVal = a[sortBy.value]
      let bVal = b[sortBy.value]

      // Handle name sorting (case-insensitive)
      if (sortBy.value === 'name') {
        aVal = aVal.toLowerCase()
        bVal = bVal.toLowerCase()
      }

      // Handle null/undefined values
      if (aVal == null) return 1
      if (bVal == null) return -1

      if (sortOrder.value === 'asc') {
        return aVal > bVal ? 1 : aVal < bVal ? -1 : 0
      } else {
        return aVal < bVal ? 1 : aVal > bVal ? -1 : 0
      }
    })
  }

  return filtered
})

const handleSort = (field) => {
  if (sortBy.value === field) {
    // Toggle sort order if clicking the same field
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    // Set new field with default order
    sortBy.value = field
    sortOrder.value = field === 'name' ? 'asc' : 'desc'
  }
}

const fetchCryptoData = async () => {
  loading.value = true
  error.value = null

  try {
    const data = await getCryptoData()
    cryptoData.value = data
  } catch (err) {
    error.value = 'Failed to load data. Please check your internet connection.'
    console.error('Error fetching crypto data:', err)
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

const formatPercentage = (value) => {
  if (!value) return '0.00'
  return value.toFixed(2)
}

const formatLargeNumber = (num) => {
  if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T'
  if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B'
  if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M'
  if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K'
  return num.toFixed(2)
}

const getPriceChangeClass = (change) => {
  if (!change) return ''
  return change >= 0 ? 'positive' : 'negative'
}

onMounted(() => {
  fetchCryptoData()
})
</script>

<style scoped>
.crypto-table {
  background-color: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
}

.loading,
.error {
  text-align: center;
  padding: 3rem 0;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border-color);
  border-top-color: var(--accent-blue);
  border-radius: 50%;
  margin: 0 auto 1rem;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error p {
  color: var(--accent-red);
  margin-bottom: 1rem;
}

.retry-btn {
  background-color: var(--accent-blue);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: var(--radius-md);
  font-weight: 500;
}

.retry-btn:hover {
  opacity: 0.9;
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  border-bottom: 1px solid var(--border-color);
}

th {
  text-align: left;
  padding: 1rem 0.75rem;
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

th.sortable {
  cursor: pointer;
  user-select: none;
  transition: var(--transition);
}

th.sortable:hover {
  color: var(--text-primary);
}

.th-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sort-icon {
  display: flex;
  align-items: center;
  color: var(--accent-blue);
}

tbody tr {
  border-bottom: 1px solid var(--border-color);
  transition: var(--transition);
}

tbody tr:hover {
  background-color: var(--bg-hover);
}

td {
  padding: 1rem 0.75rem;
  font-size: 0.95rem;
}

.coin-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.coin-logo {
  width: 28px;
  height: 28px;
  border-radius: 50%;
}

.coin-name {
  display: flex;
  flex-direction: column;
}

.name {
  font-weight: 600;
  color: var(--text-primary);
}

.symbol {
  font-size: 0.85rem;
  color: var(--text-tertiary);
}

.price {
  font-weight: 600;
}

@media (max-width: 1024px) {
  table {
    min-width: 900px;
  }
}

.no-results {
  text-align: center;
  padding: 3rem 0;
}

.no-results-icon {
  color: var(--text-tertiary);
  margin-bottom: 1rem;
}

.no-results-text {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.no-results-hint {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .crypto-table {
    padding: 1rem;
  }

  th,
  td {
    padding: 0.75rem 0.5rem;
    font-size: 0.85rem;
  }
}
</style>
