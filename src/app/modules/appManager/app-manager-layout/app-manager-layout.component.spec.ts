import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppManagerLayoutComponent } from './app-manager-layout.component';

describe('AppManagerLayoutComponent', () => {
  let component: AppManagerLayoutComponent;
  let fixture: ComponentFixture<AppManagerLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppManagerLayoutComponent]
    });
    fixture = TestBed.createComponent(AppManagerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
