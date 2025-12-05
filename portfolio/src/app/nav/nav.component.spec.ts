import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { NavComponent} from './nav.component';
import { ThemeService } from '../theme.service';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async () => {
    if (!TestBed.platform) {
      TestBed.initTestEnvironment(
        BrowserDynamicTestingModule,
        platformBrowserDynamicTesting(),
      );
    }
    await TestBed.configureTestingModule({
      imports: [NavComponent],
      providers: [
        {
          provide: ThemeService,
          useValue: {
            getActiveTheme: () => 'light-theme',
            setActiveTheme: () => {}
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
