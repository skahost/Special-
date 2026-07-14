/* © 2023-2026 Emma (prpl.wtf) */
console.log("nebula#~ floatingWindows.js")

let MultitaskingMoveHints = [
  'Move your window somewhere cozy.',
  'Give it a neat little spot.',
  'What about bottom-left?',
  'This place is too cold, move me somewhere warm!'
]
let MultitaskingResizeHints = [
  'Let go to continue being productive.',
  'All sizes are in stock!',
  'One size, fits most*.'
]

function MultitaskingOpen(url) {
  const width = 700
  const height = 450
  var posX = 0, posY = 0, mouseX = 0, mouseY = 0;

  const id = 'MultitaskingFrame-'+Date.now()
  
  const MultitaskingFrame = document.createElement("div");
  MultitaskingFrame.id = id

  document.body.appendChild(MultitaskingFrame)

  MultitaskingFrame.innerHTML = `
    <div class="nebula-frame-container">
      <div class="nebula-frame-controls">
        <button class="nebula-frame-control close-button" onclick="closeWindow('${id}')">
          <i class="bi bi-x"></i>
        </button>
      </div>
      <div class="nebula-frame-spinner-container">
        <div class="nebula-frame-spinner"></div>
      </div>
      <iframe
        src="${url}?multitasking=true"
        class="nebula-frame"
        id="${id}-Frame"
      ></iframe>
      <div class="nebula-frame-focus" onclick="focusWindow('${id}')"></div>
      <div class="nebula-frame-resizing-trap"></div>
      <div class="nebula-frame-resize-text-hint">
        <p style="font-size: 34px"><i class="bi bi-textarea-resize"></i></p>
        <p class="nebula-frame-resize-hint-content">  
          There was supposed to be quirky hint here but an unexpected error prevented it from appearing.
        </p>
      </div>
      <div class="nebula-frame-controls-hint">
        <p style="font-size: 34px"><i class="bi bi-arrows-move"></i></p>
        <p class="nebula-frame-move-hint-content">  
          There was supposed to be quirky hint here but an unexpected error prevented it from appearing.
        </p>
      </div>
    </div>
  `

  const iFrame = document.querySelector(`#${id} .nebula-frame-container > iframe.nebula-frame`)
  const SpinnerContainer = MultitaskingFrame.querySelector(".nebula-frame-container > .nebula-frame-spinner-container")
  const FrameControls = MultitaskingFrame.querySelector('.nebula-frame-container .nebula-frame-controls');
  const MoveHint = MultitaskingFrame.querySelector('.nebula-frame-controls-hint');
  const FrameContainer = document.querySelector(`#${id} .nebula-frame-container`)
  const ResizeTrap = FrameContainer.querySelector(`.nebula-frame-resizing-trap`)
  FrameContainer.style.setProperty('--frameWidth', width+'px')
  FrameContainer.style.setProperty('--frameHeight', height+'px')
  window.InitialFrameHeight = height
  FrameContainer.style.transition = "height .4s, scale .2s linear, opacity .4s"
  setTimeout(() => {
    FrameContainer.style.scale = 1
    FrameContainer.style.opacity = 1
  }, 50)
  let removeMoveHint = setTimeout(() => {})
  InitializeFrameResize(id)

  const SpinnerInterval = setInterval(() => {
    try {
      let Section = iFrame.contentDocument.querySelector("section.fade-appear-done.fade-enter-done")
      if(Section) {
        iFrame.style.opacity = 1
        clearInterval(SpinnerInterval)
        setTimeout(() => {
          SpinnerContainer.style.opacity = 0
        },500)
      }
    } catch {
      return
    }
  }, 400)

  function dragMouseDown(e) {
    e.preventDefault();

    let MultitaskingMoveHint = MultitaskingMoveHints[Math.floor(Math.random() * MultitaskingMoveHints.length)]
    FrameContainer.querySelector(".nebula-frame-controls-hint > .nebula-frame-move-hint-content").innerHTML = MultitaskingMoveHint

    mouseX = e.clientX;
    mouseY = e.clientY;

    focusWindow(id)

    const LocalFrameHeight = getComputedStyle(FrameContainer).getPropertyValue('--frameHeight');
    if(LocalFrameHeight != '225px') {
      window.InitialFrameHeight = LocalFrameHeight
    }

    dragInitial = false
    MoveHint.style.opacity = 0
    MoveHint.style.display = "block"
  
    document.onmousemove = elementDrag;
    document.onmouseup = closeDragElement;
  }
  
  function elementDrag(e) {
    e.preventDefault();

    if(dragInitial == undefined || dragInitial == false) {
      clearTimeout(removeMoveHint)
      dragInitial = true
      MoveHint.style.opacity = 1
      ResizeTrap.style.display = "block"
      FrameContainer.style.setProperty('--frameHeight', '225px')
      FrameControls.style.height = '100%'
      iFrame.style.opacity = 0
      SpinnerContainer.style.opacity = 0
      FrameContainer.style.transition = "height .4s, scale .3s linear, opacity .3s, background-color .2s"
      setTimeout(() => {
        FrameContainer.style.backgroundColor = 'var(--pageSecondary)'
      }, 20)
    }
  
    posX = mouseX - e.clientX;
    posY = mouseY - e.clientY;
    mouseX = e.clientX;
    mouseY = e.clientY;


    FrameContainer.style.top = (FrameContainer.offsetTop - posY) + "px";
    FrameContainer.style.left = (FrameContainer.offsetLeft - posX) + "px";
    
    /* top border */ if(FrameContainer.offsetTop - posY < 12) { FrameContainer.style.top = "12px" }
    /* bottom border */ if((FrameContainer.offsetTop - posY) > (window.innerHeight - 40)) { FrameContainer.style.top = (window.innerHeight - 40)+"px" }

    /* left border */ if(FrameContainer.offsetLeft < 12) { FrameContainer.style.left = "12px"; }
    /* right border */ if((FrameContainer.offsetLeft - posX) > (window.innerWidth - FrameContainer.clientWidth - 12)) { FrameContainer.style.left = (window.innerWidth - FrameContainer.clientWidth - 12)+"px"; }
  }
  
  function closeDragElement() {
    document.onmousemove = null;
    document.onmouseup = null;
    dragInitial = false
    ResizeTrap.style.display = "none"
    FrameContainer.style.setProperty('--frameHeight', window.InitialFrameHeight)
    FrameControls.style.height = 50+'px'
    FrameContainer.style.backgroundColor = 'var(--pageBackground)'
    iFrame.style.opacity = 1
    MoveHint.style.opacity = 0
    removeMoveHint = setTimeout(() => {
      FrameContainer.style.transition = ""
      MoveHint.style.display = "none"
    }, 400)
  }
  
  FrameControls.onmousedown = dragMouseDown;
  iFrame.contentDocument.window.onmousedown = focusWindow(id);
}


