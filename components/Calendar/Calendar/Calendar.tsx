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

  const fillEvents = async(year: number, month: number) => {
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
    const today = new Date(2022,10,1);
    const month = today.getMonth();
    const year = today.getFullYear();
    fillEvents(year,month);
    
    
  }, []);

  const onNavigate = (date: moment.MomentInput, view: string) => {
    console.log('date',date);
    let start, end;
  
    if (view === 'month') {
      start = moment(date).startOf('month').startOf('week')
      console.log(start)
      end = moment(date).endOf('month').endOf('week')
    }
    console.log(start, end);
    fillCalendarEvents();
    return console.log({ start, end });
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
