import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Pokemon } from '../models/pokemon.model';
import { User } from '../models/user.models';
import { StorageUtil } from '../utils/storage.util';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user?: User

  get user(): User | undefined {
    return this._user
  }

  set user(user: User | undefined) {
    StorageUtil.storageSave<User>(StorageKeys.User, user!)
    this._user = user
  }

  constructor() {
    this._user = StorageUtil.storageRead<User>(StorageKeys.User)
  }

  public inCollection(pokemonId: number): boolean{
    if (this._user){
      return Boolean(this.user?.pokemons
        .find((pokemon: Pokemon) => pokemon.id === pokemonId))
    }
    return false
  }

  // public removeFromCollection(pokemonId: number): void {
  //   if (this.user) {
  //     this._user.pokemons = this._user.pokemons
  //       .filter((pokemon: Pokemon) => pokemon.id !== pokemonId)
  //   }
  // }
}
