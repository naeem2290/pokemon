import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-pokemon-nav',
  templateUrl: './pokemon-nav.component.html',
  styleUrls: ['./pokemon-nav.component.scss']
})
export class PokemonNavComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor() { }

  ngOnInit() {
  }

  clickHandler() {
    this.sidenav.close();
  }

}
