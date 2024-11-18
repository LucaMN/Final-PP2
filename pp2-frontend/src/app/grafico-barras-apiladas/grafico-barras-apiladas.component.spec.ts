import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoBarrasApiladasComponent } from './grafico-barras-apiladas.component';

describe('GraficoBarrasApiladasComponent', () => {
  let component: GraficoBarrasApiladasComponent;
  let fixture: ComponentFixture<GraficoBarrasApiladasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoBarrasApiladasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoBarrasApiladasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
