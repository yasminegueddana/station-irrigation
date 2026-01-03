import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoPompeComponent } from './conso-pompe.component';

describe('ConsoPompeComponent', () => {
  let component: ConsoPompeComponent;
  let fixture: ComponentFixture<ConsoPompeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsoPompeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsoPompeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
