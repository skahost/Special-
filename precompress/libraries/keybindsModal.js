/* © 2023-2026 Emma (prpl.wtf) */
console.log("nebula#~ keybindsModal.js")

// Set to false to show the modal every reload
// even if the user closed the modal.
hidden=true

function hideKeybinds() {
  keybindsSiteOverlay = document.getElementById("keybindsSiteOverlay")
  keybindsContainer = document.getElementById("keybindsContainer")
  keybindsHideAlert = document.getElementById("keybindsHideAlert")
  
  keybindsSiteOverlay.style.opacity = 0
  keybindsContainer.style.opacity = 0
  keybindsContainer.style.scale = 0.98
  setTimeout(function() {
    keybindsSiteOverlay.style.display = "none"
    keybindsContainer.style.display = "none"
  }, 600)
  
  keybindsHideAlert.style.display = "inline"
  keybindsHideAlert.style.bottom = "-100px"
  setTimeout(function() {
    keybindsHideAlert.style.bottom = "15px"
  }, 20)
  setTimeout(function() {
    keybindsHideAlert.style.bottom = "-100px"
    setTimeout(function() {
      keybindsHideAlert.style.display = "none"
    }, 2000)
  }, 7500)
  hidden=true
}

function forceHideKeybinds() {
  keybindsSiteOverlay = document.getElementById("keybindsSiteOverlay")
  keybindsContainer = document.getElementById("keybindsContainer")
  
  keybindsSiteOverlay.style.opacity = 0
  keybindsContainer.style.opacity = 0
  keybindsContainer.style.scale = 0.98
  setTimeout(function() {
    keybindsSiteOverlay.style.display = "none"
    keybindsContainer.style.display = "none"
  }, 600)
  
  hidden=true
}

function showKeybinds() {
  hidden=false
  keybindsSiteOverlay = document.getElementById("keybindsSiteOverlay")
  keybindsContainer = document.getElementById("keybindsContainer")
  
  keybindsSiteOverlay.style.display = "inline"
  keybindsContainer.style.display = "inline"
  
  keybindsSiteOverlay.style.opacity = 0
  keybindsContainer.style.opacity = 0
  keybindsContainer.style.scale = 0.95
  
  setTimeout(function() {
    keybindsSiteOverlay.style.opacity = 0.5
    keybindsContainer.style.opacity = 1
    keybindsContainer.style.scale = 1
  }, 20)
}

/* allow modal to be closed with esc key */
document.onkeydown = function(evt) {
  evt = evt || window.event;
  var isEscape = false;
  if ("key" in evt) {
    isEscape = (evt.key === "Escape" || evt.key === "Esc");
  } else {
    isEscape = (evt.keyCode === 27);
  }
  if (isEscape) {
    if(!hidden) {
      hideKeybinds()
    }
  }
}