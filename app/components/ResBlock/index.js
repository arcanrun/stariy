//@flow
import React from 'react';

import style from './ResBlock.css';

type PROPS = {
  calc: Object
};

const ResBlock = ({ calc }: PROPS) => {
  console.log('ResBlock->', calc);
  const planeWholeBlc = (
    <div className={style.calcPlaneBlock}>
      <div className={style.planeAvatarContainer}>
        <img
          alt="plane-ava"
          className={style.planeAvatar}
          src={calc.plane.image}
        />
      </div>
      <div className={style.titlePlane}>{calc.plane.plane}</div>
    </div>
  );
  const tableCal = (
    <div className={style.table}>
      <div className={style.row}>
        <div className={style.leftColumn}>
          <i class="far fa-clock" />
          <span>ПОЛУЧЕНИЕ ПРИКАЗА</span>
        </div>
        <div className={style.rightColumn}>
          <span>right</span>
        </div>
      </div>
      <div className={style.row}>
        <div className={style.leftColumn}>
          <i class="far fa-clock" />
          <span>ПОЛУЧЕНИЕ ПРИКАЗА</span>
        </div>
        <div className={style.rightColumn}>
          <span>right</span>
        </div>
      </div>
      <div className={style.row}>
        <div className={style.leftColumn}>
          <i class="far fa-clock" />
          <span>ПОЛУЧЕНИЕ ПРИКАЗА</span>
        </div>
        <div className={style.rightColumn}>
          <span>right</span>
        </div>
      </div>
    </div>
  );
  return (
    <div className={style.calcContainer}>
      {!calc ? (
        'Loading...'
      ) : (
        <>
          {planeWholeBlc}
          {tableCal}
        </>
      )}
    </div>
  );
};
export { ResBlock };
