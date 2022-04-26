import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';
import { customStyles } from '../../helpers/modal-styles';
// icons
import { AiFillSave } from 'react-icons/ai'
import { uiCloseModal } from '../../actions/ui';
import { eventSetActive, eventStartAddNew, eventStartUpdate } from '../../actions/calendar';
import moment from 'moment';

import '../../css/modal.css';

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlusOne = now.clone().add(1, 'hours');
const initEvent = {
    title: '',
    start: now.toDate(),
    end: nowPlusOne.toDate(),
    notes: ''
}

export const CalendarModal = () => {

    // useDispatch para ejecutar las acciones
    const dispatch = useDispatch();
    // useSelector para obtener los datos del state
    const { activeEvent } = useSelector(state => state.calendar);

    // useSelector para obtener los datos del store
    const { modalOpen } = useSelector(state => state.ui);

    const [ , setDateStart ] = useState(now.toDate());
    const [ , setEndStart ] = useState(nowPlusOne.toDate());
    const [ isTitleValid, setIsTitleValid ] = useState(true);
    const [ formValues, setFormValues ] = useState(initEvent);
    const { title, notes, start, end } = formValues; 
    
    useEffect(() => {
        
        // si hay evento activo, settearlo al form values
        if (activeEvent){
            setFormValues(activeEvent);
        
        // si no, dejarlo en los valores por defecto
        } else {
            setFormValues(initEvent);
        }
        
    }, [ activeEvent, setFormValues ]);
    

    const closeModal = () => {
        dispatch(eventSetActive(null));
        dispatch(uiCloseModal());
        setFormValues(initEvent);
    }

    const handleStartDateChange = (e) => {
        setDateStart(e);
        setFormValues({
            ...formValues,
            start: e
        });
    }

    const handleEndDateChange = (e) => {
        setEndStart(e);
        setFormValues({
            ...formValues,
            end: e
        });
    }

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [ target.name ]: target.value
        });

        // actualizar validaciones de titulo
        setIsTitleValid((title.trim().length < 2)? false : true);
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        
        // validaciones de las fechas del formulario
        const momentStart = moment(start);
        const momentEnd = moment(end);

        if (momentEnd.isSameOrBefore(momentStart)) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La fecha de inicio debe ser menor a la fecha de fin',
              });
        }

        if (title.trim().length < 2){
            setIsTitleValid(false);
            return;
        }

        //TODO: guardar nota en la base de datos
        if (!activeEvent) {
            dispatch(eventStartAddNew(formValues));
        } 
        
        else if (activeEvent.title === '' && activeEvent.notes === '') {
            dispatch(eventStartAddNew(formValues));
        }
        
        else {
            dispatch(eventStartUpdate(formValues));
        }
        
        setIsTitleValid(true);
        closeModal();

    }


    return (
        <Modal
            isOpen={ modalOpen }
            // onAfterOpen={ closed => console.log('Modal abierto') }
            onRequestClose={ closeModal }   // para cerrar el modal
            style={ customStyles }      // estilos personalizados
            className="modal"       // clase modal con estilos
            overlayClassName="modal-fondo"  // clase para el fondo de atras el modal
            closeTimeoutMS={ 200 }          // tiempo para cerrar el modal
        >
            <h2>
                {
                    (activeEvent) 
                    ? 
                    (activeEvent.title !== '' && activeEvent.notes !== '') ? 'Editar evento' : 'Nuevo evento'
                    : 'Nuevo evento'
                }
            </h2>
            <hr />
            <form 
                className="container"
                onSubmit={ handleSubmitForm }
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker 
                        value={ start } 
                        className="form-control"
                        format="y-MM-dd h:mm:ss a"
                        amPmAriaLabel="Select am/pm"    //  mostrar am/pm
                        name="startDate"
                        onChange={ handleStartDateChange } // cambiar la fecha y actualizar el value
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker 
                        value={ end }  
                        className="form-control"
                        format="y-MM-dd h:mm:ss a"
                        amPmAriaLabel="Select am/pm"
                        // minDate={ dateStart }  validacion de la fecha minima
                        onChange={ handleEndDateChange } 
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={ `form-control ${ isTitleValid ? 'is-valid' : 'is-invalid' }` }
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ title }
                        onChange={ handleInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ notes }
                        onChange={ handleInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    id="btn-save"
                    className="btn btn-outline-primary btn-block"
                >
                    <AiFillSave />
                    <span>&nbsp;Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
