let maps = [
    { //map 0.
        "author": "nobody",
        "uid": "x"
    },
    {
        "author": "rcdtm",
        "uid": "382atgsMnZ86PT42JhXzBI8X4D5"
    },
    {
        "author": "magic_yolo",
        "uid": "OKOg8onwIGV0K_It2q2dDZDBPgc"
    },
    {
        "author": "rubypiec_ca1ebyt",
        "uid": "ZWroOfn2rPQ0MaF6BtJ3PaiHjtk"
    },
    {
        "author": "mamg22",
        "uid": "IlgEXVXawx01vtS2ErRtK7eRhD7"
    },
    {
        "author": "mtw2010_xd",
        "uid": "euYyvhqUUjvdRE3vs3wH4yBBhTg"
    },
    {
        "author": "magic_yolo",
        "uid": "ZmsaB1MHjd8c4aFIowtaNNK1avg"
    },
    {
        "author": "poltergeist19",
        "uid": "j9yD4tmPJ2TJOWi9ZSxRrPh2yZd"
    },
    {
        "author": "magic_yolo",
        "uid": "0rM8vb9_umig3PTs0yoYjWtdKWj"
    },
    {
        "author": "ca1ebyt",
        "uid": "IT5Q5iL9JItg4cbqByFw9zh_sCl"
    },
    {
        "author": "mamg22",
        "uid": "QaMSus7Va8xWUwKuqN7sKQ3h6Zj"
    },
    {
        "author": "kubanasa",
        "uid": "7x2aolsL8iiHRSBLstgl74Woog1"
    },
    {
        "author": "ca1ebyt",
        "uid": "lTI9hfIQ7rhi7EyHsc6J_utmvf1"
    },
    {
        "author": "pepebsbk",
        "uid": "URa3PXT5q7GGvKA1SnZKT56nMdd"
    },
    {
        "author": "polar_15",
        "uid": "b2VbPK1DrZp2NXA4MJpwVv3xE1f"
    },
    {
        "author": "mamg22",
        "uid": "OaKW_m2GCloCbTPxemv8vqd5ggb"
    },
]

function updatescrsize(){
    if(window.innerWidth<=650){
        document.getElementById('lbbutton').style.display = 'none'
        document.getElementById('homebutton').style.display = 'none'
        document.getElementById('homeimg').style.display = 'block'
        document.getElementById('lbimg').style.display = 'block'
        for(n of document.getElementsByTagName('tr')){ //why the hell did I use n? idk what else to call this tbf. fair enough
            n.children[3].style.display = 'none'
        }
    } else{
        document.getElementById('lbbutton').style.display = 'block'
        document.getElementById('homebutton').style.display = 'block'
        document.getElementById('homeimg').style.display = 'none'
        document.getElementById('lbimg').style.display = 'none'
        for(n of document.getElementsByTagName('tr')){
            n.children[3].style.display = 'table-cell'
        }
    }
}

for(let i=2;i<=15;i++){
    let mapNum = String(i).padStart(2,'0')
    let newMap = document.getElementById('map1').cloneNode(true)
    newMap.querySelector('.image img').src = `images/kacky${mapNum}.png`
    newMap.querySelector('.text h1').innerHTML = `#${mapNum}`
    newMap.querySelector('.text h2').innerHTML = `by ${maps[i]["author"]}`

    newMap.id = `map${i}`
    newMap.querySelector('.dropdown').id = `dropdown${i}`
    newMap.querySelector('.text').children[2].id = `select${i}`

    newMap.onclick = null;
    newMap.addEventListener('click', function (){opendropdown(i)})
    document.getElementById('maplist').appendChild(newMap)
}

let joinButton = document.createElement('a')
joinButton.classList.add('join')
joinButton.href = 'tmtp://#join=a01kackytm'
joinButton.innerHTML='Join the server!'

document.getElementById('maplist').appendChild(document.createElement('br'))
document.getElementById('maplist').appendChild(joinButton)

