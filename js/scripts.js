const gallery = document.getElementById('gallery');
const search = document.querySelector('.search-container');
let objects = [];
let filteredObjects = [];

//Get the data from the API, call JSON on it, and push it to the objects array
//Create another array for filtering and searching using map function
//Errors will be caught and logged to console
fetch('https://randomuser.me/api/?results=12')
    .then(res => res.json())
    .then(res => {
        generateGallery(res.results)
        for (let i = 0; i< res.results.length;i++){
            objects.push(res.results[i]);
        }
        filteredObjects = objects.map(x => x);
    })
    .catch(error => console.log('There was an error retrieving the profiles.', error))



/**
 * Generates directory for length of array of profiles passed in.
 *
 * @param {array} results The array to create DOM cards from.
 */
function generateGallery(results){
    //Set the innerHTML gallery to nothing every time it's called, for maximum compatibility with search function
    //Contrary to project notes, this is okay, because I set up the event listener on the gallery itself, taking advantage of event bubbling
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



/**
 * Generates modal for profile passed in.
 *
 * @param {number} i The index of the profile to create DOM modal from filteredObjects array.
 */
function generateModal(i){
    //remove modal if it's already there to prevent a ton of hidden HTML elements
    if(document.querySelector('.modal-container')){
        document.querySelector('.modal-container').parentNode.removeChild(document.querySelector('.modal-container'));
    }

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
    //add the modal
    gallery.insertAdjacentHTML('afterend', html)

    //call handler function for prev/next buttons
    prevNextHandler(i);
}



/**
 * Helper function for generateModal
 * Handles the functionality/visibility of the previous and next buttons on modal
 *
 * @param {number} i The index of the profile to create DOM modal from passed through from generateModal.
 */
function prevNextHandler(i){
    //shortcut to prev/next buttons
    const prev = document.getElementById('modal-prev');
    const next = document.getElementById('modal-next');

    //deal with visibility of prev/next
    if(i === 0){
        prev.style.display = 'none';
    }
    if(i === filteredObjects.length - 1){
        next.style.display = 'none';
    }

    //if both of the above conditions are met, then there is only one object
    //and we can hide the entire button container to make the modal look cleaner
    if(i === 0 && i === (filteredObjects.length -1)){
        document.querySelector('.modal-btn-container').style.display = 'none';
    }

    //event listener for close button
    document.getElementById('modal-close-btn').addEventListener('click', () => {
        document.querySelector('.modal-container').hidden = true;
        
    })

    //event listener for next button
    next.addEventListener('click', () => {
        document.querySelector('.modal-container').hidden = true;
        if(!(i >= filteredObjects.length - 1)){
            generateModal(i+1);
        }

    })
    //event listener for prev button
    prev.addEventListener('click', () => {
        document.querySelector('.modal-container').hidden = true;    
        if(i>0){
            generateModal(i-1);
        }
    })
}



/**
 * Generates search HTML and adds it to search container.
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



/**
 * Search controller function
 * - Resets filteredObjects array when called
 * - Adds objects to it whose names include search input value
 */
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
        
    generateGallery(filteredObjects);
}



//Event listener for search
//used 'keyup' to have a more responsive search experience
search.addEventListener('keyup', (e) => {
    runSearch();
})



//Event listener for modal generation
gallery.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    const name = card.querySelector('.card-name').textContent;

    //for the updated filteredObjects array
        //if the first name and last name of the card equal the first and last name of the object, generate the modal for that object
    for (i=0;i<filteredObjects.length;i++){
        if(name.split(' ')[0] === filteredObjects[i].name.first && name.split(' ')[1] === filteredObjects[i].name.last){
            generateModal(i);
        }
    }
})
