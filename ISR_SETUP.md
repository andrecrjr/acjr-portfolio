# ISR (Incremental Static Regeneration) Setup Guide

This guide explains how to set up and use ISR with your Astro portfolio site powered by Notion.

## What is ISR?

ISR allows you to use static-site generation on a per-page basis, without needing to rebuild the entire site. Pages are generated at build time and then regenerated in the background as traffic comes in.

## Configuration Files

### 1. Development (ISR) Configuration
- **File**: `astro.config.mjs`
- **Purpose**: Server-side rendering with ISR capabilities for local development
- **Output**: `server`
- **Adapter**: Node.js

### 2. Production (Static) Configuration
- **File**: `astro.config.production.mjs`
- **Purpose**: Static site generation for GitHub Pages deployment
- **Output**: `static`
- **Adapter**: None (static build)

## Pages Configuration

### ISR Page (index.astro)
- Server-side rendering enabled
- Cache headers set for ISR (5 minutes cache, 24 hours stale-while-revalidate)
- Dynamic content fetching from Notion

### Static Page (index.static.astro)
- Pre-rendered at build time
- Used for production static builds

## Available Scripts

```bash
# Development
npm run dev          # Regular development server
npm run dev:isr      # ISR development server

# Building
npm run build        # Production build (static)
npm run build:isr    # ISR build (server)

# Preview
npm run preview      # Preview production build
npm run preview:isr  # Preview ISR build
```

## GitHub Actions Workflow

The ISR deployment workflow (`.github/workflows/deploy-isr.yml`) includes:

1. **Automatic deployment** on push to main/master branch
2. **Manual deployment** via GitHub Actions
3. **Scheduled rebuilds** every 6 hours to simulate ISR
4. **Static build** for GitHub Pages compatibility

## Setup Instructions

### 1. Repository Secrets

Add these secrets to your GitHub repository:

```
Settings > Secrets and variables > Actions > New repository secret
```

- `NOTION_TOKEN`: Your Notion integration token
- `NOTION_DATABASE_ID`: Your Notion database ID

### 2. GitHub Pages Configuration

1. Go to your repository settings
2. Navigate to "Pages" section
3. Select "Deploy from a branch"
4. Choose "GitHub Actions" as the source

### 3. Update Configuration

Edit `astro.config.production.mjs`:

```javascript
export default defineConfig({
  output: 'static',
  // Update these values for your repository
  base: '/your-repo-name',  // Uncomment and update
  site: 'https://your-username.github.io/your-repo-name'
});
```

## How ISR Works in This Setup

### Local Development
- Run `npm run dev:isr` for true ISR with server-side rendering
- Pages are rendered on-demand with caching
- Content is fetched from Notion API on each request (with cache)

### Production (GitHub Pages)
- Static build is generated at build time
- Scheduled rebuilds (every 6 hours) simulate ISR
- Content is updated periodically rather than on-demand

## Cache Configuration

The ISR cache is configured with:
- `s-maxage=300`: Cache for 5 minutes
- `stale-while-revalidate=86400`: Serve stale content for 24 hours while revalidating

## Benefits

1. **Fast Loading**: Static files serve instantly
2. **Fresh Content**: Regular updates from Notion
3. **SEO Friendly**: Pre-rendered HTML for search engines
4. **Scalable**: Can handle high traffic loads

## Troubleshooting

### Build Failures
- Check that all environment variables are set
- Verify Notion API credentials
- Ensure database permissions are correct

### Content Not Updating
- Check the scheduled workflow is running
- Verify Notion database is accessible
- Check repository secrets are properly configured

## Local Testing

```bash
# Test ISR locally
npm run dev:isr

# Test production build
npm run build
npm run preview
```

## Additional Features

- **Error Handling**: Graceful error handling for Notion API failures
- **Responsive Design**: Mobile-friendly layout
- **Performance**: Optimized for Core Web Vitals
- **Accessibility**: WCAG compliant components 