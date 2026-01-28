# 闾山文化蜡烛品牌官网

传承1300余年的道家文化蜡烛品牌官方网站

## 项目特点

- ✅ 纯HTML/CSS/JavaScript，无框架依赖
- ✅ 全屏滚动效果，类似Apple产品页
- ✅ 品牌故事轮播展示
- ✅ 中英双语支持
- ✅ 响应式设计，支持所有设备
- ✅ 图片懒加载优化
- ✅ SEO友好

## 项目结构

```
lvshan-candle-website/
├── index.html              # 主页面
├── css/
│   ├── variables.css       # CSS变量（颜色、字体、间距等）
│   ├── main.css           # 主样式文件
│   └── responsive.css     # 响应式样式
├── js/
│   ├── language.js        # 语言切换功能
│   ├── fullpage-scroll.js # 全屏滚动功能
│   ├── carousel.js        # 轮播功能
│   └── main.js            # 主JavaScript文件
├── images/
│   ├── backgrounds/       # 背景图片
│   ├── products/          # 产品图片
│   ├── materials/         # 原料图片
│   └── brand/             # 品牌资源（Logo等）
├── data/
│   └── content.json       # 中英文内容数据
├── assets/
│   └── fonts/             # 字体文件
├── sitemap.xml            # 网站地图
├── robots.txt             # 搜索引擎爬虫规则
└── README.md              # 项目说明文档
```

## 快速开始

### 1. 本地预览

由于使用了fetch API加载JSON数据，需要通过HTTP服务器运行：

**使用Python（推荐）**:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**使用Node.js**:
```bash
# 安装http-server
npm install -g http-server

# 运行
http-server -p 8000
```

**使用PHP**:
```bash
php -S localhost:8000
```

然后在浏览器中访问: `http://localhost:8000`

### 2. 部署

#### GitHub Pages
1. 将项目推送到GitHub仓库
2. 在仓库设置中启用GitHub Pages
3. 选择主分支作为源
4. 访问 `https://yourusername.github.io/repository-name`

#### Netlify
1. 将项目推送到Git仓库
2. 在Netlify中连接仓库
3. 部署设置：
   - Build command: (留空)
   - Publish directory: `.`
4. 点击Deploy

#### Vercel
1. 安装Vercel CLI: `npm i -g vercel`
2. 在项目目录运行: `vercel`
3. 按照提示完成部署

## 功能说明

### 全屏滚动
- 鼠标滚轮滚动切换section
- 触摸滑动切换（移动端）
- 键盘方向键切换
- 右侧导航点指示当前位置

### 品牌故事轮播
- 5屏轮播展示品牌不同维度
- 自动播放（5秒/屏）
- 左右箭头手动切换
- 底部指示点
- 触摸滑动支持

### 语言切换
- 点击右上角语言按钮切换中英文
- 语言选择自动保存到localStorage
- 所有内容同步更新

### 图片懒加载
- 图片进入视口时才加载
- 优化页面加载速度
- 使用占位图过渡

## 内容更新

### 修改文案
编辑 `data/content.json` 文件，按照现有格式添加或修改中英文内容。

### 替换图片
将图片放入对应目录：
- 背景图: `images/backgrounds/`
- 产品图: `images/products/`
- 原料图: `images/materials/`
- 品牌资源: `images/brand/`

然后在HTML中更新图片路径。

### 添加新产品
1. 在 `index.html` 的产品section中添加新的产品卡片
2. 在 `data/content.json` 中添加对应的中英文内容
3. 添加产品图片到 `images/products/`

## 浏览器支持

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- iOS Safari 14+
- Android Chrome 90+

## 性能优化

- 图片懒加载
- CSS和JavaScript文件压缩（生产环境）
- 使用WebP格式图片（提供JPEG备用）
- 关键CSS内联
- 字体优化加载

## SEO优化

- 完整的meta标签
- Open Graph和Twitter Card支持
- 结构化数据（JSON-LD）
- 语义化HTML标签
- sitemap.xml和robots.txt

## 开发建议

### 图片优化
使用以下工具压缩图片：
- [TinyPNG](https://tinypng.com/) - PNG/JPEG压缩
- [Squoosh](https://squoosh.app/) - 多格式图片优化
- [ImageOptim](https://imageoptim.com/) - Mac图片优化工具

### 代码压缩
生产环境建议压缩CSS和JavaScript：
- CSS: [cssnano](https://cssnano.co/)
- JavaScript: [Terser](https://terser.org/)

### 性能测试
使用以下工具测试性能：
- [Google Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)

## 待办事项

- [ ] 替换所有占位图为真实图片
- [ ] 添加品牌Logo
- [ ] 添加Favicon
- [ ] 优化图片尺寸和格式
- [ ] 添加Google Analytics（可选）
- [ ] 添加在线客服（可选）
- [ ] 集成电商平台（可选）

## 图片需求清单

详见 `.kiro/specs/lvshan-candle-website/image-requirements.md`

需要准备20张图片：
- 品牌故事轮播背景图：5张
- 原料图片：7张
- 产品图片：5张（需AI风格化统一处理）
- 品牌资源：3张

## 技术支持

如有问题或建议，请联系开发团队。

## 许可证

© 2026 闾山文化蜡烛 Lvshan Tradition. All rights reserved.
