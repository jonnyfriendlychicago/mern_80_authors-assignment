// ! findReplace all "Author" with "YourNewEntityName" or whatever your new thing is 
// ! THEN do similar find replace for "author" Make sure lower case
import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {Container, Row, Card, Form} from 'react-bootstrap'; 
import {Link} from 'react-router-dom'; 

const AuthorUpdateCmp = (props) => {
    const { id } = useParams(); //this process is identical to the one we used with our Details.js component
    const [authorName, authorNameSetter ] = useState("");

    const [errors, setErrors] = useState([]); //! validation addition

    const navigate = useNavigate(); // retrieve the current values for this person so we can fill in the form with what is in the db currently

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/authors/' + id)
            .then(res => {
                authorNameSetter(res.data.authorName);
            })
            .catch(err => console.log(err))
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put('http://localhost:8000/api/authors/' + id, {
                authorName 
            })
            .then(res => {
                console.log(res);
                // navigate("/");  // this navs you to homepage
                navigate(`/authors/${id}`); // this navs you back to DetailCmp
            })
            // .catch(err => console.log(err))
            //! validations: above line replaced by below line
            .catch(err=>{setErrors(err.response.data.errors);}) 
    }
    return (
        <main>
            <Container>
            <Row>
                <Card style = {{width: '50rem', padding: '1rem', border: "0.1rem solid grey",  marginBottom: "0.5rem"}} > 
                    <h2>Update Author</h2>
                    <Form onSubmit = {handleSubmit}>
                        <Form.Group className="mb-3 bg-white" controlId="FormGroup_01">
                            <Form.Label>Author Name:</Form.Label>
                            <Form.Control
                                style = {{width: '20rem', height: "2rem"}}
                                type = "textarea"
                                value={authorName}
                                // placeholder={authorName}
                                onChange ={(e) => authorNameSetter(e.target.value)}
                                name="authorName"
                            /> 
                            {/* validation addition */}
                            { errors.authorName ? 
                                <p style = {{color: "red"}}>{errors.authorName.message}</p>
                                : null
                            }
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="ToDo03">
                            <Form.Control style = {{width: "5rem"}} className="btn btn-primary" type = "submit" value="Update"/>
                        </Form.Group>
                    </Form> 
                    <Link to={'/'}>Cancel</Link>
                </Card>
            </Row>
        </Container>
        </main>  
    )
}
export default AuthorUpdateCmp;