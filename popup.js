// Development key, try to limit api calls as much as possible,
// because we're limited to only 250 api calls on this key
var api_key = "SRITA3jTGnQB9rbSfKwjXEcqKUkgqO"

document.getElementById("search-button").addEventListener("click", function() {
    searchShows(document.getElementById('search-text').value);
});

function searchShows(searchText) {
    var query = "http://api-public.guidebox.com/v1.43/US/" + api_key +
        "/search/title/" + encodeURIComponent(searchText) + "/fuzzy";
    var request = new XMLHttpRequest();
    request.open( "GET", query, true);
    request.onreadystatechange = function () {
        if (request.readyState !== XMLHttpRequest.DONE) {
            return;
        }
        if (request.status !== 200) {
            console.log("There was an issue: " + request.status);
        }

        var json = JSON.parse(request.responseText);
        var results = json.results;

        listResults(results);
    };
    request.send();
}

function listResults(results) {
    var list = document.getElementById('results-list');

    // Clear the list
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    for (i in results) {
        var item = document.createElement('li');
        item.appendChild(document.createTextNode(results[i].title));
        list.appendChild(item);
    }
}