let opinions;
if(!localStorage.getItem('opinions')){
    opinions = Array(15).fill('')
} else{
    opinions = JSON.parse(localStorage.getItem('opinions'))
    for(i=1;i<=15;i++){
        document.getElementById('select' + i).value = opinions[i-1]
    }
    updateopinions()
}

let darkmodeon = false
if(localStorage.getItem('darkmodeon')){
    if(localStorage.getItem('darkmodeon')=='true'){
        swapmode()
    }
}

function updateopinions(){
    opinions = []
    for(i=1;i<=15;i++){
        let selectel = document.getElementById('select' + i)
        opinions.push(selectel.value)
        selectel.setAttribute('class', '')
        if(selectel.value!=''){
            selectel.classList.add(selectel.value)
        }
    }
    localStorage.setItem('opinions', JSON.stringify(opinions))
}

async function loadRecords(mapnumber){
    let neededUID = maps[mapnumber]["uid"]
    //let res = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent(`http://dedimania.net/tmstats/?do=stat&Uid=${neededUID}&Show=RECORDS`))
    let res = await fetch('https://cors-proxy-here.rubypiec.workers.dev/?url=' + encodeURIComponent(`http://dedimania.net/tmstats/?do=stat&Uid=${neededUID}&Show=RECORDS`)) 
    let rawtext = await res.text()
    const parser = new DOMParser()
    let recordshtml = parser.parseFromString(rawtext, "text/html")

    if(Array.from(recordshtml.getElementsByClassName('tabl')[4].children[0].children).slice(3, -2).length==0){
        return null;
    }
    return Array.from(recordshtml.getElementsByClassName('tabl')[4].children[0].children).slice(3, -2).map((a) => a.getElementsByTagName('td'));
    // Length = ^^^^.length
    // Length = recordshtml.getElementsByClassName('tabl')[4].children[0].children.length-5

    // finsPerMap[(MAPNUM)][(PERSON)][(COLUMN)].querySelector('a').innerHTML
    /* List of important columns: 
        3 - login
        4 - display name
        7 - time

        5 - rank (if you remove the queryselector)
    */
}

let finsPerMap = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
]

async function getFinCache(mapnum){
    if(String(finsPerMap[mapnum])!=""){
        return finsPerMap[mapnum]
    } else{
        if(finsPerMap[mapnum]==null){
            return []
        }
        document.getElementById('map' + mapnum).style.cursor = 'progress'
        finsPerMap[mapnum] = await loadRecords(mapnum)
        document.getElementById('map' + mapnum).style.cursor = 'pointer'
        return finsPerMap[mapnum]
    }
}

async function opendropdown(num){
    if(document.getElementById('select' + num).matches(':hover')){
        return;
    }
    let information = await getFinCache(num)
    if(document.getElementById('map' + num).classList.contains('opened')){
        document.getElementById('map' + num).classList.remove('opened')
        document.getElementById('dropdown' + num).style.display = 'none'
    } else{
        document.getElementById('map' + num).classList.add('opened')
        document.getElementById('dropdown' + num).style.display = 'block'

        let finisherlist = '';
        if(information!=null){
            document.getElementById('dropdown' + num).querySelector('h3').innerHTML = information.length + ' finisher' + (information.length == 1 ? '' : 's')

            if(document.getElementById('dropdown' + num).querySelector('.finishers').children.length==0){
                for(let person in information.sort((a,b) => a[5].innerHTML - b[5].innerHTML)){
                    let tooltip = document.createElement('span')
                    tooltip.innerHTML = information[person][7].querySelector('a').innerHTML
                    tooltip.classList.add('tooltipdropdown')

                    if(information.length>10){
                        if(person>information.length-6){
                            tooltip.classList.add('flip')
                        }
                    }

                        /*if(person%3==0&&person>0){
                            finisherlist+='<br>'
                        }*/
                    let player = document.createElement('h1')
                    player.style.display = 'inline'
                    player.style.fontSize = '2.5vw'
                    player.innerHTML = information[person][3].querySelector('a').innerHTML+'&emsp;&emsp;'
                    player.classList.add('pnamedropdown')
                    
                    player.appendChild(tooltip)

                    document.getElementById('dropdown' + num).querySelector('.finishers').appendChild(player)
                    
                    finisherlist+=information[person][3].querySelector('a').innerHTML+'&emsp;&emsp;'
                }
            }
        }
        //document.getElementById('dropdown' + num).querySelector('.finishers h1').innerHTML = finisherlist
    }
}

