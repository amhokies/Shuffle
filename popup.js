// Development key, try to limit api calls as much as possible,
// because we're limited to only 250 api calls on this key
var api_key = "SRITA3jTGnQB9rbSfKwjXEcqKUkgqO"

document.getElementById("search-button").addEventListener("click", function() {
    var text = document.getElementById('search-text').value;
    var query = "http://api-public.guidebox.com/v1.43/US/" + api_key +
        "/search/title/" + encodeURIComponent(text) + "/fuzzy";
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

        for (i in results) {
            console.log(results[i].title);
        }
    };
    request.send();

    document.getElementById("results").innerHTML = query;
});
