import { Component, Input, OnInit } from '@angular/core';

import { Blob } from "../../components/blob/blob";
import { Control } from "../../components/control/control";


@Component({
  selector: 'app-home',
  imports: [Blob, Control],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  @Input() isLoaded = false;

  ngOnInit(): void {

  }
  /*
  homeHeight: number = 100

  private gridService = inject(GridService)

  ngOnInit(): void {
    requestAnimationFrame(() => {
      this.homeHeight = this.gridService.getMaxHeight(6);
    });
    this.homeHeight = this.gridService.getMaxHeight(6)
    console.log(this.homeHeight)
  }
*/
}
