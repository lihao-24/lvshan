/**
 * Language Manager
 * Handles bilingual content switching (Chinese/English)
 */

class LanguageManager {
  constructor() {
    this.currentLang = localStorage.getItem('language') || 'en'; // 默认英文
    this.content = {};
    this.init();
  }
  
  async init() {
    await this.loadContent();
    this.updatePageContent();
    this.setupEventListeners();
  }
  
  async loadContent() {
    try {
      const response = await fetch('data/content.json?v=' + Date.now());
      this.content = await response.json();
      // Expose content to global scope for other modules
      window.contentData = this.content;
    } catch (error) {
      console.error('Failed to load content:', error);
      // Fallback to default content if loading fails
      this.content = this.getDefaultContent();
      window.contentData = this.content;
    }
  }
  
  setupEventListeners() {
    const toggleBtn = document.getElementById('languageToggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        this.switchLanguage(this.currentLang === 'zh' ? 'en' : 'zh');
      });
    }
    
    // Update toggle button state
    this.updateToggleButton();
  }
  
  switchLanguage(lang) {
    this.currentLang = lang;
    localStorage.setItem('language', lang);
    this.updatePageContent();
    this.updateToggleButton();
    
    // Update HTML lang attribute
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  }
  
  updateToggleButton() {
    const zhSpan = document.querySelector('.lang-zh');
    const enSpan = document.querySelector('.lang-en');
    
    if (zhSpan && enSpan) {
      if (this.currentLang === 'zh') {
        zhSpan.classList.add('active');
        enSpan.classList.remove('active');
      } else {
        zhSpan.classList.remove('active');
        enSpan.classList.add('active');
      }
    }
  }
  
  updatePageContent() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.getTranslation(key);
      
      if (translation) {
        // Handle HTML content (for elements with <br> tags)
        if (element.hasAttribute('data-i18n-html') || translation.includes('<br>')) {
          element.innerHTML = translation;
        } else {
          element.textContent = translation;
        }
      }
    });
    
    // Update ARIA labels
    document.querySelectorAll('[data-i18n-aria]').forEach(element => {
      const key = element.getAttribute('data-i18n-aria');
      const translation = this.getTranslation(key);
      
      if (translation) {
        element.setAttribute('aria-label', translation);
      }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      const translation = this.getTranslation(key);
      
      if (translation) {
        element.setAttribute('placeholder', translation);
      }
    });
    
    // Update toggle scenario buttons (reset to "View Scenarios" state)
    document.querySelectorAll('.toggle-scenarios').forEach(button => {
      const scenarios = button.closest('.product-card')?.querySelector('.scenarios');
      if (scenarios && scenarios.classList.contains('hidden')) {
        const key = button.getAttribute('data-i18n');
        const translation = this.getTranslation(key);
        if (translation) {
          button.textContent = translation;
        }
      } else if (scenarios && !scenarios.classList.contains('hidden')) {
        const key = button.getAttribute('data-i18n-hide');
        const translation = this.getTranslation(key);
        if (translation) {
          button.textContent = translation;
        }
      }
    });
  }
  
  getTranslation(key) {
    const keys = key.split('.');
    let value = this.content[this.currentLang];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return value || key;
  }
  
  getDefaultContent() {
    // Fallback content if JSON fails to load
    return {
      zh: {
        nav: {
          brand: '品牌故事',
          value: '产品价值',
          materials: '原料详情',
          products: '产品系列',
          contact: '联系方式'
        }
      },
      en: {
        nav: {
          brand: 'Brand Story',
          value: 'Product Value',
          materials: 'Materials',
          products: 'Products',
          contact: 'Contact'
        }
      }
    };
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.languageManager = new LanguageManager();
  });
} else {
  window.languageManager = new LanguageManager();
}
