import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectUi, uiReducer } from '../../app/ui.reducer';
import { removeTicketAsync } from '../../app/admin';



export const ConfirmModal = ({ show = false, handleClose }) => {
  const modalParams = useSelector(selectUi).modalParams;
  const dispatch = useDispatch();

  const handleSubmitService = () => {
      dispatch(removeTicketAsync({ticketId: modalParams.ticketId }));
      dispatch(dispatch(uiReducer.actions.setMessage('Заказ успешно удален!')));
        dispatch(dispatch(uiReducer.actions.resetModalState()));

        setTimeout(() => {
            dispatch(dispatch(uiReducer.actions.setMessage('')));
        }, 3000);
  };

  return (
    <Modal show={show} onHide={handleClose} size="xl">
    <Modal.Header closeButton>
      <Modal.Title>Удаление</Modal.Title>
    </Modal.Header>
    <Modal.Body>
       Вы уверены, что хотите удалить заказ?
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
      Отмена
      </Button>
      <Button variant="primary" onClick={handleSubmitService}>
      Удалить
      </Button>
    </Modal.Footer>
  </Modal>
  )
}