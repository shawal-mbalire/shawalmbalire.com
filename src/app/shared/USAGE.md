# Shared Components Usage Guide

This document explains how to use the shared components in the application.

## Installation

Shared components are already part of the application. Import them from `@app/shared`:

```typescript
import { ButtonComponent, CardComponent, SectionComponent } from '@app/shared';
```

## Components

### Button

Reusable button with consistent styling across the application.

**Selector:** `<app-button>`

**Properties:**
- `variant`: `'primary' | 'secondary' | 'outline'` (default: `'primary'`)
- `size`: `'small' | 'medium' | 'large'` (default: `'medium'`)
- `disabled`: `boolean` (default: `false`)
- `type`: `'button' | 'submit' | 'reset'` (default: `'button'`)

**Events:**
- `click`: `EventEmitter<MouseEvent>`

**Example:**
```html
<!-- Primary button -->
<app-button variant="primary" (click)="handleSubmit()">
  Submit
</app-button>

<!-- Secondary button -->
<app-button variant="secondary" [disabled]="isLoading">
  Cancel
</app-button>

<!-- Outline button, small size -->
<app-button variant="outline" size="small">
  Learn More
</app-button>

<!-- Submit button in form -->
<form (ngSubmit)="onSubmit()">
  <app-button type="submit" variant="primary">
    Send Message
  </app-button>
</form>
```

**CSS Classes:**
- `.button` - Base button styles
- `.button--primary` - Primary variant (filled with secondary color)
- `.button--secondary` - Secondary variant (outlined)
- `.button--outline` - Outline variant (minimal border)
- `.button--small` - Small size
- `.button--medium` - Medium size (default)
- `.button--large` - Large size

---

### Card

Container component for grouping related content.

**Selector:** `<app-card>`

**Properties:**
- `hoverable`: `boolean` (default: `false`) - Adds hover effect
- `flush`: `boolean` (default: `false`) - Removes padding
- `class`: `string` - Additional CSS classes

**Example:**
```html
<!-- Basic card -->
<app-card>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</app-card>

<!-- Hoverable card -->
<app-card [hoverable]="true" (click)="handleCardClick()">
  <h3>Clickable Card</h3>
  <p>This card lifts on hover</p>
</app-card>

<!-- Flush card (no padding) -->
<app-card [flush]="true">
  <img src="image.jpg" alt="Full width image" />
  <div style="padding: 1.5rem;">
    <p>Content with custom padding</p>
  </div>
</app-card>

<!-- Card with custom class -->
<app-card class="custom-card">
  <p>Custom styled card</p>
</app-card>
```

**CSS Classes:**
- `.card` - Base card styles
- `.card--hoverable` - Adds hover animation
- `.card--flush` - Removes padding
- `.card__header` - Card header section
- `.card__body` - Card body section
- `.card__footer` - Card footer section

---

### Section

Layout component for page sections with consistent spacing and structure.

**Selector:** `<app-section>`

**Properties:**
- `id`: `string` - Section ID for anchor links
- `label`: `string` - Optional label above title
- `title`: `string` - Section title

**Example:**
```html
<!-- Section with label and title -->
<app-section 
  id="about" 
  label="Who I am" 
  title="About Me">
  <p>Section content goes here</p>
</app-section>

<!-- Section with just title -->
<app-section id="contact" title="Get in Touch">
  <contact-form></contact-form>
</app-section>

<!-- Minimal section -->
<app-section>
  <p>Content without automatic heading</p>
</app-section>
```

**CSS Classes:**
- `.section` - Base section styles
- `.section__content` - Content wrapper
- `.section__label` - Label badge
- `.section__title` - Section title

---

## Design Tokens

Design tokens are available for consistent styling:

```typescript
import { spacing, fontSize, borderRadius, boxShadow } from '@app/core';

// Use in components
padding: spacing.xl;        // 1.5rem
fontSize: fontSize.lg;      // 1.125rem
borderRadius: borderRadius.lg; // 0.75rem
```

**Available Tokens:**
- `spacing` - none, xs, sm, md, lg, xl, 2xl, 3xl, 4xl
- `fontSize` - xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl
- `fontWeight` - normal, medium, semibold, bold
- `borderRadius` - none, sm, md, lg, xl, 2xl, full
- `boxShadow` - none, sm, md, lg, xl, glow
- `transition` - fast, base, slow
- `breakpoints` - sm, md, lg, xl, 2xl
- `zIndex` - hide, base, dropdown, sticky, fixed, modal, popover, tooltip

---

## Best Practices

1. **Use shared components** instead of recreating buttons, cards, etc.
2. **Import from barrel exports** (`@app/shared`) for cleaner imports
3. **Use design tokens** for consistent spacing, colors, and typography
4. **Keep components simple** - add complexity only when needed
5. **Document new components** with JSDoc comments

---

## Migration Guide

### Migrating Existing Buttons

**Before:**
```html
<a href="#" class="button">Click me</a>
<button class="button" (click)="handleClick()">Submit</button>
```

**After:**
```html
<app-button variant="secondary" (click)="handleClick()">
  Click me
</app-button>

<app-button type="submit" variant="primary">
  Submit
</app-button>
```

### Migrating Existing Cards

**Before:**
```html
<div class="custom-card">
  <h3>Title</h3>
  <p>Content</p>
</div>
```

**After:**
```html
<app-card [hoverable]="true">
  <h3>Title</h3>
  <p>Content</p>
</app-card>
```

---

## Contributing

To add new shared components:

1. Create component in `src/app/shared/components/[name]/`
2. Follow the component template in REFACTORING.md
3. Add barrel export in `index.ts`
4. Document usage here
5. Add to design system tokens if needed
