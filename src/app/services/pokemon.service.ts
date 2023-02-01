import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Pokemon } from '../models/pokemon.model';
import { PokemonStorageUtil } from '../utils/pokemon-storage.util';

const pokeApiUrl = 'https://pokeapi.co/api/v2';
const pokemonEndpoint = '/pokemon?limit=10&offset=0';
const imgUrl =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';
const fileEnding = '.png';

const { apiTrainers, apiKey } = environment;

const httpRequestHeaders = new HttpHeaders({
  'Content-type': 'application/json',
  'x-api-key': apiKey,
});

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private readonly http: HttpClient) {}

  private _listOfPokemon: Pokemon[] = [];

  get listOfPokemon(): Pokemon[] {
    return this._listOfPokemon;
  }

  public fetchPokemonData(): void {
    //If no saved data from session storage
    //Call fetchAllPokemon from API

    let storedValue = PokemonStorageUtil.pokemonStorageRead<Pokemon[]>(
      StorageKeys.Pokemon
    );

    if (storedValue !== undefined) {
      this._listOfPokemon = storedValue;
    } else {
      this.fetchAllPokemonFromAPI();
    }
  }

  public fetchAllPokemonFromAPI(): void {
    this.http.get<any>(pokeApiUrl + pokemonEndpoint).subscribe(
      (data: any) => {
        this.mapResultsToPokemon(data.results);
        PokemonStorageUtil.pokemonStorageSave(
          StorageKeys.Pokemon,
          this._listOfPokemon
        );
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  public mapResultsToPokemon(data: any): void {
    for (let i = 0; i < data.length; i++) {
      //pokemon IDs start at 1, therefore add 1
      let id = i + 1;
      let name = data[i].name;
      let image: string = imgUrl + id + fileEnding;
      let captured = false;
      const newPokemon = { id, name, image, captured } as Pokemon;
      this.listOfPokemon.push(newPokemon);
    }
  }
}
