function initialize() {
    resizeWindow();

    window.addEventListener('resize', () => {
        resizeWindow();
    })

    document.cookie = 'starters=1,2,3,4,5';
    document.cookie = 'cp=6,7,8,9';

    var stagesContainer = document.getElementsByClassName('stages-container');
    var starters = getCookie('starters');
    var cp = getCookie('cp');
    
    var starterList = starters.split(',')

    for(let s of starterList) {
        var stageDiv = document.createElement('div');
        stageDiv.className = 'stage starter';

        var stageImg = document.createElement('img');
        stageImg.src = './assets/' + s + '.jpg';

        stageDiv.appendChild(stageImg);

        stagesContainer[0].appendChild(stageDiv);
    }

    var cpList = cp.split(',')

    for(let s of cpList) {
        var stageDiv = document.createElement('div');
        stageDiv.className = 'stage cp';
        
        var stageImg = document.createElement('img');
        stageImg.src = './assets/' + s + '.jpg';

        stageDiv.appendChild(stageImg);

        stagesContainer[0].appendChild(stageDiv);
    }

    var createdStages = document.getElementsByClassName('stage'); 

    for(let s of createdStages) {
        s.addEventListener('click', () => {
            banStage(s);
        })
    }

    var cpToggle = document.getElementById('cp-toggle');
    cpToggle.addEventListener('click', () => {
        toggleCps(cpToggle);
    })

    var resetButton = document.getElementById('reset-bans');
    resetButton.addEventListener('click', () => {
        resetBans();
    })

    var editButton = document.getElementById('edit-stages');
    editButton.addEventListener('click', () => {
        showEditMenu();
    })

    var menu = document.getElementById('stage-edit-screen');
    menu.style.display = 'none';

    var acceptButton = document.getElementById('accept-button');
    acceptButton.addEventListener('click', () => {
        saveChanges();
    })

    var cancelButton = document.getElementById('cancel-button');
    cancelButton.addEventListener('click', () => {
        closeEditMenu();
    })
}

function resizeWindow() {
    var appContainer = document.getElementById('app-container');
    appContainer.style.width = window.innerWidth + 'px';
    appContainer.style.height = window.innerHeight + 'px';
}

function banStage(element) {
    var className = element.className;
    if (className.includes('banned'))
        element.className = className.replace(' banned', '');
    else
        element.className = className + ' banned';
}

function resetBans() {
    var stages = document.getElementsByClassName('stage');

    for(let s of stages) {
        var className = s.className;
        s.className = className.replace(' banned', '');
    }
}

function showEditMenu() {
    var menu = document.getElementById('stage-edit-screen');
    menu.style.display = 'flex';
}

function closeEditMenu() {
    var menu = document.getElementById('stage-edit-screen');
    menu.style.display = 'none';
}

function saveChanges() {
    // TODO

    closeEditMenu();
}

function toggleCps(element){
    var stages = document.getElementsByClassName('cp');

    var className = element.className;

    if (className.includes('selected')) {
        element.className = className.replace(' selected', '')
        element.innerText = 'Show counterpicks';

        for(let s of stages){
            s.style.display = 'none';
        }
    }
    else {
        element.className = className + ' selected';
        element.innerText = 'Hide counterpicks';

        for(let s of stages){
            s.style.display = 'flex';
        }
    }
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }