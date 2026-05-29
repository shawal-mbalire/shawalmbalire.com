# Codebase Refactoring Plan

## Goals
1. **Modularity** - Separate concerns, reusable components
2. **Readability** - Clear naming, consistent patterns, documentation
3. **Maintainability** - Easy to update, test, and extend

## Current Issues

### 1. Inconsistent Component Structure
- Some components have index.ts barrel exports, others don't
- Mixed naming conventions for CSS classes
- Inline templates vs external templates

### 2. Service Organization
- Services in core/services but no clear categorization
- No abstract base classes for common patterns
- Missing error handling in services

### 3. Styling Inconsistencies
- Global styles mixed with component styles
- No design token system
- BEM naming not consistently applied

### 4. Type Safety
- Some services use `any` types
- Missing strict null checks in some areas
- Inconsistent use of readonly signals

## Proposed Improvements

### Phase 1: Component Standardization ✅
- [x] All components use external templates
- [x] All components have index.ts barrel exports
- [x] Consistent CSS class naming with BEM
- [ ] Add component documentation comments

### Phase 2: Service Layer Improvements
- [ ] Create base service class with common patterns
- [ ] Add error handling to all services
- [ ] Implement proper loading states
- [ ] Add caching where appropriate

### Phase 3: Shared UI Components
- [ ] Create Button component (reusable)
- [ ] Create Card component
- [ ] Create Section/Header components
- [ ] Create Icon component
- [ ] Create Skeleton loader components

### Phase 4: Design System
- [ ] Create design tokens file
- [ ] Document color palette
- [ ] Document typography scale
- [ ] Document spacing system
- [ ] Create Storybook (optional)

### Phase 5: State Management
- [ ] Centralize app state (optional: use Signal Store)
- [ ] Create proper state interfaces
- [ ] Add state persistence layer

### Phase 6: Testing
- [ ] Add unit tests for services
- [ ] Add component tests
- [ ] Add integration tests
- [ ] Set up test coverage reporting

### Phase 7: Performance
- [ ] Add lazy loading for routes
- [ ] Optimize bundle size
- [ ] Add performance monitoring
- [ ] Implement proper image optimization

## Implementation Priority

1. **High Priority** (Do First)
   - Shared UI components (Button, Card)
   - Service error handling
   - Design tokens

2. **Medium Priority** (Do Second)
   - Component documentation
   - Testing infrastructure
   - Performance optimizations

3. **Low Priority** (Nice to Have)
   - Storybook
   - Advanced state management
   - Monitoring

## File Structure After Refactoring

```
src/app/
├── core/
│   ├── models/           # TypeScript interfaces
│   ├── services/         # Base services
│   │   ├── base.service.ts
│   │   ├── theme.service.ts
│   │   └── ...
│   ├── constants/        # App constants
│   ├── guards/           # Route guards
│   ├── interceptors/     # HTTP interceptors
│   ├── pipes/            # Shared pipes
│   └── index.ts
│
├── shared/               # NEW: Shared components
│   ├── components/
│   │   ├── button/
│   │   ├── card/
│   │   ├── section/
│   │   ├── skeleton/
│   │   └── index.ts
│   ├── directives/
│   │   └── index.ts
│   └── index.ts
│
├── features/             # RENAMED: Feature modules
│   ├── home/
│   ├── about/
│   ├── experience/
│   ├── contact/
│   └── ...
│
├── layout/               # NEW: Layout components
│   ├── header/
│   ├── footer/
│   └── nav/
│
└── app.component.ts
```

## Coding Standards

### Component Template
```typescript
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Component description - what it does and when to use it
 * 
 * @example
 * ```html
 * <app-component-name [input]="value" (output)="handler($event)"></app-component-name>
 * ```
 */
@Component({
  selector: 'app-component-name',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './component-name.component.html',
  styleUrl: './component-name.component.css'
})
export class ComponentNameComponent {
  private readonly service = inject(ServiceName);
  
  // Signals
  readonly data = signal<Data | null>(null);
  
  // Methods
  handleAction(): void {
    // Implementation
  }
}
```

### Service Template
```typescript
import { Injectable, signal, computed } from '@angular/core';

/**
 * Service description - responsibilities and usage
 */
@Injectable({
  providedIn: 'root'
})
export class ServiceNameService {
  // State
  private readonly loading = signal(false);
  private readonly error = signal<string | null>(null);
  
  // Public signals
  readonly data = computed(() => this._data());
  readonly isLoading = this.loading.asReadonly();
  readonly hasError = computed(() => this.error() !== null);
  
  async fetchData(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    
    try {
      // Fetch logic
    } catch (err) {
      this.error.set('Error message');
    } finally {
      this.loading.set(false);
    }
  }
}
```

### CSS Organization (BEM)
```css
/* Block */
.component {
  /* Layout */
}

/* Elements */
.component__element {
  /* Styles */
}

/* Modifiers */
.component--modifier {
  /* Modified styles */
}

.component__element--modifier {
  /* Modified element styles */
}

/* States */
.is-active {
  /* State styles */
}

/* Responsive */
@media (max-width: 768px) {
  .component {
    /* Mobile styles */
  }
}
```

## Next Steps

1. Review this plan and prioritize
2. Start with Phase 3 (Shared UI Components)
3. Create design tokens
4. Gradually refactor existing components to use shared components
5. Add tests as we refactor
