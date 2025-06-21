import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApprovalDetailPage } from './approval-detail.page';

describe('ApprovalDetailPage', () => {
  let component: ApprovalDetailPage;
  let fixture: ComponentFixture<ApprovalDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
