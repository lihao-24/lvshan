/**
 * Image Protection System
 * 图片防盗用保护系统
 * 
 * 功能：
 * 1. 禁用右键菜单
 * 2. 禁用拖拽保存
 * 3. 下载时自动添加水印
 * 4. 显示水印覆盖层
 * 5. 防止开发者工具直接下载
 */

class ImageProtection {
  constructor(options = {}) {
    this.options = {
      // 水印文字
      watermarkText: options.watermarkText || '闾山文化 Lvshan Tradition',
      // 水印字体大小
      watermarkFontSize: options.watermarkFontSize || 24,
      // 水印颜色
      watermarkColor: options.watermarkColor || 'rgba(255, 255, 255, 0.5)',
      // 水印位置 ('center', 'bottom-right', 'bottom-left', 'top-right', 'top-left', 'diagonal')
      watermarkPosition: options.watermarkPosition || 'diagonal',
      // 是否启用右键保护
      disableRightClick: options.disableRightClick !== false,
      // 是否启用拖拽保护
      disableDragDrop: options.disableDragDrop !== false,
      // 是否显示可见水印覆盖层
      showVisibleWatermark: options.showVisibleWatermark !== false,
      // 可见水印的透明度
      visibleWatermarkOpacity: options.visibleWatermarkOpacity || 0.15,
      // 需要保护的图片选择器
      protectedImagesSelector: options.protectedImagesSelector || 'img[data-src*="products"], img[data-src*="materials"], img[data-src*="backgrounds"]',
      // 是否启用键盘快捷键保护
      disableKeyboardShortcuts: options.disableKeyboardShortcuts !== false
    };
    
    this.init();
  }
  
