/* © 2023-2026 Emma (prpl.wtf) */
console.log('nebula#~ fetchStyle.js');

// this will work in IE 10, 11 and Safari/Chrome/Firefox/Edge
// add ES6 poly-fill for the Promise, if needed (or rewrite to use a callback)

let fetchStyle = function (url, id) {
  return new Promise((resolve, reject) => {
    let link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.onload = () => resolve();
    link.onerror = () => reject();
    link.href = url;
    if (id) link.id = id;

    let headScript = document.querySelector('script');
    headScript.parentNode.insertBefore(link, headScript);
  });
};

let removeStyle = function (id) {
  return new Promise(() => {
    let link = document.getElementById(id);
    link.remove();
  });
};
