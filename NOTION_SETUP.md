# Notion Integration Setup Guide

This guide will help you set up your Astro site to fetch data from a Notion database.

## Step 1: Create a Notion Integration

1. Go to [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Click **"+ New integration"**
3. Fill in the basic information:
   - **Name**: Your integration name (e.g., "ACJR Portfolio")
   - **Logo**: Optional
   - **Associated workspace**: Select your workspace
4. Click **"Submit"**
5. Copy the **"Internal Integration Token"** - you'll need this for `NOTION_API_KEY`

## Step 2: Create or Set Up Your Notion Database

1. Create a new Notion page or go to an existing database
2. Ensure your database has these recommended properties:
   - **Title** (Title property) - The name of your portfolio item
   - **Description** (Rich text) - Description of the project
   - **Status** (Select) - Options like "Published", "Draft", "In Progress", "Archived"
   - **Tags** (Multi-select) - Technologies, categories, etc.
   - **URL** (URL) - Link to live project or repository
   
3. Add some sample data to test with

## Step 3: Share Your Database with the Integration

1. In your Notion database page, click **"Share"** in the top right
2. Click **"Invite"** and search for your integration name
3. Select your integration and click **"Invite"**

## Step 4: Get Your Database ID

The database ID is in the URL of your database page:
```
https://www.notion.so/workspace/DATABASE_ID?v=VIEW_ID
```

Copy the `DATABASE_ID` part (32 characters, no hyphens).

## Step 5: Set Environment Variables

Create a `.env` file in your project root:

```bash
# Notion Integration
NOTION_API_KEY=secret_your_integration_token_here
NOTION_DATABASE_ID=your_database_id_here
```

**Important**: 
- Never commit your `.env` file to version control
- Add `.env` to your `.gitignore` file
- The `.env.example` file shows the required format

## Step 6: Test Your Setup

Run your Astro development server:

```bash
pnpm dev
```

Visit `http://localhost:4321` to see your portfolio items.

## Troubleshooting

### "Failed to load portfolio items"
- Check that your `NOTION_API_KEY` is correct
- Ensure your `NOTION_DATABASE_ID` is correct (32 characters, no hyphens)
- Verify the integration has access to your database
- Check the browser console and terminal for detailed error messages

### "No portfolio items found"
- Make sure your database has at least one page
- Check that the database properties match what the component expects
- Verify the integration can read your database

### Environment Variables Not Working
- Restart your development server after adding environment variables
- Ensure the `.env` file is in your project root
- Check that variable names match exactly (case-sensitive)

## Customization

The `PortfolioList` component accepts these props:

- `pageSize` (number, default: 10) - Number of items to fetch
- `showDescription` (boolean, default: true) - Show descriptions
- `showTags` (boolean, default: true) - Show tags
- `filter` (object, optional) - Notion database query filter

Example:
```astro
<PortfolioList 
  pageSize={5} 
  showDescription={false}
  filter={{
    property: "Status",
    select: {
      equals: "Published"
    }
  }}
/>
```

## Database Schema Recommendations

For the best experience, set up your Notion database with these properties:

| Property Name | Type | Description |
|---------------|------|-------------|
| Title | Title | Project name (required) |
| Description | Rich text | Project description |
| Status | Select | Published, Draft, In Progress, Archived |
| Tags | Multi-select | Technology tags, categories |
| URL | URL | Live demo or repository link |
| Started | Date | Project start date |
| Completed | Date | Project completion date |

The component will automatically adapt to your database schema and extract available information. 