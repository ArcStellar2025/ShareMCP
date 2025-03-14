<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue';
import Home from './views/Home.vue';

// 导航菜单状态
const isNavOpen = ref(false);
const toggleNav = () => {
  isNavOpen.value = !isNavOpen.value;
};

// 回到顶部功能
const showBackToTop = ref(false);

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const checkScroll = () => {
  showBackToTop.value = window.scrollY > 300;
};

// 监听系统主题变化
onMounted(() => {
  // 确保DOM已完全加载后再初始化动画
  setTimeout(() => {
    initBackgroundAnimation();
  }, 100);
  
  // 监听窗口大小变化，自动关闭小屏幕上的导航
  window.addEventListener('resize', () => {
    if (window.innerWidth > 800) {
      isNavOpen.value = true;
    } else {
      isNavOpen.value = false;
    }
  });
  
  // 初始设置
  if (window.innerWidth > 800) {
    isNavOpen.value = true;
  }

  window.addEventListener('scroll', checkScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll);
});

// 背景动画
const initBackgroundAnimation = () => {
  const canvas = document.getElementById('background-canvas') as HTMLCanvasElement;
  if (!canvas) {
    console.error('Canvas元素未找到');
    return;
  }
  
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('无法获取Canvas上下文');
    return;
  }
  
  // 设置画布大小为窗口大小
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  
  // 创建粒子
  const particles = [];
  const particleCount = 150;
  
  // 添加几何形状
  const shapes = [];
  const shapeCount = 10;
  
  class Particle {
    x;
    y;
    size;
    speedX;
    speedY;
    color;
    alpha;
    
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 4 + 1;
      this.speedX = (Math.random() - 0.5) * 0.8;
      this.speedY = (Math.random() - 0.5) * 0.8;
      this.alpha = Math.random() * 0.8 + 0.2;
      
      // JetBrains 风格的颜色
      const colors = [
        '#fe315d', // 红色
        '#4882cf', // 蓝色
        '#4cbbfc', // 浅蓝
        '#00c7b7', // 青色
        '#fe8019', // 橙色
        '#6b57ff'  // 紫色
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.x > canvas.width) this.x = 0;
      else if (this.x < 0) this.x = canvas.width;
      
      if (this.y > canvas.height) this.y = 0;
      else if (this.y < 0) this.y = canvas.height;
    }
    
    draw() {
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }
  
  // 几何形状类
  class Shape {
    x;
    y;
    size;
    rotation;
    rotationSpeed;
    color;
    alpha;
    type;
    
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 80 + 40;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.01;
      this.alpha = Math.random() * 0.1 + 0.05;
      
      const colors = [
        '#fe315d', '#4882cf', '#4cbbfc', '#00c7b7', 
        '#fe8019', '#6b57ff'
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];
      
      const types = ['square', 'triangle', 'circle'];
      this.type = types[Math.floor(Math.random() * types.length)];
    }
    
    update() {
      this.rotation += this.rotationSpeed;
    }
    
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      
      ctx.fillStyle = this.color;
      
      switch(this.type) {
        case 'square':
          ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
          break;
        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(0, -this.size/2);
          ctx.lineTo(this.size/2, this.size/2);
          ctx.lineTo(-this.size/2, this.size/2);
          ctx.closePath();
          ctx.fill();
          break;
        case 'circle':
          ctx.beginPath();
          ctx.arc(0, 0, this.size/2, 0, Math.PI * 2);
          ctx.fill();
          break;
      }
      
      ctx.restore();
    }
  }
  
  // 初始化粒子
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  // 初始化几何形状
  for (let i = 0; i < shapeCount; i++) {
    shapes.push(new Shape());
  }
  
  // 连接粒子
  const connectParticles = () => {
    const maxDistance = 150;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / maxDistance)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  };
  
  // 鼠标交互
  const mouse = {
    x: null,
    y: null,
    radius: 150
  };
  
  window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
  });
  
  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });
  
  // 动画循环
  const animate = () => {
    // 创建渐变背景
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#0d1117');
    gradient.addColorStop(0.5, '#131b29');
    gradient.addColorStop(1, '#161b22');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制几何形状
    for (const shape of shapes) {
      shape.update();
      shape.draw();
    }
    
    // 绘制粒子和连接线
    for (const particle of particles) {
      particle.update();
      
      // 添加鼠标交互
      if (mouse.x !== null && mouse.y !== null) {
        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          const force = mouse.radius / distance;
          const angle = Math.atan2(dy, dx);
          particle.x += Math.cos(angle) * force * 0.2;
          particle.y += Math.sin(angle) * force * 0.2;
        }
      }
      
      particle.draw();
    }
    
    connectParticles();
    
    requestAnimationFrame(animate);
  };
  
  // 启动动画
  animate();
  console.log('背景动画已初始化');
};
</script>

