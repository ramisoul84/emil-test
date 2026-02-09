import { ChangeDetectorRef, Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { ScrollService } from '../../_core/scroll.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit, OnDestroy {
  @Input() isLoaded = false;

  private subscription!: Subscription;

  private compactThreshold: number = 400;
  private isCompact: boolean = false;
  private isFirstLoad: boolean = true;
  private isAnimating: boolean = false;


  private lastScrollY = 0;
  isHidden = false;

  private scrollService = inject(ScrollService)
  private cdr = inject(ChangeDetectorRef)

  ngOnInit() {
    this.subscription = this.scrollService.scroll$
      .pipe(
        distinctUntilChanged((prev, curr) => prev === curr)
      )
      .subscribe(position => {
        this.isFirstLoad = position > this.compactThreshold;

        if (position > this.compactThreshold) {
          this.isHidden = true;
          console.log("hidden")
        } else {
          this.isHidden = false;
        }

        this.lastScrollY = position;

        this.cdr.detectChanges();
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
