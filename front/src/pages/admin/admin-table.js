import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { Trash, Pencil } from 'react-bootstrap-icons';
import { assignManagerAsync, selectAdmin } from '../../app/admin';
import { ConfirmModal } from './confirm-modal';
import Toast from 'react-bootstrap/Toast';
import { selectUi, uiReducer } from '../../app/ui.reducer';
import { EditTicketModal } from './edit-ticket-modal';


const mapStatus = new Map([
  ['PENDING', 'Ответственный не назначен'],
  ['ACTIVE', 'Задача в работе'],
  ['CLOSE', 'Задача завершена'],
]);

const getRowClassByStatus = new Map([
  ['PENDING', 'table-danger'],
  ['ACTIVE', 'table-info'],
  ['CLOSE', 'table-success'],
]); 

export const AdminTable = () => {
  const { userList: list, managers } = useSelector(selectAdmin) || {};

  const isModalOpen = useSelector(selectUi).isModalOpen;
  const isEditModalOpen = useSelector(selectUi).isEditModalOpen;
  const message = useSelector(selectUi).message;

  const [selectedManagers, setSelectedManagers] = useState({});
  const dispatch = useDispatch();

  const handleManagerChange = (id) => (event) => {
    setSelectedManagers((state) => ({
      ...state,
      [id]: event.target.value,
    }))
  }

  useEffect(() => {
    list.forEach((element, index) => {

      if(element.managerId) {
        setSelectedManagers((state) => ({
          ...state,
          [index]: element.managerId, 
        }));
      }
    });    
  }, [list]);

  const assignManager = (index, ticket) => () => {
    const selectedManagerId = selectedManagers[index] || '';

    if(selectedManagerId) {
      dispatch(assignManagerAsync({
        managerId: selectedManagerId,
        ticket,
      }));
    }
  }

  const handleOpenDeleteModal = (ticketId) => () => {
    dispatch(uiReducer.actions.setModalState({ isModalOpen: true, modalParams: { ticketId } }));
  };

  const handleOpenEditModal = (formData) => () => {
    dispatch(uiReducer.actions.setEditModalState({ isEditModalOpen: true, modalParams: { formData } }));
  };
  


  const renderManagerCell = (rowData, index) => {

    const isClosed = rowData.status === 'CLOSE';

    return !isClosed ? (                
      <>
        <div class="form-group">
        <select class="form-control" onChange={handleManagerChange(index)} value={selectedManagers[index] || ''}>
          <option value="">Выберите менеджера</option>
          {managers.map( i => {
            return <option value={i._id} key={i._id}>{i.name}</option>
          })}
        </select>
      </div>
      {selectedManagers[index] ? <button class="btn btn-primary" type="button" name="saveManager" onClick={assignManager(index, rowData)}>Назначить</button> : null}
    </>
    ) : managers.find(({ _id }) => _id === rowData.managerId)?.name;
  }

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th></th>
            <th>Клиент</th>
            <th>Номер</th>
            <th>Задача</th>
            <th>Комментарий клиента</th>
            <th>Дата поступления заявки</th>
            <th>Ответственный менеджер</th>
            <th>Статус задачи</th>
            <th>Дата закрытия задачи</th>
          </tr>
        </thead>
        <tbody>
          {
            list.map((item, index ) => {
              const tableRowClass = getRowClassByStatus.get(item.status);

              return (
                <tr key={item.task + index} className={tableRowClass}>
                  <td>{index + 1}</td>
                  <td>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 30 }}>
                      { item.status !== 'CLOSE' ? <Pencil color="blue" size={20} style={{ marginRight: 20 }} onClick={handleOpenEditModal(item)} /> : null}
                      <Trash color="red" size={20} onClick={handleOpenDeleteModal(item.taskId)} />
                    </div>
                  </td>
                  <td>
                    <p style={{ color: 'black'}}>
                      Имя: <strong>{item.name}</strong>
                    </p>
                    <p style={{ color: 'black'}}>
                      Email: <strong>{item.email}</strong>
                    </p>
                    <p style={{ color: 'black'}}>
                      Телефон: <strong>{item.phone}</strong>
                    </p>
                    <p style={{ color: 'black'}}>
                      Адрес: <strong>{item.address}</strong>
                    </p>
                  </td>
                  <td>{item.phone}</td>
                  <td>{item.task}</td>
                  <td>{item.comment}</td>
                  <td>{new Date(item.date).toISOString().slice(0, 10)}</td>
                  <td>
                    {renderManagerCell(item, index)}
                  </td>
                  <td>{mapStatus.get(item.status)}</td>
                  <td>{item?.finishDate ? new Date(item.finishDate).toISOString().slice(0, 10) : ''}</td>
                </tr>
              )
            })
          }
      </tbody>
    </Table>
    <ConfirmModal show={isModalOpen} handleClose={() => dispatch(uiReducer.actions.resetModalState())} />
    <EditTicketModal show={isEditModalOpen} handleClose={() => dispatch(uiReducer.actions.resetModalState())} />
    <Toast onClose={() => {}} show={!!message} style={{
      position: 'fixed',
      top: 64,
      right: 20,
    }}>
          <Toast.Body>{message}</Toast.Body>
    </Toast>
  </>
  )
}