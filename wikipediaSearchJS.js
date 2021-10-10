let searchInput = document.getElementById("searchInput");

let searchResults = document.getElementById("searchResults");

let spinner = document.getElementById("spinner");

function createAppendresult(result) {
    let {
        title,
        link,
        description
    } = result;

    let searchContainerEl = document.createElement("div");
    searchContainerEl.classList.add("result-item");

    let ankerElemenet1 = document.createElement("a");
    ankerElemenet1.classList.add("result-title");
    ankerElemenet1.textContent = title;
    ankerElemenet1.href = link;
    ankerElemenet1.target = "_blank";
    searchContainerEl.appendChild(ankerElemenet1);

    let breakEl = document.createElement("br");
    searchContainerEl.appendChild(breakEl);

    let ankerElemenet2 = document.createElement("a");
    ankerElemenet2.classList.add("result-url");
    ankerElemenet2.textContent = link;
    ankerElemenet2.href = link;
    ankerElemenet2.target = "_blank";
    searchContainerEl.appendChild(ankerElemenet2);

    let breakE2 = document.createElement("br");
    searchContainerEl.appendChild(breakE2);

    let paragraph = document.createElement("p");
    paragraph.textContent = description;
    paragraph.classList.add("link-description");
    searchContainerEl.appendChild(paragraph);

    searchResults.appendChild(searchContainerEl);


}

function displayResults(searchResults) {
    spinner.classList.toggle("d-none");

    for (let result of searchResults) {
        createAppendresult(result);
    }
}

function displaySearch(event) {
    let searchValue = searchInput.value;

    if (event.key === "Enter") {
        spinner.classList.toggle("d-none");
        searchResults.textContent = "";
        let options = {
            method: "GET"
        };
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchValue;
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}

searchInput.addEventListener("keydown", displaySearch);