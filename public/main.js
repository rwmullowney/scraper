

$(document).ready(function () {

    
$(".scrape").on('click', (event) => {
    event.preventDefault();

    $.getJSON("/api/scrape", function(data){
        console.log("From the scrape main.js: \n" + data)
    });
    
});
    console.log("in main.js");




});