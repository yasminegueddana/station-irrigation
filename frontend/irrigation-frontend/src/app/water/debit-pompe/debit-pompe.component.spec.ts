import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitPompeComponent } from './debit-pompe.component';

describe('DebitPompeComponent', () => {
  let component: DebitPompeComponent;
  let fixture: ComponentFixture<DebitPompeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebitPompeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebitPompeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
