import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.page.html',
  styleUrls: ['./catalogue.page.css'],
})
export class CataloguePage implements OnInit {
  constructor(private readonly pokemonService: PokemonService) {}
  pokemonList: Pokemon[] = [];

  get pokemon(): Pokemon[] {
    return this.pokemonService.listOfPokemon;
  }

  get loading(): boolean {
    return this.pokemonService.isLoading;
  }

  get error(): string {
    return this.pokemonService.error;
  }

  ngOnInit(): void {
    this.pokemonService.fetchPokemonData();
    this.pokemonList = this.pokemonService.listOfPokemon;
  }
}