<template>
  <div id="app-container">
    <canvas id="background-canvas" class="background-canvas"></canvas>
    
  
    
    <!-- 汉堡菜单按钮 -->
    <button class="nav-toggle" @click="toggleNav" aria-label="Toggle navigation">
      <span></span>
      <span></span>
      <span></span>
    </button>
    
    <!-- 侧边导航 -->
    <nav class="side-nav" :class="{ 'open': isNavOpen }">
      <div class="nav-header">
        <div class="logo">
          <span class="logo-text">Share MCP</span>
        </div>
      </div>
      
      <div class="nav-content">
        <div class="nav-section">
          <div class="nav-section-title">Made with ❤️ by</div>
          <ul class="nav-links">
            <li>
              <a 
                href="https://space.bilibili.com/666714573" 
                target="_blank"
                class="author-link"
              >
                BiliBili@春雨Ame
              </a>
            </li>
          </ul>
        </div>
        
        <div class="nav-section">
          <div class="nav-section-title">Get Started</div>
          <ul class="nav-links">
            <li><a href="https://mcp-docs.cn/introduction" target="_blank">MCP 简介</a></li>
            <li><a href="https://mcp-docs.cn/quickstart" target="_blank">快速入门</a></li>
            <li><a href="https://mcp-docs.cn/clients" target="_blank">MCP 客户端</a></li>
          </ul>
        </div>
        
        <div class="nav-section">
          <div class="nav-section-title">Your First MCP Server</div>
          <ul class="nav-links">
            <li><a href="https://mcp-docs.cn/docs/first-server/python" target="_blank">Python</a></li>
            <li><a href="https://mcp-docs.cn/docs/first-server/typescript" target="_blank">TypeScript</a></li>
          </ul>
        </div>
        
        <div class="nav-section">
          <div class="nav-section-title">开发工具</div>
          <ul class="nav-links">
            <li><a href="https://mcp-docs.cn/docs/tools/debugging" target="_blank">Debugging</a></li>
            <li><a href="https://mcp-docs.cn/docs/tools/inspector" target="_blank">Inspector</a></li>
          </ul>
        </div>
        
        <div class="nav-section">
          <div class="nav-section-title">概念</div>
          <ul class="nav-links">
            <li><a href="https://mcp-docs.cn/docs/concepts/architecture" target="_blank">核心架构</a></li>
            <li><a href="https://mcp-docs.cn/docs/concepts/resources" target="_blank">Resources</a></li>
            <li><a href="https://mcp-docs.cn/docs/concepts/prompts" target="_blank">Prompts</a></li>
            <li><a href="https://mcp-docs.cn/docs/concepts/tools" target="_blank">Tools</a></li>
            <li><a href="https://mcp-docs.cn/docs/concepts/sampling" target="_blank">Sampling</a></li>
            <li><a href="https://mcp-docs.cn/docs/concepts/transports" target="_blank">传输层</a></li>
          </ul>
        </div>
      </div>
    </nav>
    
    <!-- 主内容区域 -->
    <div class="main-content" :class="{ 'nav-open': isNavOpen }">
      <Home />
      <button 
        class="back-to-top" 
        @click="scrollToTop"
        :class="{ 'visible': showBackToTop }"
      >
        <span class="arrow">↑</span>
        <span class="text">回到顶部</span>
      </button>
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #0d111700;
  color: rgba(255, 255, 255, 0.9);
}

#app-container {
  width: 100%;
  height: auto;
  min-height: 100vh;
  position: relative;
  display: flex;
}

