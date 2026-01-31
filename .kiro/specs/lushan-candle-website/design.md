# 闾山文化蜡烛品牌官网 - 设计文档

## 1. 架构设计

### 1.1 项目结构
```
lvshan-candle-website/
├── index.html              # 主入口文件
├── css/
│   ├── main.css           # 主样式文件
│   ├── variables.css      # CSS变量（颜色、字体等）
│   └── responsive.css     # 响应式样式
├── js/
│   ├── main.js            # 主JavaScript文件
│   ├── language.js        # 语言切换功能
│   └── navigation.js      # 页面导航功能
├── images/
│   ├── products/          # 产品图片
│   ├── materials/         # 原料图片
│   └── brand/             # 品牌相关图片
├── data/
│   └── content.json       # 中英文内容数据
└── assets/
    └── fonts/             # 字体文件
```

### 1.2 技术选型
- **HTML5**: 语义化标签，提升SEO和可访问性
- **CSS3**: Flexbox/Grid布局，CSS变量，动画效果
- **Vanilla JavaScript**: 无框架依赖，轻量级实现
- **JSON**: 存储中英文内容，便于维护和扩展


## 2. 页面设计

### 2.1 页面结构
网站采用**全屏滚动(Full-page Scrolling)**设计，类似Apple产品页的沉浸式体验：

