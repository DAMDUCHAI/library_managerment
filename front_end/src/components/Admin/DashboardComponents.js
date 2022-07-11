import React from 'react'
import {UPDATE_LOGIN} from '../../redux/constant/libraryManager/loginConstants';
import { useSelector, useDispatch } from 'react-redux'

export default function DashboardComponents() {
  const dispatch = useDispatch();
  if(localStorage.getItem('id_user')!==null){
    dispatch({ type: UPDATE_LOGIN, text: 'LOGOUT' });
    
  }
  return (
    <div className="wrapper">DashboardComponents</div>
  )
}
