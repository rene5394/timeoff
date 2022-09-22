import * as React from 'react';
import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views
} from 'react-big-calendar';
import moment, { Moment } from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment-timezone';
import Styles from './Calendar.module.css';
import { IEvents } from '../../../lib/domain/timeoff/IEvents';
import { findNumberByYearMonth, findNumberByRange } from '../../../lib/api/timeoff/request';

const localizer = momentLocalizer(moment);

export const Calendar = () => {
  const [events, setEvents] = React.useState<IEvents[]>();
  const CalendarEvents: any[] | undefined = [];

  const fillEvents = async(year: number, month: number) => {
    const result = await findNumberByYearMonth(year,month);
    const resultRequest = result.filter(ev => ev.number != 0);
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
      });
    }
  }

  const findByRange = async(startDate: Date, endDate:Date) => {
    const result = await findNumberByRange(startDate,endDate);
    const resultRequest = await result.filter(ev => ev.number > 0);
    console.log('result filtrado',resultRequest);
    console.log('result',result);
    setEvents(resultRequest);
    
  }

  React.useEffect(() => {
    const today = new Date('2022,10,1');
    const month = today.getMonth()+1;
    const year = today.getFullYear();
    console.log('fechas de inicio',{month,year,today});
      
    fillEvents(year,month);
    fillCalendarEvents();
  }, []);



  const onNavigate = () => {
    //fillCalendarEvents();
  }
  
  const onRange = (rangeDate:any) => {
    const onChange = async() => {
      await findByRange(rangeDate.start,rangeDate.end);
      fillCalendarEvents();
    };
    onChange();
  }
  
  return(
    <div className={`col-8 ${Styles.calendar}`}>
      <BigCalendar
        selectable
        localizer={localizer}
        events={CalendarEvents}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        defaultDate={new Date('2022,10,1')}
        onNavigate = {() => onNavigate()}
        onRangeChange = {(range) => onRange(range)}
      />
    </div>
  );
}
