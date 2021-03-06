/* eslint-disable react/button-has-type */
/* eslint-disable import/prefer-default-export */
// @flow
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { ipcRenderer } from 'electron';

import style from './DataBase.css';
import { DbControl, ModalOverlay } from '../index';

type STATE = {
  isModalVisible: boolean,
  allData: any
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
    abArrivalArray: Array<Object>,
    planes: Array<Object>
  ) => {
    const data = {
      abTakeoff,
      abArrivalArray,
      planes
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
        {/* <button className={style.btn}>Добавить к записи</button> */}
        <button
          className={[style.btn, style.btnAlert].join(' ')}
          onClick={this.deleteAll}
        >
          Удалить базу данных
        </button>
      </div>
    );
    const wholeTable = (
      <table className={style.table}>
        <thead>
          <tr>
            <th>Авиабаза взлета</th>
            <th>Авиабаза прибытия</th>
            <th>Модели самолетов</th>
          </tr>
        </thead>
        <tbody>
          {allData.map((el, i) => (
            <tr key={i}>
              <td>{el.abTakeoff}</td>
              <td>
                {el.abArrivalArray.map((ab, index) => (
                  <div className={style.tableColumnPlane} key={index}>
                    <div>
                      <div>
                        <b>Прибытие:</b>
                        {ab.abArrival}
                      </div>
                      <div>
                        <b>Промеж:</b>
                        {ab.abMiddle}
                      </div>
                      <div>
                        <b>X:</b>
                        {ab.x}
                      </div>
                      <div>
                        <b>Y:</b>
                        {ab.y}
                      </div>
                    </div>

                    <img
                      className={style.planeImg}
                      src={ab.fakeMap}
                      alt="img-of-plane"
                    />
                  </div>
                ))}
              </td>
              <td>
                {el.planes.map((plane, index) => (
                  <div className={style.tableColumnPlane} key={index}>
                    <div>
                      <div>
                        <b>{plane.plane}</b>
                      </div>
                      <div>
                        <b>L:</b>
                        {plane.l}
                      </div>
                    </div>

                    <img
                      className={style.planeImg}
                      src={plane.image}
                      alt="img-of-plane"
                    />
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
    return (
      <div className={style.dataBasePage}>
        {modalAddNewValue}
        <div className={style.tableContainer}>
          {modalControlBlock}
          {wholeTable}
        </div>
      </div>
    );
  }
}
