import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlerteEauListComponent } from './alerte-eau-list.component';

describe('AlerteEauListComponent', () => {
  let component: AlerteEauListComponent;
  let fixture: ComponentFixture<AlerteEauListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlerteEauListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlerteEauListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
