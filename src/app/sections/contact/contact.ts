import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { AssetLoaderService } from '../../_core/asset-loader.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements OnInit, AfterViewInit, OnDestroy {
  videoElements: HTMLVideoElement[] = [];

  // Video configurations
  videos = [
    {
      id: 'cv-video',
      src: 'assets/projects/cv/cv.webm',
      autoplay: true,
      loop: true,
      muted: true,
      playsInline: true
    },
    {
      id: 'demo-video',
      src: 'assets/projects/resvr/demo.webm',
      autoplay: true,
      loop: true,
      muted: true,
      playsInline: true
    },
    {
      id: 'soft-video',
      src: 'assets/projects/resvr/soft.webm',
      autoplay: true,
      loop: true,
      muted: true,
      playsInline: true
    }
  ];

  constructor(private assetLoader: AssetLoaderService) { }

  ngOnInit(): void {
    this.verifyCache();
  }

  ngAfterViewInit(): void {
    // Wait a bit for DOM to be ready
    setTimeout(() => {
      this.loadCachedVideos();
    }, 100);
  }

  ngOnDestroy(): void {
    // Clean up video elements
    this.videoElements.forEach(video => {
      video.pause();
      video.src = '';
      video.load();
    });
    this.videoElements = [];
  }

  private verifyCache(): void {
    console.log('=== Cache Verification ===');

    this.videos.forEach(videoConfig => {
      const isCached = this.assetLoader.isAssetCached(videoConfig.src);
      console.log(`${videoConfig.src} cached: ${isCached}`);

      if (isCached) {
        const cachedVideo = this.assetLoader.getCachedAsset(videoConfig.src) as HTMLVideoElement;
        console.log(`Cached video details:`, {
          src: cachedVideo?.src,
          readyState: cachedVideo?.readyState,
          videoWidth: cachedVideo?.videoWidth,
          videoHeight: cachedVideo?.videoHeight
        });
      }
    });

    // Get overall cache stats
    const cacheStats = this.assetLoader.getCacheStats();
    console.log('Cache stats:', cacheStats);
  }

  private loadCachedVideos(): void {
    console.log('Loading cached videos...');

    this.videos.forEach(videoConfig => {
      this.loadVideo(videoConfig);
    });
  }

  private loadVideo(config: any): void {
    const videoElement = document.getElementById(config.id) as HTMLVideoElement;

    if (!videoElement) {
      console.error(`Video element not found: ${config.id}`);
      return;
    }

    // Check if video is cached
    if (this.assetLoader.isAssetCached(config.src)) {
      console.log(`Using cached video: ${config.src}`);
      this.useCachedVideo(videoElement, config);
    } else {
      console.log(`Video not cached, loading normally: ${config.src}`);
      this.loadVideoNormally(videoElement, config);
    }

    this.videoElements.push(videoElement);
  }

  private useCachedVideo(videoElement: HTMLVideoElement, config: any): void {
    const cachedVideo = this.assetLoader.getCachedAsset(config.src) as HTMLVideoElement;

    if (!cachedVideo) {
      console.warn(`Cached video not found, falling back to normal load: ${config.src}`);
      this.loadVideoNormally(videoElement, config);
      return;
    }

    try {
      // Clone the cached video's src
      videoElement.src = cachedVideo.src;

      // Copy important properties
      videoElement.autoplay = config.autoplay;
      videoElement.loop = config.loop;
      videoElement.muted = config.muted;
      videoElement.playsInline = config.playsInline;
      videoElement.preload = 'auto';

      // Set up event listeners
      videoElement.addEventListener('loadeddata', () => {
        console.log(`Cached video loaded: ${config.src}`);

        // Try to play if autoplay is enabled
        if (config.autoplay && config.muted) {
          videoElement.play().catch(err => {
            console.warn(`Autoplay failed for ${config.src}:`, err);
          });
        }
      });

      videoElement.addEventListener('error', (err) => {
        console.error(`Error playing cached video ${config.src}:`, err);
        // Fallback to normal loading
        this.loadVideoNormally(videoElement, config);
      });

      // If cached video is already loaded, trigger play immediately
      if (cachedVideo.readyState >= 2) { // HAVE_CURRENT_DATA or more
        console.log(`Cached video already loaded, playing: ${config.src}`);
        if (config.autoplay && config.muted) {
          videoElement.play().catch(console.warn);
        }
      } else {
        // Load the video
        videoElement.load();
      }

    } catch (error) {
      console.error(`Error using cached video ${config.src}:`, error);
      this.loadVideoNormally(videoElement, config);
    }
  }

  private loadVideoNormally(videoElement: HTMLVideoElement, config: any): void {
    videoElement.src = config.src;
    videoElement.autoplay = config.autoplay;
    videoElement.loop = config.loop;
    videoElement.muted = config.muted;
    videoElement.playsInline = config.playsInline;
    videoElement.preload = 'auto';

    // Cache this video once it loads
    videoElement.addEventListener('loadeddata', () => {
      console.log(`Video loaded from network, caching: ${config.src}`);

      // Check if not already cached (to avoid duplicates)
      if (!this.assetLoader.isAssetCached(config.src)) {
        // Create a video element to cache
        const videoForCache = document.createElement('video');
        videoForCache.src = config.src;
        videoForCache.preload = 'auto';

        // Cache it
        this.assetLoader.cacheAsset({
          type: 'video',
          url: config.src
        });
      }
    });

    // Load the video
    videoElement.load();
  }

  /**
   * Manually play all videos
   */
  playAllVideos(): void {
    this.videoElements.forEach(video => {
      if (video.paused) {
        video.play().catch(console.warn);
      }
    });
  }

  /**
   * Pause all videos
   */
  pauseAllVideos(): void {
    this.videoElements.forEach(video => {
      video.pause();
    });
  }
}