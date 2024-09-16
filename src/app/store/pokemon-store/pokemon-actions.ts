import { createActionGroup, props } from '@ngrx/store';
import { Pokemon } from 'src/models/common';

export const pokemonActionsGroup = createActionGroup({
  source: 'Pokemon',
  events: {
    getPokemonRequest: props<{ limit?: number, offset?: number }>(),
    getPokemonSuccess: props<{ count: number, next: string | null, previous: string | null, results: Pokemon[] }>(),
    getPokemonFailure: props<{ error: string }>(),

    selectPokemon: props<{ url: string }>(),
  }
});