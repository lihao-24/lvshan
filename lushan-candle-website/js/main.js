/**
 * Main JavaScript
 * Handles lazy loading, product scenarios toggle, and other interactions
 */

// Lazy Loading for Images
class LazyLoader {
  constructor() {
    this.images = document.querySelectorAll('img[data-src]');
    this.init();
  }
  
  init() {
    if ('IntersectionObserver' in window) {
      const options = {
        root: null,
        rootMargin: '50px',
        threshold: 0.01
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, options);
      
      this.images.forEach(img => observer.observe(img));
    } else {
      // Fallback for older browsers
      this.images.forEach(img => this.loadImage(img));
    }
  }
  
  loadImage(img) {
    const src = img.getAttribute('data-src');
    if (!src) return;
    
    // Create a new image to preload
    const tempImg = new Image();
    tempImg.onload = () => {
      img.src = src;
      img.classList.add('loaded');
    };
    tempImg.onerror = () => {
      console.error(`Failed to load image: ${src}`);
      // Set a fallback placeholder
      img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23999" font-family="sans-serif" font-size="16"%3EImage not available%3C/text%3E%3C/svg%3E';
      img.classList.add('loaded');
    };
    tempImg.src = src;
  }
}

// Product Scenarios Toggle
class ProductScenariosToggle {
  constructor() {
    this.toggleButtons = document.querySelectorAll('.toggle-scenarios');
    this.init();
  }
  
  init() {
    // 初始化按钮文本（因为场景默认展开）
    this.initializeButtonText();
    
    this.toggleButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        if (!card) return;
        
        const scenarios = card.querySelector('.scenarios');
        if (!scenarios) return;
        
        const isHidden = scenarios.classList.contains('hidden');
        
        // Get current language
        const currentLang = document.documentElement.lang || 'zh-CN';
        const lang = currentLang === 'en' ? 'en' : 'zh';
        
        if (isHidden) {
          scenarios.classList.remove('hidden');
          // Get hide text from data attribute or content.json
          const hideKey = button.getAttribute('data-i18n-hide');
          if (hideKey && window.contentData && window.contentData[lang]) {
            const keys = hideKey.split('.');
            let text = window.contentData[lang];
            keys.forEach(key => {
              text = text[key];
            });
            button.textContent = text || '收起场景';
          } else {
            button.textContent = lang === 'en' ? 'Hide Scenarios' : '收起场景';
          }
        } else {
          scenarios.classList.add('hidden');
          // Get show text from data attribute or content.json
          const showKey = button.getAttribute('data-i18n');
          if (showKey && window.contentData && window.contentData[lang]) {
            const keys = showKey.split('.');
            let text = window.contentData[lang];
            keys.forEach(key => {
              text = text[key];
            });
            button.textContent = text || '查看使用场景';
          } else {
            button.textContent = lang === 'en' ? 'View Scenarios' : '查看使用场景';
          }
        }
      });
    });
  }
  
  initializeButtonText() {
    // 因为场景默认展开，按钮应该显示"收起场景"
    const currentLang = document.documentElement.lang || 'zh-CN';
    const lang = currentLang === 'en' ? 'en' : 'zh';
    
    this.toggleButtons.forEach(button => {
      const scenarios = button.closest('.product-card')?.querySelector('.scenarios');
      if (scenarios && !scenarios.classList.contains('hidden')) {
        const hideKey = button.getAttribute('data-i18n-hide');
        if (hideKey && window.contentData && window.contentData[lang]) {
          const keys = hideKey.split('.');
          let text = window.contentData[lang];
          keys.forEach(key => {
            text = text[key];
          });
          button.textContent = text || '收起场景';
        } else {
          button.textContent = lang === 'en' ? 'Hide Scenarios' : '收起场景';
        }
      }
    });
  }
}

// Smooth Scroll for Anchor Links
class SmoothScroll {
  constructor() {
    this.links = document.querySelectorAll('a[href^="#"]');
    this.init();
  }
  
  init() {
    this.links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (!target) return;
        
        e.preventDefault();
        
        // If using full page scroll, let it handle the navigation
        if (window.fullPageScroll) {
          const sections = document.querySelectorAll('.section');
          const index = Array.from(sections).indexOf(target);
          if (index !== -1) {
            window.fullPageScroll.scrollToSection(index);
          }
        } else {
          // Fallback to regular smooth scroll
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
}

// Performance Monitoring
class PerformanceMonitor {
  constructor() {
    this.init();
  }
  
  init() {
    if ('PerformanceObserver' in window) {
      // Monitor Largest Contentful Paint (LCP)
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.warn('LCP monitoring not supported');
      }
    }
    
    // Log page load time
    window.addEventListener('load', () => {
      if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log('Page load time:', loadTime, 'ms');
      }
    });
  }
}

// Accessibility Enhancements
class AccessibilityEnhancements {
  constructor() {
    this.init();
  }
  
  init() {
    // Add focus visible class for keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
      }
    });
    
    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-nav');
    });
    
    // Skip to main content link
    this.addSkipLink();
  }
  
  addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#brand-story';
    skipLink.className = 'skip-link';
    skipLink.textContent = '跳转到主内容';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 0;
      background: var(--primary-color);
      color: white;
      padding: 8px;
      text-decoration: none;
      z-index: 1000;
    `;
    
    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '0';
    });
    
    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
  }
}

// Initialize all modules when DOM is ready
function initializeApp() {
  // Lazy loading
  new LazyLoader();
  
  // Product scenarios toggle
  new ProductScenariosToggle();
  
  // Smooth scroll
  new SmoothScroll();
  
  // Performance monitoring (development only)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    new PerformanceMonitor();
  }
  
  // Accessibility enhancements
  new AccessibilityEnhancements();
  
  // Log initialization
  console.log('Lvshan Candle Website initialized');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Export for potential use in other scripts
window.LvshanApp = {
  LazyLoader,
  ProductScenariosToggle,
  SmoothScroll,
  PerformanceMonitor,
  AccessibilityEnhancements
};
