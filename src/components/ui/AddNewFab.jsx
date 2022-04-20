
// Floating Action Button
import React from 'react';
import { useDispatch } from 'react-redux';
import { BsPlusLg } from 'react-icons/bs';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive } from '../../actions/calendar';

export const AddNewFab = () => {

    const dispatch = useDispatch();

    const handleClickNew = () => {
        dispatch(uiOpenModal());
        dispatch(eventSetActive(null));
    }

    return (
        <button
            className="btn btn-primary fab"
            onClick={ handleClickNew }
        >
            <BsPlusLg size="1.3rem" />
        </button>
    )
}
