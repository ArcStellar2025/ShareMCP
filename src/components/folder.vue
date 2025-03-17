<script setup lang="ts">
import { ref, computed, watch } from 'vue';

// 定义类型接口
interface MCPItem {
  id: number;
  name: string;
  author: string;
  description: string;
  url: string;
  tags: string[];
}

interface FolderItem {
  id: number;
  name?: string;
  label?: string;
  url?: string;
  [key: string]: any;
}

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  size: {
    type: Number,
    default: 80
  },
  label: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  items: {
    type: Array as () => MCPItem[],
    default: () => []
  }
});

// 限制文件夹最大尺寸为85像素
const folderSize = computed(() => Math.min(100, props.size));

// 展开状态
const isExpanded = ref(false);
const isClosing = ref(false); // 新增：关闭动画状态

// 文件夹内部项目处理
const innerItems = computed<FolderItem[]>(() => {
  if (props.items && props.items.length > 0) {
    return props.items;
  }
  
  // 如果没有传入子项目，保留原来的逻辑作为后备
  return Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    label: `子项目 ${i + 1}`
  }));
});

// 生成内部项目标签
function getInnerItemLabel(id: number): string {
  const prefix = props.label || `项目${props.id}`;
  const labels = [
    '配置', '文档', '示例', '源码', '教程', 
    '工具', '资源', '插件', '扩展', '模板', '设置'
  ];
  return `${prefix}-${labels[(id - 1) % labels.length]}`;
}

// 展开文件夹
const expandFolder = () => {
  isExpanded.value = true;
  document.body.style.overflow = 'hidden'; // 防止背景滚动
};

// 关闭文件夹
const closeFolder = () => {
  isClosing.value = true; // 开始关闭动画
  
  // 动画结束后再实际关闭
  setTimeout(() => {
    isExpanded.value = false;
    isClosing.value = false;
    document.body.style.overflow = '';
  }, 300); // 与动画时长匹配
};

// 阻止事件冒泡
const stopPropagation = (event: Event) => {
  event.stopPropagation();
};

// 计算内部网格的项目大小
const innerItemSize = computed(() => Math.min(60, folderSize.value * 0.8));

// 计算内部网格的圆角大小
const innerItemBorderRadius = computed(() => Math.max(6, innerItemSize.value * 0.15));

// 计算预览网格的布局
const previewLayout = computed(() => {
  const count = innerItems.value.length;
  // 根据内部项目数量决定预览布局
  if (count <= 4) {
    return { rows: 2, cols: 2 }; // 2x2 网格
  } else {
    return { rows: 3, cols: 3 }; // 3x3 网格
  }
});

// 计算预览项目的大小，确保不会溢出
const previewItemSize = computed(() => {
  const { rows, cols } = previewLayout.value;
  const padding = folderSize.value * 0.12; // 文件夹内边距，占总尺寸的12%
  const gap = 2; // 预览项目之间的间距
  
  // 计算可用空间，考虑内边距
  const availableWidth = folderSize.value - (2 * padding) - (gap * (cols - 1));
  const availableHeight = folderSize.value - (2 * padding) - (gap * (rows - 1));
  
  // 计算每个预览项目的最大尺寸
  return Math.min(
    availableWidth / cols,
    availableHeight / rows
  );
});

// 获取要显示在预览中的项目
const previewItems = computed(() => {
  const { rows, cols } = previewLayout.value;
  const maxItems = rows * cols;
  return innerItems.value.slice(0, maxItems);
});

// 添加打开链接的方法
const openLink = (url: string, event: Event) => {
  event.stopPropagation();
  window.open(url, '_blank');
};

// 获取项目的 emoji 图标
const getItemEmoji = (item: FolderItem): string => {
  if (item.tags && item.tags.length > 0) {
    // 查找第一个包含 emoji 的标签
    const emojiTag = item.tags.find(tag => /\p{Emoji}/u.test(tag));
    if (emojiTag) {
      // 提取 emoji（假设 emoji 是标签的第一个字符）
      const emoji = emojiTag.match(/\p{Emoji}/u);
      if (emoji) return emoji[0];
    }
  }
  // 默认 emoji
  return '📄';
};
</script>

