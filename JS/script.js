const url = 'https://google-search72.p.rapidapi.com/search?q=';
const submitBtn = document.getElementById("submitBtn");
const searchTerm = document.querySelector('.search');

submitBtn.addEventListener("click", fetchResults);

function fetchResults(event) {
    event.preventDefault();

    //search string becomes what was submitted in the search bar
    let searchString = searchTerm.value;
    //cannot have whitespace in a url
    let urlString = searchString.replace(/ /g, '%20');
    //adding the search string to the url
    let finalUrl = `${url}${urlString}&gl=ca&lr=lang_en&num=10&start=0`;

    console.log(finalUrl);

    //getting rapid api parameters (key and host)
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '9f48e7a217msh1d24ab9a0d0449cp133f06jsn99d531cf1ebf',
            'X-RapidAPI-Host': 'google-search72.p.rapidapi.com'
        }
    };

    //calling the fetch api
    fetch(finalUrl, options)
        .then(response => response.json())
        .then(json => displayResults(json))
        .catch(error => console.error(error));
}