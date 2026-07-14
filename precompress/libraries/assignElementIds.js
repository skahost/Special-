/* © 2023-2026 Emma (prpl.wtf) */
console.log("nebula#~ assignElementIds.js")

function assignElements(currentPage) {
  if(currentPage == "serverTerminal") {

    // start/stop/restart button
    var powerBtnSelector = "[class*=\"ContentContainer-sc\"] > div.grid.grid-cols-4 > div + div.self-end > div.flex > button[class*=\"style-module\"]"
    
    if(document.querySelector(powerBtnSelector+":nth-child(1)")) { 
      selectedButton = document.querySelector(powerBtnSelector+":nth-child(1)")

      if(selectedButton.textContent == "Start") { selectedButton.id = "power-start" }
      if(selectedButton.textContent == "Restart") { selectedButton.id = "power-restart" }
      if(selectedButton.textContent == "Stop") { selectedButton.id = "power-stop" }
    }

    if(document.querySelector(powerBtnSelector+":nth-child(2)")) { 
      selectedButton = document.querySelector(powerBtnSelector+":nth-child(2)")

      if(selectedButton.textContent == "Start") { selectedButton.id = "power-start" }
      if(selectedButton.textContent == "Restart") { selectedButton.id = "power-restart" }
      if(selectedButton.textContent == "Stop") { selectedButton.id = "power-stop" }
    }

    if(document.querySelector(powerBtnSelector+":nth-child(3)")) { 
      selectedButton = document.querySelector(powerBtnSelector+":nth-child(3)")

      if(selectedButton.textContent == "Start") { selectedButton.id = "power-start" }
      if(selectedButton.textContent == "Restart") { selectedButton.id = "power-restart" }
      if(selectedButton.textContent == "Stop") { selectedButton.id = "power-stop" }
    }

  }
}