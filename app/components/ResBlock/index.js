//@flow
import React from 'react';

import style from './ResBlock.css';

type PROPS = {
  calc: Object
};

const ResBlock = ({ calc }: PROPS) => {
  console.log('ResBlock->', calc);
  return (
    <div className={style.calcContainer}>
      <div className={style.calcPlaneBlock}>
        {!calc.plane ? (
          'Loading...'
        ) : (
          <div>
            <div className={style.planeAvatarContainer}>
              <img
                alt="plane-ava"
                className={style.planeAvatar}
                src={calc.image}
              />
            </div>
            <div className={style.titlePlane}>{calc.plane}</div>
          </div>
        )}{' '}
      </div>
    </div>
  );
};
export { ResBlock };
