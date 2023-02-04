import { Component } from '@angular/core';
import { User } from 'src/app/models/user.models';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.css'],
})
export class TrainerPage {

  constructor(
    private readonly userService: UserService,
    private readonly pokemonService: PokemonService,
    private readonly router: Router
  ) {}

  get pokemons(): Pokemon[] {
    if (this.userService.user){
      return this.userService.user.pokemons
    }
    return []
  }

  get user(): User | undefined {
    return this.userService.user;
  }

  navigateToCatalogue(): void {
    this.router.navigateByUrl('/catalogue');
  }

  logOut(): void {
    this.userService.user = undefined;
    this.userService.logoutUser();
    this.pokemonService.removePokemon();
    this.router.navigateByUrl('/login');
  }
}
