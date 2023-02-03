import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.models';
import { CatchPokemonService } from 'src/app/services/catch-pokemon.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-catch-button',
  templateUrl: './catch-button.component.html',
  styleUrls: ['./catch-button.component.css']
})
export class CatchButtonComponent implements OnInit{

  public inCollection: boolean = false
  @Input() pokemonId: number = -1

  get loading(): boolean {
    return this.catchPokemonService.loading
  }

  constructor(
    private userService: UserService,
    private readonly catchPokemonService: CatchPokemonService
  ) { }

  ngOnInit(): void {
    this.inCollection = this.userService.inCollection(this.pokemonId)
  }

  onCatchClick(): void {
    console.log(this.pokemonId)
    this.catchPokemonService.updateCollection(this.pokemonId)
      .subscribe({
        next: (response: User) => {
          this.inCollection = this.userService.inCollection(this.pokemonId)
        },
        error: (error: HttpErrorResponse) => {
          console.log("ERROR", error.message)
        }
      })
  }
}
