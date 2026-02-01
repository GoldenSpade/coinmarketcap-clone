# CryptoTracker - CoinMarketCap Clone

A modern cryptocurrency tracker web application built with Vue.js 3 using Composition API and the free CoinGecko API.

![Vue.js](https://img.shields.io/badge/Vue.js-3.x-brightgreen)
![Vite](https://img.shields.io/badge/Vite-Latest-646CFF)
![License](https://img.shields.io/badge/License-MIT-blue)

## Features

### Core Functionality
- ✅ Display top 100 cryptocurrencies by market capitalization
- ✅ Real-time price data updates
- ✅ Price change percentages (24h, 7d, 30d, 1y)
- ✅ Market cap, volume, and supply information
- ✅ Interactive 7-day price trend sparkline charts
- ✅ Search cryptocurrencies by name or symbol
- ✅ Sortable table columns (rank, name, price, changes, market cap, volume)

### Live Header Statistics
- ✅ Real-time display of top 3 cryptocurrencies in header
- ✅ Quick access to BTC, ETH, and #3 coin prices
- ✅ 24h price change indicators with color coding
- ✅ Clickable cards for instant navigation to coin details
- ✅ Responsive design (shows 3 coins on desktop, 2 on tablet, 1 on mobile)

### Detailed Coin Pages
- ✅ Comprehensive coin information
- ✅ Interactive 7-day price chart with Chart.js
- ✅ Categories and tags
- ✅ All-time high/low with dates
- ✅ 24h high/low prices
- ✅ Fully diluted valuation
- ✅ Genesis date
- ✅ Hashing algorithm
- ✅ Community sentiment visualization
- ✅ Watchlist statistics
- ✅ Coin description and links
- ✅ Automatic data refresh when navigating between coins

### UI/UX
- ✅ Dark theme inspired by CoinMarketCap
- ✅ Fully responsive design (supports devices from 350px and up)
- ✅ Smooth scroll-to-top button
- ✅ Clean and modern interface
- ✅ Hover effects and transitions
- ✅ Visual price change indicators (green/red)
- ✅ Interactive elements with cursor feedback

### Performance Optimizations
- ✅ Optimized API requests (sparkline data included in main requests)
- ✅ Reduced API calls to prevent rate limiting
- ✅ Efficient data loading and caching
- ✅ Smart component re-rendering with Vue watchers

## Tech Stack

- **Vue.js 3** - Progressive JavaScript framework with Composition API
- **Vue Router** - Official router for Vue.js
- **Axios** - Promise-based HTTP client
- **Chart.js** - JavaScript charting library for sparklines
- **Vite** - Next-generation frontend build tool
- **CoinGecko API** - Free cryptocurrency data API

## Project Structure

```
coinmarketcap-clone/
├── src/
│   ├── assets/
│   │   └── styles/
│   │       └── main.css              # Global styles and CSS variables
│   ├── components/
│   │   ├── Header.vue                # Site header with live top 3 crypto stats
│   │   ├── CryptoTable.vue           # Main cryptocurrency table
│   │   ├── SearchBar.vue             # Search input component
│   │   ├── Sparkline.vue             # 7-day mini chart for table rows
│   │   ├── PriceChart.vue            # Interactive price chart for detail pages
│   │   └── ScrollToTop.vue           # Scroll-to-top button
│   ├── services/
│   │   └── cryptoApi.js              # CoinGecko API service
│   ├── views/
│   │   ├── Home.vue                  # Home page with table
│   │   └── CoinDetail.vue            # Detailed coin information page
│   ├── router/
│   │   └── index.js                  # Router configuration
│   ├── App.vue                       # Root component
│   └── main.js                       # Application entry point
├── public/                           # Static files
├── .env.example                      # Environment variables template
├── index.html                        # HTML template
├── package.json                      # Dependencies
└── vite.config.js                    # Vite configuration
```

## Installation and Setup

### Requirements

- Node.js >= 20.18.2
- npm >= 10.8.2

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory (or copy from `.env.example`):

```bash
cp .env.example .env
```

The `.env` file should contain:
```env
VITE_API_BASE_URL=https://api.coingecko.com/api/v3
```

### Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Development Principles

- **Component-Based Architecture** - Each UI element is a separate reusable component
- **DRY (Don't Repeat Yourself)** - Avoiding code duplication
- **KISS (Keep It Simple, Stupid)** - Code simplicity and readability
- **Composition API** - Modern approach to writing Vue components
- **Responsive First** - Mobile-friendly design from the start

## API Information

This project uses the free [CoinGecko API](https://www.coingecko.com/en/api) to fetch cryptocurrency data.

**Free API Limits:**
- 10-30 requests per minute
- No API key required
- Public endpoints only

**Endpoints Used:**
- `/coins/markets` - List of cryptocurrencies with market data (includes sparkline data for charts)
- `/coins/{id}` - Detailed information about specific cryptocurrency (includes 7-day sparkline for price chart)

## Features Breakdown

### Live Header
- Displays real-time data for top 3 cryptocurrencies
- Compact cards showing coin icon, symbol, price, and 24h change
- Click any card to navigate to detailed coin page
- Responsive design adapts to screen size
- Smooth hover effects and transitions
- Independent API request optimized for minimal data usage

### Search
- Real-time search filtering
- Search by cryptocurrency name or symbol
- No results state with helpful message
- Clear search button

### Sorting
- Click column headers to sort
- Visual sort direction indicators
- Supports ascending/descending order
- Default sort by market cap rank

### Sparkline Charts
- 7-day price trend visualization in table rows
- Color-coded (green for gains, red for losses)
- Smooth line rendering with Chart.js
- Responsive sizing

### Price Charts
- Interactive 7-day price chart on coin detail pages
- Full-size Chart.js visualization
- Color-coded based on price performance
- Uses optimized sparkline data from main API request
- Smooth gradient fills

### Coin Details Page
- Interactive 7-day price chart
- Comprehensive statistics grid
- Price change badges for multiple time periods
- Interactive category tags
- Community sentiment bar chart
- External links (website, explorer, GitHub, Twitter)
- Back to home navigation
- Automatic scroll to top on page load
- Smart data reloading when navigating between coins

### Responsive Design
- **Desktop** (>1024px): Full layout with all features
- **Tablet** (768px-1024px): Adjusted spacing and font sizes
- **Mobile** (480px-768px): Compact layout with horizontal scroll for table
- **Small Mobile** (350px-480px): Optimized for smallest screens

## Color Scheme

The application uses a dark theme inspired by CoinMarketCap:

- **Primary Background**: `#0d1421`
- **Secondary Background**: `#0f101c`
- **Accent Green**: `#16c784` (positive changes)
- **Accent Red**: `#ea3943` (negative changes)
- **Accent Blue**: `#3861fb` (interactive elements)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Key Technical Improvements

### API Optimization
- Sparkline data is fetched once with the main cryptocurrency data, eliminating redundant API calls
- Header component makes a single lightweight request for top 3 coins
- Prevents CoinGecko API rate limiting issues

### Navigation & State Management
- Vue Router watchers ensure data refreshes when navigating between coin detail pages
- Seamless navigation from header cards, table rows, and detail pages
- Maintains scroll position and loading states

### Code Quality
- All code comments and documentation in English
- Clean component structure following Vue 3 Composition API best practices
- Consistent naming conventions and file organization
- Optimized CSS with custom properties for theming

## License

MIT

## Acknowledgments

- Data provided by [CoinGecko API](https://www.coingecko.com/)
- Design inspired by [CoinMarketCap](https://coinmarketcap.com/)
- Built with [Vue.js](https://vuejs.org/)
