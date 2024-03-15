import React, { useEffect, useState } from 'react';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, getMonth, addDays, format } from 'date-fns';
import { CalendarGrid, DaySquare, DayName, EventIndicator } from './calendar.styles';
import { fetchHolidaysForDateRange } from '../../services/HolidayService';
import EventModal from '../EventModal/event-modal.component';

interface CalendarProps {
  currentDate: Date;
  viewMode: 'week' | 'month';
  onDateClick: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ currentDate, viewMode, onDateClick }) => {
    const [holidays, setHolidays] = useState<{ [key: string]: any[] }>({});
    const [events, setEvents] = useState<{ [key: string]: Array<{ name: string; color: string }> }>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [editingEvent, setEditingEvent] = useState<{ name: string; color: string; date?: string } | undefined>();

    const getDates = () => {
    let start, end;
    if (viewMode === 'week') {
        start = startOfWeek(currentDate);
        end = endOfWeek(currentDate);
    } else {
        start = startOfWeek(startOfMonth(currentDate));
        end = endOfWeek(endOfMonth(currentDate));
    }
    return eachDayOfInterval({ start, end });
    };

  const dates = getDates();

  useEffect(() => {
    console.log(currentDate)
    const loadHolidays = async () => {
      const dates = getDates();
      const startDate = dates[0];
      const endDate = dates[dates.length - 1];
      const holidays = await fetchHolidaysForDateRange(startDate, endDate);
      setHolidays(holidays);
    };

    loadHolidays();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate, viewMode]);

  const weekdayNames = Array.from({ length: 7 }, (_, i) => 
    format(addDays(startOfWeek(new Date()), i), 'eee')
  );

  const handleDayClick = (date: Date) => {
    if (viewMode === 'month' && getMonth(date) !== getMonth(currentDate)) {
        onDateClick(date);
    } else {
        setSelectedDate(format(date, 'yyyy-MM-dd'));
        setIsModalOpen(true);
    }
  };

  const handleEventClick = (event: { name: string; color: string }, date: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDate(date);
    setIsModalOpen(true);
    setEditingEvent(event);
  };

  const handleModalSubmit = (eventDetails: { date: string; name: string; color: string }) => {
    if (editingEvent) {
      const updatedEvents = events[selectedDate].map(ev => 
        ev.name === editingEvent.name && ev.color === editingEvent.color ? eventDetails : ev
      );
      setEvents({ ...events, [selectedDate]: updatedEvents });
    } else {
      setEvents(prevEvents => ({
        ...prevEvents,
        [eventDetails.date]: [...(prevEvents[eventDetails.date] || []), eventDetails]
      }));
    }
    setEditingEvent(undefined);
  };

  return (
    <>
        <EventModal 
            show={isModalOpen}
            onClose={() => { setIsModalOpen(false); setEditingEvent(undefined); }}
            onSubmit={handleModalSubmit}
            date={selectedDate}
            editingEvent={editingEvent}
      />
        <CalendarGrid>
        {weekdayNames.map(name => (
            <DayName key={name}>{name}</DayName>
        ))}
        {dates.map(date => {
            const dateString = format(date, 'yyyy-MM-dd');
            return (
                <DaySquare
                key={dateString}
                isCurrentMonth={getMonth(date) === getMonth(currentDate)}
                onClick={() => handleDayClick(date)}
                >
                <span>{date.getDate()}</span>
                {holidays[dateString] && holidays[dateString].map(holiday => (
                    <div key={holiday.name}>{holiday.name}</div>
                ))}
                {events[dateString] && events[dateString].map((event, index) => (
                <div key={index} onClick={(e) => handleEventClick(event, dateString, e)}>
                    <EventIndicator color={event.color} />
                    {event.name}
                </div>
                ))}
                </DaySquare>
            );
        })}
        </CalendarGrid>
    </>
  );
};

export default Calendar;