1. **Section 1: 品牌故事轮播** (#brand-story) - 多屏轮播展示
2. **Section 2: 产品价值** (#product-value) - 单屏展示
3. **Section 3: 原料详情** (#materials) - 单屏展示
4. **Section 4: 产品系列** (#products) - 单屏展示
5. **Section 5: 联系方式** (#contact) - 单屏展示

**全屏滚动特性**:
- 每个section占满整个视口(100vh)
- 滚动时自动吸附到下一个section
- 类似PPT翻页的切换效果
- 支持鼠标滚轮、触摸滑动、键盘方向键
- 右侧显示导航点，指示当前位置

### 2.2 导航设计
- **侧边导航点**: 右侧固定，显示当前所在section
- **顶部导航栏**: 半透明背景，包含Logo和语言切换
- 右上角语言切换按钮（中/EN）
- 移动端简化导航，保留核心功能
- 当前section高亮显示

### 2.3 Section 1: 品牌故事轮播
**设计理念**: 采用全屏轮播形式，每屏展示不同的品牌故事维度，配合精美背景图

**轮播屏幕规划** (共5屏):

**屏幕1 - 品牌主视觉**:
- 背景：武夷山脉云雾缭绕的意境图
- 主标题："Lvshan Tradition 闾山文化"
- 副标题："以物载道 · 赠礼臻选"
- 简短介绍：传承1300余年的道家生活美学

**屏幕2 - 历史传承**:
- 背景：古朴的道观或传统建筑
- 标题："千年传承"
- 内容：
  - 发源地：中国福建武夷山脉
  - 历史起源：唐代(公元713-741年)
  - 传承时间：1300余年

**屏幕3 - 文化特色**:
- 背景：符箓、道教文化元素
- 标题："文化融合"
- 内容：
  - 融合正统道教修行
  - 闽越巫傩文化
  - 省级非物质文化遗产

**屏幕4 - 核心理念**:
- 背景：禅意空间、蜡烛光影
- 标题："道家生活美学"
- 内容：将千年修行智慧凝练于日用之物

**屏幕5 - 适合人群**:
- 背景：优雅的礼品场景
- 标题："臻选之礼"
- 内容：
  - 重视文化传承的友人
  - 追求心灵宁静的修行者
  - 喜爱东方美学的收藏家
  - 新居/节庆的祝福礼物

**轮播功能**:
- 自动播放（5秒/屏）
- 手动切换（左右箭头）
- 底部指示点
- 支持触摸滑动
- 淡入淡出过渡效果

**HTML结构**:
```html
<section id="brand-story" class="section fullscreen">
  <div class="carousel">
    <div class="carousel-slide active" style="background-image: url('images/bg-wuyi.jpg')">
      <div class="slide-content">
        <h1 class="main-title">Lvshan Tradition<br>闾山文化</h1>
        <p class="subtitle">以物载道 · 赠礼臻选</p>
        <p class="description">传承1300余年的道家生活美学</p>
      </div>
    </div>
    <!-- 更多轮播屏... -->
  </div>
  <div class="carousel-controls">
    <button class="prev">‹</button>
    <button class="next">›</button>
  </div>
  <div class="carousel-indicators">
    <span class="dot active"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  </div>
</section>
```

### 2.4 Section 2: 产品价值
**布局**:
- 全屏展示(100vh)
- 背景：淡雅纹理或渐变
- 左右分栏或居中布局
- 左侧：产品价值主张文案
- 右侧：原料展示（图片 + 简短说明）

**占位图需求**:
- 大豆蜡原料图 (placeholder: materials-soy-wax.jpg)
- 玻璃容器图 (placeholder: materials-glass.jpg)
- 其他天然原料图 (placeholder: materials-natural.jpg)

**内容要点**:
- 传统文化工艺品定位
- 匠心手造
- 艺术价值与精神寓意
- 天然植物蜡、玻璃容器等原料图片

### 2.5 Section 3: 原料详情
**布局**:
- 全屏展示(100vh)
- 网格布局展示多种原料(3列或4列)
- 每个原料卡片包含：图片 + 标题 + 详细说明
- 背景：纯色或微妙纹理

**占位图需求**:
- 大豆蜡详情图 (placeholder: material-detail-soy.jpg)
- 玻璃容器详情图 (placeholder: material-detail-glass.jpg)
- 天然香料图 (placeholder: material-detail-fragrance.jpg)
- 棉芯图 (placeholder: material-detail-wick.jpg)

**原料列表**:
- 大豆蜡（天然植物蜡）
- 玻璃容器
- 天然香料
- 棉芯

### 2.6 Section 4: 产品系列
**布局**:
- 全屏展示(100vh)
- 4个产品卡片，2x2网格布局
- 每个卡片包含：
  - 产品图片（统一风格化处理）
  - 中英文名称
  - 系列标签
  - 功能说明
  - 使用场景（折叠/展开）
  - 工艺特色

**占位图需求**:
- 财源聚宝烛产品图 (placeholder: product-treasure-trove.jpg)
- 净秽烛产品图 (placeholder: product-zen-aura.jpg)
- 缘合烛产品图 (placeholder: product-soulmate.jpg)
- 辅运烛产品图 (placeholder: product-guardian.jpg)
- 包装礼盒图 (placeholder: product-giftbox.jpg)

**产品卡片结构**:
```html
<div class="product-card">
  <img data-src="images/products/treasure-trove.jpg" alt="闾山财源聚宝烛">
  <h3>闾山财源聚宝烛</h3>
  <h4>Treasure Trove Candle</h4>
  <span class="tag">招财系列</span>
  <p class="feature">符箓随烛火渐次展现，寓意"福随光至"</p>
  <button class="toggle-scenarios">查看使用场景</button>
  <div class="scenarios hidden">
    <h5>使用场景</h5>
    <ul>
      <li>招财纳福</li>
      <li>生活仪式感</li>
    </ul>
  </div>
</div>
```

**包装礼盒展示**:
- 单独区域展示礼盒包装
- 强调礼品属性

**免责说明**:
- 页面底部注明："本产品为传统文化工艺品，其艺术价值与精神寓意更胜实用功效"

### 2.7 Section 5: 联系方式
**布局**:
- 全屏展示(100vh)
- 简洁居中设计
- 背景：深色或品牌色
- 联系方式图标 + 文字
- 可选：简单的联系表单

**占位图需求**:
- 背景装饰图 (placeholder: contact-bg.jpg)

**内容**:
- Email/邮箱
- 其他联系方式（待确认）
- 社交媒体链接（如有）


## 3. 视觉设计规范

### 3.1 色彩方案
```css
:root {
  /* 主色调 - 道家美学 */
  --primary-color: #2C3E50;        /* 墨青色 */
  --secondary-color: #C9A063;      /* 金色 */
  --accent-color: #8B7355;         /* 古铜色 */
  
  /* 背景色 */
  --bg-primary: #FAF9F6;           /* 米白色 */
  --bg-secondary: #F5F1E8;         /* 暖灰色 */
  --bg-dark: #1A1A1A;              /* 深色背景 */
  
  /* 文字色 */
  --text-primary: #2C3E50;         /* 主文字 */
  --text-secondary: #6B7280;       /* 次要文字 */
  --text-light: #FFFFFF;           /* 浅色文字 */
  
  /* 边框和分割线 */
  --border-color: #E5E7EB;
  --divider-color: #D1D5DB;
}
```

### 3.2 字体规范
```css
:root {
  /* 中文字体 */
  --font-chinese-title: 'Noto Serif SC', 'STSong', serif;
  --font-chinese-body: 'Noto Sans SC', 'PingFang SC', sans-serif;
  
  /* 英文字体 */
  --font-english-title: 'Playfair Display', serif;
  --font-english-body: 'Lato', sans-serif;
  
  /* 字号 */
  --font-size-h1: 3rem;      /* 48px */
  --font-size-h2: 2.25rem;   /* 36px */
  --font-size-h3: 1.875rem;  /* 30px */
  --font-size-h4: 1.5rem;    /* 24px */
  --font-size-body: 1rem;    /* 16px */
  --font-size-small: 0.875rem; /* 14px */
  
  /* 行高 */
  --line-height-tight: 1.2;
  --line-height-normal: 1.6;
  --line-height-loose: 1.8;
}
```

### 3.3 间距规范
```css
:root {
  --spacing-xs: 0.5rem;   /* 8px */
  --spacing-sm: 1rem;     /* 16px */
  --spacing-md: 1.5rem;   /* 24px */
  --spacing-lg: 2rem;     /* 32px */
  --spacing-xl: 3rem;     /* 48px */
  --spacing-2xl: 4rem;    /* 64px */
  --spacing-3xl: 6rem;    /* 96px */
}
```

### 3.4 动画效果
```css
:root {
  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.5s ease;
  
  --easing-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --easing-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

**常用动画**:
- 淡入淡出 (fade-in/fade-out)
- 平滑滚动 (smooth scroll)
- 悬停放大 (hover scale)
- 渐进式加载 (progressive loading)


## 4. 功能设计

### 4.1 语言切换功能

**实现方案**:
```javascript
// language.js
class LanguageManager {
  constructor() {
    this.currentLang = localStorage.getItem('language') || 'zh';
    this.content = {};
  }
  
  async loadContent() {
    const response = await fetch('data/content.json');
    this.content = await response.json();
  }
  
  switchLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('language', lang);
    this.updatePageContent();
  }
  
  updatePageContent() {
    // 更新所有带有 data-i18n 属性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = this.getTranslation(key);
    });
  }
  
  getTranslation(key) {
    return this.content[this.currentLang][key] || key;
  }
}
```

**数据结构** (content.json):
```json
{
  "zh": {
    "nav.brand": "品牌故事",
    "nav.value": "产品价值",
    "nav.materials": "原料详情",
    "nav.products": "产品系列",
    "nav.contact": "联系方式",
    "brand.title": "Lvshan Tradition 闾山文化",
    "brand.subtitle": "以物载道 · 赠礼臻选"
  },
  "en": {
    "nav.brand": "Brand Story",
    "nav.value": "Product Value",
    "nav.materials": "Materials",
    "nav.products": "Products",
    "nav.contact": "Contact",
    "brand.title": "Lvshan Tradition",
    "brand.subtitle": "Dao in Objects · Gifts of Excellence"
  }
}
```

### 4.2 全屏滚动功能

**实现方案**:
```javascript
// fullpage-scroll.js
class FullPageScroll {
  constructor() {
    this.sections = document.querySelectorAll('.section');
    this.currentSection = 0;
    this.isScrolling = false;
    this.touchStartY = 0;
    this.init();
  }
  
  init() {
    // 鼠标滚轮事件
    window.addEventListener('wheel', (e) => this.handleWheel(e), { passive: false });
    
    // 触摸事件（移动端）
    window.addEventListener('touchstart', (e) => {
      this.touchStartY = e.touches[0].clientY;
    });
    
    window.addEventListener('touchend', (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      const diff = this.touchStartY - touchEndY;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          this.scrollToNext();
        } else {
          this.scrollToPrev();
        }
      }
    });
    
    // 键盘事件
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        this.scrollToNext();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        this.scrollToPrev();
      }
    });
    
    // 导航点点击
    this.updateNavigationDots();
  }
  
  handleWheel(e) {
    e.preventDefault();
    
    if (this.isScrolling) return;
    
    if (e.deltaY > 0) {
      this.scrollToNext();
    } else {
      this.scrollToPrev();
    }
  }
  
  scrollToNext() {
    if (this.currentSection < this.sections.length - 1) {
      this.currentSection++;
      this.scrollToSection(this.currentSection);
    }
  }
  
  scrollToPrev() {
    if (this.currentSection > 0) {
      this.currentSection--;
      this.scrollToSection(this.currentSection);
    }
  }
  
  scrollToSection(index) {
    this.isScrolling = true;
    this.currentSection = index;
    
    const target = this.sections[index];
    target.scrollIntoView({ behavior: 'smooth' });
    
    this.updateNavigationDots();
    
    setTimeout(() => {
      this.isScrolling = false;
    }, 1000);
  }
  
  updateNavigationDots() {
    const dots = document.querySelectorAll('.nav-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentSection);
      dot.addEventListener('click', () => this.scrollToSection(index));
    });
  }
}
```

### 4.3 品牌故事轮播功能

**实现方案**:
```javascript
// carousel.js
class BrandCarousel {
  constructor() {
    this.slides = document.querySelectorAll('.carousel-slide');
    this.currentSlide = 0;
    this.autoPlayInterval = null;
    this.init();
  }
  
