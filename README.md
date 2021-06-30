# Material Theme Creator
How to use themes correctly on your site.

PLUS Converting Angular Material themes to CSS Custom Properties (Variables)

[Full Documentation: artik-man.github.io/material-theme-creator](https://artik-man.github.io/material-theme-creator/)

## How it works?
We use CSS Custom Properties and HSL color space for dynamic theme colors’ calculation.

```css
:root {
    --primary-h: 260;
    --primary-s: 80%;
    --primary-l: 40%;
    --primary: hsl( var(--primary-h), var(--primary-s), var(--primary-l) );
}
```
We have already created a color consisting of H, S and L components of the HSL color space. But how can we create the whole theme palette? We need to do some calculations for this.
```css
 :root {
   --primary-400: hsl(
                       calc( var(--primary-h) * var(--h-400) ),
                       calc( var(--primary-s) * var(--s-400) ),
                       calc( var(--primary-l) * var(--l-400) )
                   );
   --primary-500: hsl(
                       calc( var(--primary-h) * var(--h-500) ),
                       calc( var(--primary-s) * var(--s-500) ),
                       calc( var(--primary-l) * var(--l-500) )
                   );
 }
```
In fact, the code is a bit more complicated, but this piece of code is enough to understand the algorithm.


## Installation
  ```
npm install material-theme-creator
  ```

## 2 Create theme (SCSS)

```scss
 @use "~material-theme-creator/core" as mtc;

 // root variables initializing
 @include mtc.init();

 body {
  // Creating a theme based on some color
  // Passing arguments to the mixin:
  //   1. theme name
  //   2. some color
  //   3. contrast threshold (for fonts)
   @include mtc.create-variables-from-color('primary', #cc3300, 50%);
 }

 body.secondary-theme {
   @include mtc.update-theme('primary', #6200ee, 55%);
 }

 button {
   color: mtc.color-contrast('primary');
   background-color: mtc.color('primary');
   &:hover {
     color: mtc.color-contrast('primary', 700);
     background-color: mtc.color('primary', 700, 92%);
   }
 }
```

## 3 Create theme (Angular)
You can use ngx-mtc module to convert Angular Material themes to use CSS Custom Properties.

### Setup
```scss
@use '~@angular/material' as mat;
@use "~material-theme-creator/ngx-mtc" as ngx-mtc;
@import '~@angular/material/theming';

@include mat.core();
@include ngx-mtc.init();

$primary-map: ngx-mtc.create-theme-map('primary');
$accent-map: ngx-mtc.create-theme-map('accent');
$warn-map: ngx-mtc.create-theme-map('warn');
```

### Set up main theme

```scss
:root {
   --is-dark-theme: 1; // Is dark theme? 1 or 0;
   @include ngx-mtc.theme-base(); // Creates base colors

   // Creates theme colors
   @include ngx-mtc.create-variables-from-color('primary', #009688, 38%);
   @include ngx-mtc.create-variables-from-color('accent', #2196f3, 57%);
   @include ngx-mtc.create-variables-from-color('warn', #f44336, 62%);
 }

$primary-palette: mat.define-palette($primary-map);
$accent-palette: mat.define-palette($accent-map);
$warn-palette: mat.define-palette($warn-map);

// Custom theme
$theme: ngx-mtc.ngx-mtc-custom-theme(
    $primary-palette,
    $accent-palette,
    $warn-palette,
);

 // Creates Angular Material Theme
@include mat.all-component-themes($theme);
```

### Set up second theme
```scss
 html.second-theme {
   --is-dark-theme: 0;
   @include ngx-mtc.update-theme('primary', #142148, 45%);
   @include ngx-mtc.update-theme('accent', #658e14, 50%);
   @include ngx-mtc.update-theme('warn', #750101, 50%);
 }
```

### How to use it
Use standard Angular material mat-color and mat-contrast mixins to extract specific colors from the theme.

```scss
button {
   color: mat.contrast($primary-map, 500);
   background-color: mat.color($primary-map, 500);
   &:hover {
     color: mat.contrast($primary-map, 700);
     background-color: mat.color($primary-map, 700, 92%);
   }
 }
```
