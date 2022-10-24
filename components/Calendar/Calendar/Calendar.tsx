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
import { findNumberOfRequestsByYearMonth } from '../../../lib/api/timeoff/request';

moment.tz.setDefault('America/El_Salvador');
const localizer = momentLocalizer(moment);

interface ICalendarEvent {
  id:number;
  title:String;
  start:Date;
  end:Date;
  allDay:boolean;
} 

export const Calendar = () => {
  const [events, setEvents] = React.useState<IEvents[]>();
  const [calendarEvents,setCalendarEvents] = React.useState<ICalendarEvent[]>();
  const [dates,setDates] = React.useState<any>();

  const fillEvents = async(compDates: Date) => {
    const month = compDates.getMonth() + 1;
    const year = compDates.getFullYear();

    const result = await findNumberOfRequestsByYearMonth(year, month);
    const resultRequest = result.filter(ev => ev.number != 0);

    setEvents(resultRequest);
    fillCalendarEvents();
  }

  const fillCalendarEvents = () => {
    let calendarEvent;
    if (events) {
      const newCalendarEvent = events.map((event, i) => {
        calendarEvent = {
          id: i,
          title: String(event.number),
          start: event.day,
          end: event.day,
          allDay: true
        }

        return calendarEvent;
      });

      setCalendarEvents(newCalendarEvent);
    }
  }

  React.useEffect(() => {
    let date;
    (dates != undefined) ? date = dates : date = new Date();

    fillEvents(date);
  }, [events]);

  const onNavigate = (date: moment.MomentInput) => {
    setDates(date);
  }
  
  return(
    <div className={`col ${Styles.calendar}`}>
      <BigCalendar
        selectable
        localizer = {localizer}
        events = {calendarEvents}
        views = {[Views.MONTH]}
        defaultDate = {new Date()}
        onNavigate = {(date) => onNavigate(date)}
      />
    </div>
  );
}

