import React from 'react';
import { SERVICES } from './services.const';
import { uiReducer } from '../../../app/ui.reducer';
import { useDispatch } from 'react-redux';


const groupedData = [SERVICES.slice(0, 3), SERVICES.slice(3, 6), SERVICES.slice(6, 9)];

export const Services = () => {
    const dispatch = useDispatch();


  return (
    <section id="services">
        <div class="container services">
            <div class="row">
                <div class="col-12">
                    <h2 class="services_title">Наши услуги</h2>
                </div>
            </div>
            {
                groupedData.map((group) => {
                    return (
            <div class="card-deck mb-3 text-center" key={Math.random()}>
                {group.map((item) => {
                    return (
                <div class="card mb-4 box-shadow" key={item.title}>
                    <div class="card-header">
                        <h4 class="my-0 font-weight-normal">{item.title}</h4>
                    </div>
                    <div class="card-body">
                        <h1 class="card-title pricing-card-title">{item.cost} <small class="text-muted">BYN</small></h1>
                        <ul class="list-unstyled mt-3 mb-4">
                            {item.descriptions.map((description) => <li key={Math.random()}>{description}</li>)}
                        </ul>
                        <button type="button" class="btn btn-lg btn-block btn-outline-primary" data-toggle="modal" onClick={() => {
                            console.log(item, 'item');
                            dispatch(uiReducer.actions.setModalState({ isModalOpen: true, modalParams: item }));
                        }}>Заказать</button>
                    </div>
                </div>
                    )
                })}
            </div>
             )
            })
            }
        </div>
    </section>
  );
}