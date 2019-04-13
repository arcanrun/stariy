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
          <i className="far fa-clock" />
          <span>ПОЛУЧЕНИЕ ПРИКАЗА</span>
        </div>
        <div className={style.rightColumn}>
          <span>{calc.orderTime}</span>
        </div>
      </div>
      <div className={style.row}>
        <div className={style.leftColumn}>
          <i className="far fa-clock" />
          <span>ВЗЛЕТ</span>
        </div>
        <div className={style.rightColumn}>
          <span>{calc.flyTime}</span>
        </div>
      </div>
      <div className={style.row}>
        <div className={style.leftColumn}>
          <i className="fas fa-hand-paper" />
          <span>ПРОМЕЖУТОЧНАЯ ПОСАДКА на авиабазе</span>
        </div>
        <div className={style.rightColumn}>
          <div className={style.multiColumn}>
            <div>{calc.abMiddle.name}</div>
            <div>{calc.abMiddle.x}</div>
          </div>
        </div>
      </div>
      <div className={style.row}>
        <div className={style.leftColumn}>
          <i className="fas fa-plane-arrival" />
          <span>посадки</span>
        </div>
        <div className={style.rightColumn}>
          <span>{calc.landings}</span>
        </div>
      </div>
      <div className={style.row}>
        <div className={style.leftColumn}>
          <i className="fas fa-flag-checkered" />
          <span>Авиабаза ПРИБЫТИЯ</span>
        </div>
        <div className={style.rightColumn}>
          <span className={style.columnSecondColor}>{calc.abArrival}</span>
        </div>
      </div>
      <div className={style.row}>
        <div className={style.leftColumn}>
          <i className="fas fa-fist-raised" />
          <span>ИЗМЕНЕНИЕ боевого потенциала</span>
        </div>
        <div className={style.rightColumn}>
          <span className={style.columnSecondColor}>
            {calc.combatPotential}
          </span>
        </div>
      </div>
      <div className={style.row}>
        <div className={style.leftColumn}>
          <i className="fas fa-stopwatch" />
          <span>длительность переброски</span>
        </div>
        <div className={style.rightColumn}>
          <span className={style.columnSecondColor}>{calc.duration}</span>
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
