import * as React from 'react'
import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views
} from 'react-big-calendar';
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'moment-timezone';
import Styles from './Calendario.module.css';

moment.tz.setDefault('America/El_Salvador');

moment.locale('es');
const localizer = momentLocalizer(moment);
const events = [
  {
    id: 0,
    title: "Board meeting",
    start: new Date(2022, 0, 29, 9, 0, 0),
    end: new Date(2022, 0, 29, 13, 0, 0),
    resourceId: 1
  },
  {
    id: 1,
    title: "MS training",
    allDay: true,
    start: new Date(2018, 0, 29, 14, 0, 0),
    end: new Date(2018, 0, 29, 16, 30, 0),
    resourceId: 2
  },
  {
    id: 2,
    title: "Team lead meeting",
    start: new Date(2018, 0, 29, 8, 30, 0),
    end: new Date(2018, 0, 29, 12, 30, 0),
    resourceId: 3
  },
  {
    id: 11,
    title: "Birthday Party",
    start: new Date(2018, 0, 30, 7, 0, 0),
    end: new Date(2018, 0, 30, 10, 30, 0),
    resourceId: 4
  }
];

const resourceMap = [
  { resourceId: 1, resourceTitle: "Board room" },
  { resourceId: 2, resourceTitle: "Training room" },
  { resourceId: 3, resourceTitle: "Meeting room 1" },
  { resourceId: 4, resourceTitle: "Meeting room 2" }
];



export const Calendario = () =>{
  return(
    <div className={"col-8 "+Styles.Calendar}>
      <BigCalendar
        selectable
        localizer={localizer}
        events={events}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        defaultDate={new Date(2018, 0, 29)}
        resources={resourceMap}
        resourceIdAccessor="resourceId"
        resourceTitleAccessor="resourceTitle"
        AllDay="true"
      />
    </div>
    
  );
}
