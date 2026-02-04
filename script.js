import apps from "./data.json" with {type: 'json'}

const allApps = document.getElementById('All_Apps')
const ownedApps = document.getElementById('Owned_Apps')
const sidebarOptions = document.querySelectorAll('#sidebar p')
const allSections = document.querySelectorAll('main')
const getButtons = document.querySelectorAll('#All_Apps .get.app button')

setup()
localStorage.setItem('OwnedApps', JSON.stringify(apps))

function getApp(id) {
    let ownedApps = JSON.parse(localStorage.getItem('OwnedApps'));
    console.log(typeof(ownedApps));
    ownedApps[id].bought = true;
    localStorage.setItem('OwnedApps', JSON.stringify(ownedApps));
    alert(`You have successfully purchased ${ownedApps[id].name}!`)
}

function showAllApps() {
    toggleUI('All_Apps')
    allApps.innerHTML = `<h1>All Apps</h1>
    <h2>Productivity</h2><div class="section" id="productivity"></div>
    <h2>Browsers</h2><div class="section" id="browsers"></div>
    <h2>Games</h2><div class="section" id="games"></div>`

    for (let app of Object.entries(apps)) {
        document.querySelector(`#All_Apps #${app[1].category}`).innerHTML += `<div class='app get' id='${app[1].id}'>
        <img src='AppIcons/${app[1].id}.webp' />
        <h4>${app[1].name}</h4><button>Get</button>
        </div>`
    }
}

function toggleUI(id) {
    allSections.forEach((section) => section.classList.add('hidden'))
    document.getElementById(id).classList.remove('hidden')
}

function setup() {
    if (!localStorage.getItem('OwnedApps')) {
        localStorage.setItem('OwnedApps', JSON.stringify(apps))
    }
}

function showOwnedApps() {
    toggleUI('Owned_Apps')
    ownedApps.innerHTML = `<h1>Owned Apps</h1><div class="section"></div>`
    for (let app of Object.entries(JSON.parse(localStorage.getItem('OwnedApps')))) {
        if (app[1].bought) {
            document.querySelector('#Owned_Apps .section').innerHTML += `<div class='app install' id='${app[1].id}'>
        <img src='AppIcons/${app[1].id}.webp' />
        <h4>${app[1].name}</h4><button>Install</button>
        </div>`
        }
    }
}
showAllApps()

for (let option of sidebarOptions) {
    option.addEventListener('click', (e) => {
        if (option.innerText == 'Owned Apps') {
            showOwnedApps()
        } else if (option.innerText == 'All Apps') {
            showAllApps()
        }
    })
}

console.log(getButtons)

allApps.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        console.log(e.target.parentElement.id)
        getApp(e.target.parentElement.id)
    }
})