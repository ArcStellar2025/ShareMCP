<script setup lang="ts">
interface NavItem {
  icon: string;
  title: string;
  id: string;
}

const navItems: NavItem[] = [
  { icon: "📂", title: "浏览器自动化", id: "browser-automation" },
  { icon: "🎨", title: "艺术与文化", id: "art-culture" },
  { icon: "☁️", title: "云平台", id: "cloud-platform" },
  { icon: "🖥️", title: "命令行", id: "command-line" },
  { icon: "💬", title: "社交", id: "social" },
  { icon: "👤", title: "数据平台", id: "data-platform" },
  { icon: "🗄️", title: "数据库", id: "database" },
  { icon: "🛠️", title: "开发者工具", id: "dev-tools" },
  { icon: "📂", title: "文件系统", id: "file-system" },
  { icon: "💰", title: "金融与金融科技", id: "fintech" },
  { icon: "🧠", title: "知识与记忆", id: "knowledge" },
  { icon: "🗺️", title: "位置服务", id: "location" },
  { icon: "🎯", title: "营销", id: "marketing" },
  { icon: "📊", title: "监测", id: "monitoring" },
  { icon: "🔎", title: "搜索", id: "search" },
  { icon: "🔒", title: "安全", id: "security" },
  { icon: "🚆", title: "旅行与交通", id: "travel" },
  { icon: "🔄", title: "版本控制", id: "version-control" },
  { icon: "🛠️", title: "其他工具和集成", id: "other-tools" },
  { icon: "🧰", title: "框架", id: "frameworks" },
  { icon: "🔧", title: "实用工具", id: "utilities" }
];

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<template>
  <div class="quick-nav">
    <div class="nav-grid">
      <button 
        v-for="item in navItems" 
        :key="item.id"
        class="nav-item"
        @click="scrollToSection(item.id)"
      >
        <span class="icon">{{ item.icon }}</span>
        <span class="title">{{ item.title }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.quick-nav {
  width: 100%;
  box-sizing: border-box;
  padding: 1.5rem;
  background: rgba(30, 41, 59, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.nav-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 1rem;
  width: 100%;
  box-sizing: border-box;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-width: 0;
  color: rgba(255, 255, 255, 0.9);
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

.icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
}

.title {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

@media (max-width: 1200px) {
  .nav-grid {
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: auto;
  }
}

@media (max-width: 768px) {
  .nav-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .quick-nav {
    padding: 1rem;
  }
  
  .nav-item {
    padding: 0.8rem;
  }
}

@media (max-width: 480px) {
  .nav-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style> 