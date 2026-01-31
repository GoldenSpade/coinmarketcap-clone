<template>
  <div class="sparkline-container">
    <canvas ref="chartCanvas" :width="width" :height="height"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler
} from 'chart.js'

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler)

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  priceChange: {
    type: Number,
    default: 0
  },
  width: {
    type: Number,
    default: 135
  },
  height: {
    type: Number,
    default: 50
  }
})

const chartCanvas = ref(null)
let chartInstance = null

const createChart = () => {
  if (!chartCanvas.value || !props.data || props.data.length === 0) return

  // Destroy existing chart if it exists
  if (chartInstance) {
    chartInstance.destroy()
  }

  const ctx = chartCanvas.value.getContext('2d')
  const color = props.priceChange >= 0 ? '#16c784' : '#ea3943'

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: props.data.map((_, index) => index),
      datasets: [{
        data: props.data,
        borderColor: color,
        backgroundColor: `${color}15`,
        borderWidth: 1.5,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 0
      }]
    },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: false
        }
      },
      scales: {
        x: {
          display: false
        },
        y: {
          display: false
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      }
    }
  })
}

onMounted(() => {
  createChart()
})

watch(() => props.data, () => {
  createChart()
}, { deep: true })

watch(() => props.priceChange, () => {
  createChart()
})
</script>

<style scoped>
.sparkline-container {
  display: inline-block;
  vertical-align: middle;
}

canvas {
  display: block;
}
</style>
