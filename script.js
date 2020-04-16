var keyword = "";
var diet=
$(".diet-choice").on("click", function() {
  diet= ($(this).val());
  console.log("diet is now " + diet);
})

// APIcall("cookies");
//Test our API
function APIcall(keyword){
  // var APIKey = "454a86eaeacb46388aa9439b5c0c474e";
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
        
        //Puts the title on the recipe card
        var recipeName = response.results[0].title;
        $("#name1").append(recipeName);
        
        //Adds image to the recipe card     
        var img = response.results[0].image;
        var recipeImg = $("#image1").attr("src", img);
        $("#image1").append(recipeImg);
        
        //Adds ingredients to the recipe card
        var ingredientsDiv = $("#ingredients1").text("Ingredients: ");
        //var ulIngredients = $("<ul>");
        
          for (i = 0; i < response.results[0].missedIngredients.length; i++) {
          var ingredients = response.results[0].missedIngredients[i].originalString;   
          //ingredientsDiv.append(ingredients);          
         // ulIngredients.append($("<li>").append(ingredients));
         ingredientsDiv.append(ingredients);
        }
        //ingredientsDiv.append(ulIngredients);

        //Adds instructions to the recipe card
        var instructionsDiv = $("#instructions1").text("Instructions: ");
        //var ulInstructions = $("<ul>");
          for (j = 0; j < response.results[0].analyzedInstructions[0].steps.length; j++) {
          var instructions = response.results[0].analyzedInstructions[0].steps[j].step;
          //ulInstructions.append($("<li>").append(instructions));
          instructionsDiv.append(instructions);
        }
        //instructionsDiv.append(ulInstructions);
        
        //Adds the source url to the recipe card
        var source = response.results[0].sourceUrl;
        //console.log(source);
        var a1 = $("<a>").attr("href", source).text(source);
        $("#source1").append(a1);
 });
}

////////////////////////////////////////////////////////////

//Defining the intolerances for the search
var  intolerances = [];

//Listen for click, then if a checkbox is checked then push the value of the checkbox to the array "intolerances". HTML id's are named so they for loop will search for each checkbox in the class=fieldset2: 
$(".fieldset2").click(function(){
  intolerances = [];
  for (i=0; i<12; i++){
    if ($("#checkbox"+[i]).is(":checked")){
      intolerances.push($("#checkbox"+[i]).val());
    } 
  }
  console.log("intolerances are: " + intolerances.join());
})

//After hitting the search button:
$("#search").on("submit", function(e){
  e.preventDefault();
  keyword = $("#search-input").val();
  var numberOfResults = 5;

  fetchRecipes(keyword, numberOfResults, intolerances);
});

function fetchRecipes(keyword, numberOfResults, intolerances) {

  var APIKey = "74d82ee79a804056882eece5c8be4141";
    
    console.log("Search input includes" + diet +" "+ keyword + "with the following intolerances: " + intolerances);
    var number = "&number=" + numberOfResults;
    var addRecipeInformation = "&addRecipeInformation=true";
    var fillIngredients = "&fillIngredients=true";
    var dietChoices = "&diet=" + diet;
    var getIntolerances = "&intolerances="+ intolerances;
    console.log(getIntolerances);
    var API = "&apiKey=" + APIKey;
    
    //Combine the variables into the query
    var queryURL =
    "https://api.spoonacular.com/recipes/complexSearch?query="
      + keyword 
      + number
      + addRecipeInformation
      + fillIngredients
      + dietChoices
      + getIntolerances
      + API;
      
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET",
    })
    .then(function(response){
        console.log(response);

    });
  }
    ///////////////////////////////////////////////////////////////


//     function updateRecipeItems(data) {
//         var recipeItems = $(".medium-6");
//         recipeItems.each(function(index, element){
//             var element = $(element);
//             element.find("h4").text(data[index].title);
//             element.find("img").attr("src", data[index].image);
//            // element.find(".feature-ingrediets").
//         });
//     }
//}
///////////////////////////////////////////////////////////////////