<template>
  <div class="folder-container" :style="{ width: `${folderSize}px` }">
    <div class="folder" 
         :style="{ width: `${folderSize}px`, height: `${folderSize}px` }"
         @click="expandFolder">
      <div class="folder-content">
        <!-- iOS风格的文件夹预览 -->
        <div class="preview-grid" 
             :style="{ 
               gridTemplateRows: `repeat(${previewLayout.rows}, 1fr)`,
               gridTemplateColumns: `repeat(${previewLayout.cols}, 1fr)`,
               gap: '2px',
               padding: `${folderSize * 0.12}px` // 动态计算内边距
             }">
          <div v-for="item in previewItems" 
               :key="item.id" 
               class="preview-item"
               :style="{ 
                 width: `${previewItemSize}px`, 
                 height: `${previewItemSize}px`,
                 borderRadius: `${previewItemSize * 0.15}px`
               }">
            <!-- 使用 emoji 替代数字 ID -->
            <span class="preview-item-emoji" 
                  :style="{ fontSize: `${Math.max(10, previewItemSize * 0.5)}px` }">
              {{ getItemEmoji(item) }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="folder-label">
      {{ label || `项目 ${id}` }}
    </div>
    
    <!-- 展开的文件夹覆盖层 -->
    <div v-if="isExpanded" 
         class="expanded-overlay" 
         :class="{ 'closing': isClosing }"
         @click="closeFolder">
      <div class="expanded-folder" 
           :class="{ 'closing': isClosing }"
           @click="stopPropagation">
        <div class="expanded-header">
          <div class="expanded-title">{{ label || `项目 ${id}` }}</div>
          <button class="close-button" @click="closeFolder">×</button>
        </div>
        
        <div v-if="description" class="expanded-description">{{ description }}</div>
        
        <div class="expanded-grid-container">
          <div class="expanded-grid">
            <div v-for="item in innerItems" 
                 :key="item.id" 
                 class="inner-item" 
                 @click="item.url ? openLink(item.url, $event) : null">
              <div class="inner-item-content" 
                   :style="{ borderRadius: `${innerItemBorderRadius}px` }">
                <span class="inner-item-emoji">{{ getItemEmoji(item) }}</span>
              </div>
              <div class="inner-item-label">{{ item.name || item.label }}</div>
              <div v-if="item.author" class="inner-item-author">作者: {{ item.author }}</div>
              <div v-if="item.description" class="inner-item-description">{{ item.description }}</div>
              <div v-if="item.tags && item.tags.length" class="inner-item-tags">
                <span v-for="(tag, index) in item.tags" :key="index" class="tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.folder-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  position: relative;
}

.folder {
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;
  cursor: pointer;
}

.folder-content {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 10px;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* 确保内容不会溢出 */
}

.folder-content:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* iOS风格的预览网格 */
.preview-grid {
  width: 100%;
  height: 100%;
  display: grid;
  justify-items: center;
  align-items: center;
  box-sizing: border-box; /* 确保内边距计算正确 */
}

.preview-item {
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* 确保内容不会溢出 */
}

.preview-item-emoji {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1;
  text-align: center;
}

.folder-label {
  color: rgba(255, 255, 255, 0.9);
  font-size: 13px;
  text-align: center;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

/* 展开覆盖层样式 */
.expanded-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.2s ease;
  transition: opacity 0.3s ease;
}

.expanded-overlay.closing {
  opacity: 0;
}

.expanded-folder {
  width: 80%;
  max-width: 800px;
  max-height: 80vh;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: scaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transition: all 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045);
}

.expanded-folder.closing {
  transform: scale(0.8);
  opacity: 0;
}

.expanded-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
}

.expanded-title {
  color: white;
  font-size: 18px;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.close-button {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 24px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.expanded-grid-container {
  width: 100%;
  flex: 1;
  overflow-y: auto;
  display: flex;
  justify-content: center;
}

.expanded-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  justify-content: center; /* 网格整体居中 */
  width: 100%;
  max-width: 1200px;
}

.expanded-grid-row {
  display: none;
}

.inner-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 180px;
  height: 220px; /* 固定高度 */
  cursor: pointer;
  transition: transform 0.2s ease;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 15px 10px;
  position: relative; /* 添加相对定位 */
}

.inner-item:hover {
  transform: translateY(-3px);
  background: rgba(255, 255, 255, 0.1);
}

.inner-item-content {
  width: v-bind('innerItemSize + "px"');
  height: v-bind('innerItemSize + "px"');
  background: rgba(255, 255, 255, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease;
}

.inner-item-content:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: scale(1.05);
}

.inner-item-emoji {
  color: rgba(255, 255, 255, 0.9);
  font-size: 24px;
  line-height: 1;
}

.inner-item-label {
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.inner-item-author {
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  text-align: center;
}

.inner-item-description {
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  text-align: center;
  margin-top: 5px;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 限制为2行 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.3;
  max-height: 32px; /* 限制最大高度 */
}

.inner-item-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
  margin-top: auto; /* 推到底部 */
  padding-top: 8px;
}

.tag {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 10px;
}

/* 动画 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { 
    transform: scale(0.8);
    opacity: 0;
  }
  to { 
    transform: scale(1);
    opacity: 1;
  }
}

.expanded-description {
  padding: 10px 20px 15px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
</style> 