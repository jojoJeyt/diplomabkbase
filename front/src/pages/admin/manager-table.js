import React from 'react';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { finishTicketAsync, selectAdmin } from '../../app/admin';
import Button from 'react-bootstrap/Button';

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

export const ManagerTable = () => {
  const { userList } = useSelector(selectAdmin) || {};
  const dispatch = useDispatch();


  const handleCloseTicket = (ticketId) => () => {
    dispatch(finishTicketAsync({ ticketId }));
  }

  return (
    <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Клиент</th>
        <th>Задача</th>
        <th>Комментарий клиента</th>
        <th>Дата поступления заявки</th>
        <th>Статус задачи</th>
        <th>Отметка о выполнении</th>
      </tr>
    </thead>
    <tbody>
      {
        userList.map((item, index ) => {
          const tableRowClass = getRowClassByStatus.get(item.status);

          return (
            <tr key={item.task + index} className={tableRowClass}>
              <td>{index + 1}</td>
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
              <td>{item.task}</td>
              <td>{item.comment}</td>
              <td>{new Date(item.date).toISOString().slice(0, 10)}</td>
              <td>{mapStatus.get(item.status)}</td>
              <td>
                { item.status === 'CLOSE' ? 'Заяка закрыта' : <Button variant="success" onClick={handleCloseTicket(item.taskId)}>Закрыть задачу</Button> }
              </td>
            </tr>
          )
        })
      }
  </tbody>
</Table>
);
}