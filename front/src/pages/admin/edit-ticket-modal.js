import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { selectUi, uiReducer } from '../../app/ui.reducer';
import { SERVICES } from '../main/service/services.const';
import { useDispatch, useSelector } from 'react-redux';
import { updateTicketAsync } from '../../app/admin';



const tasksOptions = SERVICES.map(({ title }) => ({ label: title, value: title }));

export const EditTicketModal = ({ show = false, handleClose }) => {
  const modalParams = useSelector(selectUi).modalParams;
  const dispatch = useDispatch();

  const [formState, updateState] = useState( {
    name: undefined,
    email: undefined,
    phone: undefined,
    address: undefined,
    task: undefined,
});


useEffect(() => {
  if (modalParams.formData) {
      updateState((state) => ({
        ...state,
        name: modalParams.formData.name,
        email: modalParams.formData.email,
        phone: modalParams.formData.phone,
        address: modalParams.formData.address,
        task: modalParams.formData.task,
    }));
  };
}, [modalParams?.formData])


const updateField = (field) => (event) => {
  const { value } = event.target;

  updateState((prevState) => ({ ...prevState, [field]: value }))
}

const handleSubmitService = () => {
  dispatch(updateTicketAsync({ formData: formState, ticketId: modalParams.formData.taskId, userId: modalParams.formData._id }));

  dispatch(dispatch(uiReducer.actions.setMessage('Запись успешно обновлена')));
  dispatch(dispatch(uiReducer.actions.resetModalState()));

  setTimeout(() => {
      dispatch(dispatch(uiReducer.actions.setMessage('')));
  }, 3000);
};


  return (
    <Modal show={show} onHide={handleClose} size="xl">
    <Modal.Header closeButton>
      <Modal.Title>Изменить заявку</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div class="row">
                    </div>
                    <form>
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="nameInput">ФИО</label>
                                    <input type="name" required class="form-control" id="nameInput" name="name" placeholder="Введите Ваше ФИО" onChange={updateField('name')} value={formState.name}></input>
                                </div>
                                <div class="form-group">
                                    <label for="emailInput">Email</label>
                                    <input type="email" required class="form-control" id="emailInput" name="email" placeholder="Введите Ваш адрес почты" onChange={updateField('email')} value={formState.email}></input>
                                </div>
                                <div class="form-group">
                                    <label for="phoneInput">Телефон</label>
                                    <input type="number" required class="form-control" id="phoneInput" name="phone" placeholder="Введите Ваш номер телефона" onChange={updateField('phone')} value={formState.phone}></input>
                                </div>
                            </div>
                            
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="addresInput">Адрес</label>
                                    <input type="name" required class="form-control" id="addresInput" name="address" placeholder="Введите Ваш адрес" onChange={updateField('address')} value={formState.address}></input>
                                </div>
                                <div class="form-group">
                                    <label for="addresInput">Задача</label>
                                    <select class="form-control" id="addresInput" onChange={updateField('task')} value={formState.task}>
                                      {tasksOptions.map(({ label, value }) => {
                                        return <option value={value}>{label}</option>
                                      })}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
      Отмена
      </Button>
      <Button variant="primary" onClick={handleSubmitService}>
      Изменить
      </Button>
    </Modal.Footer>
  </Modal>
  );
}