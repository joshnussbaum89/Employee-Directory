/* ============================================= */
/*              JavaScript                       */
/* ============================================= */
fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json())
    .then(data => console.log(data.results)); // create function to print results to page