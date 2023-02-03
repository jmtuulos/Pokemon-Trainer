import { TestBed } from '@angular/core/testing';

import { CatchPokemonService } from './catch-pokemon.service';

describe('CatchPokemonService', () => {
  let service: CatchPokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatchPokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
