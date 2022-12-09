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
import { findNumberOfRequestsByYearMonth, findOneRequest, findRequestsByYearMonth } from '../../../lib/api/timeoff/request';
import { findAllTeamUsersEmployeesByJWT } from '../../../lib/api/team/user';
import { IUser } from '../../../lib/domain/team/IUser';
import { IType } from '../../../lib/domain/timeoff/IType';
import { IStatus } from '../../../lib/domain/timeoff/IStatus';
import { findAllTypes } from '../../../lib/api/timeoff/type';
import { findAllStatuses } from '../../../lib/api/timeoff/status';
import { IRequest } from '../../../lib/domain/timeoff/IRequest';

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
  const [types, setTypes] = React.useState<IType[]>();
  const [statuses,setStatuses] = React.useState<IStatus[]>();
  const [requests, setRequests] = React.useState<IRequest[] | undefined>();

  const fillEventsDetails = async(compDates: Date) => {
    const month = compDates.getMonth()+1;
    const year = compDates.getFullYear();

    const result = await findRequestsByYearMonth(year,month);
    const resultRequest = result.filter(ev => ev.requests.length > 0);

    setEventsDeatils(resultRequest);

  }

  React.useEffect(() => {
    const findTypes = async() => {
      const result = await findAllTypes();
      setTypes(result);
    }
    const findStatus = async() => {
      const result = await findAllStatuses();
      setStatuses(result);
    }
    findTypes();
    findStatus();
    setDates(new Date());
    fillEventsDetails(new Date());
    fillEvents(new Date());
  },[]);

  React.useEffect(() => {
    const findRequets = () => {
      if (eventsDetails) {
        let newRequestsArray: IRequest[] = [];
        let requestsId: any[] = [];
        eventsDetails.map((event) => {
          event.requests.map((req) => {
            requestsId.push(req.requestId);
          });
        });
        const requestsIdsUniques = requestsId.filter((element, index) => {
          return requestsId.indexOf(element) === index;
        });

        Promise.all(requestsIdsUniques.map(async(request) => {
          const result = await findOneRequest(request);
          newRequestsArray.push(result);
        })).then(() => {
          setRequests(newRequestsArray);
        });

      }
    }

    const callUsers = async() => {
      const result = await findAllTeamUsersEmployeesByJWT();
      const result2 = result.list;
      
      setUsers(result2);
    }

    callUsers();
    findRequets()
  },[eventsDetails])

  const fillEvents = async(compDates: Date) => {
    const month = compDates.getMonth() + 1;
    const year = compDates.getFullYear();

    const result = await findNumberOfRequestsByYearMonth(year, month);
    const resultRequest = result.filter(ev => ev.number != 0);

    setEvents(resultRequest);
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

  const getRequestType = (requestId:number) => {

    if (requests) {
      let id = 0;
      requests.map(request => {
        if (request.id === requestId) {
          id = request.typeId;
        }
      });
      let name = getTypeName(id);
      return name;
    }
  }

  const getTypeName = (typeId: number) => {
    if (types) {
      let name;
      types.map(type => {
        if (type.id === typeId) {
          name = type.name;
        }
      });
      return name;
    }
  }

  const getRequestStatus = (requestId: number) => {
    if (requests) {
      let id = 0;
      requests.map(request => {
        if (request.id === requestId) {
          id = request.statusId;
        }
      });
      let name = getStatusName(id);
      return name;
    }
  }

  const getStatusName = (statusId: number) => {
    if (statuses) {
      let name;
      statuses.map(status => {
        if (status.id === statusId) {
          name = status.name;
        }
      });
      return name;
    }
  }

  React.useEffect(() => {
    const isActive = (idUser: number) => {
      if (users) {
        let exits;
        let user = users.find(user1 => user1.id === idUser);
        let statusId = user?.status_id;
        if (statusId === 3) {
          return false;
        }
        return true;
      }
    }
    const fillCalendarEventsDetails = () => {
      let calendarEvent;
      let newCalendarEvent: ICalendarEvent[] = [];
      
      if (events) {
        newCalendarEvent = events.map((event, i) => { 
          let newEvents: number = event.number;
          eventsDetails?.map(eventDetail => {
            eventDetail.requests.map(request => {
              let findUser = users?.find(user => user.id === request.userId);
              if (request.day === event.day && findUser) {
                newEvents--;
              }
            })
            
          });
          calendarEvent = {
            id: i,
            title: String(newEvents),
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
            const findUser = users?.find(user => user.id === req.userId);
            const userName = findName(req.userId);
            const typeName = String(getRequestType(req.requestId));
            const statusName = String(getRequestStatus(req.requestId));
            const abbrStatus = statusName.substring(0,4);
            const abbrType = typeName.substring(0,1);
            const newTitle = `${abbrStatus} - ${userName} (${abbrType})`;
            const isUserActive = isActive(req.userId);
            if (findUser && users && statuses && types && isUserActive) {
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
      }
      let newCalendarEventFilter = newCalendarEvent.filter(event => event.title != '0');
      setCalendarEvents(newCalendarEventFilter);
    }
    fillCalendarEventsDetails();
  },[requests,users])

  React.useEffect(() => {
    let date;
    (dates != undefined) ? date = dates : date = new Date();

    fillEventsDetails(date);
    fillEvents(date);
  }, [dates]);

  

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

