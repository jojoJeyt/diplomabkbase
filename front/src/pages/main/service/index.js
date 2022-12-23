import React from 'react';
import { Header } from '../header';
import { About } from '../about';
import { Services } from './services';
import { Footer } from '../footer';
import { OrderServiceModal } from '../order-service.modal';
import { useDispatch, useSelector } from 'react-redux';
import { selectUi, uiReducer } from '../../../app/ui.reducer';
import Toast from 'react-bootstrap/Toast';




export const MainPage = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectUi).isModalOpen;
  const message = useSelector(selectUi).message;

  return (<div>
    <Header/>
    <header style={{ height: '100vh' }}>
        <div className="container">
            <div className="row align-items-center" style={{ height: '100vh' }}>
                <div className="col-12 text-center">
                    <h2 className="header_title">Ремонт компьютеров в Минске с гарантией</h2>
                    <h3 className="header_subtitle">Быстро. Качественно. Надежно.</h3>
                    <a className="header_link" href="#services">Список услуг</a>
                </div>
            </div>
        </div>
    </header>
    <About/>
    <Services />
    <Footer />
    <OrderServiceModal show={isModalOpen} handleClose={() => dispatch(uiReducer.actions.resetModalState())}/>
    <Toast onClose={() => {}} show={!!message} style={{
      position: 'fixed',
      top: 64,
      right: 20,
    }}>
          <Toast.Body>{message}</Toast.Body>
    </Toast>
  </div>);
}