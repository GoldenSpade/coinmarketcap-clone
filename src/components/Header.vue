<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <h1>CryptoTracker</h1>
        </div>
        <nav class="nav">
          <RouterLink to="/" class="nav-link">Markets</RouterLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background-color: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
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
}

.nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 0.95rem;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--text-primary);
}
</style>
