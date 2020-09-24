const gallery = document.getElementById('gallery');
const search = document.querySelector('.search-container');
let objects = [];

fetch('https://randomuser.me/api/?results=12')
    .then(res => res.json())
    .then(res => {
        generateGallery(res.results)
        for (let i = 0; i< res.results.length;i++){
            objects.push(res.results[i]);
        }
        console.log(objects);
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


function generateModal(i){
    const html = `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${objects[i].picture.medium}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${objects[i].name.first} ${objects[i].name.last}</h3>
                <p class="modal-text">${objects[i].email}</p>
                <p class="modal-text cap">${objects[i].location.city}</p>
                <hr>
                <p class="modal-text">${objects[i].cell}</p>
                <p class="modal-text">${objects[i].location.street.number} ${objects[i].location.street.name}, ${objects[i].location.city}, ${objects[i].location.state} ${objects[i].location.postcode}</p>
                <p class="modal-text">Birthday: ${objects[i].dob.date.substr(5, 2)}/${objects[i].dob.date.substr(8, 2)}/${objects[i].dob.date.substr(0, 4)}</p>
            </div>
        </div>
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>
    `

    gallery.insertAdjacentHTML('afterend', html)

    //event listener for close button
    document.getElementById('modal-close-btn').addEventListener('click', () => {
        document.querySelector('.modal-container').hidden = true;
    })

    //event listener for next button
    document.getElementById('modal-next').addEventListener('click', () => {
        document.querySelector('.modal-container').hidden = true;
        
    })
    //event listener for prev button
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


search.addEventListener('keydown', {
    
})

gallery.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    const name = card.querySelector('.card-name').textContent;
    console.log(name.split(' ')[0])

    for (i=0;i<objects.length;i++){
        if(name.split(' ')[0] === objects[i].name.first && name.split(' ')[1] === objects[i].name.last){
            generateModal(i);
        }
    }
})
