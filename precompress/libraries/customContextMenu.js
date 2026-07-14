/* © 2023-2026 Emma (prpl.wtf) */
console.log("nebula#~ customContextMenu.js")

async function showContextMenu(event, url, type) {
  event.preventDefault();
  contextMenu = undefined



  function ContextAnimate1(contextMenu, type) {
    if(contextMenu.style.width != "unset" && contextMenu.style.width != undefined) {
      contextMenu.style.width = contextMenu.querySelector(".context-wrapper").scrollWidth+"px";
    } else {
      contextMenu.style.width = "unset";
    }
    contextMenu.style.boxShadow = 'unset'
  }
  function ContextAnimate2(contextMenu, type) {
    if(type == "more") {
      contextMenu.style.width = contextMenu.querySelector(".context-wrapper").clientWidth+"px";
      contextMenu.style.height = contextMenu.querySelector(".context-wrapper").clientHeight+"px";
      contextMenu.style.boxShadow = 'var(--box-shadow)'
      return;
    }
    contextMenu.style.width = contextMenu.querySelector(".context-wrapper").scrollWidth+"px";
    contextMenu.style.height = contextMenu.querySelector(".context-wrapper").scrollHeight+"px";
    contextMenu.style.boxShadow = 'var(--box-shadow)'
  }



  if(type == undefined || type == "sidebar") { 
    if(window.NebulaSidebarContextBlock == true) return;
    window.NebulaSidebarCloseBlock = true
    contextMenu = document.getElementById('nebulaContextMenu');
    ContextAnimate1(contextMenu, type)
  }
  if(type == "more") {
    if(window.NebulaMoreContextBlock == true) return;
    window.NebulaMoreCloseBlock = true
    contextMenu = document.getElementById('moreContextMenu');
    ContextAnimate1(contextMenu, type)
  }
  if(type == "files") {
    if(window.NebulaFilesContextBlock == true) return;
    window.NebulaFilesCloseBlock = true
    contextMenu = document.getElementById('filesContextMenu');
    ContextAnimate1(contextMenu, type)
  }
  await hideContextMenu("sidebar")
  await hideContextMenu("files")

  window.NebulaContextActive = true

  offsetX = 0;
  offsetY = 0;
  if(type == "files") {
    offsetX = -150;
    offsetY = 0;
  }
  let scrollX = window.scrollX || window.pageXOffset;
  let scrollY = window.scrollY || window.pageYOffset;
  let clientX = event.clientX + scrollX + offsetX;
  let clientY = event.clientY + scrollY + offsetY;
  if(type != "more") {
    contextMenu.style.top = clientY + 'px';
  }
  contextMenu.style.display = 'block';
  contextMenu.style.minWidth = "unset"
  
  if(type == undefined || type == "sidebar") {
    contextMenu.style.left = clientX + 'px';

    const contextButton = document.getElementById('nebulaContextButton');
    const contextButton2 = document.getElementById('nebulaContextButton2');
    const contextButton3 = document.getElementById('nebulaContextButton3');
    contextButton.onclick = function() {window.open(url)};
    contextButton2.onclick = function() {copy(window.location.protocol+"//"+window.location.hostname+url);hideContextMenu()};
    contextButton3.onclick = function() {MultitaskingOpen(url)};

    if(url.startsWith("/admin")) {
      contextButton3.style.display = "none"
    } else {
      contextButton3.style.display = "block"
    }

    ContextAnimate2(contextMenu, type)
    window.NebulaSidebarCloseBlock = false
  } else if (type == "more") {
    contextMenu.style.left = clientX + 'px';

    document.querySelectorAll('#SubNavigation div a').forEach((el) => {
      if([
        '',
        'Account',
        'API Credentials',
        'SSH Keys',
        'Console',
        'Files',
        'Databases',
        'Schedules',
        'Users',
        'Backups',
        'Network',
        'Startup',
        'Settings',
        'Activity',
      ].includes(el.textContent)) { return; }
      let newEl = document.createElement('button');
      newEl.classList = "context-button";
      newEl.onclick = function(event) {el.click()};
      newEl.innerText = el.innerText;
      newEl.display = "none";
      contextMenu.querySelector(".context-wrapper").appendChild(newEl);
    });

    if(contextMenu.querySelector(".context-wrapper").scrollHeight > 200) {
      contextMenu.style.top = clientY - 200 + 'px';
    } else {
      contextMenu.style.top = clientY - contextMenu.querySelector(".context-wrapper").scrollHeight + 'px';
    }

    ContextAnimate2(contextMenu, type)
    window.NebulaMoreCloseBlock = false
  } else if (type == "files") {
    contextMenu.style.left = clientX + 'px';

    const loader = contextMenu.querySelector(".context-wrapper .item-loader")
    const filesButton = document.getElementById('filesContextButton');
    const filesButton2 = document.getElementById('filesContextButton2');
    const filesButton3 = document.getElementById('filesContextButton3');
    const filesButton4 = document.getElementById('filesContextButton4');
    const filesButton5 = document.getElementById('filesContextButton5');
    const filesButton6 = document.getElementById('filesContextButton6');
    const filesButton7 = document.getElementById('filesContextButton7');
    const filesButton8 = document.getElementById('filesContextButton8');
    const filesButton9 = document.getElementById('filesContextButton9');
    const filesButton10 = document.getElementById('filesContextButton10');
    const filesButton11 = document.getElementById('filesContextButton11');

    loader.style.display = "block"
    filesButton.style.display = "none"
    filesButton2.style.display = "none"
    filesButton3.style.display = "none"
    filesButton4.style.display = "none"
    filesButton5.style.display = "none"
    filesButton6.style.display = "none"
    filesButton7.style.display = "none"
    filesButton8.style.display = "none"
    filesButton9.style.display = "none"
    filesButton10.style.display = "none"
    filesButton11.style.display = "none"

    document.querySelector("#filesContextButton + br").style.display = "none";
    document.querySelector("#filesContextButton2 + br").style.display = "none";
    document.querySelector("#filesContextButton3 + br").style.display = "none";
    document.querySelector("#filesContextButton4 + br").style.display = "none";
    document.querySelector("#filesContextButton5 + br").style.display = "none";
    document.querySelector("#filesContextButton6 + br").style.display = "none";
    document.querySelector("#filesContextButton7 + br").style.display = "none";
    document.querySelector("#filesContextButton8 + br").style.display = "none";
    document.querySelector("#filesContextButton9 + br").style.display = "none";
    document.querySelector("#filesContextButton10 + br").style.display = "none";
    document.querySelector("#filesContextButton11 + br").style.display = "none";
    
    filesButton.onclick = function(event) {selectDropdown("rename", event)};
    filesButton2.onclick = function(event) {selectDropdown("move", event)};
    filesButton3.onclick = function(event) {selectDropdown("permissions", event)};
    filesButton4.onclick = function(event) {selectDropdown("copy", event)};
    filesButton5.onclick = function(event) {selectDropdown("archive", event)};
    filesButton6.onclick = function(event) {selectDropdown("unarchive", event)};
    filesButton7.onclick = function(event) {selectDropdown("download", event)};
    filesButton8.onclick = function(event) {selectDropdown("delete", event)};
    filesButton9.onclick = function(event) {selectDropdown("restore", event)};
    filesButton10.onclick = function(event) {selectDropdown("lock", event)};
    filesButton11.onclick = function(event) {selectDropdown("unlock", event)};
    
    ContextAnimate2(contextMenu, type)

    setTimeout(() => {
      contextMenu.style.left = clientX + 'px';
      anyButton=false

      // FILE MANAGER
      if(document.querySelector(".fa-pencil-alt + span.FileDropdownMenu___StyledSpan-sc-17ln8oh-2") === null) { 
        filesButton.style.display = "none";
        document.querySelector("#filesContextButton + br").style.display = "none";
      } else { 
        filesButton.style.display = "inline";
        document.querySelector("#filesContextButton + br").style.display = "inline";
        anyButton=true
      }

      if(document.querySelector(".fa-level-up-alt + span.FileDropdownMenu___StyledSpan-sc-17ln8oh-2") === null) {
        filesButton2.style.display = "none";
        document.querySelector("#filesContextButton2 + br").style.display = "none";
      } else {
        filesButton2.style.display = "inline";
        document.querySelector("#filesContextButton2 + br").style.display = "inline";
        anyButton=true
      }

      if(document.querySelector(".fa-file-code + span.FileDropdownMenu___StyledSpan-sc-17ln8oh-2") === null) {
        filesButton3.style.display = "none";
        document.querySelector("#filesContextButton3 + br").style.display = "none";
      } else {
        filesButton3.style.display = "inline";
        document.querySelector("#filesContextButton3 + br").style.display = "inline";
        anyButton=true
      }

      if(document.querySelector(".fa-copy + span.FileDropdownMenu___StyledSpan-sc-17ln8oh-2") === null) {
        filesButton4.style.display = "none";
        document.querySelector("#filesContextButton4 + br").style.display = "none";
      } else {
        filesButton4.style.display = "inline";
        document.querySelector("#filesContextButton4 + br").style.display = "inline";
        anyButton=true
      }

      if(document.querySelector(".fa-file-archive + span.FileDropdownMenu___StyledSpan-sc-17ln8oh-2") === null) {
        filesButton5.style.display = "none";
        document.querySelector("#filesContextButton5 + br").style.display = "none";
      } else {
        filesButton5.style.display = "inline";
        document.querySelector("#filesContextButton5 + br").style.display = "inline";
        anyButton=true
      }

      if(document.querySelector(".fa-box-open + span.FileDropdownMenu___StyledSpan-sc-17ln8oh-2") === null) {
        filesButton6.style.display = "none";
        document.querySelector("#filesContextButton6 + br").style.display = "none";
      } else {
        filesButton6.style.display = "inline";
        document.querySelector("#filesContextButton6 + br").style.display = "inline";
        anyButton=true
      }

      if(document.querySelector(".fa-file-download + span.FileDropdownMenu___StyledSpan-sc-17ln8oh-2") === null
      && document.querySelector(".fa-cloud-download-alt + span.BackupContextMenu___StyledSpan-sc-1p494ba-6") === null) {
        filesButton7.style.display = "none";
        document.querySelector("#filesContextButton7 + br").style.display = "none";
      } else {
        filesButton7.style.display = "inline";
        document.querySelector("#filesContextButton7 + br").style.display = "inline";
        anyButton=true
      }

      if(document.querySelector(".fa-trash-alt + span.FileDropdownMenu___StyledSpan-sc-17ln8oh-2") === null
      && document.querySelector(".fa-trash-alt + span.BackupContextMenu___StyledSpan3-sc-1p494ba-11") === null) {
        filesButton8.style.display = "none";
        document.querySelector("#filesContextButton8 + br").style.display = "none";
      } else {
        filesButton8.style.display = "inline";
        document.querySelector("#filesContextButton8 + br").style.display = "inline";
        anyButton=true
      }

      if(document.querySelector(".fa-box-open + span.BackupContextMenu___StyledSpan2-sc-1p494ba-8") === null) {
        filesButton9.style.display = "none";
        document.querySelector("#filesContextButton9 + br").style.display = "none";
      } else {
        filesButton9.style.display = "inline";
        document.querySelector("#filesContextButton9 + br").style.display = "inline";
        anyButton=true
      }

      if(document.querySelector("button.DropdownMenu__DropdownButtonRow-sc-1ojgpy2-0 .fa-lock") === null) {
        filesButton10.style.display = "none";
        document.querySelector("#filesContextButton10 + br").style.display = "none";
      } else {
        filesButton10.style.display = "inline";
        document.querySelector("#filesContextButton10 + br").style.display = "inline";
        anyButton=true
      }

      if(document.querySelector("button.DropdownMenu__DropdownButtonRow-sc-1ojgpy2-0 .fa-unlock") === null) {
        filesButton11.style.display = "none";
        document.querySelector("#filesContextButton11 + br").style.display = "none";
      } else {
        filesButton11.style.display = "inline";
        document.querySelector("#filesContextButton11 + br").style.display = "inline";
        anyButton=true
      }

      contextMenuHeightCalc(contextMenu, clientY)
      window.NebulaFilesCloseBlock = false

      if(!anyButton) {
        hideContextMenu('files')
      } else {
        loader.style.display = "none"
        ContextAnimate2(contextMenu, type)
      }
    }, 500)
  }
  contextMenuHeightCalc(contextMenu, clientY)
}

