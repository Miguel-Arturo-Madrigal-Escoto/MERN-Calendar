import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { Navbar } from '../ui/Navbar'
import { messages } from '../../helpers/calendar-messages-es';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

const localizer = momentLocalizer(moment);

const events = [{
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
}];

export const CalendarScreen = () => {

  const [ view, setView ] = useState(
    localStorage.getItem('lastView') || 'month'
  );

  // eventos para gestionar el double click y seleccion de evento
  const onDoubleClick = (e) => {
    console.log(e);
  }

  const onSelectEvent = (e) => {
    console.log(e);
  }

  const onViewChange = (e) => {
    // 'e' retorna: week, day, month, agenda
    setView(e);
    localStorage.setItem('lastView', e);
  }

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    
    const style = {
      backgroundColor: '#f0ad4e',
      borderRadius: '0px',
      color: '#000000',
      opacity: 0.8,
    }

    return { style };

  }

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
          components={{
            event: CalendarEvent,   // formato del evento del calendario (evento del calendario)
          }}
          view= { view } // cambiar la vista del calendario en donde se quedo el usuario
        />

        <CalendarModal />
    </div>
  )
}
