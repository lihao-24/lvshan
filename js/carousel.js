/**
 * Brand Carousel
 * Handles the brand story carousel with auto-play and manual controls
 */

class BrandCarousel {
  constructor() {
    this.carousel = document.querySelector('.carousel');
    this.slides = document.querySelectorAll('.carousel-slide');
    this.indicators = document.querySelectorAll('.carousel-indicators .dot');
    this.prevBtn = document.querySelector('.carousel-btn.prev');
    this.nextBtn = document.querySelector('.carousel-btn.next');
    this.currentSlide = 0;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 5000; // 5 seconds
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.minSwipeDistance = 50;
    
    this.init();
  }
  
  init() {
    if (!this.carousel || this.slides.length === 0) return;
    
    // Auto-play
    this.startAutoPlay();
    
    // Previous button
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.prevSlide();
        this.resetAutoPlay();
      });
    }
    
    // Next button
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.nextSlide();
        this.resetAutoPlay();
      });
    }
    
    // Indicators
    this.indicators.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.goToSlide(index);
        this.resetAutoPlay();
      });
    });
    
    // Touch events
    this.carousel.addEventListener('touchstart', (e) => {
      this.touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    this.carousel.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].clientX;
      this.handleSwipe();
    }, { passive: true });
    
    // Pause auto-play when user hovers (desktop only)
    if (window.matchMedia('(hover: hover)').matches) {
      this.carousel.addEventListener('mouseenter', () => {
        this.pauseAutoPlay();
      });
      
      this.carousel.addEventListener('mouseleave', () => {
        this.startAutoPlay();
      });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      // Only handle if we're on the brand story section
      if (window.fullPageScroll && window.fullPageScroll.getCurrentSection() === 0) {
        if (e.key === 'ArrowLeft') {
          e.stopPropagation();
          this.prevSlide();
          this.resetAutoPlay();
        } else if (e.key === 'ArrowRight') {
          e.stopPropagation();
          this.nextSlide();
          this.resetAutoPlay();
        }
      }
    });
    
    // Pause auto-play when page is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseAutoPlay();
      } else {
        this.startAutoPlay();
      }
    });
  }
  
  startAutoPlay() {
    this.pauseAutoPlay(); // Clear any existing interval
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayDelay);
  }
  
  pauseAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
  
  resetAutoPlay() {
    this.pauseAutoPlay();
    this.startAutoPlay();
  }
  
  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.updateSlides();
  }
  
  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.updateSlides();
  }
  
  goToSlide(index) {
    if (index >= 0 && index < this.slides.length) {
      this.currentSlide = index;
      this.updateSlides();
    }
  }
  
  updateSlides() {
    // Update slides
    this.slides.forEach((slide, index) => {
      if (index === this.currentSlide) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
    
    // Update indicators
    this.indicators.forEach((dot, index) => {
      if (index === this.currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  
  handleSwipe() {
    const swipeDistance = this.touchStartX - this.touchEndX;
    
    if (Math.abs(swipeDistance) > this.minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swipe left - next slide
        this.nextSlide();
      } else {
        // Swipe right - previous slide
        this.prevSlide();
      }
      this.resetAutoPlay();
    }
  }
  
  // Public method to stop carousel
  stop() {
    this.pauseAutoPlay();
  }
  
  // Public method to start carousel
  start() {
    this.startAutoPlay();
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.brandCarousel = new BrandCarousel();
  });
} else {
  window.brandCarousel = new BrandCarousel();
}
