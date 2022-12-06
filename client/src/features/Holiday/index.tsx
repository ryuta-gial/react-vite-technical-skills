import '@fullcalendar/react/dist/vdom';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
//Api
import {
  fetchHoliday,
  createHoliday,
  deleteHoliday,
} from 'services/holidayApi';
//fullCalendar
import FullCalendar, {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
} from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useAppDispatch } from 'hooks';
import './main.css';
interface PropsState {
  weekendsVisible: boolean;
  currentEvents: EventApi[];
}

const Holiday: React.FC = React.memo(() => {
  const [state, setState] = useState<PropsState>({
    weekendsVisible: true,
    currentEvents: [],
  });
  const { holiday } = useSelector((state: RootState) => state.Holiday);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (holiday.length === 0) {
      dispatch(fetchHoliday());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * @returns
   */
  const renderSidebar = () => {
    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          <h2>使い方</h2>
          <ul>
            <li>日付を選択してください。</li>
          </ul>
        </div>
        <div className='demo-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={state.weekendsVisible}
              onChange={handleWeekendsToggle}
            ></input>
            週末を表示にする
          </label>
        </div>
        <div className='demo-app-sidebar-section'>
          <h2>休園日一覧 ({state.currentEvents.length})</h2>
          <ul>{state.currentEvents.map(renderSidebarEvent)}</ul>
        </div>
      </div>
    );
  };
  const handleWeekendsToggle = useCallback(() => {
    setState({
      ...state,
      weekendsVisible: !state.weekendsVisible,
    });
  }, [state]);

  const handleDateSelect = useCallback(
    (selectInfo: DateSelectArg) => {
      const holidayData = {
        title: '休園日',
        holiday: selectInfo.startStr,
      };

      dispatch(createHoliday(holidayData));
    },
    [dispatch]
  );

  const handleEventClick = useCallback(
    (clickInfo: EventClickArg) => {
      if (
        window.confirm(
          `登録した '${clickInfo.event.title}'を削除してもよろしいでしょうか？`
        )
      ) {
        dispatch(deleteHoliday(clickInfo.event.id));
        //clickInfo.event.remove();
      }
    },
    [dispatch]
  );

  const handleEvents = useCallback(
    (events: EventApi[]) => {
      setState({
        ...state,
        currentEvents: events,
      });
    },
    [state]
  );

  const esLocale = {
    code: 'ja',
    // week: {
    //   dow: 0, // Sunday is the first day of the week.
    //   doy: 6, // The week that contains Jan 1st is the first week of the year.
    // },
    buttonText: {
      // prev: '前月',
      // next: '次月',
      today: '今月',
      // month: '月',
      // week: '週',
      // day: '日',
      // list: 'Agenda',
    },
    // weekText: "Sm",
    // allDayText: "Todo el día",
    // moreLinkText: "más",
    // noEventsText: "No hay eventos para mostrar",
  };

  return (
    <div className='demo-app'>
      {renderSidebar()}
      <div className='demo-app-main'>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          hiddenDays={[0]}
          locales={[esLocale]}
          locale={'ja'}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
          }}
          initialView='dayGridMonth'
          editable={true}
          businessHours={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={state.weekendsVisible}
          events={holiday}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
        />
      </div>
    </div>
  );
});

const renderEventContent = (eventContent: EventContentArg) => {
  return (
    <>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </>
  );
};

const renderSidebarEvent = (event: EventApi) => {
  return (
    <li key={event.id}>
      <b>
        {formatDate(event.start!, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </b>
      <i>{event.title}</i>
    </li>
  );
};

export default Holiday;
