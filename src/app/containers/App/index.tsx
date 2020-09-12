import React from 'react';
import style from './style.css';
import { RouteComponentProps } from 'react-router';
import { CalendarScreen } from 'app/components/Calendar';

export namespace App {
  export interface Props extends RouteComponentProps<void> { }
}

export const App = () => {
  return (
    <div className={style.normal}>
      <CalendarScreen />
    </div>
  );
};
