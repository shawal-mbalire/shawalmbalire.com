import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogolookerComponent } from './logolooker.component';

describe('LogolookerComponent', () => {
  let component: LogolookerComponent;
  let fixture: ComponentFixture<LogolookerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogolookerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogolookerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
