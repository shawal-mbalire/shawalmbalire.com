import { Directive, Output, EventEmitter, signal, inject, input } from '@angular/core';

@Directive({
  selector: '[ngMenu]',
  exportAs: 'ngMenu',
  standalone: true,
  host: {
    'role': 'menu',
    '[attr.data-visible]': 'visible()'
  }
})
export class Menu {
  visible = signal(false);
  @Output() onSelect = new EventEmitter<any>();
  
  toggle() {
    this.visible.update(v => !v);
  }
}

@Directive({
  selector: '[ngMenuItem]',
  standalone: true,
  host: {
    'role': 'menuitem',
    '(click)': 'handleClick()'
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
}

@Directive({
  selector: 'button[ngMenuTrigger]',
  standalone: true,
  host: {
    '(click)': 'toggleMenu()',
    '[attr.aria-haspopup]': 'true',
    '[attr.aria-expanded]': 'menu()?.visible()'
  }
})
export class MenuTrigger {
  menu = input.required<Menu>();
  
  toggleMenu() {
    this.menu().toggle();
  }
}
