var keyword = "";
var diet=
$(".diet-choice").on("click", function() {
  diet= ($(this).val());
  console.log("diet is now " + diet);
})

APIcall("tomatoes");
//Test our API
function APIcall(keyword){
  var APIKey = "74d82ee79a804056882eece5c8be4141";

  //API query URL search criteria:
  //// Go to https://spoonacular.com/food-api/docs#Search-Recipes-Complex to see search criteria
  var numberOfResults = 4;
  var number = "&number=" + numberOfResults;
  var addRecipeInformation = "&addRecipeInformation=true";
  var fillIngredients = "&fillIngredients=true";
  var diet = ""
  var dietChoices = "&diet=" + diet;
  var API = "&apiKey=" + APIKey;

    //"&addRecipeInformation=true" includes a lot more info
    //"&fillIngredients=true" Add info about the used and missing ingredients in each recipe
    //"&diet=''"" allows to toggle from vegan, vegetarian, glutenFree

  var queryURL = 
  "https://api.spoonacular.com/recipes/complexSearch?query=" 
    + keyword 
    + number
    + addRecipeInformation
    + fillIngredients
    + dietChoices
    + API;

    console.log("queryURL is " + queryURL);

  //Setup AJAX call to Spoonacular API:
  $.ajax({
    url: queryURL,
    method: "GET",
    })
    .then(function (response) {
        console.log(response);

        for (x = 0; x < 4; x++) {
          var cardDiv = $("<div class='medium-6 columns'>");
          var nameEl = $("<h4 id='name'>");
          var imgEl = $("<img class='feature-image'>");
          var ingredientsDiv = $("<div class='feature-ingredients' id='ingredients'>");
          var instructionsDiv = $("<div class='feature-recipe'>");
          var sourceEl = $("<div>");
        
        //Puts the title on the recipe card
        var recipeName = response.results[x].title;
        nameEl.append(recipeName);
        cardDiv.append(nameEl);
                    
        //Adds image to the recipe card     
        var img = response.results[x].image;
        imgEl.attr("src", img);
        cardDiv.append(imgEl);
           
        //Adds ingredients to the recipe card
        // var ingredientsDiv = $("#ingredients").text("Ingredients: ");
        var ulIngredients = $("<ul>");
        
          for (i = 0; i < response.results[0].missedIngredients.length; i++) {
          var ingredients = response.results[0].missedIngredients[i].originalString;   
          ulIngredients.append($("<li>").append(ingredients));
          }
          ingredientsDiv.text("Ingredients: ");
          ingredientsDiv.append(ulIngredients);
          cardDiv.append(ingredientsDiv);

        //Adds instructions to the recipe card
        var olInstructions = $("<ol>");
          for (j = 0; j < response.results[0].analyzedInstructions[0].steps.length; j++) {
          var instructions = response.results[0].analyzedInstructions[0].steps[j].step;
          olInstructions.append($("<li>").append(instructions));
        }
        instructionsDiv.text("Instructions: ");
        instructionsDiv.append(olInstructions);
        cardDiv.append(instructionsDiv);
        
        //Adds the source url to the recipe card
        var source = response.results[x].sourceUrl;
        var a1 = $("<a>").attr("href", source).text(source);
        sourceEl.append(a1);
        cardDiv.append(sourceEl);
        $("#recipeCard").append(cardDiv);

      }
 });
}


$("#search").on("submit", function(e){
    e.preventDefault();
    keyword = $("#search-input").val();
    var numberOfResults = 4;


    fetchRecipes(keyword, numberOfResults);
    
});




var APIKey = "74d82ee79a804056882eece5c8be4141";

function fetchRecipes(keyword, numberOfResults) {


    // var dietChoice = $("input[name='diet']:checked");
    // console.log(dietChoice);
    // var diet = $(dietChoice).val();
    console.log("diet searched is " + diet + keyword);


//    // console.log(diets);
//     // var diet;
//     // for (var i = 0 ; i < diets.length; i++) {
//     //     console.log(diets[i]);
//     //     if (diets[i].checked) {
//     //         diet = $(diets[i]).text;
//     //     }
//     // }
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
//     function updateRecipeItems(data) {
//         var recipeItems = $(".medium-6");
//         recipeItems.each(function(index, element){
//             var element = $(element);
//             element.find("h4").text(data[index].title);
//             element.find("img").attr("src", data[index].image);
//            // element.find(".feature-ingrediets").

//         });
//     }


}





