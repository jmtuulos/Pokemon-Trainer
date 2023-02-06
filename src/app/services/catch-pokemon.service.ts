import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon.model';
import { User } from '../models/user.models';
import { PokemonService } from './pokemon.service';
import { UserService } from './user.service';


const { apiKey, apiTrainers } = environment

@Injectable({
  providedIn: 'root'
})
export class CatchPokemonService {

  private _loading = false

  get loading(): boolean {
    return this._loading
  }

  constructor(
    private http: HttpClient,
    private readonly pokemonService: PokemonService,
    private readonly userService: UserService,
  ) { }

  /*
    Add/Remove pokemon from the user's collection
  */
  public updateCollection(pokemonId: number): Observable<User>{
    if (!this.userService.user){
      throw new Error("addToCollection:: There is no user")
    }

    const user: User = this.userService.user
    const newPokemon: Pokemon | undefined = this.pokemonService.pokemonById(pokemonId)

    if (!newPokemon){
      throw new Error("addToCollection: No pokemon with id: " + pokemonId)
    }

    if (this.userService.inCollection(pokemonId)) {
      this.userService.removeFromCollection(pokemonId)
    } else {
      this.userService.addToCollection(newPokemon)
    }

    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      'x-api-key': apiKey
    })

    this._loading = true
    return this.http.patch<User>(`${apiTrainers}/${user.id}`,{
      pokemons: [...user.pokemons]
    },{
      headers
    })
    .pipe(
      tap((updatedUser: User) => {
        this.userService.user = updatedUser
      } ),
      finalize(() => {
        this._loading = false
      })
    )
  }
}
