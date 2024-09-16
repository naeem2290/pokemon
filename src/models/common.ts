export type LoadingStatus = 'loading' | 'none' | 'failed' | 'done';

export interface PokemonState {
    pokemon: Pokemon[];
    count: number,
    next: string | null,
    previous: string | null,
    loadingStatus: LoadingStatus | string,
    selectedPokemon?: string
}

export interface PokemonDTO {
    results: Pokemon[];
    count: number,
    next: string | null,
    previous: string | null,
}

export interface RootState {
    pokemon: PokemonState
}

export interface Pokemon {
    name: string;
    url: string;
}