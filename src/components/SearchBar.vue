<template>
  <div class="search-bar">
    <div class="search-input-wrapper">
      <svg class="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM18.5 18.5l-4-4"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <input
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        placeholder="Search cryptocurrencies..."
        class="search-input"
      />
      <button
        v-if="modelValue"
        @click="$emit('update:modelValue', '')"
        class="clear-btn"
        aria-label="Clear search"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M12 4L4 12M4 4l8 8"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.search-bar {
  margin-bottom: 1.5rem;
  min-width: 320px;
}

@media (max-width: 640px) {
  .search-bar {
    min-width: 80%;
  }
}

.search-input-wrapper {
  position: relative;
  max-width: 500px;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-tertiary);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: 0.95rem;
  transition: var(--transition);
}

.search-input:focus {
  outline: none;
  border-color: var(--accent-blue);
  box-shadow: 0 0 0 3px rgba(56, 97, 251, 0.15);
  background-color: var(--bg-tertiary);
}

.search-input::placeholder {
  color: var(--text-tertiary);
}

.clear-btn {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.25rem;
  color: var(--text-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
}

.clear-btn:hover {
  color: var(--text-primary);
  background-color: var(--bg-hover);
}

@media (max-width: 768px) {
  .search-bar {
    margin-bottom: 1.25rem;
  }

  .search-input-wrapper {
    max-width: 100%;
  }

  .search-input {
    font-size: 0.9rem;
    padding: 0.75rem 1rem 0.75rem 2.75rem;
  }

  .search-icon {
    left: 0.875rem;
    width: 18px;
    height: 18px;
  }
}

@media (max-width: 480px) {
  .search-bar {
    margin-bottom: 1rem;
  }

  .search-input {
    font-size: 0.875rem;
    padding: 0.625rem 0.875rem 0.625rem 2.5rem;
  }

  .search-icon {
    left: 0.75rem;
    width: 16px;
    height: 16px;
  }

  .clear-btn {
    right: 0.5rem;
  }

  .clear-btn svg {
    width: 14px;
    height: 14px;
  }
}
</style>
