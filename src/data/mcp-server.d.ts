declare module './mcp-server.js';
declare module './mcp-server.json';

export interface MCPItem {
  id: number;
  name: string;
  author: string;
  description: string;
  url: string;
  tags: string[];
  categoryId?: number;
  categoryName?: string;
}

export interface MCPCategory {
  id: number;
  name: string;
  description: string;
  icon: string;
  items: MCPItem[];
}

export interface MCPData {
  categories: MCPCategory[];
  tags?: Record<string, string>;
}

declare module './mcp-server.js' {
  export const MCPDataService: {
    getAllData(): Promise<MCPData>;
    getCategoryById(categoryId: number): Promise<MCPCategory | null>;
    searchItems(query: string): Promise<(MCPItem & { categoryId: number; categoryName: string })[]>;
  };
}

declare module './mcp-server.json' {
  const data: MCPData;
  export default data;
} 