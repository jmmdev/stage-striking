function initialize() {
    resizeWindow();

    populateStages();

    setStages();

    setTimeout(() => {
        setRadioButtons();    
    }, 200);

    window.addEventListener('resize', () => {
        resizeWindow();
    })

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

    var menu = document.getElementById('stages-bg');
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
    var menu = document.getElementById('stages-bg');
    menu.style.display = 'flex';
}

function closeEditMenu() {
    var menu = document.getElementById('stages-bg');
    menu.style.display = 'none';
}

function saveChanges() {
    fetch('./files/stages.json').then(response => {
        return response.json();
    }).then(stages_data => {
        var starters = '';
        var cp = '';
        var disabled = '';

        for(let data of stages_data) {
            var value = document.querySelector('input[name="'+ data.index +'"]:checked').value;
            
            if(value === 'starter') {
                starters += data.index + ',';
            }

            if(value === 'cp') {
                cp += data.index + ',';
            }

            if(value === 'disabled') {
                disabled += data.index + ',';
            }
        }

        document.cookie = 'starters=' + starters;
        document.cookie = 'cp=' + cp;
        document.cookie = 'disabled=' + disabled;

        setStages();
        closeEditMenu();
    });
}

function toggleCps(element){
    var className = element.className;

    if (className.includes('selected')) {
        element.className = className.replace(' selected', '')
        element.innerText = 'Show counterpicks';

        viewCps(false);
    }
    else {
        element.className = className + ' selected';
        element.innerText = 'Hide counterpicks';

        viewCps(true);
       
    }
}

function viewCps(boolean) {
    var stages = document.getElementsByClassName('cp');

    if(!boolean) {
        for(let s of stages){
            s.style.display = 'none';
        }
    }

    if(boolean) {
        for(let s of stages){
            s.style.display = 'flex';
        }
    }
}

function populateStages() {
    fetch('./files/stages.json').then(response => {
        return response.json();
    }).then(stages_data => {
        var stageSettings = document.getElementById("stage-settings");

        for(let s of stages_data) {
            var dataDiv = document.createElement('div');
            dataDiv.className = 'stage-data';

                var nameDiv = document.createElement('div');
                nameDiv.className = 'stage-name';
                nameDiv.innerText = s.name;

                dataDiv.appendChild(nameDiv);

                var radioGroupDiv = document.createElement('div');
                radioGroupDiv.className = 'radio-group';
            
                    var radioButtonDiv1 = document.createElement('div');
                    radioButtonDiv1.className = 'radio-button';

                        var label1 = document.createElement('label');
                        label1.innerText = 'ST';
                        radioButtonDiv1.appendChild(label1);

                        var radio1 = document.createElement('input');
                        radio1.type = 'radio';
                        radio1.id = 'starter' + s.index;
                        radio1.name = s.index;
                        radio1.value = 'starter';
                        radio1.className = 'state radio-starter';
                        radioButtonDiv1.appendChild(radio1);
                    
                    radioGroupDiv.appendChild(radioButtonDiv1);

                    var radioButtonDiv2 = document.createElement('div');
                    radioButtonDiv2.className = 'radio-button';

                        var label2 = document.createElement('label');
                        label2.innerText = 'CP';
                        radioButtonDiv2.appendChild(label2);

                        var radio2 = document.createElement('input');
                        radio2.type = 'radio';
                        radio2.id = 'cp' + s.index;
                        radio2.name = s.index;
                        radio2.value = 'cp';
                        radio2.className = 'state radio-cp';
                        radioButtonDiv2.appendChild(radio2);
                    
                    radioGroupDiv.appendChild(radioButtonDiv2);

                    var radioButtonDiv3 = document.createElement('div');
                    radioButtonDiv3.className = 'radio-button';

                        var label3 = document.createElement('label');
                        label3.innerText = 'X';
                        radioButtonDiv3.appendChild(label3);

                        var radio3 = document.createElement('input');
                        radio3.type = 'radio';
                        radio3.id = 'disabled' + s.index;
                        radio3.name = s.index;
                        radio3.value = 'disabled';
                        radio3.className = 'state radio-disabled';
                        radioButtonDiv3.appendChild(radio3);
                
                    radioGroupDiv.appendChild(radioButtonDiv3);
                
                dataDiv.appendChild(radioGroupDiv);

            stageSettings.appendChild(dataDiv);
        }
    });
}

function setStages() {
    var stagesContainer = document.getElementById('stages-container');
    stagesContainer.innerHTML = '';

    var starters = getCookie('starters');

    if(starters === null){
        document.cookie = 'starters=0,1,2,3,4';
        starters = getCookie('starters');
    }
    
    var starterList = starters.split(',').filter(element => element);

    for(let s of starterList) {
        var stageDiv = document.createElement('div');
        stageDiv.className = 'stage starter';

        var stageImg = document.createElement('img');
        stageImg.src = './assets/' + s + '.jpg';

        stageDiv.appendChild(stageImg);

        stagesContainer.appendChild(stageDiv);
    }

    var cp = getCookie('cp');

    if(cp === null){
        document.cookie = 'cp=5,6,7,8';
        cp = getCookie('cp');
    }

    var cpList = cp.split(',').filter(element => element);
    
    for(let s of cpList) {
        var stageDiv = document.createElement('div');
        stageDiv.className = 'stage cp';
        
        var stageImg = document.createElement('img');
        stageImg.src = './assets/' + s + '.jpg';

        stageDiv.appendChild(stageImg);

        stagesContainer.appendChild(stageDiv);
    }

    var disabled = getCookie('disabled');

    if(disabled === null){
        document.cookie = 'disabled=9,10';
    }

    console.log(starters, cp, disabled);

    var createdStages = document.getElementsByClassName('stage'); 

    for(let s of createdStages) {
        s.addEventListener('click', () => {
            banStage(s);
        })
    }

    var cpToggle = document.getElementById('cp-toggle');
    
    viewCps(cpToggle.className.includes('selected'));
}

function setRadioButtons() {
    var starters = getCookie('starters');
    var starterList = starters.split(',').filter(element => element);

    var cp = getCookie('cp');
    var cpList = cp.split(',').filter(element => element);

    var disabled = getCookie('disabled');
    var disabledList = disabled.split(',').filter(element => element);

    for(let s of starterList) {
        document.getElementById('starter'+s).checked = true;
    }

    for (let c of cpList) {
        document.getElementById('cp'+c).checked = true;
    }

    for (let d of disabledList) {
        document.getElementById('disabled'+d).checked = true;
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
    return null;
  }