// ! findReplace all "Author" with "YourNewEntityName" or whatever your new thing is 
// ! THEN do similar find replace for "author" Make sure lower case
import React, { useState } from 'react'
import AuthorFormCmp from '../components/AuthorFormCmp';
import AuthorListCmp from '../components/AuthorListCmp';
import {Link} from 'react-router-dom'; 

const MainView = (props) => {
    
    const [authorList, authorListSetter] = useState([]);

    const removeFromDom = id => {
        authorListSetter(authorList.filter(author => author._id !== id )); 
    }
    
    return (
        <main>
            <div className='slimNavAtTopBetween'>
                <Link to={'/authors/new'}>Add an Author</Link>
            </div>
            <div className="row_flex_left">
                <AuthorListCmp authorList={authorList} authorListSetter={authorListSetter} removeFromDom={removeFromDom} />
            </div>
        </main>
    )
}
export default MainView;
