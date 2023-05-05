module.exports = function(app){
    require("./users.route.js")(app)
    require("./character.route.js")(app)
    require("./favorites.route.js")(app)
};