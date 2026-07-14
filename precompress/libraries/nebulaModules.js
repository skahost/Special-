/* SK Host custom addition: modules, footer removal, kill button & sidebar tweaks */
console.log("skhost#~ nebulaModules.js")

var NEBULA_MODULES = [
  { key: "plugin_installer", slug: "plugins", label: "Plugin Installer", icon: "bi-plug-fill", scope: "server", desc: "Browse and install plugins onto this server." },
  { key: "player_manager", slug: "players", label: "Player Manager", icon: "bi-people-fill", scope: "server", desc: "View and manage the players connected to this server." },
  { key: "mod_installer", slug: "mods", label: "Mod Installer", icon: "bi-box-seam-fill", scope: "server", desc: "Browse and install mods onto this server." },
  { key: "version_changer", slug: "version", label: "Version Changer (Java)", icon: "bi-cup-hot-fill", scope: "server", desc: "Change the Java server version for this server." },
  { key: "bedrock_addon_installer", slug: "bedrock-addons", label: "Bedrock Addon Installer", icon: "bi-boxes", scope: "server", desc: "Install Bedrock add-ons and behaviour/resource packs." },
  { key: "subdomain_manager", slug: "subdomains", label: "Subdomain Manager", icon: "bi-globe2", scope: "server", desc: "Create and manage subdomains that point to this server." },
  { key: "bedrock_version_changer", slug: "bedrock-version", label: "Bedrock Version Changer", icon: "bi-arrow-repeat", scope: "server", desc: "Change the Bedrock server version for this server." },
  { key: "server_splitters", slug: "splitters", label: "Server Splitters", icon: "bi-diagram-3-fill", scope: "server", desc: "Split this server's resources into multiple sub-servers." },
  { key: "properties_manager", slug: "properties", label: "Properties Manager", icon: "bi-sliders", scope: "server", desc: "Edit this server's server.properties settings." },
  { key: "world_manager", slug: "worlds", label: "World Manager", icon: "bi-map-fill", scope: "server", desc: "Manage, back up and switch the worlds on this server." },
  { key: "world_installer", slug: "world-installer", label: "World Installer", icon: "bi-download", scope: "server", desc: "Download and install pre-made worlds onto this server." },
  { key: "auto_suspension", slug: "billing", label: "Auto Suspension", icon: "bi-credit-card-2-front-fill", scope: "account", desc: "Review your servers' billing status and suspension state." },
]

function nebulaUiConfig() {
  return (window.NebulaConfig && window.NebulaConfig.ui) || {}
}

function nebulaModuleEnabled(key) {
  var modules = (window.NebulaConfig && window.NebulaConfig.modules) || {}
  return modules[key] === true
}

/* ---- 1. Footer removal (Pterodactyl copyright) ---- */
function nebulaRemoveFooter() {
  if (!nebulaUiConfig().removeFooter) return
  document.querySelectorAll('a[href^="https://pterodactyl.io"]').forEach(function (link) {
    var paragraph = link.closest("p")
    var container = paragraph ? paragraph.parentElement : link.parentElement
    if (container) container.style.display = "none"
  })
}

/* ---- 2. Server console "Kill" button ---- */
function nebulaXsrfToken() {
  var match = document.cookie.match(/XSRF-TOKEN=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : ""
}

function nebulaSendKill() {
  var id = typeof fetchServerId === "function" ? fetchServerId() : null
  if (!id) return
  fetch("/api/client/servers/" + id + "/power", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-XSRF-TOKEN": nebulaXsrfToken(),
    },
    body: JSON.stringify({ signal: "kill" }),
  }).catch(function () {})
}

function nebulaAddKillButton() {
  if (nebulaUiConfig().consoleKillButton === false) return
  if (typeof nebulaCurrentPage === "function" && nebulaCurrentPage() !== "serverTerminal") return
  if (document.querySelector(".nebula-kill-button")) return

  var powerButton = null
  document.querySelectorAll("button").forEach(function (button) {
    var text = (button.textContent || "").trim()
    if (!powerButton && (text === "Stop" || text === "Restart" || text === "Start")) {
      powerButton = button
    }
  })
  if (!powerButton) return

  var kill = powerButton.cloneNode(true)
  kill.classList.add("nebula-kill-button")
  kill.textContent = "Kill"
  kill.removeAttribute("disabled")
  kill.disabled = false
  kill.addEventListener("click", function (event) {
    event.preventDefault()
    event.stopPropagation()
    nebulaSendKill()
  })
  powerButton.parentNode.appendChild(kill)
}

