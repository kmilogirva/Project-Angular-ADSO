import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaModulosComponent } from './tabla-modulos.component';

describe('TablaModulosComponent', () => {
  let component: TablaModulosComponent;
  let fixture: ComponentFixture<TablaModulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaModulosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaModulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
