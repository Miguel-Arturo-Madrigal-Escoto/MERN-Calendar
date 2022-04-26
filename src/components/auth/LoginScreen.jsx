import React from 'react';
import { initialStateLogin, initialCheckValues, initialValidationResults, initialStateRegister } from '../../fixtures/initialStates';
import { useForm } from '../../hooks/useForm';
import { useValidate } from '../../hooks/useValidate';
import { FeedbackForm } from './FeedbackForm';
import { useDispatch } from 'react-redux';

import '../../css/login.css';
import { startLogin, startRegister } from '../../actions/auth';
import { GoogleAuthButton } from './GoogleAuthButton';
import { GithubAuthButton } from './GithubAuthButton';

export const LoginScreen = () => {

    const [ formLoginValues, handleLoginInputChange ] = useForm(initialStateLogin);
    const [ formRegisterValues, handleRegisterInputChange ] = useForm(initialStateRegister);
    const [ , handleInputCheckValues, validationResults ] = useValidate(
        initialCheckValues, initialValidationResults
    );

    // useDispatch
    const dispatch = useDispatch();
   

    // Resultados de la validacion
    const { rEmailValid, rPasswordValid, rPasswordValid2  } = validationResults;

    // Valores del login
    const { lEmail, lPassword } = formLoginValues;

    // Valores del register
    const { rName, rEmail, rPassword, rPassword2 } = formRegisterValues;

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        dispatch(startLogin(lEmail, lPassword));
    }

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        if (rEmailValid && rPasswordValid && rPasswordValid2) {
            dispatch(startRegister(rName, rEmail, rPassword));
        }
    }

    const handleInputChange = (e) => {
        handleRegisterInputChange(e); // formRegisterValues
        handleInputCheckValues(e); // formValidateValues
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ handleLoginSubmit }>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="lEmail"
                                value={ lEmail }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className='form-control'
                                placeholder="Contraseña"
                                name="lPassword"
                                value={ lPassword }
                                onChange={ handleLoginInputChange }
                            />
                        
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ handleRegisterSubmit }>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="rName"
                                onChange={ handleInputChange }
                                value={ rName }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className={ `form-control ${ rEmail && (rEmailValid? 'is-valid' : 'is-invalid') }` }
                                placeholder="Correo"
                                name="rEmail"
                                onChange={ handleInputChange }
                                value={ rEmail }
                            />
                            {
                                rEmail && 
                                (
                                    <FeedbackForm 
                                        negative={ `Por favor, proporcione un email válido.`}
                                        positive={ `Email válido.` }
                                    />
                                )
                            }
                            
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className={ `form-control ${ rPassword && (rPasswordValid? 'is-valid' : 'is-invalid') }` }
                                placeholder="Contraseña" 
                                name="rPassword"
                                onChange={ handleInputChange }
                                value={ rPassword }
                            />
                            {
                                rPassword && 
                                (
                                    <FeedbackForm 
                                        negative={ `Por favor, proporcione al menos 8 caracteres (mayusculas, minusculas, numeros y c. especiales).`}
                                        positive={ `La contraseña cumple con los requisitos.` }
                                    />
                                )
                            }
                            
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className={ `form-control ${ rPassword2 && (rPasswordValid2? 'is-valid' : 'is-invalid') }` }
                                placeholder="Repita la contraseña" 
                                name="rPassword2"
                                onChange={ handleInputChange }
                                value={ rPassword2 }
                            />
                            {
                                rPassword2 && 
                                (
                                    <FeedbackForm 
                                        negative={ `Las contraseñas no coinciden.`}
                                        positive={ `Las contraseñas coinciden.` }
                                    />
                                )
                            }
                            
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
            <div className="row mt-5 login-connect">
                <div className="col">
                    <GoogleAuthButton />
                </div>
                <div className="col">
                    <GithubAuthButton />
                </div>
            </div>
                
        </div>
    )
}