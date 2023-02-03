import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent {
  // MatPaginator Inputs
  length = 1000;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  //pageEvent: PageEvent;

  _allPokemon: Pokemon[] = [];

  activePageDataChunk: Pokemon[] = [];

  @Input() pokemonList: Pokemon[] = [];

  constructor() {
    this.activePageDataChunk = this.pokemonList.slice(0, this.pageSize);
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput
      .split(',')
      .map((str) => +str);
  }

  onPageChanged(e: PageEvent) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activePageDataChunk = this.pokemonList.slice(firstCut, secondCut);
  }

  ngOnChanges(): void {
    this._allPokemon = this.pokemonList;
    this.activePageDataChunk = this._allPokemon.slice(0, this.pageSize);
    this.length = this.pokemonList.length;
  }
}
