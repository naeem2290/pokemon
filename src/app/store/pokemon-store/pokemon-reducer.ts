import {
  Action,
  createReducer,
  on
} from '@ngrx/store';
import { pokemonActionsGroup } from './pokemon-actions';
import {
  initialState,
} from './pokemon-state';
import { PokemonState } from '../../../models/common';

export function reducer(state: PokemonState  | undefined, action: Action): any {
  return featureReducer(state, action);
}

const featureReducer = createReducer(
  initialState,

  on(pokemonActionsGroup.getPokemonRequest, (state) => ({
    ...state,
    pokemon: [],
    loadingStatus: "loading",
  })),

  on(pokemonActionsGroup.getPokemonSuccess, (state, action) => ({
    ...state,
    pokemon: action.results,
    count: action.count,
    next: action.next,
    previous: action.previous,
    loadingStatus: "done"
  })),
  
  on(pokemonActionsGroup.getPokemonFailure, (state, _) => ({
    ...state,
    pokemon: [],
    count: 0,
    loadingStatus: "failed",
  })),

  on(pokemonActionsGroup.selectPokemon, (state, action) => ({
    ...state,
    selectedPokemon: action.url
  })),
);
