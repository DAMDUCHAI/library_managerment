
import React,{useEffect} from 'react';
import { GET_ALL_BOOK_SAGA,GET_BOOK_SAGA} from "../../redux/constant/libraryManager/bookConstant";
import { useSelector, useDispatch } from 'react-redux'
import {GET_ALL_COMMENT_SAGA} from "../../redux/constant/libraryManager/commentConstants";

import FormViewBookDetaild from '../Modal/FormViewBookDetaild';
export default function ListBookReader() {
  const dispatch = useDispatch();
  const bookList = useSelector(state => state.bookReducers.bookList);

  
  
  useEffect(() => {
    

    dispatch({ type: GET_ALL_BOOK_SAGA })

}, [])

const renderBookList=()=>{
  return bookList.map((book,index)=>{
      return    <div key={index} className="snip1376 "><div style={{height:'60%'}}><img src={book.AnhSach} style={{width:'100%',height:'100%',objectFit:'cover'}} alt="img_book" /></div>
      <div>
        <h2>{book.Ten}</h2>
        <p>{book.NoiDung}</p>
        <div className="icons"  onClick={() => {
                        const action = {
                            type: 'OPEN_MODAL',
                            title:'View Detaild',
                            Component: <FormViewBookDetaild />,
                            width:1000

                        }
                        dispatch(action)
             
                  
                        const action1 = {
                            type: GET_BOOK_SAGA,
                            idBook:book.id

                        }
                        dispatch(action1)

                        dispatch({ type: GET_ALL_COMMENT_SAGA, 
                          MaSach:book.id})
                        

                          dispatch({ type: 'UPDATE_COMMENT', 
                            MaSach:book.id})
                        }}

                        
                       

                       
                        ><i className="ion-social-reddit-outline" />
        View Detaild
        </div>
      </div>
    </div>
  })}

  return (
    <div id='view-book'>
    <h2 style={{textAlign:'center',marginTop:'70px'}}>View book</h2>
<div style={{display: 'flex',flexFlow: 'row wrap' }}>

  {renderBookList()}

 


</div>



    </div>
  )
}
