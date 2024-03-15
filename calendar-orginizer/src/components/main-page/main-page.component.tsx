import React, { useState } from 'react';
import Panel from '../panel/panel.component';
import { MainPageWrapper } from './main-page.styles';
import Calendar from '../calendar/calendar.component';
import { addWeeks, subWeeks, addMonths, subMonths, setDate } from 'date-fns';

const MainPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'month'>('month');

  const handleIncrement = () => {
    setCurrentDate(viewMode === 'month' ? addMonths(currentDate, 1) : addWeeks(currentDate, 1));
  };

  const handleDecrement = () => {
    setCurrentDate(viewMode === 'month' ? subMonths(currentDate, 1) : subWeeks(currentDate, 1));
  };

  const handleCurrent = () => {
    setCurrentDate(new Date());
  };

  const handleWeekView = () => {
    setViewMode('week');
  };

  const handleMonthView = () => {
    setViewMode('month');
  };

  const handleDateClick = (date: Date) => {
    setCurrentDate(date);
  };

  return (
    <MainPageWrapper>
      <Panel
        currentDate={currentDate}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onCurrent={handleCurrent}
        onViewWeek={handleWeekView}
        onViewMonth={handleMonthView}
        viewMode={viewMode}
      />
      <Calendar
        currentDate={currentDate}
        viewMode={viewMode}
        onDateClick={handleDateClick}
      />
    </MainPageWrapper>
  );
};

export default MainPage;
