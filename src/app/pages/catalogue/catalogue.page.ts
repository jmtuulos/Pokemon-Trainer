import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.page.html',
  styleUrls: ['./catalogue.page.css'],
})
export class CataloguePage implements OnInit {
  constructor(private readonly pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.fetchAllPokemon();
    console.log(this.pokemonService.listOfPokemon);
  }
}
