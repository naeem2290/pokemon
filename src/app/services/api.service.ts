import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokemonDTO } from '../../models/common';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private readonly httpClient: HttpClient,) { }

  public getPokemons$(
    limit?: number,
    offset?: number
  ) {
    let params = new HttpParams();
    if (limit) {
      params = params.append('limit', limit);
    }
    if (offset) {
      params = params.append('offset', offset);
    }

    return this.httpClient.get<PokemonDTO>('https://pokeapi.co/api/v2/pokemon',
      { params }
    );
  }

  public getPokemonsDetail$(url: string) {
    return this.httpClient.get<any>(`${url}`).pipe(
      map(ele => ({
        name: ele.name,
        abilities: ele.abilities,
        types: ele.types,
        stats: ele.stats
      }))
    );
  }
}
