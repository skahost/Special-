/* © 2023-2026 Emma (prpl.wtf) */
console.log("nebula#~ fileMode.js")

currentFileMode = ""
function filesRefresh() {
  if(filesGetCookie("filemode") == "") {filesSetCookie("filemode", "list", 90)}
  if(filesGetCookie("filemode") == "grid") {return filesGrid()}
  if(filesGetCookie("filemode") == "list") {return filesList()}
}
function switchFilesLayout() {
  if(filesGetCookie("filemode") == "grid") {return filesList()}
  if(filesGetCookie("filemode") == "list") {return filesGrid()}
}

// switch from list view to grid view
function filesGrid() {
  if(currentFileMode == "grid") return;
  currentFileMode = "grid"

  var filesGrid = document.getElementById("filesGrid")
  var filesList = document.getElementById("filesList")
  
  filesGrid.classList.add("file-manager-active")
  filesList.classList.remove("file-manager-active")

  fetchStyle("/extensions/nebula/libraries/squareFileManager.css", 'squareFileManager')
  filesSetCookie("filemode", "grid", 90)
}

// switch from grid back to list view
function filesList() {
  if(currentFileMode == "list") return;
  currentFileMode = "list"

  var filesGrid = document.getElementById("filesGrid")
  var filesList = document.getElementById("filesList")
  
  filesList.classList.add("file-manager-active")
  filesGrid.classList.remove("file-manager-active")
  filesSetCookie("filemode", "list", 90)

  removeStyle('squareFileManager')
}

function fileModeGet() { return currentFileMode }

function filesSetCookie(cname, cvalue, exdays) {const d = new Date();d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));let expires = "expires="+d.toUTCString();document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";}
function filesGetCookie(cname) {let name = cname + "=";let ca = document.cookie.split(';');for(let i = 0; i < ca.length; i++) {let c = ca[i];while (c.charAt(0) == ' ') {c = c.substring(1);}if (c.indexOf(name) == 0) {return c.substring(name.length, c.length);}}return "";}
function fileModeShow() {
  document.getElementById("fileMode").style.display = "inline";
}
function fileModeHide() {
  document.getElementById("fileMode").style.display = "none";
}