  init() {
    // 自动播放
    this.startAutoPlay();
    
    // 左右箭头
    document.querySelector('.carousel .prev')?.addEventListener('click', () => {
      this.prevSlide();
      this.resetAutoPlay();
    });
    
    document.querySelector('.carousel .next')?.addEventListener('click', () => {
      this.nextSlide();
      this.resetAutoPlay();
    });
    
    // 指示点
    document.querySelectorAll('.carousel-indicators .dot').forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.goToSlide(index);
        this.resetAutoPlay();
      });
    });
    
    // 触摸滑动
    let touchStartX = 0;
    const carousel = document.querySelector('.carousel');
    
    carousel?.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    });
    
    carousel?.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          this.nextSlide();
        } else {
          this.prevSlide();
        }
        this.resetAutoPlay();
      }
    });
  }
  
  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }
  
  resetAutoPlay() {
    clearInterval(this.autoPlayInterval);
    this.startAutoPlay();
  }
  
  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.updateSlides();
  }
  
  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.updateSlides();
  }
  
  goToSlide(index) {
    this.currentSlide = index;
    this.updateSlides();
  }
  
  updateSlides() {
    this.slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === this.currentSlide);
    });
    
    document.querySelectorAll('.carousel-indicators .dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentSlide);
    });
  }
}
```

### 4.4 图片懒加载

**实现方案**:
```javascript
// main.js
class LazyLoader {
  constructor() {
    this.images = document.querySelectorAll('img[data-src]');
    this.init();
  }
  
