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
import { findAllTeamUsersEmployeesByJWT, findUsers } from '../../../lib/api/team/user';
import { IUser } from '../../../lib/domain/team/IUser';

moment.tz.setDefault('America/El_Salvador');
const localizer = momentLocalizer(moment);

interface ICalendarEvent {
  id:number;
  title:String | undefined;
  start:Date;
  end:Date;
  allDay:boolean;
} 

export const Calendar = () => {
  const [events, setEvents] = React.useState<IEventsDetails[]>();
  const [calendarEvents,setCalendarEvents] = React.useState<ICalendarEvent[]>();
  const [dates,setDates] = React.useState<any>();
  const [users, setUsers] = React.useState<IUser[]>();

  const fillEvents = async(compDates: Date) => {
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
    let result = await findAllTeamUsersEmployeesByJWT();
    let result2 = result.list;
    
    setUsers(result2);
  }

  const findName = (id:number) => {
    let name = '';
    if (users) {
      users.map(async user => {
        if (user.id === id) {
          name = `${user.firstname} ${user.lastname}`;
        }
      });

      return name;
    }

    return 'Not found';
  }

  const fillCalendarEvents = () => {
    let calendarEvent;
    if (events) {
      const newCalendarEvent: ICalendarEvent[] = [];
      events.map((event) => {
        
        event.requests.map(req => {
          if (users) {
            let findUser = users.find(user => user.id === req.userId);
            if (findUser) {
              calendarEvent = {
                id: req.id,
                title: findName(req.userId),
                start: req.day,
                end: req.day,
                allDay: true
              }
              newCalendarEvent.push(calendarEvent);
            }
          }
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

  const onNavigate = (date: moment.MomentInput) => {
    setDates(date);
  }
  
  return(
    <div className={`col ${Styles.calendar}`}>
      <BigCalendar
        selectable
        localizer={localizer}
        events={calendarEvents}
        views={[Views.MONTH]}
        defaultDate={new Date()}
        onNavigate = {(date) => onNavigate(date)}
        popup = {true}
      />
    </div>
  );
}

