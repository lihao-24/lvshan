/**
 * 图片保护系统配置示例
 * Image Protection Configuration Examples
 * 
 * 复制此文件并根据需求修改配置
 */

// ============================================
// 示例1：默认配置（推荐用于大多数场景）
// ============================================
window.addEventListener('load', () => {
  new ImageProtection({
    watermarkText: '闾山文化 Lvshan Tradition',
    watermarkPosition: 'diagonal',
    watermarkFontSize: 24,
    watermarkColor: 'rgba(255, 255, 255, 0.5)',
    visibleWatermarkOpacity: 0.15,
    disableRightClick: true,
    disableDragDrop: true,
    showVisibleWatermark: true,
    disableKeyboardShortcuts: true,
    protectedImagesSelector: 'img[data-src*="products"], img[data-src*="materials"], img[data-src*="backgrounds"]'
  });
});

// ============================================
// 示例2：强保护模式（适合高价值产品图）
// ============================================
/*
window.addEventListener('load', () => {
  new ImageProtection({
    watermarkText: '闾山文化 © 2026 版权所有',
    watermarkPosition: 'diagonal',
    watermarkFontSize: 32,
    watermarkColor: 'rgba(255, 255, 255, 0.7)',
    visibleWatermarkOpacity: 0.25,
    disableRightClick: true,
    disableDragDrop: true,
    showVisibleWatermark: true,
    disableKeyboardShortcuts: true,
    protectedImagesSelector: '.product-main-image, .product-detail-image'
  });
});
*/

// ============================================
// 示例3：轻保护模式（平衡保护与用户体验）
// ============================================
/*
window.addEventListener('load', () => {
  new ImageProtection({
    watermarkText: '闾山文化',
    watermarkPosition: 'bottom-right',
    watermarkFontSize: 20,
    watermarkColor: 'rgba(255, 255, 255, 0.4)',
    visibleWatermarkOpacity: 0.1,
    disableRightClick: true,
    disableDragDrop: true,
    showVisibleWatermark: true,
    disableKeyboardShortcuts: false, // 不限制键盘操作
    protectedImagesSelector: 'img[data-src*="products"]'
  });
});
*/

// ============================================
// 示例4：分层保护（不同图片不同策略）
// ============================================
/*
window.addEventListener('load', () => {
  // 产品主图 - 强保护
  new ImageProtection({
    watermarkText: '闾山文化 Lvshan',
    watermarkPosition: 'diagonal',
    visibleWatermarkOpacity: 0.2,
    protectedImagesSelector: '.product-card img, .product-main-image'
  });
  
  // 背景图 - 轻保护
  new ImageProtection({
    watermarkText: 'Lvshan',
    watermarkPosition: 'bottom-right',
    visibleWatermarkOpacity: 0.08,
    disableKeyboardShortcuts: false,
    protectedImagesSelector: '.slide-bg, .background-image'
  });
});
*/

// ============================================
// 示例5：仅下载时添加水印（不显示可见水印）
// ============================================
/*
window.addEventListener('load', () => {
  new ImageProtection({
    watermarkText: '闾山文化 Lvshan Tradition',
    watermarkPosition: 'diagonal',
    showVisibleWatermark: false, // 不显示可见水印
    disableRightClick: true,
    disableDragDrop: true,
    protectedImagesSelector: 'img[data-src*="products"]'
  });
});
*/

// ============================================
// 示例6：自定义水印样式
// ============================================
/*
window.addEventListener('load', () => {
  new ImageProtection({
    watermarkText: '闾山文化\nLvshan Tradition\n© 2026',
    watermarkPosition: 'center',
    watermarkFontSize: 28,
    watermarkColor: 'rgba(200, 150, 100, 0.6)', // 金色水印
    visibleWatermarkOpacity: 0.18,
    protectedImagesSelector: 'img'
  });
});
*/

// ============================================
// 示例7：多语言水印
// ============================================
/*
window.addEventListener('load', () => {
  // 根据当前语言设置水印
  const currentLang = document.documentElement.lang || 'zh-CN';
  const watermarkText = currentLang === 'en' 
    ? 'Lvshan Tradition © 2026' 
    : '闾山文化 © 2026';
  
  new ImageProtection({
    watermarkText: watermarkText,
    watermarkPosition: 'diagonal',
    visibleWatermarkOpacity: 0.15,
    protectedImagesSelector: 'img[data-src*="products"]'
  });
});
*/

// ============================================
// 示例8：动态配置（根据设备类型）
// ============================================
/*
window.addEventListener('load', () => {
  const isMobile = window.innerWidth < 768;
  
  new ImageProtection({
    watermarkText: '闾山文化',
    watermarkPosition: isMobile ? 'center' : 'diagonal',
    watermarkFontSize: isMobile ? 18 : 24,
    visibleWatermarkOpacity: isMobile ? 0.12 : 0.15,
    disableKeyboardShortcuts: !isMobile, // 移动端不限制
    protectedImagesSelector: 'img[data-src*="products"]'
  });
});
*/

// ============================================
// 配置参数说明
// ============================================
/*
{
  // 水印文字（必填）
  watermarkText: '您的品牌名称',
  
  // 水印位置（可选）
  // 可选值: 'center', 'diagonal', 'bottom-right', 'bottom-left', 'top-right', 'top-left'
  watermarkPosition: 'diagonal',
  
  // 水印字体大小（可选，默认24）
  watermarkFontSize: 24,
  
  // 水印颜色（可选，RGBA格式）
  watermarkColor: 'rgba(255, 255, 255, 0.5)',
  
  // 可见水印透明度（可选，0-1之间，默认0.15）
  visibleWatermarkOpacity: 0.15,
  
  // 是否禁用右键菜单（可选，默认true）
  disableRightClick: true,
  
  // 是否禁用拖拽（可选，默认true）
  disableDragDrop: true,
  
  // 是否显示可见水印（可选，默认true）
  showVisibleWatermark: true,
  
  // 是否禁用键盘快捷键（可选，默认true）
  disableKeyboardShortcuts: true,
  
  // 需要保护的图片选择器（可选）
  protectedImagesSelector: 'img[data-src*="products"]'
}
*/

// ============================================
// 使用建议
// ============================================
/*
1. 产品主图：使用 diagonal 位置 + 0.15-0.25 透明度
2. 场景图：使用 bottom-right 位置 + 0.1-0.15 透明度
3. 背景图：使用 bottom-right 位置 + 0.08-0.12 透明度
4. 详情图：使用 center 位置 + 0.12-0.18 透明度

透明度建议：
- 0.08-0.12: 几乎不可见，轻度保护
- 0.12-0.18: 可见但不影响观看，推荐
- 0.18-0.25: 明显可见，强保护
- 0.25+: 非常明显，可能影响用户体验
*/
