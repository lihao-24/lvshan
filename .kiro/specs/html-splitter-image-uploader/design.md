# 设计文档：HTML部署自动化工具

## 概述

HTML部署自动化工具是一个命令行工具，用于处理HTML网站项目并生成符合目标平台限制的部署代码。系统采用管道式架构，按顺序执行：资源扫描 → 图片上传 → 路径替换 → 资源内联 → HTML拆分 → 文档生成。

核心设计原则：
- **模块化**：每个处理步骤独立封装，便于测试和维护
- **可配置**：通过配置文件支持不同的图床服务和参数
- **容错性**：单个图片上传失败不影响整体流程
- **可追溯**：生成详细的映射表和日志

## 架构

系统采用分层架构：

```
┌─────────────────────────────────────────┐
│         CLI 命令行接口层                  │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         配置管理层 (ConfigManager)        │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│         处理流程编排层 (Pipeline)         │
└──┬────┬────┬────┬────┬────┬────────────┘
   │    │    │    │    │    │
   ▼    ▼    ▼    ▼    ▼    ▼
┌────┐┌────┐┌────┐┌────┐┌────┐┌────┐
│扫描││上传││替换││内联││拆分││生成│
│器  ││器  ││器  ││器  ││器  ││器  │
└────┘└────┘└────┘└────┘└────┘└────┘
   │    │    │    │    │    │
   ▼    ▼    ▼    ▼    ▼    ▼
┌─────────────────────────────────────────┐
│         文件系统 & 网络服务层             │
└─────────────────────────────────────────┘
```

**处理流程：**

1. **ResourceScanner（资源扫描器）**：扫描HTML文件，提取所有图片引用
2. **ImageUploader（图片上传器）**：上传图片到图床，生成URL映射表
3. **PathReplacer（路径替换器）**：替换HTML中的本地图片路径为图床URL
4. **ResourceInliner（资源内联器）**：将外部CSS/JS内联到HTML
5. **HTMLSplitter（HTML拆分器）**：按字符限制拆分为多个完整HTML文件
6. **DeploymentGenerator（部署文档生成器）**：生成部署说明和映射表

## 组件和接口

### 1. ConfigManager（配置管理器）

**职责**：加载和管理配置参数

**接口**：
```python
class Config:
    source_dir: str          # 源项目目录
    output_dir: str          # 输出目录
    char_limit: int          # 字符限制（默认60000）
    image_host: str          # 图床类型（smms/imgbb/imgur）
    api_key: str             # 图床API密钥
    
class ConfigManager:
    def load_config(config_path: str) -> Config
    def get_default_config() -> Config
```

### 2. ResourceScanner（资源扫描器）

**职责**：扫描HTML文件并提取图片引用

**接口**：
```python
class ImageReference:
    file_path: str           # HTML文件路径
    image_path: str          # 图片本地路径
    reference_type: str      # 引用类型（img_src/css_bg/inline_style）
    line_number: int         # 行号
    
class ResourceScanner:
    def scan_directory(source_dir: str) -> List[str]
    def extract_images(html_content: str, html_file: str) -> List[ImageReference]
    def resolve_path(base_path: str, relative_path: str) -> str
```

**实现细节**：
- 使用正则表达式匹配img标签的src属性
- 使用CSS解析器提取background-image
- 支持相对路径和绝对路径解析
- 去重：同一图片只记录一次

### 3. ImageUploader（图片上传器）

**职责**：上传图片到图床并生成URL映射

**接口**：
```python
class UploadResult:
    local_path: str          # 本地路径
    remote_url: str          # 图床URL
    success: bool            # 是否成功
    error_message: str       # 错误信息（如果失败）
    
class ImageUploader:
    def __init__(config: Config)
    def upload_image(image_path: str) -> UploadResult
    def upload_batch(image_paths: List[str]) -> List[UploadResult]
    def generate_url_mapping(results: List[UploadResult]) -> Dict[str, str]
```

**支持的图床服务**：
- **SM.MS**：免费，5MB限制，API简单
- **ImgBB**：免费，32MB限制，需要API key
- **Imgur**：免费，20MB限制，需要Client ID

**实现细节**：
- 使用HTTP multipart/form-data上传
- 实现重试机制（最多3次）
- 记录上传失败的图片
- 支持并发上传（使用线程池）

### 4. PathReplacer（路径替换器）

**职责**：替换HTML中的图片路径

**接口**：
```python
class PathReplacer:
    def replace_paths(html_content: str, url_mapping: Dict[str, str]) -> str
    def replace_in_file(html_file: str, url_mapping: Dict[str, str]) -> str
```

**实现细节**：
- 使用BeautifulSoup解析HTML
- 替换img标签的src属性
- 替换CSS中的url()引用
- 替换内联样式中的图片引用
- 保持HTML格式和缩进

