document.addEventListener('DOMContentLoaded', event => {
    fetch('https://raw.githubusercontent.com/Artik-Man/material-theme-creator/master/core.scss')
        .then(resp => resp.text())
        .then(resp => {
            document.getElementById('code').innerHTML = resp;

            document.querySelectorAll('pre code').forEach(block => {
                hljs.highlightBlock(block);
            });
        });

    const thm = document.getElementById('your-theme');


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
