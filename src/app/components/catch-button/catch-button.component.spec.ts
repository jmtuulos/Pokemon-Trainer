import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchButtonComponent } from './catch-button.component';

describe('CatchButtonComponent', () => {
  let component: CatchButtonComponent;
  let fixture: ComponentFixture<CatchButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatchButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatchButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
