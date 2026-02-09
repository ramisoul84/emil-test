import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { data } from './data';


import { TranslateModule } from '@ngx-translate/core';
import { Slider } from "../../components/slider/slider";

import { gsap } from 'gsap';

@Component({
  selector: 'app-cases',
  imports: [TranslateModule, Slider],
  templateUrl: './cases.html',
  styleUrl: './cases.scss',
})
export class Cases implements OnInit, AfterViewInit {
  @ViewChildren('caseEl') caseElements!: QueryList<ElementRef>;
  // @ViewChildren('sliderWrapper') sliderWrappers!: QueryList<ElementRef>;
  // @ViewChildren('caseInfo') caseInfos!: QueryList<ElementRef>;
  //@ViewChildren('title') titles!: QueryList<ElementRef>;
  // @ViewChildren('text') texts!: QueryList<ElementRef>;
  //@ViewChildren('tags') tagsElements!: QueryList<ElementRef>;

  currentIndex = 0;
  isAnimating = false;

  cases = data

  ngOnInit() {
    // Initialize with first case active
  }

  ngAfterViewInit() {
    this.initializeSlider();
  }

  initializeSlider() {
    // Hide all cases except the first one
    /*
    this.sliderWrappers.toArray().forEach((caseEl, index) => {
      if (index !== 0) {
        gsap.set(caseEl.nativeElement, { opacity: 0, display: 'none' });
      }
    });

    this.titles.toArray().forEach((caseEl, index) => {
      if (index !== 0) {
        gsap.set(caseEl.nativeElement, { opacity: 0, display: 'none' });
      }
    });
*/
    // Animate initial case info in
    this.animateCaseInfoIn(0);
  }

  async nextSlide() {
    if (this.isAnimating) return;
    this.currentIndex = (this.currentIndex + 1) % this.cases.length;
    await this.slideTo(this.currentIndex + 1, 'next');
  }

  async prevSlide() {
    if (this.isAnimating) return;
    this.currentIndex = (this.currentIndex - 1 + this.cases.length) % this.cases.length;
    await this.slideTo(this.currentIndex - 1, 'prev');
  }

  async goToSlide(index: number) {
    if (this.isAnimating || index === this.currentIndex || index < 0 || index >= this.cases.length) return;

    const direction = index > this.currentIndex ? 'next' : 'prev';
    await this.slideTo(index, direction);
  }

  private async slideTo(newIndex: number, direction: 'next' | 'prev'): Promise<void> {
    /*
    this.isAnimating = true;

    const oldIndex = this.currentIndex;
    const oldSlider = this.sliderWrappers.toArray()[oldIndex];
    const newSlider = this.sliderWrappers.toArray()[newIndex];
    const oldTitle = this.titles.toArray()[oldIndex];
    const newTitle = this.titles.toArray()[newIndex];

    // Create timeline for coordinated animations
    const tl = gsap.timeline({
      onComplete: () => {
        this.currentIndex = newIndex;
        this.isAnimating = false;
      }
    });

    // Animation 1: Slide out old slider wrapper
    tl.to(oldSlider.nativeElement, {
      x: direction === 'next' ? '-100%' : '100%',
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut"
    }, 0);

    tl.to(oldTitle.nativeElement, {
      y: direction === 'next' ? '-100%' : '100%',
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut"
    }, 0);

    gsap.set(newSlider.nativeElement, { display: 'block', opacity: 0 });
    gsap.set(newTitle.nativeElement, { display: 'block', opacity: 0 });

    // Animation 4: Slide in new slider wrapper from opposite direction
    tl.fromTo(newSlider.nativeElement,
      {
        x: direction === 'next' ? '100%' : '-100%',
        opacity: 0
      },
      {
        x: '0%',
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      },
      0.2
    );

    tl.fromTo(newTitle.nativeElement,
      {
        x: direction === 'next' ? '100%' : '-100%',
        opacity: 0
      },
      {
        x: '0%',
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      },
      0.2
    );
  
  

    
    //const oldCase = this.caseElements.toArray()[oldIndex];
    const newCase = this.caseElements.toArray()[newIndex];

   


    const oldInfo = this.caseInfos.toArray()[oldIndex];
    const newInfo = this.caseInfos.toArray()[newIndex];

    // Show new case
 
    gsap.set(newInfo.nativeElement, { display: 'block', opacity: 0 });






    // Animation 2: Fade out old case info
    tl.to(oldInfo.nativeElement.querySelector('.case-info'), {
      opacity: 0,
      scale: 0.8,
      duration: 0.4,
      ease: "power2.in"
    }, 0);

        // Animation 3: Fade in new case
        tl.to(newCase.nativeElement, {
          opacity: 1,
          duration: 0.3
        }, 0.2);
  



    // Animation 5: Hide old case completely after animation
    //tl.set(oldCase.nativeElement, { display: 'none' }, 0.6);

    // Animation 6: Animate new case info elements with staggered scale
    //const newInfo = newCase.nativeElement.querySelector('.case-info');
    const title = newCase.nativeElement.querySelector('.title');
    const text = newCase.nativeElement.querySelector('.text');
    const tags = newCase.nativeElement.querySelector('.tags');

    tl.fromTo(newInfo,
      { scale: 0.5, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "back.out(1.2)"
      },
      0.4
    );

    tl.fromTo(title,
      { scale: 0, opacity: 0, y: 20 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)"
      },
      0.5
    );

    tl.fromTo(text,
      { scale: 0, opacity: 0, y: 20 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)"
      },
      0.6
    );

    tl.fromTo(tags,
      { scale: 0, opacity: 0, y: 20 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)"
      },
      0.7
    );

    */
  }

  private animateCaseInfoIn(index: number) {
    const caseEl = this.caseElements.toArray()[index];
    const info = caseEl.nativeElement.querySelector('.case-info');
    const title = caseEl.nativeElement.querySelector('.title');
    const text = caseEl.nativeElement.querySelector('.text');
    const tags = caseEl.nativeElement.querySelector('.tags');

    const tl = gsap.timeline();

    tl.fromTo(info,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.4)"
      }
    );

    tl.fromTo(title,
      { scale: 0, opacity: 0, y: 30 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)"
      },
      0.2
    );

    tl.fromTo(text,
      { scale: 0, opacity: 0, y: 30 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)"
      },
      0.3
    );

    tl.fromTo(tags,
      { scale: 0, opacity: 0, y: 30 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)"
      },
      0.4
    );
  }

  // Optional: Add keyboard navigation
  handleKeydown(event: KeyboardEvent) {
    if (this.isAnimating) return;

    switch (event.key) {
      case 'ArrowLeft':
        this.prevSlide();
        break;
      case 'ArrowRight':
        this.nextSlide();
        break;
      case 'Home':
        this.goToSlide(0);
        break;
      case 'End':
        this.goToSlide(this.cases.length - 1);
        break;
    }
  }
}
