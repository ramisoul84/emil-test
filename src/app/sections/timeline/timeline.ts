import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { AssetLoaderService } from '../../_core/asset-loader.service';

@Component({
  selector: 'app-timeline',
  imports: [LottieComponent],
  templateUrl: './timeline.html',
  styleUrl: './timeline.scss',
})
export class Timeline implements OnInit, AfterViewInit {
  // Store Lottie options for each animation
  timelineOptions: AnimationOptions | null = null;
  mapOptions: AnimationOptions | null = null;
  
  // Store animation instances for control
  timelineAnimation: AnimationItem | null = null;
  mapAnimation: AnimationItem | null = null;
  
  // Loading states
  timelineLoaded: boolean = false;
  mapLoaded: boolean = false;

  constructor(
    private assetLoader: AssetLoaderService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadAnimationsFromCache();
  }

  ngAfterViewInit(): void {
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      this.playAnimations();
    }, 200);
  }

  /**
   * Load animations from cache
   */
  private loadAnimationsFromCache(): void {
    console.log('Loading animations from cache...');
    
    // Timeline animation
    const timelineData = this.assetLoader.getJsonData('assets/json/timeline.json');
    if (timelineData) {
      console.log('Timeline animation found in cache');
      this.timelineOptions = {
        animationData: timelineData,
        autoplay: false,
        loop: false,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
      this.timelineLoaded = true;
    } else {
      console.log('Timeline animation not in cache, will load from network');
      this.timelineOptions = {
        path: 'assets/json/timeline.json',
        autoplay: false,
        loop: false,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
    }

    // Map animation
    const mapData = this.assetLoader.getJsonData('assets/json/map.json');
    if (mapData) {
      console.log('Map animation found in cache');
      this.mapOptions = {
        animationData: mapData,
        autoplay: false,
        loop: false,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
      this.mapLoaded = true;
    } else {
      console.log('Map animation not in cache, will load from network');
      this.mapOptions = {
        path: 'assets/json/map.json',
        autoplay: false,
        loop: false,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
    }

    this.cdr.detectChanges();
  }

  /**
   * Play animations
   */
  private playAnimations(): void {
    if (this.timelineAnimation) {
      this.timelineAnimation.play();
    }
    if (this.mapAnimation) {
      this.mapAnimation.play();
    }
  }

  /**
   * Called when timeline animation is created
   */
  onTimelineCreated(animationItem: AnimationItem): void {
    console.log('Timeline animation created');
    this.timelineAnimation = animationItem;
    
    // If loaded from cache, it should be ready immediately
    if (this.timelineLoaded) {
      console.log('Timeline animation ready from cache');
      // Add event listeners
      animationItem.addEventListener('DOMLoaded', () => {
        console.log('Timeline animation DOM loaded');
      });
      animationItem.addEventListener('complete', () => {
        console.log('Timeline animation complete');
      });
    } else {
      // If loading from network, cache it when loaded
      animationItem.addEventListener('DOMLoaded', () => {
        console.log('Timeline animation loaded from network, caching...');
        this.cacheAnimation('assets/json/timeline.json', animationItem);
      });
    }
  }

  /**
   * Called when map animation is created
   */
  onMapCreated(animationItem: AnimationItem): void {
    console.log('Map animation created');
    this.mapAnimation = animationItem;
    
    if (this.mapLoaded) {
      console.log('Map animation ready from cache');
      // Add event listeners
      animationItem.addEventListener('DOMLoaded', () => {
        console.log('Map animation DOM loaded');
      });
      animationItem.addEventListener('complete', () => {
        console.log('Map animation complete');
      });
    } else {
      // If loading from network, cache it when loaded
      animationItem.addEventListener('DOMLoaded', () => {
        console.log('Map animation loaded from network, caching...');
        this.cacheAnimation('assets/json/map.json', animationItem);
      });
    }
  }

  /**
   * Cache animation data
   */
  private cacheAnimation(url: string, animationItem: AnimationItem): void {
    // Get animation data from the animation item
    const animationData = animationItem.isLoaded;
    
    if (animationData && !this.assetLoader.isJsonCached(url)) {
      console.log(`Caching animation data for: ${url}`);
      
      // Cache the JSON data
      this.assetLoader.cacheAsset({
        type: 'json',
        url: url,
        id: url.split('/').pop()?.replace('.json', '')
      });
    }
  }

  /**
   * Control methods for timeline animation
   */
  playTimeline(): void {
    if (this.timelineAnimation) {
      this.timelineAnimation.play();
    }
  }

  pauseTimeline(): void {
    if (this.timelineAnimation) {
      this.timelineAnimation.pause();
    }
  }

  stopTimeline(): void {
    if (this.timelineAnimation) {
      this.timelineAnimation.stop();
    }
  }

  restartTimeline(): void {
    if (this.timelineAnimation) {
      this.timelineAnimation.goToAndPlay(0);
    }
  }

  /**
   * Control methods for map animation
   */
  playMap(): void {
    if (this.mapAnimation) {
      this.mapAnimation.play();
    }
  }

  pauseMap(): void {
    if (this.mapAnimation) {
      this.mapAnimation.pause();
    }
  }

  stopMap(): void {
    if (this.mapAnimation) {
      this.mapAnimation.stop();
    }
  }

  /**
   * Verify cache status
   */
  verifyCache(): void {
    console.log('=== Cache Verification ===');
    
    const timelineCached = this.assetLoader.isJsonCached('assets/json/timeline.json');
    const mapCached = this.assetLoader.isJsonCached('assets/json/map.json');
    
    console.log(`Timeline cached: ${timelineCached}`);
    console.log(`Map cached: ${mapCached}`);
    
    if (timelineCached) {
      const data = this.assetLoader.getJsonData('assets/json/timeline.json');
      console.log('Timeline data:', data ? 'Loaded' : 'Not loaded');
    }
    
    if (mapCached) {
      const data = this.assetLoader.getJsonData('assets/json/map.json');
      console.log('Map data:', data ? 'Loaded' : 'Not loaded');
    }
  }

  /**
   * Manually load animations from cache
   */
  reloadFromCache(): void {
    console.log('Reloading animations from cache...');
    
    // Clear current options
    this.timelineOptions = null;
    this.mapOptions = null;
    this.timelineLoaded = false;
    this.mapLoaded = false;
    
    // Reload after a short delay
    setTimeout(() => {
      this.loadAnimationsFromCache();
    }, 100);
  }
}