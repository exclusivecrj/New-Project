import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRoupasPage } from './lista-roupas.page';

describe('ListaRoupasPage', () => {
  let component: ListaRoupasPage;
  let fixture: ComponentFixture<ListaRoupasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaRoupasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaRoupasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
