document.addEventListener('DOMContentLoaded', event => {
  fetch('./material-theme-creator.scss')
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
