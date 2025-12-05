import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef, computed, effect, inject, signal, output, input } from '@angular/core';

@Directive({
  selector: '[menu]',
  standalone: true,
  host: {
    'role': 'menu',
    '[attr.aria-orientation]': 'orientation()',
    '[tabindex]': '0'
  }
})
export class Menu {
  orientation = signal<'vertical' | 'horizontal'>('vertical');
}

@Directive({
  selector: '[menuItem]',
  standalone: true,
  host: {
    'role': 'menuitem',
    '[tabindex]': '-1',
    '(click)': 'handleClick()',
    '(keydown.enter)': 'handleClick()',
    '(keydown.space)': 'handleClick()'
  }
})
export class MenuItem {
  triggered = output<void>();

  handleClick() {
    this.triggered.emit();
  }
}

@Directive({
  selector: '[menuTriggerFor]',
  standalone: true,
  host: {
    '(click)': 'toggleMenu()',
    '[attr.aria-haspopup]': 'true',
    '[attr.aria-expanded]': 'isOpen()'
  }
})
export class MenuTrigger {
  menuTemplate = input.required<TemplateRef<unknown>>({ alias: 'menuTriggerFor' });
  
  private vcr = inject(ViewContainerRef);
  private isOpenSignal = signal(false);
  isOpen = this.isOpenSignal.asReadonly();

  toggleMenu() {
    this.isOpenSignal.update(v => !v);
    if (this.isOpenSignal()) {
      this.open();
    } else {
      this.close();
    }
  }

  private open() {
    this.vcr.createEmbeddedView(this.menuTemplate());
    // In a real implementation, we'd use CDK Overlay or similar to position it
    // For this mock, we just render it inline or append it
  }

  private close() {
    this.vcr.clear();
  }
}
