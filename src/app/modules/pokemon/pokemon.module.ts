import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonRoutingModule } from './pokemon-routing.module';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms'; // Add this if you're using [(ngModel)]
import { MatFormFieldModule } from '@angular/material/form-field';
import { PokemonNavComponent } from './pokemon-nav/pokemon-nav.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    PokemonDetailComponent,
    PokemonListComponent,
    PokemonNavComponent
  ],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatCheckboxModule,
  ]
})
export class PokemonModule { }
