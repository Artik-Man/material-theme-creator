# Material Theme Creator

How to use themes correctly on your site.

PLUS Converting Angular Material themes to CSS Custom Properties (Variables)

[Full Documentation: artik-man.github.io/material-theme-creator](https://artik-man.github.io/material-theme-creator/)

## Contents

- How it works?
- How to use Material Theme Creator
    - Pure CSS use
    - Use with SCSS
    - Use with Angular Material
- Description of functionality

## How it works?

We use CSS Custom Properties and HSL color space for dynamic theme colors’ calculation.

```css
:root {
    --primary-h: 260;
    --primary-s: 80%;
    --primary-l: 40%;
    --primary: hsl(var(--primary-h), var(--primary-s), var(--primary-l));
}
```

We have already created a color consisting of H, S and L components of the HSL color space. But how can we create the
whole theme palette? We need to do some calculations for this.

```css
 :root {
    --primary-400: hsl(
            calc(var(--primary-h) * var(--h-400)),
            calc(var(--primary-s) * var(--s-400)),
            calc(var(--primary-l) * var(--l-400))
    );
    --primary-500: hsl(
            calc(var(--primary-h) * var(--h-500)),
            calc(var(--primary-s) * var(--s-500)),
            calc(var(--primary-l) * var(--l-500))
    );
}
```

In fact, the code is a bit more complicated, but this piece of code is enough to understand the algorithm.

## How to use Material Theme Creator

### 1. Pure CSS use

You can download your theme by clicking on the button "Download theme" which is located above. Then you should include
it to your page in any convenient way. For example:

```html

<link href="./my-theme.css" rel="stylesheet">
```

After that you can create the second theme style:

```css
.second-theme {
    --my-theme-h: 190;
    --my-theme-s: 80;
    --my-theme-l: 40;
    --my-theme-contrast-threshold: 50%;
}
```

And you can apply the theme with some button:

```javascript
const changeThemeButton = document.querySelector('button.change-theme-btn');

changeThemeButton.addEventListener('click', () => {
    document.documentElement.classList.toggle('second-theme');
});
```

How can you use theme on your elements? 14 theme colors will be available for you. For each of these colors you will
have access to one contrasting color. See example:

```css
button {
    background-color: var(--my-theme);
    color: var(--my-theme-contrast);
}

button:hover {
    background-color: var(--my-theme-700);
    color: var(--my-theme-700-contrast);
}
```

How can we set transparency of the color? You can adjust it yourself:

```css
div {
    background-color: hsla(
            var(--my-theme-500-h),
            var(--my-theme-500-s),
            var(--my-theme-500-l),
            62% /* alpha */
    );
}
```

-------------------------

### 2. Use with SCSS

You can have more options to manage the theme if you use SCSS.

#### Installation:

```bash
npm install material-theme-creator
```

#### Use:

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

-------------------------

### 3. Use with [Angular Material](https://material.angular.io/)

You can use ngx-mtc module to convert Angular Material themes to use CSS Custom Properties.

#### Installation:

```bash
npm install material-theme-creator
```

#### Setup

```scss
@use '~@angular/material' as mat;
@use "~material-theme-creator/ngx-mtc" as ngx-mtc;

@include mat.core();
@include ngx-mtc.init();

$primary-map: ngx-mtc.create-theme-map('primary');
$accent-map: ngx-mtc.create-theme-map('accent');
$warn-map: ngx-mtc.create-theme-map('warn');
```

#### Set up main theme

Use `ngx-mtc.create-variables-from-color` to create theme from one color. In this case, each theme will consist of just
a few lines of code.

You can also use `ngx-mtc.create-variables-from-map` to create theme from color-map like `mat.$red-palette`

WARNING:
The `mat.define-light-theme` and `mat.define-dark-theme` mixins generate a lot of CSS code for each theme. Use this as
sparingly as possible.

```scss
:root {
  --is-dark-theme: 1; // Is dark theme? 1 or 0;
  @include ngx-mtc.theme-base(); // Creates base colors

  // Creates theme colors
  @include ngx-mtc.create-variables-from-color('primary', #009688, 38%); // can update
  @include ngx-mtc.create-variables-from-color('accent', #2196f3, 57%); // can update
  @include ngx-mtc.create-variables-from-map('warn', mat.$red-palette); // can not update this theme
}

$primary-palette: mat.define-palette($primary-map);
$accent-palette: mat.define-palette($accent-map);
$warn-palette: mat.define-palette($warn-map);

// Custom theme
$theme: ngx-mtc.custom-theme($primary-palette, $accent-palette, $warn-palette);

// Creates Angular Material Theme
@include mat.all-component-themes($theme);
```

#### Set up second theme

```scss
 html.second-theme {
  --is-dark-theme: 0;
  @include ngx-mtc.update-theme('primary', #142148, 45%);
  @include ngx-mtc.update-theme('accent', #658e14, 50%);
}
```

#### How to use

Use standard Angular material `mat.color` and `mat.contrast` mixins to extract specific colors from the theme.

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

## Description of functionality

### Core

```scss
@use '~material-theme-creator/core' as mtc;
```

#### init()

Library Initialization

```scss
@include mtc.init()
```

#### create-variables-from-color($theme-name, $color, $contrast-threshold: 50%)

Creates CSS Custom Properties for mat-palette from one color

```scss
:root {
  @include mtc.create-variables-from-color('primary', #f00, 45%);
}
```

Returns CSS Custom Properties:

```css
:root {
    --primary: hsl(...);
    --primary-50: hsl(...);
    --primary-50-contrast: hsl(...);
    --primary-100: hsl(...);
    --primary-100-contrast: hsl(...);
    /*...*/
    --primary-A700: hsl(...);
    --primary-A700-contrast: hsl(...);
}
```

#### update-theme($theme-name, $color, $contrast-threshold: 50%)

Update theme

```scss
.second-theme {
  @include mtc.update-theme('primary', hsl(212, 95%, 80%), 55%);
}
```

Returns CSS Custom Properties: Hue, Lightness, Saturation for CSS Color and contrast threshold for this theme

```css
.second-theme {
    --primary-h: 212;
    --primary-s: 95;
    --primary-l: 80;
    --primary-contrast-threshold: 50%;
}
```

#### color($theme-name, $index: 500, $alpha: 100%)

Get theme color

```scss
button {
  background: mtc.color('primary', 400, 70%);
}
```

#### color-contrast($theme-name, $index: 500)

Get theme contrast color

```scss
button {
  color: mtc.color-contrast('primary', 400);
}
```

#### theme-component($min:0, $max:100, $unit: 1, $dark-theme-variable: --is-dark-theme)

Returns a value according to the current theme (light/dark)
Based on CSS Custom Properties

```scss
main {
  background: hsl(123deg, 85%, #{mtc.theme-component(34, 72, 1%)});
}
```

In light theme:

```css
main {
    background: hsl(123deg, 85%, 34%);
}
```

In dark theme:

```css
main {
    background: hsl(123deg, 85%, 72%);
}
```

#### theme-color($light, $dark, $dark-theme-variable: --is-dark-theme)

Returns a color according to current theme (light/dark)
Based on CSS Custom Properties

```scss
main {
  background: mtc.theme-color(#fff, #333);
}
```

In light theme:

```css
main {
    background: #fff;
}
```

In dark theme:

```css
main {
    background: #333;
}
```

### NGX

```scss
@use '~material-theme-creator/ngx-mtc' as ngx-mtc;
```

#### init()

Library Initialization

```scss
@include ngx-mtc.init();
```

#### create-variables-from-color($theme-name, $color, $contrast-threshold: 50%)

Creates CSS Custom Properties for mat-palette from one color

```scss
:root {
  @include ngx-mtc.create-variables-from-color('primary', #f00, 45%);
}
```

Returns CSS Custom Properties:

```css
:root {
    --primary: hsl(...);
    --primary-50: hsl(...);
    --primary-50-contrast: hsl(...);
    --primary-100: hsl(...);
    --primary-100-contrast: hsl(...);
    /*...*/
    --primary-A700: hsl(...);
    --primary-A700-contrast: hsl(...);
}
```

#### create-variables-from-map($theme-name, $theme-map)

Creates CSS Custom Properties for mat-palette from mat-palette

You can use theme-map from `~@angular/material/core/theming/_palette` (e.g. `$red-palette` or `$pink-palette`...)

```scss
  @include ngx-mtc.create-variables-from-map('primary', mat.$red-palette);
```

Returns CSS Custom Properties:

```css
:root {
    --primary: hsl(...);
    --primary-50: hsl(...);
    --primary-50-contrast: hsl(...);
    --primary-100: hsl(...);
    --primary-100-contrast: hsl(...);
    /*...*/
    --primary-A700: hsl(...);
    --primary-A700-contrast: hsl(...);
}
```

#### theme-base()

Creates base colors CSS Variables for angular material theme.

```scss
:root {
  @include ngx-mtc.theme-base();
}
```

Returns CSS Custom Properties:

```css
:root {
    --mtc-background-status-bar: hsl(...);
    --mtc-background-app-bar: hsl(...);
    --mtc-background-background: hsl(...);
    --mtc-background-hover: hsl(...);
    /*...*/
    --mtc-foreground-slider-off-active: hsl(...);
```

#### update-theme($theme-name, $color, $contrast-threshold: 50%)

Update theme

```scss
.second-theme {
  @include ngx-mtc.update-theme('primary', hsl(212, 95%, 80%), 55%);
}
```

Returns CSS Custom Properties: Hue, Lightness, Saturation for CSS Color and contrast threshold for this theme

```css
.second-theme {
    --primary-h: 212;
    --primary-s: 95;
    --primary-l: 80;
    --primary-contrast-threshold: 50%;
}
```

#### create-theme-map($theme-name)

Creates a theme-map for use in Angular Material

```scss
$primary-map: ngx-mtc.create-theme-map('primary');
```

#### custom-theme($primary, $accent, $warn)

Set base colors CSS Variables into angular material

```scss
$primary-palette: mat.define-palette($primary-map);
$accent-palette: mat.define-palette($accent-map);
$warn-palette: mat.define-palette($warn-map);

$theme: ngx-mtc.custom-theme($primary-palette, $accent-palette, $warn-palette);
```

#### color($theme-name, $index: 500, $alpha: 100%)

Get theme color

```scss
button {
  background: ngx-mtc.color('primary', 400, 70%);
}
```

#### color-contrast($theme-name, $index: 500)

Get theme contrast color

```scss
button {
  color: ngx-mtc.color-contrast('primary', 400);
}
```

#### theme-color($light, $dark, $dark-theme-variable: --is-dark-theme)

Returns a color according to current theme (light/dark)
Based on CSS Custom Properties

```scss
main {
  background: ngx-mtc.theme-color(#fff, #333);
}
```

In light theme:

```css
main {
    background: #fff;
}
```

In dark theme:

```css
main {
    background: #333;
}
```
