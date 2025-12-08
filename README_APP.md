# Web Scraper - Comprehensive Documentation

Complete guide for building a production-ready web scraper for agency lead generation using Node.js, Puppeteer, and PostgreSQL.

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Project Structure](#project-structure)
3. [Installation & Setup](#installation--setup)
4. [Configuration](#configuration)
5. [Core Modules](#core-modules)
6. [Scraping Strategies](#scraping-strategies)
7. [Proxy Strategy (Optional)](#proxy-strategy-optional)
8. [Performance Optimization](#performance-optimization)
9. [Error Handling & Recovery](#error-handling--recovery)
10. [Monitoring & Logging](#monitoring--logging)
11. [Best Practices](#best-practices)
12. [Deployment](#deployment)

---

## Architecture Overview

### System Design

```
┌─────────────────────────────────────────────────┐
│         WEB SCRAPER ARCHITECTURE                │
├─────────────────────────────────────────────────┤
│                                                 │
│  [1] Data Sources                               │
│      ├─ Google Maps API                         │
│      ├─ Website Content                         │
│      ├─ Contact Pages                           │
│      └─ Impressum Pages (DACH Specific)         │
│           ↓                                     │
│  [2] Scraping Engine (Puppeteer)                │
│      ├─ Stealth Mode (puppeteer-extra)          │
│      ├─ User Agent Rotation                     │
│      ├─ Rate Limiting                           │
│      └─ Error Recovery                          │
│           ↓                                     │
│  [3] Data Processing                            │
│      ├─ Email Extraction (RegEx)                │
│      ├─ Contact Information Parsing             │
│      ├─ Data Validation                         │
│      └─ Deduplication                           │
│           ↓                                     │
│  [4] Storage Layer                              │
│      ├─ PostgreSQL Database                     │
│      ├─ Redis Cache (optional)                  │
│      └─ JSON Exports                            │
│           ↓                                     │
│  [5] Queue System                               │
│      ├─ Bull/Bull MQ (job queuing)              │
│      ├─ Retry Logic                             │
│      └─ Priority Queuing                        │
│           ↓                                     │
│  [6] Output & Monitoring                        │
│      ├─ CSV/JSON Exports                        │
│      ├─ Airtable Integration                    │
│      ├─ Slack Notifications                     │
│      └─ Health Dashboard                        │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Key Features

- **No Proxies Required** (optional for scale)
- **DACH-Optimized** (Impressum scraping)
- **Stealth Mode** (puppeteer-extra-plugin-stealth)
- **Resilient** (automatic retries, error recovery)
- **Scalable** (job queue, parallel processing)
- **Observable** (logging, monitoring, alerts)
- **Production-Ready** (error handling, graceful shutdown)

---

## Project Structure

```
lead-scraper/
├── src/
│   ├── config/
│   │   ├── index.js              # Main config loader
│   │   ├── database.js           # PostgreSQL config
│   │   ├── puppeteer.js          # Puppeteer config
│   │   └── logging.js            # Logger config
│   │
│   ├── scrapers/
│   │   ├── base.scraper.js       # Base scraper class
│   │   ├── google-maps.scraper.js # Google Maps scraper
│   │   ├── website.scraper.js    # Website content scraper
│   │   ├── email.scraper.js      # Email finder scraper
│   │   └── index.js              # Scraper factory
│   │
│   ├── services/
│   │   ├── browser.service.js    # Browser pool management
│   │   ├── database.service.js   # DB operations
│   │   ├── email.service.js      # Email extraction & validation
│   │   ├── data-processor.service.js # Data cleaning & enrichment
│   │   ├── queue.service.js      # Job queue management
│   │   └── http.service.js       # HTTP requests with retries
│   │
│   ├── utils/
│   │   ├── logger.js             # Logging utility
│   │   ├── error-handler.js      # Error handling
│   │   ├── retry.js              # Retry logic
│   │   ├── validators.js         # Data validators
│   │   ├── user-agents.js        # User agent pool
│   │   ├── delays.js             # Random delay utilities
│   │   └── file-ops.js           # File operations
│   │
│   ├── models/
│   │   ├── company.model.js      # Company data model
│   │   ├── contact.model.js      # Contact data model
│   │   └── scrape-job.model.js   # Job tracking model
│   │
│   ├── workflows/
│   │   ├── full-scrape.workflow.js     # Complete workflow
│   │   ├── enrich-existing.workflow.js # Enrich stored data
│   │   └── deduplication.workflow.js   # Dedup & merge
│   │
│   ├── exports/
│   │   ├── csv.exporter.js       # CSV export
│   │   ├── airtable.exporter.js  # Airtable sync
│   │   ├── json.exporter.js      # JSON export
│   │   └── index.js              # Exporter factory
│   │
│   └── index.js                  # Main entry point
│
├── database/
│   ├── migrations/
│   │   ├── 001_create_companies.sql
│   │   ├── 002_create_contacts.sql
│   │   └── 003_create_jobs.sql
│   │
│   ├── seeds/
│   │   └── init-data.sql
│   │
│   └── schema.sql               # Full schema
│
├── scripts/
│   ├── setup.js                 # Initialize DB & tables
│   ├── run-scraper.js           # Single scraper run
│   ├── schedule-scraper.js      # Cron scheduler
│   ├── export-data.js           # Export to various formats
│   ├── cleanup.js               # Database cleanup
│   └── monitor.js               # Health monitoring
│
├── tests/
│   ├── unit/
│   │   ├── email.service.test.js
│   │   ├── validators.test.js
│   │   └── data-processor.test.js
│   │
│   ├── integration/
│   │   ├── scraper.integration.test.js
│   │   └── workflow.integration.test.js
│   │
│   └── fixtures/
│       ├── sample-pages/
│       ├── mock-responses/
│       └── test-data.json
│
├── logs/
│   ├── error.log
│   ├── scraper.log
│   └── system.log
│
├── docs/
│   ├── SCRAPING_STRATEGIES.md
│   ├── API_REFERENCE.md
│   ├── DEPLOYMENT.md
│   ├── TROUBLESHOOTING.md
│   └── PERFORMANCE_TUNING.md
│
├── .env.example              # Environment variables template
├── .env                      # (gitignored) Actual env vars
├── .eslintrc.json           # ESLint config
├── .prettierrc.json         # Prettier config
├── .gitignore               # Git ignore rules
├── package.json             # Dependencies & scripts
├── package-lock.json        # Locked versions
├── docker-compose.yml       # Local dev environment
├── Dockerfile               # Production image
├── README.md                # Main documentation
└── CHANGELOG.md             # Version history
```

### Rationale

**Separation of Concerns:**
- `config/` - All configuration management
- `scrapers/` - Scraping logic (one per source)
- `services/` - Business logic (browser, DB, queue)
- `utils/` - Reusable utilities
- `models/` - Data models & validation
- `workflows/` - High-level orchestration
- `exports/` - Output adapters

**Benefits:**
- Easy to test individual modules
- Simple to add new scrapers
- Clear dependency flow
- Maintainable at scale
- Easy onboarding for new developers

---

## Installation & Setup

### Prerequisites

**Hardware:**
- RAM: 16GB minimum (you have 16-32GB ✓)
- CPU: 4+ cores recommended
- Storage: 50GB+ for data
- Network: Stable connection

**Software:**
- Node.js 18+ (use nvm for version management)
- PostgreSQL 13+
- Redis (optional, for advanced queue management)

### 1. System Setup

```bash
# Clone repository
git clone https://github.com/yourusername/lead-scraper.git
cd lead-scraper

# Install Node version manager (if not installed)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# Install Node.js LTS
nvm install 20
nvm use 20

# Verify installations
node --version    # v20.x.x
npm --version     # 10.x.x+
```

### 2. PostgreSQL Setup

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database and user
CREATE DATABASE lead_scraper;
CREATE USER scraper_user WITH PASSWORD 'your_secure_password';
ALTER ROLE scraper_user SET client_encoding TO 'utf8';
ALTER ROLE scraper_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE scraper_user SET default_transaction_deferrable TO on;
ALTER ROLE scraper_user SET default_transaction_deferrable TO on;
GRANT ALL PRIVILEGES ON DATABASE lead_scraper TO scraper_user;

# Exit psql
\q
```

### 3. Project Installation

```bash
# Install dependencies
npm install

# Run database migrations
npm run db:migrate

# Initialize database schema
npm run db:init

# Create .env file from template
cp .env.example .env

# Edit .env with your credentials
nano .env
```

### 4. Configuration

See [Configuration](#configuration) section below.

### 5. Verify Installation

```bash
# Test database connection
npm run db:test

# Test Puppeteer
npm run test:puppeteer

# Test scraper
npm run test:scraper

# All tests
npm test
```

---

## Configuration

### Environment Variables (.env)

```env
# ===== ENVIRONMENT =====
NODE_ENV=development                    # development|staging|production
LOG_LEVEL=info                          # error|warn|info|debug|trace

# ===== DATABASE =====
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lead_scraper
DB_USER=scraper_user
DB_PASSWORD=your_secure_password
DB_POOL_MIN=2                           # Minimum connection pool
DB_POOL_MAX=20                          # Maximum connection pool (higher for parallel scraping)

# ===== PUPPETEER =====
PUPPETEER_HEADLESS=true                 # Run headless (no GUI)
PUPPETEER_TIMEOUT=30000                 # Page load timeout (ms)
PUPPETEER_NAV_TIMEOUT=30000             # Navigation timeout (ms)
PUPPETEER_LAUNCH_ARGS=--no-sandbox,--disable-setuid-sandbox

# ===== SCRAPING BEHAVIOR =====
SCRAPER_RATE_LIMIT_DELAY=3000           # Min delay between requests (ms)
SCRAPER_RATE_LIMIT_JITTER=2000          # Random jitter (±ms)
SCRAPER_MAX_RETRIES=3                   # Retry failed requests N times
SCRAPER_RETRY_DELAY=5000                # Delay before retry (ms)
SCRAPER_CONCURRENT_PAGES=5              # Parallel pages per browser instance
SCRAPER_CONCURRENT_BROWSERS=2           # Multiple browser instances
SCRAPER_DISABLE_IMAGES=true             # Don't load images (faster, less bandwidth)
SCRAPER_DISABLE_CSS=false               # Load CSS (needed for layout)
SCRAPER_DISABLE_FONTS=true              # Don't load fonts (faster)

# ===== DATA SOURCES =====
GOOGLE_MAPS_API_KEY=your_api_key        # For Google Maps API (optional)
SEARCH_CITIES=Berlin,Munich,Hamburg,Cologne,Frankfurt
SEARCH_KEYWORDS=Webdesign Agentur,Digital Agency,WordPress Agency

# ===== QUEUE & JOBS =====
QUEUE_MAX_ATTEMPTS=5                    # Max job retry attempts
QUEUE_BACKOFF_DELAY=5000                # Exponential backoff (ms)
QUEUE_PROCESS_CONCURRENCY=3             # Jobs to process in parallel

# ===== EXPORTS =====
EXPORT_FORMAT=csv,json                  # Formats to export
AIRTABLE_API_KEY=your_key               # For Airtable export (optional)
AIRTABLE_BASE_ID=your_base_id
AIRTABLE_TABLE_NAME=Companies

# ===== MONITORING & ALERTS =====
SLACK_WEBHOOK_URL=your_webhook_url      # Slack notifications
SENTRY_DSN=your_sentry_dsn              # Error tracking (optional)
HEALTHCHECK_INTERVAL=3600000            # Health check frequency (ms)

# ===== PROXIES (OPTIONAL) =====
USE_PROXIES=false                       # Enable proxy rotation
PROXY_TYPE=datacenter|residential       # Proxy type
PROXY_PROVIDER=your_provider            # brightdata, oxylabs, etc.
PROXY_USERNAME=your_username
PROXY_PASSWORD=your_password
PROXY_ROTATE_INTERVAL=10                # Rotate proxy every N requests

# ===== FILTERING =====
MIN_EMPLOYEES=3
MAX_EMPLOYEES=20
COUNTRY=DE,AT,CH                        # Country codes
LANGUAGES=de,en                         # Scrape languages
```

### config/index.js

```javascript
require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  isDev: process.env.NODE_ENV !== 'production',
  
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    file: {
      error: 'logs/error.log',
      combined: 'logs/scraper.log',
    },
  },

  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    max: parseInt(process.env.DB_POOL_MAX || '20'),
    min: parseInt(process.env.DB_POOL_MIN || '2'),
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  },

  puppeteer: {
    headless: process.env.PUPPETEER_HEADLESS !== 'false',
    timeout: parseInt(process.env.PUPPETEER_TIMEOUT || '30000'),
    navigationTimeout: parseInt(process.env.PUPPETEER_NAV_TIMEOUT || '30000'),
    launchArgs: (process.env.PUPPETEER_LAUNCH_ARGS || '').split(',').filter(Boolean),
    disableImages: process.env.SCRAPER_DISABLE_IMAGES === 'true',
    disableCss: process.env.SCRAPER_DISABLE_CSS === 'true',
    disableFonts: process.env.SCRAPER_DISABLE_FONTS === 'true',
  },

  scraper: {
    rateLimit: {
      delay: parseInt(process.env.SCRAPER_RATE_LIMIT_DELAY || '3000'),
      jitter: parseInt(process.env.SCRAPER_RATE_LIMIT_JITTER || '2000'),
    },
    retry: {
      maxAttempts: parseInt(process.env.SCRAPER_MAX_RETRIES || '3'),
      delayMs: parseInt(process.env.SCRAPER_RETRY_DELAY || '5000'),
    },
    concurrent: {
      pages: parseInt(process.env.SCRAPER_CONCURRENT_PAGES || '5'),
      browsers: parseInt(process.env.SCRAPER_CONCURRENT_BROWSERS || '2'),
    },
    sources: {
      cities: (process.env.SEARCH_CITIES || '').split(','),
      keywords: (process.env.SEARCH_KEYWORDS || '').split(','),
    },
  },

  exports: {
    formats: (process.env.EXPORT_FORMAT || 'csv,json').split(','),
    airtable: {
      enabled: !!process.env.AIRTABLE_API_KEY,
      apiKey: process.env.AIRTABLE_API_KEY,
      baseId: process.env.AIRTABLE_BASE_ID,
      tableName: process.env.AIRTABLE_TABLE_NAME,
    },
  },

  proxies: {
    enabled: process.env.USE_PROXIES === 'true',
    type: process.env.PROXY_TYPE,
    provider: process.env.PROXY_PROVIDER,
    credentials: {
      username: process.env.PROXY_USERNAME,
      password: process.env.PROXY_PASSWORD,
    },
    rotateInterval: parseInt(process.env.PROXY_ROTATE_INTERVAL || '10'),
  },
};

module.exports = config;
```

---

## Core Modules

### 1. Browser Service

**Purpose:** Manage browser instances, page pools, and lifecycle.

**Key Features:**
- Browser pool management (reuse across jobs)
- Stealth mode integration
- Memory optimization
- Automatic cleanup

### 2. Scraper Base Class

**Provides:**
- Common scraping patterns
- Error handling
- Retry logic
- Rate limiting

### 3. Email Service

**Functionality:**
- Email regex patterns (international support)
- Validation (format, deliverability)
- Deduplication
- Confidence scoring

### 4. Data Processor Service

**Operations:**
- Data cleaning
- Enrichment
- Normalization
- Deduplication

### 5. Queue Service

**Features:**
- Job queuing (Bull/Bull-MQ)
- Retry logic
- Priority handling
- Job tracking

---

## Scraping Strategies

### Strategy 1: Google Maps (No Proxy Needed) ✓

**Best For:** Local agency discovery

**Approach:**
```
1. Search: "Webdesign Agentur Berlin"
2. Scroll results to load more
3. Click each listing
4. Extract: Name, address, phone, website
5. Store company info
6. Scrape company website for details
```

**Rate Limiting:**
- 1 request per 3-5 seconds
- Random user agent rotation
- Randomized delays

**Success Rate:** 70-80% (legitimate method)

### Strategy 2: Website Scraping (No Proxy Needed) ✓

**Best For:** Extracting emails & contact info from known sites

**Approach:**
```
1. Load company website
2. Look for contact pages:
   - /kontakt
   - /contact
   - /about
   - /impressum (DACH GOLD!)
3. Extract emails via regex
4. Extract names, titles
5. Find social profiles
```

**Email Finding Priority (DACH-Optimized):**
```
1. Impressum page (Pflicht in Deutschland!)
   └─ Always has: company name, address, name of Geschäftsführer, email
2. Contact page (/kontakt, /contact)
3. About page
4. Footer
5. Header/Navigation
```

**Email Regex Patterns:**
```javascript
// Standard email
/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi

// Extended pattern (+ variations)
/(?:mailto:|Email:\s*)?([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/gi

// German-specific patterns
/Kontakt:\s*([^\n]+@[^\n]+)/gi
/Geschäftsführer[^@]*([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+)/gi
```

**Rate Limiting:**
- 1-2 pages per 3-5 seconds
- Randomize delays
- Change user agent per domain

**Success Rate:** 60-80% (depends on website)

### Strategy 3: Database Pattern Matching

**When:** Can't scrape directly

**Method:**
```
1. Get company name
2. Try common patterns:
   - firstname.lastname@domain.com
   - f.lastname@domain.com
   - firstname@domain.com
   - contact@domain.com
   - info@domain.com
3. Verify with SMTP (optional)
```

**Success Rate:** 20-40% (use as fallback)

### Combined Strategy Flow

```
┌─────────────────────────────────────────┐
│ 1. Find Companies (Google Maps/LinkedIn)│
│    ├─ Name                              │
│    ├─ Address                           │
│    └─ Website URL                       │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 2. Scrape Company Website               │
│    ├─ Visit /kontakt, /about, etc.      │
│    ├─ Extract emails (Regex)            │
│    ├─ Extract names/titles              │
│    └─ Get phone, social                 │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 3. Validate & Enrich                    │
│    ├─ Email format validation           │
│    ├─ Remove duplicates                 │
│    ├─ Add confidence score              │
│    └─ Mark data quality                 │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│ 4. Store in Database                    │
│    ├─ Companies table                   │
│    ├─ Contacts table                    │
│    └─ Audit log                         │
└─────────────────────────────────────────┘
```

---

## Proxy Strategy (Optional)

### Do You Need Proxies?

**NO for:**
- Ethical scraping (following robots.txt)
- Moderate volume (< 1000 requests/day)
- Slow rate limiting (3-5s delays)
- Mix of different domains

**YES if:**
- High volume scraping (1000s+ per day)
- Single domain heavy scraping
- Getting rate-limited
- Need to scale quickly
- Want to be anonymous

### Proxy Types for Web Scraping

| Type | Cost | Speed | Detection | Best For |
|------|------|-------|-----------|----------|
| **Datacenter** | $5-20/mo | Very Fast | Easy to detect | Testing, low-risk |
| **Residential** | $30-100/mo | Slower | Hard to detect | Production, scale |
| **ISP** | $50-150/mo | Fast | Medium | Balanced |
| **Mobile** | $100-500/mo | Slowest | Very hard | High-security |

### If You Use Proxies

**Recommended Providers:**
- Brightdata (formerly Luminati) - $30/mo
- OxyLabs - $50/mo
- NetNut - $60/mo
- SOAX - $40/mo

**Integration Example:**
```javascript
// Use with puppeteer-extra-plugin-proxy
const puppeteer = require('puppeteer-extra');
const ProxyPlugin = require('puppeteer-extra-plugin-proxy');

puppeteer.use(ProxyPlugin({
  proxies: [
    'http://user:pass@proxy1.com:8080',
    'http://user:pass@proxy2.com:8080',
    // ...
  ],
}));
```

**Proxy Rotation Strategy:**
```javascript
// Rotate proxy every N requests
const proxies = [/*...*/];
let proxyIndex = 0;

async function getNextProxy() {
  const proxy = proxies[proxyIndex];
  proxyIndex = (proxyIndex + 1) % proxies.length;
  return proxy;
}

// Or: Use provider's API for dynamic rotation
```

---

## Performance Optimization

### Memory Management

```javascript
// ✓ GOOD: Reuse browser, close pages
const browser = await puppeteer.launch();
const page = await browser.newPage();
// ... scrape ...
await page.close(); // Close individual page
// Keep browser open for next batch

// ✗ BAD: Launch new browser for each page
for(const url of urls) {
  const browser = await puppeteer.launch(); // Memory leak!
  // ...
  await browser.close();
}
```

**Memory Config:**
```env
PUPPETEER_LAUNCH_ARGS=--no-sandbox,--disable-setuid-sandbox,--disable-dev-shm-usage
SCRAPER_CONCURRENT_PAGES=5        # Not too many per browser
SCRAPER_CONCURRENT_BROWSERS=2     # 2-3 browser instances max
DB_POOL_MAX=20                     # DB connection pool
```

### Resource Optimization

```javascript
// Disable unnecessary resources
await page.setRequestInterception(true);
page.on('request', (request) => {
  const resourceType = request.resourceType();
  
  if (['image', 'font', 'media'].includes(resourceType)) {
    request.abort();
  } else {
    request.continue();
  }
});
```

**Expected Improvement:**
- 10x faster page loads
- 50% less bandwidth
- 30% less memory

### Batch Processing

```javascript
// Process in batches
const batchSize = 50;
const batches = chunkArray(urls, batchSize);

for(const batch of batches) {
  // Process batch in parallel
  await Promise.all(batch.map(url => scrapeUrl(url)));
  
  // Pause between batches
  await delay(randomDelay(10000, 15000));
}
```

### Database Optimization

```sql
-- Create indexes for common queries
CREATE INDEX idx_companies_website ON companies(website);
CREATE INDEX idx_companies_country ON companies(country);
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_company_id ON contacts(company_id);

-- Batch inserts (faster)
INSERT INTO companies (name, website) VALUES 
  ('Company 1', 'http://...'),
  ('Company 2', 'http://...'),
  -- ... up to 1000 at a time
ON CONFLICT (website) DO UPDATE SET updated_at = NOW();
```

---

## Error Handling & Recovery

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `TimeoutError` | Page too slow | Increase timeout, retry |
| `ProtocolError` | Browser crashed | Restart browser |
| `NetworkError` | Connection issue | Retry with backoff |
| `ReferenceError` | Wrong selector | Log HTML, update selector |
| `403 Forbidden` | Blocked | Add delay, rotate UA |
| `429 Too Many Requests` | Rate limited | Exponential backoff |
| `DNS_LOOKUP_FAILED` | Network issue | Retry later |

### Exponential Backoff

```javascript
async function withExponentialBackoff(fn, maxRetries = 3) {
  let lastError;
  
  for(let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch(error) {
      lastError = error;
      
      // Exponential backoff: 1s, 2s, 4s, 8s
      const delayMs = Math.pow(2, attempt) * 1000;
      
      logger.warn(`Attempt ${attempt + 1} failed. Retrying in ${delayMs}ms`, {
        error: error.message,
      });
      
      await delay(delayMs);
    }
  }
  
  throw lastError;
}

// Usage
await withExponentialBackoff(() => page.goto(url));
```

### Circuit Breaker Pattern

```javascript
class CircuitBreaker {
  constructor(threshold = 5, timeout = 60000) {
    this.failureCount = 0;
    this.threshold = threshold;
    this.timeout = timeout;
    this.state = 'CLOSED'; // CLOSED -> OPEN -> HALF_OPEN
    this.nextAttemptTime = Date.now();
  }

  async execute(fn) {
    if(this.state === 'OPEN') {
      if(Date.now() < this.nextAttemptTime) {
        throw new Error('Circuit breaker is OPEN');
      }
      this.state = 'HALF_OPEN';
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch(error) {
      this.onFailure();
      throw error;
    }
  }

  onSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }

  onFailure() {
    this.failureCount++;
    if(this.failureCount >= this.threshold) {
      this.state = 'OPEN';
      this.nextAttemptTime = Date.now() + this.timeout;
    }
  }
}
```

---

## Monitoring & Logging

### Logging Strategy

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'lead-scraper' },
  transports: [
    // Error logs
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // All logs
    new winston.transports.File({
      filename: 'logs/scraper.log',
      maxsize: 5242880,
      maxFiles: 10,
    }),
    // Console (development)
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

// Usage
logger.info('Starting scrape job', { jobId: '123', site: 'example.com' });
logger.error('Scrape failed', { error: e.message, stack: e.stack });
```

### Metrics to Track

```javascript
const metrics = {
  // Volume
  pagesScrapped: 0,
  companiesFound: 0,
  emailsExtracted: 0,
  
  // Quality
  successRate: 0, // %
  emailValidRate: 0, // % valid
  dedupeRate: 0, // % duplicates
  
  // Performance
  avgPageLoadTime: 0, // ms
  avgScrapingTime: 0, // ms
  memory Usage: 0, // MB
  
  // Errors
  timeoutErrors: 0,
  networkErrors: 0,
  retryCount: 0,
  
  // Efficiency
  requestsPerSecond: 0,
  databaseInserts: 0,
};
```

### Health Check

```javascript
async function healthCheck() {
  const health = {
    status: 'UP',
    timestamp: new Date(),
    checks: {},
  };

  // Database
  try {
    await db.query('SELECT 1');
    health.checks.database = 'OK';
  } catch(e) {
    health.checks.database = 'FAIL';
    health.status = 'DOWN';
  }

  // Puppeteer
  try {
    const browser = await launchBrowser();
    await browser.close();
    health.checks.browser = 'OK';
  } catch(e) {
    health.checks.browser = 'FAIL';
    health.status = 'DOWN';
  }

  return health;
}

// Run periodically
setInterval(healthCheck, 60000);
```

---

## Best Practices

### 1. Rate Limiting

```javascript
// ✓ DO: Add delays between requests
await delay(randomDelay(3000, 5000)); // 3-5 seconds

// ✓ DO: Vary your behavior
const delays = [2000, 3000, 4000, 5000, 6000];
const randomDelay = delays[Math.floor(Math.random() * delays.length)];

// ✗ DON'T: Burst requests
// await scrape(url1);
// await scrape(url2);
// await scrape(url3);
// (too fast!)
```

### 2. User Agent Rotation

```javascript
const userAgents = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
];

async function scrapeWithRandomUA(url) {
  const ua = userAgents[Math.floor(Math.random() * userAgents.length)];
  const page = await browser.newPage();
  
  await page.setUserAgent(ua);
  // ... scrape ...
  await page.close();
}
```

### 3. Error Boundaries

```javascript
// Wrap each scraper run
async function scrapeWithErrorBoundary(url) {
  try {
    return await scraperModule.scrape(url);
  } catch(error) {
    logger.error('Scrape failed', {
      url,
      error: error.message,
      stack: error.stack,
      timestamp: new Date(),
    });
    
    // Don't crash entire process
    return null;
  }
}
```

### 4. Data Validation

```javascript
const Joi = require('joi');

const companySchema = Joi.object({
  name: Joi.string().required().min(2).max(255),
  website: Joi.string().uri().required(),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^[0-9+\s\-()]+$/).max(20),
  address: Joi.string().max(500),
}).unknown(true);

async function saveCompany(data) {
  const { error, value } = companySchema.validate(data);
  
  if(error) {
    logger.warn('Invalid company data', { error: error.message, data });
    return null;
  }
  
  return await db.saveCompany(value);
}
```

### 5. Respectful Scraping

```javascript
// Check robots.txt BEFORE scraping
async function canScrape(domain) {
  const robotsUrl = `${domain}/robots.txt`;
  const robots = await fetch(robotsUrl).then(r => r.text());
  
  // Check if user-agent allowed
  return !robots.includes('User-agent: *\nDisallow: /');
}

// Add delays between different domains
const delayByDomain = new Map();

async function getDelayForDomain(domain) {
  const lastScrape = delayByDomain.get(domain) || 0;
  const elapsed = Date.now() - lastScrape;
  
  if(elapsed < 5000) {
    await delay(5000 - elapsed);
  }
  
  delayByDomain.set(domain, Date.now());
}

await getDelayForDomain('example.com');
await scrape('example.com/contact');
```

---

## Deployment

### Local Development

```bash
# Terminal 1: Start PostgreSQL
docker-compose up postgres

# Terminal 2: Run scraper
npm run dev

# Watch logs
tail -f logs/scraper.log
```

### Production Deployment

**Option 1: VPS (Your Contabo)**

```bash
# On your VPS:

# 1. Clone repo
git clone https://github.com/yourusername/lead-scraper.git
cd lead-scraper

# 2. Install dependencies
npm install --production

# 3. Setup environment
cp .env.example .env
# Edit .env with production values

# 4. Initialize database
npm run db:init

# 5. Start with PM2 (process manager)
npm install -g pm2
pm2 start npm --name lead-scraper -- start
pm2 save
pm2 startup

# 6. Setup logs rotation
npm install --save pm2-logrotate
pm2 install pm2-logrotate
```

**Option 2: Docker**

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY . .

ENV NODE_ENV=production

CMD ["npm", "start"]
```

```bash
docker build -t lead-scraper .
docker run -d \
  --name lead-scraper \
  -e DB_HOST=postgres \
  -e DB_USER=scraper_user \
  -e DB_PASSWORD=secure_password \
  -v /data/exports:/app/exports \
  lead-scraper
```

**Option 3: Systemd Service**

```ini
# /etc/systemd/system/lead-scraper.service
[Unit]
Description=Lead Scraper Service
After=network.target postgresql.service

[Service]
Type=simple
User=scraper
WorkingDirectory=/opt/lead-scraper
ExecStart=/usr/bin/node /opt/lead-scraper/src/index.js
Restart=on-failure
RestartSec=10
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

```bash
# Enable and start
sudo systemctl daemon-reload
sudo systemctl enable lead-scraper
sudo systemctl start lead-scraper

# Monitor
sudo journalctl -u lead-scraper -f
```

### Monitoring & Maintenance

```bash
# Monitor memory usage
watch -n 1 'ps aux | grep node'

# Check logs
tail -100f logs/scraper.log

# Database maintenance
npm run db:vacuum  # Clean up unused space
npm run db:backup  # Regular backups

# Export data regularly
npm run export:csv
npm run export:airtable
```

---

## Troubleshooting

### High Memory Usage

```javascript
// Problem: Memory keeps growing
// Solution: Close pages explicitly

// Before
for(const url of urls) {
  const page = await browser.newPage();
  // ... scrape ...
  // ✗ Forgot to close!
}

// After
for(const url of urls) {
  let page;
  try {
    page = await browser.newPage();
    // ... scrape ...
  } finally {
    if(page) await page.close(); // ✓ Always close
  }
}
```

### Pages Getting Blocked

```
Signs: Getting 403/429 errors, content not loading

Solutions:
1. Increase delays: SCRAPER_RATE_LIMIT_DELAY=5000
2. Rotate user agents more frequently
3. Add random request variations
4. Consider lightweight proxies (DataCenter, not Residential)
5. Spread requests across more IPs if at scale
```

### Database Connection Issues

```bash
# Check connection
npm run db:test

# See connection pool status
SELECT count(*) FROM pg_stat_activity;

# Increase pool size if needed
DB_POOL_MAX=30  # in .env
```

---

## Next Steps

1. **Customize Scrapers**: Adapt to your specific needs
2. **Run Test Suite**: `npm test`
3. **Monitor First 100 Scrapes**: Watch for errors/patterns
4. **Adjust Rate Limits**: Based on results
5. **Export & Validate Data**: Ensure quality
6. **Schedule Continuous Runs**: Set up cron jobs
7. **Monitor Health**: Regular healthchecks
8. **Optimize**: Tune based on metrics

---

## Support & Contribution

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

For issues, create a GitHub issue with:
- Error logs
- Configuration (sanitized)
- Steps to reproduce
- Expected vs actual behavior

---

**Last Updated:** 2025-12-03  
**Maintained By:** Your Team  
**License:** MIT
