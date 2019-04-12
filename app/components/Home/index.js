//@flow
import React from 'react';

import style from './Home.css';

class Home extends React.Component<{}, {}> {
  render() {
    return (
      <div className={style.home}>
        <h1>Home</h1>
      </div>
    );
  }
}

export { Home };
