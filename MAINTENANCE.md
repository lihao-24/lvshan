# 闾山文化蜡烛网站维护手册

## 目录
1. [项目概述](#项目概述)
2. [项目结构](#项目结构)
3. [核心模块说明](#核心模块说明)
4. [内容修改指南](#内容修改指南)
5. [图片管理](#图片管理)
6. [样式调整](#样式调整)
7. [常见维护任务](#常见维护任务)
8. [开发与部署](#开发与部署)

---

## 项目概述

这是一个静态网站项目，展示闾山文化蜡烛品牌。网站采用纯HTML/CSS/JavaScript开发，支持中英文双语切换，具有全屏滚动效果和轮播图功能。

**技术栈**：
- HTML5
- CSS3（使用CSS变量）
- 原生JavaScript（无框架依赖）
- Python HTTP服务器（开发环境）

---

## 项目结构

```
lushan-candle-website/
├── index.html                 # 主页面文件
├── css/                       # 样式文件目录
│   ├── variables.css         # CSS变量定义（颜色、字体、间距等）
│   ├── main.css              # 主样式文件
│   └── responsive.css        # 响应式样式
├── js/                        # JavaScript文件目录
│   ├── main.js               # 主脚本（初始化、懒加载）
│   ├── language.js           # 多语言切换功能
│   ├── fullpage-scroll.js    # 全屏滚动功能
│   ├── carousel.js           # 轮播图功能
│   └── image-protection.js   # 图片保护功能
├── data/                      # 数据文件目录
│   └── content.json          # 网站所有文本内容（中英文）
├── images/                    # 图片资源目录
│   ├── brand/                # 品牌相关图片（logo、favicon等）
│   ├── backgrounds/          # 背景图片
│   ├── materials/            # 材料展示图片
│   ├── products/             # 产品图片
│   └── fulu.png              # 符箓图片
├── package.json              # 项目配置文件
├── DEPLOYMENT.md             # 部署文档
└── MAINTENANCE.md            # 本维护手册
```

---

## 核心模块说明

### 1. 品牌故事模块（Brand Story）
**位置**：`index.html` 第一个section，ID为 `#brand-story`

**功能**：轮播展示品牌历史、文化特色、核心理念等

**包含5个幻灯片**：
- Slide 1: 品牌愿景
- Slide 2: 历史传承
- Slide 3: 文化融合
- Slide 4: 核心理念
- Slide 5: 目标受众

**控制脚本**：`js/carousel.js`

### 2. 产品价值模块（Product Value）
**位置**：`index.html` 第二个section，ID为 `#product-value`

**功能**：展示产品的核心价值和认证信息

**内容**：
- 左侧：文字描述（匠心手造、艺术价值）
- 右侧：4张认证图片（品鉴证书、退换须知、正品保障、发货规则）

### 3. 原料详情模块（Materials）
**位置**：`index.html` 第三个section，ID为 `#materials`

**功能**：展示蜡烛制作的5种主要原料

**原料卡片**（按顺序）：
1. 符箓（Fulu）
2. 大豆蜡（Soy Wax）
3. 玻璃容器（Glass Container）
4. 天然香料（Natural Fragrance）
5. 棉芯（Cotton Wick）

**布局**：5列网格布局，响应式设计

### 4. 产品系列模块（Products）
**位置**：`index.html` 第四个section，ID为 `#products`

**功能**：展示4款主要产品和礼盒套装

**产品列表**：
1. 闾山财源聚宝烛（Treasure Trove Candle）
2. 闾山净秽烛（Zen Aura Candle）
3. 闾山缘合烛（Soulmate Spark Candle）
4. 闾山辅运烛（Guardian Path Candle）

**特殊功能**：
- 每个产品卡片可展开/收起使用场景
- 礼盒套装独立展示区域
- 咨询购买按钮（链接到外部商店）

### 5. 联系方式模块（Contact）
**位置**：`index.html` 第五个section，ID为 `#contact`

**功能**：展示联系邮箱

**邮箱**：lvshan1.136@gmail.com（点击可打开邮件客户端）

---

## 内容修改指南

### 修改文本内容

**所有文本内容都存储在 `data/content.json` 文件中**

#### 文件结构
```json
{
  "zh": {  // 中文内容
    "nav": {},
    "brand": {},
    "value": {},
    "materials": {},
    "products": {},
    "contact": {}
  },
  "en": {  // 英文内容
    // 结构与中文相同
  }
}
```

#### 修改步骤

1. **打开文件**：`data/content.json`

2. **找到要修改的内容**：
   - 使用文本编辑器搜索关键词
   - 根据模块名称定位（如 `materials`、`products`）

3. **同时修改中英文**：
   ```json
   // 中文
   "zh": {
     "materials": {
       "soy": {
         "title": "大豆蜡",
         "description": "天然植物蜡，环保健康，燃烧时间长"
       }
     }
   },
   // 英文
   "en": {
     "materials": {
       "soy": {
         "title": "Soy Wax",
         "description": "Natural plant-based wax, eco-friendly and healthy, with long burning time"
       }
     }
   }
   ```

4. **保存文件**：确保JSON格式正确（注意逗号、引号）

5. **刷新浏览器**：查看修改效果

#### 常见修改示例

**修改产品名称**：
```json
"products": {
  "treasure": {
    "name": "闾山财源聚宝烛",  // 修改这里
    "nameEn": "Treasure Trove Candle",  // 修改这里
    "series": "招财系列"
  }
}
```

**修改产品使用场景**：
```json
"treasure": {
  "scenario1": "招财纳福",  // 修改场景1
  "scenario2": "生活仪式感"  // 修改场景2
}
```

**添加新的使用场景**：
```json
"treasure": {
  "scenario1": "招财纳福",
  "scenario2": "生活仪式感",
  "scenario3": "新增场景"  // 添加新场景
}
```
然后在 `index.html` 中添加对应的 `<li>` 元素：
```html
<li data-i18n="products.treasure.scenario3">新增场景</li>
```

---

## 图片管理

### 图片目录结构

```
images/
├── brand/              # 品牌图片
│   ├── logo.png       # 网站Logo
│   ├── favicon.png    # 浏览器图标
│   └── twitter-image.jpg  # 社交媒体分享图
├── backgrounds/        # 背景图片（轮播图使用）
│   ├── wuyi-mountains-mist.jpg
│   ├── ancient-temple.jpg
│   ├── talisman-culture.jpg
│   ├── zen-candlelight.jpg
│   └── elegant-gift.jpg
├── materials/          # 原料图片
│   ├── soy-wax-detail.jpg
│   ├── glass-container-detail.jpg
│   ├── natural-fragrance.jpg
│   ├── cotton-wick.jpg
│   ├── pjzs.png       # 品鉴证书
│   ├── thxl.png       # 退换须知
│   ├── zcjb.png       # 正品保障
│   └── fxgz.png       # 发货规则
├── products/           # 产品图片
│   ├── treasure-trove-candle.jpg
│   ├── zen-aura-candle.jpg
│   ├── soulmate-spark-candle.jpg
│   └── guardian-path-candle.jpg
├── fulu.png           # 符箓图片
└── lihe.png           # 礼盒图片
```

### 替换图片

#### 方法1：直接替换文件
1. 准备新图片（建议使用相同的文件名和格式）
2. 删除旧图片
3. 将新图片放入对应目录
4. 刷新浏览器查看效果

#### 方法2：修改HTML引用
1. 将新图片放入 `images/` 目录
2. 在 `index.html` 中找到对应的 `<img>` 标签
3. 修改 `data-src` 属性

**示例**：替换符箓图片
```html
<!-- 原来 -->
<img data-src="images/fulu.png" alt="符箓">

<!-- 修改为 -->
<img data-src="images/new-fulu.png" alt="符箓">
```

### 图片规格建议

| 类型 | 建议尺寸 | 格式 | 说明 |
|------|---------|------|------|
| Logo | 200x60px | PNG | 透明背景 |
| Favicon | 32x32px | PNG | 正方形 |
| 背景图 | 1920x1080px | JPG | 高质量 |
| 产品图 | 800x800px | JPG | 正方形 |
| 材料图 | 600x600px | JPG | 正方形 |
| 礼盒图 | 1000x800px | PNG | 可透明背景 |

### 图片优化建议

1. **压缩图片**：使用TinyPNG或ImageOptim压缩
2. **使用WebP格式**：现代浏览器支持，体积更小
3. **懒加载**：项目已实现，无需额外配置

---

## 样式调整

### CSS文件说明

#### 1. `css/variables.css` - CSS变量定义
存储所有可重用的样式变量：

```css
:root {
  /* 颜色 */
  --primary-color: #8B4513;      /* 主色调（棕色） */
  --secondary-color: #C9A063;    /* 辅助色（金色） */
  --accent-color: #D4AF37;       /* 强调色 */
  
  /* 字体 */
  --font-chinese-title: 'Noto Serif SC', serif;
  --font-chinese-body: 'Noto Sans SC', sans-serif;
  
  /* 间距 */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  
  /* 其他... */
}
```

**修改颜色**：
```css
/* 修改主色调为深蓝色 */
--primary-color: #1a3a52;

/* 修改金色为玫瑰金 */
--secondary-color: #b76e79;
```

#### 2. `css/main.css` - 主样式文件
包含所有模块的样式定义

**常见调整**：

**修改材料卡片大小**：
```css
.materials-grid {
  grid-template-columns: repeat(5, 1fr);  /* 5列布局 */
  gap: var(--spacing-md);  /* 卡片间距 */
}

.material-card {
  padding: var(--spacing-md);  /* 内边距 */
}
```

**修改产品卡片布局**：
```css
.products-grid {
  grid-template-columns: repeat(4, 1fr);  /* 改为3列 */
  gap: var(--spacing-lg);
}
```

**修改字体大小**：
```css
.material-card h3 {
  font-size: var(--font-size-h5);  /* 使用变量 */
  /* 或直接指定 */
  font-size: 18px;
}
```

#### 3. `css/responsive.css` - 响应式样式
处理不同屏幕尺寸的适配

**断点**：
- 桌面：> 1024px
- 平板：768px - 1024px
- 手机：< 768px

---

## 常见维护任务

### 1. 添加新产品

#### 步骤1：添加产品图片
将产品图片放入 `images/products/` 目录

#### 步骤2：在 `content.json` 添加产品信息
```json
"products": {
  "newproduct": {
    "name": "新产品中文名",
    "nameEn": "New Product English Name",
    "series": "系列名称",
    "feature": "产品特点描述",
    "scenario1": "使用场景1",
    "scenario2": "使用场景2"
  }
}
```

#### 步骤3：在 `index.html` 添加产品卡片
```html
<div class="product-card">
  <img data-src="images/products/new-product.jpg" alt="新产品">
  <h3 data-i18n="products.newproduct.name">新产品中文名</h3>
  <h4 data-i18n="products.newproduct.nameEn">New Product English Name</h4>
  <span class="tag" data-i18n="products.newproduct.series">系列名称</span>
  <p class="feature" data-i18n="products.newproduct.feature">产品特点描述</p>
  <button class="toggle-scenarios" data-i18n="products.toggleScenarios">查看使用场景</button>
  <div class="scenarios">
    <h5 data-i18n="products.scenariosTitle">使用场景</h5>
    <ul>
      <li data-i18n="products.newproduct.scenario1">使用场景1</li>
      <li data-i18n="products.newproduct.scenario2">使用场景2</li>
    </ul>
  </div>
</div>
```

### 2. 修改联系邮箱

#### 在 `index.html` 中修改：
```html
<p><a href="mailto:新邮箱@example.com">新邮箱@example.com</a></p>
```

### 3. 更新轮播图背景

#### 步骤1：替换背景图片
将新图片放入 `images/backgrounds/` 目录

#### 步骤2：在 `index.html` 中更新引用
```html
<div class="slide-bg" style="background-image: url('images/backgrounds/new-background.jpg')"></div>
```

### 4. 修改礼盒购买链接

在 `index.html` 中找到：
```html
<a href="https://lvshan.org/products/..." class="consultation-btn">
```
修改 `href` 属性为新的购买链接

### 5. 添加新的原料卡片

#### 步骤1：在 `content.json` 添加原料信息
```json
"materials": {
  "newmaterial": {
    "title": "新原料名称",
    "description": "新原料描述"
  }
}
```

#### 步骤2：在 `index.html` 添加卡片
```html
<div class="material-card">
  <img data-src="images/materials/new-material.jpg" alt="新原料">
  <h3 data-i18n="materials.newmaterial.title">新原料名称</h3>
  <p data-i18n="materials.newmaterial.description">新原料描述</p>
</div>
```

#### 步骤3：调整网格列数（如果需要）
在 `css/main.css` 中：
```css
.materials-grid {
  grid-template-columns: repeat(6, 1fr);  /* 改为6列 */
}
```

---

## 开发与部署

### 本地开发

#### 启动开发服务器

**方法1：使用Python（推荐）**
```bash
cd lushan-candle-website
python -m http.server 8000
```

**方法2：使用npm**
```bash
npm start
```

访问：`http://localhost:8000`

#### 开发工具推荐
- **代码编辑器**：VS Code、Sublime Text
- **浏览器**：Chrome（开发者工具）
- **图片编辑**：Photoshop、GIMP
- **图片压缩**：TinyPNG、ImageOptim

### 部署

详细部署说明请参考 `DEPLOYMENT.md` 文件

**快速部署选项**：
1. **Netlify**：拖拽部署，自动HTTPS
2. **Vercel**：Git集成，自动部署
3. **GitHub Pages**：免费托管
4. **传统服务器**：上传到Web服务器根目录

### 版本控制

建议使用Git进行版本管理：

```bash
# 初始化仓库
git init

# 添加文件
git add .

# 提交更改
git commit -m "描述修改内容"

# 推送到远程仓库
git push origin main
```

---

## 故障排查

### 常见问题

#### 1. 图片不显示
**原因**：
- 图片路径错误
- 图片文件不存在
- 懒加载未触发

**解决方法**：
- 检查 `data-src` 属性路径
- 确认图片文件存在
- 打开浏览器控制台查看错误信息

#### 2. 文本未更新
**原因**：
- `content.json` 格式错误
- 浏览器缓存
- `data-i18n` 属性不匹配

**解决方法**：
- 验证JSON格式（使用JSONLint）
- 清除浏览器缓存（Ctrl+Shift+R）
- 检查HTML中的 `data-i18n` 属性值

#### 3. 样式不生效
**原因**：
- CSS选择器优先级问题
- 浏览器缓存
- CSS语法错误

**解决方法**：
- 使用更具体的选择器
- 清除缓存
- 检查CSS语法（缺少分号、括号等）

#### 4. 语言切换失败
**原因**：
- `language.js` 未加载
- `content.json` 路径错误
- JSON格式错误

**解决方法**：
- 检查浏览器控制台错误
- 确认 `data/content.json` 路径正确
- 验证JSON格式

---

## 性能优化建议

### 1. 图片优化
- 压缩所有图片（目标：< 200KB）
- 使用WebP格式
- 实现响应式图片（不同尺寸设备加载不同大小）

### 2. 代码优化
- 压缩CSS和JavaScript文件
- 合并多个CSS/JS文件
- 使用CDN加载字体

### 3. 缓存策略
- 设置浏览器缓存头
- 使用版本号（如 `main.css?v=2`）

### 4. 加载优化
- 延迟加载非关键资源
- 预加载关键资源
- 使用懒加载（已实现）

---

## 联系与支持

如有技术问题或需要协助，请联系：
- **邮箱**：lvshan1.136@gmail.com
- **项目文档**：查看 `DEPLOYMENT.md` 和本文档

---

## 更新日志

### 2026-01-27
- 创建维护手册
- 添加符箓原料模块
- 将"Wish Candle"改为"Fengshui Candle"
- 修正英文翻译错误
- 更新联系邮箱

---

**文档版本**：1.0  
**最后更新**：2026年1月27日