/* ---- 3. Keep extension links permanently visible (no 3-dot dropdown) ---- */
function nebulaForceExtensionsVisible() {
  if (nebulaUiConfig().sidebarExtensionsList === false) return
  ;["sidebarAccountMore", "sidebarServerMore"].forEach(function (id) {
    var el = document.getElementById(id)
    if (el) el.style.display = "inline"
  })
}

/* ---- 4. Conditional module tabs ---- */
function nebulaOpenModule(module) {
  var host =
    document.querySelector(".App___StyledDiv-sc-2l91w7-0") ||
    document.querySelector("#app") ||
    document.body
  var existing = document.querySelector(".nebula-module-view")
  if (existing) existing.remove()

  var view = document.createElement("div")
  view.className = "nebula-module-view"
  view.innerHTML =
    '<div class="nebula-module-card">' +
    '<div class="nebula-module-head"><i class="bi ' + module.icon + '"></i><span>' + module.label + "</span></div>" +
    '<p class="nebula-module-body">' + (module.desc || "") + "</p>" +
    '<p class="nebula-module-note">This module is part of SK Host and is enabled for your account.</p>' +
    '<button class="nebula-module-close">Close</button>' +
    "</div>"
  view.querySelector(".nebula-module-close").addEventListener("click", function () {
    view.remove()
  })
  view.addEventListener("click", function (event) {
    if (event.target === view) view.remove()
  })
  host.appendChild(view)
}

function nebulaBuildModuleNav() {
  var page = typeof nebulaCurrentPage === "function" ? nebulaCurrentPage() : ""
  var scope = page && page.indexOf("server") === 0 ? "server" : page === "home" || (page && page.indexOf("account") === 0) ? "account" : null
  if (!scope) return

  var nav = document.querySelector("#SubNavigation div")
  if (!nav) return
  if (nav.querySelector(".nebula-module-tab")) return

  var anyEnabled = NEBULA_MODULES.some(function (module) {
    return module.scope === scope && nebulaModuleEnabled(module.key)
  })
  if (anyEnabled && nebulaUiConfig().sidebarExtensionsList !== false && !nav.querySelector(".nebula-ext-header")) {
    var header = document.createElement("div")
    header.className = "nebula-ext-header"
    header.textContent = "EXTENSIONS"
    nav.appendChild(header)
  }

  NEBULA_MODULES.forEach(function (module) {
    if (module.scope !== scope) return
    if (!nebulaModuleEnabled(module.key)) return

    var tab = document.createElement("a")
    tab.className = "nebula-module-tab"
    tab.href = "#nebula/" + module.slug
    tab.innerHTML = '<i class="bi ' + module.icon + '"></i> ' + module.label
    tab.addEventListener("click", function (event) {
      event.preventDefault()
      nebulaOpenModule(module)
    })
    nav.appendChild(tab)
  })
}

/* ---- 5. Server card background image ---- */
function nebulaApplyCardBackground() {
  var url = nebulaUiConfig().serverCardBackground
  if (url) {
    document.documentElement.style.setProperty("--nebula-card-bg", 'url("' + url + '")')
  }
}

function nebulaModulesRefresh() {
  try { nebulaApplyCardBackground() } catch (e) {}
  try { nebulaRemoveFooter() } catch (e) {}
  try { nebulaAddKillButton() } catch (e) {}
  try { nebulaForceExtensionsVisible() } catch (e) {}
  try { nebulaBuildModuleNav() } catch (e) {}
}

window.addEventListener("locationchange", nebulaModulesRefresh)
window.addEventListener("load", function () {
  nebulaModulesRefresh()
  setInterval(nebulaModulesRefresh, 1000)
})
