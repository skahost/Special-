/* © 2023-2026 Emma (prpl.wtf) */
console.log("nebula#~ viewportVisibility.js")

function isElementNotFullyVisible(element) {
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

  const isOutOfViewport = 
    rect.top < 0 || 
    rect.left < 0 || 
    rect.bottom > viewportHeight || 
    rect.right > viewportWidth;

  return isOutOfViewport;
}