import { AfterViewInit, Component, inject, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Item {
  title: string;
  logo: string;
  link: string;
}

@Component({
  selector: 'app-solidarity',
  imports: [],
  templateUrl: './solidarity.html',
  styleUrl: './solidarity.scss',
})
export class Solidarity implements AfterViewInit, OnDestroy {
  private scrollTriggers: ScrollTrigger[] = [];

  links: Item[] = [
    { title: 'sea-watch', logo: "assets/logos/sea-watch.png", link: "https://sea-watch.org/en/donate/" },
    { title: 'proasyl', logo: "assets/logos/pro.png", link: "https://www.proasyl.de/spenden/" },
    { title: 'queer-refugees', logo: "assets/logos/queer.png", link: "https://queer-refugees.de/en/" },
    { title: 'fridaysforfuture', logo: "assets/logos/fridays.png", link: "https://fridaysforfuture.de/spenden/" },
  ]

  private sanitizer = inject(DomSanitizer)

  ngAfterViewInit() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    this.setupAnimations();
  }

  setupAnimations(): void {
    const title = gsap.from('.solidarity-title', {
      opacity: 0,
      y: 20,
      duration: 0.4,
      scrollTrigger: {
        trigger: '#solidarity',
        start: 'top 60%', // When top of element hits 80% from top of viewport
        end: 'bottom 20%',
        toggleActions: 'play none none' // play on enter, reverse on leave
      }
    });

    const box = gsap.from('.solidarity', {
      opacity: 0,
      y: 20,
      duration: 0.4,
      delay: 0.6,
      scrollTrigger: {
        trigger: '#solidarity',
        start: 'top 60%', // When top of element hits 80% from top of viewport
        end: 'bottom 20%',
        toggleActions: 'play none none' // play on enter, reverse on leave
      }
    });


    const text = gsap.from('.solidarity-text', {
      opacity: 0,
      y: 20,
      duration: 0.4,
      delay: 0.8,
      scrollTrigger: {
        trigger: '.solidarity-text',
        start: 'top 60%', // When top of element hits 80% from top of viewport
        end: 'bottom 20%',
        toggleActions: 'play none none' // play on enter, reverse on leave
      }
    });

    const link = gsap.from('.link', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      delay: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.links',
        start: 'top 60%', // When top of element hits 80% from top of viewport
        end: 'bottom 20%',
        toggleActions: 'play none none' // play on enter, reverse on leave
      }
    });

    this.scrollTriggers.push(
      title.scrollTrigger as ScrollTrigger,
      box.scrollTrigger as ScrollTrigger,
      text.scrollTrigger as ScrollTrigger,
      link.scrollTrigger as ScrollTrigger,
    );

  }


  openLink(link: string): void {
    if (!link) return;
    try {
      const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(link);
      window.open(link, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Invalid or unsafe URL:', link);
    }
  }

  ngOnDestroy() {
    this.scrollTriggers.forEach(trigger => {
      if (trigger) {
        trigger.kill();
      }
    });

    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }
}
