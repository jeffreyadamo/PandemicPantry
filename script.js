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

    ///////////////////////////


  });
}
$("#search").on("submit", function(e){
    e.preventDefault();
    var keyword = $("#search-input").val();
    var numberOfResults = 5;

    fetchRecipes(keyword, numberOfResults);
    
});

//APIcall("chicken");

var APIKey = "74d82ee79a804056882eece5c8be4141";

function fetchRecipes(keyword, numberOfResults) {

    var dietChoice = $("input[name='diet']:checked");
    console.log(dietChoice);
    var diet = $(dietChoice).val();
    console.log(diet);

   // console.log(diets);
    // var diet;
    // for (var i = 0 ; i < diets.length; i++) {
    //     console.log(diets[i]);
    //     if (diets[i].checked) {
    //         diet = $(diets[i]).text;
    //     }
    // }
    var queryURL =
    "https://api.spoonacular.com/recipes/complexSearch?query="+ keyword +"&number="+ numberOfResults + "&diet=" + diet + "&addRecipeInformation=true&fillIngredients=true&apiKey=" + APIKey;
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET",
    })
    .then(function(response){
        console.log(response);

    });
    function updateRecipeItems(data) {
        var recipeItems = $(".medium-6");
        recipeItems.each(function(index, element){
            var element = $(element);
            element.find("h4").text(data[index].title);
            element.find("img").attr("src", data[index].image);
           // element.find(".feature-ingrediets").

        });
    }


}



//"https://api.spoonacular.com/recipes/complexSearch?query=chicken&number=4&diet=vegan&addRecipeInformation=true&fillIngredients=true//&apiKey=74d82ee79a804056882eece5c8be4141";
