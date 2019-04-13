//@flow
import React from 'react';

import style from './Header.css';

type PROPS = {
  toggleMenu: Function,
  page: string
};

const Header = ({ toggleMenu, page }: PROPS) => {
  let title = '';
  switch (page) {
    case '/db-page':
      title = 'база данных';
      break;
    case '/':
      title = 'Главный экран';
      break;
    default:
      title = '?';
      break;
  }
  return (
    <div className={style.header}>
      <i
        style={{ color: '#2277ff' }}
        onClick={toggleMenu}
        className={[style.headerMenuLogo, 'fas', 'fa-bars'].join(' ')}
      />
      <div className={style.headerTitle}>{title}</div>
    </div>
  );
};

export { Header };
