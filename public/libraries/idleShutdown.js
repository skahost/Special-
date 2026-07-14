/* Nebula custom addition: Idle Server Shutdown (Auto-Sleep) — frontend */
console.log("nebula#~ idleShutdown.js")

function nebulaIdleConfig() {
  return (window.NebulaConfig && window.NebulaConfig.idleShutdown) || { enabled: false, sleeping: [] }
}

function nebulaIsSleeping(id) {
  if (!id) return false
  var cfg = nebulaIdleConfig()
  return (cfg.sleeping || []).indexOf(id) !== -1
}

/* Dashboard: mark sleeping server cards with a purple/blue "Sleeping" badge. */
function nebulaRefreshSleepingCards() {
  var cfg = nebulaIdleConfig()
  if (!cfg.enabled) return
  if (typeof nebulaCurrentPage === "function" && nebulaCurrentPage() !== "home") return

  document.querySelectorAll('a[href^="/server/"]').forEach(function (card) {
    var match = card.getAttribute("href").match(/\/server\/([^/]+)/)
    if (!match) return
    var id = match[1]

    if (!nebulaIsSleeping(id)) {
      card.removeAttribute("nebula-sleeping")
      var stale = card.querySelector(".nebula-sleep-badge")
      if (stale) stale.remove()
      return
    }

    card.setAttribute("nebula-sleeping", "true")
    if (!card.querySelector(".nebula-sleep-badge")) {
      var badge = document.createElement("div")
      badge.className = "nebula-sleep-badge"
      badge.innerHTML = "\uD83C\uDF19 Sleeping"
      card.appendChild(badge)
    }
  })
}

/* Server view: show an inactivity banner when the current server is sleeping. */
function nebulaRefreshSleepingBanner() {
  var cfg = nebulaIdleConfig()
  var page = typeof nebulaCurrentPage === "function" ? nebulaCurrentPage() : ""
  var id = typeof fetchServerId === "function" ? fetchServerId() : null
  var existing = document.querySelector(".nebula-sleep-banner")
  var onServer = page && page.indexOf("server") === 0

  if (!cfg.enabled || !onServer || !nebulaIsSleeping(id)) {
    if (existing) existing.remove()
    return
  }
  if (existing) return

  var banner = document.createElement("div")
  banner.className = "nebula-sleep-banner"
  banner.innerHTML =
    '<span class="nebula-sleep-banner-icon">\uD83C\uDF19</span> Server was stopped due to inactivity. Click <b>Start</b> to wake it up.'

  try {
    var app = document.querySelector(".App___StyledDiv-sc-2l91w7-0")
    if (app && app.parentNode) {
      app.parentNode.insertBefore(banner, app)
    } else {
      document.body.insertBefore(banner, document.body.firstChild)
    }
  } catch (e) {
    document.body.appendChild(banner)
  }
}

function nebulaIdleRefresh() {
  try { nebulaRefreshSleepingCards() } catch (e) {}
  try { nebulaRefreshSleepingBanner() } catch (e) {}
}

window.addEventListener("locationchange", nebulaIdleRefresh)
window.addEventListener("load", function () {
  nebulaIdleRefresh()
  setInterval(nebulaIdleRefresh, 1000)
})