function focusWindow(id) {
  const AllFrameContainers = document.querySelectorAll(".nebula-frame-container")
  AllFrameContainers.forEach(element => {
    element.style.zIndex = 99
    element.querySelector('.nebula-frame-focus').style.opacity = 0
    element.querySelector('.nebula-frame-focus').style.display = "block"
    setTimeout(() => {
      element.querySelector('.nebula-frame-focus').style.opacity = 1
    }, 100)
  });
  const FrameContainer = document.querySelector(`#${id} .nebula-frame-container`)
  FrameContainer.style.zIndex = 100
  FrameContainer.querySelector('.nebula-frame-focus').style.opacity = 0
  setTimeout(() => {
    FrameContainer.querySelector('.nebula-frame-focus').style.display = "none"
  }, 100)
}

function closeWindow(id) {
  const MultitaskingFrame = document.getElementById(id)
  const FrameContainer = document.querySelector(`#${id} .nebula-frame-container`)
  FrameContainer.style.scale = 0.8
  FrameContainer.style.opacity = 0
  FrameContainer.style.transition = "height .4s, scale .3s linear, opacity .3s"
  setTimeout(() => {
    MultitaskingFrame.remove()
  }, 250)
}

function InitializeFrameResize(id) {
  const FrameContainer = document.querySelector(`#${id} .nebula-frame-container`)
  const ResizeTrap = FrameContainer.querySelector(`.nebula-frame-resizing-trap`)
  const iFrame = document.getElementById(id+"-Frame")
  const ResizeTextHint = FrameContainer.querySelector(`.nebula-frame-resize-text-hint`)

  let removeResizeTextHint = setTimeout(() => {})
  FrameContainer.className = FrameContainer.className + ' nebula-frame-resizable';
  var resizer = document.createElement('div');
  var hint = document.createElement('div');
  resizer.className = 'nebula-frame-resizer';
  hint.className = 'nebula-frame-resize-hint';
  FrameContainer.appendChild(resizer);
  FrameContainer.appendChild(hint);
  resizer.addEventListener('mousedown', initDrag, false);

  var startX, startY, startWidth, startHeight;

  function initDrag(e) {
    e.preventDefault()

    let MultitaskingResizeHint = MultitaskingResizeHints[Math.floor(Math.random() * MultitaskingResizeHints.length)]
    FrameContainer.querySelector(".nebula-frame-resize-text-hint > .nebula-frame-resize-hint-content").innerHTML = MultitaskingResizeHint

    FrameContainer.style.backgroundColor = 'var(--pageSecondary)'
    FrameContainer.style.transition = ""
    clearTimeout(removeResizeTextHint)
    ResizeTextHint.style.display = "block"
    ResizeTextHint.style.opacity = 1
    startX = e.clientX;
    startY = e.clientY;
    startWidth = parseInt(document.defaultView.getComputedStyle(FrameContainer).width, 10);
    startHeight = parseInt(document.defaultView.getComputedStyle(FrameContainer).height, 10);
    document.documentElement.addEventListener('mousemove', doDrag, false);
    document.documentElement.addEventListener('mouseup', stopDrag, false);
    iFrame.style.transition = "opacity .2s"
    iFrame.style.opacity = 0
    fadeOutTimeout = setTimeout(() => {
      iFrame.style.position = "fixed"
      iFrame.style.height = 0
      iFrame.style.width = 0
    }, 300)
    ResizeTrap.style.display = "block"
  }
  
  function doDrag(e) {
    if((startWidth + e.clientX - startX) <= 500) { FrameContainer.style.setProperty('--frameWidth', '500px'); }
    else { FrameContainer.style.setProperty('--frameWidth', (startWidth + e.clientX - startX) + 'px'); }

    if((startHeight + e.clientY - startY) <= 226) { FrameContainer.style.setProperty('--frameHeight', '226px'); }
    else { FrameContainer.style.setProperty('--frameHeight', (startHeight + e.clientY - startY) + 'px'); }
  }
  
  function stopDrag(e) {
    document.documentElement.removeEventListener('mousemove', doDrag, false);
    document.documentElement.removeEventListener('mouseup', stopDrag, false);
    iFrame.style.position = "absolute"
    iFrame.style.width = "var(--frameWidth)"
    iFrame.style.height = "calc(var(--frameHeight) - 50px)"
    FrameContainer.style.transition = "background-color .2s"
    clearTimeout(fadeOutTimeout)
    setTimeout(() => {
      FrameContainer.style.backgroundColor = 'var(--pageBackground)'
      iFrame.style.transition = "height .4s, opacity .3s"
      iFrame.style.opacity = 1
    }, 10)
    ResizeTextHint.style.opacity = 0
    removeResizeTextHint = setTimeout(() => {
      ResizeTextHint.style.display = "none"
    }, 400)
    ResizeTrap.style.display = "none"
  }
}