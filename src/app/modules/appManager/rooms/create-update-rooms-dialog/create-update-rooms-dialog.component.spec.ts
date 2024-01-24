import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateRoomsDialogComponent } from './create-update-rooms-dialog.component';

describe('CreateUpdateRoomsDialogComponent', () => {
  let component: CreateUpdateRoomsDialogComponent;
  let fixture: ComponentFixture<CreateUpdateRoomsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreateUpdateRoomsDialogComponent]
    });
    fixture = TestBed.createComponent(CreateUpdateRoomsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
