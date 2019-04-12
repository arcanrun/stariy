//@flow
import React from 'react';

import style from './Header.css';

type PROPS = {
  toggleMenu: Function
};

const Header = ({ toggleMenu }: PROPS) => {
  return (
    <div className={style.header}>
      <i
        onClick={toggleMenu}
        className={[style.headerMenuLogo, 'fas', 'fa-bars'].join(' ')}
      />
      <div className={style.headerTitle}>Главный экран</div>
    </div>
  );
};

export { Header };
