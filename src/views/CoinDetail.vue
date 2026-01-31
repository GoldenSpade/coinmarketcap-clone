<template>
  <div class="coin-detail">
    <div class="container">
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Loading coin details...</p>
      </div>

      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
        <button @click="fetchCoinDetails" class="retry-btn">Retry</button>
      </div>

      <div v-else-if="coin" class="detail-content">
        <!-- Header Section -->
        <div class="coin-header">
          <button @click="goBack" class="back-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Back
          </button>

          <div class="coin-title">
            <img :src="coin.image.large" :alt="coin.name" class="coin-logo-large">
            <div class="title-info">
              <h1>{{ coin.name }}</h1>
              <span class="symbol">{{ coin.symbol.toUpperCase() }}</span>
              <span class="rank">#{{ coin.market_cap_rank }}</span>
            </div>
          </div>
        </div>

        <!-- Categories -->
        <div v-if="coin.categories && coin.categories.length > 0" class="categories-section">
          <h3 class="section-title">Categories</h3>
          <div class="categories-tags">
            <div class="category-tag" v-for="category in coin.categories.slice(0, 6)" :key="category">
              {{ category }}
            </div>
          </div>
        </div>

        <!-- Price Section -->
        <div class="price-section">
          <div class="current-price">
            <span class="label">Current Price</span>
            <h2>${{ formatPrice(coin.market_data.current_price.usd) }}</h2>
            <div class="price-changes">
              <span :class="getPriceChangeClass(coin.market_data.price_change_percentage_24h)" class="change-badge">
                {{ formatPercentage(coin.market_data.price_change_percentage_24h) }}% (24h)
              </span>
              <span :class="getPriceChangeClass(coin.market_data.price_change_percentage_7d)" class="change-badge">
                {{ formatPercentage(coin.market_data.price_change_percentage_7d) }}% (7d)
              </span>
              <span :class="getPriceChangeClass(coin.market_data.price_change_percentage_30d)" class="change-badge">
                {{ formatPercentage(coin.market_data.price_change_percentage_30d) }}% (30d)
              </span>
              <span v-if="coin.market_data.price_change_percentage_1y" :class="getPriceChangeClass(coin.market_data.price_change_percentage_1y)" class="change-badge">
                {{ formatPercentage(coin.market_data.price_change_percentage_1y) }}% (1y)
              </span>
            </div>
          </div>
        </div>

        <!-- Stats Grid -->
        <div class="stats-grid">
          <div class="stat-card">
            <span class="stat-label">Market Cap</span>
            <span class="stat-value">${{ formatLargeNumber(coin.market_data.market_cap.usd) }}</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">24h Volume</span>
            <span class="stat-value">${{ formatLargeNumber(coin.market_data.total_volume.usd) }}</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Circulating Supply</span>
            <span class="stat-value">{{ formatLargeNumber(coin.market_data.circulating_supply) }} {{ coin.symbol.toUpperCase() }}</span>
          </div>
          <div class="stat-card" v-if="coin.market_data.total_supply">
            <span class="stat-label">Total Supply</span>
            <span class="stat-value">{{ formatLargeNumber(coin.market_data.total_supply) }} {{ coin.symbol.toUpperCase() }}</span>
          </div>
          <div class="stat-card" v-if="coin.market_data.max_supply">
            <span class="stat-label">Max Supply</span>
            <span class="stat-value">{{ formatLargeNumber(coin.market_data.max_supply) }} {{ coin.symbol.toUpperCase() }}</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">All-Time High</span>
            <span class="stat-value">${{ formatPrice(coin.market_data.ath.usd) }}</span>
            <span class="stat-date">{{ formatDate(coin.market_data.ath_date.usd) }}</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">All-Time Low</span>
            <span class="stat-value">${{ formatPrice(coin.market_data.atl.usd) }}</span>
            <span class="stat-date">{{ formatDate(coin.market_data.atl_date.usd) }}</span>
          </div>
          <div class="stat-card" v-if="coin.market_data.high_24h">
            <span class="stat-label">24h High</span>
            <span class="stat-value">${{ formatPrice(coin.market_data.high_24h.usd) }}</span>
          </div>
          <div class="stat-card" v-if="coin.market_data.low_24h">
            <span class="stat-label">24h Low</span>
            <span class="stat-value">${{ formatPrice(coin.market_data.low_24h.usd) }}</span>
          </div>
          <div class="stat-card" v-if="coin.market_data.fully_diluted_valuation">
            <span class="stat-label">Fully Diluted Valuation</span>
            <span class="stat-value">${{ formatLargeNumber(coin.market_data.fully_diluted_valuation.usd) }}</span>
          </div>
          <div class="stat-card" v-if="coin.genesis_date">
            <span class="stat-label">Genesis Date</span>
            <span class="stat-value">{{ formatDate(coin.genesis_date) }}</span>
          </div>
          <div class="stat-card" v-if="coin.hashing_algorithm">
            <span class="stat-label">Hashing Algorithm</span>
            <span class="stat-value">{{ coin.hashing_algorithm }}</span>
          </div>
          <div class="stat-card" v-if="coin.watchlist_portfolio_users">
            <span class="stat-label">Watchlist Users</span>
            <span class="stat-value">{{ formatLargeNumber(coin.watchlist_portfolio_users) }}</span>
          </div>
          <div class="stat-card" v-if="coin.sentiment_votes_up_percentage !== undefined">
            <span class="stat-label">Community Sentiment</span>
            <div class="sentiment-bar">
              <div class="sentiment-positive" :style="{ width: coin.sentiment_votes_up_percentage + '%' }">
                <span class="sentiment-label">{{ coin.sentiment_votes_up_percentage.toFixed(0) }}%</span>
              </div>
              <div class="sentiment-negative" :style="{ width: coin.sentiment_votes_down_percentage + '%' }">
                <span class="sentiment-label">{{ coin.sentiment_votes_down_percentage.toFixed(0) }}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Description -->
        <div v-if="coin.description.en" class="description-section">
          <h3>About {{ coin.name }}</h3>
          <div class="description-content" v-html="sanitizeDescription(coin.description.en)"></div>
        </div>

        <!-- Links -->
        <div class="links-section">
          <h3>Links</h3>
          <div class="links-grid">
            <a v-if="coin.links.homepage[0]" :href="coin.links.homepage[0]" target="_blank" rel="noopener noreferrer" class="link-btn">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 1.5C4.86 1.5 1.5 4.86 1.5 9C1.5 13.14 4.86 16.5 9 16.5C13.14 16.5 16.5 13.14 16.5 9C16.5 4.86 13.14 1.5 9 1.5ZM9 15C5.69 15 3 12.31 3 9C3 5.69 5.69 3 9 3C12.31 3 15 5.69 15 9C15 12.31 12.31 15 9 15Z" fill="currentColor"/>
              </svg>
              Website
            </a>
            <a v-if="coin.links.blockchain_site[0]" :href="coin.links.blockchain_site[0]" target="_blank" rel="noopener noreferrer" class="link-btn">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 1.5L2.25 5.25V12.75L9 16.5L15.75 12.75V5.25L9 1.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Explorer
            </a>
            <a v-if="coin.links.repos_url.github[0]" :href="coin.links.repos_url.github[0]" target="_blank" rel="noopener noreferrer" class="link-btn">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                <path d="M9 1.5C4.86 1.5 1.5 4.86 1.5 9C1.5 12.345 3.69 15.195 6.7575 16.3125C7.1325 16.38 7.275 16.1475 7.275 15.945C7.275 15.7625 7.2675 15.255 7.2675 14.7075C5.25 15.105 4.7925 14.1075 4.635 13.5825C4.545 13.3125 4.1775 12.72 3.855 12.5375C3.585 12.3975 3.21 12 3.8475 11.9925C4.44 11.985 4.8375 12.585 4.9875 12.8175C5.6775 13.9875 6.7875 13.6575 7.2975 13.455C7.365 12.9975 7.5525 12.6675 7.755 12.465C5.9775 12.2625 4.125 11.58 4.125 8.535C4.125 7.695 4.38 7.005 4.9875 6.465C4.91 6.2625 4.665 5.475 5.065 4.4325C5.065 4.4325 5.715 4.23 7.2675 5.2575C7.875 5.0775 8.4375 4.9875 9 4.9875C9.5625 4.9875 10.125 5.0775 10.7325 5.2575C12.285 4.2225 12.935 4.4325 12.935 4.4325C13.335 5.475 13.09 6.2625 13.0125 6.465C13.6125 7.005 13.875 7.6875 13.875 8.535C13.875 11.5875 12.015 12.2625 10.2375 12.465C10.5 12.69 10.725 13.125 10.725 13.8C10.725 14.7975 10.7175 15.6 10.7175 15.945C10.7175 16.1475 10.86 16.3875 11.235 16.3125C14.31 15.195 16.5 12.345 16.5 9C16.5 4.86 13.14 1.5 9 1.5Z"/>
              </svg>
              GitHub
            </a>
            <a v-if="coin.links.twitter_screen_name" :href="`https://twitter.com/${coin.links.twitter_screen_name}`" target="_blank" rel="noopener noreferrer" class="link-btn">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                <path d="M14.258 4.758c.012.174.012.348.012.522 0 5.307-4.04 11.424-11.424 11.424v-.003A11.358 11.358 0 010 15.544a8.058 8.058 0 005.93-1.657 4.016 4.016 0 01-3.746-2.783 4.005 4.005 0 001.81-.069A4.01 4.01 0 01.777 7.089v-.051c.548.305 1.165.473 1.798.493A4.014 4.014 0 01.836 1.697a11.388 11.388 0 008.265 4.192 4.013 4.013 0 016.835-3.658 8.052 8.052 0 002.547-.973 4.026 4.026 0 01-1.762 2.216A8.006 8.006 0 0018 2.967a8.159 8.159 0 01-2.005 2.073l-.737-.282z"/>
              </svg>
              Twitter
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCoinDetails } from '@/services/cryptoApi'

