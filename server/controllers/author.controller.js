
// ! findReplace all "Author" with "YourNewEntityName" or whatever your new thing is 
// ! THEN do similar find replace for "author" Make sure lower case
const Author = require('../models/author.model'); 
const User = require('../models/user.model'); 
const jwt = require("jsonwebtoken"); 

module.exports = {

    homePageDelivery : (request, response) => {
    // ! Update "Pistons" below to be any other sports team ("Angels?") which will verify the sever you see is this newly one you just created. 
        response.send("Hello, world.  May the Great Spirit smile upon us today.  Go Pistons.")
    }, 

    //! below section is original 
    // createAuthor : (request, response) => {
    //     Author
    //         .create(request.body)
    //         .then((newAuthor) => {response.status(201).json(newAuthor); })
    //         .catch((err) => {response.status(500).json({message: "createAuthor encountered an error", error: err}); }); 
    // }, 
    // ! below section is overhauled for validation:

    createAuthor : (request, response) => {

        const {
            stringFieldOne
            , numberField
            , isBoolean
            , enumString
            , listField
        } = request.body; 
        //! need help / clarification on what's up with above & if/how it relates to below.
        
        const newAuthorObject = new Author(request.body); 
        const decodedJWT = jwt.decode(request.cookies.userToken, {complete: true}); 
        // newAuthorObject.createdBy = decodedJWT.payload.id;  
        //! turn on line above for authentication
        newAuthorObject
            .save()

            .then((newAuthor) => {
                console.log(newAuthor); 
                response.status(201).json(newAuthor) })
            .catch( (err) => {
                console.log(err); 
                // response.status(400).json( {message: "createAuthor encountereed an error."})
                //! below replaces/fixes above
                response.status(400).json( {message: "createAuthor encountereed an error.", errors: err.errors})
            })
    }, 
    
    getAuthors : (request, response) => {
        Author
            .find({}).sort({enumString : 1 , numberField: 1}) // added to make sorty sort sort.  '1' is asc, '-1' makes it sort in desc order. 
            // .populate("createdBy", "userName email") //!  added for auth/auth updates
            .then((allAuthors) => {
                console.log(allAuthors);
                response.json(allAuthors); 
            })
            .catch((err) => {
                console.log("getAuthors failed"); 
                response.status(400).json({message: "getAuthors encountered an error", error: err}) 
            })
    }, 

    getAuthorById : (request, response) => {
    // Author.find({ "_id": request.params.id })
    // above-is-one-way-to-do-it , Mach recommends below instead.  but above is required if searching by another field.  
        Author
            .findById(request.params.id )
            .then((author) => {response.json(author); })
            .catch((err) => {response.status(400).json({message: "getAuthorById encountered an error", error: err}) }) 
    },

    //! below section is original 
    // updateAuthor : (request, response) => {
    //     Author
    //         .findByIdAndUpdate (request.params.id, request.body , {new: true} )
    //         .then((author) => {response.json(author); })
    //         .catch((err) => {response.status(400).json({message: "updateAuthor encountered an error", error: err}); }); 
    // }, 

    // ! below section is overhauled for validation:

    updateAuthor : (request, response) => {
        const {
            authorName
        } = request.body; 
        Author
            .findByIdAndUpdate(
                request.params.id
                , {
                    authorName: authorName
                }
                , {new: true, runValidators: true} 
            )
            .then((author) => {response.status(201).json(author); })
            .catch(err => response.status(400).json(err))
    }, 

    deleteAuthor : (request, response) => {
        Author
            .findByIdAndDelete(request.params.id )
            .then((author) => {response.json(author); })
            .catch((err) => {response.status(400).json({message: "deleteAuthor encountered an error", error: err}); }); 
    }, 

    getAllAuthorsByUser: (req, res) => {
        if(req.jwtpayload.username !== req.params.username) {
            console.log("not the user here"); 
            User
                .findOne({userName: req.params.username}) 
                .then((userNotLoggedIn) => {
                    Author
                        .find({createdBy: userNotLoggedIn._id})
                        .populate("createdBy", "username")
                        .then((getAllAuthorsFromUser) => {
                            console.log(getAllAuthorsFromUser); 
                            res.json(getAllAuthorsFromUser); 
                        })
                })
                .catch( (err) => {
                    console.log(err); 
                    res.status(400).json(err); 
                })
        }
        
        else {
            console.log("current user"); 
            console.log("req.jwtpayload.id:", req.jwtpayload.id); 
            Author
                .find({createdBy: req.jwtpayload.id})
                .populate("createdBy", "username")
                .then((allAuthorsFromLoggedInUser) => {
                    console.log(allAuthorsFromLoggedInUser); 
                    res.json(allAuthorsFromLoggedInUser); 
                })
                .catch( (err) => {
                    console.log(err); 
                    res.status(400).json(err); 
                })
        }
    }

    
}; 

