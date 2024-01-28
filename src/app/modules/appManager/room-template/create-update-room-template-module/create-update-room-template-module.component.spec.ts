import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateRoomTemplateModuleComponent } from './create-update-room-template-module.component';

describe('CreateUpdateRoomTemplateModuleComponent', () => {
  let component: CreateUpdateRoomTemplateModuleComponent;
  let fixture: ComponentFixture<CreateUpdateRoomTemplateModuleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreateUpdateRoomTemplateModuleComponent]
    });
    fixture = TestBed.createComponent(CreateUpdateRoomTemplateModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
