<template>
  <div class="price-chart">
    <div class="chart-header">
      <h3>Price Chart (7 Days)</h3>
    </div>
    <div v-if="!sparklineData || sparklineData.length === 0" class="chart-error">
      <p>No chart data available</p>
    </div>
    <div v-else class="chart-container">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const props = defineProps({
  sparklineData: {
    type: Array,
    required: true
  },
  priceChange: {
    type: Number,
    default: 0
  }
})

const chartCanvas = ref(null)
let chartInstance = null

const createChart = () => {
  if (!chartCanvas.value || !props.sparklineData || props.sparklineData.length === 0) {
    return
  }

  // Destroy existing chart
  if (chartInstance) {
    chartInstance.destroy()
  }

  const ctx = chartCanvas.value.getContext('2d')

  // Determine color based on price change
  const color = props.priceChange >= 0 ? '#16c784' : '#ea3943'

  // Create gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, 400)
  gradient.addColorStop(0, `${color}40`)
  gradient.addColorStop(1, `${color}00`)

  // Create labels from indices
  const labels = props.sparklineData.map((_, index) => index)

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        data: props.sparklineData,
        borderColor: color,
        backgroundColor: gradient,
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: color,
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index'
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: '#1e2130',
          titleColor: '#ffffff',
          bodyColor: '#a0a0aa',
          borderColor: '#23253a',
          borderWidth: 1,
          padding: 12,
          displayColors: false,
          callbacks: {
            title: () => {
              return '7 Day Price'
            },
            label: (context) => {
              return `$${context.parsed.y.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}`
            }
          }
        }
      },
      scales: {
        x: {
          display: false
        },
        y: {
          display: true,
          position: 'right',
          grid: {
            color: '#23253a',
            drawBorder: false
          },
          ticks: {
            color: '#6c6c7a',
            callback: function(value) {
              return '$' + value.toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              })
            }
          }
        }
      }
    }
  })
}

watch(() => props.sparklineData, () => {
  createChart()
}, { deep: true })

onMounted(() => {
  createChart()
})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})
</script>

<style scoped>
.price-chart {
  background-color: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-md);
}

.chart-header {
  margin-bottom: 1.5rem;
}

.chart-header h3 {
  font-size: 1.5rem;
  margin: 0;
}

.chart-container {
  height: 400px;
  position: relative;
}

.chart-loading,
.chart-error {
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-error p {
  color: var(--accent-red);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border-color);
  border-top-color: var(--accent-blue);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .price-chart {
    padding: 1.5rem;
  }

  .chart-header h3 {
    font-size: 1.25rem;
  }

  .chart-container {
    height: 300px;
  }

  .chart-error {
    height: 300px;
  }
}

@media (max-width: 480px) {
  .price-chart {
    padding: 1.25rem;
  }

  .chart-header h3 {
    font-size: 1.125rem;
  }

  .chart-container {
    height: 250px;
  }

  .chart-error {
    height: 250px;
  }
}
</style>
