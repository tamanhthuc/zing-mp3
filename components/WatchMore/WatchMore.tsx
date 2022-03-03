import * as React from 'react';
import { ROUTE_LIST } from './routes';
export interface IWatchMoreProps {}

export default function WatchMore(props: IWatchMoreProps) {
  return (
    <div className="more" >
      <ul className="more__list">
       {ROUTE_LIST.map(route => {
           return (
            <li className="more__list__item" key={route.id}>
            <div className="more__list__item__icon">{route.icon}</div>
            <div className="more__list__item__name">{route.lable}</div>
            
          </li>
           )
       })}
      </ul>
    </div>
  );
}
