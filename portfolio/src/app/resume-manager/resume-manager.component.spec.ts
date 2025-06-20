import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeManagerComponent } from './resume-manager.component';

describe('ResumeManagerComponent', () => {
  let component: ResumeManagerComponent;
  let fixture: ComponentFixture<ResumeManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeManagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
