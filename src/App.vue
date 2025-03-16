<script setup lang="ts">
import { onMounted, ref, onUnmounted, computed, watch } from 'vue';
// 注意：您导入了这些Vue组合式API函数但尚未使用它们
// 使用导入方式引入图片
import backgroundImage from './assets/background.jpg';
import McpLaunchpad from './components/mcp-launchpad.vue';
import { MCPDataService } from './data/mcp-server.js';

// 定义类型接口（移到类型文件中，这里可以删除）
// interface MCPItem {
//   id: number;
//   name: string;
//   author: string;
//   description: string;
//   url: string;
//   tags: string[];
//   categoryId?: number;
//   categoryName?: string;
// }

const backgroundUrl = ref(backgroundImage);

// 搜索相关
const searchQuery = ref('');
const searchResults = ref<any[]>([]); // 使用 any 类型暂时解决类型问题
const isSearching = ref(false);

// 社交媒体链接
const githubUrl = ref('https://github.com/AmeSora2022/ShareMCP');
const bilibiliUrl = ref('https://space.bilibili.com/666714573');

// 监听搜索输入
watch(searchQuery, async (newQuery) => {
  if (newQuery.trim() === '') {
    // 如果搜索框为空，清空搜索结果
    searchResults.value = [];
    isSearching.value = false;
    return;
  }
  
  isSearching.value = true;
  // 使用 MCPDataService 进行搜索
  try {
    searchResults.value = await MCPDataService.searchItems(newQuery);
  } catch (error) {
    console.error('搜索失败:', error);
    searchResults.value = [];
  }
});

// 打开链接
const openLink = (url: string) => {
  window.open(url, '_blank');
};

// 获取项目的 emoji 图标
const getItemEmoji = (item: any): string => {
  if (item.tags && item.tags.length > 0) {
    // 查找第一个包含 emoji 的标签
    for (const tag of item.tags) {
      if (/\p{Emoji}/u.test(tag)) {
        const match = tag.match(/\p{Emoji}/u);
        if (match) return match[0];
      }
    }
  }
  // 默认 emoji
  return '📄';
};
</script>

<template>
  <div class="app-container" :style="{ backgroundImage: `url(${backgroundUrl})` }">
    <div class="acrylic-overlay"></div>
    <header class="header">
      <div class="header-top">
        <!-- 左侧 Logo 区域 -->
        <div class="logo-area">
          <!-- ShareAI-Lab 渐变文本 -->
          <div class="ai-lab-logo" @click="openLink('https://github.com/shareAI-lab')">
            <span class="ai-lab-text">ShareAI-Lab</span>
          </div>
          <div class="logo">
            <div class="logo-text">ShareMCP</div>
            <div class="logo-subtitle">MCP资源聚合</div>
          </div>
        </div>
        
        <!-- 右侧社交媒体图标 -->
        <div class="social-icons">
          <div class="social-icon github" @click="openLink(githubUrl)">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </div>
          <div class="social-icon bilibili" @click="openLink(bilibiliUrl)">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.658.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906L17.813 4.653zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773H5.333zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z"/>
            </svg>
          </div>
        </div>
      </div>
      
      <div class="search-container">
        <div class="search-box">
          <i class="search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </i>
          <input 
            v-model="searchQuery"
            type="text" 
            class="search-input" 
            placeholder="搜索MCP资源或服务"
          >
        </div>
      </div>
    </header>
    <div class="content">
      <!-- 搜索结果 -->
      <div v-if="isSearching" class="search-results">
        <div class="search-results-header">
          <h2>搜索结果: {{ searchResults.length }} 个匹配项</h2>
        </div>
        <div class="search-results-grid">
          <div v-for="item in searchResults" 
               :key="`${item.categoryId}-${item.id}`" 
               class="search-result-item"
               @click="openLink(item.url)">
            <div class="item-icon">
              <span class="item-emoji">{{ getItemEmoji(item) }}</span>
            </div>
            <div class="item-details">
              <div class="item-name">{{ item.name }}</div>
              <div class="item-category" v-if="item.categoryName">{{ item.categoryName }}</div>
              <div class="item-description">{{ item.description }}</div>
              <div class="item-tags">
                <span v-for="(tag, index) in item.tags" :key="index" class="tag">{{ tag }}</span>
              </div>
            </div>
          </div>
          
          <!-- 无搜索结果时显示 -->
          <div v-if="searchResults.length === 0" class="no-results">
            <div class="no-results-icon">🔍</div>
            <div class="no-results-text">没有找到匹配的结果</div>
          </div>
        </div>
      </div>
      
      <!-- 正常显示 Launchpad -->
      <mcp-launchpad v-if="!isSearching" />
    </div>
  </div>
