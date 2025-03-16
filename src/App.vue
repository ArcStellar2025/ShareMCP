<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue';
// 注意：您导入了这些Vue组合式API函数但尚未使用它们
// 使用导入方式引入图片
import backgroundImage from './assets/background.jpg';
import McpLaunchpad from './components/mcp-launchpad.vue';

const backgroundUrl = ref(backgroundImage);
</script>

<template>
  <div class="app-container" :style="{ backgroundImage: `url(${backgroundUrl})` }">
    <div class="acrylic-overlay"></div>
    <header class="header">
      <div class="logo">
        <div class="logo-text">ShareMCP</div>
        <div class="logo-subtitle">MCP资源聚合</div>
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
            type="text" 
            class="search-input" 
            placeholder="搜索MCP资源或服务"
          >
        </div>
      </div>
    </header>
    <div class="content">
      <mcp-launchpad />
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
}

/* 亚克力效果遮罩层 */
.acrylic-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0);
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
  gap: 30px;
  background: rgba(0, 0, 0, 0); /* 轻微背景色增强可读性 */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
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

.search-container {
  width: 100%;
  max-width: 680px;
  padding: 0 20px;
  margin-bottom: 20px; /* 增加底部间距 */
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
</style>
