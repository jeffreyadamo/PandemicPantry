require("dotenv").config()
var APIKey = process.env.API_KEY;
let keyword = "";
let intolerances = "";
let diet = "";

module.exports = function(app) {
    app.get("/api/spoonacular/keywordId/:keyword/intolerancesId/:intolerances/dietId/:diet", (req, res) => {
        console.log(req.body);
        console.log(req.params);
        keyword = req.params.keyword;
        console.log(keyword);
        intolerances = req.params.intolerances;
        diet = req.params.diet;
        console.log("keyword: " + keyword);
        console.log("intolerances: " + intolerances);
        console.log("diet: " + diet);

        //TODO: API call with params
        res.json(req.params)

    });
}