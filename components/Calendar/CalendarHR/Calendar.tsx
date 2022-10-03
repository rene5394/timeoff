
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
import { IEventsDetails } from '../../../lib/domain/timeoff/IEvents';
import { findRequestsByYearMonth } from '../../../lib/api/timeoff/request';
import { IUser } from '../../../lib/domain/team/IUser';
import { findUsers } from '../../../lib/api/team/user';

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
  const [events, setEvents] = React.useState<IEventsDetails[]>();
  const [calendarEvents,setCalendarEvents]= React.useState<ICalendarEvent[]>();
  const [dates,setDates] = React.useState<any>();
  const [users, setUsers] = React.useState<IUser[]>();

  const fillEvents = async(compDates:Date) => {
    let year, month;
    month = compDates.getMonth()+1;
    year = compDates.getFullYear();
    let result, resultRequest;
    result = await findRequestsByYearMonth(year,month);
    resultRequest = result.filter(ev => ev.requests.length > 0);
    setEvents(resultRequest);
    callUsers();
    fillCalendarEvents();
  }

  const callUsers = async() => {
    let usersId: any[] = [];
    if (events) {
      events.map(event => {
        event.requests.map(req => {
          usersId.push(req.userId);
        });
        
      });
    }
    console.log('Id de usuarios desde events',usersId);
    let result = await findUsers(usersId);
    
    setUsers(result);
    console.log('usuarios devueltos',result);
  }

  const findName = (id:number) => {
    if (users) {
      console.log('findName',users);
      console.log('id',id);
      let user = users.find(us => us.id = id);
      console.log('usuario',user);
      return String(user?.firstname+' '+user?.lastname);
    }
    return 'Not found';
  }

  const fillCalendarEvents = () => {
    let calendarEvent;
    if (events) {
      const newCalendarEvent: ICalendarEvent[] = [];
      events.map((event) => {
        event.requests.map(req => {
          calendarEvent = {
            id: req.id,
            title: findName(req.userId),
            start: req.day,
            end: req.day,
            allDay: true
          }
          newCalendarEvent.push(calendarEvent);
        });
      } 
      );
      setCalendarEvents(newCalendarEvent);
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
  }, [events]);

  const onNavigate = (date: moment.MomentInput, view: string) => {
    setDates(date);
  }
  
  return(
    <div className={`col-8 ${Styles.calendar}`}>
      <BigCalendar
        selectable
        localizer={localizer}
        events={calendarEvents}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        defaultDate={new Date()}
        onNavigate = {(date,view) => onNavigate(date,view)}
      />
    </div>
  );
}

