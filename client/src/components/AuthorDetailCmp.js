// ! findReplace all "Author" with "YourNewEntityName" or whatever your new thing is 
// ! THEN do similar find replace for "author" Make sure lower case
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";// added
import {Container, Row, Card, Button} from 'react-bootstrap'; 
import {Link} from 'react-router-dom'; 

const AuthorDetailCmp = (props) => {

    const [author, authorSetter] = useState({}); 
    const {id} = useParams(); 

    //! buttonTry
    const [likeButton, likeButtonSetter] = useState(false); 
    const likedFunc = (e) => {
        likeButton ? likeButtonSetter(false) :  likeButtonSetter(true) 
    }

    const navigate = useNavigate(); // added

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/authors/" + id)
            .then( res => {
                console.log(res.data);
                authorSetter(res.data);
            })
            .catch( err => console.log(err) )
    }, [id])

    const handleDelete = (id) => {
        axios
            .delete('http://localhost:8000/api/authors/' + id)
            .then(res => {
                navigate("/"); 
            })
            .catch(err => console.log(err))
    }

    return (
        <main>
        <Container> 
            <Row>
                <Card style = {{width: '50rem', padding: '1rem', border: "0.1rem solid grey",  marginBottom: "0.5rem"}} > 
                    <div className="cardHeader">
                        <h2>Author Profile</h2>
                        {/* <Link to={`/authors/edit/${author._id}`}>Edit</Link> */}
                        <Button onClick={(e)=>{handleDelete(author._id)}}>Delete</Button> 
                    </div>
                    <p>authorName: {author.authorName}</p>
                    <Link to={`/authors/edit/${author._id}`}>Edit</Link>
                </Card>
            </Row>
        </Container>
        </main> 
    )
}
export default AuthorDetailCmp;