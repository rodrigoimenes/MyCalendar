import React from 'react';
import style from './style.css';
import { RouteComponentProps } from 'react-router';

export namespace App {
  export interface Props extends RouteComponentProps<void> { }
}

export const App = () => {
  return (
    <div className={style.normal}>
      Hello World!
    </div>
  );
};
