/* ============================================= */
/*              JavaScript                       */
/* ============================================= */

// Global variables 
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US`;
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal-content');
const modalNav = document.querySelector('.modal-nav');
const modalClose = document.querySelector('.modal-close');
const modalLeft = document.querySelector('.modal-left');
const modalRight = document.querySelector('.modal-right');
const searchBar = document.getElementById('searchBar');
let index = 0;

// Fetch data from API
fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err))

function displayEmployees(employeeData) {

    employees = employeeData;

    // Store the employee HTML as we create it
    let employeeHTML = '';

    // Loop through each employee and create HTML
    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

        employeeHTML += `
            <div class="card" data-index="${index}">
                <img class="avatar" src="${picture.large}" /> 
                <div class="text-container">
                    <h2 class="name">${name.first} ${name.last}</h2> <p class="email">${email}</p>
                    <p class="address">${city}</p>
                </div>
            </div>
        `
        gridContainer.innerHTML = employeeHTML;
    });

}

function displayModal(index) {

    // Object destructuring
    let {
        name, dob, phone, email, location: { city, state, postcode }, picture } = employees[index];

    let date = new Date(dob.date);

    const modalHTML = `
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr />
            <p class="phone-number">${phone}</p>
            <p class="address">${city}, ${state} ${postcode}</p> 
            <p class="birthday">Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p> 
        </div>
    `
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}

gridContainer.addEventListener('click', e => {

    // Make sure click event is not the gridContainer
    if (e.target !== gridContainer) {
        const card = e.target.closest('.card');
        const index = card.getAttribute('data-index');
        displayModal(index);
    }

});

// Close modal 
modalClose.addEventListener('click', () => {
    overlay.classList.add('hidden');
});

// Scroll left and right 
modalNav.addEventListener('click', (e) => {
    if (e.target === modalLeft && parseInt(index) > 0) {
        index--;
    } else if (e.target === modalRight && parseInt(index) < 11) {
        index++;
    }
    displayModal(index);
});

// Search for employees
searchBar.addEventListener("keyup", () => {
    let searchName = searchBar.value.toLowerCase();
    const cards = document.querySelectorAll(".card");
    const names = document.querySelectorAll(".name");

    cards.forEach((card, index) => {
        let name = names[index].textContent.toLowerCase();

        if (name.includes(searchName)) {
            cards[index].style.display = "flex";
        } else {
            cards[index].style.display = "none";
        }
    });
});
