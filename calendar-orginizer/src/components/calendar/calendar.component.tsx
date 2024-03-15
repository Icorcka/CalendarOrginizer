import React, { useEffect, useState } from 'react';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, getMonth, addDays, format } from 'date-fns';
import { CalendarGrid, DaySquare, DayName } from './calendar.styles';
import { fetchHolidaysForDateRange } from '../../services/HolidayService';

interface CalendarProps {
  currentDate: Date;
  viewMode: 'week' | 'month';
  onDateClick: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ currentDate, viewMode, onDateClick }) => {
    const [holidays, setHolidays] = useState<{ [key: string]: any[] }>({});

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
    }
  };

  return (
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
            </DaySquare>
          );
      })}
    </CalendarGrid>
  );
};

export default Calendar;
