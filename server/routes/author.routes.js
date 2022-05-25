// ! findReplace all "Author" with "YourNewProName" or whatever your new thing is 
// ! THEN do similar find replace for "author" Make sure lower case
const AuthorController = require("../controllers/author.controller"); 
const {authenticate} = require("../config/jwt.config"); 
// const { getAuthors } = require("../controllers/author.controller"); //! is this right?  not sure where this came from

module.exports = (app) => {
    app.get('/', AuthorController.homePageDelivery); 
    app.get("/api/authors", AuthorController.getAuthors); 
    
    app.post("/api/authors", AuthorController.createAuthor); 
    //! above works for non-auth/auth mode; below is opposite
    // app.post("/api/authors", authenticate, AuthorController.createAuthor); 

    app.get("/api/authors/:id", AuthorController.getAuthorById); 
    app.put("/api/authors/:id", AuthorController.updateAuthor); 
    app.delete("/api/authors/:id", AuthorController.deleteAuthor); 
    // added below for standalone
    app.post("/api/authors/new",AuthorController.createAuthor); 
    app.get("/api/authors/all", AuthorController.getAuthors); 

    // app.get("/api/authorsbyuser/:username", authenticate, AuthorController.getAllAuthorsByUser); //! adde with validation
};

