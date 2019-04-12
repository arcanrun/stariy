//@flow
import React from 'react';
import { Link } from 'react-router-dom';

import routes from '../../constants/routes';
import style from './Menu.css';

type PROPS = {
  toggleMenu: Function,
  isVisible: boolean
};

export class Menu extends React.Component<PROPS> {
  handleToggle = (e: any) => {
    const tag = e.target.nodeName;
    if (tag === 'A' || tag === 'LI') {
      this.props.toggleMenu();
    }
  };
  render() {
    const { isVisible, toggleMenu } = this.props;
    return (
      <div
        className={[isVisible ? style.menu : style.menuHidden, style.menu].join(
          ' '
        )}
      >
        <i
          onClick={toggleMenu}
          className={[style.cross, 'fas', 'fa-times'].join(' ')}
        />
        <ul onClick={e => this.handleToggle(e)} className={style.menuList}>
          <li className={style.menuItem}>
            <Link to={routes.HOME}>главный экран</Link>
          </li>
          <li className={style.menuItem}>
            <Link to={routes.DBPAGE}>База данных</Link>
          </li>
        </ul>
      </div>
    );
  }
}
