document.addEventListener('DOMContentLoaded', event => {
  fetch('./material-theme-creator.scss')
    .then(resp => resp.text())
    .then(resp => {
      document.getElementById('code').innerHTML = resp;

      document.querySelectorAll('pre code').forEach(block => {
        hljs.highlightBlock(block);
      });
    });

  const hue = document.getElementById('hue');
  const sat = document.getElementById('sat');
  const lig = document.getElementById('lig');
  const con = document.getElementById('con');
  const thm = document.getElementById('your-theme');

  hue.addEventListener('input', e => {
    thm.style.setProperty('--primary-h', e.target.value);
  });

  sat.addEventListener('input', e => {
    thm.style.setProperty('--primary-s', e.target.value);
  });

  lig.addEventListener('input', e => {
    thm.style.setProperty('--primary-l', e.target.value);
  });

  con.addEventListener('input', e => {
    thm.style.setProperty('--primary-contrast-threshold', e.target.value + '%');
  });
});
