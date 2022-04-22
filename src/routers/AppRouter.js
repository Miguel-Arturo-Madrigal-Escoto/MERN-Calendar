import React, { useEffect } from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { startChecking } from '../actions/auth';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

  const dispatch = useDispatch();
  const { checking, uid } = useSelector(state => state.auth)

  useEffect(() => {

      dispatch(startChecking())

  }, [ dispatch ]);

  if (checking) {
    return <LoadingSpinner />
  }

  return (
    
    <BrowserRouter>
        <Routes>
           { /* Login si no esta autenticado */ }
            <Route path="/login" element={ 
                <PublicRoute uid={ uid }>
                    <LoginScreen /> 
                </PublicRoute>
            } />
            <Route path="/" element={ 
                <PrivateRoute uid={ uid }>
                  <CalendarScreen />
                </PrivateRoute>
             } />
            <Route path="*" element={ <LoginScreen /> } />
        </Routes>
    </BrowserRouter>
  )
}
