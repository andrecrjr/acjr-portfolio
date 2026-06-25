# ACJR Portfolio

Astro portfolio for André Carlos Junior. The site renders a compact profile page and pulls project cards from a Notion database at request time.

## Stack

- Astro server output with the Node adapter
- Notion API for portfolio content
- CSS custom properties for design tokens and component styling

## Setup

Install dependencies:

```sh
pnpm install
# or
bun install
```

Create `.env` from `env.example` and set:

```sh
NOTION_TOKEN=your_notion_integration_token
NOTION_DATABASE_ID=your_notion_database_id
```

The app also supports the older aliases `NOTION_API_KEY` and `NOTION_DATABASE_KEY`.

## Commands

```sh
pnpm run dev
pnpm run build
pnpm run preview

bun run dev
bun run build
bun run preview
```

## Notion Content

The portfolio reads common Notion property types automatically:

- Title property for the project name
- Rich text property for the description
- Select property for status
- Multi-select property for tags
- URL property for the project link

If Notion is not configured, the page still renders with a clear empty state.
