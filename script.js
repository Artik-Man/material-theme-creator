document.addEventListener('DOMContentLoaded', event => {
    fetch('./material-theme-creator.scss')
      .then(resp => resp.text())
      .then(resp => {
        document.getElementById('code').innerHTML = resp;

        document.querySelectorAll('pre code').forEach(block => {
          hljs.highlightBlock(block);
        });
      });
  });