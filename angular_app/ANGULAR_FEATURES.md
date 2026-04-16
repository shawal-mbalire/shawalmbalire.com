# Angular 17-21 Features Implementation Guide

## Current Setup ✅

Your project already uses:
- **Angular 21.0.3** - Latest version
- **Zoneless Change Detection** - `provideZonelessChangeDetection()`
- **Standalone Components** - All components are standalone
- **New Control Flow** - `@if`, `@for`, `@switch`
- **@defer** - Deferred loading with triggers
- **Signal-based APIs** - `signal()`, `computed()`, `effect()`
- **inject()** - Dependency injection
- **input()** - Component inputs as signals

## Additional Features to Implement

### 1. Signal Queries (Angular 17.1+)
Replace `@ViewChild`, `@ContentChild` with signal-based queries.

### 2. Lifecycle Hooks (Angular 17+)
Use new render hooks: `afterRender()`, `afterNextRender()`

### 3. takeUntilDestroyed Operator
Clean up subscriptions automatically.

### 4. Signal-based Forms (Angular 19+)
Use reactive forms with signals.

### 5. resource() API (Angular 19+)
Async data loading with signals.

### 6. @let Directive (Angular 17.1+)
Template variable without `*ngIf`.

### 7. linkedSignal() (Angular 19+)
Derived signals with automatic cleanup.

---

## Implementation Examples

### Signal Queries Example
```typescript
import { Component, viewChild, viewChildren } from '@angular/core';

@Component({...})
export class ExampleComponent {
  // Signal-based view query
  readonly button = viewChild<HTMLButtonElement>('myButton');
  
  // Signal-based view children query
  readonly items = viewChildren<Element>('.item');
  
  // Content queries
  readonly projectedContent = contentChild<ElementRef>('content');
  readonly projectedItems = contentChildren<Element>('.item');
  
  ngAfterViewInit() {
    // Access the signal value
    console.log(this.button()?.offsetHeight);
  }
}
```

### Render Hooks Example
```typescript
import { Component, afterRender, afterNextRender } from '@angular/core';

@Component({...})
export class ExampleComponent {
  constructor() {
    // Runs after every render
    afterRender(() => {
      console.log('Component rendered');
    });
    
    // Runs once after next render
    afterNextRender(() => {
      // DOM manipulation, third-party libraries
      const element = document.querySelector('.my-element');
      // Initialize library...
    });
    
    // With cleanup
    afterNextRender({
      read: () => {
        const resizeObserver = new ResizeObserver(...);
        return resizeObserver;
      },
      write: (resizeObserver) => {
        // Use resizeObserver
      },
      cleanup: (resizeObserver) => {
        resizeObserver.disconnect();
      }
    });
  }
}
```

### takeUntilDestroyed Example
```typescript
import { Component, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';

@Component({...})
export class ExampleComponent {
  private readonly destroyRef = inject(DestroyRef);
  
  ngOnInit() {
    // Automatic cleanup on destroy
    someObservable$
      .pipe(takeUntilDestroyed())
      .subscribe();
    
    // Or with specific DestroyRef
    someObservable$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
```

### @let Directive Example
```html
<!-- Before -->
<ng-container *ngIf="complexCalculation() as result">
  <p>{{ result.value }}</p>
  <p>{{ result.count }}</p>
</ng-container>

<!-- After (Angular 17.1+) -->
@let result = complexCalculation();
<p>{{ result.value }}</p>
<p>{{ result.count }}</p>

<!-- With alias -->
@let user$; async as user {
  <p>{{ user.name }}</p>
}
```

### resource() API Example (Angular 19+)
```typescript
import { Component, resource } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({...})
export class ExampleComponent {
  private readonly http = inject(HttpClient);
  
  // Auto-loading resource
  readonly users = resource({
    loader: () => 
      this.http.get<User[]>('/api/users').toPromise()
  });
  
  // Resource with parameters
  readonly user = resource({
    request: () => ({ id: this.userId() }),
    loader: ({ request }) => 
      this.http.get<User>(`/api/users/${request.id}`).toPromise()
  });
  
  // Access in template
  // @if (users.value()) { ... }
  // @if (users.isLoading()) { ... }
  // @if (users.error()) { ... }
}
```

### linkedSignal() Example (Angular 19+)
```typescript
import { Component, signal, linkedSignal } from '@angular/core';

@Component({...})
export class ExampleComponent {
  userId = signal<string | null>(null);
  
  // Automatically updates when userId changes
  // Cleans up previous subscription
  user = linkedSignal({
    source: this.userId,
    loader: (userId) => this.loadUser(userId)
  });
  
  private async loadUser(id: string) {
    return fetch(`/api/users/${id}`).then(r => r.json());
  }
}
```

---

## Files to Update

### 1. Update Services with takeUntilDestroyed
- `theme.service.ts`
- `research.service.ts`
- `work-entry.service.ts`

### 2. Add Signal Queries
- `nav.component.ts` - Menu references
- `theme-switcher.component.ts` - Menu trigger

### 3. Use @let Directive
- `research.component.html`
- `experience.component.html`

### 4. Add Render Hooks
- Components with DOM manipulation
- Third-party library integrations

---

## Performance Benefits

| Feature | Benefit |
|---------|---------|
| Zoneless | ~30% faster change detection |
| Signal Queries | Type-safe, reactive |
| takeUntilDestroyed | No memory leaks |
| @defer | Lazy load components |
| resource() | Automatic loading states |

---

## Migration Priority

### High Priority (Do First)
1. ✅ Zoneless (already done)
2. ✅ Standalone components (already done)
3. ✅ New control flow (already done)
4. Add `takeUntilDestroyed` to services
5. Use signal queries

### Medium Priority
1. Add `@let` directive in templates
2. Use `afterNextRender` for DOM manipulation
3. Implement `resource()` for data loading

### Low Priority (Nice to Have)
1. `linkedSignal()` for dependent data
2. Advanced render hooks with cleanup
3. Signal-based forms

---

## Testing

```bash
# Run tests with zoneless
bun run test

# Check bundle size
bun run build:prod

# Performance profiling
# Use Chrome DevTools Performance tab
```

---

## Resources

- [Angular 17 Features](https://angular.dev/guide/whats-new#angular-v17)
- [Angular 18 Features](https://angular.dev/guide/whats-new#angular-v18)
- [Angular 19 Features](https://angular.dev/guide/whats-new#angular-v19)
- [Signals Guide](https://angular.dev/guide/signals)
- [Zoneless Guide](https://angular.dev/guide/experimental/zoneless)
