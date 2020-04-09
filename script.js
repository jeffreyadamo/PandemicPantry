//Test our API
function APIcall(keyword){
    var APIKey = "74d82ee79a804056882eece5c8be4141";
    // var keyword = '';
    var numberOfResults = 5;
   
    var queryURL =
    "https://api.spoonacular.com/recipes/search?query="+ keyword +"&number="+ numberOfResults + "&apiKey=" + APIKey;

    "https://api.spoonacular.com/recipes/search?query=cheese&number=2&apiKey=74d82ee79a804056882eece5c8be4141"

    //Setup AJAX call to OpenWeatherMaps Current Weather Data API:
    $.ajax({
    url:queryURL,
    method: "GET",
    })
    .then(function (response) {
    console.log(response);
    });
}

APIcall("banana");