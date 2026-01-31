# 需求文档

## 简介

本系统旨在解决HTML网站部署到有字符限制的平台时遇到的问题。目标平台每段代码限制60000字符，且不支持上传静态资源文件。系统需要自动处理图片上传、资源内联和HTML智能拆分，生成可直接部署的代码段。

## 术语表

- **System**: HTML部署自动化工具
- **Image_Uploader**: 图片上传模块，负责将本地图片上传到图床
- **HTML_Splitter**: HTML拆分模块，负责按字符限制拆分HTML
- **Resource_Inliner**: 资源内联模块，负责将CSS/JS内联到HTML
- **Deployment_Generator**: 部署文档生成器，生成部署说明和映射表
- **Image_Host**: 图床服务，用于存储图片并提供URL访问
- **Source_Project**: 源HTML网站项目目录
- **Target_Platform**: 目标部署平台，有60000字符限制

## 需求

### 需求 1: 扫描和识别静态资源

**用户故事：** 作为开发者，我希望系统能自动扫描项目中的所有图片资源，以便后续上传和替换。

#### 验收标准

1. WHEN 系统启动时，THE System SHALL 扫描Source_Project目录下的所有HTML文件
2. WHEN 扫描HTML文件时，THE System SHALL 识别所有图片引用（包括img标签的src属性、CSS中的background-image、内联样式中的图片引用）
3. WHEN 识别到图片路径时，THE System SHALL 记录图片的本地路径和在HTML中的引用位置
4. WHEN 扫描完成时，THE System SHALL 生成完整的图片资源清单
5. THE System SHALL 支持常见图片格式（jpg、jpeg、png、gif、svg、webp、ico）

### 需求 2: 上传图片到图床

**用户故事：** 作为开发者，我希望系统能自动将所有图片上传到图床，以便获取可访问的URL。

#### 验收标准

1. WHEN 图片资源清单生成后，THE Image_Uploader SHALL 依次上传每个图片到Image_Host
2. WHEN 上传图片时，THE Image_Uploader SHALL 保留原始文件名和扩展名
3. WHEN 上传成功时，THE Image_Uploader SHALL 记录图片的原始路径和对应的图床URL
4. IF 上传失败，THEN THE Image_Uploader SHALL 记录错误信息并继续处理下一个图片
5. WHEN 所有图片处理完成时，THE Image_Uploader SHALL 生成URL映射表（本地路径 -> 图床URL）
6. THE Image_Uploader SHALL 支持配置不同的图床服务（如SM.MS、ImgBB、Imgur等）

### 需求 3: 替换HTML中的图片路径

**用户故事：** 作为开发者，我希望系统能自动将HTML中的本地图片路径替换为图床URL，以便在目标平台正常显示。

#### 验收标准

1. WHEN URL映射表生成后，THE System SHALL 读取每个HTML文件的内容
2. WHEN 处理HTML内容时，THE System SHALL 将所有本地图片路径替换为对应的图床URL
3. WHEN 替换路径时，THE System SHALL 保持HTML结构和其他属性不变
4. WHEN 遇到相对路径时，THE System SHALL 正确解析并匹配到映射表中的绝对路径
5. WHEN 替换完成时，THE System SHALL 保存修改后的HTML文件到临时目录

### 需求 4: 内联外部CSS和JavaScript

**用户故事：** 作为开发者，我希望系统能将外部CSS和JS文件内联到HTML中，以便生成自包含的HTML代码段。

#### 验收标准

1. WHEN 处理HTML文件时，THE Resource_Inliner SHALL 识别所有外部CSS链接（link标签）
2. WHEN 识别到外部CSS时，THE Resource_Inliner SHALL 读取CSS文件内容并替换为style标签
3. WHEN 处理HTML文件时，THE Resource_Inliner SHALL 识别所有外部JavaScript引用（script标签的src属性）
4. WHEN 识别到外部JS时，THE Resource_Inliner SHALL 读取JS文件内容并替换为内联script标签
5. WHEN 内联CSS时，THE Resource_Inliner SHALL 同时处理CSS中的图片引用路径替换
6. THE Resource_Inliner SHALL 保持CSS和JS的执行顺序不变

### 需求 5: 智能拆分HTML代码

**用户故事：** 作为开发者，我希望系统能按60000字符限制智能拆分HTML，以便符合目标平台的要求。

#### 验收标准

1. WHEN HTML内联完成后，THE HTML_Splitter SHALL 计算HTML文件的总字符数
2. IF HTML字符数超过60000，THEN THE HTML_Splitter SHALL 将HTML拆分为多个完整的HTML文件
3. WHEN 拆分HTML时，THE HTML_Splitter SHALL 在合适的标签边界处拆分（不破坏标签结构）
4. WHEN 拆分HTML时，THE HTML_Splitter SHALL 确保每个HTML文件不超过60000字符
5. WHEN 拆分HTML时，THE HTML_Splitter SHALL 为每个代码段生成完整的HTML结构（包括<!DOCTYPE html>、html、head、body标签）
6. WHEN 拆分HTML时，THE HTML_Splitter SHALL 在每个代码段的head中包含必要的CSS样式（复制或提取相关样式）
7. WHEN 拆分HTML时，THE HTML_Splitter SHALL 确保每个HTML文件可以独立运行和显示
8. THE HTML_Splitter SHALL 为每个代码段生成序号标识（如page-1.html、page-2.html等）

### 需求 6: 生成部署文档

**用户故事：** 作为开发者，我希望系统能生成详细的部署文档，以便了解如何在目标平台上拼接代码段。

#### 验收标准

1. WHEN 所有处理完成后，THE Deployment_Generator SHALL 生成部署说明文档
2. WHEN 生成文档时，THE Deployment_Generator SHALL 列出所有代码段的文件名和顺序
3. WHEN 生成文档时，THE Deployment_Generator SHALL 说明每个代码段的字符数
4. WHEN 生成文档时，THE Deployment_Generator SHALL 包含完整的URL映射表（本地路径 -> 图床URL）
5. WHEN 生成文档时，THE Deployment_Generator SHALL 提供拼接说明和注意事项
6. THE Deployment_Generator SHALL 以Markdown格式输出文档

### 需求 7: 错误处理和日志记录

**用户故事：** 作为开发者，我希望系统能提供清晰的错误信息和处理日志，以便排查问题。

#### 验收标准

1. WHEN 处理过程中发生错误时，THE System SHALL 记录详细的错误信息（包括文件名、行号、错误类型）
2. WHEN 图片上传失败时，THE System SHALL 记录失败的图片路径和错误原因
3. WHEN 文件读取失败时，THE System SHALL 记录文件路径和错误信息
4. THE System SHALL 在控制台输出处理进度信息（如"正在上传图片 5/20"）
5. THE System SHALL 在处理完成后输出统计信息（处理的文件数、上传的图片数、生成的代码段数）
6. IF 关键步骤失败，THEN THE System SHALL 终止处理并提供清晰的错误提示

### 需求 8: 配置管理

**用户故事：** 作为开发者，我希望能通过配置文件自定义系统行为，以便适应不同的使用场景。

#### 验收标准

1. THE System SHALL 支持通过配置文件指定Source_Project路径
2. THE System SHALL 支持通过配置文件指定输出目录路径
3. THE System SHALL 支持通过配置文件指定字符限制数（默认60000）
4. THE System SHALL 支持通过配置文件选择图床服务类型
5. THE System SHALL 支持通过配置文件配置图床API密钥
6. WHEN 配置文件不存在时，THE System SHALL 使用默认配置并提示用户
7. WHEN 配置项缺失时，THE System SHALL 使用默认值并记录警告信息
