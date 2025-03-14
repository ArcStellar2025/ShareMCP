<script setup lang="ts">
// AboutMcp 组件逻辑
</script>

<template>
  <div class="about-mcp">
    <h2>关于 MCP</h2>
    <div class="content">
      <p>MCP (Microsoft Certified Professional) 是微软认证专业人员的简称，是微软公司为IT专业人士和开发人员设计的一系列技术认证。</p>
      <p>通过 MCP 认证，可以证明您在特定Microsoft技术领域的专业知识和技能。</p>
      <div class="features">
        <div class="feature">
          <div class="icon">🏆</div>
          <div class="text">专业认可</div>
        </div>
        <div class="feature">
          <div class="icon">💼</div>
          <div class="text">职业发展</div>
        </div>
        <div class="feature">
          <div class="icon">🔍</div>
          <div class="text">技能验证</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-mcp {
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}

h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #4cbbfc;
  text-align: center;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

p {
  margin-bottom: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
}

.features {
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
}

.feature {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.text {
  font-weight: 500;
}
</style> 