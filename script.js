//Test our API
function APIcall(keyword){
    var APIKey = "454a86eaeacb46388aa9439b5c0c474e";
    // var keyword = '';
    var numberOfResults = 5;
   
    //Go to https://spoonacular.com/food-api/docs#Search-Recipes-Complex to see search criteria
        //"&addRecipeInformation=true" includes a lot more info
        //"&fillIngredients=true" Add info about the used and missing ingredients in each recipe

    var queryURL =
    "https://api.spoonacular.com/recipes/complexSearch?query="+ keyword +"&number="+ numberOfResults + "&addRecipeInformation=true&fillIngredients=true&apiKey=" + APIKey;

    //Setup AJAX call to Spoonacular API:
    $.ajax({
    url:queryURL,
    method: "GET",
    })
    .then(function (response) {
        console.log(response);
        
        //Puts the title on the recipe card
        var recipeName = response.results[0].title;
        $("#name1").append(recipeName);
        
        //Adds image to the recipe card     
        var img = response.results[0].image;
        var recipeImg = $("#image1").attr("src", img);
        $("#image1").append(recipeImg);
        
        //Adds ingredients to the recipe card
        var ingredientsDiv = $("#ingredients1").text("Ingredients: ");
          for (i = 0; i < response.results[0].missedIngredients.length; i++) {
          var ingredients = response.results[0].missedIngredients[i].originalString;
          ingredientsDiv.append(ingredients);
        }

        //Adds instructions to the recipe card
        var instructionsDiv = $("#instructions1").text("Instructions: ");
          for (j = 0; j < response.results[0].analyzedInstructions[0].steps.length; j++) {
          var instructions = response.results[0].analyzedInstructions[0].steps[j].step;
          instructionsDiv.append(instructions);
        }
        
        //Adds the source url to the recipe card
        var source = response.results[0].sourceUrl;
        console.log(source);
        var a1 = $("<a>").attr("href", source).text(source);
        $("#source1").append(a1);
 });
}

APIcall("chicken");
