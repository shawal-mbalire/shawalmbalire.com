import '../../test-setup';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkEntryComponent } from './work-entry.component';
import { WorkEntry } from '../../core/models/workEntry';

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
    component.workEntry = {
      title: 'Test Title',
      company: 'Test Company',
      duration: 'Test Duration',
      description: 'Test Description',
      photo: 'test.jpg'
    } as WorkEntry;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
