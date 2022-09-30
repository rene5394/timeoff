export interface IEvents {
  day: Date;
  number: number;
}

export interface IEventsDetails {
  day: Date;
  requests: IRequestsEvents[];
}

interface IRequestsEvents {
  id: number;
  requestId: number;
  day: Date;
  admin: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}