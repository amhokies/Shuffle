// Development key, try to limit api calls as much as possible,
// because we're limited to only 250 api calls on this key
var api_key = "SRITA3jTGnQB9rbSfKwjXEcqKUkgqO"
var base_url = "http://api-public.guidebox.com/v1.43/US/" + api_key;

document.getElementById("search-button").addEventListener("click", function() {
    searchShows(document.getElementById('search-text').value);
});

function searchShows(searchText) {
    var query = base_url + "/search/title/" +
        encodeURIComponent(searchText) + "/fuzzy";
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

        console.log(results);

        listResults(results);
    };
    request.send();
}

function listResults(results) {
    var resultsDiv = document.getElementById('results');

    while (resultsDiv.firstChild) {
        resultsDiv.removeChild(resultsDiv.firstChild);
    }

    for (i in results) {
        var result = results[i];

        var img = document.createElement('img');
        img.className = 'result-image';
        img.setAttribute('src', result.artwork_208x117);
        img.setAttribute('title', result.title);

        // Refer to:
        // http://stackoverflow.com/questions/8909652/adding-click-event-listeners-in-loop
        (function (_result) {
            img.addEventListener('click', function(){
                // Hardcoded source for now
                // goToShowPage(_result.id, "hulu_plus");
                console.log(_result.title);
            });
        })(result);

        resultsDiv.appendChild(img);
    }
}

//episodes/all/0/25/all/all

function goToShowPage(id, source) {
    var query = base_url + "/show/" + id + "/episodes/all/0/100/" + source + "/all"
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

        console.log(results);
    };
    request.send();
}
