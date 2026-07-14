/* © 2023-2026 Emma (prpl.wtf) */
console.log("nebula#~ fetchServerId.js")

function fetchServerId() {
  let PATH = window.location.pathname + window.location.search
  const SERVERID = /\/server\/([^/]+)/;
  const MATCHID = PATH.match(SERVERID);
  try {var fetchedServerId = MATCHID[1];} catch { }
  return fetchedServerId
}