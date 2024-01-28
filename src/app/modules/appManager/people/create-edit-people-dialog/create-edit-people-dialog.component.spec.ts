import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditPeopleDialogComponent } from './create-edit-people-dialog.component';

describe('CreateEditPeopleDialogComponent', () => {
  let component: CreateEditPeopleDialogComponent;
  let fixture: ComponentFixture<CreateEditPeopleDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreateEditPeopleDialogComponent]
    });
    fixture = TestBed.createComponent(CreateEditPeopleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
