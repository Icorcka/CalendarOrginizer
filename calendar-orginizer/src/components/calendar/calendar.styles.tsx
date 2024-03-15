import styled from 'styled-components';

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 5px;
`;

export const DayName = styled.div`
  text-align: center;
  font-weight: bold;
`;

export const DaySquare = styled.div<{ isCurrentMonth: boolean }>`
  min-height: 50px;
  padding: 5px;
  background-color: ${props => props.isCurrentMonth ? 'white' : '#f0f0f0'};
  text-align: left;
  position: relative;
`;

export const EventIndicator = styled.span<{ color: string }>`
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: ${props => props.color};
    margin-right: 5px;
`;
