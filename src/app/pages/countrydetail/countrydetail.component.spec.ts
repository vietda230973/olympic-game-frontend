import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrydetailComponent } from './countrydetail.component';

describe('CountrydetailComponent', () => {
  let component: CountrydetailComponent;
  let fixture: ComponentFixture<CountrydetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountrydetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountrydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