### 5. ResourceInliner（资源内联器）

**职责**：将外部CSS和JS内联到HTML

**接口**：
```python
class ResourceInliner:
    def inline_css(html_content: str, base_dir: str) -> str
    def inline_js(html_content: str, base_dir: str) -> str
    def inline_all(html_content: str, base_dir: str) -> str
```

**实现细节**：
- 查找所有`<link rel="stylesheet">`标签
- 读取CSS文件内容，替换为`<style>`标签
- 查找所有`<script src="">`标签
- 读取JS文件内容，替换为内联`<script>`标签
- 处理CSS中的相对路径（@import、url()）
- 保持资源加载顺序

### 6. HTMLSplitter（HTML拆分器）

**职责**：按字符限制拆分HTML为多个完整文件

**接口**：
```python
class HTMLPage:
    content: str             # HTML内容
    char_count: int          # 字符数
    page_number: int         # 页码
    
class HTMLSplitter:
    def __init__(char_limit: int)
    def split_html(html_content: str) -> List[HTMLPage]
    def extract_head_content(html_content: str) -> str
    def create_complete_html(body_content: str, head_content: str, page_num: int) -> str
```

**拆分策略**：

1. **提取公共部分**：
   - 提取原始HTML的head内容（包括所有style标签）
   - 提取body的开始标签和属性

2. **拆分body内容**：
   - 解析body内的DOM树
   - 按顺序遍历顶层元素（section、div等）
   - 累计字符数，接近限制时创建新页面
   - 确保不在标签中间拆分

3. **生成完整HTML**：
   - 每个页面包含完整的HTML结构
   - 复制head内容到每个页面
   - 添加页面导航链接（可选）
   - 添加页码标识注释

**示例拆分结果**：
```html
<!-- page-1.html -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>/* 所有CSS */</style>
</head>
<body>
    <!-- 第一部分内容 -->
    <div class="page-indicator">Page 1 of 3</div>
</body>
</html>

<!-- page-2.html -->
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>/* 所有CSS */</style>
</head>
<body>
    <!-- 第二部分内容 -->
    <div class="page-indicator">Page 2 of 3</div>
</body>
</html>
```

### 7. DeploymentGenerator（部署文档生成器）

**职责**：生成部署说明文档

**接口**：
```python
class DeploymentInfo:
    pages: List[HTMLPage]
    url_mapping: Dict[str, str]
    total_images: int
    failed_uploads: List[str]
    
class DeploymentGenerator:
    def generate_document(info: DeploymentInfo, output_path: str) -> None
    def format_url_mapping(url_mapping: Dict[str, str]) -> str
    def format_page_list(pages: List[HTMLPage]) -> str
```

**文档内容**：
```markdown
# 部署文档

## 概览
- 总页面数：3
- 总图片数：45
- 上传成功：43
- 上传失败：2

## 页面列表
1. page-1.html (58,234 字符)
2. page-2.html (59,876 字符)
3. page-3.html (32,145 字符)

## 部署步骤
1. 在目标平台创建3个页面
2. 按顺序复制每个HTML文件的内容
3. 每个页面可独立访问和显示

## URL映射表
| 本地路径 | 图床URL |
|---------|---------|
| images/logo.png | https://... |
| images/banner.jpg | https://... |

## 失败的图片
- images/large-file.png (文件过大)
- images/corrupted.jpg (上传失败)
```

## 数据模型

### Config（配置）
```python
@dataclass
class Config:
    source_dir: str = "."
    output_dir: str = "./output"
    char_limit: int = 60000
    image_host: str = "smms"
    api_key: str = ""
    max_retries: int = 3
    concurrent_uploads: int = 5
```

### ImageReference（图片引用）
```python
@dataclass
class ImageReference:
    file_path: str          # HTML文件路径
    image_path: str         # 图片路径
    reference_type: str     # img_src/css_bg/inline_style
    line_number: int        # 行号
```

### UploadResult（上传结果）
```python
@dataclass
class UploadResult:
    local_path: str
    remote_url: str
    success: bool
    error_message: str = ""
    file_size: int = 0
    upload_time: float = 0.0
```

### HTMLPage（HTML页面）
```python
@dataclass
class HTMLPage:
    content: str
    char_count: int
    page_number: int
    file_name: str
```

## 正确性属性

*属性是一个特征或行为，应该在系统的所有有效执行中保持为真——本质上是关于系统应该做什么的形式化陈述。属性作为人类可读规范和机器可验证正确性保证之间的桥梁。*


### 属性 1: 图片扫描完整性
*对于任何*包含图片引用的HTML文件，扫描后生成的清单应该包含所有类型的图片引用（img标签、CSS background-image、内联样式），且每个图片的本地路径和引用位置都被正确记录。
**验证需求：1.1, 1.2, 1.3, 1.4**

