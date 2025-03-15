<script setup lang="ts">
import McpMatrix from '../components/McpMatrix.vue';
import QuickNav from '../components/QuickNav.vue';
import { ref } from 'vue';

const searchQuery = ref('');

// 向 McpMatrix 组件传递搜索查询
const handleSearch = () => {
  // 触发 McpMatrix 组件的搜索方法
  if (mcpMatrixRef.value) {
    mcpMatrixRef.value.filterItems(searchQuery.value);
  }
};

// 创建对 McpMatrix 组件的引用
const mcpMatrixRef = ref<InstanceType<typeof McpMatrix> | null>(null);
</script>

<template>
  <div class="home-container">
    <div class="content">
      <!-- 快速导航 -->
      <div class="quick-nav-section">
        <QuickNav />
      </div>
      
      <!-- 顶部：ShareMCP Logo -->
      <div class="header-section">
        <div class="logo-container">
          <h1>Share MCP</h1>
          <p>欢迎使用 MCP 导航页</p>
        </div>
        <div class="search-container">
          <input 
            type="text" 
            class="search-input" 
            placeholder="搜索 MCP 工具和服务..." 
            v-model="searchQuery"
            @input="handleSearch"
          >
        </div>
      </div>
      
      <!-- 主要内容区域 -->
      <div class="main-content-area">
        <div class="intro-container">
          <div class="intro-text">
            <h2>MCP 矩阵</h2>
            <p>以下是各种类别的 MCP 工具和服务，您可以浏览并找到适合您需求的解决方案。</p>
          </div>
          
          <!-- MCP 矩阵组件 -->
          <McpMatrix ref="mcpMatrixRef" />
          
          <div class="github-link-container">
            <a href="https://github.com/Ameprism/ShareMCP" target="_blank" class="github-link">在 GitHub 上查看项目</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  width: 100%;
  min-height: 100vh;
  position: relative;
}

.content {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  z-index: 1;
  width: 100%;
}

/* 顶部 Logo 样式 */
.header-section {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem 2rem 1rem 2rem;
  width: 100%;
  box-sizing: border-box;
  max-width: 2300px;
  margin: 0 auto;
}

.logo-container {
  text-align: left;
  flex: 0 0 auto;
}

h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.2rem;
  background: linear-gradient(45deg, #fe315d, #4882cf, #4cbbfc, #00c7b7, #fe8019, #6b57ff);
  background-size: 300% 300%;
  animation: gradient 10s ease infinite;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.logo-container p {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  margin: 0;
}

/* 添加搜索框容器样式 */
.search-container {
  flex: 0 1 400px;
  margin-left: 3rem;
}

.search-input {
  width: 100%;
  padding: 0.8rem 1.2rem;
  border-radius: 12px;
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.search-input:focus {
  outline: none;
  border-color: #4cbbfc;
  box-shadow: 0 4px 20px rgba(76, 187, 252, 0.2);
  background: rgba(30, 41, 59, 0.9);
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

/* 主要内容区域样式 */
.main-content-area {
  display: flex;
  flex: 1;
  width: 100%;
  padding: 0 2rem 2rem 2rem;
  max-width: 2300px;
  margin: 0 auto;
  box-sizing: border-box;
}

.intro-container {
  width: 100%;
  padding: 2rem;
  background: rgba(30, 41, 59, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin: 0 auto;
}

h2 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #4cbbfc;
}

h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #fe8019;
}

h4 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.9);
}

h5 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #4cbbfc;
}

.intro-text p {
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1.5rem;
}

.section {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.github-link-container {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
}

.github-link {
  display: inline-block;
  background: linear-gradient(45deg, #4882cf, #4cbbfc);
  color: white;
  padding: 0.6rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
}

.github-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(76, 187, 252, 0.3);
}

/* 动画效果 */
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* 响应式布局 */
@media (max-width: 1200px) {
  .header-section {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
    gap: 1rem;
  }
  
  .search-container {
    width: 100%;
    margin-left: 0;
  }
  
  .main-content-area {
    padding: 1rem;
  }
  
  .intro-container {
    padding: 1.5rem 1rem;
  }
  
  h1 {
    font-size: 2rem;
  }
  
  h2 {
    font-size: 1.6rem;
  }
  
  h3 {
    font-size: 1.3rem;
  }
  
  h4 {
    font-size: 1.1rem;
  }
}

/* 大屏幕优化 */
@media (min-width: 1400px) {
  .header-section {
    max-width: 2300px;
  }
}

@media (min-width: 1800px) {
  .header-section {
    max-width: 2500px;
  }
}

.quick-nav-section {
  width: 100%;
  max-width: 2300px;
  margin: 0 auto;
  padding: 1rem 2rem;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .quick-nav-section,
  .main-content-area {
    padding: 1rem;
  }
}
</style> 