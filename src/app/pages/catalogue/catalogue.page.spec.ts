import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CataloguePage } from './catalogue.page';

describe('CataloguePage', () => {
  let component: CataloguePage;
  let fixture: ComponentFixture<CataloguePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CataloguePage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CataloguePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
