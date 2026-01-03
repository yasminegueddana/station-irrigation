import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PompeListComponent } from './pompe-list.component';

describe('PompeListComponent', () => {
  let component: PompeListComponent;
  let fixture: ComponentFixture<PompeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PompeListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PompeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
