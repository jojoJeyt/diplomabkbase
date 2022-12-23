import React, { useCallback, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectUi, uiReducer } from '../../app/ui.reducer';
import { saveService } from '../../api/api';



const initialValues = {
    name: undefined,
    email: undefined,
    phone: undefined,
    address: undefined,
    comment: undefined,
};

export const OrderServiceModal = ({ show = false, handleClose }) => {
    const modalParams = useSelector(selectUi).modalParams;
    const dispatch = useDispatch();

    const [formState, updateState] = useState(initialValues);


    const updateField = (field) => (event) => {
        const { value } = event.target;

        updateState((prevState) => ({ ...prevState, [field]: value }))
    }

    console.log(modalParams, 'modalParams');



    const handleSubmitService = useCallback(async () => {
        await saveService({
            ...formState,
            task: modalParams.title,
        });


        dispatch(dispatch(uiReducer.actions.setMessage('Cпасибо! Ваша заявка принята. С Вами скоро свяжутся для уточнения информации.')));
        dispatch(dispatch(uiReducer.actions.resetModalState()));
        updateState(initialValues);

        setTimeout(() => {
            dispatch(dispatch(uiReducer.actions.setMessage('')));
        }, 3000);
    }, [formState, modalParams, dispatch]);


    const isFormValid = !!formState.address && !!formState.name && !!formState.phone && !!formState.email;

  return (
    <Modal show={show} onHide={handleClose} size="xl">
    <Modal.Header closeButton>
      <Modal.Title>Заказ услуги — <strong>{modalParams.title}</strong></Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div class="row">
                        <div class="col-lg-6">
                            <img src={modalParams.src} style={{ width: '100%', marginBottom: '15px' }} alt=""></img>
                        </div>
                        <div class="col-lg-6">
                            {modalParams.description}
                        </div>    
                    </div>
                    <h3 style={{ fontSize: '20px', fontWeight: 700, margin: '25px 0px'}}>Оставить заявку</h3>
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
                                    <label for="commArea">Комментарий</label>
                                    <textarea class="form-control" id="commArea" rows="3" name="comment" placeholder="Добавьте комментарии, если есть" onChange={updateField('comment')} value={formState.comment}></textarea>
                                </div>
                            </div>
                        </div>
                    </form>
                
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
      Отмена
      </Button>
      <Button variant="primary" onClick={handleSubmitService} disabled={!isFormValid}>
      Заказать
      </Button>
    </Modal.Footer>
  </Modal>
  );
}