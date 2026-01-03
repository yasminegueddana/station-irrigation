import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PompeFormComponent } from './pompe-form.component';

describe('PompeFormComponent', () => {
  let component: PompeFormComponent;
  let fixture: ComponentFixture<PompeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PompeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PompeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
