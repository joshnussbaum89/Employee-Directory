/* ============================================= */
/*              JavaScript                       */
/* ============================================= */
fetch('https://randomuser.me/api/')
    .then(response => response.json())
    .then(data => console.log(data.results)); // create function to print results to page