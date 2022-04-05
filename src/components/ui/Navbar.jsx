import React from 'react'
import { IoMdLogOut } from 'react-icons/io';

export const Navbar = () => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4">
        <span className="navbar-brand">
            Miguel
        </span>
        <button className="btn btn-outline-danger">
            <IoMdLogOut size="1.1rem" />
            <span> Salir</span>
        </button>
    </div>
  )
}
