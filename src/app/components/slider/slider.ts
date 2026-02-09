import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Asset } from '../../_core/domain';
import Lottie from 'lottie-web';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-slider',
  imports: [LottieComponent],
  templateUrl: './slider.html',
  styleUrl: './slider.scss',
})
export class Slider {
  @Input() assets: Asset[] = [];
  @Input() currentIndex = 0;


  options: AnimationOptions = {
    path: '/assets/projects/waha/waha.json',
  };
}

/*
  @ViewChild('sliderContainer') sliderContainer!: ElementRef;
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;

  private lottieAnimations: any[] = [];
  private videoObserver!: IntersectionObserver;

  ngAfterViewInit() {
    this.initializeSlider();
    this.setupIntersectionObserver();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentIndex']) {
      this.handleSlideChange();
    }
    if (changes['assets']) {
      this.destroyLottieAnimations();
      setTimeout(() => {
        this.initializeLottieAnimations();
      }, 100);
    }
  }

  private initializeSlider() {
    if (this.assets.length > 0) {
      this.initializeLottieAnimations();
      this.initializeVideos();
    }
  }

  private initializeLottieAnimations() {
    this.assets.forEach((asset, index) => {
      if (asset.type === 'json') {
        const container = this.sliderContainer.nativeElement.querySelector(`.lottie-container[data-index="${index}"]`);
        if (container) {
          const animation = Lottie.loadAnimation({
            container: container,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: {
              path: asset.src
            },
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid meet',
              //...asset.lottieOptions?.rendererSettings
            }
          });
          this.lottieAnimations[index] = animation;
        }
      }
    });
  }

  private initializeVideos() {
    this.assets.forEach((asset, index) => {
      if (asset.type === 'video') {
        const videoElement = this.sliderContainer.nativeElement.querySelector(`video[data-index="${index}"]`);
        if (videoElement) {
          videoElement.muted = true;
          videoElement.playsInline = true;
        }
      }
    });
  }

  private setupIntersectionObserver() {
    this.videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target as HTMLVideoElement;
        const index = parseInt(video.getAttribute('data-index') || '0');

        if (this.currentIndex === index) {
          video.play().catch(e => console.log('Video autoplay prevented:', e));
        } else {
          // Pause video when not in view
          video.pause();
        }
      });
    }, {
      threshold: 0.5
    });

    // Observe all video elements
    /*
    const videos = this.sliderContainer.nativeElement.querySelectorAll('video');
    videos.forEach(video => {
      this.videoObserver.observe(video);
    });
  
  }

  private handleSlideChange() {
    // Handle Lottie animations
    this.assets.forEach((asset, index) => {
      if (asset.type === 'json' && this.lottieAnimations[index]) {
        if (index === this.currentIndex) {
          if (true) {
            this.lottieAnimations[index].play();
          }
        } else {
          if (true) {
            this.lottieAnimations[index].stop();
          }
        }
      }

      // Handle videos
      if (asset.type === 'video') {
        const video = this.sliderContainer.nativeElement.querySelector(`video[data-index="${index}"]`);
        if (video) {
          if (index === this.currentIndex) {
            video.play()
            if (true) {
              //video.play().catch(e => console.log('Video play prevented:', e));
            }
          } else {
            video.pause();
            if (true) {
              video.currentTime = 0;
            }
          }
        }
      }
    });
  }

  private destroyLottieAnimations() {
    this.lottieAnimations.forEach(animation => {
      if (animation) {
        animation.destroy();
      }
    });
    this.lottieAnimations = [];
  }

  playPauseVideo(index: number) {
    const video = this.sliderContainer.nativeElement.querySelector(`video[data-index="${index}"]`);
    if (video) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  }

  toggleLottieAnimation(index: number) {
    if (this.lottieAnimations[index]) {
      if (this.lottieAnimations[index].isPaused) {
        this.lottieAnimations[index].play();
      } else {
        this.lottieAnimations[index].pause();
      }
    }
  }

  ngOnDestroy() {
    this.destroyLottieAnimations();
    if (this.videoObserver) {
      this.videoObserver.disconnect();
    }
  }

*/