function contextMenuHeightCalc(elem, clientY) {
  if(isElementNotFullyVisible(elem)) {
    elem.style.top = clientY - elem.getBoundingClientRect().height + 'px';
  }
}

function hideContextMenu(type) {
  if(type == "sidebar") {
    if(window.NebulaSidebarCloseBlock == true) return;
    document.getElementById('nebulaContextMenu').style.height = '0px';
    document.getElementById('nebulaContextMenu').style.boxShadow = 'unset';
    window.NebulaSidebarContextBlock = true
    setTimeout(() => {
      document.getElementById('nebulaContextMenu').style.width = 'unset';
      document.getElementById('nebulaContextMenu').style.display = 'none';
      window.NebulaSidebarContextBlock = false
      window.NebulaContextActive = false
    }, 350)
    return;
  }
  if(type == "files") {
    if(window.NebulaFilesCloseBlock == true) return;
    document.getElementById('filesContextMenu').style.height = '0px';
    document.getElementById('filesContextMenu').style.boxShadow = 'unset';
    window.NebulaFilesContextBlock = true
    setTimeout(() => {
      document.getElementById('filesContextMenu').style.width = 'unset';
      document.getElementById('filesContextMenu').style.display = 'none';
      window.NebulaFilesContextBlock = false
      window.NebulaContextActive = false
    }, 350)
    return;
  }
  if(type == "more") {
    if(window.NebulaMoreCloseBlock == true) return;
    document.getElementById('moreContextMenu').style.height = '0px';
    document.getElementById('moreContextMenu').style.boxShadow = 'unset';
    window.NebulaMoreContextBlock = true
    setTimeout(() => {
      document.getElementById('moreContextMenu').style.width = 'unset';
      document.getElementById('moreContextMenu').style.display = 'none';
      document.querySelectorAll('#moreContextMenu .context-wrapper button').forEach((el) => { el.remove(); });
      window.NebulaMoreContextBlock = false
      window.NebulaContextActive = false
    }, 350)
    return;
  }
}