  init() {
    // 等待DOM加载完成
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupProtection());
    } else {
      this.setupProtection();
    }
  }
  
  setupProtection() {
    // 1. 禁用右键菜单
    if (this.options.disableRightClick) {
      this.disableContextMenu();
    }
    
    // 2. 禁用拖拽保存
    if (this.options.disableDragDrop) {
      this.disableDragAndDrop();
    }
    
    // 3. 添加可见水印覆盖层
    if (this.options.showVisibleWatermark) {
      this.addVisibleWatermarks();
    }
    
    // 4. 拦截图片下载并添加水印
    // this.interceptImageDownload(); // 已禁用下载按钮
    
    // 5. 禁用键盘快捷键
    if (this.options.disableKeyboardShortcuts) {
      this.disableKeyboardShortcuts();
    }
    
    // 6. 监听新添加的图片
    this.observeNewImages();
    
    console.log('图片保护系统已启用');
  }
  
  // 禁用右键菜单
  disableContextMenu() {
    // 对所有图片禁用右键
    document.addEventListener('contextmenu', (e) => {
      if (e.target.tagName === 'IMG') {
        e.preventDefault();
        this.showProtectionMessage();
        return false;
      }
    });
  }
  
  // 禁用拖拽保存
  disableDragAndDrop() {
    document.addEventListener('dragstart', (e) => {
      if (e.target.tagName === 'IMG') {
        e.preventDefault();
        return false;
      }
    });
    
    // 禁用图片的拖拽属性
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.setAttribute('draggable', 'false');
      img.style.userSelect = 'none';
      img.style.webkitUserSelect = 'none';
      img.style.mozUserSelect = 'none';
      img.style.msUserSelect = 'none';
    });
  }
  
  // 禁用键盘快捷键（Ctrl+S, Ctrl+Shift+S等）
  disableKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // 禁用 Ctrl+S (保存)
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        this.showProtectionMessage();
        return false;
      }
      
      // 禁用 F12 和 Ctrl+Shift+I (开发者工具)
      if (e.key === 'F12' || 
          ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I')) {
        e.preventDefault();
        return false;
      }
      
      // 禁用 Ctrl+U (查看源代码)
      if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
        e.preventDefault();
        return false;
      }
    });
  }
  
  // 添加可见水印覆盖层
  addVisibleWatermarks() {
    const protectedImages = document.querySelectorAll(this.options.protectedImagesSelector);
    
    protectedImages.forEach(img => {
      // 如果已经有水印容器，跳过
      if (img.parentElement.classList.contains('watermarked-image-container')) {
        return;
      }
      
      // 创建水印容器
      const container = document.createElement('div');
      container.className = 'watermarked-image-container';
      container.style.position = 'relative';
      container.style.display = 'inline-block';
      
      // 将图片包裹在容器中
      img.parentNode.insertBefore(container, img);
      container.appendChild(img);
      
      // 创建水印覆盖层
      const watermark = document.createElement('div');
      watermark.className = 'image-watermark-overlay';
      watermark.textContent = this.options.watermarkText;
      watermark.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        user-select: none;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${this.options.watermarkFontSize}px;
        color: ${this.options.watermarkColor};
        font-weight: bold;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        opacity: ${this.options.visibleWatermarkOpacity};
        z-index: 10;
      `;
      
      // 根据位置调整水印
      if (this.options.watermarkPosition === 'diagonal') {
        watermark.style.transform = 'rotate(-45deg)';
        watermark.style.fontSize = `${this.options.watermarkFontSize * 1.5}px`;
      } else if (this.options.watermarkPosition === 'bottom-right') {
        watermark.style.justifyContent = 'flex-end';
        watermark.style.alignItems = 'flex-end';
        watermark.style.padding = '20px';
      } else if (this.options.watermarkPosition === 'bottom-left') {
        watermark.style.justifyContent = 'flex-start';
        watermark.style.alignItems = 'flex-end';
        watermark.style.padding = '20px';
      } else if (this.options.watermarkPosition === 'top-right') {
        watermark.style.justifyContent = 'flex-end';
        watermark.style.alignItems = 'flex-start';
        watermark.style.padding = '20px';
      } else if (this.options.watermarkPosition === 'top-left') {
        watermark.style.justifyContent = 'flex-start';
        watermark.style.alignItems = 'flex-start';
        watermark.style.padding = '20px';
      }
      
      container.appendChild(watermark);
    });
  }
  
  // 拦截图片下载并添加水印
  interceptImageDownload() {
    // 监听所有图片的点击事件
    document.addEventListener('click', (e) => {
      if (e.target.tagName === 'IMG' && e.ctrlKey) {
        e.preventDefault();
        this.downloadImageWithWatermark(e.target);
      }
    });
    
    // 创建自定义下载按钮（已禁用）
    // this.createDownloadButtons();
  }
  
  // 创建带水印的图片并下载
  async downloadImageWithWatermark(imgElement) {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // 创建临时图片对象
      const img = new Image();
      img.crossOrigin = 'anonymous'; // 处理跨域问题
      
      // 获取图片源
      const imgSrc = imgElement.src || imgElement.getAttribute('data-src');
      
      img.onload = () => {
        // 设置canvas尺寸
        canvas.width = img.width;
        canvas.height = img.height;
        
        // 绘制原图
        ctx.drawImage(img, 0, 0);
        
        // 添加水印
        this.drawWatermark(ctx, canvas.width, canvas.height);
        
        // 转换为blob并下载
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `lvshan-${Date.now()}.jpg`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 'image/jpeg', 0.95);
      };
      
      img.onerror = () => {
        console.error('图片加载失败，无法添加水印');
        this.showProtectionMessage('图片加载失败');
      };
      
      img.src = imgSrc;
    } catch (error) {
      console.error('添加水印失败:', error);
      this.showProtectionMessage('操作失败');
    }
  }
  
  // 在canvas上绘制水印
  drawWatermark(ctx, width, height) {
    // 保存当前状态
    ctx.save();
    
    // 设置水印样式
    const fontSize = Math.max(width, height) / 20;
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.lineWidth = 2;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // 添加阴影
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    
    if (this.options.watermarkPosition === 'diagonal') {
      // 对角线重复水印
      ctx.translate(width / 2, height / 2);
      ctx.rotate(-Math.PI / 6); // -30度
      
      const text = this.options.watermarkText;
      const spacing = fontSize * 4;
      
      for (let y = -height; y < height; y += spacing) {
        for (let x = -width; x < width; x += spacing * 2) {
          ctx.strokeText(text, x, y);
          ctx.fillText(text, x, y);
        }
      }
    } else {
      // 单个水印
      let x = width / 2;
      let y = height / 2;
      
      if (this.options.watermarkPosition === 'bottom-right') {
        x = width - fontSize * 3;
        y = height - fontSize;
      } else if (this.options.watermarkPosition === 'bottom-left') {
        x = fontSize * 3;
        y = height - fontSize;
      } else if (this.options.watermarkPosition === 'top-right') {
        x = width - fontSize * 3;
        y = fontSize * 2;
      } else if (this.options.watermarkPosition === 'top-left') {
        x = fontSize * 3;
        y = fontSize * 2;
      }
      
      ctx.strokeText(this.options.watermarkText, x, y);
      ctx.fillText(this.options.watermarkText, x, y);
      
      // 添加网址
      const urlFontSize = fontSize * 0.5;
      ctx.font = `${urlFontSize}px Arial, sans-serif`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.fillText('www.lvshan-candle.com', x, y + fontSize);
    }
    
    // 恢复状态
    ctx.restore();
  }
  
  // 创建下载按钮（可选功能）
  createDownloadButtons() {
    const protectedImages = document.querySelectorAll(this.options.protectedImagesSelector);
    
    protectedImages.forEach(img => {
      const container = img.closest('.watermarked-image-container') || img.parentElement;
      
      // 检查是否已有下载按钮
      if (container.querySelector('.download-with-watermark-btn')) {
        return;
      }
      
      const downloadBtn = document.createElement('button');
      downloadBtn.className = 'download-with-watermark-btn';
      downloadBtn.innerHTML = '📥 下载图片';
      downloadBtn.style.cssText = `
        position: absolute;
        bottom: 10px;
        right: 10px;
        padding: 8px 16px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        z-index: 20;
        opacity: 0;
        transition: opacity 0.3s;
      `;
      
      // 鼠标悬停时显示按钮
      container.addEventListener('mouseenter', () => {
        downloadBtn.style.opacity = '1';
      });
      
      container.addEventListener('mouseleave', () => {
        downloadBtn.style.opacity = '0';
      });
      
      downloadBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.downloadImageWithWatermark(img);
      });
      
      if (container.style.position !== 'relative' && container.style.position !== 'absolute') {
        container.style.position = 'relative';
      }
      
      container.appendChild(downloadBtn);
    });
  }
  
  // 监听新添加的图片
  observeNewImages() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.tagName === 'IMG') {
            if (this.options.disableDragDrop) {
              node.setAttribute('draggable', 'false');
              node.style.userSelect = 'none';
            }
          }
        });
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  // 显示保护提示消息
  showProtectionMessage(message = 'Image is protected by copyright') {
    // 检查是否已有提示
    if (document.querySelector('.protection-message')) {
      return;
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'protection-message';
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 20px 40px;
      border-radius: 8px;
      font-size: 16px;
      z-index: 10000;
      animation: fadeInOut 2s ease-in-out;
    `;
    
    // 添加动画
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
      messageDiv.remove();
    }, 2000);
  }
}

// 自动初始化（使用默认配置）
if (typeof window !== 'undefined') {
  window.ImageProtection = ImageProtection;
  
  // 页面加载完成后自动启用保护
  window.addEventListener('load', () => {
    window.imageProtection = new ImageProtection({
      watermarkText: '閭山國際諮詢與貿易有限公司',
      watermarkPosition: 'diagonal',
      showVisibleWatermark: true,
      visibleWatermarkOpacity: 0.15
    });
  });
}
