import { AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { AssetLoaderService } from '../../_core/asset-loader.service';
import { data } from './data';
import { ScrollService } from '../../_core/scroll.service';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';


import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Item } from '../../_core/domain';

@Component({
  selector: 'app-about',
  imports: [TranslateModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})

export class About implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('emilPhoto') emilPhoto!: ElementRef;
  @ViewChild('emilVideo') emilVideo!: ElementRef;

  private subscription!: Subscription;
  private scrollTriggers: ScrollTrigger[] = [];

  isIOS: boolean = /iPad|iPhone|iPod/.test(navigator.userAgent);

  indices: number[] = [0, 1, 2]
  selectedIndex: number = 0

  private readonly ASSETS = {
    emilImage: 'assets/images/emil.png',
    emilVideo: 'assets/videos/emil.webm',
    houseGif: 'assets/images/house.gif',
    cameraGif: 'assets/images/camera.gif',
    duckGif: 'assets/images/duck.gif'
  };

  aboutItems = data
  hasPlayed: boolean = false

  assetLoader = inject(AssetLoaderService)
  scrollService = inject(ScrollService)

  ngOnInit(): void {
    this.subscription = this.scrollService.scroll$
      .pipe(
        distinctUntilChanged((prev, curr) => prev === curr)
      )
      .subscribe(() => {
        this.checkIfInViewport();
      });
  }

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.initAnimation()
  }

  get emilImageSrc(): string {
    return this.assetLoader.getAssetSrc(this.ASSETS.emilImage);
  }

  get emilVideoSrc(): string {
    return this.assetLoader.getAssetSrc(this.ASSETS.emilVideo);
  }

  get activeItem(): Item {
    return this.aboutItems[this.indices[0]];
  }

  get smallItems(): Item[] {
    return [this.aboutItems[this.indices[1]], this.aboutItems[this.indices[2]]];
  }

  private checkIfInViewport(): void {
    if (!this.emilPhoto?.nativeElement || this.hasPlayed) return;
    const element = this.emilPhoto?.nativeElement
    const isInView = this.scrollService.isElementInViewport(element, 100);

    if (isInView) {
      this.playVideo();
      this.hasPlayed = true
    }
  }

  selectActve(smallIndex: number): void {
    const smallPositionInIndices = smallIndex + 1;
    const temp = this.indices[0];
    this.indices[0] = this.indices[smallPositionInIndices];
    this.indices[smallPositionInIndices] = temp;
    this.playVideo()
    this.animateContent()
  }

  select(index: number): void {
    this.selectedIndex = index
    this.playVideo()
    this.animateContent()
  }

  playVideo(): void {
    const video = this.emilVideo?.nativeElement
    if (video) {
      video.play()
    }
  }

  initAnimation(): void {
    const title = gsap.from('.about-title', {
      opacity: 0,
      y: 20,
      duration: 0.4,
      scrollTrigger: {
        trigger: '#about',
        start: 'top 60%', // When top of element hits 80% from top of viewport
        end: 'bottom 20%',
        toggleActions: 'play none none', // play on enter, reverse on leave
      }
    });

    const img = gsap.from('.about-emil-img', {
      opacity: 0,
      y: 20,
      duration: 0.4,
      delay: 0.2,
      scrollTrigger: {
        trigger: '.about-emil-img',
        start: 'top 60%',
        end: 'bottom 20%',
        toggleActions: 'play none none'
      }
    });

    const box = gsap.from('.about-right-desktop', {
      opacity: 0,
      y: 20,
      duration: 0.4,
      delay: 0.4,
      scrollTrigger: {
        trigger: '.about-right-desktop',
        start: 'top 60%',
        end: 'bottom 20%',
        toggleActions: 'play none none'
      }
    });

    const imgs = gsap.from('.img-wrapper-desktop', {
      opacity: 0,
      x: 20,
      duration: 0.2,
      delay: 0.6,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.img-wrapper-desktop',
        start: 'top 60%',
        end: 'bottom 20%',
        toggleActions: 'play none none'
      }
    });

    const infoTitle = gsap.from('.about-info-title', {
      opacity: 0,
      y: 20,
      duration: 0.2,
      delay: 1,
      scrollTrigger: {
        trigger: '#about',
        start: 'top 50%',
        end: 'bottom 20%',
        toggleActions: 'play none none'
      }
    });

    const infoText = gsap.from('.about-info-text', {
      opacity: 0,
      y: 20,
      duration: 0.2,
      delay: 1.2,
      scrollTrigger: {
        trigger: '#about',
        start: 'top 50%',
        end: 'bottom 20%',
        toggleActions: 'play none none'
      }
    });

    this.scrollTriggers.push(
      title.scrollTrigger as ScrollTrigger,
      img.scrollTrigger as ScrollTrigger,
      box.scrollTrigger as ScrollTrigger,
      imgs.scrollTrigger as ScrollTrigger,
      infoTitle.scrollTrigger as ScrollTrigger,
      infoText.scrollTrigger as ScrollTrigger,
    );
  }

  animateContent(): void {
    gsap.fromTo(".about-info-title", { opacity: 0, y: 10 }, {
      opacity: 1, y: 0, duration: 0.2, delay: 0, ease: "power3.inOut", overwrite: true,
    });
    gsap.fromTo(".about-info-text", { opacity: 0, y: 10 }, {
      opacity: 1, y: 0, duration: 0.2, delay: 0.2, ease: "power3.inOut", overwrite: true,
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.scrollTriggers.forEach(trigger => {
      if (trigger) {
        trigger.kill();
      }
    });
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }
}