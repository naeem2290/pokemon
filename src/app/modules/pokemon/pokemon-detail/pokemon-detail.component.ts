import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { selectSelectedPokemon } from 'src/app/store/pokemon-store/pokemon-selectors';
import { RootState } from 'src/models/common';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent {
  private subscriptions: Subscription[] = [];
  public pokemon: any;

  constructor(
    private store: Store<RootState>,
    private api: ApiService,
    private router: Router,
    private ngxLoader: NgxUiLoaderService
  ) { }

  ngOnInit() {
    this.ngxLoader.start();
    this.subscriptions.push(
      this.store.pipe(select(selectSelectedPokemon), distinctUntilChanged()).subscribe((url) => {
        if (url) {
          this.api.getPokemonsDetail$(url).subscribe(res => {
            this.pokemon = res;
            this.ngxLoader.stop();
          })
        }
        else {
          this.ngxLoader.stop();
          this.router.navigateByUrl('home');
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
