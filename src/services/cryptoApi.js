import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
})

export const getCryptoData = async (params = {}) => {
  const defaultParams = {
    vs_currency: 'usd',
    order: 'market_cap_desc',
    per_page: 100,
    page: 1,
    sparkline: false,
    price_change_percentage: '24h,7d'
  }

  const finalParams = { ...defaultParams, ...params }

  try {
    const response = await apiClient.get('/coins/markets', {
      params: finalParams
    })
    return response.data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

export const getCoinDetails = async (coinId) => {
  try {
    const response = await apiClient.get(`/coins/${coinId}`, {
      params: {
        localization: false,
        tickers: false,
        community_data: false,
        developer_data: false
      }
    })
    return response.data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}
