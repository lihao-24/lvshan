# 部署指南

本文档说明如何将闾山文化蜡烛品牌官网部署到各种托管平台。

## 部署前准备

### 1. 图片准备
- 替换所有占位图为真实图片
- 确保图片已优化压缩
- 提供WebP格式和JPEG/PNG备用格式

### 2. 内容检查
- 检查所有中英文文案是否正确
- 确认联系方式信息
- 测试所有功能是否正常

### 3. 性能优化
- 压缩CSS和JavaScript文件
- 优化图片大小
- 运行Lighthouse测试

## 部署选项

### 选项1: GitHub Pages（免费）

**优点**:
- 完全免费
- 自动部署
- 支持自定义域名
- HTTPS支持

**步骤**:

1. 创建GitHub仓库
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/lvshan-candle.git
git push -u origin main
```

2. 启用GitHub Pages
- 进入仓库Settings
- 找到Pages选项
- Source选择main分支
- 点击Save

3. 访问网站
- 网址: `https://yourusername.github.io/lvshan-candle/`

4. 自定义域名（可选）
- 在域名提供商添加CNAME记录指向 `yourusername.github.io`
- 在GitHub Pages设置中添加自定义域名
- 等待DNS生效（可能需要24-48小时）

---

### 选项2: Netlify（推荐）

**优点**:
- 免费计划足够使用
- 自动部署
- 全球CDN加速
- 表单处理
- HTTPS自动配置
- 中国访问速度较好

**步骤**:

1. 注册Netlify账号
访问 [netlify.com](https://www.netlify.com/)

2. 连接Git仓库
- 点击"New site from Git"
- 选择GitHub/GitLab/Bitbucket
- 选择你的仓库

3. 配置构建设置
- Build command: (留空)
- Publish directory: `.`
- 点击"Deploy site"

4. 自定义域名
- 进入Site settings > Domain management
- 点击"Add custom domain"
- 按照提示配置DNS

5. 配置HTTPS
- Netlify会自动配置Let's Encrypt证书
- 启用"Force HTTPS"

**Netlify配置文件** (可选):
创建 `netlify.toml`:
```toml
[build]
  publish = "."

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.jpg"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.png"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.webp"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

### 选项3: Vercel

**优点**:
- 免费计划
- 极快的部署速度
- 全球CDN
- 自动HTTPS
- 优秀的开发体验

**步骤**:

1. 安装Vercel CLI
```bash
npm install -g vercel
```

2. 登录Vercel
```bash
vercel login
```

3. 部署
```bash
cd lvshan-candle-website
vercel
```

4. 按照提示完成配置
- 选择项目名称
- 确认设置
- 等待部署完成

5. 生产部署
```bash
vercel --prod
```

**Vercel配置文件** (可选):
创建 `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    },
    {
      "source": "/(.*)\\.(css|js|jpg|png|webp|woff|woff2)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

### 选项4: 阿里云OSS + CDN（国内推荐）

**优点**:
- 国内访问速度快
- 成本可控
- 稳定可靠
- 支持自定义域名

**步骤**:

1. 创建OSS Bucket
- 登录阿里云控制台
- 创建OSS Bucket
- 设置为公共读

2. 上传文件
使用ossutil工具或Web控制台上传所有文件

3. 配置静态网站托管
- 在Bucket设置中启用静态网站托管
- 设置默认首页为 `index.html`
- 设置404页面（可选）

4. 配置CDN加速
- 创建CDN域名
- 源站选择OSS Bucket
- 配置HTTPS证书
- 配置缓存规则

5. 域名解析
- 添加CNAME记录指向CDN域名

**成本估算**:
- OSS存储: ~0.12元/GB/月
- CDN流量: ~0.24元/GB
- 小型网站月成本约10-50元

---

### 选项5: 腾讯云COS + CDN

类似阿里云OSS，步骤基本相同。

---

## 域名配置

### 购买域名
推荐域名注册商：
- 阿里云（万网）
- 腾讯云
- GoDaddy
- Namecheap

### DNS配置

**A记录** (指向IP):
```
类型: A
主机记录: @
记录值: 服务器IP地址
TTL: 600
```

**CNAME记录** (指向域名):
```
类型: CNAME
主机记录: www
记录值: yourusername.github.io
TTL: 600
```

**示例配置**:
```
@ A 185.199.108.153
www CNAME yourusername.github.io
```

### HTTPS配置

**Let's Encrypt免费证书**:
大多数托管平台（Netlify、Vercel、GitHub Pages）会自动配置。

**阿里云/腾讯云**:
- 在控制台申请免费SSL证书
- 下载证书文件
- 在CDN或负载均衡中配置

---

## 性能优化

### 1. 图片优化
```bash
# 使用ImageMagick批量压缩
mogrify -quality 85 -resize 1920x1080 images/backgrounds/*.jpg

# 转换为WebP格式
for file in images/**/*.jpg; do
  cwebp -q 80 "$file" -o "${file%.jpg}.webp"
done
```

### 2. CSS/JS压缩

**使用在线工具**:
- CSS: [cssnano](https://cssnano.co/)
- JavaScript: [JavaScript Minifier](https://javascript-minifier.com/)

**使用命令行工具**:
```bash
# 安装工具
npm install -g csso-cli terser

# 压缩CSS
csso css/main.css -o css/main.min.css

# 压缩JavaScript
terser js/main.js -o js/main.min.js -c -m
```

### 3. 启用Gzip压缩

大多数托管平台自动启用，如需手动配置：

**Nginx**:
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

**Apache** (.htaccess):
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

---

## 监控和分析

### Google Analytics
1. 创建GA账号和属性
2. 获取跟踪ID
3. 在 `index.html` 的 `</head>` 前添加：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 百度统计
1. 注册百度统计账号
2. 获取统计代码
3. 添加到 `index.html`

---

## 持续集成/持续部署 (CI/CD)

### GitHub Actions示例

创建 `.github/workflows/deploy.yml`:

```yaml
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

---

## 故障排查

### 问题1: 图片不显示
- 检查图片路径是否正确
- 确认图片文件已上传
- 检查浏览器控制台错误

### 问题2: JavaScript不工作
- 检查浏览器控制台错误
- 确认所有JS文件已加载
- 检查文件路径

### 问题3: 语言切换不工作
- 确认 `data/content.json` 文件存在
- 检查JSON格式是否正确
- 查看网络请求是否成功

### 问题4: 全屏滚动不流畅
- 检查浏览器兼容性
- 减少页面元素数量
- 优化图片大小

---

## 备份和恢复

### 定期备份
```bash
# 备份整个项目
tar -czf lvshan-candle-backup-$(date +%Y%m%d).tar.gz lvshan-candle-website/

# 上传到云存储
# 阿里云OSS
ossutil cp lvshan-candle-backup-*.tar.gz oss://your-bucket/backups/
```

### 恢复
```bash
# 解压备份
tar -xzf lvshan-candle-backup-20260126.tar.gz
```

---

## 安全建议

1. **启用HTTPS**: 所有托管平台都应启用HTTPS
2. **设置安全头**: 配置CSP、X-Frame-Options等
3. **定期更新**: 保持依赖和内容更新
4. **监控访问**: 使用分析工具监控异常访问
5. **备份数据**: 定期备份网站文件

---

## 联系支持

如有部署问题，请联系开发团队。

---

**最后更新**: 2026-01-26
