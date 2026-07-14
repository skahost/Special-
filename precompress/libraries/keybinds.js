/* © 2023-2026 Emma (prpl.wtf) */
console.log("nebula#~ keybinds.js")

function doc_keyDown(e) {
  if(window.MultitaskingEnabled) {return;}
  let currentPage = nebulaCurrentPage()

  // ==========================
  //      VIEW KEYBINDS
  // ==========================
  if((e.ctrlKey || e.altKey) && (
    e.keyCode === 191 ||                // CTRL/ALT + /
    e.keyCode === 111 ||                // CTRL/ALT + NUMPAD_/
    e.keyCode === 220                   // CTRL/ALT + \
  )){
    e.preventDefault()
    sidebarRefresh()
    showKeybinds()
  }


  // ==========================
  //           HOME
  // ==========================
  if(
    (e.ctrlKey && e.keyCode === 27)     // CTRL + ESC
  ){
    e.preventDefault()
    sidebarRefresh()
    forceHideKeybinds()
    sidebarButtonEvent('home')
  }


  // ==========================
  //         ACCOUNT
  // ==========================
  if(
    (e.ctrlKey && e.keyCode === 190)    // CTRL + .
  ){
    e.preventDefault()
    sidebarRefresh()
    forceHideKeybinds()
    sidebarButtonEvent('accountAccount')
  }

  // ==========================
  //          SEARCH
  // ==========================
  if(
    (e.altKey && e.keyCode === 70) ||  // ALT + F
    (e.ctrlKey && e.keyCode === 75)    // CTRL + K
  ){
    e.preventDefault()
    sidebarRefresh()
    forceHideKeybinds()
    document.querySelector(".NavigationBar__RightNavigation-sc-tupl2x-0 > .navigation-link:has(.fa-search)").click()
  }


  // ==========================
  //          ADMIN
  // ==========================
  if(
    (e.ctrlKey && e.keyCode === 188)    // CTRL + ,
  ){
    if(!rootAdmin) {return}
    e.preventDefault()
    sidebarRefresh()
    forceHideKeybinds()
    window.location = "/admin"
  }
  // Create new server
  if((e.altKey && e.keyCode === 78) && rootAdmin){
    e.preventDefault();forceHideKeybinds();window.location = "/admin/servers/new"
  }
  // Edit current server
  if((e.altKey && e.keyCode === 69) && rootAdmin){
    e.preventDefault();forceHideKeybinds();document.querySelector("a[href*='/admin/servers/view/']").click()
  }
  // Open Nebula Designer
  if((e.ctrlKey && e.keyCode === 68) && rootAdmin){
    e.preventDefault();
    forceHideKeybinds();

    let overlayDiv = document.createElement("div")
    let spinnerOverlay = document.createElement("div")
    spinnerOverlay.innerHTML = `
      <div id="DesignerSpinnerContainer" style="position: absolute; left: 50%; top: 50%; width: 50%; -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%);">
        <p style="text-align: center">
          <svg width="30" height="30" style="display: inline !important" stroke="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><style>.spinner_V8m1{transform-origin:center;animation:spinner_zKoa 2s linear infinite}.spinner_V8m1 circle{stroke-linecap:round;animation:spinner_YpZS 1.5s ease-in-out infinite}@keyframes spinner_zKoa{100%{transform:rotate(360deg)}}@keyframes spinner_YpZS{0%{stroke-dasharray:0 150;stroke-dashoffset:0}47.5%{stroke-dasharray:42 150;stroke-dashoffset:-16}95%,100%{stroke-dasharray:42 150;stroke-dashoffset:-59}}</style><g class="spinner_V8m1"><circle cx="12" cy="12" r="9.5" fill="none" stroke-width="3"></circle></g></svg>
        </p>
      </div>
    `
    spinnerOverlay.style = `
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 2147483647;
    `
    overlayDiv.style = `
      position: fixed;
      left: 0;
      top: 0;
      width: 0%;
      height: 100%;
      background-color: #050404;
      z-index: 2147483646;
      transition: width 1s, height 1s;
    `
    document.body.append(overlayDiv)
    document.body.append(spinnerOverlay)
    setTimeout(() => {
      overlayDiv.style.width = "100%"
    }, 25);
    setTimeout(() => {
      let url = new URL(window.location)
      window.location = "{webroot/public}/editor/edit/dashboard.php?source=panel&animate=true&location="+url
    }, 1025);
  }


  // ==========================
  //     TERMINAL/ACCOUNT
  // ==========================
  if(
    (e.ctrlKey && e.keyCode === 49) ||  // CTRL + 1
    (e.altKey && e.keyCode === 190)     // ALT + .
  ){
    e.preventDefault()
    sidebarRefresh()
    forceHideKeybinds()
    if(currentPage.startsWith("server")) { sidebarButtonEvent('serverTerminal') }
    if(currentPage.startsWith("account")) { sidebarButtonEvent('accountAccount') }
  }
  if(currentPage === "serverTerminal") {
    // Start server
    if((e.altKey && e.keyCode === 90)){e.preventDefault();forceHideKeybinds();document.querySelector("#power-start").click()}
    // Stop server
    if((e.altKey && e.keyCode === 88)){e.preventDefault();forceHideKeybinds();document.querySelector("#power-stop").click()}
    // Restart server
    if((e.altKey && e.keyCode === 67)){e.preventDefault();forceHideKeybinds();document.querySelector("#power-restart").click()}

    // Copy IP Address
    if((e.altKey && e.keyCode === 65)){e.preventDefault();forceHideKeybinds();document.querySelector(".flex.flex-col.justify-center.overflow-hidden.w-full > div.w-full.font-semibold.text-gray-50.truncate").click()}
  }


  // ==========================
  //        FILES/API
  // ==========================
  if(
    (e.ctrlKey && e.keyCode === 50) ||  // CTRL + 2
    (e.altKey && e.keyCode === 188)     // ALT + ,
  ){
    e.preventDefault()
    sidebarRefresh()
    forceHideKeybinds()
    if(currentPage.startsWith("server")) { sidebarButtonEvent('serverFiles') }
    if(currentPage.startsWith("account")) { sidebarButtonEvent('accountApi') }
  }
  if(currentPage === "serverFiles") {
    // Switch Layout
    if((e.altKey && e.keyCode === 90)){e.preventDefault();forceHideKeybinds();switchFilesLayout()}

    // New File
    if((e.altKey && e.keyCode === 219)){e.preventDefault();forceHideKeybinds();document.querySelector(".style-module_3Y7xosru > a[href*='/server/12e77b22/files/new']").click()}
    // New Directory
    if((e.altKey && e.keyCode === 221)){e.preventDefault();forceHideKeybinds();document.querySelector(".style-module_3Y7xosru .style-module_4LBM1DKx.style-module_3kBDV_wo.style-module_Yp7-2Fw-").click()}
  }


  // ==========================
  //      DATABASES/SSH
  // ==========================
  if(
    (e.ctrlKey && e.keyCode === 51)     // CTRL + 3
  ){
    e.preventDefault()
    sidebarRefresh()
    forceHideKeybinds()
    if(currentPage.startsWith("server")) { sidebarButtonEvent('serverDatabases') }
    if(currentPage.startsWith("account")) { sidebarButtonEvent('accountSsh') }
  }
  if(currentPage === "serverDatabases") {
    // New Database
    if((e.altKey && e.keyCode === 219)){e.preventDefault();forceHideKeybinds();document.querySelector("[class*=\"DatabasesContainer___StyledDiv-sc\"] > button[class*=\"Button__ButtonStyle-sc\"] [class*=\"Button___StyledSpan-sc\"]").click()}
  }


  // ==========================
  //    SCHEDULES/ACTIVITY
  // ==========================
  if(
    (e.ctrlKey && e.keyCode === 52)     // CTRL + 4
  ){
    e.preventDefault()
    sidebarRefresh()
    forceHideKeybinds()
    if(currentPage.startsWith("server")) { sidebarButtonEvent('serverSchedules') }
    if(currentPage.startsWith("account")) { sidebarButtonEvent('accountActivity') }
  }
  if(currentPage === "serverSchedules") {
    // New Schedule
    if((e.altKey && e.keyCode === 219)){e.preventDefault();forceHideKeybinds();document.querySelector(".ScheduleContainer___StyledDiv-sc-dlqnx9-3.hTpoeo > button.style-module_4LBM1DKx.style-module_3kBDV_wo").click()}
  }


  // ==========================
  //          USERS
  // ==========================
  if(
    (e.ctrlKey && e.keyCode === 53)     // CTRL + 5
  ){
    e.preventDefault()
    sidebarRefresh()
    forceHideKeybinds()
    if(currentPage.startsWith("server")) { sidebarButtonEvent('serverUsers') }
  }
  if(currentPage === "serverUsers") {
    // New User
    if((e.altKey && e.keyCode === 219)){e.preventDefault();forceHideKeybinds();document.querySelector(".UsersContainer___StyledDiv-sc-rg2v3f-2.dueAyQ > button.style-module_4LBM1DKx.style-module_3kBDV_wo").click()}
  }


  // ==========================
  //         BACKUPS
  // ==========================
  if(
    (e.ctrlKey && e.keyCode === 54)     // CTRL + 6
  ){
    e.preventDefault()
    sidebarRefresh()
    forceHideKeybinds()
    if(currentPage.startsWith("server")) { sidebarButtonEvent('serverBackups') }
  }
  if(currentPage === "serverBackups") {
    // New Backup
    if((e.altKey && e.keyCode === 219)){e.preventDefault();forceHideKeybinds();document.querySelector("[class*=\"DatabasesContainer___StyledDiv-sc\"] > button[class*=\"Button__ButtonStyle-sc\"] [class*=\"Button___StyledSpan-sc\"]").click()}
  }


  // ==========================
  //         NETWORK
  // ==========================
  if(
    (e.ctrlKey && e.keyCode === 55)     // CTRL + 7
  ){
    e.preventDefault()
    sidebarRefresh()
    forceHideKeybinds()
    if(currentPage.startsWith("server")) { sidebarButtonEvent('serverNetwork') }
  }
  if(currentPage === "serverNetwork") {
    // New Backup
    if((e.altKey && e.keyCode === 219)){e.preventDefault();forceHideKeybinds();document.querySelector("[class*=\"DatabasesContainer___StyledDiv-sc\"] > button[class*=\"Button__ButtonStyle-sc\"] [class*=\"Button___StyledSpan-sc\"]").click()}
  }


  // ==========================
  //         STARTUP
  // ==========================
  if(
    (e.ctrlKey && e.keyCode === 56) ||  // CTRL + 8
    (e.altKey && e.keyCode === 77)      // ALT + M
  ){
    e.preventDefault()
    sidebarRefresh()
    forceHideKeybinds()
    if(currentPage.startsWith("server")) { sidebarButtonEvent('serverStartup') }
  }


  // ==========================
  //         SETTINGS
  // ==========================
  if(
    (e.ctrlKey && e.keyCode === 57) ||  // CTRL + 9
    (e.altKey && e.keyCode === 76)      // ALT + L
  ){
    e.preventDefault()
    sidebarRefresh()
    forceHideKeybinds()
    if(currentPage.startsWith("server")) { sidebarButtonEvent('serverSettings') }
  }
  if(currentPage === "serverSettings") {
    // Launch SFTP
    if((e.altKey && e.keyCode === 65)){e.preventDefault();forceHideKeybinds();document.querySelector(".SettingsContainer___StyledDiv7-sc-1e5ycmz-9.hmubvf a[href*='sftp://']").click()}
  }


  // ==========================
  //         ACTIVITY
  // ==========================
  if(
    (e.ctrlKey && e.keyCode === 48) ||  // CTRL + 0
    (e.altKey && e.keyCode === 173)     // ALT + -
  ){
    e.preventDefault()
    sidebarRefresh()
    forceHideKeybinds()
    if(currentPage.startsWith("server")) { sidebarButtonEvent('serverActivity') }
  }

}
window.addEventListener('keydown', doc_keyDown, false);