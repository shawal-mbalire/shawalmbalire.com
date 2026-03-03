import { Directive, Output, EventEmitter, signal, inject, input, HostBinding } from '@angular/core';

@Directive({
  selector: '[ngMenu]',
  exportAs: 'ngMenu',
  standalone: true,
  host: {
    'role': 'menu'
  }
})
export class Menu {
  visible = signal(false);
  @Output() onSelect = new EventEmitter<any>();

  @HostBinding('attr.data-visible')
  get dataVisible(): string {
    return this.visible() ? 'true' : 'false';
  }

  toggle() {
    this.visible.update(v => !v);
  }
}

@Directive({
  selector: '[ngMenuItem]',
  standalone: true,
  host: {
    'role': 'menuitem',
    '(click)': 'handleClick()',
    '(touchstart)': 'handleTouch($event)'
  }
})
export class MenuItem {
  value = input.required<any>();

  private menu = inject(Menu, { optional: true });

  handleClick() {
    if (this.menu) {
      this.menu.onSelect.emit(this.value());
      this.menu.visible.set(false);
    }
  }

  handleTouch(event: TouchEvent) {
    event.preventDefault();
    event.stopPropagation();
    if (this.menu) {
      this.menu.onSelect.emit(this.value());
      this.menu.visible.set(false);
    }
  }
}

@Directive({
  selector: 'button[ngMenuTrigger]',
  standalone: true,
  host: {
    '(click)': 'toggleMenu()',
    '(touchstart)': 'toggleTouchMenu($event)',
    '[attr.aria-haspopup]': 'true',
    '[attr.aria-expanded]': 'menu()?.visible()'
  }
})
export class MenuTrigger {
  menu = input.required<Menu>();

  toggleMenu() {
    this.menu().toggle();
  }

  toggleTouchMenu(event: TouchEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.menu().toggle();
  }
}
