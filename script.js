var keyword = "";

//DIET CHOICES RADIO CHECKBOX
var diet="";
$(".diet-choice").on("click", function(data) {
  console.log(data);
  console.log(data.val())
})

//PREP TIME RADIO CHECKBOX
// var prepTime="";
// $(".cooktime-choice").on("click", function() {
//   prepTime = $("input[name='cooktime']:checked").val();
//   if(prepTime){
//     console.log("prepTime is now " + prepTime);
// }})

////////////////////////////////////////////////////////////

//Defining the intolerances for the search
var  intolerances = [];

//Listen for click, then if a checkbox is checked then push the value of the checkbox to the array "intolerances". HTML id's are named so they for loop will search for each checkbox in the class=intols 
$(".intols").click(function(){
  intolerances = [];
  for (i=0; i<12; i++){
    if ($("#checkbox"+[i]).is(":checked")){
      intolerances.push($("#checkbox"+[i]).val());
    } 
  }
  console.log("intolerances are: " + intolerances.join());
})

//After hitting the search button:
$("#search").on("submit", function(event){
  event.preventDefault();
  keyword = $("#search-input").val();
  $("#snippet").html("Ahh yes, yummy " + keyword + "...<br>");
  console.log("Search input includes" + diet +" "+ keyword + "with the following intolerances: " + intolerances);
  wikiAPI(keyword);
  APIfetchRecipies(keyword, intolerances, diet);
});

function APIfetchRecipies(keyword, intolerances, diet){
  console.log("keyword: " + keyword);
  console.log("intolerances: " + intolerances);
  console.log(intolerances);
  console.log("diet: " + diet);
  console.log(diet);
  if(!intolerances[0]){intolerances = "none"};
  if(!diet){diet = "none"};
  console.log("intolerances: " + intolerances);
    $.get("/api/spoonacular/keywordId/" + keyword + "/intolerancesId/" + intolerances + "/dietId/" + diet
      )
      .then((response) => {
        // console.log("API data:")
        // console.log(response)
        renderRecipeCards(response)

      })
      .catch((err) => { 
        if (err) throw err}
      )
}

function renderRecipeCards(response) {
  $("#recipeCard").empty();
  console.log("Response received from API side:");
  console.log(response);

    for (x = 0; x < 99; x++) {
      var cardDiv = $("<div class='cell shrink callout primary text-left'>");
      var nameEl = $("<h4 id='name'>");
      var imgEl = $("<img class='feature-image'>");
      var ingredientsDiv = $("<div class='feature-ingredients' id='ingredients'>");
      var instructionsDiv = $("<div class='feature-recipe'>");
      var sourceEl = $("<div>");
        
      //Puts the title on the recipe card
      var recipeName = response[x].title;
      nameEl.append(recipeName);
      cardDiv.append(nameEl);

      //Adds image to the recipe card     
      var img = response[x].image;
      imgEl.attr("src", img);
      cardDiv.append(imgEl);
        
      // Adds ingredients to the recipe card
      var ulIngredients = $("<ul>");

      // for (i = 0; i < response[x].missedIngredients.length; i++) {
      //   var ingredients = response[x].missedIngredients[i].originalString;   
      //   ulIngredients.append($("<li>").append(ingredients));
      // }
      // ingredientsDiv.text("Ingredients: ");
      // ingredientsDiv.append(ulIngredients);
      // cardDiv.append(ingredientsDiv);

      // Fixing the ingredients
      for (i = 0; i < response[x].extendedIngredients.length; i++) {
        var ingredients = response[x].extendedIngredients[i].original;   
        ulIngredients.append($("<li>").append(ingredients));
      }
      ingredientsDiv.text("Ingredients: ");
      ingredientsDiv.append(ulIngredients);
      cardDiv.append(ingredientsDiv);

      // Adds instructions to the recipe card        
      var olInstructions = $("<ol>");

        for (j = 0; j < response[x].analyzedInstructions[0].steps.length; j++) {
        var instructions = response[x].analyzedInstructions[0].steps[j].step;
        olInstructions.append($("<li>").append(instructions));
        }
      instructionsDiv.text("Instructions: ");
      instructionsDiv.append(olInstructions);
      cardDiv.append(instructionsDiv);

        //Adds the source url to the recipe card
      var source = response[x].sourceUrl;
      if (source === "") {
        var a1 = $("<a>").attr("href", "https://spoonacular.com")
      } else {
      var a1 = $("<a>").attr("href", source).text(source);
      sourceEl.append(a1);
      cardDiv.append(sourceEl);
      $("#recipeCard").append(cardDiv);
    };
  };
};

//////////// WIKIPEDIA API ///////////
function renderWikiSnippet(response){
  $("#snippet").append(response.query.search[0].snippet);
  $("#snippet").append("...");
  $("#snippet").append("<a href='https://en.wikipedia.org/wiki/"+keyword+"'>see more at Wikipedia</a>"); 
}

function wikiAPI (keyword){
  var queryWikiURL = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch="+keyword+"&origin=*";

  $.ajax({
    url: queryWikiURL,
    method: "GET",
  })
  .then(function(response){
    renderWikiSnippet(response);
  });
}
/////////////////////////////////////