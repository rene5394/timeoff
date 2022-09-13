import * as React from 'react';
import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views
} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment-timezone';
import Styles from './Calendar.module.css';

moment.tz.setDefault('America/El_Salvador');
moment.locale('es');

const localizer = momentLocalizer(moment);
const eventCalendar = [{
  title:'Test',
  start: new Date(),
  end: new Date()
}];

export const Calendar = () => {  
  return(
    <div className={`col-8 ${Styles.calendar}`}>
      <BigCalendar
        selectable
        localizer={localizer}
        events={eventCalendar}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        defaultDate={new Date()}
      />
    </div>
  );
}
