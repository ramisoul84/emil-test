import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements AfterViewInit {
  @ViewChildren('aboutVideos') aboutVideos!: QueryList<ElementRef<HTMLVideoElement>>;


  videoSources = [
    'assets/videos/camera.webm',
    'assets/videos/duck.webm',
    'assets/videos/house.webm'
  ];

  ngAfterViewInit(): void {
    console.log("about AfterViewInit")

    this.aboutVideos.forEach(videoRef => {
      const player = videoRef.nativeElement;
      player.muted = true;
      player.loop = true;
      player.autoplay = false;
      player.load();
      console.log("Video loaded", player.src)
    });

    setTimeout(() => {
      this.playAll()
    }, 1000);
  }

  playAll() {
    this.aboutVideos.forEach(videoRef => {
      const player = videoRef.nativeElement;
      player.play();
      console.log("Video play", player.currentTime)
    });
  }

  pauseAll() {
    this.aboutVideos.forEach(videoRef => {
      const player = videoRef.nativeElement;
      player.play();
      console.log("Video pause", player.currentTime)
    });
  }

}
