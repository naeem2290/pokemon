import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { pokemonActionsGroup } from './pokemon-actions';
import { ApiService } from '../../services/api.service';

@Injectable()
export class PokemonStoreEffects {

  constructor(
    private actions$: Actions,
    private api: ApiService
  ) { }
  
  getPokemons$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(pokemonActionsGroup.getPokemonRequest),
      switchMap(action => 
        this.api.getPokemons$().pipe(
          switchMap(res => {
            return this.api.getPokemons$(res.count, 0).pipe(
              map(result => 
                pokemonActionsGroup.getPokemonSuccess({
                  count: result.count ?? 0,
                  next: result.next ?? null,
                  previous: result.previous ?? null,
                  results: result.results
                })
              ),
              catchError(err => 
                of(pokemonActionsGroup.getPokemonFailure({ error: 'Error occurred during next data fetch' }))
              )
            );
          }),
          catchError(err => 
            of(pokemonActionsGroup.getPokemonFailure({ error: 'Error occurred during initial data fetch' }))
          )
        )
      )
    );
  });
}
