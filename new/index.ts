// import "./scripts/download-theme";

// document.querySelector('.markdown h1+p').remove()
// document.querySelector('.markdown h1+p').remove()
// document.querySelector('.markdown h1+p').remove()
// document.querySelector('.markdown h1').remove()

// @ts-ignore
const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')];

document.querySelectorAll('ul li').forEach(li => {
    // @ts-ignore
    // const text = [...li.childNodes].filter(n=>n.nodeName==='#text').map(n=>n.textContent).join('').trim()
    // const heading = headings.find(h => h.textContent.includes(text));
    // if (heading) {
    //     const id = text.replace(/[\s?]/g, '-');
    //     heading.id = id;
    //     li.innerHTML = `<a href="#${ id }">${ text }</a>`
    // }
    // const text = li.childNodes[0];
    // if (text.nodeName === "#text") {
    //     const title = text.nodeValue
    //     const heading = headings.find(h => h.textContent.includes(title));
    //     const id = text.nodeValue.replace(/[\s?]/g, '-');
    //     heading.id = id;
    //     const a = document.createElement('a');
    //     a.href = `#${ id }`;
    //     a.textContent = text.nodeValue;
    //     li.replaceChild(a, text)
    // }
})
