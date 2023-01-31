import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';

const pokeApiUrl = 'https://pokeapi.co/api/v2';
const pokemonEndpoint = '/pokemon?limit=10&offset=0';
const imgUrl =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
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

  private _listOfPokemon = [];

  get listOfPokemon(): any {
    return this._listOfPokemon;
  }

  public fetchAllPokemon(): void {
    this.http.get<any>(pokeApiUrl + pokemonEndpoint).subscribe(
      (data: any) => {
        this.mapResultsToPokemon(data.results);
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
      const newPokemon = { id, name, image } as Pokemon;
      this.listOfPokemon.push(newPokemon);
    }
  }
}