  init() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage(entry.target);
            observer.unobserve(entry.target);
          }
        });
      });
      
      this.images.forEach(img => observer.observe(img));
    } else {
      // Fallback for older browsers
      this.images.forEach(img => this.loadImage(img));
    }
  }
  
  loadImage(img) {
    img.src = img.dataset.src;
    img.classList.add('loaded');
  }
}
```

### 4.5 占位图生成

**占位图策略**:
所有图片初期使用占位图，采用以下方案：

1. **在线占位图服务**:
```html
<!-- 使用 placeholder.com 或类似服务 -->
<img data-src="https://via.placeholder.com/800x600/2C3E50/C9A063?text=Product+Image" 
     alt="产品图片">
```

2. **本地占位图**:
创建统一风格的占位图，带有品牌色和提示文字

3. **CSS渐变占位**:
```css
.placeholder-bg {
  background: linear-gradient(135deg, #2C3E50 0%, #8B7355 100%);
  position: relative;
}

.placeholder-bg::after {
  content: '图片占位';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.5rem;
}
```

### 4.6 响应式菜单

**实现方案**:
```javascript
// navigation.js (移动端菜单)
class MobileMenu {
  constructor() {
    this.menuBtn = document.querySelector('.menu-toggle');
    this.nav = document.querySelector('.nav-menu');
    this.init();
  }
  
  init() {
    this.menuBtn?.addEventListener('click', () => {
      this.toggleMenu();
    });
    
    // 点击导航点后关闭菜单
    document.querySelectorAll('.nav-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        if (window.innerWidth < 768) {
          this.closeMenu();
        }
      });
    });
  }
  
  toggleMenu() {
    this.nav?.classList.toggle('active');
    this.menuBtn?.classList.toggle('active');
  }
  
  closeMenu() {
    this.nav?.classList.remove('active');
    this.menuBtn?.classList.remove('active');
  }
}
```


## 5. 响应式设计

### 5.1 断点设置
```css
/* 移动端优先 */
/* Mobile: < 768px (默认) */

