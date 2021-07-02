import "../styles/index.scss";
import "./create-theme.ts";
import "./download-theme.ts";
import "./highlight.ts";

document.querySelector('.markdown h1+p').remove()
document.querySelector('.markdown h1+p').remove()
document.querySelector('.markdown h1+p').remove()
document.querySelector('.markdown h1').remove()

// @ts-ignore
const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')];

document.querySelectorAll('ul li').forEach(li => {
    const text = li.childNodes[0];
    if (text.nodeName === "#text") {
        const title = text.nodeValue
        const heading = headings.find(h => h.textContent.includes(title));
        const id = text.nodeValue.replace(/[\s?]/g, '-');
        heading.id = id;
        const a = document.createElement('a');
        a.href = `#${ id }`;
        a.textContent = text.nodeValue;
        li.replaceChild(a, text)
    }

})
