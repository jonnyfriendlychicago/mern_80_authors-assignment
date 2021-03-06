// ! findReplace all "Author" with "YourNewEntityName" or whatever your new thing is 
// ! THEN do similar find replace for "author" Make sure lower case
import React, {useEffect} from 'react'
// import {useState} from 'react';  //! added for onDemand Sort stuff, not working presently
import {Link} from 'react-router-dom'; 
import axios from 'axios';
import {Container, Row, Card, Table
    // , Form //! added for onDemand Sort stuff, not working presently
} from 'react-bootstrap'; 

const AuthorListCmp = (props) => {
    
    const {removeFromDom, authorList, authorListSetter} = props;

    // const [data, setData] = useState([]); //! added for onDemand Sort stuff, not working presently
    // const [sortType, setSortType] = useState('stringFieldOne');  //! added for onDemand Sort stuff, not working presently

    //! added for onDemand Sort stuff, not working presently
    // useEffect(() => {
    //     const sortArray = type => {
    //       const types = {
    //         stringFieldOne: 'stringFieldOne',
    //         numberField: 'numberField'
    //       };
    //       const sortProperty = types[type];
    //       const sorted = [...authorList].sort((a, b) => b[sortProperty] - a[sortProperty]);
    //     //   setData(sorted);
    //     authorListSetter(sorted);
    //     };
    
    //     sortArray(sortType);
    //   }, [sortType]
    //   ); 
    
    useEffect(()=>{
    	axios
            .get("http://localhost:8000/api/authors")
            .then((res)=>{
                
                authorListSetter(res.data);
            })
            .catch((err)=>{console.log(err)})
    }, [authorListSetter])

    
    
    const handleDelete = (id) => {
        axios
            .delete('http://localhost:8000/api/authors/' + id)
            .then(res => {
                removeFromDom(id)
            })
            .catch(err => console.log(err))
    }
    
    return (
        <Container> 
            {/* <Row>
                
                <Form.Select onChange={(e) => setSortType(e.target.value)}>
                    <option value="stringFieldOne">stringFieldOne</option>
                    <option value="numberField">numberField</option>
                </Form.Select>

                <Form>
                    <Form.Group className="mb-3 bg-white" controlId="FormGroup_04">
                        <Form.Label>Select Field to Sort By:</Form.Label>
                        <Form.Select 
                        style = {{width: '20rem', height: "2.5rem"}}
                        // aria-label="Default select example"
                        // onChange ={(e) => enumStringSetter(e.target.value)}
                        // value={enumString}
                        onChange={(e) => setSortType(e.target.value)}
                        >
                            <option value="stringFieldOne">stringFieldOne</option>
                            <option value="numberField">numberField</option>
                        </Form.Select>
                    </Form.Group>
                </Form>

            </Row> */}
            
            
            {/* <Card style = {{width: '95%', padding: '1rem', border: "0.1rem solid grey",  marginBottom: "0.5rem"}} > 
            <Row>
                <h2>Authors</h2>
                {
                    authorList.map((authorInstance, index)=>{
                    return (
                        <Card key={index} style = {{width: '15rem', padding: '0.5rem', border: "0.1rem solid grey",  margin: "0.25rem"}} >
                            <p>{authorInstance.authorName}</p>
                            <Link to={`/authors/${authorInstance._id}`}>Details</Link>
                        </Card>
                    )
                    })
                }
            </Row>
            </Card> */}

            <Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Author Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            authorList.map((authorInstance, index)=>{
                            return (
                                <tr key={index}>
                                    <td>{authorInstance.authorName}</td>
                                    <td>
                                    <Link to={`/authors/${authorInstance._id}`}>details</Link> | <Link to={`/authors/edit/${authorInstance._id}`}>edit</Link>
                                    </td>
                                </tr>
                            )
                            })
                        }
                    </tbody>
                </Table>    
            </Row>
        </Container>
    )
}; 

export default AuthorListCmp;
