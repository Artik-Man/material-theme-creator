document.addEventListener('DOMContentLoaded', event => {
    fetch('https://raw.githubusercontent.com/Artik-Man/material-theme-creator/master/core.scss')
        .then(resp => resp.text())
        .then(resp => {
            document.getElementById('code').innerHTML = resp;

            document.querySelectorAll('pre code').forEach(block => {
                hljs.highlightBlock(block);
            });
        });

    const thm = document.body;


    document.querySelectorAll('[data-range]').forEach(label => {
        const [v, theme, unit] = label.dataset.range.split(',');
        const input = label.querySelector('input');
        const output = label.querySelector('output');

        input.addEventListener('input', e => {
            thm.style.setProperty(`--${theme}-${v}`, e.target.value + (unit || ''));
            output.value = e.target.value;
        });
    });

});

const downloadTheme = (form) => {
    const theme = new FormData(form).get('theme').trim() || 'primary';
    const styles = window.getComputedStyle(document.body);
    const css = `    
:root {
    /* 
      Change this parameters to update your theme 
    */
    --${theme}-h: ${styles.getPropertyValue('--my-theme-h')};
    --${theme}-s: ${styles.getPropertyValue('--my-theme-s')};
    --${theme}-l: ${styles.getPropertyValue('--my-theme-l')};
    --${theme}-contrast-threshold: ${styles.getPropertyValue('--my-theme-contrast-threshold')};
    
    
    /* 
      This is your CSS variables. 
      Example:
          background: var(--${theme}-500);
          color: var(--${theme}-500-contrast);
    */
    --${theme}: hsl(var(--${theme}-h), calc(var(--${theme}-s) * 1%), calc(var(--${theme}-l) * 1%));
    --${theme}-50: hsl( var(--${theme}-h), calc(((var(--${theme}-s) - var(--mtc-light-s)) * var(--mtc-s-50) + var(--mtc-light-s)) * 1%), calc(((var(--${theme}-l) - var(--mtc-light-l)) * var(--mtc-l-50) + var(--mtc-light-l)) * 1%) );
    --${theme}-50-contrast: hsl( 0, 0%, calc(((((1 - var(--mtc-l-50)) * 100 + var(--mtc-l-50) * var(--${theme}-l)) * 1%) - var(--${theme}-contrast-threshold, 50%)) * (-100)) );
    --${theme}-100: hsl( var(--${theme}-h), calc(((var(--${theme}-s) - var(--mtc-light-s)) * var(--mtc-s-100) + var(--mtc-light-s)) * 1%), calc(((var(--${theme}-l) - var(--mtc-light-l)) * var(--mtc-l-100) + var(--mtc-light-l)) * 1%) );
    --${theme}-100-contrast: hsl( 0, 0%, calc(((((1 - var(--mtc-l-100)) * 100 + var(--mtc-l-100) * var(--${theme}-l)) * 1%) - var(--${theme}-contrast-threshold, 50%)) * (-100)) );
    --${theme}-200: hsl( var(--${theme}-h), calc(((var(--${theme}-s) - var(--mtc-light-s)) * var(--mtc-s-200) + var(--mtc-light-s)) * 1%), calc(((var(--${theme}-l) - var(--mtc-light-l)) * var(--mtc-l-200) + var(--mtc-light-l)) * 1%) );
    --${theme}-200-contrast: hsl( 0, 0%, calc(((((1 - var(--mtc-l-200)) * 100 + var(--mtc-l-200) * var(--${theme}-l)) * 1%) - var(--${theme}-contrast-threshold, 50%)) * (-100)) );
    --${theme}-300: hsl( var(--${theme}-h), calc(((var(--${theme}-s) - var(--mtc-light-s)) * var(--mtc-s-300) + var(--mtc-light-s)) * 1%), calc(((var(--${theme}-l) - var(--mtc-light-l)) * var(--mtc-l-300) + var(--mtc-light-l)) * 1%) );
    --${theme}-300-contrast: hsl( 0, 0%, calc(((((1 - var(--mtc-l-300)) * 100 + var(--mtc-l-300) * var(--${theme}-l)) * 1%) - var(--${theme}-contrast-threshold, 50%)) * (-100)) );
    --${theme}-400: hsl( var(--${theme}-h), calc(((var(--${theme}-s) - var(--mtc-light-s)) * var(--mtc-s-400) + var(--mtc-light-s)) * 1%), calc(((var(--${theme}-l) - var(--mtc-light-l)) * var(--mtc-l-400) + var(--mtc-light-l)) * 1%) );
    --${theme}-400-contrast: hsl( 0, 0%, calc(((((1 - var(--mtc-l-400)) * 100 + var(--mtc-l-400) * var(--${theme}-l)) * 1%) - var(--${theme}-contrast-threshold, 50%)) * (-100)) );
    --${theme}-500: var(--${theme});
    --${theme}-500-contrast: hsl(0, 0%, calc(((var(--${theme}-l) * 1%) - var(--${theme}-contrast-threshold, 50%)) * (-100)));
    --${theme}-600: hsl( var(--${theme}-h), calc(((1 - var(--mtc-s-600)) * 100 + var(--mtc-s-600) * var(--${theme}-s)) * 1%), calc(((1 - var(--mtc-l-600)) * var(--${theme}-l) * var(--${theme}-l) / 100 + var(--mtc-l-600) * var(--${theme}-l)) * 1%) );
    --${theme}-600-contrast: hsl( 0, 0%, calc( ((((1 - var(--mtc-l-600)) * var(--${theme}-l) * var(--${theme}-l) / 100 + var(--mtc-l-600) * var(--${theme}-l)) * 1%) - var(--${theme}-contrast-threshold, 50%)) * (-100) ) );
    --${theme}-700: hsl( var(--${theme}-h), calc(((1 - var(--mtc-s-700)) * 100 + var(--mtc-s-700) * var(--${theme}-s)) * 1%), calc(((1 - var(--mtc-l-700)) * var(--${theme}-l) * var(--${theme}-l) / 100 + var(--mtc-l-700) * var(--${theme}-l)) * 1%) );
    --${theme}-700-contrast: hsl( 0, 0%, calc( ((((1 - var(--mtc-l-700)) * var(--${theme}-l) * var(--${theme}-l) / 100 + var(--mtc-l-700) * var(--${theme}-l)) * 1%) - var(--${theme}-contrast-threshold, 50%)) * (-100) ) );
    --${theme}-800: hsl( var(--${theme}-h), calc(((1 - var(--mtc-s-800)) * 100 + var(--mtc-s-800) * var(--${theme}-s)) * 1%), calc(((1 - var(--mtc-l-800)) * var(--${theme}-l) * var(--${theme}-l) / 100 + var(--mtc-l-800) * var(--${theme}-l)) * 1%) );
    --${theme}-800-contrast: hsl( 0, 0%, calc( ((((1 - var(--mtc-l-800)) * var(--${theme}-l) * var(--${theme}-l) / 100 + var(--mtc-l-800) * var(--${theme}-l)) * 1%) - var(--${theme}-contrast-threshold, 50%)) * (-100) ) );
    --${theme}-900: hsl( var(--${theme}-h), calc(((1 - var(--mtc-s-900)) * 100 + var(--mtc-s-900) * var(--${theme}-s)) * 1%), calc(((1 - var(--mtc-l-900)) * var(--${theme}-l) * var(--${theme}-l) / 100 + var(--mtc-l-900) * var(--${theme}-l)) * 1%) );
    --${theme}-900-contrast: hsl( 0, 0%, calc( ((((1 - var(--mtc-l-900)) * var(--${theme}-l) * var(--${theme}-l) / 100 + var(--mtc-l-900) * var(--${theme}-l)) * 1%) - var(--${theme}-contrast-threshold, 50%)) * (-100) ) );
    --${theme}-A100: hsl(calc(var(--${theme}-h) * var(--mtc-h-A100)), calc(var(--mtc-s-A100) * 100%), calc(var(--mtc-l-A100) * 100%));
    --${theme}-A100-contrast: hsl(0, 0%, calc((var(--mtc-l-A100) * 100% - var(--${theme}-contrast-threshold, 50%)) * (-100)));
    --${theme}-A200: hsl(calc(var(--${theme}-h) * var(--mtc-h-A200)), calc(var(--mtc-s-A200) * 100%), calc(var(--mtc-l-A200) * 100%));
    --${theme}-A200-contrast: hsl(0, 0%, calc((var(--mtc-l-A200) * 100% - var(--${theme}-contrast-threshold, 50%)) * (-100)));
    --${theme}-A400: hsl(calc(var(--${theme}-h) * var(--mtc-h-A400)), calc(var(--mtc-s-A400) * 100%), calc(var(--mtc-l-A400) * 100%));
    --${theme}-A400-contrast: hsl(0, 0%, calc((var(--mtc-l-A400) * 100% - var(--${theme}-contrast-threshold, 50%)) * (-100)));
    --${theme}-A700: hsl(calc(var(--${theme}-h) * var(--mtc-h-A700)), calc(var(--mtc-s-A700) * 100%), calc(var(--mtc-l-A700) * 100%));
    --${theme}-A700-contrast: hsl(0, 0%, calc((var(--mtc-l-A700) * 100% - var(--${theme}-contrast-threshold, 50%)) * (-100)));
    
    
    /*
      Color weights
    */
    --mtc-h-A100: ${styles.getPropertyValue('--mtc-h-A100')};
    --mtc-h-A200: ${styles.getPropertyValue('--mtc-h-A200')};
    --mtc-h-A400: ${styles.getPropertyValue('--mtc-h-A400')};
    --mtc-h-A700: ${styles.getPropertyValue('--mtc-h-A700')};
    --mtc-s-50: ${styles.getPropertyValue('--mtc-s-50')};
    --mtc-s-100: ${styles.getPropertyValue('--mtc-s-100')};
    --mtc-s-200: ${styles.getPropertyValue('--mtc-s-200')};
    --mtc-s-300: ${styles.getPropertyValue('--mtc-s-300')};
    --mtc-s-400: ${styles.getPropertyValue('--mtc-s-400')};
    --mtc-s-600: ${styles.getPropertyValue('--mtc-s-600')};
    --mtc-s-700: ${styles.getPropertyValue('--mtc-s-700')};
    --mtc-s-800: ${styles.getPropertyValue('--mtc-s-800')};
    --mtc-s-900: ${styles.getPropertyValue('--mtc-s-900')};
    --mtc-s-A100: ${styles.getPropertyValue('--mtc-s-A100')};
    --mtc-s-A200: ${styles.getPropertyValue('--mtc-s-A200')};
    --mtc-s-A400: ${styles.getPropertyValue('--mtc-s-A400')};
    --mtc-s-A700: ${styles.getPropertyValue('--mtc-s-A700')};
    --mtc-l-50: ${styles.getPropertyValue('--mtc-l-50')};
    --mtc-l-100: ${styles.getPropertyValue('--mtc-l-100')};
    --mtc-l-200: ${styles.getPropertyValue('--mtc-l-200')};
    --mtc-l-300: ${styles.getPropertyValue('--mtc-l-300')};
    --mtc-l-400: ${styles.getPropertyValue('--mtc-l-400')};
    --mtc-l-600: ${styles.getPropertyValue('--mtc-l-600')};
    --mtc-l-700: ${styles.getPropertyValue('--mtc-l-700')};
    --mtc-l-800: ${styles.getPropertyValue('--mtc-l-800')};
    --mtc-l-900: ${styles.getPropertyValue('--mtc-l-900')};
    --mtc-l-A100: ${styles.getPropertyValue('--mtc-l-A100')};
    --mtc-l-A200: ${styles.getPropertyValue('--mtc-l-A200')};
    --mtc-l-A400: ${styles.getPropertyValue('--mtc-l-A400')};
    --mtc-l-A700: ${styles.getPropertyValue('--mtc-l-A700')};
    --mtc-light-h: ${styles.getPropertyValue('--mtc-light-h')};
    --mtc-light-s: ${styles.getPropertyValue('--mtc-light-s')};
    --mtc-light-l: ${styles.getPropertyValue('--mtc-light-l')};
}
    `;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(css));
    element.setAttribute('download', `${theme}.css`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

const test = (index = 'A100', accuracy = 0.01, start = {h: 0, s: 0, l: 0}, end = {h: 1, s: 1, l: 1}) => {

    const materialVariableElements = {};
    const creatorVariableElements = {};

    [...document.querySelector('.themes').children].forEach((theme, i) => {
        if (i % 2 === 0) {
            [...theme.children].forEach(el => {
                const point = materialVariableElements[el.innerText];
                if (point) {
                    point.push(el);
                } else {
                    materialVariableElements[el.innerText] = [el];
                }
            })
        } else {
            [...theme.children].forEach(el => {
                const point = creatorVariableElements[el.innerText];
                if (point) {
                    point.push(el);
                } else {
                    creatorVariableElements[el.innerText] = [el];
                }
            })
        }
    });


    const distance = (c1, c2) => {
        return Math.sqrt(Math.pow(c1.r - c2.r, 2) + Math.pow(c1.g - c2.g, 2) + Math.pow(c1.b - c2.b, 2))
    };

    const getColor = (element) => {
        const color = window.getComputedStyle(element).getPropertyValue('background-color');
        const [r, g, b] = color.match(/\d+/g).map(x => +x);
        return {r, g, b}
    };

    const setVariable = (element, index, variables) => {
        Object.keys(variables).forEach(property => {
            element.style.setProperty(`--${property}${index}`, variables[property]);
        })
    };


    let variables = {
        h: start.h,
        s: start.s,
        l: start.l
    };

    let lastDistance = 999999999;
    for (let h = start.h; h <= end.h; h += accuracy) {
        for (let s = start.s; s <= end.s; s += accuracy) {
            for (let l = start.l; l <= end.l; l += accuracy) {
                let currentDistance = 0;
                creatorVariableElements[index].forEach((currentElement, i) => {
                    const varElement = currentElement.parentElement;
                    setVariable(varElement, index, {h, s, l});
                    const refElement = materialVariableElements[index][i];
                    const refColor = getColor(refElement);
                    const currentColor = getColor(currentElement);
                    currentDistance += distance(refColor, currentColor);
                });
                if (currentDistance < lastDistance) {
                    lastDistance = currentDistance;
                    variables = {h, s, l};
                    console.log(index, currentDistance, variables);
                }
            }
        }
    }

    creatorVariableElements[index].forEach(currentElement => {
        setVariable(currentElement.parentElement, index, variables);
    });


    console.log(index, variables);
    return {
        [index]: variables
    }
};
