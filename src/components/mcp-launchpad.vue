<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import Folder from './folder.vue';
import { MCPDataService } from '../data/mcp-server.js';

// 定义类型接口
interface MCPItem {
  id: number;
  name: string;
  author: string;
  description: string;
  url: string;
  tags: string[];
}

interface MCPCategory {
  id: number;
  name: string;
  description: string;
  icon: string;
  items: MCPItem[];
}

// 使用真实数据替代假数据
const categories = ref<MCPCategory[]>([]);
const loading = ref(true);

// 获取数据
onMounted(async () => {
  try {
    // 从本地JSON文件获取数据
    const response = await import('../data/mcp-server.json');
    categories.value = response.default.categories;
  } catch (error) {
    console.error('加载MCP服务器数据失败:', error);
  } finally {
    loading.value = false;
  }
});

// 将类别转换为网格项目
const items = computed(() => {
  return categories.value.map(category => ({
    id: category.id,
    label: category.name,
    description: category.description,
    icon: category.icon,
    items: category.items // 子项目数据
  }));
});

// 响应式布局相关
const containerRef = ref<HTMLElement | null>(null);
const itemsPerRow = ref(7); // 默认每行显示7个
const minItemSize = 60; // 最小尺寸
const maxItemSize = 90; // 最大尺寸
const minGap = 24; // 最小间距
const maxGap = 70; // 最大间距 - 在空间充裕时使用

// 计算每个项目的尺寸和间距
const itemSize = ref(70); // 默认尺寸
const currentGap = ref(minGap); // 当前使用的间距

// 监听窗口大小变化
const updateLayout = () => {
  if (!containerRef.value) return;
  
  const containerWidth = containerRef.value.clientWidth;
  
  // 首先尝试使用最大间距计算
  const maxGapItemsPerRow = Math.min(7, Math.floor((containerWidth + maxGap) / (minItemSize + maxGap)));
  
  // 如果使用最大间距可以放置至少4个项目，则使用最大间距
  if (maxGapItemsPerRow >= 4) {
    currentGap.value = maxGap;
    itemsPerRow.value = maxGapItemsPerRow;
  } else {
    // 否则使用最小间距，并确保至少显示4个
    currentGap.value = minGap;
    // 强制每行至少4个元素
    itemsPerRow.value = 4;
    
    // 重新计算每个元素的大小，可能会小于最小尺寸
    const calculatedSize = (containerWidth - (itemsPerRow.value - 1) * minGap - 10) / itemsPerRow.value;
    
    // 如果计算出的尺寸小于最小尺寸，则减小间距
    if (calculatedSize < minItemSize) {
      // 计算可用于间距的总空间
      const availableSpace = containerWidth - (itemsPerRow.value * minItemSize);
      // 计算每个间距的大小
      const adjustedGap = Math.max(10, (availableSpace - 10) / (itemsPerRow.value - 1));
      currentGap.value = adjustedGap;
    }
  }
  
  // 计算项目尺寸
  const calculatedSize = (containerWidth - (itemsPerRow.value - 1) * currentGap.value - 10) / itemsPerRow.value;
  itemSize.value = Math.min(maxItemSize, Math.max(minItemSize, calculatedSize));
};

// 计算网格布局
const gridItems = computed(() => {
  const rows = [];
  for (let i = 0; i < items.value.length; i += itemsPerRow.value) {
    rows.push(items.value.slice(i, i + itemsPerRow.value));
  }
  return rows;
});

onMounted(() => {
  updateLayout();
  window.addEventListener('resize', updateLayout);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateLayout);
});
</script>

<template>
  <div class="launchpad-container" ref="containerRef">
    <div class="grid-container">
      <div class="grid">
        <div v-for="(row, rowIndex) in gridItems" 
             :key="rowIndex" 
             class="grid-row">
          <div v-for="item in row" :key="item.id" class="folder-wrapper">
            <!-- 添加数量指示器 -->
            <div class="item-count" :class="{ 'count-plus': item.items.length > 99 }">
              {{ item.items.length > 99 ? '99+' : item.items.length }}
            </div>
            
            <Folder 
              :id="item.id"
              :size="itemSize"
              :label="item.label"
              :description="item.description"
              :icon="item.icon"
              :items="item.items"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.launchpad-container {
  width: calc(100% - 100px); /* 左右各保持50px边距 */
  max-width: 1400px; /* 增加最大宽度，避免在大屏幕上过于拉伸 */
  margin: 0 auto;
  padding: 30px 0; /* 增加上下内边距，移除左右内边距 */
}

.grid-container {
  width: 100%;
  display: flex;
  justify-content: center; /* 整体居中 */
}

.grid {
  display: flex;
  flex-direction: column;
  gap: v-bind('currentGap + "px"');
  width: auto; /* 宽度自适应内容 */
  max-width: v-bind('(itemSize * itemsPerRow + currentGap * (itemsPerRow - 1)) + "px"');
}

.grid-row {
  display: flex;
  gap: v-bind('currentGap + "px"');
  justify-content: flex-start; /* 改为左对齐 */
  flex-wrap: wrap;
  margin-bottom: 10px; /* 添加行间距，为标签留出空间 */
}

@media (max-width: 768px) {
  .launchpad-container {
    width: calc(100% - 40px); /* 在移动设备上减少边距 */
    padding: 20px 0;
  }
}

/* 文件夹包装器样式 */
.folder-wrapper {
  position: relative;
  display: inline-block;
}

/* 项目数量指示器样式 */
.item-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #ff4757;
  color: white;
  font-size: 12px;
  font-weight: bold;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 6px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 10; /* 确保在最上层 */
}

.count-plus {
  font-size: 10px;
  padding: 0 4px;
}
</style> 