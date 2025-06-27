import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailHomePage } from './detail-home.page';

describe('DetailHomePage', () => {
  let component: DetailHomePage;
  let fixture: ComponentFixture<DetailHomePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
