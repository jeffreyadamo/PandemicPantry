require("dotenv").config()
var APIKey = process.env.API_KEY;

module.exports = function(app) {
    app.get("/api/spoonacular/:keyword", (req, res) => {
        const keyword = req.params.keyword;
        const intolerances = req.params.intolerances;
        console.log("keyword from req.params.keyword is " + keyword);
        console.log("keyword from req.params.intolerances is " + intolerances)
        res.json(req.params)

    });
}