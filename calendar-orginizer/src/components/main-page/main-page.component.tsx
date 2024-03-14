import React from 'react';
import Panel from '../panel/panel.component';
import { MainPageWrapper } from './main-page.styles';

const MainPage: React.FC = () => {
  return (
    <MainPageWrapper>
      <Panel />
    </MainPageWrapper>
  );
};

export default MainPage;