</template>

<style scoped>
.app-container {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0;
  padding: 0;
  background-color: #121212; /* 添加深色底色 */
}

/* 亚克力效果遮罩层 */
.acrylic-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3); /* 增加半透明黑色背景 */
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 1;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background: rgba(0, 0, 0, 0); /* 轻微背景色增强可读性 */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

/* 新增：顶部布局 */
.header-top {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

/* Logo 区域 */
.logo-area {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo-text {
  color: white;
  font-weight: bold;
  font-size: 32px;
  font-family: 'Segoe UI', Arial, sans-serif;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.logo-subtitle {
  color: white;
  font-size: 16px;
  margin-top: 4px;
  font-family: 'Segoe UI', Arial, sans-serif;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

/* 移除原有的 sub-logo 样式 */
.sub-logo {
  display: none;
}

/* 添加 ShareAI-Lab 渐变文本样式 */
.ai-lab-logo {
  position: absolute;
  left: 0;
  cursor: pointer;
}

.ai-lab-text {
  font-size: 24px;
  font-weight: bold;
  font-family: 'Segoe UI', Arial, sans-serif;
  background: linear-gradient(90deg, #3494E6, #EC6EAD);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.ai-lab-text:hover {
  transform: translateY(-1px);
  background: linear-gradient(90deg, #36D1DC, #5B86E5);
  -webkit-background-clip: text;
  background-clip: text;
}

/* 社交媒体图标 */
.social-icons {
  display: flex;
  gap: 10px;
}

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: white;
}

.social-icon:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.github:hover {
  color: #f0f6fc;
  background: rgba(36, 41, 47, 0.8);
}

.bilibili:hover {
  color: #ffffff;
  background: rgba(251, 114, 153, 0.8);
}

.search-container {
  width: 100%;
  max-width: 680px;
  padding: 0 20px;
  margin-bottom: 10px; /* 减少底部间距 */
}

.search-box {
  position: relative;
  width: 100%;
  height: 44px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 12px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}

.search-box:hover {
  background: rgba(255, 255, 255, 0.15);
}

.search-icon {
  position: absolute;
  left: 12px;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  padding: 0 16px 0 40px;
  color: white;
  font-size: 17px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.search-box:focus-within {
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
}

.content {
  position: relative;
  z-index: 2;
  width: 100%;
  height: calc(100vh - 180px); /* 减去header的高度 */
  margin-top: 180px; /* 与header高度匹配 */
  overflow-y: auto; /* 允许内容滚动 */
  padding-bottom: 30px; /* 底部内边距 */
  
  /* 自定义滚动条样式 */
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
}

.content::-webkit-scrollbar {
  width: 8px;
}

.content::-webkit-scrollbar-track {
  background: transparent;
}

.content::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

/* 移除所有可能的边距 */
:global(body) {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

:global(*) {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 搜索结果样式 */
.search-results {
  width: calc(100% - 60px); /* 修改为左右各30px边距 */
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px 0;
}

.search-results-header {
  margin-bottom: 20px;
  color: white;
  text-align: center;
}

.search-results-header h2 {
  font-size: 20px;
  font-weight: 500;
}

/* 修改为三列网格布局 */
.search-results-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 大屏幕三列布局 */
  gap: 20px;
  padding: 0;
}

/* 无搜索结果时占据整行 */
.search-results-grid .no-results {
  grid-column: 1 / -1;
}

.search-result-item {
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.2s ease;
  height: 100%;
}

.search-result-item:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.item-icon {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  flex-shrink: 0;
}

.item-emoji {
  font-size: 30px;
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.item-name {
  color: white;
  font-size: 18px;
  font-weight: 500;
}

.item-category {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  background: rgba(255, 255, 255, 0.1);
  padding: 2px 8px;
  border-radius: 10px;
  display: inline-block;
  margin-bottom: 5px;
}

.item-description {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  margin-bottom: 8px;
  /* 限制描述文本行数 */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.tag {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 10px;
}

.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
  color: rgba(255, 255, 255, 0.7);
}

.no-results-icon {
  font-size: 40px;
  margin-bottom: 15px;
}

.no-results-text {
  font-size: 18px;
}

/* 响应式布局 */
@media (max-width: 1280px) {
  .search-results-grid {
    grid-template-columns: repeat(2, 1fr); /* 中等屏幕两列 */
    gap: 15px; /* 减小间距 */
  }
  
  .item-icon {
    width: 50px; /* 缩小图标尺寸 */
    height: 50px;
  }
  
  .item-emoji {
    font-size: 24px; /* 缩小emoji尺寸 */
  }
  
  .item-name {
    font-size: 16px; /* 缩小标题字体 */
  }
  
  .item-description {
    font-size: 13px; /* 缩小描述字体 */
  }
}

@media (max-width: 768px) {
  .header-top {
    flex-direction: column;
    gap: 15px;
  }
  
  .logo-area {
    width: 100%;
    flex-direction: column;
    gap: 10px;
  }
  
  .ai-lab-logo {
    position: static;
    margin-bottom: 5px;
  }
  
  .social-icons {
    margin-top: 10px;
  }
  
  .search-results {
    width: calc(100% - 60px); /* 确保左右各30px边距 */
    padding: 10px 0;
  }
  
  .search-results-grid {
    gap: 12px; /* 进一步减小间距 */
  }
  
  .search-result-item {
    padding: 12px; /* 减小内边距 */
  }
  
  .header {
    padding: 15px 20px;
  }
  
  .search-container {
    width: 100%;
  }
  
  .search-result-item {
    flex-direction: column;
  }
  
  .item-icon {
    width: 45px; /* 进一步缩小图标 */
    height: 45px;
    margin-right: 0;
    margin-bottom: 8px;
  }
  
  .item-emoji {
    font-size: 22px;
  }
  
  .item-name {
    font-size: 15px;
  }
  
  .item-description {
    font-size: 12px;
    -webkit-line-clamp: 2; /* 限制为2行 */
  }
  
  .tag {
    font-size: 10px;
    padding: 1px 6px;
  }
  
  .content {
    margin-top: 220px; /* 增加顶部边距，适应折叠后的header高度 */
    height: calc(100vh - 220px);
  }
}

/* 超小屏幕 */
@media (max-width: 480px) {
  .search-results-grid {
    grid-template-columns: 1fr; /* 超小屏幕单列 */
  }
  
  .search-results-header h2 {
    font-size: 18px;
  }
  
  .search-result-item {
    flex-direction: row; /* 恢复为行布局以节省空间 */
  }
  
  .item-icon {
    margin-right: 10px;
    margin-bottom: 0;
  }
  
  .logo-area {
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
  
  .ai-lab-text {
    font-size: 16px;
  }
  
  .social-icon {
    width: 36px;
    height: 36px;
  }
  
  .social-icon svg {
    width: 20px;
    height: 20px;
  }
  
  .content {
    margin-top: 250px; /* 进一步增加顶部边距 */
    height: calc(100vh - 250px);
  }
}

/* 添加这个样式来确保 launchpad 组件有足够的顶部间距 */
mcp-launchpad {
  margin-top: 30px;
  display: block;
}
</style>
