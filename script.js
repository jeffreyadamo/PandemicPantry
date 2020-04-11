//Test our API
function APIcall(keyword) {
  var APIKey = "74d82ee79a804056882eece5c8be4141";
  // var keyword = '';
  var numberOfResults = 5;

  //Go to https://spoonacular.com/food-api/docs#Search-Recipes-Complex to see search criteria
  //"&addRecipeInformation=true" includes a lot more info
  //"&fillIngredients=true" Add info about the used and missing ingredients in each recipe
  //&diet= + diet +
  var diet = "diary free"

  var queryURL =
    "https://api.spoonacular.com/recipes/complexSearch?query=" +
    keyword +
    "&number=" + numberOfResults +
    "&addRecipeInformation=true&fillIngredients=true&diet=" + diet + "&apiKey=" +
    APIKey;

  //Setup AJAX call to Spoonacular API:
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    ////////////////////////////////
    //Setup diets: when "radio" boxes under searched are checked, only these vegetarian, vega, glutenFree, 

    //vegetarian
    var veganFree = response.results[0].vegetarian;

    //vegan
    var veganFree = response.results[0].vegan;

    //gluten free
    var glutanFree = response.results[0].glutanFree;
  });
}

APIcall("cookies");
