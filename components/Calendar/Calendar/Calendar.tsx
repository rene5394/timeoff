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
import { IEvents } from '../../../lib/domain/timeoff/IEvents';
import { findNumberByYearMonth } from '../../../lib/api/timeoff/request';

interface calendarEvents {
  title: string;
  start: Date;
  end: Date;
}

moment.tz.setDefault('America/El_Salvador');
moment.locale('es');
const localizer = momentLocalizer(moment);

const [events,setEvents] = React.useState<IEvents[]>();
const [eventCalendar, setEventCalendar] = React.useState<calendarEvents[]>();

const fillEvents = async(year: number, month: number) => {
  const result = await findNumberByYearMonth(year,month);
  setEvents(result);
}

const fillCalendarEvents = () => {
  if(events){
    const result = events?.map(event => {
      title: event.number;
      start : event.day;
      end : event.day;
    })
    setEventCalendar(result);
  }
  
}



export const Calendar = () => {
  React.useEffect(() => {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    fillEvents(year,month);
    fillCalendarEvents();
  });
  
  
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
