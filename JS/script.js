const url = "https://google-search72.p.rapidapi.com/search?q=";
const submitBtn = document.getElementById("submitBtn");
const searchTerm = document.querySelector(".search");
const section = document.querySelector("section");
const myStudentId = document.getElementById("studentNumber");
const queryDiv = document.getElementById("queryDiv");
const backButton = document.getElementById("backButton");
const nextButton = document.getElementById("nextButton");
let startIndex = 0;

submitBtn.addEventListener("click", fetchResults);
myStudentId.textContent = "Stefan Saladino - 200551988";
backButton.addEventListener("click", fetchPreviousPage);
nextButton.addEventListener("click", fetchNextPage);

async function fetchResults(event) {
  event.preventDefault();

  //search string becomes what was submitted in the search bar
  let searchString = searchTerm.value;
  //cannot have whitespace in a url
  let urlString = searchString.replace(/ /g, "%20");
  //adding the search string to the url
  let finalUrl = `${url}${urlString}&gl=ca&lr=lang_en&num=10&start=${startIndex}`;

  console.log(finalUrl);

  //getting rapid api parameters (key and host)
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9bbd770d55mshbcbbe367ee48fa0p1a1c49jsn490561015f76",
      "X-RapidAPI-Host": "google-search72.p.rapidapi.com",
    },
  };

  //calling the fetch api
  fetch(finalUrl, options)
    .then((response) => response.json())
    .then((json) => displayResults(json))
    .catch((error) => console.error(error));
}

function displayResults(json) {
  console.log(json);

  // Clear out the old results…
  while (section.firstChild) {
    section.removeChild(section.firstChild);
  }
  while (queryDiv.firstChild) {
    queryDiv.removeChild(queryDiv.firstChild);
  }
  //Create the variable articles to capture the articles from the JSON object
  let articles = json.items;

  //if no articles are found, nothing is returned
  if (articles.length === 0) {
    const queryPara = document.createElement("p");
    queryPara.textContent = "No results found.";
    queryDiv.appendChild(queryPara);
  }
  //if search results are returned, the json is parsed and the html elements are created
  else {
    let searchString = searchTerm.value;
    const queryPara = document.createElement("p");
    queryDiv.appendChild(queryPara);
    queryPara.textContent = `Showing page ${
      startIndex + 1
    } for: ${searchString}`;
    for (let i = 0; i < articles.length; i++) {
      const article = document.createElement("article");
      const heading = document.createElement("h2");
      const link = document.createElement("a");
      const img = document.createElement("img");
      const para1 = document.createElement("p");

      const current = articles[i];
      console.log(current);
      
      link.href = current.link;
      link.textContent = current.title;
      para1.textContent = current.HTMLsnippet;

      article.appendChild(heading);
      heading.appendChild(link);
      article.appendChild(img);
      article.appendChild(para1);
      section.appendChild(article);
    }
  }
}

//will return previous page results when button is clicked
function fetchPreviousPage() {
  if (startIndex > 0) {
    startIndex--;

    //search string becomes what was submitted in the search bar
    let searchString = searchTerm.value;
    //cannot have whitespace in a url
    let urlString = searchString.replace(/ /g, "%20");
    //adding the search string to the url
    let finalUrl = `${url}${urlString}&gl=ca&lr=lang_en&num=10&start=${startIndex}`;

    console.log(finalUrl);

    //getting rapid api parameters (key and host)
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "9bbd770d55mshbcbbe367ee48fa0p1a1c49jsn490561015f76",
        "X-RapidAPI-Host": "google-search72.p.rapidapi.com",
      },
    };
    //calling the fetch api
    fetch(finalUrl, options)
      .then((response) => response.json())
      .then((json) => displayResults(json))
      .catch((error) => console.error(error));
  }
}

//will return the next page of results
function fetchNextPage() {
  startIndex++;

  //search string becomes what was submitted in the search bar
  let searchString = searchTerm.value;
  //cannot have whitespace in a url
  let urlString = searchString.replace(/ /g, "%20");
  //adding the search string to the url
  let finalUrl = `${url}${urlString}&gl=ca&lr=lang_en&num=10&start=${startIndex}`;

  console.log(finalUrl);

  //getting rapid api parameters (key and host)
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "9bbd770d55mshbcbbe367ee48fa0p1a1c49jsn490561015f76",
      "X-RapidAPI-Host": "google-search72.p.rapidapi.com",
    },
  };
  //calling the fetch api
  fetch(finalUrl, options)
    .then((response) => response.json())
    .then((json) => displayResults(json))
    .catch((error) => console.error(error));
}
