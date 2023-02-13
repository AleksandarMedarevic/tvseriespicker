// javascript

import {filmsArchive} from "/data.js"
const genreRadios = document.getElementById("genre-radios")
let serbianOnly= document.getElementById(`serbian-only`)
const choseBtn= document.getElementById(`chose-btn`)
let genreId = ``
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')




function getFilmsGenre(films){
    const genreArray=[]
    for (let film of films){
        for (let genre of film.genreTag){
             if (!genreArray.includes(genre)) {
              genreArray.push(genre)  
             }           
        }
    } return genreArray
}

function renderGenreArray(films){
    let radioItem=``
    const genres=getFilmsGenre(films)
    for (let genre of genres) {
        radioItem +=
        `<div class="separate-genre" id="separate-genre">
            <label for=${genre} class="labelBtn"> ${genre} </label>
            <input type="radio" class="radio-button" name="radio-button" 
         id=${genre} value=${genre}>
        </div>`
    }
    genreRadios.innerHTML=radioItem
}

renderGenreArray(filmsArchive)


genreRadios.addEventListener(`change`,function(e){
    const genreItems = document.getElementsByClassName("separate-genre")
    for (let genreItem of genreItems) {
        genreItem.classList.remove(`chosed`)
    }    
    document.getElementById(e.target.id).parentElement.classList.add(`chosed`)
})

//is Serbian tv show by clicking

function isSerbian() {
    if (document.querySelector(`input[type="checkbox"]:checked`)){
        serbianOnly=true
        console.log(`is it Serbian show`,serbianOnly)
    } else {
        serbianOnly=false
        console.log(`is it Serbian show`, serbianOnly)
    } 

    return serbianOnly
}

// chose genre

function choseYourGenre(){
     if (document.querySelector(`input[type="radio"]:checked`)){
        genreId=document.querySelector(`input[type="radio"]:checked`).value
        console.log(`izabrani zandr`, genreId)  
     } else {
        console.log('Choose your genre')
        genreId=document.querySelector(`input[type="radio"]`).value
    }
    return genreId
}

function createChosedShowsArray(){
    const showsGenreArray= filmsArchive.filter(function(show){
         if (serbianOnly) {
          return show.genreTag.includes(genreId) && show.isSerbian   
         } else {
          return show.genreTag.includes(genreId)
         }         
        })
    //console.log(`niz`,showsGenreArray) 
    return showsGenreArray
}


function getSingleShow(){
    const seriesArray= createChosedShowsArray()
    let item = Math.floor(Math.random()*seriesArray.length)
    return (seriesArray[item])
}


function renderShow(){
    const oneSerie = getSingleShow()
    memeModalInner.innerHTML = 
    `<div class="serija">
    <img 
        class="serie-img" 
        src="./images/${oneSerie.image}"
        alt="${oneSerie.alt}"
        >
        <h3>${oneSerie.alt}</h3>
        <div>`
    memeModal.style.display= `flex`
    document.getElementById("chose-btn").disabled = true
}

function closeOutside(){
    window.onclick = function(event) {
       if (event.target == memeModal) {
        console.log("bbbb")
  } else {
      memeModal.style.display= "none"
  }
}
}



choseBtn.addEventListener('click', function(){ 
    isSerbian()
    choseYourGenre()
    createChosedShowsArray()
    getSingleShow()
    renderShow()
})

//close Btn

let closeBtn = document.getElementById("close-btn")

closeBtn.addEventListener("click", function(){
    memeModal.style.display= "none"
    document.getElementById("chose-btn").disabled = false;
})
