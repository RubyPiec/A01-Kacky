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

for(let i=2;i<=15;i++){
    let mapNum = String(i).padStart(2,'0')
    let newMap = document.getElementById('map1').cloneNode(true)
    newMap.querySelector('.image img').src = `images/kacky${mapNum}.png`
    newMap.querySelector('.text h1').innerHTML = `#${mapNum}`
    newMap.querySelector('.text h2').innerHTML = `by ${maps[i]["author"]}`

    newMap.id = `map${i}`
    newMap.querySelector('.dropdown').id = `dropdown${i}`

    console.log(i)
    newMap.onclick = null;
    newMap.addEventListener('click', function (){opendropdown(i)})
    document.getElementById('maplist').appendChild(newMap)
}

async function loadRecords(mapnumber){
    let neededUID = maps[mapnumber]["uid"]
    let res = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent(`http://dedimania.net/tmstats/?do=stat&Uid=${neededUID}&Show=RECORDS`))
    let rawtext = await res.text()

    const parser = new DOMParser()
    let recordshtml = parser.parseFromString(rawtext, "text/html")

    return Array.from(recordshtml.getElementsByClassName('tabl')[4].children[0].children).slice(2, -2);
    // Length = ^^^^.length
    // Length = recordshtml.getElementsByClassName('tabl')[4].children[0].children.length-5
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
        finsPerMap[mapnum] = await loadRecords(mapnum)
        return finsPerMap[mapnum]
    }
}

async function opendropdown(num){
    let information = await getFinCache(num)
    console.log(num)
    if(document.getElementById('map' + num).classList.contains('opened')){
        document.getElementById('map' + num).classList.remove('opened')
        document.getElementById('dropdown' + num).style.display = 'none'
    } else{
        document.getElementById('map' + num).classList.add('opened')
        document.getElementById('dropdown' + num).style.display = 'block'
        document.getElementById('dropdown' + num).querySelector('h1').innerHTML = information.length + ' finisher' + (information.length == 1 ? '' : 's')
    }
}