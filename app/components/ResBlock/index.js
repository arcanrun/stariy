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
  const tableCalc = (
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
            <div>{calc.middleTime}</div>
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

  const map = (
    <div className={style.mapContaniner}>
      <div className={style.toolTipContainer}>
        <div className={[style.toolTip, style.blueToolTip].join(' ')}>
          <div>
            <b>{calc.abTakeoff}</b>
          </div>
          <div>{calc.flyTime}</div>
        </div>
        <div className={[style.toolTip, style.greenToolTip].join(' ')}>
          <div>
            <b>{calc.abMiddle.name}</b>
          </div>
          <div>{calc.middleTime}</div>
        </div>
        <div className={[style.toolTip, style.purpleToolTip].join(' ')}>
          <div>
            <b>{calc.abArrival}</b>
          </div>
          <div>{calc.timeArrival}</div>
        </div>
      </div>
      <img src={calc.optionFakeMap} alt="map" />
    </div>
  );
  return (
    <div className={style.calcContainer}>
      {!calc ? (
        'Loading...'
      ) : (
        <>
          {planeWholeBlc}
          {tableCalc}
          {map}
        </>
      )}
    </div>
  );
};
export { ResBlock };
