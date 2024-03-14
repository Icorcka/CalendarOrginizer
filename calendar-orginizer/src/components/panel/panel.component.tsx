import React, { useState } from 'react';
import { addWeeks, addMonths, subWeeks, subMonths, format } from 'date-fns';
import { PanelWrapper, Button, DateDisplay } from './panel.styles';

const Panel: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [increment, setIncrement] = useState<'week' | 'month'>('month');

  const handleIncrement = () => {
    setCurrentDate(increment === 'month' ? addMonths(currentDate, 1) : addWeeks(currentDate, 1));
  };

  const handleDecrement = () => {
    setCurrentDate(increment === 'month' ? subMonths(currentDate, 1) : subWeeks(currentDate, 1));
  };

  const handleCurrent = () => {
    setCurrentDate(new Date());
  };

  const handleWeek = () => {
    setIncrement('week');
  };

  const handleMonth = () => {
    setIncrement('month');
  };

  return (
    <PanelWrapper>
      <div>
        <Button onClick={handleCurrent}>Current</Button>
        <Button onClick={handleDecrement}>{'<'}</Button>
        <Button onClick={handleIncrement}>{'>'}</Button>
      </div>
      <DateDisplay>{format(currentDate, 'MMMM yyyy')}</DateDisplay>
      <div>
      <Button onClick={handleWeek} isGray={increment === 'month'}>Week</Button>
        <Button onClick={handleMonth} isGray={increment === 'week'}>Month</Button>
      </div>
    </PanelWrapper>
  );
};

export default Panel;