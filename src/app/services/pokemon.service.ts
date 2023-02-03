import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
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
  private _loading: boolean = false;
  private _error: string = '';

  get listOfPokemon(): Pokemon[] {
    return this._listOfPokemon;
  }

  get isLoading(): boolean {
    return this._loading;
  }

  get error(): string {
    return this.error;
  }

  public fetchPokemonData(): void {
    //If no saved data from session storage
    //Call fetchAllPokemon from API

    let storedValue = PokemonStorageUtil.pokemonStorageRead<Pokemon[]>(
      StorageKeys.Pokemon
    );

    if (storedValue) {
      this._listOfPokemon = storedValue;
    } else {
      this.fetchAllPokemonFromAPI();
    }
  }

  public fetchAllPokemonFromAPI(): void {
    this._loading = true;
    this.http
      .get<any>(pokeApiUrl + pokemonEndpoint)
      .pipe(
        finalize(() => {
          this._loading = false;
        })
      )
      .subscribe({
        next: (data: any) => {
          this.mapResultsToPokemon(data.results);
          PokemonStorageUtil.pokemonStorageSave(
            StorageKeys.Pokemon,
            this._listOfPokemon
          );
        },
        error: (errorMessage: HttpErrorResponse) => {
          console.log(errorMessage.message);
          this._error = errorMessage.message;
        },
      });
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

  public pokemonById(id: number): Pokemon | undefined {
    return this._listOfPokemon.find((pokemon: Pokemon) => pokemon.id === id)
  }
}
