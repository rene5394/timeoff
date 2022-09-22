
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

moment.tz.setDefault('America/El_Salvador');
const localizer = momentLocalizer(moment);

export const Calendar = () => {
  const [events, setEvents] = React.useState<IEvents[]>();
  const CalendarEvents: any[] | undefined = [];
  const [dates,setDates] = React.useState<any>();

  const fillEvents = async(compDates:Date) => {
    let year, month;
    month = compDates.getMonth()+1;
    year = compDates.getFullYear();
    const result = await findNumberByYearMonth(year,month);
    console.log('events',result);
    const resultRequest = result.filter(ev => ev.number != 0);
    console.log('filtro',resultRequest);
    setEvents(resultRequest);
  }

  const fillCalendarEvents = () => {
    CalendarEvents.splice(0);
    if (events) {
      events.map(event => {
        CalendarEvents.push(
          {
            title: String(event.number),
            start: event.day,
            end: event.day,
            allDay: true
          }
        );
      }
      );
    }
  }

  React.useEffect(() => {
    let date;
    if (dates != undefined) {
      date = dates;
    }else{
      date = new Date();
    }
    fillEvents(date);
    console.log('chance',date);
  }, [dates]);

  const onNavigate = (date: moment.MomentInput, view: string) => {
    console.log('date',date);
    setDates(date);
    //fillEvents(year,month);
    fillCalendarEvents();
  }
  
  return(
    <div className={`col-8 ${Styles.calendar}`}>
      <BigCalendar
        selectable
        localizer={localizer}
        events={CalendarEvents}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        defaultDate={new Date()}
        onNavigate = {(date,view) => onNavigate(date,view)}
      />
    </div>
  );
}

