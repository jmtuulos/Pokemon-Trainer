import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent {
  currentPagesLowValue: number = 0;
  currentPagesHighValue: number = 10;

  @Input() pokemonList: Pokemon[] = [];

  constructor() {}

  onPageChanged(e: PageEvent) {
    this.currentPagesLowValue = e.pageIndex * e.pageSize;
    this.currentPagesHighValue = this.currentPagesLowValue + e.pageSize;
    return e;
  }
}