### 属性 2: 图片格式支持
*对于任何*常见图片格式（jpg、jpeg、png、gif、svg、webp、ico），系统都应该能够识别和处理。
**验证需求：1.5**

### 属性 3: 上传映射完整性
*对于任何*图片清单，上传处理后生成的URL映射表应该包含所有成功上传的图片，且每个映射都保留原始文件名和扩展名。
**验证需求：2.1, 2.2, 2.3, 2.5**

### 属性 4: 上传失败容错性
*对于任何*包含部分失败上传的批次，系统应该记录失败信息并继续处理剩余图片，不中断整个流程。
**验证需求：2.4**

### 属性 5: 路径替换完整性
*对于任何*HTML文件和URL映射表，替换后的HTML应该将所有在映射表中的本地路径（包括相对路径）替换为对应的图床URL，同时保持HTML结构和其他属性不变。
**验证需求：3.1, 3.2, 3.3, 3.4, 3.5**

### 属性 6: CSS内联保持顺序
*对于任何*包含多个外部CSS链接的HTML文件，内联后的style标签应该保持与原始link标签相同的顺序，且CSS中的图片路径应该被替换。
**验证需求：4.1, 4.2, 4.5, 4.6**

### 属性 7: JavaScript内联保持顺序
*对于任何*包含多个外部JavaScript引用的HTML文件，内联后的script标签应该保持与原始script标签相同的顺序。
**验证需求：4.3, 4.4, 4.6**

### 属性 8: HTML拆分字符限制
*对于任何*字符数超过限制的HTML文件，拆分后的每个HTML文件的字符数都应该不超过配置的字符限制（默认60000）。
**验证需求：5.1, 5.2, 5.4**

### 属性 9: HTML拆分有效性
*对于任何*拆分后的HTML文件，每个文件都应该是有效的HTML（不破坏标签结构），包含完整的HTML结构（DOCTYPE、html、head、body标签）和必要的CSS样式，且有序号标识。
**验证需求：5.3, 5.5, 5.6, 5.8**

### 属性 10: 部署文档完整性
*对于任何*处理完成的项目，生成的部署文档应该包含所有HTML文件的列表、每个文件的字符数、完整的URL映射表，且文档是有效的Markdown格式。
**验证需求：6.2, 6.3, 6.4, 6.6**

### 属性 11: 错误记录完整性
*对于任何*处理过程中发生的错误（文件读取失败、图片上传失败等），系统都应该记录详细的错误信息（包括文件路径、错误类型、错误原因）。
**验证需求：7.1, 7.2, 7.3**

### 属性 12: 统计信息准确性
*对于任何*完成的处理流程，输出的统计信息（处理的文件数、上传的图片数、生成的代码段数）应该与实际处理的数量一致。
**验证需求：7.5**

### 属性 13: 配置默认值回退
*对于任何*缺失的配置项，系统应该使用预定义的默认值，并记录警告信息。
**验证需求：8.7**

## 错误处理

### 错误类型

1. **文件系统错误**
   - 源目录不存在
   - HTML文件读取失败
   - CSS/JS文件读取失败
   - 输出目录创建失败
   - 文件写入失败

2. **网络错误**
   - 图床服务不可达
   - API认证失败
   - 上传超时
   - 网络连接中断

3. **数据错误**
   - HTML解析失败
   - CSS解析失败
   - 图片文件损坏
   - 配置文件格式错误

4. **业务逻辑错误**
   - 图片文件过大（超过图床限制）
   - 字符限制设置过小（无法拆分）
   - 没有找到任何HTML文件

### 错误处理策略

**关键错误（终止流程）**：
- 源目录不存在
- 配置文件格式严重错误
- 输出目录无法创建
- 所有图片上传失败

**非关键错误（记录并继续）**：
- 单个图片上传失败
- 单个CSS/JS文件读取失败
- HTML解析警告

**错误恢复机制**：
- 图片上传失败：重试3次，仍失败则跳过
- 网络超时：指数退避重试
- 文件读取失败：记录错误，继续处理其他文件

### 日志级别

- **ERROR**：关键错误，导致流程终止
- **WARNING**：非关键错误，已跳过或使用默认值
- **INFO**：正常流程信息，进度更新
- **DEBUG**：详细的调试信息

## 测试策略

### 单元测试

针对每个组件编写单元测试，验证特定功能：

1. **ConfigManager测试**
   - 测试配置文件加载
   - 测试默认配置
   - 测试配置验证

2. **ResourceScanner测试**
   - 测试img标签提取
   - 测试CSS background-image提取
   - 测试内联样式提取
   - 测试路径解析

3. **ImageUploader测试**
   - 测试不同图床服务的上传
   - 测试重试机制
   - 测试错误处理
   - 使用mock避免实际网络请求

