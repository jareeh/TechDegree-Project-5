const gallery = document.getElementById('gallery');
const search = document.querySelector('.search-container');
let objects = [];
let filteredObjects = [];


fetch('https://randomuser.me/api/?results=12')
    .then(res => res.json())
    .then(res => {
        generateGallery(res.results)
        for (let i = 0; i< res.results.length;i++){
            objects.push(res.results[i]);
        }
        console.log(objects);
        filteredObjects = objects.map(x => x);
    })
    .catch(error => console.log('there was an error retrieving the users', error))




function generateGallery(results){
    gallery.innerHTML = '';


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


function generateModal(i){
    //remove modal if it's already there to prevent a ton of hidden HTML elements
    if(document.querySelector('.modal-container')){
        document.querySelector('.modal-container').parentNode.removeChild(document.querySelector('.modal-container'));
    }

    const index = i;
    const html = `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${filteredObjects[i].picture.medium}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${filteredObjects[i].name.first} ${filteredObjects[i].name.last}</h3>
                <p class="modal-text">${filteredObjects[i].email}</p>
                <p class="modal-text cap">${filteredObjects[i].location.city}</p>
                <hr>
                <p class="modal-text">${filteredObjects[i].cell}</p>
                <p class="modal-text">${filteredObjects[i].location.street.number} ${filteredObjects[i].location.street.name}, ${filteredObjects[i].location.city}, ${filteredObjects[i].location.state} ${filteredObjects[i].location.postcode}</p>
                <p class="modal-text">Birthday: ${filteredObjects[i].dob.date.substr(5, 2)}/${filteredObjects[i].dob.date.substr(8, 2)}/${filteredObjects[i].dob.date.substr(0, 4)}</p>
            </div>
        </div>
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>
    `
    //add/show the modal
    gallery.insertAdjacentHTML('afterend', html)

    //deal with visibility of prev/next
    const prev = document.getElementById('modal-prev');
    const next = document.getElementById('modal-next');
    if(index === 0){
        prev.style.display = 'none';
    }
    if(index === filteredObjects.length - 1){
        next.style.display = 'none';
    }

    //event listener for close button
    document.getElementById('modal-close-btn').addEventListener('click', () => {
        document.querySelector('.modal-container').hidden = true;
        
    })

    //event listener for next button
    next.addEventListener('click', () => {
        document.querySelector('.modal-container').hidden = true;
        if(!(index >= filteredObjects.length - 1)){
            generateModal(index+1);
        }

    })
    //event listener for prev button
    prev.addEventListener('click', () => {
        document.querySelector('.modal-container').hidden = true;    
        if(index>0){
            generateModal(index-1);
        }
    })
}



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

function runSearch(){
    filteredObjects = [];
    let names = [];
    const searchValue = document.getElementById('search-input').value;
    for (let i = 0;i<objects.length;i++){
        let name = `${objects[i].name.first} ${objects[i].name.last}`
        name = name.toLowerCase();
        names.push(name);
    }

    for(let i = 0; i < names.length; i++){
        if(names[i].includes(searchValue)){
            filteredObjects.push(objects[i])
        }
    }
        
    console.log(filteredObjects);
    generateGallery(filteredObjects);
}


search.addEventListener('keyup', (e) => {
    runSearch();
})

gallery.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    const name = card.querySelector('.card-name').textContent;

    for (i=0;i<filteredObjects.length;i++){
        if(name.split(' ')[0] === filteredObjects[i].name.first && name.split(' ')[1] === filteredObjects[i].name.last){
            generateModal(i);
        }
    }
})