.background-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

#app {
  width: 100%;
  height: auto;
  min-height: 100vh;
  overflow: hidden; /* 防止 app 容器产生滚动条 */
}

/* 导航菜单样式 */
.nav-toggle {
  position: fixed;
  top: 20px;
  left: 20px;
  width: 40px;
  height: 40px;
  background: rgba(30, 41, 59, 0.8);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1000;
  display: none; /* 默认隐藏，在小屏幕上显示 */
  flex-direction: column;
  justify-content: space-around;
  padding: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.nav-toggle:hover {
  background: rgba(40, 51, 69, 0.9);
}

.nav-toggle span {
  display: block;
  width: 100%;
  height: 2px;
  background-color: white;
  transition: all 0.3s ease;
}

.nav-content {
  padding: 20px 0;
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

/* 隐藏 WebKit 浏览器的滚动条 */
.nav-content::-webkit-scrollbar {
  display: none;
}

.side-nav {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 280px;
  background: rgba(20, 30, 48, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 5px 0 15px rgba(0, 0, 0, 0.2);
  z-index: 999;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

/* 隐藏 WebKit 浏览器的滚动条 */
.side-nav::-webkit-scrollbar {
  display: none;
}

.side-nav.open {
  transform: translateX(0);
}

.nav-header {
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(45deg, #4882cf, #4cbbfc);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-left: 10px;
}

.nav-section {
  margin-bottom: 20px;
}

.nav-section-title {
  padding: 10px 20px;
  font-weight: 600;
  color: #4cbbfc;
  font-size: 1.1rem;
}

.nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-links li {
  padding: 0;
}

.nav-links a {
  display: block;
  padding: 8px 20px 8px 30px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.2s ease;
  font-size: 0.95rem;
}

.nav-links a:hover {
  background: rgba(255, 255, 255, 0.05);
  color: white;
  border-left: 3px solid #4cbbfc;
  padding-left: 27px;
}

.main-content {
  flex: 1;
  transition: margin-left 0.3s ease;
  width: 100%;
  position: relative;
}

.main-content.nav-open {
  margin-left: 280px;
}

/* 响应式设计 */
@media (max-width: 800px) {
  .nav-toggle {
    display: flex;
  }
  
  .main-content.nav-open {
    margin-left: 0;
  }
  
  .side-nav {
    width: 250px;
  }
  
  .side-nav.open {
    transform: translateX(0);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  }
  
  .main-content {
    margin-left: 0;
  }

  .back-to-top {
    right: 20px;
    padding: 10px 16px;
  }
}

@media (min-width: 801px) {
  .nav-toggle {
    display: none;
  }
  
  .side-nav {
    transform: translateX(0);
  }
  
  .main-content {
    margin-left: 280px;
  }
}

/* 回到顶部按钮样式 */
.back-to-top {
  position: fixed;
  bottom: 40px;
  right: 320px; /* 靠近左侧一些 */
  background: linear-gradient(45deg, #4882cf, #4cbbfc);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(76, 187, 252, 0.3);
  transform: translateY(100px);
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 1000;
}

.back-to-top.visible {
  transform: translateY(0);
  opacity: 1;
}

.back-to-top:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(76, 187, 252, 0.4);
}

.back-to-top .arrow {
  font-size: 1.2rem;
}

/* MCP 介绍样式 */
.mcp-intro {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
  width: 100%;
  pointer-events: none; /* 允许点击穿透 */
}

.intro-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.intro-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg, #fe315d, #4882cf, #4cbbfc);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  opacity: 0.1;
}

.intro-content p {
  font-size: 1.2rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.1);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .intro-content {
    padding: 1rem;
  }
  
  .intro-content h2 {
    font-size: 1.8rem;
  }
  
  .intro-content p {
    font-size: 1rem;
  }
}

/* 添加作者链接的特殊样式 */
.author-link {
  color: #fe8019 !important; /* 使用醒目的橙色 */
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}

.author-link:hover {
  color: #4cbbfc !important; /* 悬停时变为蓝色 */
  background: rgba(255, 255, 255, 0.1) !important;
}
</style>
