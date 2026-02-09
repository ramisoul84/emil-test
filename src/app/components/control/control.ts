import { Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { BlobService } from '../../_core/blob.service';

@Component({
  selector: 'app-control',
  imports: [],
  templateUrl: './control.html',
  styleUrl: './control.scss',
})
export class Control implements OnInit {
  @ViewChild('colorInput') colorInput!: ElementRef<HTMLInputElement>;
  @Input() isLoaded = false;
  isExpanded: boolean = true;

  color1: string = '#226b22';
  color2: string = '#ACC424';
  color3: string = '#FF2D95';

  selectedColor: any

  // Get reactive params
  params;

  constructor(public blobService: BlobService) {
    this.params = this.blobService.params;
  }

  ngOnInit(): void {
    if (this.isLoaded) {
      this.animateInit()
    }
  }

  toggleExpand(): void {
    if (this.isExpanded) {
      console.log("hide")
      this.hideControlAnimate()
    } else {
      console.log("shoe")
      this.showControlAnimate()
    }
    this.isExpanded = !this.isExpanded;
  }

  onSpeedChange(event: Event): void {
    const value = (event.target as HTMLInputElement).valueAsNumber;
    this.blobService.updateParams({ speed: value });
  }

  onWobbleChange(event: Event): void {
    const value = (event.target as HTMLInputElement).valueAsNumber;
    this.blobService.updateParams({ wobble: value });
  }

  onIntensityChange(event: Event): void {
    const value = (event.target as HTMLInputElement).valueAsNumber;
    this.blobService.updateParams({ intensity: value });
  }

  onRadiusChange(event: Event): void {
    const value = (event.target as HTMLInputElement).valueAsNumber;
    this.blobService.updateParams({ radius: value });
  }

  randomizeShape(): void {
    this.randomize()
    this.randomizeColor()
  }

  randomize(): void {
    this.blobService.randomize();
  }

  randomizeColor(): void {
    this.color1 = this.generateRandomHexColor()
    this.color2 = this.generateRandomHexColor()
    this.color3 = this.generateRandomHexColor()
    document.documentElement.style.setProperty('--color1', this.color1);
    document.documentElement.style.setProperty('--color2', this.color2);
    document.documentElement.style.setProperty('--color3', this.color3);
  }

  generateRandomHexColor(): string {
    const hex = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += hex[Math.floor(Math.random() * 16)];
    }
    return color;
  }


  hideControlAnimate() {
    gsap.to('.range-group', {
      opacity: 0,
      y: 20,
      duration: 0.1,
      stagger: 0.05,
      overwrite: true,
    })

    gsap.to('.color-btn', {
      opacity: 0,
      y: 20,
      duration: 0.1,
      stagger: 0.05,
      delay: 0.25,
      overwrite: true,
    })

    gsap.to('.randomize', {
      opacity: 0,
      y: 20,
      duration: 0.1,
      delay: 0.4,
      overwrite: true,
    })

    gsap.to('.controls', {
      opacity: 0,
      duration: 0.05,
      delay: 0.5,
      overwrite: true,
    })
  }

  showControlAnimate() {
    gsap.to('.controls', {
      opacity: 1,
      duration: 0.2,
      overwrite: true,
    })

    gsap.to('.range-group', {
      opacity: 1,
      y: 0,
      duration: 0.2,
      stagger: 0.1,
      delay: 0.2,
      overwrite: true,
    })

    gsap.to('.color-btn', {
      opacity: 1,
      y: 0,
      duration: 0.2,
      stagger: 0.1,
      delay: 0.8,
      overwrite: true,
    })

    gsap.to('.randomize', {
      opacity: 1,
      y: 0,
      duration: 0.2,
      delay: 1,
      overwrite: true,
    })


  }

  animateInit() {
    gsap.fromTo('.controls', { opacity: 0, y: 20 }, {
      opacity: 1,
      y: 0,
      duration: 0.4,
    })

    gsap.fromTo('.hint', { opacity: 1 }, {
      opacity: 0,
      duration: 0.4,
      delay: 2,
    })

    gsap.fromTo('.range-group', { opacity: 0, y: 20 }, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      delay: 2.2,
      stagger: 0.2
    })

    gsap.fromTo('.color-btn', { opacity: 0, y: 20 }, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      delay: 3,
      stagger: 0.2
    })

    gsap.fromTo('.randomize', { opacity: 0, y: 20 }, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      delay: 3.6,
    })

    gsap.fromTo('.hide', { opacity: 0, y: 20 }, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      delay: 4,
    })
  }

  openColorPicker(inputElement: HTMLInputElement) {
    inputElement.click();
  }

  onColorChange(colorType: 'color1' | 'color2' | 'color3', event: Event) {
    const input = event.target as HTMLInputElement;
    const colorValue = input.value;
    this[colorType] = colorValue;
    document.documentElement.style.setProperty(`--${colorType}`, colorValue);
  }


}
