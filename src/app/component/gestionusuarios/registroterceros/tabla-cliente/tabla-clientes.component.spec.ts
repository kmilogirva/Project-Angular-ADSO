import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaClienteComponent } from './tabla-clientes.component';

describe('TablaClienteComponent', () => {
  let component: TablaClienteComponent;
  let fixture: ComponentFixture<TablaClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
