// import axios from 'axios';
import mcpData from './mcp-server.json';

// 创建一个数据服务
export const MCPDataService = {
  // 获取所有类别和项目
  async getAllData() {
    try {
      // 使用本地数据
      return mcpData;
    } catch (error) {
      console.error('获取 MCP 服务器数据失败:', error);
      // 出错时返回空数据结构
      return { categories: [], tags: {} };
    }
  },
  
  // 获取特定类别
  async getCategoryById(categoryId) {
    try {
      // 从本地数据中查找
      const category = mcpData.categories.find(cat => cat.id === categoryId);
      return category || null;
    } catch (error) {
      console.error(`获取类别 ${categoryId} 失败:`, error);
      return null;
    }
  },
  
  // 搜索项目
  async searchItems(query) {
    try {
      // 在本地数据中搜索
      const results = [];
      const lowerQuery = query.toLowerCase();
      
      mcpData.categories.forEach(category => {
        category.items.forEach(item => {
          if (
            item.name.toLowerCase().includes(lowerQuery) ||
            item.description.toLowerCase().includes(lowerQuery) ||
            item.author.toLowerCase().includes(lowerQuery) ||
            (item.tags && item.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
          ) {
            results.push({
              ...item, 
              categoryId: category.id, 
              categoryName: category.name
            });
          }
        });
      });
      
      return results;
    } catch (error) {
      console.error('搜索失败:', error);
      return [];
    }
  },
  
  // 获取所有 items 的总数
  async getTotalItemsCount() {
    try {
      const data = await this.getAllData();
      let count = 0;
      
      // 遍历所有类别，累加 items 数量
      data.categories.forEach(category => {
        if (category.items && Array.isArray(category.items)) {
          count += category.items.length;
        }
      });
      
      return count;
    } catch (error) {
      console.error('获取总数失败:', error);
      return 0;
    }
  }
}; 