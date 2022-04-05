import React, { useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import { customStyles } from '../../helpers/modal-styles';
// icons
import { AiFillSave } from 'react-icons/ai'

import moment from 'moment';
import '../../css/modal.css';

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlusOne = now.clone().add(1, 'hours');

export const CalendarModal = () => {

    const [ dateStart, setDateStart ] = useState(now.toDate());
    const [ dateEnd , setEndStart ] = useState(nowPlusOne.toDate());

    const closeModal = () => {
        console.log('closing modal...');
    }

    const handleStartDateChange = (e) => {
        setDateStart(e);
    }

    const handleEndDateChange = (e) => {
        setEndStart(e);
    }


    return (
        <Modal
            isOpen={ true }
            // onAfterOpen={afterOpenModal}
            onRequestClose={ closeModal }   // para cerrar el modal
            style={ customStyles }      // estilos personalizados
            className="modal"       // clase modal con estilos
            overlayClassName="modal-fondo"  // clase para el fondo de atras el modal
            closeTimeoutMS={ 200 }          // tiempo para cerrar el modal
        >
            <h2> Nuevo evento </h2>
            <hr />
            <form className="container">

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker 
                        value={ dateStart } 
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
                        value={ dateEnd } 
                        className="form-control"
                        format="y-MM-dd h:mm:ss a"
                        amPmAriaLabel="Select am/pm"
                        minDate={ dateStart }       // validacion de la fecha minima
                        onChange={ handleEndDateChange } 
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className="form-control"
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
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
