import { format } from 'date-fns';
import moment from 'moment';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ICalendarEvent } from '../Calendar/CalendarAdmin/Calendar';

export interface CalendarEventsModalProps {
  events?: ICalendarEvent[];
  visibility: boolean;
  date: moment.MomentInput;
  closeModal: () => void;
}

export const EventsModal: React.FC<CalendarEventsModalProps> = ({  events, visibility, date, closeModal }) => {
  return (
    <>
      <Modal show={visibility} onHide={closeModal} scrollable={true}>
        <Modal.Header closeButton>
          <Modal.Title>Time-Off requests on {format(new Date(moment(date).toString()),'MMM dd yyyy')} </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-5 pb-0" >
          <ul className='list-group'>
            {events?.map(event => <li key={event.id} className={`list-group-item list-group-item-info`}>{`${event.title}`}</li>)}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button className="d-block m-auto mb-4" onClick={closeModal}>
            close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}