async function selectDropdown(item, event) {
  dropdownMenu = document.querySelector(".DropdownMenu___StyledDiv-sc-1ojgpy2-1") || false
  if(!dropdownMenu) { event.target.dispatchEvent(new CustomEvent('contextmenu')) }

  if(item == "rename") { document.querySelector('.fa-pencil-alt + span.FileDropdownMenu___StyledSpan-sc-17ln8oh-2').click() }
  if(item == "move") { document.querySelector('.fa-level-up-alt + span.FileDropdownMenu___StyledSpan-sc-17ln8oh-2').click() }
  if(item == "permissions") { document.querySelector('.fa-file-code + span.FileDropdownMenu___StyledSpan-sc-17ln8oh-2').click() }
  if(item == "copy") { document.querySelector('.fa-copy + span.FileDropdownMenu___StyledSpan-sc-17ln8oh-2').click() }
  if(item == "archive") { document.querySelector('.fa-file-archive + span.FileDropdownMenu___StyledSpan-sc-17ln8oh-2').click() }
  if(item == "unarchive") { document.querySelector('.fa-box-open + span.FileDropdownMenu___StyledSpan-sc-17ln8oh-2').click() }
  if(item == "download") {
    try { document.querySelector('.fa-file-download + span.FileDropdownMenu___StyledSpan-sc-17ln8oh-2').click() } catch {}
    try { document.querySelector('.fa-cloud-download-alt + span.BackupContextMenu___StyledSpan-sc-1p494ba-6').click() } catch {}
  }
  if(item == "restore") { document.querySelector('.fa-box-open + span.BackupContextMenu___StyledSpan2-sc-1p494ba-8').click() }
  if(item == "lock") { document.querySelector('button.DropdownMenu__DropdownButtonRow-sc-1ojgpy2-0:has(.fa-lock)').click() }
  if(item == "unlock") { document.querySelector('button.DropdownMenu__DropdownButtonRow-sc-1ojgpy2-0:has(.fa-unlock)').click() }
  if(item == "delete") { 
    try { document.querySelector('.fa-trash-alt + span.FileDropdownMenu___StyledSpan-sc-17ln8oh-2').click() } catch {}
    try { document.querySelector('.fa-trash-alt + span.BackupContextMenu___StyledSpan3-sc-1p494ba-11').click() } catch {}
  }
}

