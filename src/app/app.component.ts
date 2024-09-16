import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { pokemonActionsGroup } from './store/pokemon-store/pokemon-actions';
import { RootState } from 'src/models/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { selectPokemonLoadingStatus } from './store/pokemon-store/pokemon-selectors';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'assessment';

  constructor(
    private store: Store<RootState>,
    private ngxLoader: NgxUiLoaderService
  ) {}
  ngOnInit() {
    this.store.dispatch(pokemonActionsGroup.getPokemonRequest({}));

    this.store.pipe(select(selectPokemonLoadingStatus), distinctUntilChanged()).subscribe(status => {
      if(status === "loading") {
        this.ngxLoader.start();
      }
      else {
        this.ngxLoader.stop();
      }
    })
  }
}