let playerfininfo = {}
async function openlb(){
    document.getElementById('navbar').querySelector('.navright a').style.cursor = 'wait'
    if(Object.keys(playerfininfo).length == 0){ //basically checks if this is the first time opening this menu
        for(let mapn=1;mapn<=15;mapn++){
            let lbinfo = await getFinCache(mapn)
            if(lbinfo!=null){
                for(let ppos in lbinfo){
                    let person = lbinfo[ppos]
                    let personlogin = person[3].querySelector('a').innerHTML
                    if(!playerfininfo[personlogin]){
                        playerfininfo[personlogin] = {
                            "fins": 1,
                            "averagerank": Number(person[5].innerHTML),
                            "finnedmaps": [mapn]
                        }
                    } else{
                        playerfininfo[personlogin] = {
                            "fins": playerfininfo[personlogin]["fins"] + 1,
                            "averagerank": (playerfininfo[personlogin]["averagerank"] * playerfininfo[personlogin]["fins"] + Number(person[5].innerHTML))/(playerfininfo[personlogin]["fins"]+1),
                            "finnedmaps": [...playerfininfo[personlogin]["finnedmaps"], mapn]
                        }
                    }
                }
            }
        }
        let currentrank = 1
        for([key, value] of Object.entries(playerfininfo).sort((a,b) => {
            if (b[1]["fins"]<a[1]["fins"]) return -1
            if (b[1]["fins"]>a[1]["fins"]) return 1

            if (b[1]["averagerank"]<a[1]["averagerank"]) return 1
            
            return -1
        })){
            let newrow = document.getElementById('playerlb').insertRow(-1)
            newrow.insertCell(0).appendChild(document.createTextNode(currentrank))

            newrow.insertCell(1).appendChild(document.createTextNode(key))

            let finnedMaps = document.createElement('div')
            finnedMaps.innerHTML = value["fins"]
            finnedMaps.classList.add('lbfincount')

            let tooltip = document.createElement('span')
            tooltip.innerHTML = '#' + value["finnedmaps"].join(', #')
            tooltip.classList.add('tooltip')
            finnedMaps.appendChild(tooltip)
            newrow.insertCell(2).appendChild(finnedMaps)

            newrow.insertCell(3).appendChild(document.createTextNode(Math.round(value["averagerank"]*10)/10))
            currentrank++
        }
    }
    document.getElementById('navbar').querySelector('.navright a').style.cursor = 'pointer';
    document.getElementById('maplist').classList.add('hidden')
    document.getElementById('playerlist').classList.remove('hidden')
    updatescrsize()
}

function closelb(){
    document.getElementById('maplist').classList.remove('hidden')
    document.getElementById('playerlist').classList.add('hidden')
}

function swapmode(){
    let swappableElements = [document.getElementsByTagName('html')[0], document.body, document.getElementById('playerlist'), ...Array.from(document.getElementsByClassName('dropdown')), document.getElementsByClassName('join')[0]]
    if(!darkmodeon){
        for(let el of swappableElements){
            el.classList.add('dark')
        }
        darkmodeon = true
        document.getElementById('dmtoggle').src = 'images/sunNOTASTOLENTEXTUREIPROMISE.png'
        localStorage.setItem('darkmodeon', true)
    } else{
        for(let el of swappableElements){
            el.classList.remove('dark')
        }
        darkmodeon = false
        document.getElementById('dmtoggle').src = 'images/moon.png'
        localStorage.setItem('darkmodeon', false)
    }
}

onresize = () => {
    updatescrsize()
}

updatescrsize()