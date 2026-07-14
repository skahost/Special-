/* © 2023-2026 Emma (prpl.wtf) */
console.log("nebula#~ currentPage.js")

function nebulaCurrentPage() {
  /*
    usage: 
      nebulaCurrentPage()
    output: 
      home, accountAccount, accountApi,
      accountSsh, accountActivity, accountMore,
      serverTerminal, serverFiles, serverFilesEdit,
      serverDatabases, serverSchedules, serverUsers,
      serverBackups, serverNetwork, serverStartup,
      serverSettings, serverActivity, serverMore
  */

  let PATH = window.location.pathname + window.location.search

  if(PATH === "/" || PATH === "" || PATH.startsWith("/?page=")) {return "home"}
  if(PATH.startsWith("/account") || PATH.startsWith("/account/")) {
    if(PATH.endsWith("/account") || PATH.endsWith("/account/")) {return "accountAccount"}
    if(PATH.endsWith("/account/api") || PATH.endsWith("/account/api/")) {return "accountApi"}
    if(PATH.endsWith("/account/ssh") || PATH.endsWith("/account/ssh/")) {return "accountSsh"}
    if(PATH.endsWith("/account/activity") || PATH.endsWith("/account/activity/")) {return "accountActivity"}
    return "accountMore"
  }
  if(PATH.startsWith("/server/")) {
    terminalPattern = /^\/server\/[^/]+$/;
    if(terminalPattern.test(PATH)) {return "serverTerminal"}
    if(PATH.endsWith("/files") || PATH.endsWith("/files/")) {return "serverFiles"}
    if(PATH.endsWith("/files/edit") || PATH.endsWith("/files/edit/") || PATH.endsWith("/files/new") || PATH.endsWith("/files/new/")) {return "serverFilesEdit"}
    if(PATH.endsWith("/databases") || PATH.endsWith("/databases/")) {return "serverDatabases"}
    if(PATH.startsWith("/schedules", 16) || PATH.startsWith("/schedules/", 16)) {return "serverSchedules"}
    if(PATH.endsWith("/users") || PATH.endsWith("/users/")) {return "serverUsers"}
    if(PATH.endsWith("/backups") || PATH.endsWith("/backups/")) {return "serverBackups"}
    if(PATH.endsWith("/network") || PATH.endsWith("/network/")) {return "serverNetwork"}
    if(PATH.endsWith("/startup") || PATH.endsWith("/startup/")) {return "serverStartup"}
    if(PATH.endsWith("/settings") || PATH.endsWith("/settings/")) {return "serverSettings"}
    if(PATH.endsWith("/activity") || PATH.endsWith("/activity/")) {return "serverActivity"}
    return "serverMore"
  }
}