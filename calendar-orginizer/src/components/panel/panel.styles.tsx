import styled, { css } from 'styled-components';

interface ButtonProps {
    isGray?: boolean;
  }

export const PanelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.5);
`;

export const Button = styled.button<ButtonProps>`
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  &:focus {
    outline: none;
  }
  ${props => props.isGray && css`
    background-color: #ccc;
    color: #666;
  `}
`;

export const DateDisplay = styled.div`
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
`;
