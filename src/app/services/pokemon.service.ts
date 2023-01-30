import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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

  // public getPokemon(): Observable<Pokemon> {}
}
