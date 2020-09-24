const gallery = document.getElementById('gallery');
const search = document.querySelector('.search-container');


fetch('https://randomuser.me/api/?results=12')
    .then(res => res.json())
    .then(res => {
        console.log(res.results)
        generateGallery(res.results)
    })
    .catch(error => console.log('there was an error retrieving the users', error))




function generateGallery(results){
    for (let i = 0; i< results.length;i++){
        const html = `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${results[i].picture.medium}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${results[i].name.first} ${results[i].name.last}</h3>
                <p class="card-text">${results[i].email}</p>
                <p class="card-text cap">${results[i].location.city}, ${results[i].location.state}</p>
            </div>
        </div>
        `
        gallery.insertAdjacentHTML('beforeend', html);
    }
}


function generateModal(){
    const html = `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${object.picture.medium}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${object.name.first} ${object.name.last}</h3>
                <p class="modal-text">${object.email}</p>
                <p class="modal-text cap">${object.location.city}</p>
                <hr>
                <p class="modal-text">${object.cell}</p>
                <p class="modal-text">${object.location.street.number} ${object.location.street.name}, ${object.location.city}, ${object.location.state} ${object.location.postcode}</p>
                <p class="modal-text">Birthday: ${object.dob.date.substr(4, 6)}/${object.dob.date.substr(8, 10)}/${object.dob.date.substr(0, 4)}</p>
            </div>
        </div>
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>
    `
    
    
    //
}


/* 

<div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
            <h3 id="name" class="modal-name cap">name</h3>
            <p class="modal-text">email</p>
            <p class="modal-text cap">city</p>
            <hr>
            <p class="modal-text">${object.cell}</p>
            <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
            <p class="modal-text">Birthday: 10/21/2015</p>
        /div>
    </div>
    <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
</div>
*/ 

function generateSearch(){
    const html = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
    `
    search.insertAdjacentHTML('beforeend', html);
}
generateSearch();


gallery.addEventListener('click', (e) => {
    console.log(e.target);
    if(e.target.className === 'card'){
        console.log('You clicked the card!')
    }
})
