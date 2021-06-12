/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NabBarComponent } from './nab-bar.component';

describe('NabBarComponent', () => {
  let component: NabBarComponent;
  let fixture: ComponentFixture<NabBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NabBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NabBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
