import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { reducer as pokemonReducer } from './pokemon-store/pokemon-reducer';
import { PokemonStoreEffects } from './pokemon-store/pokemon-effects';

import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { RootState } from '../../models/common';

export const reducers: ActionReducerMap<RootState> = {
    pokemon: pokemonReducer
};

export const getAppState = createFeatureSelector<RootState>('rootState');

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        StoreModule.forFeature('rootState', reducers),
        EffectsModule.forFeature([PokemonStoreEffects])
    ],
})
export class RootStoreModule { }
