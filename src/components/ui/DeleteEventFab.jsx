import React from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { eventDeleted } from '../../actions/calendar';

export const DeleteEventFab = () => {

    const dispatch = useDispatch();

    const handleClickDelete = () => {
        dispatch(eventDeleted());
    }

    return (
        <button 
            className="btn btn-danger fab-danger"
            onClick={ handleClickDelete }
        >
            <AiFillDelete size="1.3rem" />
            <span>&nbsp;Eliminar evento</span>
        </button>
    )
}
