import { Component } from '@angular/core';
import { About } from "../../sections/about/about";
import { Home } from "../../sections/home/home";

@Component({
  selector: 'app-main',
  imports: [About, Home],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {

}
