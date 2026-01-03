import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservoirListComponent } from './reservoir-list.component';

describe('ReservoirListComponent', () => {
  let component: ReservoirListComponent;
  let fixture: ComponentFixture<ReservoirListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservoirListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservoirListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
