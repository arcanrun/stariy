//@flow
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { ipcRenderer } from 'electron';

import style from './DataBase.css';
import { DbControl, ModalOverlay } from '../index';
import { string } from 'postcss-selector-parser';
import electronDebug from 'electron-debug';

type STATE = {
  isModalVisible: boolean,
  allData: Array<any>
};

export class DataBase extends React.Component<{}, STATE> {
  state = {
    isModalVisible: false,
    allData: []
  };
  componentDidMount() {
    ipcRenderer.send('get-all');
    ipcRenderer.on('all-data', (event, message) => {
      this.setState({ allData: message }, () =>
        console.log('from state-->', this.state.allData)
      );
    });
  }
  deleteAll = () => {
    ipcRenderer.send('delete-all');
  };
  showModal = () => {
    const { isModalVisible } = this.state;
    this.setState({ isModalVisible: !isModalVisible });
  };
  addNew = (
    abTakeoff: string,
    abMiddle: string,
    abArrival: string,
    plane: string,
    x: number,
    y: number
  ) => {
    const data = {
      plane,
      abTakeoff,
      abMiddle,
      abArrival,
      x,
      y
    };
    ipcRenderer.send('add-to-bd', data);
  };
  closeModal = () => {
    const { isModalVisible } = this.state;
    this.setState({ isModalVisible: !isModalVisible });
  };
  render() {
    const { isModalVisible, allData } = this.state;
    const modalAddNewValue = (
      <ModalOverlay isVisible={isModalVisible}>
        <DbControl
          closeModal={this.closeModal}
          isVisible={isModalVisible}
          addNew={this.addNew}
        />
      </ModalOverlay>
    );
    const modalControlBlock = (
      <div className={style.modalControlBlock}>
        <button className={style.btn} onClick={this.showModal}>
          Новая запись
        </button>
        {/*<button className={style.btn}>Добавить к записи</button> */}
        <button
          className={[style.btn, style.btnAlert].join(' ')}
          onClick={this.deleteAll}
        >
          Удалить базу данных
        </button>
      </div>
    );
    return (
      <div className={style.dataBasePage}>
        {modalAddNewValue}
        {modalControlBlock}

        <table className={style.table}>
          <thead>
            <tr>
              <th>Авиабаза взлета</th>
              <th>Авиабаза промежуточной посадки</th>
              <th>X</th>
              <th>Авиабаза прибытия</th>
              <th>Y</th>
              <th>Модели самолетов</th>
            </tr>
          </thead>
          <tbody>
            {allData.map((el, i) => (
              <tr key={i}>
                <td>{el.abTakeoff}</td>
                <td>{el.abMiddle}</td>
                <td>{el.x}</td>
                <td>{el.abArrival}</td>
                <td>{el.y}</td>
                <td>
                  {el.plane.map((plane, index) => (
                    <div>
                      <b>{plane.plane}</b>
                      <i>
                        <b>L:</b>
                        {el.l}
                      </i>
                      <img src={el.image} alt="img-of-plane" />
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
