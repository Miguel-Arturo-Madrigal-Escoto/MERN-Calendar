import React from 'react';
import { useDispatch } from 'react-redux';
import { startRegisterWithGithub } from '../../actions/auth';

import '../../css/google-btn.css';


export const GithubAuthButton = () => {

   const dispatch = useDispatch();

    const handleLoginWithGoogle = () => {
        dispatch(startRegisterWithGithub());
    }

    return (
        <div className="google-btn" onClick={ handleLoginWithGoogle }>
            <div className="google-icon-wrapper">
                <img className="google-icon-svg" src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="github icon" />
            </div>
            <p className="btn-text"><b>Sign in with GitHub</b></p>
        </div>
    )
}
