/* ============================================= */
/*              JavaScript                       */
/* ============================================= */

// Search
const search = document.querySelector('#search');
const exitIcon = document.querySelector('.exit-icon');
const alertBox = document.querySelector('.alert-box');

// Settings on/off switches
const smallCirc1 = document.querySelector('.small-circ1');
const bigCirc1 = document.querySelector('.big-circ1');
const smallCirc2 = document.querySelector('.small-circ2');
const bigCirc2 = document.querySelector('.big-circ2');

// On/off switch labels
const emailOn1 = document.querySelector('.email-on1');
const emailOff1 = document.querySelector('.email-off1');
const emailOn2 = document.querySelector('.email-on2');
const emailOff2 = document.querySelector('.email-off2');

// User form variables 
const user = document.getElementById('userField');
const message = document.getElementById('messageField');
const send = document.getElementById('send');

// Alert notifications
const alertBell = document.querySelector('.bell-svg');
const alertNotifications = document.querySelector('.alert-notifications');
const alertNotificationsUl = document.querySelector('.alert-notifications-list');
const alertNotificationsLi = document.querySelectorAll('.alert-notifications-li');
let nogo = 0;

// display notifications
alertBell.addEventListener('click', () => {
    alertNotifications.classList.toggle('displayBlock');
});

// Close individual notifications
alertNotificationsUl.addEventListener('click', (e) => {
    for (let i = 0; i < alertNotificationsLi.length; i++) {
        e.target.remove();
    }
    nogo++
    if (nogo >= 3) {
        alertNotificationsUl.style.display = "none";
    }
});

// Hide search icon when focused
search.addEventListener('focusin', () => {
    document.querySelector('.search-icon').classList.toggle('hide-content');
});

// Show search icon when not in focus
search.addEventListener('focusout', () => {
    document.querySelector('.search-icon').classList.toggle('hide-content');
});

// Exit alert box
exitIcon.addEventListener('click', () => {
    alertBox.style.display = 'none';
    alertBox.style.transition = '.4s';
})

// Search user event listener
send.addEventListener('click', () => {
    if (user.value === "" && message.value === "") {
        alert("Please fill out user and message fields before sending");
    } else if (user.value === "") {
        alert("Please fill out user field before sending");
    } else if (message.value === "") {
        alert("Please fill out message field before sending");
    } else {
        alert(`Message successfully sent to: ${user.value}`);
    }
});

// JQuery for autocomplete 
$(function () {
    const newMembers = [
        "Victoria Chambers",
        "Dale Byrd",
        "Dawn Wood",
        "Josh Sullivan"
    ];
    $("#userField").autocomplete({
        source: newMembers
    });
});

// Local storage
let emailChoice1;
let emailColor;
let emailLabelOn;
let emailLabelOff;
let publicChoice1;
let publicColor;
let publicLabelOn;
let publicLabelOff;
let timeZone = document.getElementById('timezones');

// toggle email settings switch on/off
bigCirc1.addEventListener('click', () => {
    emailChoice1 = smallCirc1.classList.toggle('margin-left');
    emailColor = bigCirc1.classList.toggle('color-change');
    emailLabelOn = emailOn1.classList.toggle('displayBlock');
    emailLabelOff = emailOff1.classList.toggle('displayNone');
});

// Toggle public settings switch on/off
bigCirc2.addEventListener('click', () => {
    publicChoice1 = smallCirc2.classList.toggle('margin-left');
    publicColor = bigCirc2.classList.toggle('color-change');
    publicLabelOn = emailOn2.classList.toggle('displayBlock');
    publicLabelOff = emailOff2.classList.toggle('displayNone');
});

// Save and cancel buttons
const saveButton = document.querySelector('.save-button')
const cancelButton = document.querySelector('.cancel-button')

// Save Settings 
saveButton.addEventListener('click', () => {

    localStorage.setItem('emailSwitch1', emailChoice1);
    localStorage.setItem('emailSwitchColor', emailColor);
    localStorage.setItem('emailSwitchLabelOn', emailLabelOn);
    localStorage.setItem('emailSwitchLabelOff', emailLabelOff);
    localStorage.setItem('publicSwitch1', publicChoice1);
    localStorage.setItem('publicSwitchColor', publicColor);
    localStorage.setItem('publicSwitchLabelOn', publicLabelOn);
    localStorage.setItem('publicSwitchLabelOff', publicLabelOff);
    localStorage.setItem('timeZoneSaved', timeZone.value);

    alert('Settings successfully saved!');
    location.reload();
});

// Load settings 
const loadSettings = () => {
    const emailSwitchSmallCirc = localStorage.getItem('emailSwitch1');
    const publicSwitchSmallCirc = localStorage.getItem('publicSwitch1');
    timeZone.value = localStorage.getItem('timeZoneSaved');

    if (emailSwitchSmallCirc === "true") {
        emailChoice1 = smallCirc1.classList.toggle('margin-left');
        emailColor = bigCirc1.classList.toggle('color-change');
        emailLabelOn = emailOn1.classList.toggle('displayBlock');
        emailLabelOff = emailOff1.classList.toggle('displayNone');
    }
    if (publicSwitchSmallCirc === "true") {
        publicChoice1 = smallCirc2.classList.toggle('margin-left');
        publicColor = bigCirc2.classList.toggle('color-change');
        publicLabelOn = emailOn2.classList.toggle('displayBlock');
        publicLabelOff = emailOff2.classList.toggle('displayNone');
    }
}

// Cancel settings
cancelButton.addEventListener('click', () => {
    const cancel = confirm('Are you sure you want to cancel changes?');
    if (cancel) {
        localStorage.clear();
        location.reload();
    }
})

// Load settings on page load
window.onload = () => {
    if (localStorage.length !== 0) {
        loadSettings();
    }
};