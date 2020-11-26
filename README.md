# Material Theme Creator
How to use themes correctly on your site.

PLUS Converting Angular Material themes to CSS Custom Properties (Variables)

[Full Documentation: artik-man.github.io/material-theme-creator](https://artik-man.github.io/material-theme-creator/)

## How it works?
Мы используем CSS Custom Properties и цветовое пространство HSL для динамического вычисления цветов темы.
```css
:root {
    --primary-h: 260;
    --primary-s: 80%;
    --primary-l: 40%;
    --primary: hsl( var(--primary-h), var(--primary-s), var(--primary-l) );
}
```
Так мы уже построили цвет из HSL-компонент. Но как построить целую палитру? Для этого нужно произвести некие вычисления.
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
## Installation
  ```
npm install material-theme-creator
  ```

## 2 Create theme (SCSS)

```scss
 @import "~material-theme-creator/core";

 // Инициализируем root переменные
 @include mtc-init();

 body {
   // Создадим тему на основе какого-то цвета
   // Для этого передадим:
   //   1. название темы
   //   2. цвет, на основе которого мы будем строить тему
   //   3. порог контрастности темы
   @include mtc-create-variables-from-color('primary', #cc3300, 50%);
 }

 body.secondary-theme {
   @include mtc-update-theme('primary', #6200ee, 55%);
 }

 button {
   color: mtc-color-contrast('primary');
   background-color: mtc-color('primary');
   &:hover {
     color: mtc-color-contrast('primary', 700);
     background-color: mtc-color('primary', 700, 92%);
   }
 }
```

## 3 Create theme (Angular)
### Initialization
```scss
@import "~material-theme-creator/ngx-mtc";
@import '~@angular/material/theming';

@include mat-core();
@include ngx-mtc-init();

$primary-map: ngx-mtc-create-theme-map('primary');
$accent-map: ngx-mtc-create-theme-map('accent');
$warn-map: ngx-mtc-create-theme-map('warn');
```

### Set up main theme
```scss
body {
   --is-dark-theme: 1; // Is dark theme? 1 or 0;
   @include ngx-mtc-theme-base(); // Creates base colors

   // Creates theme colors
   @include ngx-mtc-create-variables-from-color('primary', #009688, 38%);
   @include ngx-mtc-create-variables-from-color('accent', #2196f3, 57%);
   @include ngx-mtc-create-variables-from-color('warn', #f44336, 62%);
 }

 // Creates Angular Material Theme
 @include angular-material-theme(
   ngx-mtc-custom-theme(
     mat-palette($primary-map),
     mat-palette($accent-map),
     mat-palette($warn-map)
   )
 );
```

### Set up secondary theme
```scss
 body.theme2 {
   --is-dark-theme: 0;
   @include ngx-mtc-update-theme('primary', #142148, 45%);
   @include ngx-mtc-update-theme('accent', #658e14, 50%);
   @include ngx-mtc-update-theme('warn', #750101, 50%);
 }
```

### Usage
```scss
button {
   color: mat-contrast($primary-map, 500);
   background-color: mat-color($primary-map, 500);
   &:hover {
     color: mat-contrast($primary-map, 700);
     background-color: mat-color($primary-map, 700, 92%);
   }
 }
```
