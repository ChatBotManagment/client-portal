import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomTemplateComponent } from './room-template.component';

describe('RoomTemplateComponent', () => {
  let component: RoomTemplateComponent;
  let fixture: ComponentFixture<RoomTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RoomTemplateComponent]
    });
    fixture = TestBed.createComponent(RoomTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
