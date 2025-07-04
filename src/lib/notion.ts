import { Client } from '@notionhq/client';

// Initialize Notion client
const notion = new Client({
    auth: import.meta.env.NOTION_API_KEY,
});

export interface NotionPage {
    id: string;
    title: string;
    description?: string;
    status?: string;
    tags?: string[];
    url?: string;
    createdTime: string;
    lastEditedTime: string;
    [key: string]: any;
}

export class NotionService {
    private databaseId: string;

    constructor(databaseId?: string) {
        this.databaseId = databaseId || import.meta.env.NOTION_DATABASE_KEY;
    }

    async getPages(pageSize = 10): Promise<NotionPage[]> {
        try {
            const response = await notion.databases.query({
                database_id: this.databaseId,
                page_size: pageSize,
                sorts: [
                    {
                        timestamp: 'last_edited_time',
                        direction: 'descending',
                    },
                ],
            });

            return response.results.map((page: any) => this.transformPage(page));
        } catch (error) {
            console.error('Error fetching Notion pages:', error);
            return [];
        }
    }

    async getPagesByFilter(filter: any, pageSize = 10): Promise<NotionPage[]> {
        try {
            const response = await notion.databases.query({
                database_id: this.databaseId,
                filter,
                page_size: pageSize,
                sorts: [
                    {
                        timestamp: 'last_edited_time',
                        direction: 'descending',
                    },
                ],
            });

            return response.results.map((page: any) => this.transformPage(page));
        } catch (error) {
            console.error('Error fetching filtered Notion pages:', error);
            return [];
        }
    }

    private transformPage(page: any): NotionPage {
        const properties = page.properties;

        // Extract title (assuming there's a title property)
        const titleProperty = Object.values(properties).find((prop: any) => prop.type === 'title') as any;
        const title = titleProperty?.title?.[0]?.plain_text || 'Untitled';

        // Extract rich text description
        const descriptionProperty = Object.values(properties).find((prop: any) => prop.type === 'rich_text') as any;
        const description = descriptionProperty?.rich_text?.[0]?.plain_text || '';

        // Extract status (select property)
        const statusProperty = Object.values(properties).find((prop: any) => prop.type === 'select') as any;
        const status = statusProperty?.select?.name || '';

        // Extract tags (multi-select property)
        const tagsProperty = Object.values(properties).find((prop: any) => prop.type === 'multi_select') as any;
        const tags = tagsProperty?.multi_select?.map((tag: any) => tag.name) || [];

        // Extract URL
        const urlProperty = Object.values(properties).find((prop: any) => prop.type === 'url') as any;
        const url = urlProperty?.url || '';

        return {
            id: page.id,
            title,
            description,
            status,
            tags,
            url,
            createdTime: page.created_time,
            lastEditedTime: page.last_edited_time,
            properties: properties, // Keep original properties for flexibility
        };
    }
}

export const notionService = new NotionService(); 