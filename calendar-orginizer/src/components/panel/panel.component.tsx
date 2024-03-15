import React from 'react';
import { format } from 'date-fns';
import { PanelWrapper, Button, DateDisplay } from './panel.styles';

interface PanelProps {
  currentDate: Date;
  onIncrement: () => void;
  onDecrement: () => void;
  onCurrent: () => void;
  onViewWeek: () => void;
  onViewMonth: () => void;
  viewMode: 'week' | 'month';
}

const Panel: React.FC<PanelProps> = ({
  currentDate,
  onIncrement,
  onDecrement,
  onCurrent,
  onViewWeek,
  onViewMonth,
  viewMode
}) => {
  return (
    <PanelWrapper>
      <div>
        <Button onClick={onCurrent}>Current</Button>
        <Button onClick={onDecrement}>{'<'}</Button>
        <Button onClick={onIncrement}>{'>'}</Button>
      </div>
      <DateDisplay>{format(currentDate, 'MMMM yyyy')}</DateDisplay>
      <div>
        <Button onClick={onViewWeek} isGray={viewMode === 'month'}>Week</Button>
        <Button onClick={onViewMonth} isGray={viewMode === 'week'}>Month</Button>
      </div>
    </PanelWrapper>
  );
};

export default Panel;
