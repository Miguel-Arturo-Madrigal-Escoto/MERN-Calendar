import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { Navbar } from '../ui/Navbar'
import { messages } from '../../helpers/calendar-messages-es';

import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive, eventStartLoading } from '../../actions/calendar';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../css/calendar-screen.css';


moment.locale('es');

const localizer = momentLocalizer(moment);

/*const events = [{
    // formato de los eventos del calendario
    title: 'Cumpleaños del Jefe',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    allDay: false,
    //informacion adicional agregada por nosotros
    user: {
      _id: '123',
      name: 'Miguel',
    }
}];*/

export const CalendarScreen = () => {

  // useDispatch para ejecutar las acciones
  const dispatch = useDispatch();


  //leer del store los eventos
  const { activeEvent, events } = useSelector(state => state.calendar);
  const { uid } = useSelector(state => state.auth);

  const [ view, setView ] = useState(
    localStorage.getItem('lastView') || 'month'
  );

  useEffect(() => {

      dispatch(eventStartLoading())
      
  }, [ dispatch ]);

  // eventos para gestionar el double click y seleccion de evento
  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());  
  }

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
  }

  const onViewChange = (e) => {
    // 'e' retorna: week, day, month, agenda
    setView(e);
    localStorage.setItem('lastView', e);
  }

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    
    const { _id } = event.user

    const style = {
      backgroundColor: (uid === _id) ? '#aee8ff' : '#e5e5e5',
      borderRadius: '0px',
      color: '#000000',
      opacity: 0.8,
    }

    return { style };
  }

  const onSelectSlot = (e) => {

      if (e.action === 'click') {
         dispatch(eventSetActive(null));

      } else {
          const { start, end, title = '', notes = '' } = e;
          const event = { title, start, end, notes };
          dispatch(eventSetActive(event));
          dispatch(uiOpenModal());
      }

  }

  //TODO: al hacer doble click en una celda del calendario, abrir el modal para agregar un nuevo evento con la fecha seleccionada

  // components={ { event: CalendarEvent } } personalizar apariencia de los eventos
  // del calendariocon el componente especificado en el parametro event.
  // En otras palabras, sobreescribe el evento del calendario por el componente CalendarEvent.

  return (
    <div className="calendar-screen">
        <Navbar />

        <Calendar
          localizer={ localizer }
          events={ events }
          startAccessor="start"
          endAccessor="end"
          messages={ messages }  //cambiar los mesajes a español
          eventPropGetter={ eventStyleGetter }  // cambiar estilos
          onSelectEvent={ onSelectEvent }  
          onDoubleClickEvent={ onDoubleClick }
          onView={ onViewChange }               // cambiar la vista del calendario
          onSelectSlot={ onSelectSlot }        // cambiar la vista del calendario
          selectable={ true }
          components={{
            event: CalendarEvent,   // formato del evento del calendario (evento del calendario)
          }}
          view= { view } // cambiar la vista del calendario en donde se quedo el usuario
        />

        <AddNewFab />
        
        {
          activeEvent && <DeleteEventFab />
        }

        <CalendarModal />

    </div>
  )
}