4. **PathReplacer测试**
   - 测试img src替换
   - 测试CSS url()替换
   - 测试相对路径解析
   - 测试HTML结构保持

5. **ResourceInliner测试**
   - 测试CSS内联
   - 测试JS内联
   - 测试顺序保持
   - 测试CSS中的路径替换

6. **HTMLSplitter测试**
   - 测试字符计数
   - 测试拆分逻辑
   - 测试HTML完整性
   - 测试边界情况（刚好60000字符）

7. **DeploymentGenerator测试**
   - 测试文档生成
   - 测试Markdown格式
   - 测试内容完整性

### 属性测试

使用属性测试库（如Hypothesis for Python）验证通用属性：

**配置要求**：
- 每个属性测试运行最少100次迭代
- 每个测试必须引用设计文档中的属性
- 标签格式：**Feature: html-splitter-image-uploader, Property {number}: {property_text}**

**属性测试用例**：

1. **属性1测试：图片扫描完整性**
   - 生成随机HTML（包含各种图片引用）
   - 验证所有图片都被扫描到
   - **Feature: html-splitter-image-uploader, Property 1: 图片扫描完整性**

2. **属性3测试：上传映射完整性**
   - 生成随机图片清单
   - 模拟上传过程
   - 验证映射表包含所有成功上传的图片
   - **Feature: html-splitter-image-uploader, Property 3: 上传映射完整性**

3. **属性5测试：路径替换完整性**
   - 生成随机HTML和URL映射表
   - 执行路径替换
   - 验证所有路径都被替换且HTML结构不变
   - **Feature: html-splitter-image-uploader, Property 5: 路径替换完整性**

4. **属性6测试：CSS内联保持顺序**
   - 生成包含多个CSS链接的HTML
   - 执行内联
   - 验证顺序保持不变
   - **Feature: html-splitter-image-uploader, Property 6: CSS内联保持顺序**

5. **属性7测试：JavaScript内联保持顺序**
   - 生成包含多个JS引用的HTML
   - 执行内联
   - 验证顺序保持不变
   - **Feature: html-splitter-image-uploader, Property 7: JavaScript内联保持顺序**

6. **属性8测试：HTML拆分字符限制**
   - 生成随机长度的HTML
   - 执行拆分
   - 验证每个文件都不超过字符限制
   - **Feature: html-splitter-image-uploader, Property 8: HTML拆分字符限制**

7. **属性9测试：HTML拆分有效性**
   - 生成随机HTML
   - 执行拆分
   - 验证每个文件都是有效的HTML
   - **Feature: html-splitter-image-uploader, Property 9: HTML拆分有效性**

8. **属性10测试：部署文档完整性**
   - 生成随机处理结果
   - 生成部署文档
   - 验证文档包含所有必要信息
   - **Feature: html-splitter-image-uploader, Property 10: 部署文档完整性**

9. **属性12测试：统计信息准确性**
   - 生成随机处理流程
   - 收集统计信息
   - 验证统计数字与实际一致
   - **Feature: html-splitter-image-uploader, Property 12: 统计信息准确性**

### 集成测试

测试完整的端到端流程：

1. **完整流程测试**
   - 准备测试项目（包含HTML、CSS、JS、图片）
   - 执行完整处理流程
   - 验证输出文件的正确性
   - 验证部署文档的完整性

2. **大型项目测试**
   - 使用真实的大型HTML项目
   - 验证性能和内存使用
   - 验证拆分结果的正确性

3. **错误场景测试**
   - 测试网络错误恢复
   - 测试文件系统错误处理
   - 测试部分失败场景

### 测试数据生成

**HTML生成器**：
- 生成包含各种图片引用的HTML
- 生成不同长度的HTML（测试拆分）
- 生成包含特殊字符的HTML

**图片生成器**：
- 生成不同格式的测试图片
- 生成不同大小的图片
- 生成损坏的图片（测试错误处理）

**配置生成器**：
- 生成有效的配置
- 生成缺失配置项的配置
- 生成无效的配置

### 测试覆盖率目标

- 代码覆盖率：>90%
- 分支覆盖率：>85%
- 属性测试：覆盖所有13个属性
- 单元测试：覆盖所有公共接口

## 实现注意事项

1. **性能优化**
   - 使用线程池并发上传图片
   - 缓存已解析的HTML DOM
   - 避免重复读取文件

2. **内存管理**
   - 流式处理大文件
   - 及时释放不需要的对象
   - 限制并发上传数量

3. **安全性**
   - 验证文件路径，防止路径遍历攻击
   - 验证图片文件类型
   - 安全存储API密钥

4. **可扩展性**
   - 使用策略模式支持不同图床服务
   - 使用插件机制支持自定义处理器
   - 配置驱动的行为

5. **用户体验**
   - 提供清晰的进度提示
   - 提供详细的错误信息
   - 生成易读的部署文档
