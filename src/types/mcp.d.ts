// 定义 MCP 相关的类型
declare interface MCPItem {
  id: number;
  name: string;
  author: string;
  description: string;
  url: string;
  tags: string[];
  categoryId?: number;
  categoryName?: string;
}

declare interface MCPCategory {
  id: number;
  name: string;
  description: string;
  icon: string;
  items: MCPItem[];
}

declare interface MCPData {
  categories: MCPCategory[];
  tags?: Record<string, string>;
}

// 声明 JSON 模块
declare module '*.json' {
  const value: any;
  export default value;
} 