const route = useRoute()
const router = useRouter()

const coin = ref(null)
const loading = ref(true)
const error = ref(null)

const fetchCoinDetails = async () => {
  loading.value = true
  error.value = null

  try {
    const data = await getCoinDetails(route.params.id)
    coin.value = data
  } catch (err) {
    error.value = 'Failed to load coin details. Please try again.'
    console.error('Error fetching coin details:', err)
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.push('/')
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
  if (!num) return 'N/A'
  if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T'
  if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B'
  if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M'
  if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K'
  return num.toFixed(2)
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getPriceChangeClass = (change) => {
  if (!change) return ''
  return change >= 0 ? 'positive' : 'negative'
}

const sanitizeDescription = (html) => {
  // Remove potentially dangerous tags and keep only safe formatting
  const div = document.createElement('div')
  div.innerHTML = html

  // Remove scripts and other dangerous elements
  const scripts = div.getElementsByTagName('script')
  let i = scripts.length
  while (i--) {
    scripts[i].parentNode.removeChild(scripts[i])
  }

  // Limit description length
  let text = div.innerHTML
  if (text.length > 1000) {
    text = text.substring(0, 1000) + '...'
  }

  return text
}

onMounted(() => {
  fetchCoinDetails()
})
</script>

<style scoped>
.coin-detail {
  padding: 2rem 0;
  min-height: calc(100vh - 64px);
}

.loading,
.error {
  text-align: center;
  padding: 3rem 1.5rem;
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

.detail-content {
  max-width: 1000px;
  margin: 0 auto;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  padding: 0.5rem 0;
}

.back-btn:hover {
  color: var(--text-primary);
}

.coin-header {
  margin-bottom: 2rem;
}

.coin-title {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.coin-logo-large {
  width: 64px;
  height: 64px;
  border-radius: 50%;
}

.title-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.title-info h1 {
  font-size: 2.25rem;
  font-weight: 700;
  margin: 0;
}

.symbol {
  background-color: var(--bg-tertiary);
  color: var(--text-secondary);
  padding: 0.375rem 0.75rem;
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
}

.rank {
  background-color: var(--bg-tertiary);
  color: var(--text-secondary);
  padding: 0.375rem 0.75rem;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 600;
}

.categories-section {
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.75rem;
}

.categories-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.category-tag {
  background-color: var(--bg-secondary);
  color: var(--text-secondary);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  font-size: 0.85rem;
  font-weight: 500;
  border: 1px solid var(--border-color);
  transition: var(--transition);
}

.category-tag:hover {
  background-color: var(--bg-tertiary);
  border-color: var(--border-hover);
  color: var(--text-primary);
}

.price-section {
  background-color: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-md);
}

.current-price .label {
  color: var(--text-secondary);
  font-size: 0.875rem;
  display: block;
  margin-bottom: 0.5rem;
}

.current-price h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.price-changes {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.change-badge {
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 0.9rem;
}

.change-badge.positive {
  background-color: rgba(22, 199, 132, 0.1);
  color: var(--accent-green);
}

.change-badge.negative {
  background-color: rgba(234, 57, 67, 0.1);
  color: var(--accent-red);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background-color: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
}

.stat-label {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.stat-value {
  color: var(--text-primary);
  font-size: 1.25rem;
  font-weight: 600;
}

.stat-date {
  color: var(--text-tertiary);
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

.sentiment-bar {
  display: flex;
  width: 100%;
  height: 40px;
  border-radius: var(--radius-md);
  overflow: hidden;
  margin-top: 0.5rem;
}

.sentiment-positive,
.sentiment-negative {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
}

.sentiment-positive {
  background-color: var(--accent-green);
}

.sentiment-negative {
  background-color: var(--accent-red);
}

.sentiment-label {
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
}

.description-section {
  background-color: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-md);
}

.description-section h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.description-content {
  color: var(--text-secondary);
  line-height: 1.8;
  font-size: 0.95rem;
}

.description-content :deep(a) {
  color: var(--accent-blue);
}

.links-section {
  background-color: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: 2rem;
  box-shadow: var(--shadow-md);
}

.links-section h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.links-grid {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.link-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--bg-tertiary);
  color: var(--text-secondary);
  padding: 0.625rem 1rem;
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  font-weight: 500;
  transition: var(--transition);
}

.link-btn:hover {
  background-color: var(--bg-hover);
  color: var(--text-primary);
}

@media (max-width: 768px) {
  .coin-detail {
    padding: 1.5rem 0;
  }

  .coin-logo-large {
    width: 48px;
    height: 48px;
  }

  .title-info h1 {
    font-size: 1.75rem;
  }

  .current-price h2 {
    font-size: 2rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .price-section,
  .description-section,
  .links-section {
    padding: 1.5rem;
  }

  .category-tag {
    font-size: 0.8rem;
    padding: 0.4rem 0.875rem;
  }
}

@media (max-width: 480px) {
  .coin-title {
    gap: 1rem;
  }

  .title-info h1 {
    font-size: 1.5rem;
    width: 100%;
  }

  .current-price h2 {
    font-size: 1.75rem;
  }

  .price-section,
  .description-section,
  .links-section {
    padding: 1.25rem;
  }

  .category-tag {
    font-size: 0.75rem;
    padding: 0.375rem 0.75rem;
  }

  .price-changes {
    gap: 0.5rem;
  }

  .change-badge {
    font-size: 0.85rem;
    padding: 0.4rem 0.875rem;
  }

  .sentiment-bar {
    height: 35px;
  }

  .sentiment-label {
    font-size: 0.8rem;
  }
}
</style>
