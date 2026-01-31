/**
 * Full Page Scroll
 * Implements Apple-style full-screen scrolling with snap effect
 */

class FullPageScroll {
  constructor() {
    this.sections = document.querySelectorAll('.section');
    this.currentSection = 0;
    this.isScrolling = false;
    this.touchStartY = 0;
    this.scrollThrottle = 1000; // ms between scrolls
    this.accumulatedScroll = 0; // Accumulated scroll at boundary
    this.scrollThreshold = 100; // Need to scroll 100px at boundary to switch
    this.init();
  }
  
  init() {
    if (this.sections.length === 0) return;
    
    // Mouse wheel event
    window.addEventListener('wheel', (e) => this.handleWheel(e), { passive: false });
    
    // Touch events for mobile
    window.addEventListener('touchstart', (e) => {
      this.touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    window.addEventListener('touchend', (e) => {
      // Check if we're in the products section
      const currentSectionElement = this.sections[this.currentSection];
      const isProductsSection = currentSectionElement && currentSectionElement.id === 'products';
      
      if (isProductsSection) {
        // Let the products section handle its own scrolling
        return;
      }
      
      const touchEndY = e.changedTouches[0].clientY;
      const diff = this.touchStartY - touchEndY;
      
      // Minimum swipe distance: 50px
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          this.scrollToNext();
        } else {
          this.scrollToPrev();
        }
      }
    }, { passive: true });
    
    // Keyboard events
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        this.scrollToNext();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        this.scrollToPrev();
      } else if (e.key === 'Home') {
        e.preventDefault();
        this.scrollToSection(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        this.scrollToSection(this.sections.length - 1);
      }
    });
    
    // Navigation dots click
    this.setupNavigationDots();
    
    // Handle browser back/forward
    window.addEventListener('popstate', () => {
      this.handleHashChange();
    });
    
    // Initial hash check
    this.handleHashChange();
  }
  
  handleWheel(e) {
    // Check if we're in the products section
    const currentSectionElement = this.sections[this.currentSection];
    const isProductsSection = currentSectionElement && currentSectionElement.id === 'products';
    
    if (isProductsSection) {
      const container = currentSectionElement.querySelector('.container');
      if (container) {
        const scrollTop = container.scrollTop;
        const scrollBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
        const tolerance = 5; // Small tolerance for floating point precision
        
        const isAtTop = scrollTop <= tolerance;
        const isAtBottom = scrollBottom <= tolerance;
        
        if (e.deltaY > 0) {
          // Scrolling down
          if (!isAtBottom) {
            // Not at bottom yet, allow internal scroll and reset accumulator
            this.accumulatedScroll = 0;
            return;
          } else {
            // At bottom, accumulate scroll
            this.accumulatedScroll += Math.abs(e.deltaY);
            if (this.accumulatedScroll < this.scrollThreshold) {
              e.preventDefault();
              return; // Need more scroll to trigger page change
            }
            // Threshold reached, proceed to next page
            this.accumulatedScroll = 0;
          }
        } else {
          // Scrolling up
          if (!isAtTop) {
            // Not at top yet, allow internal scroll and reset accumulator
            this.accumulatedScroll = 0;
            return;
          } else {
            // At top, accumulate scroll
            this.accumulatedScroll += Math.abs(e.deltaY);
            if (this.accumulatedScroll < this.scrollThreshold) {
              e.preventDefault();
              return; // Need more scroll to trigger page change
            }
            // Threshold reached, proceed to previous page
            this.accumulatedScroll = 0;
          }
        }
      }
    }
    
    e.preventDefault();
    
    if (this.isScrolling) return;
    
    // Determine scroll direction
    if (e.deltaY > 0) {
      this.scrollToNext();
    } else {
      this.scrollToPrev();
    }
  }
  
  scrollToNext() {
    if (this.currentSection < this.sections.length - 1) {
      this.scrollToSection(this.currentSection + 1);
    }
  }
  
  scrollToPrev() {
    if (this.currentSection > 0) {
      this.scrollToSection(this.currentSection - 1);
    }
  }
  
  scrollToSection(index) {
    if (this.isScrolling || index < 0 || index >= this.sections.length) return;
    
    this.isScrolling = true;
    this.currentSection = index;
    
    const target = this.sections[index];
    const targetId = target.getAttribute('id');
    
    // Add scrolling class to body
    document.body.classList.add('scrolling');
    
    // Smooth scroll to target
    target.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
    
    // Update URL hash without triggering scroll
    if (targetId) {
      history.pushState(null, null, `#${targetId}`);
    }
    
    // Update navigation dots
    this.updateNavigationDots();
    
    // Reset scrolling flag after animation
    setTimeout(() => {
      this.isScrolling = false;
      document.body.classList.remove('scrolling');
    }, this.scrollThrottle);
  }
  
  setupNavigationDots() {
    const dots = document.querySelectorAll('.nav-dot');
    dots.forEach((dot, index) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        this.scrollToSection(index);
      });
    });
  }
  
  updateNavigationDots() {
    const dots = document.querySelectorAll('.nav-dot');
    dots.forEach((dot, index) => {
      if (index === this.currentSection) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  
  handleHashChange() {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    
    const targetSection = document.getElementById(hash);
    if (!targetSection) return;
    
    const index = Array.from(this.sections).indexOf(targetSection);
    if (index !== -1 && index !== this.currentSection) {
      // Instant scroll without animation for hash navigation
      this.currentSection = index;
      targetSection.scrollIntoView({ behavior: 'auto' });
      this.updateNavigationDots();
    }
  }
  
  // Public method to get current section
  getCurrentSection() {
    return this.currentSection;
  }
  
  // Public method to disable/enable scrolling
  setScrollingEnabled(enabled) {
    this.isScrolling = !enabled;
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.fullPageScroll = new FullPageScroll();
  });
} else {
  window.fullPageScroll = new FullPageScroll();
}
