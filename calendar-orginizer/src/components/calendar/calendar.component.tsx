import React from 'react';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, getMonth, addDays, format } from 'date-fns';
import { CalendarGrid, DaySquare, DayName } from './calendar.styles';

interface CalendarProps {
  currentDate: Date;
  viewMode: 'week' | 'month';
  onDateClick: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ currentDate, viewMode, onDateClick }) => {
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

  const weekdayNames = Array.from({ length: 7 }, (_, i) => 
    format(addDays(startOfWeek(new Date()), i), 'eee')
  );

  const handleDayClick = (date: Date) => {
    if (viewMode === 'month' && getMonth(date) !== getMonth(currentDate)) {
      onDateClick(date);
    }
  };

  return (
    <CalendarGrid>
      {weekdayNames.map(name => (
        <DayName key={name}>{name}</DayName>
      ))}
      {dates.map(date => (
        <DaySquare 
          key={date.toString()} 
          isCurrentMonth={getMonth(date) === getMonth(currentDate)}
          onClick={() => handleDayClick(date)}
        >
          <span>{date.getDate()}</span>
        </DaySquare>
      ))}
    </CalendarGrid>
  );
};

export default Calendar;