/* Tablet */
@media (min-width: 768px) {
  /* 平板样式 */
}

/* Desktop */
@media (min-width: 1024px) {
  /* 桌面样式 */
}

/* Large Desktop */
@media (min-width: 1440px) {
  /* 大屏样式 */
}
```

### 5.2 布局适配

**移动端 (< 768px)**:
- 单列布局
- 汉堡菜单
- 产品卡片垂直堆叠
- 字号适当缩小
- 间距紧凑

**平板端 (768px - 1023px)**:
- 2列网格布局
- 导航栏展开
- 产品卡片2x2网格
- 适中的字号和间距

**桌面端 (≥ 1024px)**:
- 多列布局
- 固定导航栏
- 产品卡片横向排列或2x2网格
- 大字号，宽松间距
- 悬停效果

### 5.3 图片适配
```html
<!-- 响应式图片 -->
<picture>
  <source media="(min-width: 1024px)" srcset="images/product-large.webp">
  <source media="(min-width: 768px)" srcset="images/product-medium.webp">
  <img src="images/product-small.webp" alt="产品图片" loading="lazy">
</picture>
```


## 6. 性能优化

### 6.1 图片优化
- 使用WebP格式，提供JPEG/PNG fallback
- 图片压缩（质量80-85%）
- 懒加载非首屏图片
- 使用适当尺寸的图片（避免过大）
- 提供多种分辨率版本

### 6.2 CSS优化
- 关键CSS内联到HTML
- 非关键CSS异步加载
- 使用CSS变量减少重复
- 避免过度嵌套选择器
- 压缩CSS文件

### 6.3 JavaScript优化
- 延迟加载非关键JS
- 使用事件委托减少监听器
- 避免频繁的DOM操作
- 使用防抖和节流
- 压缩JS文件

### 6.4 字体优化
```css
/* 字体加载优化 */
@font-face {
  font-family: 'Noto Serif SC';
  src: url('assets/fonts/NotoSerifSC-Regular.woff2') format('woff2');
  font-display: swap; /* 避免FOIT */
  font-weight: 400;
}
```

### 6.5 缓存策略
```html
<!-- 在HTML中设置缓存 -->
<meta http-equiv="Cache-Control" content="max-age=31536000">
```


## 7. SEO优化

### 7.1 HTML结构
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>闾山文化蜡烛 | Lvshan Tradition - 道家生活美学</title>
  <meta name="description" content="闾山文化蜡烛，传承1300余年的道家文化，以物载道，赠礼臻选。匠心手造天然植物蜡烛，融入传统符箓工艺。">
  <meta name="keywords" content="闾山文化,道家蜡烛,天然蜡烛,文化礼品,东方美学,招财蜡烛,净化蜡烛">
  
  <!-- Open Graph -->
  <meta property="og:title" content="闾山文化蜡烛 | Lvshan Tradition">
  <meta property="og:description" content="传承1300余年的道家文化，以物载道，赠礼臻选">
  <meta property="og:image" content="images/og-image.jpg">
  <meta property="og:url" content="https://www.lvshan-candle.com">
  <meta property="og:type" content="website">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="闾山文化蜡烛 | Lvshan Tradition">
  <meta name="twitter:description" content="传承1300余年的道家文化，以物载道，赠礼臻选">
  <meta name="twitter:image" content="images/twitter-image.jpg">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="https://www.lvshan-candle.com">
  
  <!-- Favicon -->
  <link rel="icon" type="image/png" href="favicon.png">
</head>
```

