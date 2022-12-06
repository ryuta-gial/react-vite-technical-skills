import { EventInput } from '@fullcalendar/react';
let eventGuid = 0;
//"2018-02-27T05:39:34.596Z"
let todayStr = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr,
  },
  {
    id: createEventId(),
    title: 'Test day',
    start: '2021-06-12',
  },
];

export function createEventId() {
  return String(eventGuid++);
}