document.addEventListener('click', function (event) {
  if(
    document.querySelector("#nebulaContextMenu").style.display != "none" || document.querySelector("#moreContextMenu").style.display != "none" || document.querySelector("#filesContextMenu").style.display != "none") {
    if (!event.target.matches('#nebulaContextMenu')) { hideContextMenu("sidebar"); }
    if (!event.target.matches('#moreContextMenu')) { hideContextMenu("more"); }
    if (!event.target.matches([
      '#filesContextMenu',
      'svg.svg-inline--fa.fa-ellipsis-h.fa-w-16'
    ])) { hideContextMenu("files"); }
  }
  

  if(event.target.matches([
    '.style-module_1WqkLT9X > div',
    '.style-module_1WqkLT9X > div .FileDropdownMenu___StyledDiv-sc-17ln8oh-3',
    '.style-module_1WqkLT9X > div .FileDropdownMenu___StyledDiv-sc-17ln8oh-3 > svg',
    '.style-module_1WqkLT9X > div .FileDropdownMenu___StyledDiv-sc-17ln8oh-3 > svg > *',
    '.BackupRow___StyledDiv6-sc-1lzi0pw-14 > div',
    '.BackupRow___StyledDiv6-sc-1lzi0pw-14 > div .BackupContextMenu___StyledButton-sc-1p494ba-3',
    '.BackupRow___StyledDiv6-sc-1lzi0pw-14 > div .BackupContextMenu___StyledButton-sc-1p494ba-3 > svg',
    '.BackupRow___StyledDiv6-sc-1lzi0pw-14 > div .BackupContextMenu___StyledButton-sc-1p494ba-3 > svg > *'
  ])) {
    event.preventDefault()
    showContextMenu(event, undefined, "files")
  }
  if(event.target.matches([
    '#sidebarServerMore', '#sidebarServerMore .sidebarIcon', '#sidebarServerMore .sidebarIcon + .wideSidebarSpan',
    '#sidebarAccountMore', '#sidebarAccountMore .sidebarIcon', '#sidebarAccountMore .sidebarIcon + .wideSidebarSpan',
  ])) {
    showContextMenu(event, undefined, "more");
  }
});

document.addEventListener('contextmenu', function (event) {
  try {
    if(event.target.parentNode.matches([
      '.style-module_1WqkLT9X',
      '.style-module_1WqkLT9X > .style-module_35MPv1CD',
      '.FileObjectRow___StyledDiv-sc-wrdnyp-0.cOiSgE',
      '.FileObjectRow___StyledDiv-sc-wrdnyp-0.cOiSgE > .svg-inline--fa',
      '.SelectFileCheckbox___StyledLabel-sc-1cv6gsl-1',
      '.style-module_1WqkLT9X > div .FileDropdownMenu___StyledDiv-sc-17ln8oh-3 .svg-inline--fa',
      '.style-module_1WqkLT9X > div'
    ])
    || event.target.matches([
      '.style-module_1WqkLT9X',
      '.style-module_1WqkLT9X > *'
    ])) {
      hideContextMenu("sidebar");
      event.preventDefault()
      showContextMenu(event, undefined, "files")
    } else {
      hideContextMenu("more");
      hideContextMenu("files");
    }
  } catch {
    return;
  }
})