### 7.2 语义化标签
```html
<body>
  <header>
    <nav><!-- 导航 --></nav>
  </header>
  
  <main>
    <section id="brand-story">
      <article><!-- 品牌故事内容 --></article>
    </section>
    <!-- 其他sections -->
  </main>
  
  <footer>
    <!-- 页脚信息 -->
  </footer>
</body>
```

### 7.3 结构化数据
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "闾山文化蜡烛",
  "alternateName": "Lvshan Tradition",
  "url": "https://www.lvshan-candle.com",
  "logo": "https://www.lvshan-candle.com/images/logo.png",
  "description": "传承1300余年的道家文化蜡烛品牌",
  "foundingDate": "713",
  "foundingLocation": {
    "@type": "Place",
    "name": "中国福建武夷山脉"
  }
}
</script>
```

### 7.4 sitemap.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.lvshan-candle.com/</loc>
    <lastmod>2026-01-26</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### 7.5 robots.txt
```
User-agent: *
Allow: /
Sitemap: https://www.lvshan-candle.com/sitemap.xml
```


## 8. 可访问性 (Accessibility)

### 8.1 ARIA标签
```html
<nav aria-label="主导航">
  <ul role="list">
    <li><a href="#brand-story" aria-label="品牌故事">品牌故事</a></li>
  </ul>
</nav>

<button class="menu-toggle" aria-label="打开菜单" aria-expanded="false">
  <span class="hamburger"></span>
</button>
```

### 8.2 键盘导航
- 所有交互元素可通过Tab键访问
- 焦点状态清晰可见
- 支持Enter/Space键触发按钮
- 支持Esc键关闭菜单

### 8.3 颜色对比度
- 文字与背景对比度 ≥ 4.5:1 (WCAG AA标准)
- 大文字对比度 ≥ 3:1
- 不仅依赖颜色传达信息

### 8.4 图片替代文本
```html
<img src="images/treasure-trove.jpg" 
     alt="闾山财源聚宝烛，玻璃容器中的天然大豆蜡烛，融入传统招财符箓">
```


## 9. 浏览器兼容性

### 9.1 目标浏览器
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- iOS Safari 14+
- Android Chrome 90+

### 9.2 Polyfills
```javascript
// 为旧浏览器提供支持
if (!('IntersectionObserver' in window)) {
  // 加载polyfill
  loadScript('js/polyfills/intersection-observer.js');
}

