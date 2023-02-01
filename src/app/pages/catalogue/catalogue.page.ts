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

  ngOnInit(): void {
    //this.pokemonService.fetchAllPokemonFromAPI();
    this.pokemonService.fetchPokemonData();
    console.log(this.pokemonService.listOfPokemon);
    this.pokemonList = this.pokemonService.listOfPokemon;
  }
}
