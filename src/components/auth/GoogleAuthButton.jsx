import React from 'react';
import { useDispatch } from 'react-redux';
import { startRegisterWithFirebase } from '../../actions/auth';

import '../../css/google-btn.css';


export const GoogleAuthButton = () => {

   const dispatch = useDispatch();

    const handleLoginWithGoogle = () => {
        dispatch(startRegisterWithFirebase());
    }

    return (
        <div className="google-btn" onClick={ handleLoginWithGoogle }>
            <div className="google-icon-wrapper">
                <img className="google-icon-svg" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google icon"/>
            </div>
            <p className="btn-text"><b>Sign in with Google</b></p>
        </div>
    )
}
