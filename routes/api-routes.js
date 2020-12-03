require("dotenv").config()
const axios = require("axios");
const number = "&number=99";
const addRecipeInformation = "&addRecipeInformation=true";
const fillIngredients = "&fillIngredients=true";
const instructionsCall = "&instructionsRequired=true";
const API = "&apiKey=" + process.env.API_KEY;

module.exports = function(app) {
    app.get("/api/spoonacular/keywordId/:keyword/intolerancesId/:intolerances/dietId/:diet", (req, res) => {
        let keyword = req.params.keyword;
        let intolerances = req.params.intolerances;
        let diet = req.params.diet;

        if (intolerances === "none") {intolerances=""};
        if (diet === "none") {diet=""};

        let dietChoices = "&diet=" + diet;
        let getIntolerances = "&intolerances="+ intolerances;

        console.log("searching with " + [keyword, intolerances, diet])

        let queryURL =
          "https://api.spoonacular.com/recipes/complexSearch?query="
            + keyword 
            + number
            + addRecipeInformation
            + fillIngredients
            + dietChoices
            + instructionsCall
            + getIntolerances
            + API;

        axios.get(queryURL)
        .then(function (response){
            console.log("response received " + response.data.results.length + " results")
            res.send(response.data.results);
        })
        .catch(function (err) {
            console.log(err);
        });        
    });
}