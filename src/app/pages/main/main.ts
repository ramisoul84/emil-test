import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Header } from "../../components/header/header";
import { Home } from "../../sections/home/home";
import { About } from "../../sections/about/about";
import { Timeline } from "../../sections/timeline/timeline";
import { Solidarity } from "../../sections/solidarity/solidarity";
import { Contact } from "../../sections/contact/contact";

import { GridService } from '../../_core/grid.service';
import { AssetConfig, AssetLoaderService } from '../../_core/asset-loader.service';
import { Subscription } from 'rxjs';
import { Cases } from "../../sections/cases/cases";



@Component({
  selector: 'app-main',
  imports: [Header, Home, About, Solidarity, Contact, Cases],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main implements OnInit, AfterViewInit {
  isLoading = true;
  progress = 0;
  showStats = true;
  stats = { total: 0, loaded: 0, failed: 0 };

  private loadingSub!: Subscription;
  private progressSub!: Subscription;

  constructor(
    private gridService: GridService,
    private assetLoader: AssetLoaderService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.setupSubscriptions();
    this.registerAllAssets();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.startLoading();
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.loadingSub) {
      this.loadingSub.unsubscribe();
    }
    if (this.progressSub) {
      this.progressSub.unsubscribe();
    }
  }

  private setupSubscriptions(): void {
    this.loadingSub = this.assetLoader.isLoading$.subscribe(loading => {
      this.isLoading = loading;

      setTimeout(() => {
        this.cdr.detectChanges();
      }, 0);
    });

    this.progressSub = this.assetLoader.progress$.subscribe(progress => {
      this.progress = progress;
      this.updateStats();

      setTimeout(() => {
        this.cdr.detectChanges();
      }, 0);
    });
  }

  private registerAllAssets(): void {
    this.assetLoader.reset();

    const assets: AssetConfig[] = [
      // About
      { type: 'image' as const, url: 'assets/images/emil.png' },
      { type: 'video' as const, url: 'assets/videos/emil.webm' },
      { type: 'image' as const, url: 'assets/images/house.gif' },
      { type: 'image' as const, url: 'assets/images/camera.gif' },
      { type: 'image' as const, url: 'assets/images/duck.gif' },
      // timeline
      { type: 'json' as const, url: 'assets/json/timeline.json' },
      { type: 'json' as const, url: 'assets/json/map.json' },
      // cases
      // waha
      { type: 'json' as const, url: 'assets/projects/waha/waha.json' },
      { type: 'image' as const, url: 'assets/projects/waha/waha-1.jpg' },
      { type: 'image' as const, url: 'assets/projects/waha/waha-2.jpg' },
      { type: 'image' as const, url: 'assets/projects/waha/waha-3.jpg' },
      { type: 'image' as const, url: 'assets/projects/waha/waha-4.jpg' },
      // SWSG
      { type: 'image' as const, url: 'assets/projects/swsg/swsg-1.jpg' },
      { type: 'image' as const, url: 'assets/projects/swsg/swsg-2.jpg' },
      { type: 'image' as const, url: 'assets/projects/swsg/swsg-3.jpg' },
      // expo    
      { type: 'json' as const, url: 'assets/projects/expo/expo.json' },
      { type: 'image' as const, url: 'assets/projects/expo/expo-1.jpg' },
      { type: 'image' as const, url: 'assets/projects/expo/expo-2.jpg' },
      { type: 'image' as const, url: 'assets/projects/expo/expo-3.jpg' },
      { type: 'image' as const, url: 'assets/projects/expo/expo-4.jpg' },
      // twin
      { type: 'image' as const, url: 'assets/projects/twin/twin-1.jpg' },
      { type: 'image' as const, url: 'assets/projects/twin/twin-2.jpg' },
      // isenburg
      { type: 'image' as const, url: 'assets/projects/isenburg/isenburg-1.jpg' },
      // dormitory
      { type: 'image' as const, url: 'assets/projects/dormitory/dormitory-1.jpg' },
      // nordic
      { type: 'image' as const, url: 'assets/projects/nordic/nordic-1.jpg' },
      { type: 'image' as const, url: 'assets/projects/nordic/nordic-2.jpg' },
      { type: 'image' as const, url: 'assets/projects/nordic/nordic-3.jpg' },
      // wolkenreich
      { type: 'image' as const, url: 'assets/projects/wolkenreich/wolkenreich-1.jpg' },
      { type: 'image' as const, url: 'assets/projects/wolkenreich/wolkenreich-2.jpg' },
      { type: 'image' as const, url: 'assets/projects/wolkenreich/wolkenreich-3.jpg' },
      // seafront
      { type: 'image' as const, url: 'assets/projects/seafront/seafront-1.jpg' },
      // resVR
      { type: 'video' as const, url: 'assets/projects/resvr/logo-1.webm' },
      { type: 'video' as const, url: 'assets/projects/resvr/logo-2.webm' },
      { type: 'video' as const, url: 'assets/projects/resvr/soft.webm' },
      { type: 'video' as const, url: 'assets/projects/resvr/demo.webm' },
      // CV
      { type: 'video' as const, url: 'assets/projects/cv/cv.webm' },
    ];

    this.assetLoader.registerAssets(assets);
  }


  private async startLoading(): Promise<void> {
    try {
      await this.assetLoader.startLoading();

      setTimeout(() => {
        this.cdr.detectChanges();
      }, 100);
    } catch (error) {
      setTimeout(() => {
        this.cdr.detectChanges();
      }, 100);
    }
  }

  updateStats(): void {
    this.stats = this.assetLoader.getStats();
  }

  getStatusMessage(): string {
    if (this.progress === 0) return 'Initializing...';
    if (this.progress < 20) return 'Preparing assets...';
    if (this.progress < 40) return 'Loading images...';
    if (this.progress < 60) return 'Processing media...';
    if (this.progress < 80) return 'Finalizing content...';
    if (this.progress < 100) return 'Almost ready...';
    return 'Welcome!';
  }
}
