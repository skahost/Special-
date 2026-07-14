/* © 2023-2026 Emma (prpl.wtf) */
console.log("nebula#~ sidebarMiddleClick.js");

document.addEventListener("DOMContentLoaded", (() => {
	document.getElementById("sidebarMainHome").addEventListener('mouseup', function(event) {
		if ((event.button === 1) || (event.ctrlKey || event.metaKey)) {
			event.preventDefault();
			window.open(window.location.origin + "/")
		}
	});
	document.getElementById("sidebarMainAccount").addEventListener('mouseup', function(event) {
		if ((event.button === 1) || (event.ctrlKey || event.metaKey)) {
			event.preventDefault();
			window.open(window.location.origin + "/account")
		}
	});
	document.getElementById("sidebarServerTerminal").addEventListener('mouseup', function(event) {
		if ((event.button === 1) || (event.ctrlKey || event.metaKey)) {
			event.preventDefault();
			window.open(window.location.origin + "/server/" + fetchServerId())
		}
	});
	document.getElementById("sidebarServerFilemanager").addEventListener('mouseup', function(event) {
		if ((event.button === 1) || (event.ctrlKey || event.metaKey)) {
			event.preventDefault();
			window.open(window.location.origin + "/server/" + fetchServerId() + "/files")
		}
	});
	document.getElementById("sidebarServerDatabases").addEventListener('mouseup', function(event) {
		if ((event.button === 1) || (event.ctrlKey || event.metaKey)) {
			event.preventDefault();
			window.open(window.location.origin + "/server/" + fetchServerId() + "/databases")
		}
	});
	document.getElementById("sidebarServerSchedules").addEventListener('mouseup', function(event) {
		if ((event.button === 1) || (event.ctrlKey || event.metaKey)) {
			event.preventDefault();
			window.open(window.location.origin + "/server/" + fetchServerId() + "/schedules")
		}
	});
	document.getElementById("sidebarServerUsers").addEventListener('mouseup', function(event) {
		if ((event.button === 1) || (event.ctrlKey || event.metaKey)) {
			event.preventDefault();
			window.open(window.location.origin + "/server/" + fetchServerId() + "/users")
		}
	});
	document.getElementById("sidebarServerBackups").addEventListener('mouseup', function(event) {
		if ((event.button === 1) || (event.ctrlKey || event.metaKey)) {
			event.preventDefault();
			window.open(window.location.origin + "/server/" + fetchServerId() + "/backups")
		}
	});
	document.getElementById("sidebarServerNetwork").addEventListener('mouseup', function(event) {
		if ((event.button === 1) || (event.ctrlKey || event.metaKey)) {
			event.preventDefault();
			window.open(window.location.origin + "/server/" + fetchServerId() + "/network")
		}
	});
	document.getElementById("sidebarServerStartup").addEventListener('mouseup', function(event) {
		if ((event.button === 1) || (event.ctrlKey || event.metaKey)) {
			event.preventDefault();
			window.open(window.location.origin + "/server/" + fetchServerId() + "/startup")
		}
	});
	document.getElementById("sidebarServerSettings").addEventListener('mouseup', function(event) {
		if ((event.button === 1) || (event.ctrlKey || event.metaKey)) {
			event.preventDefault();
			window.open(window.location.origin + "/server/" + fetchServerId() + "/settings")
		}
	});
	document.getElementById("sidebarServerActivity").addEventListener('mouseup', function(event) {
		if ((event.button === 1) || (event.ctrlKey || event.metaKey)) {
			event.preventDefault();
			window.open(window.location.origin + "/server/" + fetchServerId() + "/activity")
		}
	});
	document.getElementById("sidebarAccountAccount").addEventListener('mouseup', function(event) {
		if ((event.button === 1) || (event.ctrlKey || event.metaKey)) {
			event.preventDefault();
			window.open(window.location.origin + "/account")
		}
	});
	document.getElementById("sidebarAccountApi").addEventListener('mouseup', function(event) {
		if ((event.button === 1) || (event.ctrlKey || event.metaKey)) {
			event.preventDefault();
			window.open(window.location.origin + "/account/api")
		}
	});
	document.getElementById("sidebarAccountSsh").addEventListener('mouseup', function(event) {
		if ((event.button === 1) || (event.ctrlKey || event.metaKey)) {
			event.preventDefault();
			window.open(window.location.origin + "/account/ssh")
		}
	});
	document.getElementById("sidebarAccountActivity").addEventListener('mouseup', function(event) {
		if ((event.button === 1) || (event.ctrlKey || event.metaKey)) {
			event.preventDefault();
			window.open(window.location.origin + "/account/activity")
		}
	});
}))