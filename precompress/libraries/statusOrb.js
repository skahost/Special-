/* © 2023-2026 Emma (prpl.wtf) */
console.log("nebula#~ statusOrb.js")

function refreshStatusOrb() {
  let currentPage = nebulaCurrentPage()
  if(currentPage != "serverTerminal") return
  
  let root = document.querySelector(':root');
  let status = document.querySelector("div.style-module_2Vp6MaXq:nth-child(2) > div:nth-child(3) > div:nth-child(2)")

  if(!status) { return }

  if(status.textContent == "Offline") {
    root.style.setProperty('--statusorb-background', 'var(--statusOffline)');
    root.style.setProperty('--statusorb-animation-name', 'offline');
  } else if(status.textContent.includes("Starting") || (document.querySelector("div.style-module_2Vp6MaXq:nth-child(2) > div:nth-child(2), div.style-module_1DtraXMW.bg-red-500, div.style-module_1DtraXMW.bg-yellow-500") && document.querySelector("div.style-module_2Vp6MaXq.bg-gray-600 div.style-module_1DtraXMW.bg-yellow-500 svg.Icon___StyledSvg-sc-omsq29-0 path"))) {
    root.style.setProperty('--statusorb-background', 'var(--statusStarting)');
    root.style.setProperty('--statusorb-animation-name', 'starting');
  } else if((status.textContent.includes("h") && status.textContent.includes("m")) || (status.textContent.includes("d") && status.textContent.includes("h"))) {
    root.style.setProperty('--statusorb-background', 'var(--statusOnline)');
    root.style.setProperty('--statusorb-animation-name', 'online');
  } else {
    root.style.setProperty('--statusorb-background', 'var(--statusOffline)');
    root.style.setProperty('--statusorb-animation-name', 'offline');
  }
}