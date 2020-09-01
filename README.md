# Material Theme Creator
Converting Angular Material themes to CSS Custom Properties (Variables)

```scss
@import '~material-theme-creator/core';

@include mtc-init();
body.theme-1 {
    @include create-variables-from-color('my-theme', hsl(200, 70%, 40%), 50%);
}

body.theme-2 {
    @include create-variables-from-color('my-theme', #cc3300, 50%);
}

button {
    background-color: var(--my-theme);
    color: var(--my-theme-contrast);
    &:hover {
        background-color: var(--my-theme-700);
        color: var(--my-theme-700-contrast);
    }
}
```

## 1 Installation
  ```
npm install material-theme-creator
  ```

## 2 Create theme
You can create a theme from one color or from color-map
### 2.1 Angular Material: Create a theme from color
```scss
  @import '~@angular/material/theming';
  @import "~material-theme-creator/core";

  @include mat-core();

  $primary-map: create-theme-map('primary');
  $accent-map: create-theme-map('accent');
  $warn-map: create-theme-map('warn');

  @include mtc-init();
  :root {
    @include create-variables-from-color('primary', #009688, 38%);
    @include create-variables-from-color('accent', #2196f3, 58%);
    @include create-variables-from-color('warn', #f44336, 62%);
  }

  // Light theme
  @include angular-material-theme(mat-light-theme(mat-palette($primary-map), mat-palette($accent-map), mat-palette($warn-map)));
  // Dark theme
  //@include angular-material-theme(mat-dark-theme(mat-palette($primary-map), mat-palette($accent-map), mat-palette($warn-map)));
```

### 2.2 Angular Material: Create a theme from color map
```scss

  @import '~@angular/material/theming';
  @import "~material-theme-creator/core";

  @include mat-core();

  $primary-map: create-theme-map('primary');
  $accent-map: create-theme-map('accent');
  $warn-map: create-theme-map('warn');

  @include mtc-init();
  :root {
    @include create-variables-from-map('primary', $mat-teal);
    @include create-variables-from-map('accent', $mat-deep-purple);
    @include create-variables-from-map('warn', $mat-red);
  }

  // Light theme
  @include angular-material-theme(mat-light-theme(mat-palette($primary-map), mat-palette($accent-map), mat-palette($warn-map)));
  // Dark theme
  //@include angular-material-theme(mat-dark-theme(mat-palette($primary-map), mat-palette($accent-map), mat-palette($warn-map)));
```

## 3 Usage
```scss
  // Material get color (https://material.angular.io/guide/theming-your-components)
  .primary {
    background: mat-color($primary-map, 400);
    color: mat-contrast($primary-map, 400);
  }
  .accent {
    background: mat-color($accent-map);
    color: mat-contrast($accent-map);
  }
  .warn {
    background: mat-color($warn-map, A100);
    color: mat-contrast($warn-map, A100);
  }
```

```scss

  // Pure CSS
  button {
    background-color: var(--primary);
    color: var(--primary-contrast);
  }
  button:hover {
    background-color: var(--primary-700);
    color: var(--primary-700-contrast);
  }
  button.accent {
    background-color: var(--accent);
  }
```
