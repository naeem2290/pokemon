
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PokemonState, RootState } from '../../../models/common';


export const stateSelector = createFeatureSelector<RootState>('rootState');

export const PokemonSelector = createSelector(
    stateSelector,
    (state: RootState) => {
        return state.pokemon;
    }
);

export const selectPokemonList = createSelector(
    PokemonSelector,
    (state: PokemonState) => {
      return state.pokemon;
    }
);

export const selectPokemonLoadingStatus = createSelector(
    PokemonSelector,
    (state: PokemonState) => {
      return state.loadingStatus;
    }
);

export const selectPokemonCount = createSelector(
    PokemonSelector,
    (state: PokemonState) => {
      return state.count;
    }
);

export const selectPokemonNext = createSelector(
  PokemonSelector,
  (state: PokemonState) => {
    return state.next;
  }
);

export const selectPokemonPrevious = createSelector(
  PokemonSelector,
  (state: PokemonState) => {
    return state.previous;
  }
);

export const selectSelectedPokemon = createSelector(
  PokemonSelector,
  (state: PokemonState) => {
    return state.selectedPokemon ?? "";
  }
);
