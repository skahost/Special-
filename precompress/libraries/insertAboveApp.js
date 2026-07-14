/* © 2023-2026 Emma (prpl.wtf) */
console.log("nebula#~ insertAboveApp.js")

function insertAboveApp(selector) {

  const foo = document.querySelector(selector);
  const bar = document.querySelector('.App___StyledDiv-sc-2l91w7-0');

  if (!foo || !bar) {
    throw new Error('Elements could not be found.');
  }

  const fooPrevSibling = foo.previousElementSibling;

  bar.parentNode.insertBefore(foo, bar);

  if (fooPrevSibling) {
    fooPrevSibling.parentNode.insertBefore(bar, fooPrevSibling.nextSibling);
  } else {
    foo.parentNode.insertBefore(bar, foo.parentNode.firstChild);
  }

};