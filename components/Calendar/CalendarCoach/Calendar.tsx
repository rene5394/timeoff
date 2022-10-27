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
import { IEvents, IEventsDetails } from '../../../lib/domain/timeoff/IEvents';
import { findNumberOfRequestsByYearMonth, findRequestsByYearMonth } from '../../../lib/api/timeoff/request';
import { findAllTeamUsersEmployeesByJWT } from '../../../lib/api/team/user';
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
  const [eventsDetails, setEventsDeatils] = React.useState<IEventsDetails[]>();
  const [calendarEvents, setCalendarEvents] = React.useState<ICalendarEvent[]>();
  const [dates, setDates] = React.useState<any>();
  const [users, setUsers] = React.useState<IUser[]>();
  const [events, setEvents] = React.useState<IEvents[]>();

  const fillEventsDetails = async(compDates: Date) => {
    const month = compDates.getMonth()+1;
    const year = compDates.getFullYear();

    const result = await findRequestsByYearMonth(year,month);
    const resultRequest = result.filter(ev => ev.requests.length > 0);

    setEventsDeatils(resultRequest);
    callUsers();
    //fillCalendarEventsDetails();
  }

  const fillEvents = async(compDates: Date) => {
    const month = compDates.getMonth() + 1;
    const year = compDates.getFullYear();

    const result = await findNumberOfRequestsByYearMonth(year, month);
    const resultRequest = result.filter(ev => ev.number != 0);

    setEvents(resultRequest);
    //fillCalendarEventsDetails();
  }

  const callUsers = async() => {
    const result = await findAllTeamUsersEmployeesByJWT();
    const result2 = result.list;
    
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


  const fillCalendarEventsDetails = () => {
    let calendarEvent;
    let newCalendarEvent: ICalendarEvent[] = [];
    
    if (events) {
      newCalendarEvent = events.map((event, i) => {
        let newEvents: number = 0;
        eventsDetails?.map(eventDetail => {
          eventDetail.requests.map(request => {
            let findUser = users?.find(user => user.id === request.userId);
            if (request.day === event.day && findUser) {
              newEvents++;
            }
          })
          
        });
        console.log('existe newEvents?',newEvents);
        calendarEvent = {
          id: i,
          title: String(event.number - newEvents),
          start: event.day,
          end: event.day,
          allDay: true
        }
        
        

        return calendarEvent;
      });
    }

    if (eventsDetails) {
      
      eventsDetails.map((event) => {
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
      });
    }
    let newCalendarEventFilter = newCalendarEvent.filter(event => event.title != '0');
    setCalendarEvents(newCalendarEventFilter);
  }

  React.useEffect(() => {
    let date;
    (dates != undefined) ? date = dates : date = new Date();

    fillEventsDetails(date);
    fillEvents(date);
    fillCalendarEventsDetails();
  }, [eventsDetails]);

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

