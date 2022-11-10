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
import { findOneRequest, findRequestsByYearMonth } from '../../../lib/api/timeoff/request';
import { findUsers } from '../../../lib/api/team/user';
import { IUser } from '../../../lib/domain/team/IUser';
import { EventsModal } from '../../Modals/EventsModal';
import { IRequest } from '../../../lib/domain/timeoff/IRequest';
import { IType } from '../../../lib/domain/timeoff/IType';
import { findAllAppTypes } from '../../../lib/api/timeoff/type';

moment.tz.setDefault('America/El_Salvador');
const localizer = momentLocalizer(moment);

export interface ICalendarEvent {
  id:number;
  title:String | undefined;
  start:Date;
  end:Date;
  allDay:boolean;
} 

export const Calendar = () => {
  const [events, setEvents] = React.useState<IEventsDetails[]>();
  const [calendarEvents, setCalendarEvents] = React.useState<ICalendarEvent[]>();
  const [dates, setDates] = React.useState<any>();
  const [users, setUsers] = React.useState<IUser[]>();
  const [eventsModalVisibility, setEventsModalVisibility] = React.useState<boolean>(false);
  const [eventsModal,setEventsModal] = React.useState<ICalendarEvent[]>();
  const [choosenDate,setChoosenDate] = React.useState<moment.MomentInput>();
  const [requests, setRequests] = React.useState<IRequest[] | undefined>();
  const [types, setTypes] = React.useState<IType[]>();

  const fillEvents = async(compDates: Date) => {
    const month = compDates.getMonth() + 1;
    const year = compDates.getFullYear();

    const result = await findRequestsByYearMonth(year,month);
    const resultRequest = result.filter(ev => ev.requests.length > 0);

    setEvents(resultRequest);
    callUsers();
    findRequets();
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

    const usersIdsUniques = usersId.filter((element, index) => {
      return usersId.indexOf(element) === index;
    });

    const result = await findUsers(usersIdsUniques);
    const result2 = result.list;
    
    setUsers(result2);
  }
  React.useEffect(() => {
    const findTypes = async() => {
      const result = await findAllAppTypes();
      setTypes(result);
    }
    findTypes();
  },[])

  const findRequets = () => {
    if (events) {
      let request: IRequest[] = [];
      events.map((event) => {
        event.requests.map(async(req) => {
          const result = await findOneRequest(req.requestId);
          request.push(result);
        });
      });
      setRequests(request);
    }
  }
  


  const findName = (id:number) => {
    if (users) {
      let name = '';
      users.map(async user => {
        if (user.id === id) {
          name = `${user.firstname} ${user.lastname}`;
        }
      });

      return name;
    }

    return 'Not found';
  }
  const getRequestType = (requestId: number) => {
    if (requests) {
      let newRequest = requests.find(request => request.id === requestId);
      if (newRequest) {
        let name = getTypeName(newRequest.typeId);
        return name;
      }
      return 'not found'
    }
  }
  const getTypeName = (typeId: number) => {
    if (types) {
      let newType = types.find(type => type.id === typeId);
      if (newType) {
        console.log('name', newType);
        return newType.name;
      }
    }
  }

  const fillCalendarEvents = () => {
    let calendarEvent;

    if (events) {
      const newCalendarEvent: ICalendarEvent[] = [];

      events.map((event) => {  
        event.requests.map(req => {
          const userName = findName(req.userId);
          const typeName = getRequestType(req.requestId);
          const newTitle = `${userName} - ${typeName}`;
          if (users) {
            calendarEvent = {
              id: req.id,
              title: newTitle,
              start: req.day,
              end: req.day,
              allDay: true
            }

            newCalendarEvent.push(calendarEvent);
          }
        });
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

  const onShowMore = (events: ICalendarEvent[], date: moment.MomentInput ) => {
    setEventsModal(events);
    setChoosenDate(date);
    setEventsModalVisibility(true);
  };

  const closeEventsModal = () => {
    setEventsModalVisibility(false);
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
        onShowMore = {(requests,date) => onShowMore(requests,date)}
        
      />
      <EventsModal 
        events = {eventsModal} 
        date = {choosenDate}
        visibility = {eventsModalVisibility} 
        closeModal = {closeEventsModal}
      />
    </div>
  );
}