if (!window.fetch) {
  loadScript('js/polyfills/fetch.js');
}
```

### 9.3 CSS前缀
```css
/* 使用autoprefixer自动添加前缀 */
.element {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
```


## 10. 测试策略

### 10.1 功能测试
- [ ] 语言切换功能正常工作
- [ ] 导航链接正确跳转到对应section
- [ ] 平滑滚动效果正常
- [ ] 移动端菜单展开/收起正常
- [ ] 图片懒加载正常工作
- [ ] 所有链接可点击且有效

### 10.2 响应式测试
- [ ] 在1920px、1440px、1024px桌面端正常显示
- [ ] 在768px平板端正常显示
- [ ] 在375px、414px移动端正常显示
- [ ] 横屏和竖屏模式都正常
- [ ] 图片在不同设备上正确加载

### 10.3 浏览器兼容性测试
- [ ] Chrome最新版测试通过
- [ ] Firefox最新版测试通过
- [ ] Safari最新版测试通过
- [ ] Edge最新版测试通过
- [ ] iOS Safari测试通过
- [ ] Android Chrome测试通过

### 10.4 性能测试
- [ ] 首屏加载时间 < 3秒
- [ ] Lighthouse性能分数 > 90
- [ ] 图片优化有效
- [ ] 无控制台错误

### 10.5 可访问性测试
- [ ] 键盘导航正常
- [ ] 屏幕阅读器兼容
- [ ] 颜色对比度符合WCAG标准
- [ ] ARIA标签正确

### 10.6 SEO测试
- [ ] 所有页面有正确的title和meta
- [ ] 图片有alt属性
- [ ] 结构化数据正确
- [ ] sitemap.xml和robots.txt存在


## 11. 部署方案

### 11.1 静态托管选项
1. **GitHub Pages** (免费)
   - 适合开源项目
   - 自动部署
   - 支持自定义域名

2. **Netlify** (免费/付费)
   - 自动部署
   - CDN加速
   - 表单处理
   - HTTPS支持

3. **Vercel** (免费/付费)
   - 快速部署
   - 全球CDN
   - 自动HTTPS

4. **阿里云OSS/腾讯云COS** (付费)
   - 国内访问速度快
   - CDN加速
   - 成本可控

### 11.2 部署流程
1. 构建优化版本（压缩CSS/JS，优化图片）
2. 上传到托管平台
3. 配置自定义域名
4. 启用HTTPS
5. 配置CDN加速
6. 测试线上环境

### 11.3 持续集成
```yaml
# .github/workflows/deploy.yml (GitHub Actions示例)
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```


## 12. 未来扩展

### 12.1 可选功能
- 在线购买功能（集成电商平台）
- 用户评价/反馈系统
- 博客/文章板块（分享道家文化）
- 会员系统
- 在线客服（如LiveChat）
- 邮件订阅功能
- 社交媒体集成
- 多语言支持（日语、韩语等）

### 12.2 数据分析
- Google Analytics集成
- 百度统计集成
- 用户行为追踪
- 转化率分析

### 12.3 营销工具
- SEO持续优化
- 社交媒体分享按钮
- 优惠券/促销活动
- 邮件营销集成

## 13. 维护计划

### 13.1 定期维护
- 每月检查链接有效性
- 每季度更新内容
- 定期备份网站数据
- 监控网站性能
- 更新依赖和安全补丁

### 13.2 内容更新
- 新产品上线
- 节日促销活动
- 品牌故事更新
- 客户案例分享

### 13.3 技术更新
- 浏览器兼容性更新
- 性能优化
- 安全加固
- 新功能开发

## 14. 项目交付物

### 14.1 代码文件
- 完整的HTML/CSS/JavaScript源代码
- 图片资源（优化后）
- 字体文件
- 配置文件

### 14.2 文档
- 项目说明文档
- 部署指南
- 维护手册
- 内容更新指南

### 14.3 设计资源
- 设计规范文档
- 色彩方案
- 字体规范
- 组件库

## 15. 总结

本设计文档详细规划了闾山文化蜡烛品牌官网的技术实现方案，包括：
- 清晰的项目结构和技术选型
- **全屏滚动(Full-page Scrolling)**交互体验，类似Apple产品页
- **品牌故事轮播**设计，5屏展示不同维度
- 完整的5个section设计方案
- 统一的视觉设计规范
- 核心功能实现方案（全屏滚动、轮播、语言切换、懒加载等）
- 响应式设计和性能优化策略
- SEO和可访问性优化
- 测试和部署方案
- **占位图系统**，便于开发阶段使用

该方案采用纯HTML/CSS/JavaScript实现，无框架依赖，轻量级且易于维护，完全满足品牌官网的展示需求，同时体现了东方美学和道家文化的品牌调性，提供沉浸式的用户体验。

## 16. 图片需求清单

### 16.1 开发阶段（占位图）
开发期间所有图片使用占位图，采用以下策略：
- 在线占位图服务（如 placeholder.com）
- 本地生成的品牌色占位图
- CSS渐变背景占位

### 16.2 最终交付需要的真实图片

#### 品牌故事轮播背景图（5张）
尺寸：1920x1080px（16:9），WebP格式 + JPEG备用

1. **bg-wuyi-mountains.jpg** - 武夷山脉云雾意境图
   - 风格：空灵、仙境感
   - 色调：青绿、云雾白
   - 用途：轮播第1屏 - 品牌主视觉

2. **bg-ancient-temple.jpg** - 古朴道观/传统建筑
   - 风格：古朴、庄重
   - 色调：木色、石色
   - 用途：轮播第2屏 - 历史传承

3. **bg-talisman-culture.jpg** - 符箓/道教文化元素
   - 风格：神秘、文化感
   - 色调：墨色、金色
   - 用途：轮播第3屏 - 文化特色

4. **bg-zen-candlelight.jpg** - 禅意空间/蜡烛光影
   - 风格：宁静、温暖
   - 色调：暖光、阴影
   - 用途：轮播第4屏 - 核心理念

5. **bg-elegant-gift.jpg** - 优雅礼品场景
   - 风格：高端、精致
   - 色调：柔和、雅致
   - 用途：轮播第5屏 - 适合人群

#### 原料图片（7张）
尺寸：800x600px，WebP格式 + JPEG备用

**产品价值页面（3张）**:
6. **material-soy-wax.jpg** - 大豆蜡原料展示
7. **material-glass-container.jpg** - 玻璃容器展示
8. **material-natural-ingredients.jpg** - 其他天然原料

**原料详情页面（4张）**:
9. **material-detail-soy.jpg** - 大豆蜡详情图
10. **material-detail-glass.jpg** - 玻璃容器详情图
11. **material-detail-fragrance.jpg** - 天然香料图
12. **material-detail-wick.jpg** - 棉芯图

#### 产品图片（5张，需AI风格化统一处理）
尺寸：800x800px（1:1），WebP格式 + JPEG备用
**重要**：所有产品图片需要统一的AI风格化处理，确保视觉一致性

13. **product-treasure-trove.jpg** - 闾山财源聚宝烛
    - 招财系列
    - 展示符箓元素

14. **product-zen-aura.jpg** - 闾山净秽烛
    - 净化磁场系列
    - 展示清净感

15. **product-soulmate-spark.jpg** - 闾山缘合烛
    - 招桃花系列
    - 展示温馨感

16. **product-guardian-path.jpg** - 闾山辅运烛
    - 招贵人系列
    - 展示稳重感

17. **product-giftbox.jpg** - 包装礼盒
    - 展示高端礼品包装
    - 体现品牌调性

#### 品牌资源（3张）
18. **logo.png** - 品牌Logo
    - 透明背景PNG
    - 提供多种尺寸（256x256, 512x512）
    - 深色和浅色版本

19. **contact-bg.jpg** - 联系页面背景装饰
    - 尺寸：1920x1080px
    - 风格：简约、优雅

20. **favicon.png** - 网站图标
    - 尺寸：32x32, 64x64, 128x128, 256x256
    - ICO格式和PNG格式

### 16.3 图片规格要求

**格式**:
- 主格式：WebP（更小的文件大小）
- 备用格式：JPEG/PNG（兼容性）

**质量**:
- JPEG质量：80-85%
- WebP质量：75-80%
- PNG：24位真彩色

**优化**:
- 所有图片需压缩优化
- 提供2x分辨率版本（Retina屏幕）
- 移动端提供小尺寸版本

**命名规范**:
- 使用小写字母和连字符
- 描述性命名
- 例：product-treasure-trove.jpg, product-treasure-trove@2x.jpg

### 16.4 图片准备时间线
- **开发阶段**：使用占位图
- **测试阶段**：可以开始准备真实图片
- **上线前**：所有真实图片就位并优化完成

### 16.5 图片提供方式
建议通过以下方式提供：
- 云盘链接（百度网盘、阿里云盘等）
- 压缩包形式
- 按照上述命名规范组织文件夹结构
