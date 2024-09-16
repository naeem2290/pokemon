import { PokemonState } from "../../../models/common";

export const initialState: PokemonState = {
  pokemon: [],
  count: 0,
  next: null,
  previous: null,
  loadingStatus: "none"
};

