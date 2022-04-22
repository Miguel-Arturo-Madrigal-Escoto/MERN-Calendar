import React from 'react'
import { IoMdLogOut } from 'react-icons/io';
import { BiUser } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';

import '../../css/navbar.css';

export const Navbar = () => {

  const { name } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
  }

  return (
    <div className="navbar navbar-dark bg-dark mb-4">
        <div className="navbar-brand">
            <span>{ <BiUser size="1.1rem" /> }&nbsp;</span>
            <span>{ name }</span>   
        </div>

        <button className="btn btn-outline-danger" onClick={ handleLogout }>
            <IoMdLogOut size="1.1rem" />
            <span> Salir</span>
        </button>
    </div>
  )
}
