// ! findReplace all "Author" with "YourNewEntityName" or whatever your new thing is 
// ! THEN do similar find replace for "author" Make sure lower case
import React, {useState} from 'react';
import axios from 'axios'; 
import {Container, Row, Card, Form} from 'react-bootstrap'; 
import {useNavigate} from "react-router-dom"; // added below to enable "redirect" 
import {Link} from 'react-router-dom'; 

const AuthorFormStandAloneCmp = (props) => {

    // const {authorList, authorListSetter} = props; 
    const [authorName, authorNameSetter ] = useState("");

    const [errors, setErrors] = useState([]); // validations

    const navigate = useNavigate(); // added

    // const {id} = useParams(); 

    // ! below placeholder for now; remainder of present code doesn't support this yet.
    // const handleChange = (e) => {
    //     if (e.target.name === 'isBoolean') {
    //         authorListSetter({ ...authorList, [e.target.name]: e.target.checked });
    //     // } else if (e.target.name === 'actors') {
    //     //   setMovie({ ...movie, [e.target.name]: e.target.value.split(',') });
    //     } else {
    //         authorListSetter({ ...authorList, [e.target.name]: e.target.value });
    //     }
    //   };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        axios
            .post("http://localhost:8000/api/authors/new", {
                authorName
            })
            .then(res=> {
                console.log("res.data: ", res.data)
                // authorListSetter([...authorList, res.data]); 
                //! above replaced by below for sorting
                // authorListSetter([res.data, ...authorList]); 
                // above needs to be commented out on this "standalone" form
                authorNameSetter(""); 
                setErrors([]); // remove error msg upon successful submission
                // navigate("/"); // added below to enable "redirect" to homepage
                navigate(`/authors/${res.data._id}`) // this will nav to newly created record

            })
            // .catch(err => {
            //     const errorResponse = err.response.data.errors; // Get the errors from err.response.data
            //     const errorArr = []; // Define a temp error array to push the messages in
            //     for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
            //         errorArr.push(errorResponse[key].message)
            //     }
            //     setErrors(errorArr);
            // })
            // ! above catch puts all the errors in one spot at the top
            // ! below catch is part of solution that puts the errors in line with the form group
            .catch(err=>{setErrors(err.response.data.errors);}) 
    }; 

    return (
        <main>
        <Container>
            <Row>
                <Card style = {{width: '50rem', padding: '1rem', border: "0.1rem solid grey",  marginBottom: "0.5rem"}} > 
                    <h2>StandAlone: Enter a New Author</h2>
                    <Form onSubmit = {handleSubmit}>
                        {/* !below puts all the validation errors together, atop the form.  comment it out to allow those items all inline instead  */}
                        {/* {errors.map((err, index) => <p key={index}>{err}</p>)} */}

                        <Form.Group className="mb-3 bg-white" controlId="FormGroup_01">
                            <Form.Label>Author Name:</Form.Label>
                            <Form.Control
                                style = {{width: '20rem', height: "2rem"}}
                                type = "textarea"
                                value={authorName}
                                onChange ={(e) => authorNameSetter(e.target.value)}
                                // onChange ={handleChange}
                                name="authorName"
                            /> 
                            { errors.authorName ? 
                                <p style = {{color: "red"}}>{errors.authorName.message}</p>
                                : null
                            }
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="ToDo03">
                            <Form.Control style = {{width: "5rem"}} className="btn btn-primary" type = "submit" value="Submit"/>
                        </Form.Group>
                        
                    </Form> 
                    <Link to={'/'}>Cancel</Link>
                </Card>
            </Row>
        </Container>
        </main> 

    )

}; 

export default AuthorFormStandAloneCmp; 