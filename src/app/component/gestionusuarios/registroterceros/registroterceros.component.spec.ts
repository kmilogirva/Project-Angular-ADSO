import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrotercerosComponent } from './registroterceros.component';

describe('RegistroclienteComponent', () => {
  let component: RegistrotercerosComponent;
  let fixture: ComponentFixture<RegistrotercerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrotercerosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrotercerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
