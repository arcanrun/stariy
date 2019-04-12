//@flow
import React from 'react';

import style from './DataBase.css';
export const DataBase = () => {
  return (
    <div className={style.dataBasePage}>
      <div className={style.dbControl}>
        <div className={style.dbControlItem}>
          <span>АБ взлета</span>
          <input className={style.dbControlInput} type="text" />
        </div>
        <div className={style.dbControlItem}>
          <span>АБ промежуточной посадки</span>
          <input className={style.dbControlInput} type="text" />
        </div>
        <div className={style.dbControlItem}>
          <span>АБ прибытия</span>
          <input className={style.dbControlInput} type="text" />
        </div>
        <div className={style.dbControlItem}>
          <span>Модели самолетов</span>
          <input className={style.dbControlInput} type="text" />
        </div>
        <div className={style.dbControlItem}>
          <span>X</span>
          <input className={style.dbControlInput} type="text" />
        </div>
        <div className={style.dbControlItem}>
          <span>Y</span>
          <input className={style.dbControlInput} type="text" />
        </div>
        <div className={style.dbControlItem}>
          <span>L</span>
          <input className={style.dbControlInput} type="text" />
        </div>
      </div>
    </div>
  );
};
