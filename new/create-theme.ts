import {MDCSlider} from "@material/slider/component";

const theme = '--my-theme';

const setVariable: (property: string, value: string) => void
    = debounce((property, value) => {
    document.documentElement.style.setProperty(property, value)
}, 100);

const h = new MDCSlider(document.querySelector('[data-id=creator-h]'));
h.listen('MDCSlider:input', (evt: CustomEvent) => {
    setVariable(`${theme}-h`, `${evt.detail.value}`)
});

const s = new MDCSlider(document.querySelector('[data-id=creator-s]'));
s.listen('MDCSlider:input', (evt: CustomEvent) => {
    setVariable(`${theme}-s`, `${evt.detail.value}`)
});

const l = new MDCSlider(document.querySelector('[data-id=creator-l]'));
l.listen('MDCSlider:input', (evt: CustomEvent) => {
    setVariable(`${theme}-l`, `${evt.detail.value}`)
});

const ccVal = document.querySelector('.-cc');
const cc = new MDCSlider(document.querySelector('[data-id=creator-cc]'));
cc.listen('MDCSlider:input', (evt: CustomEvent) => {
    setVariable(`${theme}-contrast-threshold`, `${evt.detail.value}%`)
    ccVal.innerHTML = `${evt.detail.value}%`
});


function debounce(f, ms) {
    let isCountdown = false;
    return function () {
        if (isCountdown) return;
        f.apply(this, arguments);
        isCountdown = true;
        setTimeout(() => isCountdown = false, ms);
    };
}
