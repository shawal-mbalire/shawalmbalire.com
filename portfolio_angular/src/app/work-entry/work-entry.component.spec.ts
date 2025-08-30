import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkEntryComponent } from './work-entry.component';

describe('WorkEntryComponent', () => {
  let component: WorkEntryComponent;
  let fixture: ComponentFixture<WorkEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
